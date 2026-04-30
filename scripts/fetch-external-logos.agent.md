---
name: 'External Logo Fetcher'
description: 'Resolves logo URLs for landscape items from public sources (Simple Icons, Wikidata, Wikipedia) and maintains an external URL map'
tools:
  - run_in_terminal
  - file_search
  - read_file
---

# External Logo Fetcher

Dieser Agent verwaltet Logo-URLs von öffentlichen Quellen und speichert sie als externe URLs in `src/data/logo-urls.json` — ohne lokale Logo-Dateien.

## Verfügbare Befehle

```bash
# Neue Logo-URLs auflösen (überspringt bereits verifizierte Einträge)
node scripts/fetch-external-logos.mjs

# Alle Einträge neu auflösen (auch bereits verifizierte)
node scripts/fetch-external-logos.mjs --update

# Trockentest ohne Dateiänderungen
node scripts/fetch-external-logos.mjs --dry-run
```

## Logo-Quellen (nach Priorität)

1. **Simple Icons CDN** — primäre Quelle
   - CDN-URL: `https://cdn.simpleicons.org/{slug}`
   - Über 3300 Brand-SVGs, kein HTTP-Check nötig (CDN ist zuverlässig)
   - Index: `https://cdn.jsdelivr.net/npm/simple-icons/_data/simple-icons.json`
   - Slug-Regel: `icon.slug || icon.title.toLowerCase().replace(/[^a-z0-9]/g, '')`

2. **Externe CSV-URL** — falls in `data/items.csv` bereits eine `https://`-URL steht
   - Wird per HTTP HEAD/GET auf Erreichbarkeit geprüft

3. **Wikidata P154 / P18** — Logo- und Bildeigenschaften
   - API: `wbsearchentities` + `wbgetentities`
   - P154 = Logo, P18 = Bild
   - Suchanfragen via `WIKIDATA_SEARCH_HINTS` für mehrdeutige Namen

4. **Wikipedia Seitenbild** — letzter Ausweg
   - API: `pageimages&piprop=original`
   - ⚠️ Liefert das Hauptbild der Seite — nicht zwingend ein Logo

## Anpassung

**Slug-Zuordnung** wenn CSV-Name ≠ Simple Icons Titel (z. B. `MySQL Server` → `mysql`):

```js
// In fetch-external-logos.mjs:
const SLUG_OVERRIDES = {
	'mysql server': 'mysql',
	nextjs: 'nextdotjs',
	// … hier ergänzen
};
```

**Suchhilfe für Wikidata** bei mehrdeutigen Namen (z. B. `Java` findet sonst die Insel):

```js
const WIKIDATA_SEARCH_HINTS = {
	java: 'Java programming language',
	// … hier ergänzen
};
```

## Output-Datei: `src/data/logo-urls.json`

```json
{
	"Angular": {
		"url": "https://cdn.simpleicons.org/angular",
		"source": "simple-icons",
		"verified": true,
		"accessed": "2026-04-06"
	},
	"BGP": {
		"url": null,
		"source": null,
		"verified": false,
		"accessed": "2026-04-06"
	}
}
```

## Bekannte Grenzen

- **46 von 128 Items** bleiben ohne Logo: Netzwerkprotokolle (BGP, DHCP, MPLS, IPv6, TLS …) haben keine öffentlichen Logos in den genutzten Quellen.
- Wikipedia-Bilder können unpassend sein (Illustrationen, Diagramme statt Logos). Wikidata (P154) ist zuverlässiger.
- Simple Icons enthält keine Logos für Protokolle oder akademische Projekte.

## Vorsichtsmaßnahmen

- ⚠️ Keine lokalen Logos speichern → Nur URLs in der Map
- ⚠️ Rate Limiting beachten → 100ms Delay zwischen Requests
- ⚠️ Lizenzen prüfen → Wikipedia Commons ist ideal (gemeinfrei/CC)
- ⚠️ URLs regelmäßig prüfen → Dead links nach 6-12 Monaten aktualisieren
