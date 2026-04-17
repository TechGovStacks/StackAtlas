# Items as Dependencies: Practical Examples

This document explains the conceptual model: **All Items are Dependencies, with Sovereign-Standards as foundational standards.**

## Overview

The StackAtlas data model uses a consistent hierarchy:

```
┌─────────────────────────────────────────────────────────┐
│                    5 LAYERS                             │
│  Infrastructure → Platform → Building-Blocks →          │
│  Applications → Sovereign-Standards                     │
└─────────────────────────────────────────────────────────┘
         ↓
         All Items are Dependencies
         ↓
┌─────────────────────────────────────────────────────────┐
│    STACKS commit to dependencies via roles:             │
│    maintainer | contributor | funder | consumer        │
└─────────────────────────────────────────────────────────┘
```

## Dependency Field Model (`item.dependencies`)

Items can reference other items via a typed dependency list:

```json
{
  "id": "react",
  "dependencies": [
    {
      "targetItemId": "javascript-ecma-script",
      "type": "runtime",
      "scope": "required",
      "reason": {
        "de": "React wird in einer JavaScript-Laufzeit ausgeführt.",
        "en": "React executes in a JavaScript runtime."
      }
    }
  ]
}
```

Supported relation metadata:

- `targetItemId`: slug of another item
- `type`: `build | compiles-to | language | protocol | runtime`
- `scope`: `required | optional | dev`
- `reason`: localized text object or short plain string

### Canonical Examples

1. **`react -> javascript-ecma-script`**  
   `type: "runtime"` (alternative modeling: `language`, if language affinity is the relevant angle)
2. **`typescript -> javascript-ecma-script`**  
   `type: "compiles-to"`
3. **`spring-boot -> java`**  
   `type: "runtime"`

---

## Example 1: Infrastructure/Building-Block Dependency

### Item: Advanced Encryption Standard (AES)

**Data Structure:**
```json
{
  "id": "advanced-encryption-standard",
  "name": "Advanced Encryption Standard",
  "layer": "building-blocks",
  "sublayer": "sicherheit",
  "description": {
    "de": "AES verschlüsselt Daten symmetrisch...",
    "en": "..."
  },
  "sovereigntyCriteria": {
    "openSource": true,
    "euHeadquartered": false,
    "hasAudit": true,
    "permissiveLicense": true,
    "matureProject": true,
    "selfHostable": true,
    "dataPortability": true,
    "openStandards": true,
    "noTelemetryByDefault": true
  }
}
```

**Analysis:**
- **Layer:** `building-blocks` — This is an operational dependency, not a foundational standard
- **Type:** A cryptographic standard (symmetric encryption)
- **Sovereignty Score:** High (excellent) — meets most sovereignty criteria
- **Role in Stacks:** Typically `consumer` — stacks use AES but don't maintain it

### Example Stack Usage: Germany Stack

```json
{
  "itemId": "advanced-encryption-standard",
  "status": "approved",
  "role": "consumer",
  "rationale": {
    "de": "Integriert in den Deutschland Stack",
    "en": "Integrated into Germany Stack"
  }
}
```

**Interpretation:**
- Germany Stack **depends on** Advanced Encryption Standard
- Germany Stack's **role is `consumer`**: It uses AES but doesn't maintain or contribute to the standard
- The standard is already mature and well-established — Germany doesn't need to be a maintainer

---

## Example 2: Platform-Layer Dependency

### Item: Contour

**Data Structure:**
```json
{
  "id": "contour",
  "name": "Contour",
  "layer": "platform",
  "sublayer": "integration",
  "description": {
    "de": "Contour ist ein Open-Source Ingress Controller...",
    "en": "..."
  },
  "sovereigntyCriteria": {
    "openSource": true,
    "euHeadquartered": false,
    "hasAudit": true,
    "permissiveLicense": true,
    "matureProject": true,
    "selfHostable": true,
    "dataPortability": true,
    "openStandards": true,
    "noTelemetryByDefault": true
  }
}
```

