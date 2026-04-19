---
status: active
owner: Product and Engineering
last_reviewed: 2026-04-19
source_of_truth: docs/TECH_STACK_CLOUD_SOVEREIGNTY_EU_FRAMEWORK_1_2_1.md
---

# Tech-Stack fuer Cloud Sovereignty - EU Framework 1.2.1

Ableitung einer technologischen Referenzarchitektur aus dem EU Cloud Sovereignty Framework (Version 1.2.1, Oktober 2025).

---

## 1. Framework-Uebersicht

Das EU Cloud Sovereignty Framework definiert 8 Sovereignty Objectives (SOV-1 bis SOV-8) und bewertet Cloud-Services auf 5 Stufen (SEAL-0 bis SEAL-4):

- **SEAL-0**: Keine Souveraenitaet (vollstaendig Non-EU-kontrolliert)
- **SEAL-1**: Jurisdiktionale Souveraenitaet (EU-Recht, begrenzte Durchsetzung)
- **SEAL-2**: Datensouveraenitaet (EU-Recht anwendbar, materielle Non-EU-Abhaengigkeiten)
- **SEAL-3**: Digitale Resilienz (EU-Einfluss, aber nicht-EU-Randdependenzen)
- **SEAL-4**: Vollstaendige digitale Souveraenitaet (EU-Kontrolle, keine kritischen Non-EU-Abhaengigkeiten)

---

## 2. Sovereignty Objectives und Tech-Stack-Mapping

### SOV-1: Strategic Sovereignty (15% Gewichtung)

**Ziel**: Verankerung im europaeischen Oekosystem (Besitz, Finanzierung, Governance, Alignment)

#### Tech-Stack-Anforderungen fuer SEAL-4:

- **Cloud-Infrastruktur**: EU-kontrollierter Hyperscaler oder Bare-Metal in EU
  - ✅ OVH, Hetzner, Exoscale, Scaleway
  - ❌ AWS, Azure, Google Cloud
- **Headquarter & Governance**: EU-Sitz mit EU-Boards
- **Finanzierung**: EU-Quellen oder EU-dominierte Investorenstruktur
- **Arbeitsplaetze**: Signifikante EU-basierte Operations & Development

#### Beispiel-Stack:

```yaml
Cloud Provider: OVH | Hetzner (EU, privat oder oeffentlich)
Infrastructure: OpenStack (vollstaendig gehostet in EU)
Region: Deutschland, Frankreich, Niederlande
```

---

### SOV-2: Legal & Jurisdictional Sovereignty (10% Gewichtung)

**Ziel**: Rechtliche Unabhaengigkeit von Non-EU-Jurisdiktionen (CLOUD Act, Cybersecurity Law)

#### Tech-Stack-Anforderungen fuer SEAL-4:

- **Daten-Lokalisierung**: Strikte Speicherung in EU, keine Spillover
- **Encryption**: Kundenkontrollierte Keys (Customer-Managed Keys)
- **Audit Trails**: Nicht-repudierbare Logging unter EU-Jurisdiktion
- **Legal Engine**: Transparente Dokumentation von Datenzugriffsanfragen
- **Anti-Extraterritorialitaet**: Technische Kontrollen gegen CLOUD Act

#### Beispiel-Stack:

```yaml
Key Management:
  - HashiCorp Vault (EU-gehostet)
  - AWS KMS Alternative: Thales Luna HSM (EU-Deployment)

Database & Storage:
  - PostgreSQL (vollstaendig OSS)
  - Ceph (OSS Distributed Storage, keine US-Komponenten)

Logging & Compliance:
  - ELK Stack (Elasticsearch, Logstash, Kibana) EU-gehostet
  - Splunk Alternative: Graylog oder Sumologic (EU-Variante)

Legal Documentation:
  - Automated Data Access Logging (mit Cryptographic Proof)
  - DPIA-Integration (Datenschutzfolgeabschaetzung)
```

---

### SOV-3: Data & AI Sovereignty (10% Gewichtung)

