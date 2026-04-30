# Umsetzungsplan: Beta-Hinweis Modal nach Splash-Screen

**Status:** Geplant  
**Priorität:** Mittel  
**Gültig ab:** 2026-04-21

---

## Motivation / Problemstellung

Die Anwendung ist derzeit im Beta-Stadium. Es existiert zwar ein Hinweis im Header (`betaBanner`), dieser ist aber immer sichtbar und somit weniger auffällig. Der Nutzer soll beim ersten Besuch nach dem Splash-Screen durch ein prominentes Modal über den Beta-Status aufgeklärt werden. Dies erhöht die Awareness und reduziert Verwirrung bei potentiellen Änderungen.

**Anforderung:** Das Modal soll **genau einmal pro App-Start** angezeigt werden – nach dem Splash-Screen ausgeblendet wird.

---

## Design-Ziele & Nicht-Ziele

### Ziele ✓

- Prominentes Modal mit Beta-Hinweis nach Splash-Screen-Ausblendung
- Nur einmal pro App-Start angezeigt (Session-basiert, nicht persistent)
- Accessibility-konform (ARIA-Labels, Fokus-Management)
- Responsive & Theme-aware (Dark/Light Mode)
- Button zum Schließen und möglicherweise weitere CTA

### Nicht-Ziele ✗

- Keine Persistierung in `localStorage` (soll nicht wieder-erscheinen)
- Keine Breaking Changes in bestehende Komponenten
- Keine zusätzlichen Analytics-Tracking (falls nicht bereits vorhanden)
- Keine Änderung am Splash-Screen-Timing

---

## Datenmodell-Änderungen

### Neue Translations

**Datei:** `src/i18n/locales/*/common.json`

```json
{
	"betaNotice": {
		"title": "Beta Version",
		"description": "This is a beta version of StackAtlas. Content and features may change without notice.",
		"closeButton": "Understood"
	}
}
```

Für Deutsch (`en` bereits vorhanden, braucht Erweiterung):

```json
{
	"betaNotice": {
		"title": "Beta-Version",
		"description": "Dies ist eine Beta-Version von StackAtlas. Inhalte und Funktionen können sich ohne Vorankündigung ändern.",
		"closeButton": "Verstanden"
	}
}
```

### Neue Props/Context

- **Keine neuen globalen States** – das Modal wird direkt in `App.tsx` gerendernt
- **Flag `showBetaModal`** – lokal in `App.tsx`, initialisiert mit `true` beim App-Start

---

## Algorithmus / Scoring-Konzept

_Nicht anwendbar für dieses Feature_

---

## Implementierungsschritte

### 1. Neue Component `BetaNoticeModal.tsx` erstellen

**Datei:** `src/components/BetaNoticeModal.tsx`

- Strukturelle Anforderungen:
  - Semantisches `<dialog>` oder `<div role="dialog">`
  - ARIA-Attribute: `aria-modal="true"`, `aria-labelledby`, `aria-describedby`
  - Fokus-Fallback beim Schließen
  - Escape-Taste zum Schließen
  - Backdrop-Overlay mit `pointer-events: auto` (Modal bleibt fokussierbar)

- Props:
  - `isOpen: boolean` – Sichtbarkeit
  - `onClose: () => void` – Callback beim Schließen

- Verwendung von `KolButton` aus `@public-ui/preact` (konsistent mit `PwaUpdatePrompt.tsx`)

### 2. Styling für `BetaNoticeModal`

**Datei:** `src/style.scss` (neue Section)

```scss
/* Beta Notice Modal */
.beta-modal-overlay {
	position: fixed;
	inset: 0;
	background: rgb(0 0 0 / 55%);
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 9998;
	padding: var(--ds-space-4);
	backdrop-filter: blur(2px);
	animation: beta-modal-fade-in 0.25s ease;
}

.beta-modal-card {
	max-width: 520px;
	width: 100%;
	border-radius: var(--ds-radius-lg);
	animation: beta-modal-slide-up 0.3s cubic-bezier(0.22, 1, 0.36, 1);

	/* Override KolCard default styles */
	kol-heading {
		--kol-heading-font-weight: 700;
		--kol-heading-font-size: var(--ds-text-xl);
	}
}

.beta-modal-content {
	padding: var(--ds-space-3) 0;
	display: flex;
	flex-direction: column;
	gap: var(--ds-space-4);
}

.beta-modal-description {
	font-size: var(--ds-text-base);
	line-height: 1.7;
	margin: 0;
	color: var(--ds-color-text-muted);
}

.beta-modal-actions {
	display: flex;
	justify-content: flex-end;
	gap: var(--ds-space-2);
	padding-top: var(--ds-space-2);
}

@keyframes beta-modal-fade-in {
	from {
		opacity: 0;
	}

	to {
		opacity: 1;
	}
}

@keyframes beta-modal-slide-up {
	from {
		opacity: 0;
		transform: translateY(24px);
	}

	to {
		opacity: 1;
		transform: translateY(0);
	}
}

@media (prefers-reduced-motion: reduce) {
	.beta-modal-overlay,
	.beta-modal-card {
		animation: none;
		backdrop-filter: none;
	}
}
```

### 3. Translations in allen Locales hinzufügen

**Dateien:**

