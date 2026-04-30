---
focus: groupComparison
tags: ['vergleichsgruppen', 'coverage', 'update']
title: 'Neue Vergleichsgruppen: Warum Docker Swarm im Stack einen Hinweis auf Kubernetes auslöst'
summary: Alle Items des Katalogs sind nach Kernfunktion in 36 Vergleichsgruppen geordnet. Das ermöglicht gezielte Coverage-Hints — und zeigt am Beispiel eines fiktiven Stadtportals, wie der Mechanismus in der Praxis wirkt.
---

# Neue Vergleichsgruppen: Warum Docker Swarm im Stack einen Hinweis auf Kubernetes auslöst

> **Kurzfazit:** Das neue `groupKey`-Feld ordnet Items nach Kernfunktion. Nur Items mit echten Alternativen im Katalog erhalten einen `groupKey` — Fundamentalstandards wie HTTP oder TLS nicht. Das Ergebnis: präzisere Coverage-Hints, weniger Rauschen.

---

## Das Problem vor der Änderung

Der Katalog enthielt bisher nur für wenige Items einen `groupKey` (z. B. `sql-db`, `component-framework`). Die Coverage-Hint-Logik konnte daher nur in diesen wenigen Bereichen Alternativen vorschlagen. Wer Docker Swarm im Stack hatte, bekam keinen Hinweis auf Kubernetes — obwohl beide dieselbe Kernfunktion erfüllen.

---

## Das Konzept: groupKey = „dieselbe Entscheidung"

Ein `groupKey` wird vergeben, wenn ein Stack zwischen mindestens zwei Items **tatsächlich wählen kann**, weil sie dieselbe Aufgabe erfüllen.

Das ist bewusst enger als ein Technologiebereich: Kafka und RabbitMQ sind beide Messaging-Lösungen — aber Kafka steht allein als Event-Streaming-Plattform im Katalog, RabbitMQ und ActiveMQ Artemis teilen sich `message-broker`. Kafka bekommt deshalb keinen `groupKey`, die anderen beiden schon.

**Nicht vergeben** wird `groupKey` für:

- Fundamentalstandards ohne Alternative (HTTP, TLS, DNS, TCP …)
- Komplementärprotokolle (SMTPS sendet, IMAPS empfängt — keine Wahl)
- Subtypbeziehungen (OSPF _ist_ ein IGP, kein Konkurrent dazu)
- Singuläre Werkzeuge ohne Katalogpendant (Kafka, Istio, Helm, Grafana …)

---

## Beispielszenario: Das Stadtportal Musterstadt

Das fiktive **Stadtportal Musterstadt** hat einen definierten Stack mit folgenden Items:

| Item         | Funktion                 | groupKey                  |
| :----------- | :----------------------- | :------------------------ |
| Docker Swarm | Container-Orchestrierung | `container-orchestration` |
| Jenkins      | CI/CD-Pipeline           | `ci-cd`                   |
| Vue.js       | Frontend-Framework       | `component-framework`     |
| MongoDB      | Dokumentendatenbank      | `nosql-db`                |
| n8n          | Workflow-Automatisierung | `workflow-automation`     |
| TYPO3        | Content-Management       | `cms`                     |

### Was der Coverage-Hint-Mechanismus jetzt tut

Für jede Gruppe ermittelt das System das Item mit dem **höchsten Sovereignty-Score**. Liegt das Stack-Item darunter, erscheint ein Hinweis.

#### Gruppe `container-orchestration`

| Item                     | Sovereignty Score |
| :----------------------- | ----------------: |
| **Kubernetes**           |                78 |
| Nomad                    |                65 |
| **Docker Swarm** ← Stack |                52 |

→ Hinweis: _„Innerhalb der Gruppe Container-Orchestrierung erzielt Kubernetes einen höheren Sovereignty-Score als Docker Swarm."_

#### Gruppe `ci-cd`