**Ziel**: Kundenkontrolle ueber Daten, strikte Geolokalisierung, EU-kontrollierte KI

#### Tech-Stack-Anforderungen fuer SEAL-4:

- **Encryption**: End-to-End (E2EE) oder Homomorphe Verschluesselung
- **Data Residency**: Keine Multi-Region-Replikation in Non-EU
- **Audit Access**: Vollstaendige Transparenz ueber Datenzugriffe
- **Data Deletion**: Kryptographisch irreversible Loeschung
- **AI Models**: Offene, EU-trainierte Modelle (keine OpenAI/Anthropic/Google APIs)

#### Beispiel-Stack:

```yaml
Encryption (at Rest):
  - TDE (Transparent Data Encryption) mit Customer-Managed Keys
  - LibreSSL / OpenSSL (EU-kompiliert)
  - ChaCha20-Poly1305 (Bernstein-Design, nicht-NSA)

Encryption (in Transit):
  - TLS 1.3 mit Perfect Forward Secrecy
  - mTLS fuer Intra-Cluster-Kommunikation

AI/ML Services:
  - Offene Modelle: Mistral 7B/Large, Llama 2 (Meta OSS)
  - Training: EU-Cluster (keine Abhaengigkeit von OpenAI/Google Vertex)
  - Inference: Lokale Hosting, nicht Cloud-API-basiert
  - Alternative zu ChatGPT: Le Chat (Mistral.ai), Euria (Aleph Alpha)

Data Handling:
  - PostgreSQL pg_crypt (Field-level encryption)
  - Differential Privacy fuer Analytics
  - Datenzugriffs-Audit im Cryptographic Log
```

---

### SOV-4: Operational Sovereignty (15% Gewichtung)

**Ziel**: EU-unabhaengige Wartung, Migration ohne Vendor Lock-in, Skill-Verfuegbarkeit

#### Tech-Stack-Anforderungen fuer SEAL-4:

- **Open Source**: Vollstaendiger Source Code verfuegbar
- **Standards-basiert**: Keine proprietary APIs
- **Migrierbar**: Kuberenetes/Container, Standard APIs
- **Dokumentation**: Technische Dokumentation fuer EU-Operatoren
- **EU-Talentpool**: Technologie in EU-Oekosystem etabliert

#### Beispiel-Stack:

```yaml
Container & Orchestration:
  - Kubernetes (CNCF, vollstaendig quelloffen)
  - Docker/Podman (OCI-Standard)
  - GitOps fuer Deployment: ArgoCD, Flux

Infrastructure-as-Code:
  - Terraform (mit EU-Provider: OVH, Hetzner)
  - Ansible fuer Config Management
  - Pulumi (TypeScript/Python IaC)

Database & Storage:
  - PostgreSQL (OSS, grosse EU-Community)
  - Redis (OSS, verstaendlich in EU)
  - Ceph oder MinIO (S3-kompatibel, OSS)

APIs & Integration:
  - REST/OpenAPI 3.0 (standardisiert, keine proprietary RPC)
  - GraphQL (wenn standardisiert, z.B. Apollo Federation)
  - Apache Kafka fuer Events
  - AMQP/RabbitMQ (standardisiert)

Documentation & Knowledge:
  - Vollstaendige Runbooks im Source-Repo
  - API-Dokumentation (OpenAPI YAML)
  - Architecture Decision Records (ADRs)
  - Testabdeckung (Unit, Integration, E2E)
```

---

### SOV-5: Supply Chain Sovereignty (20% Gewichtung - hoechste Gewichtung!)

**Ziel**: Transparenz und Kontrolle ueber Komponenten, Hardware, Firmware, Software

#### Tech-Stack-Anforderungen fuer SEAL-4:

