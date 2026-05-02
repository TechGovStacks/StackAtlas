---
status: active
owner: Data Engineering
last_reviewed: 2026-04-26
source_of_truth: docs/ARC42.md
---

# data/

Diese Datei ist die technische Kurzreferenz fuer das Datenverzeichnis.

Die vollstaendige technische Referenz liegt in:

- `docs/ARC42.md`

## Datenstruktur und Konzept

### Items als Dependencies

- **`data/items/`** enthält alle Dependencies (technologische Abhängigkeiten) als einzelne JSON-Dateien
- Jedes Item gehört zu genau einem Layer
- Items haben Sovereignty-Criteria, die ihre Bewertung bestimmen
- Optional können Items mit `dependencies` direkte technische Beziehungen zu anderen Items ausdrücken

#### `dependencies`-Modell (in `item.schema.json`)

Jeder Eintrag in `dependencies` beschreibt eine gerichtete Kante vom aktuellen Item zu einem Ziel-Item:

- `targetItemId` (string, slug-pattern wie `id`) → referenziertes Item
- `type` (`build | compiles-to | language | protocol | runtime`) → Art der Beziehung
- `scope` (`required | optional | dev`) → Verbindlichkeit/Kontext der Beziehung
- `reason` (`string` oder lokalisiertes Objekt mit `de`/`en`/`fr`) → kurze Begründung

Beispiele:

- `react -> javascript-ecma-script` (`type: "runtime"`, `scope: "required"`)
- `typescript -> javascript-ecma-script` (`type: "compiles-to"`, `scope: "required"`)
- `spring-boot -> java` (`type: "runtime"`, `scope: "required"`)

### `groupKey` — Vergleichsgruppen für Coverage-Hinweise

Das optionale Feld `groupKey` kennzeichnet Items, die **dieselbe Kernfunktion** erfüllen und damit echte Alternativen zueinander sind. Es bildet die Grundlage für Coverage-Hints: Ist ein Stack-Item nicht das bestbewertete seiner Gruppe, schlägt das System automatisch die souveränere Alternative vor. Der Vergleich basiert auf dem **kontextuellen Gesamtscore** (Sovereignty + Adoption, stack-rollengewichtet), wenn ein Stack aktiv ist — andernfalls auf dem reinen Sovereignty-Score.

**Vergabekriterium:** `groupKey` wird nur gesetzt, wenn im Katalog **mindestens zwei Items** existieren, zwischen denen ein Stack tatsächlich wählen kann. Fundamentalstandards ohne Alternative (HTTP, TLS, DNS …) und singuläre Spezialwerkzeuge erhalten keinen `groupKey`. Items ohne `groupKey` nehmen an keinem Vergleich teil — der `sublayer` allein löst keinen Coverage-Hint aus.

#### Alle 36 Vergleichsgruppen (Stand 2026-05-02)

| groupKey                       | Items (Anzahl) | Typische Entscheidung                                    |
| :----------------------------- | :------------: | :------------------------------------------------------- |
| `sql-db`                       |       3        | PostgreSQL · MariaDB · MySQL                             |
| `nosql-db`                     |       5        | MongoDB · Cassandra · CouchDB · HBase · ScyllaDB         |
| `vector-db`                    |       4        | Chroma · Milvus · NQdrant · Qdrant                       |
| `component-framework`          |       3        | Angular · React · Vue.js                                 |
| `cross-platform-ui-framework`  |       3        | Capacitor · Flutter · React Native                       |
| `web-framework`                |       3        | Django · Spring Boot · Ruby on Rails                     |
| `server-side-rendering`        |       2        | Next.js · PHP                                            |
| `ci-cd`                        |       5        | GitHub Actions · GitLab · Jenkins · CircleCI · Spinnaker |
| `container-orchestration`      |       3        | Kubernetes · Docker Swarm · Nomad                        |
| `k8s-ingress-controller`       |       4        | Nginx · Traefik · Contour · Emissary                     |
| `k8s-management-ui`            |       2        | Portainer · Rancher                                      |
| `message-broker`               |       2        | RabbitMQ · ActiveMQ Artemis                              |
| `infrastructure-as-code`       |       2        | Terraform · Ansible                                      |
| `ml-framework`                 |       3        | PyTorch · TensorFlow · Angel ML                          |
| `llm-framework`                |       3        | LangGraph · Haystack · PromptFlow                        |
| `ai-agent-protocol`            |       4        | MCP · ANP · A2A · AG-UI                                  |
| `national-digital-id-platform` |       5        | MOSIP · BundID · Aadhaar · SingPass · GOV.UK One Login   |
| `cms`                          |       4        | Drupal · Joomla · TYPO3 · WordPress                      |
| `browser-engine`               |       3        | Blink · Gecko · WebKit                                   |
| `systems-language`             |       3        | C · Go · Rust                                            |
| `web-scripting-language`       |       2        | JavaScript · TypeScript                                  |
| `api-style`                    |       4        | REST · GraphQL · SOAP · gRPC                             |
| `data-serialization-format`    |       4        | JSON · YAML · XML · CSV                                  |
| `transport-protocol`           |       3        | TCP · UDP · QUIC                                         |
| `traffic-engineering`          |       3        | MPLS · Segment Routing · SD-WAN                          |
| `short-range-wireless`         |       2        | Bluetooth · Wi-Fi                                        |
| `authentication-protocol`      |       2        | Kerberos · OIDC                                          |
| `asymmetric-encryption`        |       2        | RSA · ECIES                                              |
| `gov-integration-platform`     |       3        | X-Road · fit-connect · GovStack Information Mediator     |
| `workflow-orchestration`       |       2        | Camunda · Temporal                                       |
| `workflow-automation`          |       2        | n8n · Node-RED                                           |
| `low-code-app-builder`         |       2        | Appsmith · Budibase                                      |
| `open-data-portal`             |       2        | CKAN · Piveau                                            |
| `digital-citizen-service`      |       2        | DigiLocker · MyInfo                                      |
| `government-payment-service`   |       2        | GOV.UK Pay · UPI                                         |
| `test-automation`              |       2        | Selenium · Robot Framework                               |

