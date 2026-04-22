---
focus: scoringExplained
title: 'Scoring nachvollziehen: Ein Rechenbeispiel über Relationen und Dependencies'
summary: 'Dieser Beitrag zeigt mit klaren Zahlen, wie sich required-, optional- und dev-Relationen sowie indirekte Abhängigkeiten auf den Stack-Score auswirken.'
---

# Scoring nachvollziehen: Ein Rechenbeispiel über Relationen und Dependencies

Immer wieder kommt die Frage auf: **Warum sinkt oder steigt der Stack-Score, obwohl nur eine Dependency geändert wurde?**

Die Antwort liegt in den **Relationen**. Nicht nur der einzelne Dependency-Score zählt, sondern auch:

1. wie kritisch die Relation ist,
2. wie oft die Dependency genutzt wird,
3. und ob indirekte Risiken in der Kette liegen.

## Beispiel-Stack

Wir nehmen den fiktiven Stack **„Bürgerportal X“** mit vier Dependencies:

| Dependency | Kurzbeschreibung               | Roh-Score |
| :--------- | :----------------------------- | --------: |
| D1         | OpenID Provider                |        82 |
| D2         | Logging                        |        74 |
| D3         | Build Tooling                  |        68 |
| D4         | Proprietäre Runtime-Bibliothek |        46 |

## Schritt 1: Relationstypen gewichten

Für das Beispiel nutzen wir nachvollziehbare Gewichte pro Relations-Typ:

- **required** = 1.0
- **optional** = 0.6
- **dev** = 0.3

Zusätzlich bekommt eine mehrfach genutzte Dependency mehr Einfluss über einen Frequenzfaktor.

## Schritt 2: Beitrag je Dependency berechnen

Formel im Beispiel:

`Beitrag = Roh-Score × Relationsgewicht × Frequenzfaktor`

| Dependency | Relation | Gewicht | Frequenzfaktor | Beitrag |
| :--------- | :------- | ------: | -------------: | ------: |
| D1         | required |     1.0 |            1.0 |    82.0 |
| D2         | optional |     0.6 |            1.0 |    44.4 |
| D3         | dev      |     0.3 |            1.0 |    20.4 |
| D4         | required |     1.0 |            1.3 |    59.8 |

**Zwischenfazit:** D3 hat trotz okayem Roh-Score wenig Einfluss, weil es eine dev-Relation ist. D4 wirkt stark, weil es required ist und mehrfach verwendet wird.

## Schritt 3: Indirekte Kette berücksichtigen

Nun der häufig übersehene Effekt: D1 hängt indirekt an einer proprietären Unterkomponente.

Wir modellieren dafür einen Risikoabschlag von **-8 Punkten** auf den effektiven D1-Beitrag.

- Effektiver D1-Beitrag: `82.0 - 8.0 = 74.0`

Damit sinkt der Gesamteinfluss, obwohl D1 auf den ersten Blick „gut“ wirkt.

## Ergebnis: Vorher/Nachher klar sichtbar

| Zustand                                    | Beispiel-Stack-Score |
| :----------------------------------------- | -------------------: |
| Ohne Relationsgewichte und Ketteneffekte   |                   68 |
| Mit Relationsgewichten (required/opt/dev)  |                   64 |
| Mit zusätzlichem indirektem Risikoabschlag |                   61 |

So wird sichtbar: Die Veränderung kommt **nicht** aus Willkür, sondern aus transparenten Regeln entlang der Dependency-Relationen.

## Was Teams daraus konkret ableiten können

Wenn ihr den Stack-Score verbessern wollt, priorisiert in dieser Reihenfolge:

1. **required-Runtime-Dependencies** mit niedrigem Score,
2. **mehrfach genutzte Knoten** mit hohem Netzwerkeinfluss,
3. **indirekte Lock-in-Ketten** (Abhängigkeit von Abhängigkeiten),
4. erst danach **dev-only** Optimierungen.

Damit wird aus einer einzelnen Kennzahl ein belastbares Steuerungsinstrument für Architekturentscheidungen.
