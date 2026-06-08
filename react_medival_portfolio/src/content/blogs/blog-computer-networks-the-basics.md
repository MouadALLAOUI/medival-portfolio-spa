# Computer Networks: The Basics (IP, DNS, HTTP)

The internet is just computers talking to each other. Understanding how that conversation works is fundamental to every tech career. Let's start with the basics.

## What Is a Network?

A network is two or more computers connected to share resources. A **LAN** (Local Area Network) connects devices in one location — your home, office, or school. A **WAN** (Wide Area Network) spans large distances — the internet is the biggest WAN.

Every time you visit a website, multiple networks work together to deliver that page to your screen.

## IP Addresses

Every device on a network has a unique identifier called an **IP address**. It's like a postal address for your computer.

- **IPv4** — `192.168.1.1` (32-bit, about 4 billion addresses)
- **IPv6** — `2001:0db8:85a3::8a2e:0370:7334` (128-bit, practically unlimited)

Your router assigns local IP addresses via DHCP. Your public IP is assigned by your ISP.

## DNS — The Internet's Phonebook

DNS (Domain Name System) translates human-readable domain names into IP addresses. When you type `google.com`, DNS resolves it to `142.250.80.46` (or whatever Google's current IP is).

Without DNS, you'd have to memorize IP addresses for every website. DNS makes the internet usable.

DNS resolution process:
1. Browser checks local cache
2. Operating system checks its cache
3. Query goes to your ISP's DNS server
4. If not found, root servers → TLD servers → authoritative server

## HTTP and HTTPS

HTTP (HyperText Transfer Protocol) is how browsers request and receive web pages. It's the foundation of web communication.

- **HTTP** — unencrypted, anyone can read the traffic
- **HTTPS** — encrypted with TLS, secure communication

HTTPS is non-negotiable for any modern website. It encrypts the entire connection between your browser and the server.

## Ports

Ports are like doors to a computer. Each service listens on a specific port:

- **80** — HTTP
- **443** — HTTPS
- **22** — SSH
- **3306** — MySQL
- **5432** — PostgreSQL

When you connect to a website, you're connecting to port 443 (HTTPS) on that server. Firewalls control which ports are open.

## LAN vs WAN

| | LAN | WAN |
|---|---|---|
| Range | Building/campus | Cities/countries |
| Speed | Fast (Gbps) | Variable |
| Ownership | You | ISP/carrier |
| Example | Home Wi-Fi | The internet |

Understanding this distinction helps you troubleshoot network issues and design systems.

> 💡 Tip: Use `ipconfig` (Windows) or `ifconfig`/`ip a` (Linux) to see your IP address. Use `nslookup` or `dig` to query DNS records. These commands are your first step in diagnosing network problems.
