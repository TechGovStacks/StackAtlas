# Item-Ranking-Metriken und Hierarchisches Scoring-System

## Überblick

Das Accessible D-Stack Landscape nutzt ein **hierarchisches Metriken-System mit Hybrid-Skala**, um die Souveränität und Eignung von Technologien, Standards und Tools zu bewerten. Dieses System arbeitet auf mehreren Ebenen:

1. **Items** (einzelne Technologien) - haben Sovereignty Criteria (0-100 Score + Kategorie)
2. **Sublayer** (Kategorien) - aggregieren Item-Metriken + eigene Criteria
3. **Layer** (5 Top-Level Layer) - aggregieren Sublayer-Metriken + eigene Criteria
4. **Stacks** (Regierungen/Organisationen) - kombinieren alle Scores mit Rollen-Multiplikatoren

```
Item → Sublayer → Layer → Stack
   ↓       ↓        ↓        ↓
 Criteria + Criteria + Criteria + Relation
Score+Cat  Score     Score     Score
```

### Hybrid-Skala (6 Kategorien)

Jeder Score wird in eine Kategorie mit Farbcodierung eingeordnet:

| Kategorie | Range | Farbe | Bedeutung |
|-----------|-------|-------|-----------|
| Unzureichend | 0-30 | 🔴 Rot | Nicht empfohlen, erhebliche Risiken |
| Minimal | 31-45 | 🟠 Orange | Nur unter bestimmten Bedingungen |
| Ausreichend | 46-60 | 🟡 Gelb | Akzeptabel, Verbesserung nötig |
| Gut | 61-75 | 🟢 Hellgrün | Empfohlen für die meisten Fälle |
| Ausgezeichnet | 76-90 | 🟢 Grün | Sehr empfohlen, hervorragende Souveränität |
| Hervorragend | 91-100 | 🟢 Dunkelgrün | Gold-Standard, optimale Souveränität |

**Vorteile der Hybrid-Skala:**
- ✅ Psychologisch optimal (6 Kategorien für menschliche Wahrnehmung)
- ✅ Visuelle Differenzierung durch Farbcodierung
- ✅ Numerische Granularität (0-100) bleibt sichtbar
- ✅ Intuitiv verstehbar für Laien und Techniker
- ✅ International verständliche Farbzuordnung

---

## Hierarchische Architektur

### Layer (Top-Level)

Die Architektur folgt dem **Splash-Modell** mit 5 Layers:

| ID | Name | Beschreibung | Weight | Zweck |
|----|------|-------------|--------|-------|
| `infrastructure` | Infrastructure | Server, Cloud, Netzwerk | 1.0 | Basis-Infrastruktur |
| `platform` | Platform | Betriebssysteme, Middleware | 1.0 | Plattform-Services |
| `building-blocks` | Building Blocks | Bibliotheken, APIs, Standards | 1.0 | Bausteine |
| `applications` | Applications | End-User Applikationen | 1.0 | Anwendungen |
| `sovereign-standards` | Sovereign Standards | Technische Standards & Protokolle | 1.0 | Standards |

**Layer-Weight:** Faktor für die Berechnung des Gesamtscores. Default: 1.0 (Bereich: 0-5)

### Sublayer (Kategorien)

Jeder Layer kann mehrere **Sublayer** enthalten. Items können einem Sublayer zugeordnet werden, um sie zu kategorisieren. Das `sublayer`-Feld ist **optional**.

**Beispiele:**
- Layer: `infrastructure` 
  - Sublayer: `storage`, `compute`, `networking`, `security`
- Layer: `platform`
  - Sublayer: `operating-systems`, `database`, `messaging`
- Layer: `applications`
  - Sublayer: `office`, `communication`, `content-management`

**Sublayer haben:**
- `id` (eindeutig)
- `name` (lokalisiert)
- `parentLayer` (Zugehörigkeit)
- `weight` (0-5, default 1.0) - für aggregierte Scoring
- Eigene Metrics/Criteria

