# Plan: Strukturierte und gestaltete News-Seite

## Motivation / Problemstellung

Die aktuelle News-Seite (`src/pages/NewsPage.tsx`) rendert alle Artikel als gleichartige `KolCard`-Blöcke ohne visuelle Hierarchie. Probleme:

- Alle Artikel wirken gleichgewichtig — kein Featured-Artikel, keine Hervorhebung
- Kein Tagging / keine Kategorisierung der Inhalte
- Keine Filter- oder Sortierfunktion
- Lange Artikel erzeugen eine „Wall of Text" — schlechte Lesbarkeit
- Kein konsistentes visuelles Muster für Datum, Titel, Zusammenfassung, Inhalt
- Keine Mobile-Optimierung über das Standard-Responsive-Verhalten hinaus

---

## Design-Ziele & Nicht-Ziele

### Ziele

- Klare visuelle Hierarchie: Featured News oben, restliche News im Grid/Liste darunter
- Konsistentes Card-Layout: Datum → Tags → Titel → Summary → Inhalt (ausklappbar oder via Link)
- Tags / Kategorien: sichtbar und klickbar für Filterung
- Optional: Filterleiste (nach Tag/Kategorie, Sortierfunktion nach Datum)
- Mobile-optimiert: Single-Column-Layout, Cards mit sinnvoller Touch-Größe
- Scanbares Layout: kurze Summary sichtbar, Vollinhalt hinter „Mehr lesen"-Interaktion
- Alle Änderungen rückwärtskompatibel mit bestehenden Markdown-Dateien

### Nicht-Ziele

- Kein Paginierungssystem mit Backend
- Kein Kommentar- oder Like-System
- Keine Volltext-Suche (würde Backend erfordern)
- Kein CMS-Anbindung

---

## Datenmodell-Änderungen

### Erweiterung des Frontmatter-Schemas (`src/pages/NewsPage.tsx`)

Bestehende Felder:

```yaml
---
focus: string
title: string
summary: string
---
```

Neue optionale Felder:

```typescript
// Erweitert den Typ NewsModule.metadata in src/pages/NewsPage.tsx
type NewsMetadata = {
	focus?: string;
	title?: string;
	summary?: string;
	// NEU:
	featured?: boolean; // Hebt Artikel als Featured hervor
	tags?: string[]; // Frei wählbare Tags, z. B. ['security', 'release', 'update']
	author?: string; // Optionaler Autorenname
	coverImage?: string; // Optionaler Pfad zu einem Cover-Bild (relativ zu /public/)
};
```

Entsprechend erweiterte Typdefinition in `NewsPage.tsx`:

```typescript
type NewsEntry = {
	Content: ComponentType;
	author?: string;
	coverImage?: string;
	date: string;
	featured: boolean;
	focus?: string;
	slug: string;
	summary: string;
	tags: string[];
	title: string;
};
```

### Anpassung `normalizeEntries()` in `src/pages/NewsPage.tsx`

```typescript
return {
	Content: module.default,
	author: module.metadata?.author,
	coverImage: module.metadata?.coverImage,
	date,
	featured: module.metadata?.featured ?? false,
	focus: module.metadata?.focus,
	slug,
	summary: module.metadata?.summary ?? slug,
	tags: module.metadata?.tags ?? [],
	title: module.metadata?.title ?? slug,
};
```

---

## Algorithmus / Scoring-Konzept

### Sortierlogik

```typescript
function sortEntries(entries: NewsEntry[], sortOrder: 'newest' | 'oldest'): NewsEntry[] {
	return [...entries].sort((a, b) => (sortOrder === 'newest' ? b.date.localeCompare(a.date) : a.date.localeCompare(b.date)));
}
```

### Filter-Logik

```typescript
function filterEntries(entries: NewsEntry[], activeTag: string | null): NewsEntry[] {
	if (!activeTag) return entries;
	return entries.filter((e) => e.tags.includes(activeTag));
}
```

### Featured-Logik

- Featured-Artikel werden immer oben angezeigt, unabhängig vom aktiven Filter/Sortierung
- Maximal 1 Featured-Artikel (der neueste mit `featured: true`)
- Restliche Artikel im Standard-Grid

---

## Implementierungsschritte

### Schritt 1: `parseLocalIsoDate` nach `src/utils/index.ts` verschieben

- Die Hilfsfunktion `parseLocalIsoDate` ist aktuell privat in `src/pages/NewsPage.tsx` definiert
- Sie muss nach `src/utils/index.ts` verschoben und dort exportiert werden, damit `FeaturedNewsCard` und `NewsCard` sie ohne Code-Duplikation nutzen können
- `NewsPage.tsx` importiert sie anschließend aus `../utils`

