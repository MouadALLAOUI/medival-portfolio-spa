# Computer Networks 2: OSI Model Explained

The OSI model is a conceptual framework that breaks network communication into seven layers. Understanding it helps you troubleshoot problems, design systems, and speak the language of networking professionals.

## Why the OSI Model?

Network communication is incredibly complex. The OSI model divides it into manageable layers, each with a specific responsibility. Changes at one layer don't affect others.

Think of it like a postal system: you write a letter (application), put it in an envelope (transport), add an address (network), and hand it to the mail carrier (physical). Each layer handles its own job.

## The 7 Layers

### Layer 7 — Application

The layer you interact with directly. Web browsers, email clients, and apps live here. Protocols: HTTP, FTP, SMTP, DNS.

This is where user-facing communication happens.

### Layer 6 — Presentation

Handles data formatting, encryption, and compression. It translates between application format and network format.

SSL/TLS encryption happens here. So does data compression and character encoding (ASCII, Unicode).

### Layer 5 — Session

Manages sessions between applications. It establishes, maintains, and terminates connections.

When you log into a website, the session layer manages that authentication state throughout your visit.

### Layer 4 — Transport

Provides reliable (TCP) or unreliable (UDP) data delivery. Handles flow control, error correction, and data segmentation.

- **TCP** — reliable, ordered delivery (web, email, file transfer)
- **UDP** — fast, no guarantees (streaming, gaming, DNS)

### Layer 3 — Network

Handles routing and addressing. IP addresses operate here. Routers work at this layer, forwarding packets between networks.

This is where the magic of internet routing happens — finding the best path from your computer to a server on the other side of the world.

### Layer 2 — Data Link

Handles communication between devices on the same network. MAC addresses operate here. Switches work at this layer.

Ethernet and Wi-Fi protocols live here. It's responsible for framing data and detecting errors.

### Layer 1 — Physical

The actual hardware — cables, connectors, radio waves, electrical signals. This is the raw bit stream traveling through copper, fiber, or air.

When you plug in an Ethernet cable, you're working at Layer 1.

## Data Encapsulation

As data moves down the layers, each layer adds its own header (and sometimes trailer). This is called encapsulation:

```
Application data
  ↓ + TCP/UDP header
Transport segment
  ↓ + IP header
Network packet
  ↓ + MAC header
Data link frame
  ↓ + physical signals
Bits on the wire
```

The receiving device reverses the process, stripping headers at each layer.

## Real-World Example

When you visit a website:
1. **Application** — browser sends HTTP request
2. **Presentation** — TLS encrypts the request
3. **Session** — manages the secure session
4. **Transport** — TCP breaks data into segments
5. **Network** — IP adds source/destination addresses
6. **Data Link** — Ethernet frames the packet for your network
7. **Physical** — electrical signals travel through the cable

All of this happens in milliseconds.

> 💡 Tip: When troubleshooting, work from the bottom up. Check physical connections first (Layer 1), then network configuration (Layer 3), then application issues (Layer 7). Most problems are at the lower layers.