### Items

Items sind **konkrete Technologien oder Standards** (z.B. Nextcloud, Kubernetes, ActivityPub).

**Jedes Item gehört zu einem Layer. Das `sublayer`-Feld ist optional:**

```json
{
  "id": "nextcloud",
  "name": "Nextcloud",
  "layer": "applications",
  "sublayer": "content-management",  // Optional: Unterkategorisierung
  "description": { "de": "...", "en": "..." },
  "sovereigntyCriteria": { ... }
}
```

---

## Item-Metriken (Sovereignty Criteria)

Items werden anhand von **7 booleschen Kriterien** und einem optionalen **Ownership-Typ** bewertet.

### Kriterium-Katalog

| Kriterium | Punkte | Beschreibung |
|-----------|--------|-------------|
| `openSource` | +30 | Open-Source mit öffentlich zugänglichem Quellcode |
| `euHeadquartered` | +25 | Hauptsitz oder rechtliche Registrierung in der EU |
| `hasAudit` | +20 | Dokumentierter, öffentlich verfügbarer Sicherheits-/Compliance-Audit |
| `permissiveLicense` | +10 | Permissive oder Copyleft Open-Source Lizenz |
| `matureProject` | +10 | Reifes Projekt mit stabiler Lifecycle-Status |
| `largeEcosystem` | +5 | Große Community/Ecosystem (z.B. >1000 GitHub Stars) |
| **Summe (ohne ownerType)** | **+100** | **Maximaler Score ohne Owner-Typ** |

### Owner Type (Optional, aber wichtig)

Der `ownerType` beschreibt das **Geschäftsmodell/die Eigentumsstruktur** und kann den Score um 0-15 Punkte erhöhen:

| Owner Type | Punkte | Beschreibung |
|-----------|--------|-------------|
| `independentConsortium` | +15 | Unabhängige Konsortien oder Multi-Stakeholder Projekte |
| `community` | +10 | Community-getriebenes Projekt |
| `corporation` | +5 | Unternehmensgestütztes Projekt |
| `oneManShow` | +0 | Einzelne Person / Minimale Unterstützung |

### Scoring-Logik für Items

```javascript
// 1. BASIS-SCORE: Summe aller true-Kriterien
baseScore = (openSource ? 30 : 0) 
          + (euHeadquartered ? 25 : 0)
          + (hasAudit ? 20 : 0)
          + (permissiveLicense ? 10 : 0)
          + (matureProject ? 10 : 0)
          + (largeEcosystem ? 5 : 0)
// Basis kann maximal 100 Punkte sein

// 2. OWNER-SCORE hinzufügen
ownerScore = ownerType ? OWNER_WEIGHTS[ownerType] : 0

// 3. GESAMTSCORE berechnen
numericScore = baseScore + ownerScore

// 4. WICHTIG: Cap ohne ownerType
if (!ownerType) {
  numericScore = Math.min(numericScore, 60)  // Maximum 60 wenn ownerType fehlt
}

// 5. Finaler Score (0-100)
numericScore = Math.min(numericScore, 100)

// 6. KATEGORISIERUNG (Hybrid-Skala)
if (numericScore <= 30) category = 'insufficient'      // 🔴
else if (numericScore <= 45) category = 'minimal'      // 🟠
else if (numericScore <= 60) category = 'adequate'     // 🟡
else if (numericScore <= 75) category = 'good'         // 🟢 (hellgrün)
else if (numericScore <= 90) category = 'excellent'    // 🟢 (grün)
else category = 'outstanding'                          // 🟢 (dunkelgrün)

// 7. FARBE zuweisen
const colors = {
  'insufficient': '#D32F2F',   // Rot
  'minimal': '#F57C00',        // Orange
  'adequate': '#F9A825',       // Gelb
  'good': '#7CB342',           // Hellgrün
  'excellent': '#388E3C',      // Grün
  'outstanding': '#1B5E20'     // Dunkelgrün
}
color = colors[category]

// 8. PERCENTILE in Kategorie berechnen (0-100)
categoryRange = CATEGORY_RANGES[category]  // z.B. 46-60 für 'adequate'
percentileInCategory = ((numericScore - categoryRange.min) / (categoryRange.max - categoryRange.min)) * 100
```

