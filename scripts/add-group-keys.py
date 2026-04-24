#!/usr/bin/env python3
"""
Adds groupKey to all item JSON files that are missing it.
Items in the same groupKey serve the same core function and are comparable alternatives.
Existing groupKeys are preserved unchanged.
"""

import json
import os
import sys

ITEMS_DIR = os.path.join(os.path.dirname(__file__), "../data/items")

# Complete mapping: item-id → groupKey
# Items with the same groupKey are direct functional alternatives.
GROUP_KEY_MAP = {
    # ── applications / browser ─────────────────────────────────────────
    "blink":   "browser-engine",
    "gecko":   "browser-engine",
    "webkit":  "browser-engine",

    # ── applications / daten ───────────────────────────────────────────
    "digilocker": "digital-citizen-service",
    "myinfo":     "digital-citizen-service",

    # ── applications / integration ─────────────────────────────────────
    "gov-uk-notify":                "government-notification-service",
    "gov-uk-pay":                   "government-payment-service",
    "unified-payments-interface-upi": "government-payment-service",

    # ── applications / lowcode (CMS) ───────────────────────────────────
    "drupal":    "cms",
    "typo3":     "cms",
    "wordpress": "cms",

    # ── applications / sicherheit (national digital identity) ──────────
    "aadhaar":         "national-digital-id-platform",
    "bundid":          "national-digital-id-platform",
    "gov-uk-one-login": "national-digital-id-platform",
    "mosip":           "national-digital-id-platform",
    "singpass":        "national-digital-id-platform",

    # ── building-blocks / frameworks ───────────────────────────────────
    # component-framework, server-side-rendering already set → kept
    "django":         "web-framework",
    "ruby-on-rails":  "web-framework",
    "spring-boot":    "web-framework",
    "flutter":        "cross-platform-ui-framework",
    "public-ui-kolibri": "design-system",
    "selenium":       "test-automation",
    "tailwind-css":   "css-framework",

    # ── building-blocks / inbetriebnahme (CI/CD) ───────────────────────
    "circleci":       "ci-cd",
    "github-actions": "ci-cd",
    "gitlab":         "ci-cd",
    "jenkins":        "ci-cd",
    "spinnaker":      "ci-cd",
    "flux":           "gitops",
    "openkruise":     "k8s-workload-controller",

    # ── building-blocks / integration (gov interoperability) ───────────
    "fit-connect":                 "gov-integration-platform",
    "govstack-information-mediator": "gov-integration-platform",
    "x-road":                      "gov-integration-platform",

    # ── building-blocks / lowcode (workflow orchestration) ─────────────
    "camunda":     "workflow-orchestration",
    "temporal-io": "workflow-orchestration",

    # ── building-blocks / sicherheit ───────────────────────────────────
    "advanced-encryption-standard":              "symmetric-encryption",
    "elliptic-curve-integrated-encryption-scheme": "asymmetric-encryption",
    "rivest-shamir-adleman":                     "asymmetric-encryption",
    "module-lattice-based-key-encapsulation-mechanism": "post-quantum-encryption",
    "secure-hash-algorithm":                     "hash-algorithm",
    "kerberos":                                  "authentication-protocol",
    "open-id-connect-oidc":                      "authentication-protocol",
    "open-authorization-oauth":                  "authorization-protocol",
    "keycloak":                                  "identity-provider",
    "one-time-password-otp":                     "mfa-method",
    "open-policy-agent":                         "policy-engine",

    # ── building-blocks / sprachen (programming languages) ─────────────
    "c":                    "systems-language",
    "go":                   "systems-language",
    "rust":                 "systems-language",
    "java":                 "jvm-language",
    "javascript-ecma-script": "web-scripting-language",
    "typescript":           "web-scripting-language",
    "python":               "general-purpose-language",
    "r":                    "data-science-language",
    "swift":                "mobile-language",
    "css":                  "styling-language",
    # php → server-side-rendering already set → kept

    # ── infrastructure / anschluss (physical connectivity) ─────────────
    "bluetooth":  "short-range-wireless",
    "wifi":       "short-range-wireless",
    "ethernet":   "wired-access",
    "glasfaser":  "fiber-access",
    "mobilfunk":  "mobile-access",

    # ── infrastructure / transport ─────────────────────────────────────
    "transmission-control-protocol-tcp":         "transport-protocol",
    "user-datagram-protocol-udp":                "transport-protocol",
    "quick-udp-internet-connections-quic":        "transport-protocol",
    "hypertext-transfer-protocol-http":           "application-protocol",
    "transport-layer-security-tls":              "channel-security-protocol",
    "internet-protocol-version-6-ipv6":          "network-layer-protocol",
    "json-web-tokens-jwt":                       "token-format",
    "messaging-layer-security-mls":              "group-messaging-security",
    "file-transfer-protocol-uber-tls-ftps":       "file-transfer-protocol",
    "internet-message-access-protocol-secure-imaps": "email-protocol",
    "simple-mail-transfer-protocol-secure-smtps":    "email-protocol",
    "session-initiation-protocol-sip":           "communication-protocol",

    # ── infrastructure / verteilung (routing & network) ────────────────
    "border-gateway-protocol-bgp":               "exterior-routing-protocol",
    "internal-gateway-protocols-igp":            "interior-routing-protocol",
    "open-shortest-path-first-ospf":             "interior-routing-protocol",
    "domain-name-system-dns":                    "name-resolution",
    "dynamic-host-configuration-protocol-dhcp":  "address-management",
    "internet-protocol-security-ipsec":          "network-security-protocol",
    "media-access-control-mac":                  "data-link-protocol",
    "multiprotocol-label-switching-mpls":        "traffic-engineering",
    "open-internet-exchange-point-ixp-oix-1":    "internet-exchange",
    "sd-wan-service-attributes-and-service-framework-mef": "traffic-engineering",
    "segment-routing-sr":                        "traffic-engineering",

    # ── platform / daten ───────────────────────────────────────────────
    # sql-db, nosql-db already set → kept; extend nosql-db:
    "hbase":  "nosql-db",
    "scylla": "nosql-db",

    "chroma":  "vector-db",
    "milvus":  "vector-db",
    "nqdrant": "vector-db",

    "neo4j": "graph-db",
    "redis": "in-memory-db",

    "elasticsearch": "search-engine",
    "apache-airflow": "data-pipeline-orchestration",

    "comma-separated-values-csv":        "data-serialization-format",
    "extensible-markup-language-xml":    "data-serialization-format",
    "javascript-object-notation-json":   "data-serialization-format",
    "yaml-ain-t-markup-language":        "data-serialization-format",
    "markdown-md":                       "markup-language",

    "comprehensive-knowledge-archive-network-ckan": "open-data-portal",
    "piveau":                                        "open-data-portal",
    "data-catalog-vocabulary-dcat":                  "data-catalog-standard",
    "resource-description-framework-rdf":            "semantic-data-standard",
    "open-archives-initiative-protocol-for-metadata-harvesting": "metadata-harvesting-protocol",

    # ── platform / inbetriebnahme (ops & observability) ────────────────
    "ansible":       "infrastructure-as-code",
    "terraform":     "infrastructure-as-code",
    "grafana":       "observability-dashboard",
    "prometheus":    "metrics-monitoring",
    "opentelemetry": "observability-standard",
    "helm":          "k8s-package-manager",

    # ── platform / integration ─────────────────────────────────────────
    "activemq-artemis": "message-broker",
    "rabbitmq":         "message-broker",
    "apache-kafka":     "event-streaming",

    "contour":          "k8s-ingress-controller",
    "emissary-ingress": "k8s-ingress-controller",
    "nginx":            "k8s-ingress-controller",
    "traefik":          "k8s-ingress-controller",

    "kong": "api-gateway",

    "envoy-proxy": "service-proxy",
    "istio":       "service-mesh",

    "kubernetes":          "container-orchestration",
    "docker-swarm":        "container-orchestration",
    "nomad":               "container-orchestration",
    "openshift-origin-okd": "container-orchestration-platform",

    "portainer": "k8s-management-ui",
    "rancher":   "k8s-management-ui",

    "representational-state-transfer":    "api-style",
    "graphql":                            "api-style",
    "simple-object-access-protocol":      "api-style",
    "general-purpose-remote-procedure-calls": "api-style",
    "openapi":                            "api-specification",

    # ── platform / ki (AI / ML) ────────────────────────────────────────
    "agent-network-protocol":                  "ai-agent-protocol",
    "agent-to-agent-protocol":                 "ai-agent-protocol",
    "agent-user-interaction-protocol-ag-ui":   "ai-agent-protocol",
    "model-context-protocol-mcp":              "ai-agent-protocol",

    "pytorch":     "ml-framework",
    "tensorflow":  "ml-framework",
    "angel-ml":    "ml-framework",

    "haystack":    "llm-framework",
    "langgraph":   "llm-framework",
    "promptflow":  "llm-framework",

    "ragflow":                "rag-framework",
    "huggingface-transformers": "ml-model-hub",
    "axolotl":                "llm-fine-tuning",
    "mlflow":                 "ml-experiment-tracking",
    "open-neural-network-exchange": "ml-model-format",
    "pyro":                   "probabilistic-ml",
    "spacy":                  "nlp-library",
    "robot-framework":        "test-automation",

    # ── platform / laufzeit ────────────────────────────────────────────
    "nodejs": "js-runtime",

    # ── platform / lowcode ─────────────────────────────────────────────
    "appsmith": "low-code-app-builder",
    "budibase": "low-code-app-builder",
    "joget":    "workflow-app-builder",
    "n8n":      "workflow-automation",
    "node-red": "workflow-automation",

    # ── sovereign-standards ────────────────────────────────────────────
    "es3-standard":        "e-signature-standard",
    "sovereign-cloud-stack": "sovereign-cloud-standard",
    "eudi-wallet":         "digital-identity-wallet",
    "fido2-webauthn":      "passwordless-auth-standard",
}


