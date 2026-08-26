---
layout: investigation
title: "Inside Flare Darkroom: Following the Ransomware and Credential Economy"
# See Part 1 for the series ordering note.
date: 2026-08-25 11:00:00 +0000
source: flare-darkroom
series: "Flare Darkroom Investigation Series"
series_title: "Following the Ransomware and Credential Economy"
part: 2
categories: [threat-intelligence, dark-web-intelligence]
tags: [Ransomware, Credential Markets]
topics:
  - Ransomware
  - Ransomware-as-a-Service
  - Threat Actor Analysis
  - Credential Stuffing
  - Credential Markets
  - Cyber Threat Intelligence
threat_type: "Ransomware Ecosystem → Credential Redistribution"
status: "Completed"
investigation_type: "Simulated Dark-Web Intelligence Investigation"
environment: "Darkroom by Flare (simulated training environment)"
analyst: "Joshua Berkoh"
tools: "Underground forum collection · Actor profiling · Credential lifecycle analysis"
framework: "Intelligence cycle · Analyst tradecraft"
report_part: "Part 2 of 3"
report_version: "1.0"
source_name: "Darkroom by Flare"
source_url: "https://flare.io"
description: "Following the NovaCrest investigation through ransomware operations, credential stuffing, account resale, and the underground credential economy."
simulation_note: "Darkroom is a simulated training environment created by Flare. Specific challenge answers and sensitive artifacts such as passwords, cryptocurrency addresses, contact identifiers, and internal hostnames have intentionally been omitted so readers can complete the investigation independently."
permalink: /investigations/flare-darkroom/ransomware-credential-economy/
math: false
---

| Flare Darkroom, Part 2 | At a Glance |
|---|---|
| **Environment** | Darkroom by Flare (simulated dark-web training environment) |
| **Subject** | NovaCrest (fictional victim organisation) |
| **Simulated Sources** | RAMP · Cracked |
| **Analytical Focus** | Ransomware ecosystem roles, actor pivoting, credential lifecycle |
| **Method** | Manual investigation and analysis |
| **Analyst** | Joshua Berkoh · Part 2 of a three-part series |

[Part 1]({{ '/investigations/flare-darkroom/initial-access-credential-exposure/' | relative_url }}) ended with two observations pointing at the same fictional company. On Exploit, an Initial Access Broker was selling corporate VPN access to NovaCrest. On BreachForums, NovaCrest credentials were circulating in data from a breach at a vendor, Vectrix Solutions.

Two artifacts, one organisation, and no established relationship between them.

The next two stages moved away from the question of how the access was obtained and toward what happens to access and credentials once they are in circulation.

<p class="concept-equation">RAMP <span class="eq-op">→</span> Cracked</p>

One stage covered the ransomware ecosystem. The other showed where compromised credentials end up after the market for them stops being exclusive.

## 1. RAMP and the Ransomware Ecosystem

The third stage took place inside a simulated archive of RAMP, a forum historically associated with the ransomware ecosystem: Ransomware-as-a-Service recruitment, affiliate arrangements, and access trading.

Darkroom's simulation centres on a fictional ransomware operation called BlackVortex. The objective was to identify the actor behind a recruitment post, then pivot from the post into that actor's profile, which exposed a further communication identifier tied to the operator.

<ol class="flow-chain">
  <li>Ransomware recruitment post<span class="flow-note">Public, written to attract affiliates</span></li>
  <li>Forum handle<span class="flow-note">The operational identity attached to the post</span></li>
  <li>User profile<span class="flow-note">Registration details, activity, self-description</span></li>
  <li>Contact identifier<span class="flow-note">A channel the actor uses off-forum</span></li>
</ol>

Mechanically that is four clicks. What makes it worth writing about is what each step actually buys you, because the value is uneven. The post tells you what the operation is advertising for. The profile tells you how long the identity has existed and what else it has done. The contact identifier is the most durable of the three, because handles are cheap to abandon but a channel an actor has built correspondents around is not.

## 2. Attribution Is an Accumulation of Relationships

Attribution rarely looks like a single decisive finding. It looks like a slowly growing set of relationships around an identity, none of which is conclusive on its own.

<div class="entity-map">
  <div class="entity-group">
    <p class="node-label">Forum handle</p>
    <ul>
      <li><span class="entity-rel">authors →</span> <span class="entity-target">recruitment post</span></li>
      <li><span class="entity-rel">advertises →</span> <span class="entity-target">ransomware programme</span></li>
      <li><span class="entity-rel">uses →</span> <span class="entity-target">contact identifier</span></li>
      <li><span class="entity-rel">appears in →</span> <span class="entity-target">other sources</span></li>
    </ul>
  </div>
</div>

Each edge adds context. None of them adds certainty, and the distinction matters more than it might sound.

A forum identity is an operational persona. It can be shared between people, sold, retired, or rebuilt. Establishing that a persona ran a recruitment campaign and used a particular contact channel is a claim about the persona, not about whoever is behind it. The Darkroom exercise never asks you to name a human being, and that restraint is the right instinct: operational identity is what the evidence can actually support, and it is also the thing defenders can act on.

Worth stating plainly, because these get collapsed together often: what I observed were forum artifacts. What I inferred was a consistent operational identity behind them. Those are different confidence levels and should be reported as such.

## 3. Different Actors, Different Roles

Exploit introduced a broker. RAMP introduced a ransomware operation. Treating them as the same kind of participant would flatten the thing the exercise is actually teaching.

A simplified view of the division of labour:

