# Plan: Community-getriebene Datenbasis

## Motivation / Problemstellung

StackAtlas präsentiert aktuell Daten (Stacks, Items, Metriken) ohne klare Kennzeichnung ihrer Herkunft. Nutzer wissen nicht, wer die Daten gepflegt hat oder wie sie entstanden sind. Das führt zu:

- Misstrauen gegenüber Datenkorrektheit und -fairness
- Fehlender Einladung zur Mitarbeit
- Unklarem Verantwortlichkeitsgefühl (Plattformbetreiber vs. Community)

Bereits vorhandene Bearbeitungsfunktionen (lokale Stacks via `useLocalStacks`) sind rein lokal und nicht Community-gerichtet. Es fehlen:

- Ein sichtbares Community-Signal auf der Plattform
- Möglichkeit, Datenverbesserungen einzureichen (z. B. via GitHub-Link oder Formular)
- Kontext, der erklärt: „Diese Daten pflegt die Community, nicht der Betreiber"

---

## Design-Ziele & Nicht-Ziele

### Ziele

- Globaler Community-Banner / Info-Bereich in der App sichtbar machen
- Kontextueller Hinweis beim Bearbeiten/Erstellen von Stacks
- Klarer CTA (Call-to-Action) für Beitragende: Link zu GitHub-Repository / Contribution Guide
- Hinweis ist i18n-fähig (de/en)
- Keine eigene Datenbank oder Backend nötig (statische Plattform bleibt erhalten)

### Nicht-Ziele

- Kein vollständiges In-App-Editing mit Datenbankpersistenz
- Kein eigenes User-Account-System
- Kein Live-Review-Workflow in der App
- Keine vollständige Änderungshistorie (das liegt bei GitHub)

---

## Datenmodell-Änderungen

### Keine strukturellen Datenmodell-Änderungen erforderlich

Die Datenbasis bleibt statisch (JSON/TS-Dateien im Repository). Der Community-Aspekt wird durch UI-Komponenten und i18n-Texte kommuniziert, nicht durch neue Typen.

Optional: Frontmatter-Feld `contributors` in Item-Dateien oder Stack-Dateien ergänzen:

```typescript
// src/types/index.ts — optionale Erweiterung
export type Item = {
	// ...bestehendes
	contributors?: string[]; // GitHub-Usernames, optional
};

export type Stack = {
	// ...bestehendes
	contributors?: string[]; // GitHub-Usernames, optional
	dataSource?: 'community' | 'official' | 'imported'; // Herkunftskennzeichnung
};
```

---

## Algorithmus / Scoring-Konzept

Kein neuer Algorithmus. Die Community-Funktionalität ist rein UI/UX und navigatorisch.

---

## Implementierungsschritte

### Schritt 1: `CommunityBanner`-Komponente erstellen

- Neue Datei: `src/components/CommunityBanner.tsx`
- Zeigt global unterhalb des Headers einen schmalen Banner:
  - Icon (z. B. Personen-Icon oder Community-Symbol)
  - Text: „Diese Datenbasis wird von der Community gepflegt. Der Betreiber stellt nur die Plattform bereit."
  - Link: „Mitmachen →" → GitHub-Repository-Link
- Schließbar (localStorage-Key `community-banner-dismissed`)
- KolAlert oder eigenes Styling mit `KolButton` (X zum Schließen)
- Props: `githubUrl: string`, `onDismiss: () => void`

```tsx
// Beispiel-Struktur
<div className="community-banner" role="banner">
	<span>{t('community.bannerText')}</span>
	<KolLinkButton _href={githubUrl} _target="_blank">
		{t('community.contribute')}
	</KolLinkButton>
	<KolButton _icon="codicon codicon-close" _variant="ghost" _on={{ onClick: onDismiss }} />
</div>
```

### Schritt 2: Banner in `App.tsx` einbinden

- `App.tsx` (`src/App.tsx`): `CommunityBanner` zwischen `<Header>` und `<Router>` einfügen
- State: `const [bannerDismissed, setBannerDismissed] = useState(() => localStorage.getItem('community-banner-dismissed') === 'true')`
- `onDismiss`: setzt localStorage-Key und versteckt Banner

### Schritt 3: Kontextuellen Hinweis beim Stack-Erstellen ergänzen

- `src/pages/StackGalleryPage.tsx`: Beim „Neuen Stack erstellen"-Bereich einen `KolAlert` hinzufügen:
  - `_type="info"`: „Lokale Stacks werden nur in deinem Browser gespeichert. Möchtest du einen Stack für alle hinzufügen? [Reiche einen Beitrag ein →]"
- Dieser Hinweis erscheint kontextuell, nicht global

### Schritt 4: „Daten verbessern"-Link in `ArticleCard` ergänzen

- `src/components/ArticleCard.tsx`: Im Drawer-Footer ein diskreter Link:
  - „Daten zu {name} verbessern" → Link zu GitHub mit vorausgefülltem Issue-Template
  - URL-Pattern: `https://github.com/<org>/<repo>/issues/new?template=data-correction.md&title=Datenkorrektur: {item.name}`
