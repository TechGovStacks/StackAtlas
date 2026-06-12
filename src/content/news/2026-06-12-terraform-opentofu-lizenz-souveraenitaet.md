---
focus: openSourceLicensing
tags: ['terraform', 'opentofu', 'lizenz', 'souveraenitaet', 'iac']
title: 'Terraform vs. OpenTofu: Lizenzwechsel, IBM-Eigentümerschaft und digitale Souveränität'
summary: HashiCorp stellte Terraform im August 2023 von MPL 2.0 auf BUSL 1.1 um — keine OSI-anerkannte Open-Source-Lizenz. Mit IBM als neuem Eigentümer seit Februar 2025 und OpenTofu (MPL 2.0, Linux Foundation) als vollwertigem Fork stellt sich für öffentliche IT und souveränitätskritische Umgebungen die Frage neu.
---

# Terraform vs. OpenTofu: Lizenzwechsel, IBM-Eigentümerschaft und digitale Souveränität

> **Kurzfazit:** Terraform ist seit August 2023 kein Open-Source-Werkzeug mehr. OpenTofu — der MPL-2.0-lizenzierte Fork unter dem Dach der Linux Foundation und CNCF — ist 2026 produktionsreif, weitgehend drop-in-kompatibel und erzielt im StackAtlas-Sovereignty-Scoring 17 Punkte mehr. Für Greenfield-Projekte und öffentliche IT ist OpenTofu die naheliegende Wahl.

Infrastructure-as-Code ist Pflichtbestandteil moderner Cloud-Architekturen. Terraform war jahrelang das De-facto-Standardwerkzeug in diesem Bereich — bis HashiCorp im Sommer 2023 die Lizenz änderte und damit eine der folgenreichsten IaC-Debatten der letzten Jahre auslöste. Dieser Beitrag ordnet die Fakten ein und zeigt, was der Wechsel für die Praxis bedeutet.

---

## Der Lizenzwechsel: MPL 2.0 → BUSL 1.1

Am 10. August 2023 stellte HashiCorp alle Kernprodukte — darunter Terraform, Vault, Consul und Nomad — von der **Mozilla Public License v2.0 (MPL 2.0)** auf die **Business Source License v1.1 (BUSL 1.1)** um. Terraform-Provider und SDKs blieben unter MPL 2.0.

**Was BUSL 1.1 bedeutet:** Die Lizenz erlaubt interne Produktiv- und Nicht-Produktiv-Nutzung ohne Einschränkung. Verboten ist jedoch das Hosten oder Einbetten von Terraform in Produkten, die mit HashiCorps kommerziellen Angeboten konkurrieren. Nach vier Jahren konvertiert jede Dateiversion automatisch auf MPL 2.0 zurück — HashiCorp veröffentlicht jedoch kontinuierlich neue Versionen unter BUSL.

**Warum kein Open Source:** Die OSI-Definition verbietet Lizenzbedingungen, die bestimmte Personen oder Einsatzgebiete diskriminieren. Die Wettbewerbsklausel der BUSL tut genau das. Terraform v1.6+ ist damit **kein OSI-konformes Open-Source-Projekt** mehr, sondern „source-available". Der Lizenzgeber kann künftige Bedingungen einseitig ändern — ein Präzedenzfall, der institutionelles Vertrauen untergräbt.

| Eigenschaft          | MPL 2.0 (bis v1.5) | BUSL 1.1 (ab v1.6) |
| :------------------- | :----------------: | :----------------: |
| OSI-anerkannt        |         ✅         |         ❌         |
| Interne Nutzung frei |         ✅         |         ✅         |
| Kommerzielle Nutzung |         ✅         |  ⚠️ eingeschränkt  |
| Einseitig änderbar   |         ❌         |         ✅         |

---

## Die IBM-Übernahme

HashiCorp wurde am **27. Februar 2025** von IBM für **6,4 Mrd. USD** (35 USD/Aktie, alles in bar) übernommen. Zum 1. September 2025 gingen alle Geschäftsaktivitäten an IBM über, Produkte wurden in die IBM-Automation-Marke integriert.

