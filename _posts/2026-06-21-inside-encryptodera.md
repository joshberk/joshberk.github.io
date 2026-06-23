---
layout: post
title: "Project CryptoStealer: Credential Misuse & Exfiltration"
date: 2026-06-21
categories: [threat-detection, dfir-portfolio]
tags: [Insider Threat, Data Loss Prevention]
focus: "Obfuscation Analysis, Identity Logs"
description: "Deconstructing a high-risk internal data diversion scheme. Correlating identity authentication logs with endpoint process arguments to map out unauthorized internal reconnaissance and decode obfuscated, reverse-string PowerShell command arrays."
permalink: /blog/inside-encryptodera.html
type: "Case Study"
discipline: "Threat Detection Engineering"
math: false
---

<div class="lab-post">
  <div class="lab-post-tags">
    <span class="tag tag-rose">Insider Threat</span>
    <span class="tag tag-amber">DLP</span>
    <span class="tag tag-blue">Obfuscation Analysis</span>
    <span class="tag tag-purple">Identity Logs</span>
  </div>

  <p class="lab-post-lead">
    Insider threats are notoriously difficult to detect because actors leverage legitimate credentials and authorized administrative access. This case study details the forensic investigation of <strong>Project CryptoStealer</strong>, an internal threat actor who abused privileged domain access to locate and exfiltrate database credential backups and certificate private keys from a staging server.
  </p>

  <div class="insight-grid">
    <div class="insight-card">
      <p class="insight-label">Vector</p>
      <p>Legitimate administrative session misuse paired with custom obfuscated PowerShell scripts.</p>
    </div>
    <div class="insight-card">
      <p class="insight-label">Telemetry</p>
      <p>Windows Event Logs (Security channel: Event IDs 4624, 4672) correlated with EDR process command lines.</p>
    </div>
    <div class="insight-card">
      <p class="insight-label">Exfiltration</p>
      <p>Sensitive configuration backups moved outbound via DNS tunneling payloads.</p>
    </div>
  </div>

  <div class="toc-inline">
    <p>Contents</p>
    <ol>
      <li><a href="#incident-detection">Anomaly Detection & Initial Alerts</a></li>
      <li><a href="#identity-correlation">Identity Correlation & Session Hijacking</a></li>
      <li><a href="#obfuscation">De-obfuscating the PowerShell Payload</a></li>
      <li><a href="#data-access">Accessing the Credential Vault</a></li>
      <li><a href="#detection-kql">Detection & Hunting KQL Queries</a></li>
      <li><a href="#mitigations">Prevention & Access Control Controls</a></li>
    </ol>
  </div>

  <h2 id="incident-detection" class="anchor">1. Anomaly Detection & Initial Alerts</h2>
  
  <p>
    The incident was identified when the SOC received a threat alert detailing a high volume of DNS query requests targeting a subdomain of <code>aws-update-service.net</code> from a system hosting a critical staging application database (<code>STG-DB-02</code>).
  </p>
  <p>
    A standard DNS lookup of the domain showed it was not owned by Amazon Web Services, but rather registered through a private domain service in Eastern Europe. The query logs showed a repetitive sequence of TXT and A-record queries carrying hex-encoded subdomains, characteristic of DNS exfiltration (tunneling).
  </p>

  <h2 id="identity-correlation" class="anchor">2. Identity Correlation & Session Hijacking</h2>

  <p>
    Security analysts reviewed authentication logs for <code>STG-DB-02</code>. They found a successful Logon Session (Event ID 4624) corresponding to a senior engineer's administrator account:
  </p>
  
  <ul>
    <li><strong>Logon Type:</strong> Type 3 (Network Logon) via SMB / Kerberos.</li>
    <li><strong>Source Network Address:</strong> <code>10.10.14.88</code> (assigned to a contractor workstation).</li>
    <li><strong>Privileges:</strong> Event ID 4672 (Special privileges assigned: <code>SeDebugPrivilege</code>, <code>SeBackupPrivilege</code>).</li>
  </ul>

  <p>
    The engineer associated with the logon was confirmed to be out of the office on annual leave, pointing to either session theft, remote credential theft, or malicious insider activity using shared credentials.
  </p>

  <h2 id="obfuscation" class="anchor">3. De-obfuscating the PowerShell Payload</h2>

  <p>
    Process audit log events (Event ID 4688) showed that the compromised user session spawned a PowerShell process with a highly obfuscated command line:
  </p>

  <pre data-lang="powershell"><code>powershell.exe -w hidden -c "$s='txet.tseuqerderc\pmt\swodniw\:c egapkaB-tcatxE.tpyrcsnwod$'; iex ($s.ToCharArray() | % {$o += $_}; [Array]::Reverse($o); $o -join '')"</code></pre>

  <p>
    Let's deconstruct the script to understand how it bypasses signature-based security rules:
  </p>
  <ol>
    <li>The variable <code>$s</code> holds a reversed string: <code>'txet.tseuqerderc\pmt\swodniw\:c egapkaB-tcatxE.tpyrcsnwod$'</code>.</li>
    <li><code>$s.ToCharArray() | % {$o += $_}; [Array]::Reverse($o); $o -join ''</code> converts the string to an array, reverses the character order, and joins them back together.</li>
    <li>Evaluating the reversed string yields the actual payload: <code>$downscript.Extract-Backupage c:\windows\temp\credrequest.text</code>.</li>
  </ol>
  
  <p>
    The decrypted target file (<code>credrequest.text</code>) contained script instructions to copy registry hive keys using native utilities to obtain local password hashes:
  </p>

  <pre data-lang="cmd"><code>reg save HKLM\SAM C:\windows\temp\sam.bak
