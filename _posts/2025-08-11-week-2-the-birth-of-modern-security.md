---
title: "Week 2 - The Birth of Modern Security"
date: 2025-08-11
categories: [cryptography, study-notes]
description: "My second week's dive into cryptography, exploring the transition from classical ciphers to modern security. This post unpacks Kerckhoffs's Principle, attack models, and why mathematical rigor is essential."
type: "Study Notes"
discipline: "cryptography"
---

## Introduction: From Classical Ciphers to Provable Security

This week, my journey into cryptography moved beyond simple classical ciphers to the core principles that define modern, secure systems. I explored the theoretical foundations that separate toy ciphers from those we can actually trust, delving into mathematical proofs, security goals, and the different ways an attacker can interact with a system. This post will integrate my notes to bridge the past and present, revealing the core principles that separate a toy cipher from a truly secure system. It will also incorporate the mathematical notations I'm beginning to learn, showcasing the rigor that underpins the field. The information is sourced from the text "Serious Cryptography".

## Theoretical Foundations: What We Trust and Why

My study this week focused on both the historic roots and the fundamental principles of cryptography. I explored classical ciphers to understand their mechanics and, more importantly, why they fail. A key insight from this study is that security often rests on two components: a **permutation** and a **mode of operation**. A permutation is a function that transforms an item, giving each item a unique output , and a mode of operation is an algorithm that uses a permutation to process messages of arbitrary sizes.

A great example is the **Shift Cipher**, a variant of the Caesar cipher. In this scheme, the key k is a number between 0 and 25, and encryption involves shifting each letter of the plaintext forward by k positions. Mathematically, if we equate the English alphabet with the set {0, ..., 25}, the encryption of a message m = m1, ..., me is given by:

```
Enc_k(m1, ..., me) = c1, ..., ce
```

where ci = [(mi + k) mod 26].

The decryption process reverses this, using the formula:

```
mi = [(ci - k) mod 26]
```

I also explored the concept of a **One-Time Pad**, a theoretical "perfect cipher". The One-Time Pad takes a plaintext P and a random key K of the same length, with the ciphertext C defined as the bitwise exclusive OR (XOR) operation of the two:

```
C := P ^ K
```

Decryption is then simply reversing the operation:

```
P := C ^ K
```

For an encryption scheme to be secure, it must not be vulnerable to a brute-force or exhaustive search attack, which is an attack that involves trying every possible key. This observation leads to the **"Sufficient Key-Space Principle,"** which states that a secure encryption scheme must have a key space that is large enough to make an exhaustive search attack infeasible. Given modern computing resources, a key size of at least 2^80 is needed.

However, a large key space is not a sufficient condition for security. For example, the Mono-Alphabetic Substitution Cipher has a key space of 26! (approximately 4 x 10^25), which is large enough to be brute-force resistant. But it can be easily broken using **statistical frequency analysis** of the English language because the mapping of each letter is fixed.

A private-key encryption scheme is defined by specifying a message space M along with three algorithms: a key generation procedure (`Gen`), an encryption procedure (`Enc`), and a decryption procedure (`Dec`). An encryption scheme must satisfy the following correctness requirement: for every key k output by `Gen` and every message m ∈ M, it holds that:

```
Dec_k(Enc_k(m)) = m
```

## Applied Realities: Attack Models and Modern Constructs

This week highlighted the critical importance of Kerckhoffs's Principle, which states that the security of an encryption scheme should rely solely on the secrecy of the key, not on the secrecy of the algorithm itself. This allows for the standardization of schemes that can be publicly scrutinized and peer-reviewed.

A security notion is the combination of a security goal and an attack model. An **attack model** is a set of assumptions about how attackers might interact with a cipher and what they can and can't do. Some of the primary models include:

- **Ciphertext-only attacks:** Where the attacker only observes ciphertexts but doesn't know the associated plaintexts.
- **Known-plaintext attacks (KPA):** Where the attacker observes ciphertexts and knows the associated plaintexts.
- **Chosen-plaintext attacks (CPA):** Where an attacker can perform encryption queries for plaintexts of their own choice and observe the resulting ciphertexts.
- **Chosen-ciphertext attacks (CCA):** Where an attacker can perform both encryption and decryption queries of ciphers different from the targeted ciphertext.

Semantically secure encryption is a security goal. It is defined as a cipher where nothing can be learned about the plaintext as long as the key is secret. To achieve IND-CPA security, encryption schemes must return a different ciphertext for every plaintext, even if a user keeps encrypting the same plaintext. Semantically Secure encryption is often constructed using a deterministic random bit generator (DRBG) that returns random-looking bits given some secret seed. This can be represented by the formula:

```
E(K,P,R) := (DRBG(K||R) ⊕ P, R)
```

**Authenticated Encryption with Associated Data (AEAD)** is a powerful modern scheme that protects both the integrity and confidentiality of data, as well as providing an authentication tag to prevent replay attacks. The key exchange or how to get a Shared Secret has been a hard problem to solve and asymmetric keys are referred to as public key Cryptography, which makes great use of different keys for different functions or provides different types of protection of view to different participants.

## Challenges & Future Reflections

The biggest insight from this week was the understanding that a large key space alone does not guarantee security. The realization that ciphers like the Mono-Alphabetic Substitution Cipher can be broken by exploiting the statistical properties of the language, even with a massive number of keys, was a key takeaway. This highlights the necessity of moving beyond classical ciphers to modern, rigorously designed schemes.

I'm starting to appreciate the true meaning of Kerckhoffs's Principle and the role it plays in our secure, interconnected world. This principle demands that we design our schemes to be secure even if the adversary knows all the details, so long as they don't know the key being used.

Next week, I'll continue to build on these concepts as I dive into computational security and start exploring encryption's resilience under these different attack scenarios.

### Study Resources

- **Serious Cryptography** by Jean-Philippe Aumasson, Chapter 1.

## Stay tuned for weekly updates on my progress!