def insert_group_key(data: dict, group_key: str) -> dict:
    """Return a new ordered dict with groupKey inserted after sublayer (or layer)."""
    result = {}
    inserted = False
    for key, value in data.items():
        result[key] = value
        if not inserted and key in ("sublayer", "layer"):
            # Insert after sublayer when present, otherwise after layer
            if key == "sublayer" or "sublayer" not in data:
                result["groupKey"] = group_key
                inserted = True
    if not inserted:
        result["groupKey"] = group_key
    return result


def process_file(path: str) -> tuple[bool, str]:
    with open(path, "r", encoding="utf-8") as f:
        data = json.load(f)

    item_id = data.get("id", "")
    if "groupKey" in data:
        return False, f"SKIP  {item_id} (already has groupKey={data['groupKey']})"

    group_key = GROUP_KEY_MAP.get(item_id)
    if group_key is None:
        return False, f"WARN  {item_id} — no mapping defined"

    new_data = insert_group_key(data, group_key)

    with open(path, "w", encoding="utf-8") as f:
        json.dump(new_data, f, ensure_ascii=False, indent="\t")
        f.write("\n")

    return True, f"SET   {item_id} → {group_key}"


def main():
    files = sorted(
        os.path.join(ITEMS_DIR, fn)
        for fn in os.listdir(ITEMS_DIR)
        if fn.endswith(".json")
    )

    updated = skipped = warned = 0
    for path in files:
        changed, msg = process_file(path)
        print(msg)
        if changed:
            updated += 1
        elif msg.startswith("SKIP"):
            skipped += 1
        else:
            warned += 1

    print(f"\nDone: {updated} updated, {skipped} skipped (already set), {warned} warnings")
    if warned:
        sys.exit(1)


if __name__ == "__main__":
    main()