reg save HKLM\SYSTEM C:\windows\temp\system.bak</code></pre>

  <h2 id="data-access" class="anchor">4. Accessing the Credential Vault</h2>

  <p>
    Using the local admin privileges, the attacker targeted staging database connection strings and TLS private key certificates stored in the system vault:
  </p>
  <pre data-lang="powershell"><code>Get-ChildItem Cert:\LocalMachine\My | Export-Certificate -Type CERT -FilePath C:\windows\temp\server_key.cer</code></pre>
  <p>
    The data was packed into a byte stream and chunked via the rogue AWS update subdomain using an automated DNS utility script, transmitting small pieces of data within DNS query host headers.
  </p>

  <h2 id="detection-kql" class="anchor">5. Detection & Hunting KQL Queries</h2>

  <p>
    Implement these KQL rules inside your SIEM to monitor for administrative session misuse and command-line string reversal tricks.
  </p>

  <h3>Detecting PowerShell Command String Reversals</h3>
  <pre data-lang="kql"><code>DeviceProcessEvents
| where ProcessCommandLine contains "Reverse" or ProcessCommandLine contains "ToCharArray"
| where ProcessCommandLine contains "iex" or ProcessCommandLine contains "Invoke-Expression"
| project TimeGenerated, DeviceName, InitiatingProcessFileName, ProcessCommandLine, AccountName</code></pre>

  <h3>Anomalous Registry Save Operations</h3>
  <pre data-lang="kql"><code>DeviceProcessEvents
| where FileName =~ "reg.exe"
| where ProcessCommandLine contains "save" and (ProcessCommandLine contains "SAM" or ProcessCommandLine contains "SYSTEM" or ProcessCommandLine contains "SECURITY")
| project TimeGenerated, DeviceName, FileName, ProcessCommandLine, AccountName, FolderPath</code></pre>

  <h2 id="mitigations" class="anchor">6. Prevention & Access Control Controls</h2>

  <div class="callout callout-tip">
    <div class="callout-title">Hardening Recommendations</div>
    <ul class="callout-list">
      <li><strong>Disable Registry Export:</strong> Restrict non-system execution access to <code>reg.exe</code> and <code>regedit.exe</code>.</li>
      <li><strong>Enforce Logon Boundaries:</strong> Restrict local administrative logins from network segments that contain user workstations.</li>
      <li><strong>DNS Tunneling Detection:</strong> Enable machine-learning threat detection in local firewalls and domain controllers to flag anomalous high-frequency subdomain requests.</li>
    </ul>
  </div>
</div>