#### Was keinen `groupKey` bekommt

- **Fundamentalstandards:** HTTP, TLS, DNS, DHCP, IPv6, MAC, BGP, IPSec, JWT, MLS, SIP, FTPS
- **Komplementärprotokolle:** SMTPS + IMAPS (Senden ≠ Empfangen; kein Entscheidungspunkt)
- **Subtypbeziehungen:** OSPF ist ein Typ von IGP, keine Alternative dazu
- **Singulare Werkzeuge ohne Katalogpendant:** Kafka, Istio, Envoy, Helm, Grafana, Prometheus, OpenTelemetry, Node.js, Java, Python, R, Swift, CSS u. a.
- **Plattform-exklusive Betriebssysteme:** Android (`android-os`) und iOS (`ios-os`) sind keine echten Alternativen zueinander — ein Stack entscheidet sich nicht zwischen den Plattformen, sondern unterstützt beide oder keine.

---

### Sovereign-Standards als Grundlagen

- **Items im Layer `sovereign-standards`** sind echte Standards: Offene Standards, Interoperabilität, Datenschutz, regulatorische Anforderungen
- Diese Items sind die Grundlagen, auf denen Stacks aufgebaut sind
- Sie sollten besonders sorgfältig gepflegt und dokumentiert werden

### Stacks und ihre Commitments

- **`data/stacks/`** enthält Stacks (z.B. `germany.json`) mit ihren Item-Referenzen
- Jede Stack-Item-Beziehung deklariert eine Rolle (`maintainer|contributor|funder|consumer`)
- Für Sovereign-Standards-Items zeigt die Rolle die Stack-Verantwortung
- Für den NEGZ-Import existiert zusätzlich ein kuratiertes Teilset `data/stacks/negz-sovereign-interoperability.json` (Standards-first, Interoperabilität, Datenportabilität)

## Schnellcheck

- Layer-IDs: `infrastructure`, `platform`, `building-blocks`, `applications`, `sovereign-standards`
- Typische Sublayer:
  - `building-blocks`: `sprachen`, `frameworks`, `inbetriebnahme`, `sicherheit`
  - `platform`: `daten`, `integration`, `ki`, `lowcode`, `laufzeit`
- Validierung: `pnpm validate-schemas`
- D-Stack-Metadaten (Maturity, Tags, Audit-Datum) aus `data/projects.csv` in Items synchronisieren: `node scripts/sync-d-stack.mjs`
- NEGZ-Importe markieren neue, noch nicht manuell verifizierte Items mit den Tags `negz-import` und `unresearched`; nach manueller Prüfung wird auf `researched` umgestellt.
- Das kuratierte NEGZ-Sovereign-Teilset priorisiert interoperable Standards (z.B. XÖV/X-Familie, OSCI/XTA, AS4, S3) vor konkreten Implementierungen.
- Kernschemas: `data/schemas/layer.schema.json`, `data/schemas/item.schema.json`, `data/schemas/stack.schema.json`
