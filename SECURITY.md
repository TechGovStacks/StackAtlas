# Security Policy

## Unterstützte Versionen

Wir veröffentlichen Sicherheitspatches für die neueste Version. Bitte aktualisieren Sie auf die neueste Version, um Sicherheitsaktualisierungen zu erhalten.

| Version | Unterstützt |
|---------|-------------|
| Latest  | ✅ Ja      |
| Älter   | ❌ Nein    |

## Sicherheitslücken melden

**Bitte melden Sie Sicherheitslücken NICHT öffentlich.**

Verwenden Sie stattdessen GitHub's **Private Advisory** oder kontaktieren Sie uns unter **security@techgovstacks.github.io**.

Bitte geben Sie an:

1. **Beschreibung der Lücke** — Was ist die potenzielle Sicherheitsauswirkung?
2. **Schritte zur Reproduktion** — Wie kann die Lücke reproduziert werden?
3. **Betroffene Komponenten** — Welche Dateien/Versionen sind betroffen?
4. **Vorschlag zur Behebung** (optional) — Haben Sie eine Idee zur Behebung?

## Sicherheits-Best-Practices

### Dependencies

- Wir verwenden **Dependabot** zur Überwachung von Abhängigkeiten (siehe [.github/dependabot.yml](.github/dependabot.yml))
- Kritische Sicherheitsupdates werden priorisiert
- Regelmäßige `pnpm audit` Überprüfungen

### Code Review

- Alle Pull Requests werden überprüft
- Sicherheitsrelevante Änderungen erfordern zusätzliche Überprüfung
- Verwendung von TypeScript für Type-Safety

### Deployment

- CI/CD validiert Builds vor Deployment (GitHub Actions)
- Nur verifizierte Commits werden auf main gemerged
- Abhängigkeiten sind in `pnpm-lock.yaml` gepinnt

## Bekannte Probleme

(Aktuell keine bekannten Sicherheitsprobleme)

## Kontakt

Für Sicherheitsfragen kontaktieren Sie das Team unter: **security@techgovstacks.github.io**

---

Danke für Ihr Verständnis und Ihre Hilfe, StackAtlas sicher zu halten! 🔒
