---
title: "Week 3 - Probability, Perfect Secrecy, and the One-Time Pad"
date: 2025-08-25
categories: [cryptography, study-notes]
description: "My third week dives into probability, conditional distributions, and formal definitions of secrecy. I work through shift cipher examples, Bayes’ Theorem, and the rigorous proof that the One-Time Pad achieves perfect secrecy."
type: "Study Notes"
discipline: "cryptography"
---

## Introduction: From Intuition to Probability

This week marks the transition from intuitive concepts of confidentiality to **probability-driven formalism**. By grounding cryptography in probability theory, we begin to see how definitions like *perfect secrecy* and *computational security* emerge naturally. Along the way, I explored Message Authentication Codes (MACs), conditional probability, Bayes’ Theorem, and the rigorous proof that the **One-Time Pad (OTP)** achieves *perfect secrecy*.

---

## Motivation: Integrity Before Math

Before diving into the mathematics, I considered a real-world motivating case: **stateless cookies**.  

- Browsers issue cookies to avoid re-authenticating a user at every request.  
- If these cookies store sensitive values (like usernames or privileges), attackers can tamper with them.  
- To prevent tampering, we use a **Message Authentication Code (MAC)**:  

$$\tau \leftarrow \mathrm{MAC}_K(m)$$

The server checks whether the received message $m$ has a valid tag $\tau$. Without knowledge of the secret key $K$, attackers cannot forge a valid tag.  

This example highlights the principle: **Confidentiality hides, Authentication verifies.** Both rely on *keys*. Without secret keys, neither confidentiality nor integrity is possible.

---

## Probability Foundations in Cryptography

Cryptography is inseparable from probability.  

- **Independence**: If two events are independent,  
  $$\Pr[E \wedge F] = \Pr[E] \cdot \Pr[F]$$

- **Mutually Exclusive Events**: If two events cannot happen together,  
  $$\Pr[E \vee F] = \Pr[E] + \Pr[F]$$

- **Conditional Probability**:  
  $$\Pr[E \mid F] = \frac{\Pr[E \wedge F]}{\Pr[F]}$$

These rules are the engine for analyzing ciphers, distributions, and adversarial advantage.

---

## Worked Example: Shift Cipher

Suppose we work with a shift cipher on the English alphabet, with key space $K = \{0, 1, \dots, 25\}$. Each key is chosen uniformly:

$$\Pr[K=k] = \frac{1}{26}$$

Now suppose the message distribution is:

$$\Pr[M = a] = 0.7, \quad \Pr[M = z] = 0.3$$

**Question:** What is the probability the ciphertext equals “B”?  

Two cases:  
1. $M = a, K = 1$  
2. $M = z, K = 2$  

By independence of $M$ and $K$:  

$$\Pr[C = B] = \Pr[M=a \wedge K=1] + \Pr[M=z \wedge K=2]$$  

$$= 0.7 \cdot \frac{1}{26} + 0.3 \cdot \frac{1}{26} = \frac{1}{26}$$

This illustrates how ciphertext distributions emerge from message and key distributions.

---

## Bayes’ Theorem in Cryptography

The interesting question is not just “what ciphertext appears,” but “what does seeing a ciphertext tell us about the underlying message?”  

Using Bayes' Theorem:

$$\Pr[M=m \mid C=c] = \frac{\Pr[C=c \mid M=m] \cdot \Pr[M=m]}{\Pr[C=c]}$$

For the shift cipher example, if we observe $C = B$:  

$$\Pr[M=a \mid C=B] = 0.7$$  

This matches the prior distribution — meaning the ciphertext didn’t *reduce* uncertainty in this specific setup. But in general, weak schemes *do* leak message information, motivating stronger definitions.

---

## Perfect Secrecy: Definition and Lemma

Claude Shannon introduced **perfect secrecy** as the gold standard:

> An encryption scheme $(\text{Gen}, \text{Enc}, \text{Dec})$ over message space $\mathcal{M}$ is perfectly secret if for all $m \in \mathcal{M}, c \in \mathcal{C}$ with $\Pr[C=c] > 0$:
>
> $$\Pr[M=m \mid C=c] = \Pr[M=m]$$


Equivalent formulation: ciphertext distributions do not depend on the message.  

$$\Pr[\mathrm{Enc}_K(m) = c] = \Pr[\mathrm{Enc}_K(m') = c], \quad \forall m, m' \in \mathcal{M}, c \in \mathcal{C}$$

This means: observing the ciphertext gives *zero information* about the plaintext.

---

## The One-Time Pad: Proof of Perfect Secrecy

The **One-Time Pad (OTP)** is the canonical example.

- Key $K \xleftarrow{\$} \{0,1\}^L$  
- Message $M \in \{0,1\}^L$  
- Ciphertext: $C = M \oplus K$

**Proof sketch:**  

Fix any $m \in \{0,1\}^L$ and ciphertext $c \in \{0,1\}^L$. Then:

$$\Pr[C=c \mid M=m] = \Pr[K = m \oplus c] = 2^{-L}$$  

Since $K$ is uniform and independent, this holds for all $m$. Therefore:

$$\Pr[M=m \mid C=c] = \Pr[M=m]$$  

Thus, the One-Time Pad achieves *perfect secrecy*.

---

## Drawbacks of the One-Time Pad

Despite its elegance, the OTP is rarely used in practice:  

- **Key length problem**: The key must be as long as the message.  
- **Key reuse risk**: Reusing the same OTP key across two messages leaks information (e.g., XOR of the two messages).  
- **Distribution**: Securely sharing and storing huge random keys is impractical.  

So while the OTP achieves perfect secrecy, it is not computationally practical. Modern cryptography shifts to **computational security**, where we settle for schemes secure against any *efficient* adversary.

---

## Reflection

This week solidified the bridge between probability and cryptography. I saw how simple rules (multiplication, addition, Bayes) underpin definitions of secrecy. The **One-Time Pad** represents perfection — but also highlights the gap between theory and practicality.  

Next week, I’ll push beyond perfect secrecy to **modern encryption primitives**: Format-Preserving Encryption (FPE), Fully Homomorphic Encryption (FHE), Searchable Encryption, and Tweakable Encryption.

---

### Study Resources

- **Katz & Lindell, _Introduction to Modern Cryptography_ (Ch. 2)**  
- **Jean-Philippe Aumasson, _Serious Cryptography_**  
- Class notes and worked examples on shift ciphers and Bayes’ Theorem  
