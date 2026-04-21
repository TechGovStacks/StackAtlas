# Plan: Auto-Select erster Option bei Single Selects (onBlur)

## Motivation / Problemstellung

Alle `KolSingleSelect`-Instanzen der App können in einen Zustand geraten, in dem keine Option visuell ausgewählt ist — entweder weil der `_value`-Prop `undefined`/`null` ist, der Wert keiner verfügbaren Option entspricht, oder die Komponente intern keinen selektierten Eintrag darstellt. Wenn ein Nutzer einen solchen Select fokussiert und verlässt (blur) ohne bewusst eine Option zu wählen, bleibt dieser leere Zustand bestehen, was eine schlechte Nutzererfahrung und Barrierefreiheitsprobleme verursacht (kein sichtbarer Standardwert, unvorhersehbares Verhalten für Screen-Reader).

**Gewünschtes Verhalten:** Verlässt der Nutzer einen Single Select ohne eine Option ausgewählt zu haben, wird automatisch die erste wählbare (nicht deaktivierte) Option gesetzt.

## Design-Ziele & Nicht-Ziele

### Ziele
- Einheitliches Verhalten für **alle** `KolSingleSelect`-Instanzen in der App
- Kapselung der Logik in **einer einzigen Komponente** (`AutoSingleSelect`)
- Keine Änderung am bestehenden `onChange`-Verhalten
- Barrierefreiheitskonformes Verhalten (WCAG 2.1)

### Nicht-Ziele
- Kein Eingriff in die `@public-ui/preact`-Bibliothek selbst
- Keine erzwungene Auswahl bei Selects, die bewusst ohne Wert starten dürfen (z.B. Filter mit "Alle"-Option als erstem Eintrag — dort ist der erste Eintrag `value: ''`, also bereits ein gültiger Wert)
- Kein Refactoring der State-Verwaltung in `useFilters` oder anderen Hooks

## Datenmodell-Änderungen

Keine Änderungen an Typen, Schemas oder JSON-Feldern notwendig. Die Props der neuen Wrapper-Komponente entsprechen exakt denen von `KolSingleSelect`.

## Algorithmus / Konzept

### Trigger-Bedingung

Auto-Select wird auf `focusout` ausgelöst, wenn der aktuelle Wert **keiner verfügbaren Option entspricht**:

```
!options.some(o => o.value === currentValue)
```

**Vorteil gegenüber `null`/`undefined`-Prüfung:** Deckt auch `''` ab, wenn kein leerer Eintrag in den Optionen vorhanden ist, sowie ungültige Werte die von außen gesetzt werden.

### Erste wählbare Option

```
firstSelectableOption = options.find(opt => !opt.disabled)
```

Falls keine nicht-deaktivierte Option existiert: keine Aktion.

### Ablauf

```
onFocusOut(event):
  if (options.some(o => o.value === _value)) → return (gültiger Wert vorhanden)
  firstOption = options.find(o => !o.disabled)
  if (!firstOption) → return
  call _on.onChange(syntheticEvent, firstOption.value)
```

### Blur-Erkennung

`KolSingleSelect` von `@public-ui/preact` kapselt die native `<select>`-Logik in einem Shadow DOM. Das native `blur`-Event bubbelt nicht — daher wird `focusout` verwendet (bubbelt im DOM nach oben). Strategie A nutzt `_on.onBlur` falls von @public-ui unterstützt; Strategie B verwendet `onFocusOut` auf dem äußeren `<div>`.

## Implementierungsschritte

### Schritt 1: `_on.onBlur`-Unterstützung prüfen

**Datei:** `node_modules`-Typen von `@public-ui/preact@4.1.2` (nach `pnpm install`)

Prüfen ob `KolSingleSelect._on` einen `onBlur`-Handler akzeptiert. Ergebnis entscheidet die Implementierungsstrategie in Schritt 2.

### Schritt 2: `AutoSingleSelect`-Wrapper erstellen

**Neue Datei:** `src/components/AutoSingleSelect.tsx`

```tsx
import { KolSingleSelect } from '@public-ui/preact';
import type { ComponentProps } from 'preact';

type KolSingleSelectProps = ComponentProps<typeof KolSingleSelect>;

export function AutoSingleSelect(props: KolSingleSelectProps) {
  const { _on, _value, _options, ...rest } = props;

  const handleBlur = () => {
    const options = Array.isArray(_options) ? _options : [];
    if (options.some((o) => o.value === _value)) return;
    const first = options.find((o) => !o.disabled);
    if (!first || !_on?.onChange) return;
    _on.onChange(new Event('change'), first.value);
  };

  // Strategie A: via _on.onBlur (falls von @public-ui unterstützt)
  const onProps: KolSingleSelectProps['_on'] = {
    ..._on,
    onBlur: handleBlur,
  };

  return <KolSingleSelect {...rest} _value={_value} _options={_options} _on={onProps} />;
}
```