### Schritt 2: Typen in `NewsPage.tsx` erweitern

- `NewsMetadata`-Typ um `featured`, `tags`, `author`, `coverImage` ergänzen (s. Datenmodell-Änderungen)
- `NewsEntry`-Typ entsprechend erweitern
- `normalizeEntries()` anpassen, um neue Felder zu lesen

### Schritt 4: `FeaturedNewsCard`-Komponente erstellen

- Neue Datei: `src/components/FeaturedNewsCard.tsx`
- Props: `entry: NewsEntry`, `dateFormatter: Intl.DateTimeFormat`
- Visuell größer als normale Cards: volle Breite, prominenter Titel, optionales Cover-Bild
- `KolCard` mit CSS-Klasse `news-card--featured`
- Zeigt: Cover-Bild (falls vorhanden), Datum, Tags, Titel (H2), Summary, „Weiterlesen"-Toggle

```tsx
<article className="news-card news-card--featured">
	{entry.coverImage && <img src={entry.coverImage} alt="" className="news-card__cover" />}
	<div className="news-card__header">
		<span className="news-card__badge">{t('news.featured')}</span>
		<time dateTime={entry.date}>{dateFormatter.format(parseLocalIsoDate(entry.date))}</time>
	</div>
	<h2 className="news-card__title">{entry.title}</h2>
	<p className="news-card__summary">{entry.summary}</p>
	<TagList tags={entry.tags} />
	<ExpandableContent Content={entry.Content} />
</article>
```

### Schritt 5: `NewsCard`-Komponente erstellen

- Neue Datei: `src/components/NewsCard.tsx`
- Props: `entry: NewsEntry`, `dateFormatter: Intl.DateTimeFormat`
- Kompakteres Layout als `FeaturedNewsCard`
- Struktur: Datum → Tags → Titel → Summary → Toggle „Weiterlesen"
- Nutzt `KolCard` oder natives `<article>` mit CSS

### Schritt 6: `TagList`-Komponente erstellen

- Neue Datei: `src/components/TagList.tsx`
- Props: `tags: string[]`, `activeTag?: string | null`, `onTagClick?: (tag: string) => void`
- Rendert Tags als `KolButton _variant="ghost"` oder styled `<button>`-Elemente
- Aktiver Tag visuell hervorgehoben (z. B. `background: var(--ds-color-primary)`)

### Schritt 7: `ExpandableContent`-Komponente erstellen

- Neue Datei: `src/components/ExpandableContent.tsx`
- Props: `Content: ComponentType`
- Standardmäßig eingeklappt (`display: none` oder `max-height: 0`)
- „Mehr lesen / Weniger anzeigen"-Button zum Togglen
- Verhindert Wall-of-Text für lange Artikel
- Nutzt `useState(false)` für `isExpanded`

```tsx
export function ExpandableContent({ Content }: { Content: ComponentType }) {
	const [expanded, setExpanded] = useState(false);
	return (
		<div className="expandable-content">
			{expanded && (
				<div className="expandable-content__body news-report-card__content">
					<Content />
				</div>
			)}
			<KolButton _label={expanded ? t('news.collapse') : t('news.expand')} _variant="ghost" _on={{ onClick: () => setExpanded(!expanded) }} />
		</div>
	);
}
```

### Schritt 8: `NewsFilterBar`-Komponente erstellen (optional, aber empfohlen)

- Neue Datei: `src/components/NewsFilterBar.tsx`
- Props: `allTags: string[]`, `activeTag: string | null`, `sortOrder: 'newest' | 'oldest'`, `onTagChange`, `onSortChange`
- Rendert: „Alle"-Button + je ein Button pro Tag + Sort-Toggle
- Layout: horizontales Flexbox-Scrollable auf Mobile

### Schritt 9: `NewsPage.tsx` refaktorieren

- Import neue Komponenten: `FeaturedNewsCard`, `NewsCard`, `NewsFilterBar`
- State hinzufügen:
  ```typescript
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  ```
- Alle Tags aus Entries sammeln: `const allTags = useMemo(() => [...new Set(entries.flatMap((e) => e.tags))], [entries])`
- Featured-Artikel separieren: `const featuredEntry = entries.find((e) => e.featured)`
- Filter + Sort auf nicht-featured Entries anwenden
- Layout:
  ```tsx
  <main>
    <h1>{t('pages.news.title')}</h1>
    {featuredEntry && <FeaturedNewsCard entry={featuredEntry} />}
    <NewsFilterBar allTags={allTags} ... />
    <div className="news-page__grid">
      {filteredEntries.map((entry) => <NewsCard key={...} entry={entry} />)}
    </div>
  </main>
  ```

