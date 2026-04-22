---
focus: dataEntities
title: Das Datenmodell von StackAtlas – Entitäten und ihre Relationen
summary: StackAtlas basiert auf einem klar strukturierten Datenmodell mit fünf zentralen Entitäten – Layer, Item, ItemDependency, Stack und StackItem – die miteinander verknüpft sind und das Fundament für Scoring und Analyse bilden.
---

# Das Datenmodell von StackAtlas – Entitäten und ihre Relationen

> **Kurzfazit:** Drei Kern-Entitäten (Layer, Item, Stack) und ein Abhängigkeitsgraph bilden das vollständige Wissensmodell, auf dem alle Bewertungen, Vergleiche und Visualisierungen aufbauen.

StackAtlas ist mehr als eine Liste von Technologien – es ist ein strukturiertes Wissensgraph-Modell, das Technologie-Einträge, Schichtenarchitektur, Länder-Stacks und Abhängigkeiten miteinander verknüpft. Dieser Beitrag erläutert die fünf zentralen Entitäten des Datenmodells und zeigt, wie sie zusammenwirken.

---

## Die fünf Entitäten im Überblick

| Entität            | Anzahl Instanzen | Zweck                                              |
| :----------------- | :--------------: | :------------------------------------------------- |
| **Layer**          |        5         | Technologie-Schichten (Infrastruktur bis Normen)   |
| **Item**           |       171        | Einzelne Technologien, Frameworks, Protokolle      |
| **ItemDependency** |     variabel     | Gerichtete Abhängigkeiten zwischen Items           |
| **Stack**          |        24        | Länderspezifische oder organisationale Tech-Stacks |
| **StackItem**      |     variabel     | Zuordnung eines Items zu einem Stack inkl. Rolle   |

---

## Layer – die Architekturschichten

Jedes Item ist genau einer der fünf **Layer** zugeordnet. Die Schichten bilden eine logische Hierarchie von der physischen Infrastruktur bis zu übergreifenden Normen:

| Reihenfolge | Layer                   |  Farbe  | Beispiele                                              |
| :---------: | :---------------------- | :-----: | :----------------------------------------------------- |
|      1      | **Infrastructure**      | #c5192d | Netzwerke, TLS, Kryptographie                          |
|      2      | **Platform**            | #1a56a0 | Cloud-Dienste, Container-Orchestrierung, KI-Frameworks |
|      3      | **Building Blocks**     | #00883d | APIs, Bibliotheken, SDKs                               |
|      4      | **Applications**        | #f39c12 | E-Government-Anwendungen, End-User-Software            |
|      5      | **Sovereign Standards** | #e8e8e8 | Interoperabilitätsnormen, Datenschutzstandards         |

Jeder Layer besitzt ein `weight`-Feld (0–5), das beeinflusst, wie stark Items dieser Schicht in aggregierten Bewertungen gewichtet werden.

---

## Item – das Herzstück des Modells

**Items** repräsentieren konkrete Technologien, Frameworks, Protokolle oder Standards. Mit 171 Einträgen bilden sie den größten Datenbestand.

### Kern-Felder

| Feld           |      Typ      | Bedeutung                                           |
| :------------- | :-----------: | :-------------------------------------------------- |
| `id`           | string (slug) | Eindeutiger Bezeichner, z. B. `react`, `kubernetes` |
| `name`         |    string     | Offizieller Name der Technologie                    |
| `layer`        |    string     | Zugehörige Architekturschicht (Pflichtfeld)         |
| `sublayer`     |    string     | Unterkategorie, z. B. `sicherheit`, `integration`   |
| `oss`          |    boolean    | Ist das Projekt Open Source?                        |
| `license`      |    string     | Lizenzbezeichner, z. B. `MIT`, `Apache-2.0`         |
| `ownerCountry` |    string     | ISO-3166-Ländercode des Eigentümers                 |

### Souveränitätskriterien (`sovereigntyCriteria`)

Jedes Item wird anhand von **9 binären Kriterien** bewertet, die zu einem Souveränitätsscore (0–100) aggregiert werden:

| Kriterium              | Punkte | Bedeutung                                         |
| :--------------------- | :----: | :------------------------------------------------ |
| `selfHostable`         |  +20   | Kann selbst gehostet werden                       |
| `openSource`           |  +15   | Quellcode öffentlich verfügbar                    |
| `dataPortability`      |  +15   | Daten können exportiert/migriert werden           |
| `permissiveLicense`    |  +10   | Freizügige Open-Source-Lizenz                     |
| `openStandards`        |  +10   | Basiert auf offenen Standards                     |
| `euHeadquartered`      |   +5   | Hauptsitz in der EU                               |
| `hasAudit`             |   +5   | Unabhängiges Sicherheitsaudit vorhanden           |
| `matureProject`        |   +5   | Reifes, stabiles Projekt                          |
| `noTelemetryByDefault` |   +5   | Keine Telemetrie ohne explizite Zustimmung        |
| `ownerType`            |  0–10  | Art des Eigentümers (Konsortium, Community, etc.) |

