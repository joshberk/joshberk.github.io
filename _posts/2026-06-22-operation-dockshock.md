---
layout: post
title: "Incident Investigation Report: Operation DOCKSHOCK"
date: 2026-06-22
categories: [threat-detection, dfir-portfolio]
tags: [Critical Infrastructure, Supply Chain]
status: "Coming Soon"
focus: "Investigation in Progress"
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
    <span class="tag tag-purple">Active Investigation</span>
  </div>

  <p class="lab-post-lead">
    This threat intelligence case study and forensic analysis is currently an <strong>active investigation</strong>. Once complete, it will detail the complete intrusion path, command-and-control infrastructure layout, and mitigation strategy for the Operation DOCKSHOCK intrusion.
  </p>

  <div class="callout callout-warn">
    <div class="callout-title">Investigation Status: In Progress</div>
    <p>
      Our team is currently analyzing telemetry logs from compromised endpoints, correlating lateral movement via WinRM sessions, and compiling KQL threat hunting queries. The full report will be published here upon completion.
    </p>
  </div>

  <h3>Expected Highlights of the Upcoming Report:</h3>
  <ul>
    <li><strong>Initial Access Vector Analysis:</strong> Mapping the perimeter XSS probes and spear-phishing campaigns targeting Solvi Systems.</li>
    <li><strong>C2 Beaconing Signature:</strong> Detailing the customized backdoor (ecobug.exe) outbound TCP/1337 communication.</li>
    <li><strong>Lateral Movement Tracing:</strong> Forensic breakdown of active directory enumeration and WinRM session hijacking.</li>
    <li><strong>Hunting Framework:</strong> A pack of KQL rules designed to detect local administrative additions and cURL exfiltration pipelines.</li>
  </ul>

  <div class="blog-footer" style="margin-top: 2rem;">
    <a href="/blog/" class="btn btn-outline">← Back to Blog</a>
  </div>
</div>