**Ergebnis:**
```typescript
SovereigntyScoreResult {
  score: 72,              // 0-100
  category: 'good',       // Eine von 6 Kategorien
  color: '#7CB342',       // Hex-Farbe für UI
  percentileInCategory: 60 // Position in Kategorie (0-100)
}
```

### Beispiele für Item-Scoring

**Beispiel 1: Linux (sehr souveränisch)**
```
openSource: true         (+30)
euHeadquartered: false   (0)
hasAudit: true          (+20)
permissiveLicense: true (+10)
matureProject: true     (+10)
largeEcosystem: true    (+5)
ownerType: community    (+10)
─────────────────────
Score: 85/100
```

**Beispiel 2: Proprietary Software (nicht souveränisch)**
```
openSource: false        (0)
euHeadquartered: false   (0)
hasAudit: true          (+20)
permissiveLicense: false (0)
matureProject: true     (+10)
largeEcosystem: true    (+5)
ownerType: corporation  (+5)
─────────────────────
Score: 40/100
```

**Beispiel 3: Open-Source ohne Owner-Type (limitiert)**
```
openSource: true         (+30)
euHeadquartered: true    (+25)
hasAudit: true          (+20)
permissiveLicense: true (+10)
matureProject: true     (+10)
largeEcosystem: true    (+5)
ownerType: undefined    (0)
────────────────── → 100 Basis
ABER: Maximum ohne ownerType = 60
─────────────────────
Score: 60/100 (gedeckelt!)
```

**Wichtig:** Ein Item mit fehlendem `ownerType` kann maximum 60 Punkte bekommen, auch wenn alle anderen Kriterien erfüllt sind!

---

## Sublayer-Metriken (Proposed)

Sublayer aggregieren nicht nur die Item-Scores, sondern haben auch **eigene Criteria**, die die Gesamtqualität der Kategorie beschreiben.

### Vorgeschlagene Sublayer-Criteria

| Kriterium | Punkte | Beschreibung |
|-----------|--------|-------------|
| `completeness` | +20 | Anteil Items mit vollständiger Dokumentation (≥80%) |
| `standards_compliance` | +15 | Items folgen gemeinsamen Standards/Schnittstellen |
| `integration_maturity` | +15 | Tools/Technologien sind reif für Integration |
| `vendor_diversity` | +15 | Mehrere unabhängige Anbieter/Projekte verfügbar |
| `active_maintenance` | +20 | ≥80% der Items werden aktiv gepflegt (letzte Update <1 Jahr) |
| `ecosystem_size` | +15 | Große durchschnittliche Community (avg Stars >1000) |
| **Summe** | **+100** | **Maximaler Score** |

### Sublayer-Score Berechnung

```javascript
// Basis-Score: Eigene Criteria
sublayerBaseScore = (completeness ? 20 : 0)
                  + (standards_compliance ? 15 : 0)
                  + (integration_maturity ? 15 : 0)
                  + (vendor_diversity ? 15 : 0)
                  + (active_maintenance ? 20 : 0)
                  + (ecosystem_size ? 15 : 0)

// Aggregierte Item-Scores (gewichtet)
itemsAverageScore = AVERAGE(item.sovereigntyScore für alle Items im Sublayer)

// Kombinierter Score (Gewichtung: 60% Items, 40% Criteria)
// WICHTIG: Das Sublayer-Weight wird später auf Layer-Ebene mit WEIGHTED_AVERAGE angewendet
sublayerScore = (itemsAverageScore * 0.6) + (sublayerBaseScore * 0.4)
```

---

## Layer-Metriken (Proposed)

