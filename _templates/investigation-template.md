---
# ─────────────────────────────────────────────────────────────────────────────
# INVESTIGATION TEMPLATE — copy this file into _investigations/<slug>.md for a
# NEW investigation. It is excluded from the Jekyll build and is NEVER applied
# to existing reports. Existing reports are preserved exactly as authored.
# ─────────────────────────────────────────────────────────────────────────────
layout: investigation
title: "<Investigation Title>"
date: YYYY-MM-DD
permalink: /investigations/<slug>/

# Card + page metadata (presentation only — shown around the report, not inside it)
sector: "<e.g. Financial Services>"
threat_type: "<e.g. Ransomware>"
attack_count: 0            # number of MITRE ATT&CK techniques mapped
status: "Completed"        # Completed | Coming Soon
confidence: "High"         # analytic confidence: High | Moderate | Low
tags: [Tag One, Tag Two]

# Attribution — keep this accurate to the environment the work was done in
source_name: "KC7 Cyber Detective Game"
source_url: "https://kc7cyber.com"

# Optional overrides for the metadata card (layout supplies sensible defaults)
# investigation_type: "Scenario-Based Investigation"
# environment: "KC7 Cyber"
# analyst: "Joshua Berkoh"
# tools: "KQL · Azure Data Explorer · OSINT"
# framework: "MITRE ATT&CK"
# report_version: "1.0"

description: "<One-sentence summary used on cards and for SEO.>"
math: false
---

<!--
  Write to professional intelligence-reporting conventions:
  - BLUF (bottom line up front)
  - Analytical judgments with explicit confidence statements
  - Evidence-based conclusions
  - Defanged indicators (example[.]com, hxxps://, user[@]domain[.]com, 10[.]0[.]0[.]1)
  Do NOT include detection-engineering artifacts (Sigma / YARA / detection rules)
  until that capability is complete and defensible.
-->

## Executive Summary

_BLUF: the single most important takeaway, then a short paragraph of context._

## Background

## Investigation Objective

## Initial Alert

## Environment

## Evidence Collected

## Timeline

## Investigation Methodology

## IOC Analysis

## MITRE ATT&CK Mapping

| Tactic | Technique ID | Technique Name | Operational Context |
|---|---|---|---|
|  |  |  |  |

## Threat Assessment

_Analytic judgments with explicit confidence (e.g., "assessed with moderate confidence")._

## Lessons Learned

## Recommendations

## References

## Related Research