- Rendert als `KolLinkButton _variant="ghost"`

### Schritt 5: GitHub Issue-Templates anlegen

- `.github/ISSUE_TEMPLATE/data-correction.md`: Template für Datenkorrekturen
  ```markdown
  ---
  name: Datenkorrektur
  about: Schlage eine Verbesserung oder Korrektur bestehender Daten vor
  ---

  **Item/Stack:**
  **Was ist falsch:**
  **Korrektur:**
  **Quelle:**
  ```
- `.github/ISSUE_TEMPLATE/new-stack.md`: Template für neue Stacks
- `.github/ISSUE_TEMPLATE/new-item.md`: Template für neue Items/Technologien

### Schritt 6: `CONTRIBUTING.md` im Repository anlegen/aktualisieren

- Falls nicht vorhanden: `CONTRIBUTING.md` im Repo-Root erstellen
- Abschnitte:
  - Wie füge ich einen neuen Stack hinzu?
  - Wie korrigiere ich Item-Daten?
  - Wie schlage ich neue Metriken vor?
  - Dateipfade und Schemata (Verweis auf `docs/ITEM_METRICS_SCHEMA.md`)

### Schritt 7: i18n-Schlüssel ergänzen

- `src/i18n/locales/de.json`: Schlüssel `community.*` ergänzen
  - `community.bannerText`, `community.contribute`, `community.localStackHint`, `community.improveData`
- `src/i18n/locales/en.json`: Englische Übersetzungen

### Schritt 8: Optional — `contributors`-Feld in Stack-Daten anzeigen

- Falls `Stack.contributors` befüllt: In `StackExpose.tsx` oder `ArticleCard.tsx` kleine Avatar-Reihe anzeigen
- Nutzt `KolAvatar` mit GitHub-Avatar-URL: `https://github.com/{username}.png?size=32`
- Nur rendern wenn `contributors?.length > 0`

### Schritt 9: CSS für Community-Banner

- `src/style.scss`: Banner-Styles ergänzen
  ```scss
  .community-banner {
  	background: var(--ds-color-primary-light, #e8f0fe);
  	border-bottom: 1px solid var(--ds-color-primary);
  	padding: var(--ds-space-2) var(--ds-space-6);
  	display: flex;
  	align-items: center;
  	gap: var(--ds-space-4);
  	font-size: var(--ds-text-sm);
  }
  ```

### Schritt 10: Tests schreiben

- `src/components/CommunityBanner.test.tsx`: Rendering, Dismiss-Funktion, localStorage-Persistenz
- Prüfen: Banner nicht sichtbar wenn `community-banner-dismissed === 'true'`

### Schritt 11: Linting, Format, Build-Check

```bash
pnpm format && pnpm lint && pnpm test && pnpm build
```

### Schritt 12 (nach Merge): Plan-Datei löschen

```bash
rm docs/plans/community-driven-data-platform.md
```

---

## Dokumentations-Updates

- `CONTRIBUTING.md`: Neu anlegen (Schritt 6)
- `docs/ARC42.md`: Abschnitt „Community & Contribution" ergänzen
- `README.md`: Kurzer Abschnitt „Zur Datenbasis beitragen" mit Link zu `CONTRIBUTING.md`

---

## Risiken & Mitigationen

| Risiko                                                              | Mitigation                                                                |
| ------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| Banner wird als Werbung/Spam wahrgenommen                           | Dezentes Styling, einmalig schließbar, kein aggressives Re-Appearing      |
| GitHub-Link nicht korrekt für alle Deployments                      | `VITE_GITHUB_REPO_URL` als Env-Variable konfigurieren                     |
| Nutzer submiten unkomplizierte/spam-Issues                          | Issue-Templates mit klarer Struktur reduzieren Spam; GitHub-Account nötig |
| `contributors`-Feld bei vielen Items leer → wirkt verlassen         | Feature nur anzeigen, wenn `contributors.length > 0`; sonst ausblenden    |
| In-App-Link-Generierung mit Item-Namen kann Sonderzeichen enthalten | URL-Encoding via `encodeURIComponent()`                                   |

---

## Offene Fragen

1. **GitHub-Repository-URL**: Welche URL soll im Banner und den Links verwendet werden? (Env-Variable oder hardcoded?)
2. **Scope des Community-Begriffs**: Bezieht sich „Community" auf die Open-Source-Community oder eine spezifische Nutzergruppe (z. B. Behörden-IT)?
3. **`dataSource`-Feld**: Soll die Herkunft von Daten (community/official) wirklich getrackt werden? Erfordert Daten-Migration.
4. **Änderungshistorie**: Reicht GitHub-History als Transparenz-Tool, oder soll ein dediziertes Changelog pro Item/Stack in der App sichtbar sein?
5. **Moderation**: Wer reviewed Community-PRs und -Issues? Brauchen wir einen Moderation-Workflow?