Layer sind Top-Level-Kategorien und aggregieren Sublayer. Sie haben auch eigene Criteria für die strategische Bewertung.

### Vorgeschlagene Layer-Criteria

| Kriterium | Punkte | Beschreibung |
|-----------|--------|-------------|
| `strategic_importance` | +20 | Kritisch für digitale Souveränität? |
| `solution_availability` | +15 | Genug alternative Lösungsoptionen? |
| `lock_in_risk` | +15 | Geringes Risiko für Vendor Lock-in? |
| `skills_availability` | +15 | Sind Fachkräfte für diesen Layer verfügbar? |
| `interoperability` | +20 | Hohe Interoperabilität zwischen Items/Sublayern? |
| `compliance_landscape` | +15 | Alle Items erfüllen regulatorische Anforderungen? |
| **Summe** | **+100** | **Maximaler Score** |

### Layer-Score Berechnung

```javascript
// Basis-Score: Eigene Criteria
layerBaseScore = (strategic_importance ? 20 : 0)
               + (solution_availability ? 15 : 0)
               + (lock_in_risk ? 15 : 0)
               + (skills_availability ? 15 : 0)
               + (interoperability ? 20 : 0)
               + (compliance_landscape ? 15 : 0)

// Aggregierte Sublayer-Scores (gewichtet nach weight)
sublayersWeightedScore = WEIGHTED_AVERAGE(
  sublayer.score, 
  weight_by: sublayer.weight
)

// Kombinierter Score (Gewichtung: 70% Sublayer, 30% Criteria)
layerScore = (sublayersWeightedScore * 0.7) + (layerBaseScore * 0.3)

// WICHTIG: Das Layer-Weight wird später auf Stack-Ebene mit WEIGHTED_AVERAGE angewendet
// Nicht direkt hier anwenden, um Doppelgewichtung zu vermeiden!
```

---

## Aggregations-Logik

### Schritt-für-Schritt-Beispiel

**Annahme:** Infrastructure Layer mit 2 Sublayern (Storage, Compute)

**1. Item-Scores berechnen**
```
Storage Sublayer:
  - Nextcloud:    60/100
  - Ceph:         75/100
  - MinIO:        70/100
  Average:        68/100

Compute Sublayer:
  - Kubernetes:   85/100
  - OpenStack:    80/100
  - OpenShift:    82/100
  Average:        82/100
```

**2. Sublayer-Scores** (Gewicht wird auf Layer-Ebene angewendet)
```
Storage:
  - Items Average:        68/100
  - Criteria (z.B.):      80/100
  - Combined: (68 × 0.6) + (80 × 0.4) = 72.8
  - Score:                72.8/100

Compute:
  - Items Average:        82/100
  - Criteria (z.B.):      90/100
  - Combined: (82 × 0.6) + (90 × 0.4) = 85.2
  - Score:                85.2/100
```

**3. Layer-Score** (Gewichteter Durchschnitt der Sublayer mit Gewichten)
```
Infrastructure:
  - Sublayer Average:     (72.8 + 85.2) / 2 = 79.0
  - Criteria (z.B.):      85/100
  - Combined: (79.0 × 0.7) + (85 × 0.3) = 80.8
  - Score:                80.8/100
```

---

## Stack-Integration

### Rollen-Multiplikatoren

Ein Stack kombiniert Items aus verschiedenen Sublayern/Layern und weist ihnen **Rollen** zu. Jede Rolle hat einen Multiplikator:

| Rolle | Multiplikator | Bedeutung |
|-------|--------------|----------|
| `maintainer` | 1.0x | Wir entwickeln/warten dieses Projekt aktiv |
| `contributor` | 0.75x | Wir tragen bei, haben aber nicht vollständige Kontrolle |
| `funder` | 0.5x | Wir finanzieren das Projekt |
| `consumer` | 0.25x | Wir nutzen es nur |

### Stack-Score Berechnung

