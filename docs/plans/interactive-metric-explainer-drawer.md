# Plan: Interaktive Erklärung via Drawer (Info-Icons & Metric Explainer)

## Motivation / Problemstellung

StackAtlas zeigt komplexe Metriken wie Sovereignty Score, Adoption Score, Overall Score sowie technische Kriterien (z. B. `openSource`, `selfHostable`, `dataPortability`). Nicht-technische Nutzer wie Manager oder Entscheider können diese Werte oft nicht korrekt einordnen, da keine kontextuelle Erklärung verfügbar ist.

Derzeit fehlen:

- Verständliche Erklärungen für Metriken an der Stelle, wo sie angezeigt werden
- Kontextuelles "Was bedeutet das?"-Feedback
- Mobile-freundliche Erklärungsmöglichkeiten

Das führt zu Interpretationsfehlern und mangelndem Vertrauen in die Plattform.

---

## Design-Ziele & Nicht-Ziele

### Ziele

- Info-Icon (ⓘ) an allen relevanten Metriken und Fachbegriffen
- Klick öffnet einen Drawer mit: Definition, Bedeutung, Berechnung, Beispiel
- Desktop: seitlicher Drawer (`_align="right"`)
- Mobile: Bottom Sheet (CSS-gesteuert via Breakpoint)
- Schließbar via X-Button, ESC, Klick auf Overlay
- Inhalte vollständig i18n-fähig (de/en mindestens)
- Barrierefreiheit via KoliBri-Komponenten

### Nicht-Ziele

- Kein Ersatz für die bestehende Detailansicht in `ArticleCard`
- Keine interaktiven Berechnungen oder Live-Scores im Drawer
- Keine Benutzer-editierbaren Erklärungen (statische Inhalte)
- Kein Redesign bestehender Metrikanzeigen

---

## Datenmodell-Änderungen

### Neue Typen in `src/types/index.ts`

```typescript
export type MetricExplainerSection = {
	definition: LocalizableText;
	importance: LocalizableText;
	calculation?: LocalizableText;
	example?: LocalizableText;
};

export type MetricExplainerId =
	| 'sovereigntyScore'
	| 'adoptionScore'
	| 'overallScore'
	| 'sovereignAdoptionScore'
	| 'directCoverage'
	| 'transitiveCoverage'
	| 'diversity'
	| 'openSource'
	| 'euHeadquartered'
	| 'auditedCode'
	| 'permissiveLicense'
	| 'mature'
	| 'selfHostable'
	| 'dataPortability'
	| 'openStandards'
	| 'noTelemetry'
	| 'ownerType';

export type MetricExplainer = MetricExplainerSection & {
	id: MetricExplainerId;
	label: LocalizableText;
};
```

### Neue Datei `src/data/metricExplainers.ts`

Statisches Dictionary aller `MetricExplainer`-Objekte, z. B.:

```typescript
export const METRIC_EXPLAINERS: Record<MetricExplainerId, MetricExplainer> = {
	sovereigntyScore: {
		id: 'sovereigntyScore',
		label: { de: 'Souveränitäts-Score', en: 'Sovereignty Score' },
		definition: { de: 'Ein Wert von 0–100, der misst, wie unabhängig und kontrollierbar eine Technologie ist.', en: '...' },
		importance: { de: 'Je höher der Score, desto weniger Abhängigkeit von einzelnen Anbietern oder Ländern.', en: '...' },
		calculation: { de: 'Summe gewichteter boolescher Kriterien (z.B. Open Source +20, EU-Sitz +15, …).', en: '...' },
		example: { de: 'Nextcloud: 87/100 – erfüllt alle Datenschutz- und Selbst-Hosting-Kriterien.', en: '...' },
	},
	// ...alle weiteren MetricExplainerId
};
```

---

## Algorithmus / Scoring-Konzept

Kein neuer Scoring-Algorithmus. Der Drawer zeigt nur statische Erklärungen.

Die Inhalte der Erklärungen werden aus `src/data/metricExplainers.ts` geladen und via `getLocalizedText()` (`src/utils/index.ts`) in der aktuellen Sprache angezeigt.

---

## Implementierungsschritte

### Schritt 1: Typen und Daten anlegen

- `src/types/index.ts`: Typen `MetricExplainerId`, `MetricExplainerSection`, `MetricExplainer` ergänzen
- `src/data/metricExplainers.ts`: Datei neu anlegen mit allen Explainer-Inhalten (de + en)
- Inhalte für alle `MetricExplainerId`-Werte befüllen (Definition, Bedeutung, Berechnung, Beispiel)

### Schritt 2: `MetricInfoDrawer`-Komponente erstellen

- Neue Datei: `src/components/MetricInfoDrawer.tsx`
- Props: `explainerId: MetricExplainerId | null`, `onClose: () => void`
- Nutzt `KolDrawer` aus `@public-ui/preact` mit `_align="right"`
- Struktur im Drawer:
  - Heading mit Metrik-Label
  - Abschnitte: „Was ist das?", „Warum wichtig?", „Berechnung", „Beispiel"
- ESC-Handler via `useEffect` auf `keydown` (wie in `BetaNoticeModal.tsx`)
- CSS-Klasse `metric-info-drawer--bottom` bei Viewport < 640px (Bottom Sheet via CSS)