<ol class="flow-chain">
  <li>Initial Access Broker<span class="flow-note">Obtains a foothold and sells it</span></li>
  <li>Ransomware affiliate<span class="flow-note">Buys or is assigned access, executes against the victim</span></li>
  <li>RaaS operator<span class="flow-note">Supplies the ransomware, infrastructure, and negotiation apparatus; takes a cut</span></li>
</ol>

Real arrangements vary, since affiliates sometimes source their own access and operators sometimes run intrusions directly, but the principle holds. Different participants perform different functions inside the same incident.

Which is why role matters as much as identity. Once you have found an actor, the more productive question is what they do:

- Are they selling access, or buying it?
- Operating infrastructure, or renting someone else's?
- Recruiting affiliates?
- Developing or deploying malware?
- Reselling credentials?
- Handling victim negotiation?

Finding an actor is a result. Knowing their function is what lets you predict what comes next.

## 4. Cracked and the Credential Economy

The fourth stage moved to a simulated version of Cracked, and the change in register was immediate. Compared with Exploit and RAMP, this was a lower tier of the same economy: compromised NovaCrest accounts selling for a few dollars each, and a separate actor trading a combolist assembled specifically around NovaCrest users.

Combolists, credential stuffing, cheap account resale, wordlists: this is the volume end of the market, and it operates on entirely different economics from a $3,500 access listing.

Seeing it directly after the BreachForums stage reframed the earlier credential exposure. The vendor breach was not the end of that incident. It was the first step in a lifecycle.

<ol class="flow-chain is-terminal">
  <li>Breach<span class="flow-note">The original compromise, here at a third-party vendor</span></li>
  <li>Leak<span class="flow-note">Data published or traded</span></li>
  <li>Redistribution<span class="flow-note">Copied, mirrored, merged with other datasets</span></li>
  <li>Combolist<span class="flow-note">Repackaged and targeted at a specific organisation or service</span></li>
  <li>Credential stuffing<span class="flow-note">Automated testing against live services</span></li>
  <li>Account compromise<span class="flow-note">Validated credentials become working access</span></li>
  <li>Resale<span class="flow-note">Confirmed accounts sold on cheaply</span></li>
  <li>Further abuse</li>
</ol>

The same credential can generate risk repeatedly, at different times, through different actors, long after the organisation has stopped thinking about the breach that produced it. A leaked password is not an event with an end date; it is an input to a pipeline.

## 5. A Three-Dollar Account Can Still Be a Real Problem

The resale price on Cracked was the detail I kept turning over. A few dollars per compromised account is close to worthless individually.

Low price does not mean low impact. It reflects supply. When validated credentials are abundant and the tooling to test them is commodity, the unit price collapses. The thing that makes them cheap is the same thing that makes them dangerous, which is that there are a great many of them and testing them costs almost nothing.

The organisational risk from a cheap account is rarely the account itself. It is what the account is reused for, what it can see, and whether it grants a path to something that matters.

|  | High-value access | Low-cost accounts |
|---|---|---|
| **Product** | Corporate VPN access, elevated privilege | Individual compromised user accounts |
| **Price** | Thousands of dollars | A few dollars |
| **Buyer** | Ransomware affiliates, intrusion operators | Fraud, resale, opportunistic abuse |
| **Volume** | Scarce, individually negotiated | Abundant, sold in bulk |
| **Risk to the organisation** | Direct path to enterprise compromise | Reuse, escalation, and a foothold in adjacent services |

Different products, different buyers, different price points, one ecosystem. That was the most useful thing this stage did. It refused to present "the dark web" as a single undifferentiated place, and instead showed tiers with distinct functions and distinct economics.

## 6. The Attack Chain Starts to Resolve

By the end of the fourth stage, enough of the NovaCrest story was visible for the separate exercises to stop looking separate.

<div class="chain-parallel">
  <div class="chain-col">
    <p class="chain-col-label">Credential track</p>
    <ol class="flow-chain">
      <li>Third-party vendor breach</li>
      <li>Credential exposure</li>
      <li>Redistribution and combolists</li>
      <li>Stuffing, account resale</li>
    </ol>
  </div>
  <div class="chain-col">
    <p class="chain-col-label">Access track</p>
    <ol class="flow-chain">
      <li>Corporate access obtained</li>
      <li>Initial Access Broker listing</li>
      <li>Ransomware ecosystem demand</li>
      <li>Potential post-compromise activity</li>
    </ol>
  </div>
</div>

Two tracks, running at different speeds, both originating from the same organisation's exposure.

What changes at this point is not the amount of evidence. It is the shape of it. The same artifacts that read as a list in Part 1 now read as a sequence, and a sequence supports questions a list cannot: about ordering, about causation, about what should have been detectable and when.

## 7. What Part 2 Reinforced

**Cybercrime is specialised, and roles are analytically load-bearing.** Brokers, operators, affiliates, credential traders, and account resellers occupy different positions in the same supply chain. Working out which one you are looking at does more for an assessment than another indicator does.

**Credentials have a lifecycle, and it outlasts the breach.** Exposed credentials keep moving: copied, merged, validated, stuffed, resold. Treating a leak as a closed event underestimates it by a wide margin.

One thread was still loose. Reviewing the access listing again, the broker from the very first stage turned up somewhere I had not been looking: a second forum, carrying the same NovaCrest access, and not quite the same details.

That cross-post is what makes the final stage possible.

**Next:** [Part 3: Cross-Forum Intelligence and Simulated Threat-Actor Engagement]({{ '/investigations/flare-darkroom/cross-forum-intelligence/' | relative_url }})