```javascript
// Für jedes Item im Stack:
itemStackScore = item.sovereigntyScore × role.multiplier

// Durchschnitt aller Items im Stack:
stackAverageScore = AVERAGE(itemStackScore für alle Items)

// Optional: Gewichtet nach Layer-Weight:
stackLayerWeightedScore = WEIGHTED_AVERAGE(
  item.sovereigntyScore,
  weight_by: item.layer.weight
) × role.multiplier

// Gesamtscore des Stacks:
stackFinalScore = AVERAGE oder WEIGHTED_AVERAGE
```

### Beispiel: Germany Stack

```
Items im Stack:
  - Nextcloud (applications/content-management):     60/100 × 1.0 (maintainer) = 60
  - Kubernetes (infrastructure/compute):             85/100 × 0.75 (contributor) = 63.75
  - Keycloak (platform/identity):                    72/100 × 0.5 (funder) = 36
  - OnlyOffice (applications/office):               55/100 × 0.25 (consumer) = 13.75
  
Stack Average:  (60 + 63.75 + 36 + 13.75) / 4 = 43.4/100

Stack Status: "Low Sovereignty" (unter 50)
```

---

## JSON Schema Referenz

### Layer Schema
**Datei:** `/data/schemas/layer.schema.json`

```json
{
  "id": "infrastructure",              // Eindeutige ID
  "order": 1,                           // Display-Reihenfolge (1-5)
  "name": {                             // Lokalisiert
    "de": "Infrastruktur",
    "en": "Infrastructure"
  },
  "description": { ... },               // Optional
  "color": "#FF5722",                   // Hex-Farbe
  "weight": 1.0                         // 0-5, für Scoring-Gewichtung
}
```

### Item Schema
**Datei:** `/data/schemas/item.schema.json`

```json
{
  "id": "nextcloud",
  "name": "Nextcloud",
  "layer": "applications",
  "sublayer": "content-management",      // Optional: Unterkategorisierung
  "description": { "de": "...", "en": "..." },
  "oss": true,
  "license": "AGPL-3.0",
  "sovereigntyCriteria": {
    "openSource": true,
    "euHeadquartered": true,
    "hasAudit": true,
    "permissiveLicense": true,
    "matureProject": true,
    "largeEcosystem": true,
    "ownerType": "community"              // Optional, max 60 wenn fehlt
  },
  "github": { "repo": "...", "stars": 5000 },
  "audit": { "lastDate": "2024-06-15", "url": "..." },
  "homepage": "https://nextcloud.com",
  "logo": "...",
  "tags": ["cloud", "storage", "office"]
}
```

### Stack Schema
**Datei:** `/data/schemas/stack.schema.json`

```json
{
  "id": "germany",
  "name": { "de": "Deutschland Stack", "en": "Germany Stack" },
  "version": "1.0.0",
  "items": [
    {
      "itemId": "nextcloud",
      "status": "recommended",
      "role": "maintainer",               // Multiplikator!
      "since": "2024-01-01",
      "rationale": { "de": "...", "en": "..." }
    }
  ]
}
```

### Relation Schema
**Datei:** `/data/schemas/relation.schema.json`

```json
{
  "stack": "germany",
  "item": "nextcloud",
  "role": "maintainer",                  // 1.0x
  "rationale": { ... },
  "alternatives": ["owncloud", "pydio"]
}
```

---

## TypeScript Types

**Datei:** `/src/types/index.ts`

