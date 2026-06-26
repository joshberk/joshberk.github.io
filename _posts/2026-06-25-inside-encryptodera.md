---
layout: post
title: "Inside Encryptodera: An Insider Threat Scenario"
date: 2026-06-25
categories: [threat-detection, dfir-portfolio]
tags: [Insider Threat, Active Directory Ransomware]
focus: "Insider Exfiltration, Active Directory Ransomware"
type: "Case Study"
discipline: "Threat Detection Engineering"
source_name: "KC7 Cyber Detective Game"
source_url: "https://kc7cyber.com"
description: "A dual-track insider-threat investigation at Encryptodera Financial: a contractor's 27-day FTP exfiltration of cold-storage crypto-wallet secrets running in parallel with a hijacked-identity intrusion that escalates to a domain-wide Active Directory ransomware deployment across 306 endpoints."
permalink: /blog/inside-encryptodera.html
math: false
---

| Inside Encryptodera | At a Glance |
|---|---|
| **Target Organization** | Encryptodera Financial |
| **Incident Window** | December 26, 2023 – February 17, 2024 |
| **Attack Classification** | Dual insider-threat compromise escalating to an external Active Directory ransomware takeover |
| **Initial Access Vector** | Hijacked un-decommissioned mailbox + internal spear-phishing (MITRE T1078.001 / T1534) |
| **Confirmed Impact** | Cold-storage crypto-wallet data exfiltration; domain-wide ransomware across 306 endpoints |
| **Threat Actors** | Jane Smith (insider contractor), Barry Shmelly (saboteur), external AD threat actor |
| **Investigated By** | Joshua Berkoh (Security Analyst II) · Report dated June 25, 2026 |

## Executive Summary

Between late December 2023 and February 2024, **Encryptodera Financial** was subjected to two severe, parallel security compromises stemming from corporate insider risks. The first narrative involves an intentional insider defector, **Jane Smith** (Blockchain Contractor), who systematically mapped and exfiltrated sensitive details concerning the company's cold-storage cryptocurrency wallets to an external adversary over a 27-day pipeline.

The second narrative involves a disgruntled employee, **Barry Shmelly**, whose initial intellectual-property theft left behind compromised corporate account credentials. An external threat actor hijacked Shmelly's identity to deploy targeted phishing lures internally, harvest local administrative rights, move laterally to dump domain-controller access tokens via Mimikatz, and orchestrate a catastrophic Active Directory group-policy ransomware deployment impacting 306 corporate endpoints.

## 1. Incident Timeline

*   **[Dec 26, 14:00 UTC]** ── Insider Barry Shmelly begins researching exfiltration methods.
*   **[Jan 15, 06:03 UTC]** ── Shmelly posts public grievances regarding upcoming layoffs.
*   **[Jan 15, 09:00 UTC]** ── Shmelly stages proprietary software algorithms and M&A documents.
*   **[Jan 18, 11:37 UTC]** ── Shmelly delivers an extortion email to the CEO and separates from the company.
*   **[Jan 21, 11:45 UTC]** ── Contractor Jane Smith initiates rogue exfiltration routing setup via FTP.
*   **[Feb 01, 03:55 UTC]** ── External actor hijacks Shmelly's account to phish Risk Analyst Robin Kirby.
*   **[Feb 01, 07:46 UTC]** ── Attacker uses local admin tokens to pivot from Kirby to Admin Valerie Orozco.
*   **[Feb 02, 03:32 UTC]** ── Attacker dumps credentials via Mimikatz, gaining Domain Admin status.
*   **[Feb 05, 13:28 UTC]** ── Jane Smith executes the final exfiltration data dump over FTP.
*   **[Feb 17, 02:30 UTC]** ── Attacker deploys a malicious GPO pushing ransomware to 306 machines.

## 2. Phase-by-Phase Technical Walkthrough

### Threat Thread A: The Malicious Insider Exfiltration (Jane Smith)

Independent of the ransomware timeline, environment network mapping caught a massive outbound data flow directed to an external rogue IP endpoint (182[.]56[.]23[.]121) utilizing **File Transfer Protocol (FTP)** over a 27-day active operational window.

```kql
// Tracking anomalous volumetric data outbound transfers
NetworkFlow
| where dest_ip == "182.56.23.121"
| summarize TotalBytes = sum(bytes), DistinctDays = dcount(format_datetime(timestamp, 'yyyy-MM-dd')) by dest_ip
```

{% include figure.html src="/assets/images/posts/inside-encryptodera/q-1.png" alt="KQL NetworkFlow query result showing 208,138 total bytes exfiltrated to 182[.]56[.]23[.]121 across 27 distinct days" caption="Figure 1: Outbound FTP volume to 182[.]56[.]23[.]121 — 208,138 bytes across 27 distinct active days." %}