```tsx
// Beispiel-Struktur
<KolDrawer _label={label} _open={explainerId !== null} _align="right">
	<section>
		<h3>{t('metricExplainer.definition')}</h3>
		<p>{getLocalizedText(explainer.definition, language)}</p>
	</section>
	{/* weitere Abschnitte */}
</KolDrawer>
```

### Schritt 3: `InfoIcon`-Komponente erstellen

- Neue Datei: `src/components/InfoIcon.tsx`
- Props: `explainerId: MetricExplainerId`, `label?: string`
- Rendert `KolButton` mit Icon-Modus (`_icon="codicon codicon-info"`, `_variant="ghost"`)
- `aria-label` = `t('metricExplainer.openFor', { label })`
- `onClick` → übergibt `explainerId` an globalen Explainer-State

### Schritt 4: Globaler Explainer-State via Context oder Lifting

- Option A (einfacher): State in `App.tsx` hochziehen, `InfoIcon` nutzt Callback-Prop
- Option B (flexibler): Kleinen `MetricExplainerContext` anlegen
- **Empfehlung**: Option A (kein neuer Context nötig), `MetricInfoDrawer` einmalig in `App.tsx` rendern

```tsx
// App.tsx
const [openExplainerId, setOpenExplainerId] = useState<MetricExplainerId | null>(null);
// ...
<MetricInfoDrawer explainerId={openExplainerId} onClose={() => setOpenExplainerId(null)} />;
```

### Schritt 5: InfoIcons in bestehende Komponenten integrieren

Folgende Stellen erhalten ein `<InfoIcon>`:

| Datei                            | Metrik                      | `explainerId`           |
| -------------------------------- | --------------------------- | ----------------------- |
| `src/components/ArticleCard.tsx` | Sovereignty Score (Gauge)   | `sovereigntyScore`      |
| `src/components/ArticleCard.tsx` | Adoption Score              | `adoptionScore`         |
| `src/components/ArticleCard.tsx` | Overall Score               | `overallScore`          |
| `src/components/ArticleCard.tsx` | Kriterien-Checkboxen (loop) | jeweilige `criteriaKey` |
| `src/components/StackStats.tsx`  | Alle Score-Anzeigen         | jeweilige IDs           |
| `src/pages/SettingsPage.tsx`     | Score-Evaluator             | jeweilige IDs           |

### Schritt 6: i18n-Schlüssel ergänzen

- `src/i18n/locales/de.json`: Schlüssel `metricExplainer.*` ergänzen
- `src/i18n/locales/en.json`: Englische Übersetzungen ergänzen
- Mindest-Keys: `metricExplainer.openFor`, `metricExplainer.definition`, `metricExplainer.importance`, `metricExplainer.calculation`, `metricExplainer.example`

### Schritt 7: CSS für Bottom Sheet auf Mobile

- `src/style.scss` oder neue Datei `src/components/MetricInfoDrawer.scss`:

```scss
@media (max-width: 640px) {
	.metric-info-drawer {
		// KolDrawer auf Mobile als Bottom Sheet positionieren
		--kol-drawer-align: bottom;
	}
}
```

### Schritt 8: Tests schreiben

- `src/components/MetricInfoDrawer.test.tsx`: Rendering, Öffnen, Schließen via ESC, Klick außerhalb
- `src/data/metricExplainers.test.ts`: Vollständigkeit aller `MetricExplainerId`s

### Schritt 9: Linting, Format, Build-Check

```bash
pnpm format && pnpm lint && pnpm test && pnpm build
```

### Schritt 10 (nach Merge): Plan-Datei löschen

```bash
rm docs/plans/interactive-metric-explainer-drawer.md
```

---

## Dokumentations-Updates

- `docs/ARC42.md`: Abschnitt „UI-Komponenten" um `MetricInfoDrawer` und `InfoIcon` ergänzen
- `docs/ITEM_METRICS_SCHEMA.md`: Hinweis, dass alle Metriken via Explainer beschrieben sind

---

## Risiken & Mitigationen

| Risiko                                                     | Mitigation                                                                                           |
| ---------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| KolDrawer unterstützt Bottom-Sheet-Modus nicht nativ       | CSS-Override via `@media`-Query; ggf. eigene Drawer-Implementierung mit `position: fixed; bottom: 0` |
| Explainer-Texte zu technisch / nicht verständlich          | Review durch Nicht-Techniker vor Merge; einfache Sprache als Vorgabe                                 |
| Zu viele InfoIcons wirken visuell überladen                | Icons erst bei Hover/Focus sichtbar machen (CSS `opacity: 0 → 1`)                                    |
| i18n-Lücken bei seltenen Sprachen (da, es, fr, it, no, sv) | Fallback auf `en`-Text via `getLocalizedText()` bereits implementiert                                |
| Mobile: Drawer überdeckt Kontext                           | Bottom Sheet zeigt nur oberen Teil → Nutzer sieht noch Kontext                                       |

---

## Offene Fragen

1. **Scope der InfoIcons**: Werden alle Kriterien-Checkboxen einzeln erklärt oder nur Aggregat-Scores?
2. **Drawer-Trigger auf Mobile**: Touch-tap auf Icon oder separater "i"-Button neben Metrik?
3. **Content-Ownership**: Wer pflegt die Explainer-Texte langfristig? Brauchen wir ein CMS?
4. **Sprach-Vollständigkeit**: Müssen alle 8 Sprachen vollständig befüllt sein zum Launch?
5. **Animationen**: Soll der Drawer animiert ein-/ausgeblendet werden (KoliBri-Standard oder Custom)?