- **Hardware**: Keine US-Monopole (Intel/Nvidia exclusive ausschliessen)
- **Firmware**: Ueberpruefbar, Open-Source-Firmware (Coreboot, OpenBMC)
- **Software**: Bekannte Origin, oeffentliche Repositories
- **Supply Chain Visibility**: SBOM (Software Bill of Materials), Provenance
- **Sub-contractor Audit**: Vollstaendige Transparenz

#### Beispiel-Stack:

```yaml
Hardware:
  - CPUs: AMD EPYC (x86, aber nicht US-exclusive)
            ARM Neoverse (nicht US exclusive)
            Alternatives: RISC-V (zukuenftig)
  - GPUs: Nicht NVIDIA exclusive
           Alternative: AMD MI250/MI300
           Zukuenftig: EU-GPU (SambaNova, Graphcore)
  - Speicher: Standard DDR5 (keine exotischen US-proprietary)

Firmware & Boot:
  - Coreboot (Open-Source BIOS/UEFI Alternative)
  - OpenBMC (Open-Source Baseboard Management)
  - Geprueft auf US-Backdoors (NSA-implants-freie Audits)

Software Supply Chain:
  - Git-Hub/GitLab mit EU-Hosting (z.B. Gitea)
  - Signed Commits & Tags (GPG)
  - SBOM in CycloneDX/SPDX Format
  - Dependency Scanning (Snyk, Dependabot)
  - License Compliance Tracking

Deployment & Distribution:
  - EU-basierte Container Registries (Quay.io EU, Harbor)
  - Signed Container Images (Cosign, Notary)
  - Package Management: Linux Distro (Debian/Ubuntu von Canonical, EU Operations)

Provenance Tracking:
  - SLSA Framework (Supply Chain Levels for Software Artifacts)
  - In-toto (Python/Go-Attestierung)
  - Artifact Transparency (z.B. Google Artifact Registry mit EU-Region, oder EU-Alternative)
```

---

### SOV-6: Technology Sovereignty (15% Gewichtung)

**Ziel**: Offene Standards, Interoperabilitaet, Keine Vendor Lock-in, Transparenz

#### Tech-Stack-Anforderungen fuer SEAL-4:

- **APIs**: Offene Standards (OpenAPI, oData, REST)
- **Datenformate**: Standard (JSON, XML, Parquet, nicht proprietary binaer)
- **Protokolle**: CNCF/OASIS-standardisiert
- **Software**: OSS unter permissiven Lizenzen (Apache 2.0, MIT, nicht AGPL-only)
- **Interop**: Multi-Vendor-kompatibel
- **High-Performance Computing**: EU-unabhaengig (nicht NVIDIA-exclusive)

#### Beispiel-Stack:

```yaml
API Standards:
  - OpenAPI 3.0 / Swagger fuer REST
  - GraphQL (Federation-Standard)
  - OData 4.0 fuer Data Services
  - gRPC mit Proto3 fuer Microservices

Data Formats:
  - JSON (Unicode, IETF-Standard)
  - Apache Arrow (Columnar, OSS, CNCF)
  - Parquet (Analytics, OSS)
  - CSV/TSV (Legacy, Universal)
  - Keine proprietary Formate (kein Excel-only, SAP MDX, etc.)

Messaging & Streaming:
  - Apache Kafka (CNCF, Confluent EU)
  - AMQP 1.0 (OASIS Standard)
  - MQTT fuer IoT (offenes Protokoll)

Databases & Storage:
  - SQL: PostgreSQL (OSS, vollstaendig transparent)
  - NoSQL: CouchDB / MongoDB (OSS-Varianten)
  - Time-Series: Prometheus, VictoriaMetrics (OSS)
  - Graph: Neo4j Open-Source Edition
  - Vector DB: Qdrant, Milvus (OSS, fuer AI/Search)

Computing Framework:
  - Kubernetes (CNCF, vollstaendig deklarativ)
  - Service Mesh: Istio (CNCF, OSS)
  - Serverless: Knative (CNCF, OSS)
  - Batch: Apache Spark (OSS)

Programming Languages & Runtimes:
  - Java/JVM (OpenJDK, vollstaendig OSS)
  - Python (CPython, vollstaendig OSS)
  - Go (Google, aber vollstaendig OSS und CNCF-dominiert)
  - Node.js/V8 (Chromium Foundation, OSS)
  - Rust (Mozilla Foundation, dann Rust Foundation, vollstaendig OSS)
  - NOT: Proprietaere Microsoft/.NET-only Stacks

High-Performance Computing:
  - NVIDIA-Alternative fuer ML: AMD MI250/MI300 (ROCM, OSS)
  - CPU-Compute: AMD EPYC, Intel Xeon (aber nicht exclusive)
  - Standard HPC: SLURM (Job Scheduler, OSS)
  - Parallel: OpenMP (Standard), MPI (Open-Source Implementationen)

Search & Analytics:
  - Elasticsearch (Elastic License, aber Source-verfuegbar)
  - OpenSearch (AWS-initiiert, aber vollstaendig AGPL)
  - Solr (Apache, OSS)
  - Meilisearch (OSS, einfach)
```