*   **Total Volume Lost:** 208,138 bytes transferred across 27 distinct active days.
*   **The Attacking Identity:** The source IP mapping isolated a single corporate entity — Jane Smith (jasmith), operating under the role of "Crypto Bruh" (Blockchain Contractor) on host GOTI-LAPTOP.

Pivoting into her local web access records revealed extensive unauthorized probing behavior targeting directory strings protecting the company's **cold-storage crypto wallets**. Corporate mailbox checks caught her in active collusion with an external adversary profile (elboss[@]westealurcrypto[.]com), requesting an explicit endpoint landing pad to ship the secrets. Endpoint process auditing on GOTI-LAPTOP captured the download of localized data-collection and staging tools (`crypto_stealer.exe` and `ftp_client.exe`). To stage the exfiltration files daily, Jane executed an obfuscated, reversed-string PowerShell array containing her explicit deployment passphrase:

```powershell
C:\Windows\System32\powershell.exe -Nop -ExecutionPolicy bypass -enc <Base64_String>
```

*   **Staging Directory Target:** C:\Users\jasmith\ToTheMoon\
*   **Decoded Execution Passphrase:** Ugot2muchCRYTOw3llt4k3it0FFurH4ND5

### Threat Thread B: The Corporate Saboteur (Barry Shmelly)

On January 15, 2024, "StackOverflow Copy Paster" Barry Shmelly (bashmelly) expressed extreme public dissatisfaction regarding rumored corporate layoffs.

```kql
// Reviewing file access anomalies for disgruntled profiles
FileCreationEvents
| where username == "bashmelly"
| project timestamp, filename, path, process_name
```

{% include figure.html src="/assets/images/posts/inside-encryptodera/q-2.png" alt="KQL FileCreationEvents query result listing high-value corporate files created by the bashmelly user account" caption="Figure 2: File-creation telemetry for the bashmelly account — staging of high-value corporate files." %}

A review of his local endpoint telemetry showed that Shmelly had spent weeks researching covert data-collection methods. On January 15 and 16, he compiled several high-value corporate files:

*   SECRET_MergersAndAcquisitions_Strategy2025.docx
*   ExecutiveSalaryNegotiations.docx
*   Encryptodera_Proprietary_Algorithms.zip (compressed via 7-Zip using password `securepass123`)

Shmelly copied these assets directly onto an external hard drive labeled E:\SchmellyDrive\. He then sent insubordinate emails to several Social Media Managers and an extortion message to the Chief Executive Officer before separating from the firm on January 18.

### Threat Thread C: Identity Hijacking & Active Directory Domain Takeover

Although Barry Shmelly left the organization on January 18, his active corporate mailbox remained un-decommissioned. On February 1, 2024, an external threat actor operating from IP 143[.]38[.]175[.]105 successfully authenticated into Shmelly's account profile. The hijacked account was immediately used to send 9 highly sophisticated internal phishing lures.

The malicious messages contained a double-extension file designed to execute code silently: `Company_Financials_Q1_2024_Review.xlsx.exe`.

```kql
// Tracking successful internal phishing execution and lateral tracking
let hosts = ProcessEvents | where process_commandline has "systeminfo" | distinct hostname;
AuthenticationEvents
| where hostname in (hosts)
| summarize dcount(hostname) by src_ip
| order by dcount_hostname desc
```

{% include figure.html src="/assets/images/posts/inside-encryptodera/q-3.png" alt="KQL AuthenticationEvents query result ranking source IPs by distinct hostnames authenticated, led by 10.10.0.138" caption="Figure 3: Authentication fan-out by source IP — 10.10.0.138 driving connections across all 8 target hosts." %}

Our lateral-movement investigation focused on tracking common authentication patterns across the 8 corporate hosts that executed the `systeminfo` discovery string. By building a unified `let` array, we mapped out the internal source IPs driving these wide-scale authentications.

The telemetry isolated internal IP address 10.10.0.138 making a massive volume of 554 successful authentication connections across all 8 target workstations. While this IP footprint officially maps back to System Administrator Lynda Smith (MEED-DESKTOP), cross-referencing active session logs exposed a credential-misuse anomaly: the high-privilege account tokens were being systematically abused by an external actor using a compromised staging point to hop across network sectors undetected.

The most critical of these lateral pivots occurred on February 2, 2024, at 03:32:53 UTC, when the compromised administrative pipeline initiated an RDP connection, successfully authenticating straight into the DOMAIN_CONTROLLER_SERVER under the Domain Admin context of `lihenry_domain_admin`.

### Threat Thread D: Tracking the Delivery and Credential Chain

Risk Analyst Robin Kirby executed the attachment on February 1 at 03:59:30 UTC. The script dropped an instant remote-access agent (`screenconnect_client.exe`) and harvested localized administrator tokens (`systadmi_local_admin`) right from the system memory cache.

