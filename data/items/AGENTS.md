# Agenten-Anweisung: sovereigntyCriteria-Recherche

## Scope

- Nur Items in `data/stacks/negz.json` → `items[]` bearbeiten
- Andere Items ignorieren
- Reihenfolge: Item ohne `lastResearchDate` oder mit ältestem Datum zuerst

## Recherche

**Was:** Für jedes Item die 9 sovereigntyCriteria aktuell prüfen + groupKey verifizieren:

- openSource, euHeadquartered, hasAudit, permissiveLicense
- matureProject, selfHostable, dataPortability, openStandards, noTelemetryByDefault
- **groupKey überprüfen:** Passt die Kategorisierung? Sollte ein groupKey hinzugefügt werden?

**Wie:**

- Mindestens 2 unabhängige, seriöse Quellen (GitHub, Wikipedia, offizielle Website, Fachportale)
- **Alle bestehenden Quellen erneut verifizieren** — Werte anpassen, wenn neue Erkenntnisse
- Falls keine Quellen gefunden: `researchSources = []` setzen
- **groupKey überprüfen:** Item-Typ identifizieren und mit bestehenden groupKeys vergleichen (z.B. programming-language, database, protocol)

**Spezialfall:** Addon/Plugin/Extension eines anderen Items?

- Dann: `matureProject = false`, `openStandards = false`, `dataPortability = false`, `selfHostable = false`
- Mit Begründung in `researchSources` dokumentieren

## Update

1. `sovereigntyCriteria`-Werte aktualisieren
2. **groupKey überprüfen** und ggf. hinzufügen/aktualisieren
3. `lastResearchDate` (Format: `YYYY-MM-DD`) setzen
4. **Keine Kommentare** im JSON
5. Alle Dateien validieren

## Quellen

Jede Quelle braucht:

- `type`: "url" | "file"
- `url` oder `path` (je nach Type)

**Wichtig:** Alte, unerreichbare Quellen dokumentieren (z.B. "offline seit [Datum]"), nicht löschen. Historia erhalten.