Relevante Konsequenzen seit dem Abschluss:

- BUSL 1.1 wurde unter IBM **nicht** aufgehoben.
- Der **Terraform-Cloud-Free-Tier** wurde abgeschafft.
- Der **Support für CDKTF** (externe Sprachen: Python, TypeScript, Java) wurde eingestellt.
- **HCP Vault Secrets** wurde eingestellt.

IBM ist ein US-Konzern und unterliegt dem **US CLOUD Act**. Das EU-Tech-Sovereignty-Paket (vorgestellt 3. Juni 2026, Cloud and AI Development Act) schließt Anbieter unter US-Jurisdiktion faktisch von den beiden höchsten Souveränitätsstufen aus.

---

## Sovereignty Score im Vergleich

Die folgende Tabelle zeigt die Bewertung beider Werkzeuge anhand der StackAtlas-Souveränitätskriterien:

| Kriterium               | Gewicht | Terraform (BUSL 1.1, IBM) | OpenTofu (MPL 2.0, Linux Foundation) |
| :---------------------- | ------: | :-----------------------: | :----------------------------------: |
| Self-hostable           |     +20 |          ✅ +20           |                ✅ +20                |
| Data Portability        |     +15 |          ✅ +15           |                ✅ +15                |
| Open Source             |     +15 |       ❌ +0 (BUSL)        |           ✅ +15 (MPL 2.0)           |
| Open Standards          |     +10 |  ❌ +0 (HCL proprietär)   |        ❌ +0 (HCL proprietär)        |
| Permissive License      |     +10 |       ❌ +0 (BUSL)        |     ❌ +0 (MPL = weak copyleft)      |
| No Telemetry by Default |      +5 |           ✅ +5           |      ✅ +5 (explizit entfernt)       |
| Mature Project          |      +5 |           ✅ +5           |                ✅ +5                 |
| Has Audit               |      +5 |           ✅ +5           |    ❌ +0 (kein Audit nachweisbar)    |
| EU Headquartered        |      +5 |           ❌ +0           |                ❌ +0                 |
| Owner Type              |     +10 | corporation (IBM) **+3**  |  independentConsortium (LF) **+10**  |
| **Sovereignty Score**   |         |          **53**           |                **70**                |

OpenTofu erzielt **17 Punkte mehr** — primär durch Open Source (+15) und neutrale Foundation-Governance (+7). Der einzige Punkt, den Terraform besser bewertet: ein nachweisbares Security-Audit (+5 vs. +0).

---

## OpenTofu: Reifegrad und eigene Features

OpenTofu entstand im September 2023 als Community-Fork von Terraform v1.5.x, initiiert von Gruntwork, Spacelift, env0, Harness und Scalr. Am **9. Januar 2024** erschien Version 1.6.0 (GA); **CNCF-Sandbox-Status** seit 23. April 2025. Im Juni 2026 ist die aktuelle stabile Version **1.12.0** (14. Mai 2026).

Eigenentwicklungen, die Terraform nicht oder erst deutlich später bietet:

| Feature                                  | Seit Version | Beschreibung                                               |
| :--------------------------------------- | :----------: | :--------------------------------------------------------- |
| Native State-Encryption                  |     1.7      | AES-GCM, Key Providers: PBKDF2, AWS/GCP/Azure KMS, OpenBao |
| Provider-defined Functions               |     1.7      | Anbieter können eigene Funktionen in HCL bereitstellen     |
| Early Variable Evaluation                |     1.8      | Variablen in Backend- und Provider-Konfigurationen nutzbar |
| `.tofu`-Override-Dateien                 |     1.8      | Überschreibt `.tf`-Dateien ohne Upstream-Konflikte         |
| `-exclude`-Flag                          |     1.9      | Einzelne Ressourcen aus einem Plan ausschließen            |
| Provider `for_each`                      |     1.9      | Provider über Regionen/Umgebungen iterieren                |
| Natives S3-State-Locking (ohne DynamoDB) |     1.10     | Vereinfachtes State-Locking auf AWS                        |
| Dynamic `prevent_destroy`                |     1.12     | Bedingungsabhängiger Schutz vor Ressourcenlöschung         |

