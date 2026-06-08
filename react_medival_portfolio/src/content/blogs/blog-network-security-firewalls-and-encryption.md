# Network Security: Firewalls and Encryption

Your network is the highway your data travels on. Without proper security, anyone can intercept, modify, or steal that data. Let's talk about firewalls and encryption — two pillars of network security.

## What Do Firewalls Do?

A firewall acts as a barrier between your network and the outside world. It monitors traffic, applies rules, and decides what gets through and what gets blocked.

Think of it as a bouncer at a club. It checks IDs (IP addresses and ports) and turns away anyone who doesn't belong.

## Types of Firewalls

- **Packet-filtering** — checks individual packets against rules (fast but basic)
- **Stateful inspection** — tracks active connections for smarter decisions
- **Application-level** — inspects traffic at the application layer (most thorough)
- **Next-gen** — combines multiple types with intrusion prevention

Your operating system has a built-in firewall. Make sure it's on. Routers often have firewalls too.

## Encryption Basics

Encryption transforms readable data into scrambled nonsense that only authorized parties can decode. It's the mathematical padlock of the digital world.

- **Symmetric** — same key encrypts and decrypts (AES, ChaCha20)
- **Asymmetric** — public key encrypts, private key decrypts (RSA, ECC)

Most systems use both: asymmetric for initial key exchange, symmetric for actual data transfer.

## SSL/TLS

SSL/TLS is the encryption protocol that secures HTTPS connections. When you see the padlock icon, TLS is working behind the scenes.

It encrypts everything between your browser and the server — passwords, credit card numbers, messages. Without it, anyone on the network can read your traffic.

## HTTPS Everywhere

Always use HTTPS. Modern browsers flag HTTP sites as "Not Secure." Most major sites support HTTPS, and browsers now enforce it by default.

If you manage a website, get a free SSL certificate from Let's Encrypt. There's no excuse for serving HTTP in 2024.

## VPNs

A VPN encrypts your entire internet connection and routes it through a remote server. It's especially important on public Wi-Fi, where traffic can be intercepted.

VPNs protect you from:
- Local network snooping
- ISP tracking
- Geographic content restrictions

They're not a complete anonymity solution, but they're a solid layer of protection.

> 💡 Tip: Use a VPN on public Wi-Fi even if the site has HTTPS. The VPN encrypts the connection from your device to the VPN server, while HTTPS encrypts from the VPN server to the website. Double protection.
