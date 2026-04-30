# Plan: Orphan Items bereinigen

**Stand:** 2026-04-29  
**Scope:** 26 Items im Katalog ohne Stack-Zuweisung

---

## 🗑️ Löschen — 8 Items

### Duplikate (ID-Encoding-Varianten)

Entstanden durch inkonsistente Umlaut-Slugifizierung (`ü` → `-fur-` vs. `-f-r-`).
Das jeweilige Original ist bereits im NEGZ-Stack.

| Datei                                                                           | Duplikat von                                                               |
| ------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| `krypto-agilitat-standards-ff.json`                                             | `krypto-agilit-t-standards-ff`                                             |
| `operator-framework-fur-deskriptive-erweiterungen-von-kubernetes.json`          | `operator-framework-f-r-deskriptive-erweiterungen-von-kubernetes`          |
| `referenzimplementierung-fur-bare-metal-iaas.json`                              | `referenzimplementierung-f-r-bare-metal-iaas`                              |
| `time-based-one-time-password-totp-fur-multi-faktor-authentifizierung-mfa.json` | `time-based-one-time-password-totp-f-r-multi-faktor-authentifizierung-mfa` |
| `one-time-password-otp-fur-multi-faktor-authentifizierung-mfa.json`             | `one-time-password-otp`                                                    |
| `nqdrant.json`                                                                  | `qdrant`                                                                   |

### Zu generisch

Keine konkreten Tools, nur Kategorien/Meta-Konzepte ohne Mehrwert als Stack-Item.

| Datei                                                | Grund                                         |
| ---------------------------------------------------- | --------------------------------------------- |
| `dokumentenmanagement-systeme-wie-docuware-u-a.json` | Kategoriebeschreibung, kein spezifisches Tool |
| `standards-fur-tests-mocks-ci-cd.json`               | Meta-Konzept, kein konkretes Item             |

---

## ➕ NEGZ-Stack zuweisen — 18 Items

Alle mit `status: "recommended"`, `role: "consumer"`.

| Item-ID                                                                                                            | Name           | Begründung                                          |
| ------------------------------------------------------------------------------------------------------------------ | -------------- | --------------------------------------------------- |
| `argocd`                                                                                                           | ArgoCD         | GitOps/CD, CNCF-Tool, cloud-native Standard         |
| `apache-airflow`                                                                                                   | Apache Airflow | Workflow-Orchestrierung, Apache Foundation          |
| `bundid`                                                                                                           | BundID         | Deutsches Bundes-Identitätssystem                   |
| `bpmn-v2-0`                                                                                                        | BPMN V2.0      | Prozessmodellierungs-Standard, Dep für Camunda      |
| `camunda`                                                                                                          | Camunda        | BPM/Prozessautomatisierung, DE-Firma                |
| `capacitor`                                                                                                        | Capacitor      | Cross-platform Mobile Framework                     |
| `din-spec-66336-servicestandard-qualitatsanforderungen-fur-onlineservices-und-portale-der-offentlichen-verwaltung` | DIN SPEC 66336 | DE Servicestandard für Onlineportale der Verwaltung |
| `drupal`                                                                                                           | Drupal         | Open-Source CMS                                     |
| `egvp-postacher-in-der-rolle-bebpo`                                                                                | EGVP BeBPo     | Elektronischer Rechtsverkehr DE                     |
| `fit-connect`                                                                                                      | FIT-Connect    | DE Gov Integrationsplattform (FITKO)                |
| `janus-server`                                                                                                     | Janus Server   | WebRTC Media Server, Dep für Video-Kommunikation    |
| `react-native`                                                                                                     | React Native   | Cross-platform Mobile Framework (Meta)              |
| `swec-software-entwicklungsplattform-cloud`                                                                        | SWEC           | DE Gov Cloud-Entwicklungsplattform                  |
| `tailwind-css`                                                                                                     | Tailwind CSS   | CSS Utility Framework                               |
| `temporal`                                                                                                         | Temporal       | Workflow-Orchestrierung (Durable Execution)         |
| `typo3`                                                                                                            | TYPO3          | Enterprise CMS, weit verbreitet in DE Verwaltung    |
| `wordpress`                                                                                                        | WordPress      | Meistgenutztes CMS weltweit                         |
| `yaml`                                                                                                             | YAML           | Universelles Konfigurations- und Datenformat        |

---

## Ausführungsschritte

1. **8 JSON-Dateien löschen** aus `data/items/`
2. **18 Einträge in `data/stacks/negz.json`** ergänzen
3. `pnpm format` + `pnpm test` + `pnpm build`
4. Commit + Push