---

## Adoption in der Praxis

- **Fidelity Investments** migrierte über 50.000 State-Files und machte OpenTofu zur Default-IaC-Plattform (>4 Mio. verwaltete Ressourcen, >4.000 State-File-Updates täglich; 70 % der Projekte in zwei Quartalen migriert).
- **Sovereign Cloud Stack (SCS/OSBA)** migrierte die Referenzimplementierung OSISM nach OpenTofu 1.6.0 und beschreibt es als „drop-in replacement".
- Bei **Spacelift** laufen laut eigenen Angaben 50 % aller Deployments auf OpenTofu (Stand März 2026).
- **Atlantis**, **Terragrunt**, **GitLab CI/CD**, **Spacelift**, **env0** und **Scalr** unterstützen OpenTofu nativ.

---

## Handlungsempfehlungen

| Szenario                           | Empfehlung                                                                                                                           |
| :--------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------- |
| Greenfield / Neuprojekte           | OpenTofu als Default. Identische Syntax, gleiche Provider, kein Lizenzrisiko.                                                        |
| Öffentliche IT / SEAL-4-Umgebungen | Klar OpenTofu. BUSL und US-Jurisdiktion sind mit höchsten Souveränitätsstufen nicht vereinbar.                                       |
| Bestehende Teams ohne HCP-Bindung  | Migration als Binärtausch planen (`tofu init -upgrade`). Pilotprojekt mit `tofu plan -refresh-only` gegen Produktions-State.         |
| Teams mit HCP Terraform / TFE      | HCP-exklusive Features (Sentinel, no-code modules, Run Tasks) auf interne Owner oder OSS-Alternativen abbilden, erst dann migrieren. |

---

## Fazit

Der Lizenzwechsel im August 2023 und die IBM-Übernahme im Februar 2025 haben Terraform grundlegend verändert — technisch kaum, lizenz- und souveränitätspolitisch erheblich. OpenTofu schließt die technische Lücke, ist in mehreren Bereichen voraus und erzielt im StackAtlas-Sovereign-Score 17 Punkte mehr.

> "Digitale Souveränität lässt sich nicht auf einer Werkzeugkette aufbauen, deren Lizenz ein US-Konzern jederzeit einseitig ändern kann."

Für den öffentlichen Sektor und alle Architekturen, die an SEAL-Stufen oder nationalen Open-Source-Strategien ausgerichtet sind, ist OpenTofu die naheliegende Wahl. Wer tief in das HCP-Ökosystem investiert hat, sollte den Migrationspfad strukturiert planen — nicht ob, sondern wann.

---

## Glossar

- **BUSL 1.1 (Business Source License):** Source-available-Lizenz, die bestimmte kommerzielle Nutzungsformen untersagt. Nicht OSI-anerkannt.
- **MPL 2.0 (Mozilla Public License):** Weak-Copyleft-Lizenz, OSI-anerkannt. Quellcodeänderungen an MPL-Dateien müssen offen bleiben; Kombination mit proprietärem Code ist erlaubt.
- **CLOUD Act:** US-Gesetz, das US-Behörden Zugriff auf Daten von US-Unternehmen auch außerhalb der USA ermöglicht.
- **CNCF (Cloud Native Computing Foundation):** Neutrales Open-Source-Ökosystem unter dem Dach der Linux Foundation. Bekannte Projekte: Kubernetes, Prometheus, Envoy.
- **SEAL (Sovereignty Effectiveness Assurance Level):** Vierstufige Souveränitätsbewertung des EU Cloud Sovereignty Frameworks der Europäischen Kommission.
- **State-Encryption:** Verschlüsselung der Terraform/OpenTofu-State-Datei, die alle provisionierten Ressourcen beschreibt — oft sensible Daten (Passwörter, Zertifikate).