---

### SOV-7: Security & Compliance Sovereignty (10% Gewichtung)

**Ziel**: EU-basierte Security Operations, unabhaengige Audits, Compliance unter EU-Kontrolle

#### Tech-Stack-Anforderungen fuer SEAL-4:

- **SOC**: EU-basiertes Security Operations Center
- **Monitoring**: Kundenkontrollierte Logs & Alerts
- **Certifications**: EU-Standards (ISO 27001, ENISA)
- **Compliance**: GDPR, NIS2, DORA native
- **Patches**: Unabhaengig von Non-EU-Vendors

#### Beispiel-Stack:

```yaml
Security Operations Center (SOC):
  - Graylog / ELK Stack (EU-hosted, nicht Splunk/Sumo)
  - SIEM: Wazuh (OSS, Spanien-basiert)
  - Alerting: Prometheus AlertManager
  - Incident Response: DefectDojo (OSS), Demisto (Palo Alto Open-Source)

Network Security:
  - Firewall: UFW / Nftables (Linux Kernel, OSS)
  - IDS/IPS: Suricata (OSS, EU-unterstuetzt), nicht Snort (US)
  - WAF: ModSecurity / OWASP CRS
  - DDoS: Cloudflare Alternative: Bunny CDN (EU)

Vulnerability Management:
  - Scanning: Trivy, Grype (OSS)
  - Database: NVD (National Vulnerability Database, US aber Open)
  - Patching: Automated per CVE mit Unattended Upgrades
  - Supply Chain: Dependabot / Renovate (OSS)

Compliance Automation:
  - GDPR: Consent Management Platform (Osano, EU-freundlich)
  - DPIA: Automated Data Protection Impact Assessment
  - Audit Logs: Immutable (z.B. Falco fuer Runtime Security)
  - Policy-as-Code: OPA/Rego (CNCF)

Certifications & Audit:
  - ISO 27001: Zertifizierung durch EU-Auditor
  - ENISA NIS2: Compliance-Tooling
  - Penetration Testing: EU-Team, nicht US
  - Red Team Exercises: EU-intern

Identity & Access Management:
  - Keycloak (Jboss/Red Hat, OSS, vollstaendig in EU deploybar)
  - OpenLDAP (wenn Erbsystem)
  - OAuth 2.0 / OIDC (Standard)
  - MFA: FIDO2 (Standard), nicht Okta/Auth0 (US)

Data Protection:
  - Encryption: OpenSSL (EU-kompiliert)
  - Secrets: HashiCorp Vault (EU-hosted)
  - Tokenization: nicht Thales (US) oder SafeNet (Israel), lokale Loesung
```

---

### SOV-8: Environmental Sustainability (5% Gewichtung)

**Ziel**: Green Computing, erneuerbare Energie, Transparenz ueber Carbon Footprint

#### Tech-Stack-Anforderungen:

