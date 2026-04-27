# Agenten-Anweisung für sovereigntyCriteria-Recherche und Quellenpflege

**Meta-Anweisung:**

- Jede Optimierung oder Präzisierung dieser Agenten-Anweisung ist immer unmittelbar in dieser Datei zu dokumentieren und zu übernehmen. Die AGENTS.md in data/items/ ist stets die maßgebliche, aktuelle Referenz für alle Bearbeitungsschritte.
- Die Recherche erfolgt immer sequenziell: Es wird immer nur ein Item nach dem anderen recherchiert und aktualisiert. Zuerst werden alle Items ohne lastResearchDate bearbeitet, danach die mit dem jeweils ältesten lastResearchDate.
- Nach Abschluss einer Recherche können neue Erkenntnisse zum Rechercheprozess abschließend in dieser Datei ergänzt werden.
- Die AGENTS.md ist bei Bedarf zu optimieren und an neue Anforderungen oder Erkenntnisse anzupassen.

Durchsuche alle JSON-Dateien im Verzeichnis data/items/. Für jede Datei, in der das Feld sovereigntyCriteria existiert, recherchiere im Internet die aktuellen Meta-Informationen zu folgenden Kriterien:

- openSource
- euHeadquartered
- hasAudit
- permissiveLicense
- matureProject
- selfHostable
- dataPortability
- openStandards
- noTelemetryByDefault

Aktualisiere die Werte in sovereigntyCriteria entsprechend der recherchierten Fakten (Stand: 2026). Ergänze oder aktualisiere zusätzlich das Feld lastResearchDate (Format: YYYY-MM-DD) auf Top-Level mit dem aktuellen Datum der Recherche. Entferne alle Kommentare, sodass das JSON stets gültig bleibt. Wiederhole dies für alle relevanten Dateien, bis alle sovereigntyCriteria-Felder und lastResearchDate im gesamten Verzeichnis korrekt und aktuell befüllt sind.

**WICHTIG:**

- Bei jeder neuen Recherche müssen alle bestehenden researchSources erneut besucht und auf Aktualität/Erreichbarkeit geprüft werden.
- Verifiziere, ob die Informationen aus den bisherigen Quellen weiterhin gültig und relevant sind.
- Füge neue Quellen nur ergänzend hinzu, ersetze niemals bestehende Quellen ohne Grund.
- Wenn eine alte Quelle nicht mehr erreichbar oder relevant ist, dokumentiere dies mit einem Kommentar im researchSources-Objekt (z. B. "nicht mehr erreichbar am <Datum>").
- Die Historie und Nachvollziehbarkeit der Recherche muss immer erhalten bleiben.
- Jede Quelle muss ein type-Feld ("url" oder "file") und je nach Typ ein url- oder path-Feld enthalten.