Falls `_on.onBlur` nicht unterstützt wird (Strategie B):

```tsx
return (
  <div onFocusOut={handleBlur}>
    <KolSingleSelect {...rest} _value={_value} _options={_options} _on={_on} />
  </div>
);
```

### Schritt 3: Alle `KolSingleSelect`-Instanzen ersetzen

Ersetze in folgenden Dateien alle `KolSingleSelect`-Importe und -Verwendungen durch `AutoSingleSelect`:

| Datei | Anzahl Instanzen | Selects |
|-------|-----------------|---------|
| `src/components/FilterBar.tsx` | 7 | stack, layer, sublayer, relation, dependency-depth, dependency-type, sort |
| `src/components/SettingsForm.tsx` | 1 | theme |
| `src/components/LanguageSwitcher.tsx` | 1 | language |
| `src/pages/DependencyGraphPage.tsx` | 1 | graph-root |

Import-Änderung pro Datei:
```tsx
// Vorher:
import { KolSingleSelect } from '@public-ui/preact';
// Nachher:
import { AutoSingleSelect as KolSingleSelect } from '../components/AutoSingleSelect';
```

Durch Alias `as KolSingleSelect` entfällt die Notwendigkeit, alle JSX-Tags umzubenennen.

### Schritt 4: Typsicherheit sicherstellen

```bash
pnpm typecheck
```

Falls `_on.onBlur` nicht im Typ von `@public-ui` definiert ist, Strategie B (div-Wrapper) wählen und Strategie-A-Code entfernen.

### Schritt 5: Tests schreiben

**Neue Datei:** `src/components/__tests__/AutoSingleSelect.test.tsx`

Testfälle:
- Blur ohne Wert (`_value={undefined}`) → `onChange` mit erstem Option-Wert aufgerufen
- Blur mit leerem String (`_value=""`) → `onChange` **nicht** aufgerufen (leerer String = gültige Wahl)
- Blur mit gültigem Wert → `onChange` nicht aufgerufen
- Alle Optionen disabled → `onChange` nicht aufgerufen
- `onChange` nicht in `_on` definiert → kein Fehler

### Schritt 6: Manueller End-to-End-Test im Browser

```bash
pnpm dev
```

Prüfen:
1. FilterBar Sort-Select: Tab auf Select, sofort Tab weiter → Wert bleibt `'overall'` (bereits gesetzt, kein Trigger)
2. Neuladen der Seite → alle Selects zeigen korrekten Standardwert
3. Ein Select dessen `_value` programmatisch auf `null` gesetzt wird → nach Blur wird erste Option gesetzt

### Schritt 7 (letzter Schritt): Plan-Datei löschen

Nach erfolgreicher Implementierung und Merge dieses Features:

```bash
rm docs/plans/auto-select-first-option.md
```

## Dokumentations-Updates

Keine externen Dokumentationsänderungen notwendig. Die neue Komponente `AutoSingleSelect` ist selbsterklärend.

## Risiken & Mitigationen

| Risiko | Wahrscheinlichkeit | Mitigation |
|--------|-------------------|------------|
| `_on.onBlur` nicht in @public-ui 4.1.2 typisiert | Mittel | Strategie B (div-Wrapper) als Fallback |
| Shadow DOM blockiert `focusout`-Bubbling beim div-Wrapper | Niedrig | `onFocusOut` statt `onBlur` auf div; testen mit `composed: true` |
| Unerwartete Auto-Selects bei Selects mit `_value=""` | Kein Risiko | Options-Existenz-Prüfung (`some`) deckt `''` korrekt ab — nur auto-select wenn `''` nicht in Optionen |
| TypeScript-Fehler durch inkompatible Props | Niedrig | Typen von `KolSingleSelect` direkt über `ComponentProps` ableiten |

## Offene Fragen

1. **Unterstützt `KolSingleSelect._on` einen `onBlur`-Handler** in Version 4.1.2? → Nach `pnpm install` in Typdefinitionen prüfen.
2. **Verhalten bei `_disabled`-Selects:** Soll Auto-Select auch für deaktivierte Selects gelten? Empfehlung: Nein — bei disabled kein `focusout` möglich.