- **PUE < 1.2** (Power Usage Effectiveness)
- **Renewable Energy**: 100% oder Prozentanteil transparent
- **Hardware Reuse**: Circular Economy
- **Carbon Accounting**: Transparent, gemessen

#### Beispiel-Stack:

```yaml
Green Infrastructure:
  - Low-Power CPUs: ARM, nicht x86-exclusive
  - Efficient Networking: 25Gb/50Gb (statt 100Gb oversized)
  - Power Monitoring: PDU-level Metering
  - Thermal Management: Optimiert

Energy Sources:
  - Renewable Energy: Solar, Wind (vertraglich)
  - Carbon Accounting: Measured via Scope 1/2/3
  - Offset Programme: Transparent reporting

Green Software:
  - Energy Profiling: Eco-Code SONAR, Green Metrics Tool
  - CI/CD: Eco-CI for Build Optimization
  - Database: Query Optimization (weniger CPU = weniger Strom)
  - Code Review: Green Code Practices

Monitoring & Transparency:
  - Kepler (eBPF-basiert, misst pro-Pod Energy)
  - Scaphandre (CPU Energy, OSS)
  - Carbon Aware Computing: Scheduling basiert auf Grid Carbon Intensity
  - Public Reporting: Sustainability Report (GRI Standard)

Circular Economy:
  - Hardware Lifecycle: Refurbishment nach EOL
  - E-Waste: Responsibles Recycling (zertifiziert)
  - Data Wiping: Secure Erasure (NIST SP 800-88)
```

---

## 3. Referenz-Architektur fuer SEAL-4 ("Full Digital Sovereignty")

### Deployment-Modell

