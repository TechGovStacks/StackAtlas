#!/usr/bin/env python3
"""
Removes groupKey from items where it provides no comparison value:
  - Singletons (only item in their groupKey group)
  - Complementary protocol pairs that aren't real alternatives
  - Subtype relationships (OSPF is a type of IGP, not an alternative)
"""

import json
import os

ITEMS_DIR = os.path.join(os.path.dirname(__file__), "../data/items")

REMOVE_GROUP_KEY = {
    # ── Infrastructure: fundamental standards with no alternative ──────
    "hypertext-transfer-protocol-http",        # application-protocol
    "transport-layer-security-tls",            # channel-security-protocol
    "internet-protocol-version-6-ipv6",        # network-layer-protocol
    "domain-name-system-dns",                  # name-resolution
    "dynamic-host-configuration-protocol-dhcp", # address-management
    "media-access-control-mac",                # data-link-protocol
    "border-gateway-protocol-bgp",             # exterior-routing-protocol
    "open-internet-exchange-point-ixp-oix-1",  # internet-exchange
    "internet-protocol-security-ipsec",        # network-security-protocol
    "json-web-tokens-jwt",                     # token-format
    "messaging-layer-security-mls",            # group-messaging-security
    "file-transfer-protocol-uber-tls-ftps",    # file-transfer-protocol
    "session-initiation-protocol-sip",         # communication-protocol
    "ethernet",                                # wired-access
    "glasfaser",                               # fiber-access
    "mobilfunk",                               # mobile-access

    # email-protocol: SMTPS (send) and IMAPS (receive) are complementary,
    # not alternatives — every stack needs both
    "internet-message-access-protocol-secure-imaps",
    "simple-mail-transfer-protocol-secure-smtps",

    # interior-routing-protocol: OSPF *is* a type of IGP, not an alternative
    "internal-gateway-protocols-igp",
    "open-shortest-path-first-ospf",

    # ── Building-blocks: singleton languages ──────────────────────────
    "css",                                     # styling-language
    "java",                                    # jvm-language
    "swift",                                   # mobile-language
    "r",                                       # data-science-language
    "python",                                  # general-purpose-language

    # ── Building-blocks: singleton UI / testing ───────────────────────
    "public-ui-kolibri",                       # design-system
    "tailwind-css",                            # css-framework
    "flutter",                                 # cross-platform-ui-framework

    # ── Building-blocks: singleton security primitives ────────────────
    "advanced-encryption-standard",            # symmetric-encryption
    "module-lattice-based-key-encapsulation-mechanism",  # post-quantum-encryption
    "secure-hash-algorithm",                   # hash-algorithm
    "one-time-password-otp",                   # mfa-method
    "keycloak",                                # identity-provider
    "open-authorization-oauth",                # authorization-protocol
    "open-policy-agent",                       # policy-engine

    # ── Platform: singleton data technologies ─────────────────────────
    "elasticsearch",                           # search-engine
    "redis",                                   # in-memory-db
    "neo4j",                                   # graph-db
    "apache-airflow",                          # data-pipeline-orchestration
    "markdown-md",                             # markup-language
    "data-catalog-vocabulary-dcat",            # data-catalog-standard
    "resource-description-framework-rdf",      # semantic-data-standard
    "open-archives-initiative-protocol-for-metadata-harvesting",  # metadata-harvesting-protocol

    # ── Platform: singleton integration / orchestration ───────────────
    "openapi",                                 # api-specification
    "envoy-proxy",                             # service-proxy
    "istio",                                   # service-mesh
    "kong",                                    # api-gateway
    "openshift-origin-okd",                    # container-orchestration-platform
    "helm",                                    # k8s-package-manager
    "openkruise",                              # k8s-workload-controller
    "flux",                                    # gitops
    "apache-kafka",                            # event-streaming

    # ── Platform: singleton observability ─────────────────────────────
    "grafana",                                 # observability-dashboard
    "prometheus",                              # metrics-monitoring
    "opentelemetry",                           # observability-standard

    # ── Platform: singleton AI/ML ─────────────────────────────────────
    "huggingface-transformers",                # ml-model-hub
    "axolotl",                                 # llm-fine-tuning
    "mlflow",                                  # ml-experiment-tracking
    "open-neural-network-exchange",            # ml-model-format
    "pyro",                                    # probabilistic-ml
    "spacy",                                   # nlp-library
    "ragflow",                                 # rag-framework

    # ── Platform: singleton runtime / lowcode ─────────────────────────
    "nodejs",                                  # js-runtime
    "joget",                                   # workflow-app-builder

    # ── Applications: singleton services ──────────────────────────────
    "gov-uk-notify",                           # government-notification-service

    # ── Sovereign standards: each stands alone ─────────────────────────
    "es3-standard",                            # e-signature-standard
    "sovereign-cloud-stack",                   # sovereign-cloud-standard
    "eudi-wallet",                             # digital-identity-wallet
    "fido2-webauthn",                          # passwordless-auth-standard
}


def process_file(path: str) -> tuple[bool, str]:
    with open(path, "r", encoding="utf-8") as f:
        data = json.load(f)

    item_id = data.get("id", "")
    if item_id not in REMOVE_GROUP_KEY:
        return False, f"KEEP  {item_id}"

    if "groupKey" not in data:
        return False, f"SKIP  {item_id} (no groupKey)"

    old_key = data.pop("groupKey")

    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent="\t")
        f.write("\n")

    return True, f"DEL   {item_id} (was: {old_key})"


def main():
    files = sorted(
        os.path.join(ITEMS_DIR, fn)
        for fn in os.listdir(ITEMS_DIR)
        if fn.endswith(".json")
    )

    removed = kept = 0
    for path in files:
        changed, msg = process_file(path)
        if changed or msg.startswith("DEL") or msg.startswith("SKIP"):
            print(msg)
        if changed:
            removed += 1
        else:
            kept += 1

    print(f"\nDone: {removed} groupKeys removed, {kept} items unchanged")


if __name__ == "__main__":
    main()
