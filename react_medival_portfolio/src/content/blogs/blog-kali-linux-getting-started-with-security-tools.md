# Kali Linux: Getting Started with Security Tools

Kali Linux is the go-to operating system for security professionals. It comes pre-loaded with hundreds of tools for penetration testing, forensics, and reverse engineering. Let's get you started.

## What Is Kali Linux?

Kali is a Debian-based Linux distribution designed for digital forensics and penetration testing. It's maintained by Offensive Security and is free to download and use.

It's not a daily driver — it's a specialized toolkit. Think of it as a Swiss Army knife specifically for security work.

## Installation Options

You can run Kali several ways:
- **Virtual Machine** — VirtualBox or VMware (safest way to start)
- **Dual Boot** — install alongside your existing OS
- **Live USB** — boot from a USB drive without installing
- **WSL** — Windows Subsystem for Linux (limited but convenient)

For beginners, a virtual machine is the way to go. It's isolated, reversible, and won't affect your main system.

## Nmap — Network Scanner

Nmap discovers hosts and services on a network. It's the first tool most security professionals reach for.

```bash
nmap 192.168.1.1         # Scan a single host
nmap 192.168.1.0/24      # Scan an entire subnet
nmap -sV target.com      # Detect service versions
nmap -O target.com       # Detect operating system
```

Understanding your target's attack surface starts with knowing what's running and where.

## John the Ripper — Password Cracker

John is a password cracking tool that supports many hash formats. It's used to test password strength and recover lost credentials.

```bash
john --wordlist=passwords.txt hash.txt
john --show hash.txt      # Show cracked passwords
```

Always use it on systems you own or have authorization to test.

## Burp Suite — Web Application Testing

Burp Suite is the industry standard for web application security testing. It intercepts HTTP traffic, scans for vulnerabilities, and automates attacks.

The free Community Edition includes:
- **Proxy** — intercept and modify web traffic
- **Repeater** — manually craft and resend requests
- **Decoder** — encode and decode data

Start with the Proxy. Route your browser through Burp and explore how web applications handle your requests.

## When to Use Kali

Kali is for authorized security testing only. Use it to:
- Test your own applications
- Practice on intentionally vulnerable systems (DVWA, WebGoat)
- Perform authorized penetration tests
- Learn security concepts hands-on

Never use these tools against systems you don't own or have explicit permission to test.

> 💡 Tip: Don't install Kali as your main OS. Run it in a virtual machine alongside your regular operating system. You get all the tools without the risk of breaking your daily workflow.