```typescript
export type Layer = {
  id: string;                           // "infrastructure", etc.
  order: number;                        // 1-5
  name: LocalizableText;
  description?: LocalizableText;
  color: string;                        // Hex (#RRGGBB)
  weight?: number;                      // 0-5, default 1
};

export type Item = {
  id: string;
  name: LocalizableText;
  layer: string;                        // Layer ID (erforderlich)
  sublayer?: string;                    // Optional: Unterkategorisierung
  description: LocalizableText;
  sovereigntyCriteria: SovereigntyCriteria;
  sovereigntyScore?: number;            // Berechnet, nicht manuell
  // ... weitere Felder
};

export type SovereigntyCriteria = {
  openSource: boolean;                  // +30
  euHeadquartered: boolean;             // +25
  hasAudit: boolean;                    // +20
  permissiveLicense: boolean;           // +10
  matureProject: boolean;               // +10
  largeEcosystem: boolean;              // +5
  ownerType?: OwnerType;                // Optional: +0 to +15
};

export type OwnerType = 
  | 'independentConsortium'             // +15
  | 'community'                         // +10
  | 'corporation'                       // +5
  | 'oneManShow';                       // +0
```

---

## Scoring-Utility

**Datei:** `/src/utils/sovereigntyScore.ts`

```typescript
export function computeSovereigntyScore(criteria: SovereigntyCriteria): number {
  // Berechnet 0-100 Score basierend auf Criteria
  // Siehe Implementation für Details
}

export function computeOwnerScore(ownerType?: OwnerType): number {
  // Gibt Punkte für Owner Type (0-15)
}
```

---

## Praktische Beispiele

### Vollständiges Item-Beispiel (JSON)

```json
{
  "id": "kubernetes",
  "name": "Kubernetes",
  "layer": "infrastructure",
  "sublayer": "compute",
  "description": {
    "de": "Open-Source Orchestrierungsplattform für Container",
    "en": "Open-source container orchestration platform"
  },
  "oss": true,
  "license": "Apache-2.0",
  "maturity": "graduated",
  "tags": ["container", "orchestration", "kubernetes"],
  "sovereigntyCriteria": {
    "openSource": true,
    "euHeadquartered": false,
    "hasAudit": true,
    "permissiveLicense": true,
    "matureProject": true,
    "largeEcosystem": true,
    "ownerType": "independentConsortium"
  },
  "github": {
    "repo": "https://github.com/kubernetes/kubernetes",
    "stars": 105000
  },
  "audit": {
    "lastDate": "2024-05-20",
    "url": "https://www.cncf.io/blog/kubernetes-security-audit-2024/"
  },
  "homepage": "https://kubernetes.io"
}
```

**Berechneter Score:** 85/100
- openSource: ✓ +30
- euHeadquartered: ✗ 0
- hasAudit: ✓ +20
- permissiveLicense: ✓ +10
- matureProject: ✓ +10
- largeEcosystem: ✓ +5
- ownerType (independentConsortium): +15
- **Total: 85/100** ✓

---

## UI-Integration

### Komponenten, die Metriken verwenden

1. **ArticleCard.tsx** - Zeigt Item-Score mit Farbcodierung
   - Score ≥ 70: Grün (High Sovereignty)
   - Score 40-70: Orange (Medium Sovereignty)
   - Score < 40: Rot (Low Sovereignty)

2. **CategoryGrid.tsx** - Sortiert Items nach Score (aufsteigend/absteigend)

3. **StackStats.tsx** - Berechnet durchschnittlichen Score für einen Stack

4. **FilterBar.tsx** - UI zum Sortieren nach Name oder Score

---

## Zusammenfassung

Die **Hierarchy of Metrics** ermöglicht:

✓ **Detaillierte Item-Bewertung** via Sovereignty Criteria (0-100)
✓ **Kategorie-Bewertung** auf Sublayer-Ebene (Item-Aggregation + eigene Criteria)
✓ **Strategic Assessment** auf Layer-Ebene (Sublayer-Aggregation + eigene Criteria)
✓ **Stack-bezogene Scores** mit Rollen-Multiplikatoren (für Regierungen/Organisationen)
✓ **Gewichtung auf allen Ebenen** via `weight` Feld (0-5)

Dieses System ermöglicht es:
- **Transparente Bewertung:** Jeder Punkt ist nachvollziehbar
- **Flexible Aggregation:** Gewichtung nach Wichtigkeit
- **Mehrdimensionale Analyse:** Items, Kategorien, Layer, Stacks
- **Differenzierte Rollenmodelle:** Stack-Kontext mit Multiplikatoren