| Item                | Sovereignty Score |
| :------------------ | ----------------: |
| **GitLab**          |                80 |
| GitHub Actions      |                48 |
| **Jenkins** ← Stack |                72 |
| CircleCI            |                45 |
| Spinnaker           |                58 |

→ Jenkins liegt nah am Gruppenbesten (GitLab). Der Hinweis erscheint, ist aber weniger dringlich.

#### Gruppe `nosql-db`

| Item                | Sovereignty Score |
| :------------------ | ----------------: |
| **Cassandra**       |                85 |
| ScyllaDB            |                82 |
| **MongoDB** ← Stack |                42 |
| HBase               |                73 |
| CouchDB             |                78 |

→ Hinweis: _„Cassandra erzielt in der Gruppe NoSQL-Datenbank einen deutlich höheren Sovereignty-Score als MongoDB (Oracle-Eigentümerschaft, kein permissives Lizenzmodell)."_

### Was bleibt ohne Hinweis

Folgende Items im Stack erhalten **keinen** Coverage-Hint, weil sie keinen `groupKey` haben:

- **TYPO3** im Stack hat `cms` → wird mit Drupal und WordPress verglichen ✅
- **n8n** (`workflow-automation`) → Node-RED ist die Alternative ✅
- **HTTP, TLS, DNS** (falls im Stack) → Fundamentalstandards, kein `groupKey`, kein Hint ✅

---

## Die 36 Vergleichsgruppen im Überblick

| Bereich     | Gruppen                                                                                                                                           |
| :---------- | :------------------------------------------------------------------------------------------------------------------------------------------------ |
| Daten       | `sql-db` · `nosql-db` · `vector-db` · `data-serialization-format` · `open-data-portal`                                                            |
| Integration | `container-orchestration` · `k8s-ingress-controller` · `k8s-management-ui` · `message-broker` · `api-style`                                       |
| Entwicklung | `component-framework` · `cross-platform-ui-framework` · `web-framework` · `server-side-rendering` · `systems-language` · `web-scripting-language` |
| Betrieb     | `ci-cd` · `infrastructure-as-code` · `workflow-orchestration` · `workflow-automation`                                                             |
| KI/ML       | `ml-framework` · `llm-framework` · `ai-agent-protocol`                                                                                            |
| Sicherheit  | `authentication-protocol` · `asymmetric-encryption` · `transport-protocol`                                                                        |
| Gov-Dienste | `national-digital-id-platform` · `gov-integration-platform` · `government-payment-service` · `digital-citizen-service`                            |
| Anwendungen | `cms` · `browser-engine` · `low-code-app-builder` · `test-automation`                                                                             |
| Netzwerk    | `traffic-engineering` · `short-range-wireless`                                                                                                    |

---

## Warum das wichtig ist

Ohne Vergleichsgruppen kann das System nur sagen: _„Dieses Item hat einen niedrigen Score."_ Mit `groupKey` kann es sagen: _„In dieser konkreten Entscheidung gibt es eine souveränere Alternative."_

Das ist der Unterschied zwischen einem Messwert und einer **Handlungsempfehlung**.

---

## Fazit

36 Vergleichsgruppen, 104 Items mit `groupKey`, 313 Items bewusst ohne — weil ein Hinweis nur dann hilfreich ist, wenn er auf eine echte Wahl hinweist.

> "groupKey ist kein Ranking, sondern eine Entscheidungshilfe: Wer zwischen diesen Items wählen kann, sollte das souveränste nehmen."

---

## Glossar

- **groupKey:** Optionales Feld in einem Item-JSON, das funktional gleichwertige Alternativen zusammenfasst.
- **Coverage Hint:** Automatischer Hinweis in der UI, wenn ein Stack-Item nicht das souveränste seiner Gruppe ist.
- **Sovereignty Score:** Bewertung (0–100), wie unabhängig ein Item von Drittanbietern betrieben werden kann.
- **Fundamentalstandard:** Protokoll oder Standard ohne echte Alternative im selben Einsatzkontext (z. B. HTTP, TLS, DNS).