**Analysis:**
- **Layer:** `platform` — A middleware/platform component
- **Type:** Kubernetes Ingress Controller
- **Sovereignty Score:** High (excellent)
- **Role in Stacks:** Could be `maintainer`, `contributor`, `funder`, or `consumer`

---

## Example 3: Sovereign Standards (Foundational)

### Hypothetical Item: Open Interoperability Standard

**Concept:**
```json
{
  "id": "open-interop-standard",
  "name": "Open Interoperability Standard",
  "layer": "sovereign-standards",
  "description": {
    "de": "Übergreifender Standard für offene Interoperabilität zwischen Systemen...",
    "en": "Cross-cutting standard for open interoperability between systems..."
  },
  "sovereigntyCriteria": {
    "openSource": true,
    "euHeadquartered": true,
    "hasAudit": true,
    "permissiveLicense": true,
    "matureProject": true,
    "openStandards": true
  }
}
```

**Analysis:**
- **Layer:** `sovereign-standards` — This **is a foundational standard**
- **Type:** An open, vendor-neutral principle/standard (not a specific tool)
- **Significance:** Items in this layer are the bedrock that stacks are built upon
- **Role in Stacks:** **Critical** — stacks should explicitly commit to standards

### Stack Commitment Example

#### Hypothetical: Germany Stack as Maintainer

```json
{
  "itemId": "open-interop-standard",
  "status": "recommended",
  "role": "maintainer",
  "rationale": {
    "de": "Deutschland committet sich zur Entwicklung und Wartung dieses offenen Standards.",
    "en": "Germany commits to developing and maintaining this open standard."
  }
}
```

**Interpretation:**
- Germany Stack **actively maintains** the Open Interoperability Standard
- Germany commits resources and expertise to its development
- This is a **responsibility commitment** — not just usage

---

## Stack Roles Explained

| Role | Meaning | Commitment Level |
|------|---------|------------------|
| **maintainer** | Actively develops and maintains the item/standard | Highest |
| **contributor** | Actively contributes to development/improvement | High |
| **funder** | Provides financial or resource support | Medium |
| **consumer** | Uses the item but does not actively develop | Low |

---

## Example 4: Stack Composition (All Dependencies)

### Germany Stack Layer View

```
Infrastructure (Dependencies)
├── Network protocols (TCP/IP, etc.) — role: consumer
├── Encryption standards (AES) — role: consumer
└── ...

Platform (Dependencies)
├── Kubernetes — role: consumer
├── Contour (Ingress) — role: consumer
└── ...

Building-Blocks (Dependencies)
├── APIs, SDKs — role: consumer
└── ...

Applications (Dependencies)
├── E-government portals — role: consumer
└── ...

Sovereign-Standards (Foundational Standards)
├── Open Interoperability Principle — role: maintainer
├── Data Protection & Privacy Standard — role: maintainer
└── EU Regulatory Compliance Framework — role: contributor
```

**Key Insight:** A stack is a **dependency declaration** + **responsibility commitment**.

---

## Why This Matters

### For Policy Makers
- **Visibility:** See exactly which standards a stack commits to
- **Responsibility:** Know which governmental bodies maintain each standard
- **Consolidation:** Identify shared standards across stacks

### For Architects
- **Dependencies:** Understand all technical dependencies in a stack
- **Interoperability:** See which standards enable system communication
- **Sovereignty:** Ensure the stack is built on sovereign-friendly technologies

### For Governance
- **Accountability:** Track who maintains each standard
- **Consistency:** Identify where stacks diverge and could consolidate
- **Standards Evolution:** Understand the maturity and maintenance status of each dependency

---

## Related Documentation

- **Conceptual Model:** See `docs/BUSSINESS_CASE.md` → "Fachliches Modell" section
- **Technical Architecture:** See `docs/ARC42.md` → "Items als Dependencies" section
- **Navigation:** See `docs/README.md` for the full documentation framework