The adversary used these local admin credentials to move laterally from Robin Kirby's machine to the laptop of System Administrator Valerie Orozco (GJ95-LAPTOP). Once inside the administrator's host segment, the attacker dropped a credential dumper masquerading under a benign name to extract high-privilege domain validation structures:

```text
totally_not_mimikatz.exe "sekurlsa::logonpasswords"
```

This dumped the cleartext tokens for the Domain Administrator account: `lihenry_domain_admin`. On February 2, 2024, at 03:32:36 UTC, the attacker pivoted from internal host 10.10.0.138, successfully authenticated into the core DOMAIN_CONTROLLER_SERVER, and ran system reconnaissance checks using `nltest /dclist` to map out the company's complete network catalog.

To discover how the adversary hijacked these administrative accounts in the first place, we reversed the timeline to analyze the initial staging points. The tracking led back to February 1, 2024, when the adversary authenticated into Barry Shmelly's un-decommissioned mailbox from the external 143[.]38[.]175[.]105 and distributed 9 localized phishing links containing the double-extension file `Company_Financials_Q1_2024_Review.xlsx.exe`.

### Threat Thread E: Automated Ransomware Deployment

**The Identity Governance Gap:** The adversary retained total control of the Active Directory environment for **15 consecutive days** (February 2 – February 17) undetected. This visibility gap existed because the adversary was operating entirely under the context of authorized administrative tokens.

On February 17, 2024, at 02:30:50 UTC, the adversary executed their final objective. They staged a malicious Group Policy Object (GPO) on the Domain Controller and forced an immediate policy replication sequence across the entire corporate fleet:

```kql
// Identifying wide-scale malicious Group Policy enforcement strings
ProcessEvents
| where process_commandline contains "gpupdate /force"
| count
```

{% include figure.html src="/assets/images/posts/inside-encryptodera/q-4.png" alt="KQL ProcessEvents count query result showing 306 endpoints executed gpupdate /force" caption="Figure 4: Scope of the malicious GPO — 306 endpoints forced to run gpupdate /force." %}

The GPO forced **306 separate workstations** to pull down and launch the ransomware payload binary (`files_go_byebye.exe`) simultaneously. The automated utility targeted user data structures, appending the `.umadbro` extension to encrypted files and dropping the text-based ransom note `YOU_GOT_CRYTOED_SO_GIMME_CRYPTO.txt`.

## 3. MITRE ATT&CK Matrix Mapping

| Tactic | Technique ID | Technique Name | Operational Context |
|---|---|---|---|
| Initial Access | T1078.001 | Valid Accounts: Default Accounts | External authentication into Barry Shmelly's un-decommissioned mailbox. |
| Lateral Movement | T1534 | Internal Spearphishing | Mailbox abuse used to distribute Company_Financials_Q1_2024_Review.xlsx.exe. |
| Defense Evasion | T1036.005 | Masquerading: Match Legitimate Name | Running credential-harvesting components under the filename totally_not_mimikatz.exe. |
| Credential Access | T1003.001 | OS Credential Dumping: LSASS Memory | Memory dumping via Mimikatz to harvest Domain Admin tokens. |
| Discovery | T1016 | System Network Configuration Discovery | Domain mapping via native utility execution: nltest /dclist. |
| Lateral Movement | T1021.001 | Remote Services: Remote Desktop Protocol | Pivoting to the Active Directory Controller from internal asset 10.10.0.138. |
| Impact | T1484.001 | Domain Policy Modification: Group Policy | Leveraging GPO replication channels via gpupdate /force to distribute ransomware. |
| Impact | T1486 | Data Encrypted for Impact | Fleet-wide file lockdown using files_go_byebye.exe -encrypt. |

<!-- Section: Proactive Detection Engineering (Sigma & KQL rules) — to be added later, once the detections can be operationally justified. -->

## 4. Consolidated Indicators of Compromise (IOCs)

| Type | Indicator | Context / Association |
|---|---|---|
| IP Address | 143[.]38[.]175[.]105 | External threat-actor initial-access landing node |
| IP Address | 182[.]56[.]23[.]121 | External rogue FTP destination server (Jane Smith collusion) |
| Domain | notification-finance-services[.]com | Ransomware C2 domain staging indicator |
| Domain | update-finance-security[.]biz | Phishing document file-server root |
| Filename | Company_Financials_Q1_2024_Review.xlsx.exe | Double-extension weaponized phishing payload |
| Filename | files_go_byebye.exe | Enterprise ransomware encryption binary |
| Filename | totally_not_mimikatz.exe | Masqueraded LSASS credential dumper |
| File Extension | .umadbro | Ransomware cryptographic suffix |
| Ransom Note | YOU_GOT_CRYTOED_SO_GIMME_CRYPTO.txt | Post-encryption ransom extortion document |
| Account Name | systadmi_local_admin | Hijacked local administrative maintenance identity |