---

## Adoption Score (Stack-Häufigkeit)

Der **Adoption Score** misst, wie oft ein Item tatsächlich in den kuratierten Stacks vorkommt und in welcher Form (Rolle, Status). Dies ist ein unabhängiges Signal für Ökosystem-Konvergenz, separate vom intrinsischen Sovereignty Score.

### Berechnung

#### 1. Direct Coverage (direkte Stack-Erscheinungen)
```javascript
directCoverage(item) = 
  Σ über alle Stacks S, die item enthalten:
      ROLE_W[stackItem.role] 
      × STATUS_W[stackItem.status] 
      × SIZE_DAMP(S)

// Gewichte:
ROLE_WEIGHTS = {
  maintainer:  1.0,   // Höchste Priorat
  contributor: 0.8,
  consumer:    0.5,
  funder:      0.4
}

STATUS_WEIGHTS = {
  recommended: 1.0,
  approved:    0.7,
  deprecated:  0.1    // Niedrig, aber noch sichtbar
}

// Größen-Normalisierung: größere Stacks haben gedämpften Einfluss
SIZE_DAMP(stack) = 1 / (1 + log10(max(1, stack.items.length / 20)))
```

#### 2. Transitive Coverage (indirekter Einfluss)
```javascript
transitiveCoverage(item) =
  Σ über Abhängigkeiten X von item:
      0.3 × directCoverage(X)  // γ = 0.3 (30% Gewicht)
```

Items, die als Voraussetzung für weit verbreitete Items dienen, erhalten indirekten Score-Kredit.

#### 3. Geographic Diversity (Multiplikator)
```javascript
diversity(item) = 1 - Σ p_c²  // Simpson-Diversitäts-Index
  wobei p_c = Anteil der Stacks aus Land c
  Bereich: [0, 1] (0 = mono-kultur, 1 = perfekt diverse)

rawAdoption = log1p(directCoverage + transitiveCoverage)
            × (0.6 + 0.4 × diversity)
```

Die geografische Vielfalt wirkt als Multiplikator (0.6 bis 1.0): Items, die nur in einem Land vorkommen, erhalten weniger Kredit.

#### 4. Normalisierung auf [0, 100]
```javascript
adoptionScore = round(100 × rawAdoption / max(rawAdoption über alle Items))
```

### Sovereign Adoption Score

Zusätzlich gibt es einen **sovereignAdoptionScore**, der die gleiche Formel nutzt, aber nur auf Items/Stacks mit Sovereignty ≥ 61 ("good") angewendet wird.

### AdoptionResult Datenstruktur

```typescript
export type AdoptionResult = {
  adoptionScore: number;           // 0-100: allgemeine Adoption
  sovereignAdoptionScore: number;  // 0-100: Adoption durch souveräne Stacks
  overallScore: number;            // 0-100: kombinierter Score (siehe unten)
  directCoverage: number;          // Gewichtete Summe der direkten Erscheinungen
  transitiveCoverage: number;      // Indirekte Abhängigkeitskredit
  diversity: number;               // Simpson-Index (0-1)
  usedInStacks: string[];          // Stack-IDs, in denen dieses Item vorkommt
};
```

### Beispiele

**Beispiel 1: Ubiquitäres, nicht-souveränes Item (z.B. Microsoft Teams)**
```
- Vorkommt in: 12 Stacks (9× Deutschland, 3× international)
- Rollen: 10× consumer, 2× funder
- Status: 11× approved, 1× deprecated
- Größen-Dämpfung: klein
- Diversity: 0.4 (hauptsächlich DE)

adoptionScore = 72/100 (hohe Häufigkeit)
sovereignAdoptionScore = 5/100 (kaum in souveränen Stacks)
→ Wichtiges Ökosystem-Signal, aber nicht souveränisch!
```

