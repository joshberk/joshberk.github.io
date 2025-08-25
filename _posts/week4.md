---
title: "Week 4 - Modern Encryption Primitives Beyond the Basics"
date: 2025-09-01
categories: [cryptography, study-notes]
description: "Building on probability and secrecy, this week I explore advanced cryptographic primitives: Format-Preserving Encryption, Fully Homomorphic Encryption, Searchable Encryption, and Tweakable Encryption. I also examine how weak ciphers and wrong models undermine security."
type: "Study Notes"
discipline: "cryptography"
---

## Introduction: Beyond Perfect Secrecy

Last week, I focused on **perfect secrecy** and its formal proof through the **One-Time Pad**. While elegant, perfect secrecy is impractical: key lengths grow with the message, and key reuse is fatal.  

This week, I looked at how cryptography evolves beyond those limitations. The field doesn’t stop at confidentiality — it adapts to new contexts: databases, cloud computing, and searchable storage. The primitives I studied — **FPE, FHE, Searchable Encryption, and Tweakable Encryption** — reveal how mathematical creativity pushes the boundaries of what encryption can do.

---

## Format-Preserving Encryption (FPE)

Traditional block ciphers output binary strings, but sometimes applications require ciphertexts in a specific **format**.  

- Example: A database column that only accepts 16-digit credit card numbers.  
- With FPE, a credit card number can be encrypted into another valid credit card number.  

### How it works:
- Input: plaintext formatted as digits, characters, or structured fields.  
- Output: ciphertext that **preserves the format** of the plaintext.  

For instance:  

```
Plaintext:  127.0.0.1
Ciphertext: 22.91.8.2
```

The encryption preserves the dotted-decimal format of an IP address.

### Applications:
- Credit card storage (PCI compliance).  
- Legacy systems with strict data validation.  
- Encrypted databases where schema consistency is required.

---

## Fully Homomorphic Encryption (FHE)

Perhaps the most radical shift in encryption is **Fully Homomorphic Encryption (FHE)**.  

It allows computations to be performed **directly on ciphertexts** without decryption.  

Formally, given encryption:  
$$
C = \mathrm{Enc}_K(P),
$$  

there exists an evaluation function such that:  
$$
\mathrm{Eval}_f(C) = \mathrm{Enc}_K(f(P)),
$$  

for any function \(f\).  

### Why this matters:
- Cloud providers can process encrypted data without ever seeing plaintext.  
- Enables privacy-preserving machine learning: evaluate models on encrypted inputs.  
- Secure medical or financial computations.  

### Challenges:
- Extremely slow compared to standard encryption.  
- First practical scheme introduced in 2009 by Craig Gentry; efficiency remains the biggest obstacle.  
- Still, FHE has become practical enough for specific use cases (like evaluating ML models).

---

## Searchable Encryption (SE)

Encryption hides data, but what if you want to **search** encrypted databases?  

- Naively: download everything, decrypt locally, then search.  
- Searchable Encryption solves this by letting queries be performed **over encrypted data**.  

### How it works:
- The client encrypts both the database **and the search queries**.  
- The server executes the search without learning the actual keywords.  

### Applications:
- Cloud storage: search encrypted files without revealing contents.  
- Enterprise security: private search across logs or documents.  

### Limitations:
- Leakage: many SE schemes leak metadata (e.g., access patterns).  
- Commercial solutions often compromise between **efficiency and security**.  

---

## Tweakable Encryption (TE)

Tweakable encryption extends block ciphers with an additional input: a **tweak**.  

$$
C = \mathrm{Enc}_K^T(P)
$$

- \(K\): secret key  
- \(T\): tweak (public, non-secret)  
- \(P\): plaintext  

The tweak allows the same key to encrypt data differently in different contexts.  

### Example: Disk Encryption
- Each block on a disk gets a unique tweak value (like a sector number).  
- Prevents identical plaintext blocks from producing identical ciphertext blocks.  
- Avoids reliance on randomized encryption (which may inflate storage size).  

Thus, TE strikes a balance between determinism and security — crucial for storage systems.

---

## When Things Go Wrong

Even with strong primitives, systems can fail if:  
- **Wrong model**: Engineers assume “encryption = secure,” without clarifying threat models (e.g., IND-CPA vs. IND-CCA).  
- **Weak ciphers**: Using outdated or insecure algorithms (like DES, RC4).  
- **Misapplied primitives**: E.g., using FPE where structural leakage compromises privacy.  

Security requires aligning cryptographic guarantees with **real-world threats**.

---

## Reflection

Week 4 broadened my perspective: cryptography isn’t only about secrecy. It’s about **enabling functionality while preserving privacy**.  

- FPE solves format constraints.  
- FHE enables computation over ciphertexts.  
- SE makes encrypted search practical.  
- TE strengthens encryption for storage systems.  

Each primitive shows the tension between **theory, performance, and application**. The coming weeks will build on this, moving toward **computational security proofs and IND-CPA/IND-CCA formalizations**.

---

### Study Resources

- **Serious Cryptography** (Jean-Philippe Aumasson) — practical discussions of FPE and modern primitives.  
- **Katz & Lindell** (Ch. 2–3) — formalism behind correctness and security.  
- Research papers on FHE (Gentry 2009, later optimizations).  
