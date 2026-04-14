# Plan: Maintainer-Kontext für den Souveränitäts-Score

## Kontext

Nach Einführung der sechs internationalen Referenz-Stacks
(`docs/plans/govtech-stacks-metadata.md`) entstand ein Nebeneffekt: Stacks mit
nationalen Kernbausteinen wie BundID (Germany), Aadhaar/UPI (India),
Singpass/Myinfo (Singapore), GOV.UK One Login/Pay/Notify (UK) oder EUDI Wallet
ranken im Stack-Ø niedrig, obwohl diese Items für ihre Maintainer-Organisation
**vollständig kontrolliert** sind.

Die heutige Berechnung (`src/utils/sovereigntyScore.ts`) bewertet Items
ausschließlich aus der Perspektive eines generischen externen Nutzers. Für
publikumsoffene OSS-Bausteine ist das korrekt. Für hoheitlich maintainerte,
intern zugängliche Systeme unterbewertet es die tatsächliche Souveränität.

**Ziel**: Wenn ein Stack die Rolle `maintainer` für ein Item ausweist, sollen
die Kriterien, die **Kontrollierbarkeit** repräsentieren, als erfüllt gelten —
weil die Maintainer-Organisation sie inhärent kontrolliert. Fehlender
öffentlicher Zugang ist aus Maintainer-Sicht eine **bewusste Sicherheits-
maßnahme** und darf den Score nicht mindern.

---

## Designentscheidung

### Kriterien-basiertes Override statt Pauschal-100

Ein flaches `score = 100` für jedes Maintainer-Item würde verstecken, dass
auch ein maintainertes Altsystem kein Audit oder keine Projektreife haben
kann. Wir überschreiben deshalb **genau die sechs Kontrollierbarkeits-Flags**
und lassen die faktischen Flags unangetastet:

| Kriterium                 | Maintainer-Override? | Warum |
|---------------------------|----------------------|-------|
| `openSource`              | ✅ auf `true`         | Maintainer hat Quellcode |
| `permissiveLicense`       | ✅ auf `true`         | Maintainer ist Lizenzgeber |
| `selfHostable`            | ✅ auf `true`         | Maintainer hostet selbst |
| `dataPortability`         | ✅ auf `true`         | Maintainer hält die Daten |
| `openStandards`           | ✅ auf `true`         | Maintainer definiert die Protokolle |
| `noTelemetryByDefault`    | ✅ auf `true`         | Maintainer kontrolliert Telemetrie |
| `hasAudit`                | ❌ unverändert         | Externe Assurance, nicht durch Eigentum ersetzbar |
| `matureProject`           | ❌ unverändert         | Reife ist zeitliches Faktum |
| `euHeadquartered`         | ❌ unverändert         | Gerichtsstand ist Faktum |
| `ownerType`               | ❌ unverändert         | Governance-Modell ist Faktum |

In der Praxis landet ein typisches Maintainer-Item damit bei **95–100**
Punkten — souverän, aber nicht blind geblendet.

### Zweistufige Score-Semantik

- **`rawScore`** — der öffentlich bewertete Score. Zeigt Drittnutzer-Perspektive.
- **`score`** — der effektive Score mit Maintainer-Boost, wenn relevant. Wird
  in Karten-Badge, Detail-Drawer, Sortierung und Stack-Ø verwendet.

Beide Werte sind in der UI sichtbar, damit Stack-Vergleiche nicht opaque werden.

---

## Kritische Dateien

| Datei | Änderung |
|---|---|
| `src/utils/sovereigntyScore.ts` | NEU: `applyMaintainerContext`, `roleGrantsMaintainerSovereignty`, `computeEffectiveSovereigntyScore`, `computeEffectiveSovereigntyScoreResult`, `getMaintainerBoostedCriteria` |
| `src/utils/index.ts` | Re-Exports der neuen Funktionen |
| `src/components/ArticleCard.tsx` | Nutzt `computeEffectiveSovereigntyScoreResult`, zeigt Boost-Badge und Drawer-Hinweis, markiert durch Kontext erfüllte Kriterien |
| `src/components/CategoryGrid.tsx` | Sortierung berücksichtigt Stack-Rolle via `stackItemMap` |
| `src/components/StackStats.tsx` | Ø-Score über `computeEffectiveSovereigntyScore` |
| `src/i18n/locales/{de,en,fr}/common.json` | Neue `article.maintainerBoost.*` Strings |
| `src/style.scss` | Badge-Outline, Drawer-Hinweis-Box, `drawer-criteria-item--boosted` |
| `docs/SCORING_SCALE_DESIGN.md` | Neuer Abschnitt „Kontextualisierung: Maintainer-Souveränität" |

---

## Bewusst nicht umgesetzt

- **Kein Datenmodell-Change**: `sovereigntyCriteria` bleibt pro Item fix. Der
  Boost ist eine Score-Funktion, kein persistiertes Feld — sonst müsste man
  dasselbe Item pro Stack verschieden speichern.
- **Keine anderen Rollen geboostet**: `contributor` / `funder` erhalten (noch)
  keinen Boost. Sie haben zwar Einfluss, aber nicht die volle Kontrolle.
- **Keine Item-Detail-Seite außerhalb des Drawers** angepasst — es existiert
  keine.
- **Keine neuen Tests**: Repo hat derzeit keine Unit-Tests für
  `sovereigntyScore`. TypeScript-Prüfung + E2E-Smoke-Test reichen.

---

## Verifikation

1. `pnpm exec tsc --noEmit` → clean
2. `node scripts/validate-schemas.mjs` → 183 Dateien valid (keine Schema-Änderung)
3. `node scripts/generate-data.mjs` → unverändert (keine Datenänderung)
4. `pnpm run build` → erfolgreich
5. Manuell im Dev-Server:
   - Stack „Germany" aktivieren → BundID-Karte zeigt `⇪`-Marker und hohen Score.
   - Detail-Drawer zu BundID zeigt blauen Hinweis mit Erklärung + Liste der
     geboosteten Kriterien.
   - Stack-Ø steigt sichtbar gegenüber dem Ohne-Stack-Ø.
   - Sortierung nach Score im Stack platziert Maintainer-Items oben.