**Beispiel 2: Seltenes, hochsouveränes Item (z.B. Keycloak)**
```
- Vorkommt in: 5 Stacks (de, fr, at, nl, be)
- Rollen: 3× maintainer, 1× contributor, 1× consumer
- Status: 5× recommended
- Größen-Dämpfung: normal
- Diversity: 0.9 (europäisch diverse)

adoptionScore = 45/100 (kleine Häufigkeit, aber gut verteilt)
sovereignAdoptionScore = 40/100 (nur in guten/excellent Stacks)
→ Spezialisiertes Werkzeug mit hoher Souveränität
```

---

## Overall Score (Kombinierter Default-Score)

Der **Overall Score** kombiniert alle drei Perspektiven für die Default-Sortierung und Anzeige:

```javascript
overallScore = round(
  0.60 × sovereigntyScore           // Dominante Basis: intrinsische Qualität
  + 0.25 × sovereignAdoptionScore   // Ökosystem-Signal (nur souveräne Stacks)
  + 0.15 × adoptionScore            // Breitere Adoption
)

// Wertebereich: [0, 100], clamped
```

### Logik der Gewichte

- **60% Sovereignty:** Primär-Metrik bleibt die intrinsische Bewertung
- **25% Sovereign Adoption:** Ökosystem-Konvergenz unter Souveränen Items/Stacks
- **15% General Adoption:** Breitere Verbreitung als Zusatz-Signal

Diese Balance verhindert, dass ubiquitäre proprietäre Tools die Top-Rankings dominieren.

### Beispiel-Kombinationen

| Sovereignty | Sov. Adoption | Adoption | Overall | Interpretation |
|-------------|--------------|----------|---------|-----------------|
| 90          | 80           | 70       | 86      | Gold Standard: hochwertig + weit verbreitet |
| 85          | 50           | 30       | 74      | Spezialisiert: hochwertig, aber nischig |
| 65          | 40           | 85       | 65      | Pragmatisch: akzeptabel, aber verbreitet |
| 40          | 5            | 95       | 45      | Problematisch: weit verbreitet, aber nicht souveränisch |

---

## Stack-Level Metrics

Stacks bekommen aggregierte Durchschnitte aller ihrer Items:

```typescript
export type Stack = {
  // ... standard fields ...
  avgSovereigntyScore?: number;    // Ø Sovereignty über alle Items
  avgAdoptionScore?: number;       // Ø Adoption über alle Items
  avgOverallScore?: number;        // Ø Overall Score über alle Items
};
```

### Berechnung

```javascript
for stack in stacks:
  items = stack.items.map(si => getItem(si.itemId))
  avgSovereigntyScore = average(item.sovereigntyScore)
  avgAdoptionScore = average(item.adoption.adoptionScore)
  avgOverallScore = average(item.adoption.overallScore)
```

Diese Metriken ermöglichen:
- **Stacks mit hoher Souveränität identifizieren:** avgSovereigntyScore ≥ 75
- **Reife Ökosysteme erkennen:** avgAdoptionScore ≥ 50 + hohe Diversity
- **Default-Vergleich:** Overall Score als einheitliche Metrik

---

## Zusammenfassung (erweitert)

Die **Hierarchy of Metrics** mit Adoption und Overall Score ermöglicht:

✓ **Intrinsische Bewertung** (Sovereignty: Item-Qualität)
✓ **Ökosystem-Signal** (Adoption: Stack-Konvergenz)
✓ **Diversifizierte Perspektiven** (Overall Score: kombinierte Aussage)
✓ **Transparente Rankings** (alle drei Scores sichtbar, separately sortierbar)
✓ **Kontextualisierte Defaults** (Overall Score: ausgewogene Gewichtung)

Diese Kombination zeigt:
- Was technisch gut ist (Sovereignty)
- Was tatsächlich gemeinsam genutzt wird (Adoption)
- Was insgesamt für digitale Souveränität empfohlen wird (Overall)