```text
┌─────────────────────────────────────────────────────────┐
│                  EU Jurisdiction (GDPR/NIS2)           │
│                                                          │
│  ┌──────────────────────────────────────────────────┐  │
│  │  OVH / Hetzner / Exoscale (Bare Metal EU)       │  │
│  │                                                  │  │
│  │  ┌────────────────────────────────────────┐    │  │
│  │  │  Kubernetes (CNCF)                     │    │  │
│  │  │  ├─ Control Plane (EU)                │    │  │
│  │  │  ├─ Worker Nodes (AMD EPYC, EU)      │    │  │
│  │  │  └─ Storage (Ceph)                    │    │  │
│  │  └────────────────────────────────────────┘    │  │
│  │                                                  │  │
│  │  ┌────────────────────────────────────────┐    │  │
│  │  │  Application Layer (microservices)     │    │  │
│  │  │  ├─ API Gateway (Envoy/Kong)          │    │  │
│  │  │  ├─ App Services (Containers)         │    │  │
│  │  │  ├─ Data Services                     │    │  │
│  │  │  └─ AI/ML Services (Mistral/Llama)   │    │  │
│  │  └────────────────────────────────────────┘    │  │
│  │                                                  │  │
│  │  ┌────────────────────────────────────────┐    │  │
│  │  │  Data & Security Layer                 │    │  │
│  │  │  ├─ PostgreSQL (Encrypted, Customer-KMS) │  │  │
│  │  │  ├─ Vault (Secrets, EU)                │    │  │
│  │  │  ├─ ELK (Audit Logs)                   │    │  │
│  │  │  └─ Keycloak (IAM)                     │    │  │
│  │  └────────────────────────────────────────┘    │  │
│  └──────────────────────────────────────────────────┘  │
│                                                          │
│  ┌──────────────────────────────────────────────────┐  │
│  │  GitOps / DevOps Infrastructure (EU)           │  │
│  │  ├─ GitLab/Gitea (Version Control, EU)        │  │
│  │  ├─ CI/CD (GitLab CI, Eco-CI)                 │  │
│  │  ├─ ArgoCD (GitOps Deployment)                │  │
│  │  └─ SonarQube (Code Quality, SBOM)            │  │
│  └──────────────────────────────────────────────────┘  │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

### Technology Stack Uebersicht

| Layer              | SEAL-4 Tech                 | Begruendung                   |
| ------------------ | --------------------------- | ----------------------------- |
| **Cloud Provider** | OVH, Hetzner, Exoscale      | EU-kontrolliert, kein US      |
| **Compute**        | Kubernetes (CNCF)           | Offene Standards, portable    |
| **Hardware**       | AMD EPYC, ARM Neoverse      | Nicht Intel/NVIDIA exclusive  |
| **Container**      | Docker/Podman (OCI)         | OSS, Standard                 |
| **Database**       | PostgreSQL                  | OSS, vollstaendig transparent |
| **Cache**          | Redis OSS                   | Performant, understood        |
| **Storage**        | Ceph / MinIO                | Distributed, OSS              |
| **Message Queue**  | Apache Kafka / RabbitMQ     | Standard, OSS                 |
| **API Gateway**    | Envoy / Kong                | CNCF, OSS                     |
| **Service Mesh**   | Istio                       | CNCF, OSS                     |
| **IAM**            | Keycloak                    | OSS, EU-gehostbar             |
| **Encryption**     | OpenSSL / LibreSSL          | OSS, auditable                |
| **Secrets**        | HashiCorp Vault             | OSS, EU-deployable            |
| **Logging**        | ELK / Graylog               | OSS, EU-gehost                |
| **Monitoring**     | Prometheus + Grafana        | CNCF, OSS                     |
| **SIEM**           | Wazuh                       | OSS, Spain-based              |
| **CI/CD**          | GitLab CI / Jenkins         | OSS, EU-hostbar               |
| **GitOps**         | ArgoCD / Flux               | CNCF, OSS                     |
| **AI/ML**          | Mistral, Llama, HuggingFace | OSS, EU-alternatives          |
| **Green Metrics**  | Kepler, Scaphandre          | OSS, eBPF-based               |

---

## 4. Lizenz- & Open-Source-Anforderungen fuer SEAL-4

### Akzeptable Lizenzen:

- ✅ Apache 2.0
- ✅ MIT
- ✅ BSD
- ✅ LGPL (mit Vorsicht, Library-only)
- ✅ GPL v2/v3 (community projects, nicht proprietary derivative)

### Nicht akzeptabel:

- ❌ Proprietaere Lizenzen (SAP, Oracle, Microsoft, Salesforce)
- ❌ SSPL (Server-Side Public License, Amazon)
- ❌ Elastic License (Elasticsearch, aber nur fuer Enterprise)
- ⚠️ AGPL (kann Compliance-Anforderungen erzeugen)

---

## 5. Migration Path: Wie kommt man zu SEAL-4?

### Stufe 1 (SEAL-1): Minimal Jurisdictional

- Beliebiger Cloud-Provider mit EU Data Residency
- Beispiel: AWS/Azure mit EU-only Regions

### Stufe 2 (SEAL-2): Data Sovereignty

- EU-kontrollierten Cloud Provider waehlen
- Encryption at Rest/Transit
- Beispiel: OVH Public Cloud mit Encryption

### Stufe 3 (SEAL-3): Digital Resilience

- Kubernetes fuer Multi-Vendor Optionen
- OSS Stack fuer kritische Komponenten
- Beispiel: OVH + Kubernetes + PostgreSQL + Keycloak

### Stufe 4 (SEAL-4): Full Sovereignty

- Kompletter OSS Stack
- EU-gehostete Registries, Repos, Builds
- Krypto-agnostische Architecture
- Zero US-proprietary Dependencies

---

## 6. Bewertungs-Matrix: Tech-Stack gegen Sovereignty Score

| Komponente   | SEAL-1              | SEAL-2        | SEAL-3          | SEAL-4                    |
| ------------ | ------------------- | ------------- | --------------- | ------------------------- |
| Cloud        | AWS+EU Region       | AWS+Encrypted | OVH/Hetzner     | OVH/Hetzner + OSS         |
| Compute      | AWS EC2             | Kubernetes    | K8s + GitOps    | K8s + GitOps + SBOM       |
| Database     | RDS                 | RDS Encrypted | PostgreSQL      | PostgreSQL + Customer KMS |
| IAM          | Cognito/IAM         | AD/LDAP       | Keycloak        | Keycloak + MFA            |
| Secrets      | AWS Secrets Manager | Vault (AWS)   | Vault (EU)      | Vault (EU, Customer)      |
| Logging      | CloudTrail          | ELK           | Graylog         | Wazuh + Custom SIEM       |
| AI/ML        | OpenAI API          | Azure OpenAI  | Mistral Le Chat | Mistral OSS (local)       |
| Supply Chain | SCM Opaque          | Basic SBOM    | CycloneDX       | SLSA Framework            |

---

## 7. Praktische Checkliste fuer SEAL-4-Validierung

- [ ] Alle Container Images sind signiert (Cosign)
- [ ] SBOM existiert in CycloneDX/SPDX Format
- [ ] Keine US-proprietaeren Dependencies in `pip`, `npm`, `maven`
- [ ] PostgreSQL ist Datenbank der Wahl (keine AWS RDS)
- [ ] Secrets sind in Vault oder Customer-KMS, nicht in Code
- [ ] CI/CD laeuft auf EU-hosted Infrastructure (GitLab/Gitea)
- [ ] Hardware-Whitelist: Keine Intel/NVIDIA exclusive
- [ ] Kubernetes Cluster ist fully documented (Runbooks)
- [ ] API sind OpenAPI 3.0 documented
- [ ] Legal: Alle Vertraege sind unter EU-Recht (keine US CLOUD Act)
- [ ] Logging: Immutable Audit Trail in Syslog/SIEM (EU)
- [ ] Security: Penetration Testing von EU-Team durchgefuehrt
- [ ] Green: PUE < 1.2, Renewable Energy documented

---

## 8. Anwendungsbeispiel: KoliBri im Sovereignty Framework

Angenommen, KoliBri wuerde als Cloud-Service angeboten:

| SOV-Objective        | KoliBri Status (heute)                | Fuer SEAL-4 noetig                 |
| -------------------- | ------------------------------------- | ---------------------------------- |
| SOV-1: Strategic     | Red Hat (IBM-owned, aber OSS-first)   | ITZBund-basierte Governance        |
| SOV-2: Legal         | Deutschland Jurisdiction              | Explicit CLOUD Act Clause          |
| SOV-3: Data          | GitHub Repos (Microsoft)              | Self-hosted Gitea                  |
| SOV-4: Operational   | Stencil (JavaScript, OSS)             | Full Docker + K8s deployment guide |
| SOV-5: Supply Chain  | Node.js Dependencies (audit via Snyk) | SBOM + Dependency Review           |
| SOV-6: Technology    | Web Components (Standard API)         | OpenAPI fuer Services              |
| SOV-7: Security      | GitHub Actions CI (Microsoft)         | GitLab CI EU-hosted                |
| SOV-8: Environmental | TBD                                   | Carbon-aware Build Optimization    |

**Fazit**: KoliBri ist technologisch SEAL-4-ready (Web Components, OSS), aber Deployment & Operations muessten auf EU-Infrastruktur migrieren.

---

## 9. Referenzen

- **EU Cloud Sovereignty Framework**: Version 1.2.1, Oktober 2025
- **CNCF Landscape**: https://landscape.cncf.io/
- **OpenSource Alternatives**: https://www.opensourcealternatives.to/
- **GAIA-X**: https://gaia-x.eu/
- **CIGREF Trusted Cloud Referential v2**: https://www.cigref.fr/
- **NIS2 / GDPR / DORA**: EU Regulatory Framework
- **SBOM Standards**: CycloneDX, SPDX, SLSA

---

**Dokumentversion**: 1.0
**Basis**: EU Cloud Sovereignty Framework 1.2.1 (Oktober 2025)
**Zielgruppe**: IT-Architekten, Sovereignty-Officer, Policy-Maker
