import type { MetricExplainer, MetricExplainerId } from '../types';

export const METRIC_EXPLAINERS: Record<MetricExplainerId, MetricExplainer> = {
	sovereigntyScore: {
		id: 'sovereigntyScore',
		label: { de: 'Souveränitäts-Score', en: 'Sovereignty Score' },
		definition: {
			de: 'Ein Wert von 0–100, der misst, wie unabhängig und kontrollierbar eine Technologie ist. Der Score basiert auf 10 Kriterien wie Open-Source-Lizenz, EU-Sitz, Selbst-Hosting-Fähigkeit und Datentransportabilität.',
			en: 'A score from 0–100 that measures how independent and controllable a technology is. The score is based on 10 criteria including open-source license, EU headquarters, self-hosting capability, and data portability.',
		},
		importance: {
			de: 'Je höher der Score, desto weniger Abhängigkeit von einzelnen Anbietern oder Ländern. Ein hoher Score bedeutet mehr digitale Souveränität für Organisationen.',
			en: 'Higher scores indicate less dependency on individual vendors or countries. A high score means greater digital sovereignty for organizations.',
		},
		calculation: {
			de: 'Summe gewichteter Kriterien: Open Source (+15), EU-Sitz (+5), Audit (+5), Permissive Lizenz (+10), Reife (+5), Selbst-Hosting (+20), Datenportabilität (+15), Offene Standards (+10), Kein Telemetrie (+5), Owner-Type (0–10).',
			en: 'Sum of weighted criteria: Open Source (+15), EU headquarters (+5), Audit (+5), Permissive License (+10), Maturity (+5), Self-hosting (+20), Data Portability (+15), Open Standards (+10), No Telemetry (+5), Owner Type (0–10).',
		},
		example: {
			de: 'Nextcloud erreicht ca. 87/100 – erfüllt alle wesentlichen Datenschutz- und Selbst-Hosting-Kriterien. Proprietary Cloud-Dienste erreichen oft nur 20–40.',
			en: 'Nextcloud achieves ~87/100 – meets all key data protection and self-hosting criteria. Proprietary cloud services often score only 20–40.',
		},
	},

	adoptionScore: {
		id: 'adoptionScore',
		label: { de: 'Adoptions-Score', en: 'Adoption Score' },
		definition: {
			de: 'Ein Wert von 0–100, der misst, wie häufig und weit verbreitet eine Technologie in Gov-Stacks weltweit verwendet wird. Basiert auf der Anzahl und Gewichtung der Stacks, die diese Technologie einsetzen.',
			en: 'A score from 0–100 measuring how frequently and widely a technology is used across Gov-Stacks globally. Based on the number and weighting of stacks using this technology.',
		},
		importance: {
			de: 'Höhere Adoption bedeutet mehr Netzwerk-Effekte, bessere Community und bessere Unterstützung. Aber auch Risiken durch Konzentration.',
			en: 'Higher adoption means more network effects, better community support, and more mature ecosystems. However, it also indicates concentration risk.',
		},
		calculation: {
			de: 'Gewichtete Summe der Stack-Häufigkeit basierend auf Stack-Typ (Kern vs. Optional), Rolle (Maintainer zählt mehr als Consumer) und geografischer Vielfalt.',
			en: 'Weighted sum of stack frequency based on stack type (core vs. optional), role (maintainer counts more than consumer), and geographic diversity.',
		},
		example: {
			de: 'Kubernetes wird in ~85% aller Infra-Stacks eingesetzt – daher sehr hohe Adoption (85+). Nischentechnologien haben Scores unter 20.',
			en: 'Kubernetes is used in ~85% of all infrastructure stacks – hence very high adoption (85+). Niche technologies score below 20.',
		},
	},

	overallScore: {
		id: 'overallScore',
		label: { de: 'Gesamt-Score', en: 'Overall Score' },
		definition: {
			de: 'Ein kombinierter Score von 0–100, der Souveränität und Adoption einer Technologie zusammenführt. Berücksichtigt sowohl Unabhängigkeit als auch praktische Verbreitung.',
			en: 'A combined score from 0–100 that merges sovereignty and adoption. Balances both independence and practical prevalence.',
		},
		importance: {
			de: 'Der Gesamt-Score hilft bei der Entscheidung: Ist diese Technologie sowohl souverän UND weit verbreitet? Ideal für Tech-Stack-Auswahl.',
			en: 'The overall score helps decision-making: Is this technology both sovereign AND widely adopted? Ideal for tech stack selection.',
		},
		calculation: {
			de: '60% Souveränitäts-Score + 25% Souveräne-Adoptions-Score + 15% Adoptions-Score. Gewichtet Unabhängigkeit höher als reine Verbreitung.',
			en: '60% Sovereignty Score + 25% Sovereign Adoption Score + 15% Adoption Score. Prioritizes independence over pure prevalence.',
		},
		example: {
			de: 'Eine Technologie mit 90 Souveränität aber 30 Adoption erreicht ca. 70 Gesamt-Score. Eine mit 50 Souveränität und 80 Adoption erreicht ca. 60.',
			en: 'A technology with 90 sovereignty but 30 adoption achieves ~70 overall. One with 50 sovereignty and 80 adoption achieves ~60.',
		},
	},

	sovereignAdoptionScore: {
		id: 'sovereignAdoptionScore',
		label: { de: 'Souveräne Adoptions-Score', en: 'Sovereign Adoption Score' },
		definition: {
			de: 'Misst die Adoption einer Technologie, aber nur unter souveränen Items (Score > 60). Zeigt, ob hochwertige Technologien diese nutzen.',
			en: 'Measures adoption of a technology only among sovereign items (score > 60). Shows whether high-quality technologies depend on it.',
		},
		importance: {
			de: 'Ein hoher Score bedeutet: Die besten Technologien setzen auf diese. Das ist ein Qualitäts- und Vertrauenssignal.',
			en: 'A high score means the best technologies rely on it. This is a quality and trust signal.',
		},
		calculation: {
			de: 'Wie Adoption, aber nur Stack-Vorkommen von Items mit Souveränitäts-Score > 60 werden gezählt.',
			en: 'Like Adoption, but only stack occurrences from items with Sovereignty Score > 60 are counted.',
		},
		example: {
			de: 'Eine Technologie könnte 50 Punkte Adoption erreichen, aber nur 30 Souveräne Adoption – wenn hauptsächlich unsouveräne Items sie nutzen.',
			en: 'A technology might achieve 50 adoption points but only 30 sovereign adoption – if mostly unsovereign items use it.',
		},
	},

	directCoverage: {
		id: 'directCoverage',
		label: { de: 'Direkte Abdeckung', en: 'Direct Coverage' },
		definition: {
			de: 'Zeigt, wie viele und wie wichtige Stacks diese Technologie direkt verwenden. Gewichtete Summe der Stack-Häufigkeiten.',
			en: 'Shows how many and how important stacks directly use this technology. Weighted sum of stack frequencies.',
		},
		importance: {
			de: 'Indikator für praktische Relevanz in produktiven Gov-Umgebungen.',
			en: 'Indicator of practical relevance in productive government environments.',
		},
		calculation: {
			de: 'Summe: Für jeden Stack, der diese Technologie direkt nutzt, Gewicht basierend auf Stack-Typ und -Reifegrad.',
			en: 'Sum: For each stack directly using this technology, weight based on stack type and maturity.',
		},
		example: {
			de: 'Eine Technologie in 30 wichtigen Kernstacks zählt mehr als in 100 experimentellen Stacks.',
			en: 'A technology in 30 important core stacks counts more than in 100 experimental stacks.',
		},
	},

	transitiveCoverage: {
		id: 'transitiveCoverage',
		label: { de: 'Transitive Abdeckung', en: 'Transitive Coverage' },
		definition: {
			de: 'Indirekte Abhängigkeiten: Zählt Stacks mit, die diese Technologie durch Dependencies von anderen Items nutzen (nicht direkt).',
			en: 'Indirect dependencies: Counts stacks using this technology through dependencies of other items (not directly).',
		},
		importance: {
			de: 'Zeigt versteckte, aber wichtige Abhängigkeiten. Eine Technologie kann wertvoll sein, ohne direkt sichtbar zu sein.',
			en: 'Shows hidden but important dependencies. A technology can be valuable without being directly visible.',
		},
		calculation: {
			de: 'Für jedes Item mit transitiver Abhängigkeit zu dieser Technologie: 0.3 × direkte Abdeckung des Items.',
			en: 'For each item with transitive dependency to this technology: 0.3 × direct coverage of the item.',
		},
		example: {
			de: 'Ist Kernbibliothek in Library X, die in 20 Stacks verwendet wird, hat Kernbibliothek indirekt 0.3 × 20 = 6 Punkte transitive Abdeckung.',
			en: 'If core library in Library X used in 20 stacks, core library has 0.3 × 20 = 6 transitive coverage points.',
		},
	},

	diversity: {
		id: 'diversity',
		label: { de: 'Geografische Vielfalt', en: 'Geographic Diversity' },
		definition: {
			de: 'Simpson-Index (0–1): Misst, wie diversifiziert die geografische Nutzung ist. 1.0 = perfekt ausgewogen, 0.0 = konzentriert.',
			en: 'Simpson Index (0–1): Measures how diversified geographic usage is. 1.0 = perfectly balanced, 0.0 = concentrated.',
		},
		importance: {
			de: 'Hohe Vielfalt reduziert Risiken durch geografische oder politische Abhängigkeiten.',
			en: 'High diversity reduces risks from geographic or political dependencies.',
		},
		calculation: {
			de: 'Simpson-Index = 1 - Σ(p_i²), wobei p_i der Anteil der Nutzung pro Land ist.',
			en: 'Simpson Index = 1 - Σ(p_i²), where p_i is the share of usage per country.',
		},
		example: {
			de: '0.9 = Nutzung auf 10+ Länder gleichmäßig verteilt. 0.2 = 80%+ in einem Land konzentriert.',
			en: '0.9 = Usage evenly distributed across 10+ countries. 0.2 = 80%+ concentrated in one country.',
		},
	},

	openSource: {
		id: 'openSource',
		label: { de: 'Open Source', en: 'Open Source' },
		definition: {
			de: 'Indikator: Ist der Code öffentlich verfügbar und einsehbar? Open Source ermöglicht Vertrauensprüfung und Unabhängigkeit.',
			en: 'Indicator: Is the code publicly available and auditable? Open source enables verification and independence.',
		},
		importance: {
			de: 'Wesentlich für digitale Souveränität. Geheimer Code kann versteckte Abhängigkeiten oder Sicherheitslücken enthalten.',
			en: 'Essential for digital sovereignty. Closed code may hide dependencies or security vulnerabilities.',
		},
		calculation: {
			de: 'Boolean: Ja (+15 Punkte Souveränität) oder Nein (0 Punkte). Keine Abstufung.',
			en: 'Boolean: Yes (+15 sovereignty points) or No (0 points). No gradations.',
		},
		example: {
			de: 'Linux: Ja, vollständig Open Source. Oracle DB Enterprise: Nein, proprietär.',
			en: 'Linux: Yes, fully open source. Oracle DB Enterprise: No, proprietary.',
		},
	},

	euHeadquartered: {
		id: 'euHeadquartered',
		label: { de: 'EU-Sitz', en: 'EU Headquarters' },
		definition: {
			de: 'Ist der Maintainer/Hersteller in der EU ansässig und registriert? EU-Sitz bedeutet DSGVO-Compliance und europäische Kontrollierbarkeit.',
			en: 'Is the maintainer/vendor headquartered and registered in the EU? EU presence means GDPR compliance and European controllability.',
		},
		importance: {
			de: 'Reduziert Risiko durch US-Gesetze (CLOUD Act, EAA) und andere außereuropäische Jurisdiktionen.',
			en: 'Reduces risk from US laws (CLOUD Act, EAA) and other non-European jurisdictions.',
		},
		calculation: {
			de: 'Boolean: EU-Sitz (+5 Punkte) oder nicht.',
			en: 'Boolean: EU headquarters (+5 points) or not.',
		},
		example: {
			de: 'Nextcloud (DE): +5. Slack (US): 0. GitLab (Delaware, aber EU-Büro): Abhängig von Registrierung.',
			en: 'Nextcloud (DE): +5. Slack (US): 0. GitLab (Delaware but EU office): Depends on legal registration.',
		},
	},

	auditedCode: {
		id: 'auditedCode',
		label: { de: 'Geprüfter Code', en: 'Audited Code' },
		definition: {
			de: 'Wurde der Code durch unabhängige Sicherheits-Audits überprüft? Indikator für Vertrauen in Sicherheit.',
			en: 'Has the code been reviewed by independent security audits? Indicator of security trustworthiness.',
		},
		importance: {
			de: 'Audits finden Sicherheitslücken. Ein auditiertes Projekt hat nachweislich höhere Sicherheit als ungeprüfte.',
			en: 'Audits find vulnerabilities. Audited projects demonstrate higher security than unreviewed ones.',
		},
		calculation: {
			de: 'Boolean: Audit vorhanden (+5 Punkte) oder nicht.',
			en: 'Boolean: Audit exists (+5 points) or not.',
		},
		example: {
			de: 'OpenSSL: Regelmäßig auditiert. Linux Kernel: Kontinuierlich überprüft.',
			en: 'OpenSSL: Regularly audited. Linux Kernel: Continuously reviewed.',
		},
	},

	permissiveLicense: {
		id: 'permissiveLicense',
		label: { de: 'Permissive Lizenz', en: 'Permissive License' },
		definition: {
			de: 'Erlaubt das Open-Source-Lizenzmodell Forking, Modifikation und kommerzielle Nutzung? Permissive Lizenzen garantieren Unabhängigkeit.',
			en: 'Does the open-source license allow forking, modification, and commercial use? Permissive licenses guarantee independence.',
		},
		importance: {
			de: 'Copyleft-Lizenzen (GPL) erzwingen Offenlegung; Permissive (MIT, Apache 2.0) geben maximale Freiheit.',
			en: 'Copyleft licenses (GPL) enforce disclosure; permissive licenses (MIT, Apache 2.0) grant maximum freedom.',
		},
		calculation: {
			de: 'Boolean: Permissive Lizenz (+10 Punkte) oder Copyleft/Restricted.',
			en: 'Boolean: Permissive license (+10 points) or copyleft/restricted.',
		},
		example: {
			de: 'MIT, Apache 2.0, BSD: +10. GPL v3: 0 (Copyleft).',
			en: 'MIT, Apache 2.0, BSD: +10. GPL v3: 0 (copyleft).',
		},
	},

	mature: {
		id: 'mature',
		label: { de: 'Reife', en: 'Maturity' },
		definition: {
			de: 'Ist das Projekt stabil und produktionsreif? Unterschied zwischen experimentell (Sandbox), in Entwicklung (Incubation) und stabil (Graduated).',
			en: 'Is the project stable and production-ready? Distinguishes experimental (Sandbox), developing (Incubation), and stable (Graduated).',
		},
		importance: {
			de: 'Unreife Projekte ändern APIs, können Breaking Changes haben. Reife Projekte sind verlässlich.',
			en: 'Immature projects change APIs and may have breaking changes. Mature projects are reliable.',
		},
		calculation: {
			de: 'Boolean: Graduated/Stabil (+5 Punkte) oder Sandbox/Incubation (0).',
			en: 'Boolean: Graduated/Stable (+5 points) or Sandbox/Incubation (0).',
		},
		example: {
			de: 'Linux Kernel (Graduated): +5. Experimental Cloud Framework (Sandbox): 0.',
			en: 'Linux Kernel (Graduated): +5. Experimental Cloud Framework (Sandbox): 0.',
		},
	},

	selfHostable: {
		id: 'selfHostable',
		label: { de: 'Selbst-Hosting möglich', en: 'Self-Hostable' },
		definition: {
			de: 'Kann die Technologie von der eigenen Organisation gehostet und kontrolliert werden (ohne externe SaaS-Abhängigkeit)?',
			en: 'Can the technology be hosted and controlled by the organization itself (without external SaaS dependency)?',
		},
		importance: {
			de: 'Ist absolut kritisch für digitale Souveränität. SaaS-Only Services machen abhängig vom Anbieter.',
			en: 'Absolutely critical for digital sovereignty. SaaS-only services create vendor lock-in.',
		},
		calculation: {
			de: 'Boolean: Selbst-Hosting (+20 Punkte) oder nur Cloud/SaaS (0).',
			en: 'Boolean: Self-hostable (+20 points) or cloud/SaaS only (0).',
		},
		example: {
			de: 'Nextcloud, Mastodon, Jitsi: +20. Slack, Figma, Microsoft 365: 0.',
			en: 'Nextcloud, Mastodon, Jitsi: +20. Slack, Figma, Microsoft 365: 0.',
		},
	},

	dataPortability: {
		id: 'dataPortability',
		label: { de: 'Datenportabilität', en: 'Data Portability' },
		definition: {
			de: 'Können Benutzerdaten in offenen, nicht-proprietären Formaten exportiert werden? Verhindert Lock-in.',
			en: 'Can user data be exported in open, non-proprietary formats? Prevents lock-in.',
		},
		importance: {
			de: 'Verhindert Vendor Lock-in und unterstützt Datenhoheit. Ist DSGVO-Anforderung.',
			en: 'Prevents vendor lock-in and supports data sovereignty. Required by GDPR.',
		},
		calculation: {
			de: 'Boolean: Datenportabilität (+15 Punkte) oder nicht.',
			en: 'Boolean: Data portability (+15 points) or not.',
		},
		example: {
			de: 'Nextcloud: JSON/XML Export. Proprietary Datenbank: Nur Binär-Dumps.',
			en: 'Nextcloud: JSON/XML export. Proprietary database: Binary dumps only.',
		},
	},

	openStandards: {
		id: 'openStandards',
		label: { de: 'Offene Standards', en: 'Open Standards' },
		definition: {
			de: 'Implementiert oder nutzt die Technologie standardisierte, vendor-neutrale Protokolle und Formate?',
			en: 'Does the technology implement or use standardized, vendor-neutral protocols and formats?',
		},
		importance: {
			de: 'Offene Standards ermöglichen Austauschbarkeit und Interoperabilität. Proprietäre Standards erzeugen Lock-in.',
			en: 'Open standards enable interoperability and interchangeability. Proprietary standards create lock-in.',
		},
		calculation: {
			de: 'Boolean: Offene Standards (+10 Punkte) oder proprietär.',
			en: 'Boolean: Open standards (+10 points) or proprietary.',
		},
		example: {
			de: 'OpenID Connect, OAuth 2.0, REST APIs: +10. Proprietäre APIs: 0.',
			en: 'OpenID Connect, OAuth 2.0, REST APIs: +10. Proprietary APIs: 0.',
		},
	},

	noTelemetry: {
		id: 'noTelemetry',
		label: { de: 'Kein Telemetrie (Standard)', en: 'No Telemetry by Default' },
		definition: {
			de: 'Sendet die Technologie standardmäßig (ohne Opt-Out) Nutzungsdaten an externe Server?',
			en: 'Does the technology send usage data to external servers by default (without opt-out)?',
		},
		importance: {
			de: 'Privatsphäre und Datenschutz. Telemetrie kann Abhängigkeiten und Überwachung ermöglichen.',
			en: 'Privacy and data protection. Telemetry enables surveillance and tracking.',
		},
		calculation: {
			de: 'Boolean: Kein Telemetrie (+5 Punkte) oder Telemetrie aktiviert.',
			en: 'Boolean: No telemetry (+5 points) or telemetry enabled.',
		},
		example: {
			de: 'Linux, Open Source Software ohne Telemetrie: +5. Visual Studio mit obligatorischem Telemetry: 0.',
			en: 'Linux, open source without telemetry: +5. Visual Studio with mandatory telemetry: 0.',
		},
	},

	ownerType: {
		id: 'ownerType',
		label: { de: 'Owner-Typ', en: 'Owner Type' },
		definition: {
			de: 'Wer kontrolliert das Projekt? Unabhängiges Konsortium, einzelne Kapitalgesellschaft, Community, oder Ein-Mann-Betrieb?',
			en: 'Who controls the project? Independent consortium, single corporation, community, or one-person show?',
		},
		importance: {
			de: 'Beeinflusst Stabilität und Unabhängigkeit. Konsortien = stabiler. Ein-Mann-Show = Risiko.',
			en: 'Affects stability and independence. Consortiums = more stable. One-person show = risk.',
		},
		calculation: {
			de: 'Punkte nach Typ: Independentes Konsortium (+10), Community (+5), Corporation (0 bis +5), One-Man-Show (-5).',
			en: 'Points by type: Independent consortium (+10), Community (+5), Corporation (0–+5), One-person show (-5).',
		},
		example: {
			de: 'Linux Foundation Consortium: +10. Kubernetes (CNCF Governance): +8. Single Company (Google Monopoly): +3. Hobby Project: 0.',
			en: 'Linux Foundation Consortium: +10. Kubernetes (CNCF governance): +8. Single company monopoly: +3. Hobby project: 0.',
		},
	},
};