- `src/i18n/locales/en/common.json`
- `src/i18n/locales/de/common.json` (falls vorhanden, sonst neu)
- `src/i18n/locales/*/common.json` für alle Sprachen

Füge folgende Keys hinzu (unter `header` oder als eigene Top-Level Section):

```json
{
	"betaNotice": {
		"title": "Beta Version",
		"description": "This is a beta version of StackAtlas. Content and features may change without notice.",
		"closeButton": "Understood"
	}
}
```

### 4. `App.tsx` anpassen

**Datei:** `src/App.tsx`

Logik:

```typescript
import { useState } from 'preact/hooks';

const [showBetaModal, setShowBetaModal] = useState(true);

const handleBetaModalClose = () => {
  setShowBetaModal(false);
};

// In JSX:
<BetaNoticeModal isOpen={showBetaModal} onClose={handleBetaModalClose} />
```

**Positionierung:** Das Modal sollte **nach** dem `PwaWrapper` (am Ende der AppContent) gerendert werden.

### 5. `preact.main.tsx` – Splash-Trigger prüfen (Optional)

**Datei:** `src/preact.main.tsx`

Derzeit wird die App bei Splash-Ausblendung bereits gerendert (Zeile 96). Die Modal-Sichtbarkeit wird über State verwaltet und zeigt sich automatisch. **Keine Änderungen nötig**, da das Modal über React-State in `App.tsx` gesteuert wird.

### 6. Fokus-Management & Testing

- **Escape-Taste** zum Schließen des Modals
- **Fokus-Fallback:** Nach Schließen Fokus auf `<Header />` oder nächst relevantes Element
- **Test:**
  - App laden → Splash erscheint
  - Splash ausblenden (Click oder Escape)
  - Beta-Modal sollte erscheinen
  - Click "Understood" oder Escape → Modal verschwindet
  - Seite neuladen → Modal erscheint erneut

---

## Dokumentations-Updates

### Zu aktualisieren:

1. **docs/ARC42.md** – Falls Architecture-Dokum. existiert, Section "Components" um `BetaNoticeModal` erweitern
2. **docs/README.md** – Optional: Erwähnung der Beta-Hinweise
3. **Inline-Docs** – JSDoc-Kommentare in `BetaNoticeModal.tsx`

---

## Risiken & Mitigationen

| Risiko                                             | Wahrscheinlichkeit | Mitigation                                                                                                             |
| -------------------------------------------------- | ------------------ | ---------------------------------------------------------------------------------------------------------------------- |
| Modal blendet sich nicht aus nach Splash           | Mittel             | Sicherstellen, dass `dismissSplash()` vor App-Render aufgerufen wird. Modal ist Session-State, keine Deps. auf Splash. |
| Fokus-Management führt zu Accessibility-Problemen  | Niedrig            | ARIA-Attribute testen, Keyboard-Navigation verifizieren.                                                               |
| Z-Index-Konflikte mit Splash oder anderen Overlays | Niedrig            | Z-Index klar setzen: Splash=9999, Modal=9998, Content=default.                                                         |
| Styling-Inkonsistenz zwischen Light/Dark Mode      | Mittel             | KoliBri Design Tokens verwenden (`--ds-color-*`).                                                                      |
| Translations nicht in allen Sprachen vorhanden     | Mittel             | Fallback auf English nutzen, später nachziehen.                                                                        |

---

## Offene Fragen

1. **Zusätzliche CTAs?** Soll das Modal nur einen "Understood"-Button haben oder auch Links zu Docs/Settings?
   - **Empfehlung:** Nur einen Button, für mehr Infos Nutzer zur Dokumentation lenken.

2. **Wording & Tone:** Ist "Beta Version" und "Content may change" ausreichend oder zu vage?
   - **Empfehlung:** Kurz & prägnant halten, ggf. Link zur Roadmap/Changelog.

3. **Mehrsprachigkeit:** Alle verfügbaren Locales mit Translations versorgen oder nur Basis?
   - **Empfehlung:** Mindestens English + Deutsch, andere folgen.

4. **A/B-Testing:** Soll gemessen werden, wie oft Nutzer das Modal sehen/schließen?
   - **Empfehlung:** Später optional, nicht im MVP.

---

## Implementierungsreihenfolge

```
1. ✓ BetaNoticeModal.tsx Component erstellen
2. ✓ Styling in style.scss hinzufügen
3. ✓ Translations in common.json ergänzen (mindestens de/en)
4. ✓ App.tsx anpassen (State + Render)
5. ✓ Manuelles Testing durchführen
6. ✓ Merge in claude/add-beta-notice-modal-*
7. — Nach erfolgreichem Merge: Diese Plan-Datei löschen
```

---

## Geschätzte Aufwandsdauer

- **Component & Styling:** 45 min
- **Translations:** 15 min
- **Integration & Testing:** 30 min
- **Buffer:** 15 min
- **Total:** ~2 Stunden

---

## Notizen

- Der Splash-Screen hat z.Z. `z-index: 9999` (index.html, Style-Section)
- Das Modal sollte darunter leben: `z-index: 9998`
- `PwaUpdatePrompt.tsx` als Referenz für Struktur/Styling nutzen
- `preact.main.tsx` zeigt: App wird nach Splash-Dismiss gerendert → Modal wird automatisch initialisiert