### Schritt 10: CSS für das neue Layout

- `src/style.scss` oder neue `src/components/NewsPage.scss`:

```scss
.news-page__grid {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
	gap: var(--ds-space-6);
}

@media (max-width: 640px) {
	.news-page__grid {
		grid-template-columns: 1fr;
	}
}

.news-card--featured {
	grid-column: 1 / -1;
	border-left: 4px solid var(--ds-color-primary);
}

.news-card__cover {
	width: 100%;
	max-height: 240px;
	object-fit: cover;
	border-radius: var(--ds-space-2);
}

.news-card__badge {
	background: var(--ds-color-primary);
	color: white;
	padding: 2px 8px;
	border-radius: 12px;
	font-size: var(--ds-text-xs);
	font-weight: 600;
	text-transform: uppercase;
}
```

### Schritt 11: i18n-Schlüssel ergänzen

- `src/i18n/locales/de.json`:
  - `news.featured`: „Hervorgehoben"
  - `news.expand`: „Weiterlesen"
  - `news.collapse`: „Weniger anzeigen"
  - `news.filterAll`: „Alle"
  - `news.sortNewest`: „Neueste zuerst"
  - `news.sortOldest`: „Älteste zuerst"
  - `news.noResults`: „Keine Artikel für diesen Filter gefunden."
- `src/i18n/locales/en.json`: Englische Entsprechungen

### Schritt 12: Bestehende News-Artikel aktualisieren

- `src/content/news/2026-04-23-adoption-calibration-rollout.md`: `featured: true` setzen (neuester Artikel)
- `src/content/news/2026-04-01-markdown-features-demo.md`: `tags: ['demo', 'markdown']` ergänzen
- Alle weiteren Artikel: sinnvolle Tags ergänzen

### Schritt 13: Tests schreiben

- `src/pages/NewsPage.test.tsx`: Rendering mit/ohne Featured, Filter-Logik, Sort-Logik
- `src/components/ExpandableContent.test.tsx`: Toggle-Verhalten
- `src/components/TagList.test.tsx`: Klick auf Tag setzt aktiven Tag

### Schritt 14: Linting, Format, Build-Check

```bash
pnpm format && pnpm lint && pnpm test && pnpm build
```

### Schritt 15 (nach Merge): Plan-Datei löschen

```bash
rm docs/plans/structured-news-page.md
```

---

## Dokumentations-Updates

- `docs/ARC42.md`: Abschnitt „News-System" mit Frontmatter-Schema aktualisieren
- `src/content/news/README.md` (neu anlegen): Erklärt das Frontmatter-Schema für Autoren

---

## Risiken & Mitigationen

| Risiko                                                        | Mitigation                                                                             |
| ------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| Bestehende Artikel fehlen `tags`/`featured` → leere Tag-Liste | Fallback: `tags: []` → Tag-Filter zeigt keine Tags wenn alle leer; rückwärtskompatibel |
| `ExpandableContent` bricht MDX-Komponenten-Rendering          | Test mit `2026-04-01-markdown-features-demo.md` (vollständiges MDX-Demo)               |
| Grid-Layout auf kleinen Breakpoints zu eng                    | `minmax(280px, 1fr)` statt fixer Breite; testen auf 320px-Viewport                     |
| Zu viele Tags → Filterbar unübersichtlich                     | Nur Tags anzeigen, die ≥ 2 Artikel haben; Rest unter „Weitere..."-Dropdown             |
| Cover-Bilder fehlen für die meisten Artikel                   | `coverImage` ist optional; Card ohne Bild bleibt valide                                |
| `featured: true` bei mehreren Artikeln                        | Nur das erste `featured: true`-Ergebnis nach Datum-Sort verwenden                      |

---

## Offene Fragen

1. **Tag-Vokabular**: Gibt es eine vordefinierte Liste erlaubter Tags oder sind sie frei wählbar?
2. **Featured-Mechanismus**: Soll `featured` im Frontmatter stehen oder automatisch dem neuesten Artikel zugewiesen werden?
3. **ExpandableContent vs. separate Detailseite**: Soll der Vollinhalt inline ausgeklappt werden oder eine eigene Route `/news/:slug` bekommen?
4. **Cover-Bilder**: Woher kommen die Bilder? Aus `/public/news/`? Externer CDN?
5. **Anzahl sichtbarer Artikel**: Soll es Paginierung oder Infinite Scroll geben, wenn viele Artikel vorhanden sind?
6. **RSS-Feed**: Wird ein RSS-Feed benötigt? (würde statische Generierung voraussetzen)
