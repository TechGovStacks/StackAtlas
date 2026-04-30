# Plan: Lokalen Stack selbst zusammenstellen & im Storage persistieren

## 1. Zielbild

Nutzer:innen sollen im Bereich **Stack Gallery** (oder einem dedizierten Composer-Bereich) eigenständig einen „Local Stack“ aus vorhandenen Technologien/Komponenten erstellen, bearbeiten und löschen können.

Der Local Stack wird vollständig **clientseitig** im Browser-Storage gespeichert, sodass er beim nächsten Besuch wieder geladen wird (ohne Backend).

## 2. Produktanforderungen (MVP)

1. **Stack erstellen**
   - Name für den lokalen Stack vergeben.
   - Technologien aus vorhandenem `ITEMS`-Katalog auswählen.
2. **Stack bearbeiten**
   - Item hinzufügen/entfernen.
   - Reihenfolge optional ändern (für MVP zunächst optional).
3. **Stack löschen**
   - Einzelnen lokalen Stack entfernen.
4. **Persistenz**
   - Alle lokalen Stacks in `localStorage` speichern.
   - Bei App-Start automatisch laden.
5. **Sicherheit/Robustheit**
   - Versionierter Storage-Key.
   - Schema-Validierung beim Laden (defensive Parsing-Strategie).

## 3. Technisches Datenmodell

Neue lokale Domänentypen ergänzen (z. B. in `src/types/index.ts` oder dediziert):

- `LocalStackItemRef` (kompatibel mit `StackItem`)
  - `itemId: string`
  - `addedAt: string` (ISO, entspricht `since`)
  - `status: StackItemStatus` (z. B. `approved`)
  - `role: ParticipantRole` (z. B. `consumer`)
- `LocalStack` (kompatibel mit `Stack`)
  - `id: string` (z. B. `crypto.randomUUID()`)
  - `name: string`
  - `items: LocalStackItemRef[]`
  - `createdAt: string`
  - `updatedAt: string`
  - `version: string` (z. B. `local`)
- `LocalStackStore` (Storage-Wrapper)
  - `version: 1`
  - `stacks: LocalStack[]`

Storage-Key:

- `local-stacks-v1`

## 4. Architektur & Zuständigkeiten

### 4.1 Persistenz-Layer (neu)

Neue Utility-Datei, z. B. `src/utils/localStacksStorage.ts`:

- `loadLocalStacks(): LocalStack[]`
- `saveLocalStacks(stacks: LocalStack[]): void`
- `upsertLocalStack(stack: LocalStack): LocalStack[]`
- `deleteLocalStack(id: string): LocalStack[]`
- Defensive Fehlerbehandlung bei kaputten JSON-Daten.

### 4.2 State-Layer (neu)

Neuer Hook, z. B. `src/hooks/useLocalStacks.ts`:

- Initiales Laden aus Storage.
- CRUD-Funktionen für UI.
- Synchrones Persistieren bei Änderungen.
- Optional: `storage`-Event abonnieren (für mehrere Tabs).

### 4.3 UI-Layer (bestehend + Erweiterung)

Mögliche Integration in `StackGalleryPage`:

- Bereich „Lokale Stacks“ vor/nach den statischen `STACKS` rendern.
- Formular zum Erstellen/Bearbeiten.
- Liste der lokalen Stacks mit Aktionen.

Wichtige Regel: Für Form/Buttons/Selects ausschließlich KoliBri-Komponenten nutzen.

## 5. UX-Fluss (MVP)

1. Nutzer:in öffnet Composer.
2. Vergibt Stack-Namen.
3. Wählt Items aus (Single-Select mit „Hinzufügen“-Aktion oder Multi-Flow).
4. Sieht aktuelle Auswahl als Liste.
5. Klick auf „Speichern“ persistiert den Stack.
6. Nach Reload sind lokale Stacks weiterhin sichtbar.

## 6. Validierung & Fehlerfälle

- Kein Speichern ohne Stack-Name.
- Kein Speichern ohne mindestens 1 Item (optional als harte Regel).
- Keine doppelten Items pro Stack.
- Ungültige Item-IDs beim Laden filtern (wenn Katalog sich verändert).
- Bei JSON-Parse-Fehler: auf leere Liste zurückfallen + optional Hinweis anzeigen.

## 7. Internationalisierung

Neue i18n-Keys ergänzen (`src/i18n/locales/*/common.json`):

- Titel/Beschreibung Composer
- Labels: Name, Item-Auswahl, Hinzufügen, Entfernen, Speichern, Löschen
- Erfolg-/Fehlermeldungen

## 8. Umsetzungsphasen

### Phase 1 – Daten & Storage

- Typen für lokale Stacks ergänzen.
- Storage-Utilities implementieren.
- Unit-Tests für Load/Save/Parse-Fehler.

### Phase 2 – Hook & Geschäftslogik

- `useLocalStacks` bauen.
- CRUD inkl. Validierung und Deduplikation.
- Tests für Hook-Logik (falls bestehender Test-Stack vorhanden).

### Phase 3 – UI-Integration

- Composer-Sektion in `StackGalleryPage` oder neue Komponente einbinden.
- Lokale Stacks darstellen (analog zu vorhandenen Karten, wo sinnvoll).
- Aktionen verdrahten (create/update/delete).

### Phase 4 – Polishing

- i18n-Texte vervollständigen.
- Accessibility-Checks (Labels, Fokus-Reihenfolge, ARIA).
- Optional: Import/Export JSON für lokale Stacks.

## 9. Akzeptanzkriterien

1. Nutzer:innen können mindestens einen lokalen Stack anlegen, speichern und nach Reload wiedersehen.
2. Nutzer:innen können lokale Stacks bearbeiten und löschen.
3. Die App bleibt stabil bei leerem/defektem Storage.
4. Es werden ausschließlich bestehende Katalog-Items referenziert.
5. Lint, Typecheck und Build laufen erfolgreich.

## 10. Risiken & Gegenmaßnahmen

- **Risiko:** Storage-Daten korrupt.
  - **Mitigation:** Defensive Parser + Versionierung + Fallback.
- **Risiko:** Datenmodell-Drift bei Katalogänderungen.
  - **Mitigation:** Beim Laden unbekannte `itemId`s verwerfen.
- **Risiko:** UX wird zu komplex.
  - **Mitigation:** MVP bewusst klein halten (erst einfache Add/Remove-Interaktion).