Der resultierende Score wird in Kategorien eingeteilt: `insufficient` → `minimal` → `adequate` → `good` → `excellent` → `outstanding`.

---

## ItemDependency – der Abhängigkeitsgraph

Items können **gerichtete Abhängigkeiten** zu anderen Items definieren. Diese Abhängigkeiten bilden einen gerichteten Graphen und ermöglichen transitive Analyse.

### Abhängigkeitstypen

| Typ           | Beispiel                |
| :------------ | :---------------------- |
| `runtime`     | Django → Python         |
| `language`    | Angular → TypeScript    |
| `protocol`    | Kubernetes → HTTP, TLS  |
| `compiles-to` | TypeScript → JavaScript |
| `build`       | Webpack → JavaScript    |

### Scope-Angaben

| Scope      | Bedeutung                         |
| :--------- | :-------------------------------- |
| `required` | Zwingend notwendig                |
| `optional` | Kann weggelassen werden           |
| `dev`      | Nur zur Entwicklungszeit benötigt |

Der in-memory **DependencyGraph** indiziert alle Kanten nach Quell- und Ziel-ID und ermöglicht sowohl direkte als auch transitive Auflösung bis zu einer konfigurierbaren Tiefe (1–3 Hops).

---

## Stack – nationale und organisationale Tech-Portfolios

**Stacks** bündeln Items zu einem kohärenten Technologie-Portfolio. Die 24 vorhandenen Stacks umfassen Länder (Deutschland, Frankreich, Indien …) sowie übernationale Organisationen (EU, EBSI, GovStack, OpenDesk).

### Stack-Felder

| Feld           |        Typ         | Bedeutung                                     |
| :------------- | :----------------: | :-------------------------------------------- |
| `country`      |       string       | ISO-Ländercode, z. B. `DE`, `FR`, `EU`        |
| `issuer`       |       string       | Herausgebende Organisation                    |
| `publishedAt`  |       string       | Veröffentlichungsdatum (ISO 8601)             |
| `items`        |    StackItem[]     | Zugeordnete Technologien mit Rolle und Status |
| `participants` | StackParticipant[] | Beteiligte Organisationen                     |

---

## StackItem – die Verbindung zwischen Stack und Item

**StackItems** sind die Verbindungsentität zwischen Stack und Item. Sie tragen neben der Referenz auch Metadaten zur Rolle und zum Status:

| Feld     |                        Werte                         | Einfluss auf Score  |
| :------- | :--------------------------------------------------: | :------------------ |
| `status` |      `recommended` / `approved` / `deprecated`       | Statusgewichtung    |
| `role`   | `maintainer` / `contributor` / `funder` / `consumer` | Score-Multiplikator |

Der **Rollen-Multiplikator** skaliert den Souveränitätsbeitrag: Ein Stack, der eine Technologie aktiv _pflegt_, profitiert stärker (1,0×) als einer, der sie nur _konsumiert_ (0,25×).

---

## Relationen im Überblick

```
Layer ──(1:n)──► Item ──(1:n)──► ItemDependency ──► Item
                  │
                  └──(n:m via StackItem)──► Stack ──(1:n)──► StackParticipant
```

- **Layer → Item**: Jedes Item gehört zu genau einem Layer.
- **Item → ItemDependency → Item**: Gerichteter Abhängigkeitsgraph zwischen Items.
- **Stack → StackItem → Item**: Stacks referenzieren Items mit Rolle und Status.
- **Stack → StackParticipant**: Organisationen, die an einem Stack beteiligt sind.
- **Item ← AdoptionResult**: Jedes Item kennt rückwirkend alle Stacks, die es einsetzen.

---

## Fazit

Das Datenmodell von StackAtlas ist bewusst flach gehalten – JSON-Dateien statt Datenbank – aber durch JSON-Schema-Validierung typsicher und durch den in-memory Abhängigkeitsgraphen hochflexibel auswertbar. Die klare Trennung von Layer, Item, Dependency und Stack ermöglicht sowohl detaillierte Einzelansichten als auch aggregierte Landes- und Schichtenvergleiche.

> "Wer die Entitäten versteht, versteht das Scoring – und wer das Scoring versteht, kann informierte Entscheidungen für souveräne digitale Infrastruktur treffen."

---

## Glossar

- **Layer**: Technologie-Architekturschicht (Infrastructure bis Sovereign Standards)
- **Item**: Einzelne Technologie, Framework oder Standard in StackAtlas
- **ItemDependency**: Gerichtete Abhängigkeit zwischen zwei Items (z. B. runtime, protocol)
- **Stack**: Nationales oder organisationales Technologie-Portfolio
- **StackItem**: Verbindungsentität zwischen Stack und Item mit Rolle und Status
- **Sovereigntyscore**: Aggregierter Bewertungswert (0–100) für digitale Souveränität
- **DependencyGraph**: In-memory-Adjazenzstruktur aller Item-Abhängigkeiten
