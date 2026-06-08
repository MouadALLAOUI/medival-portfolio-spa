# Docker: Containerization for Beginners

"It works on my machine" is the classic developer excuse. Docker eliminates that problem by packaging your application with everything it needs to run. Let's break it down.

## What Are Containers?

A container is a lightweight, standalone package that includes everything your app needs: code, runtime, libraries, and dependencies. Containers run the same way everywhere — your laptop, a server, or the cloud.

Unlike virtual machines, containers share the host operating system's kernel, making them fast and efficient.

## Docker vs Virtual Machines

| | Containers | VMs |
|---|---|---|
| Size | Megabytes | Gigabytes |
| Startup | Seconds | Minutes |
| OS | Shared kernel | Full OS |
| Isolation | Process level | Hardware level |

Containers are lighter, faster, and more portable. For most development use cases, they're the better choice.

## The Dockerfile

A Dockerfile is a recipe for building a container image. It specifies the base image, copies your code, installs dependencies, and defines the startup command.

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

Each instruction creates a layer in the image. Docker caches these layers to speed up builds.

## Images and Containers

An **image** is the blueprint. A **container** is a running instance of that image. You build an image once, then run as many containers from it as you need.

Think of it like a class and objects in programming — the image is the class, containers are the instances.

## Docker Compose

When your app has multiple services (web server, database, cache), Docker Compose lets you define them all in one file:

```yaml
services:
  web:
    build: .
    ports:
      - "3000:3000"
  db:
    image: postgres:15
    environment:
      POSTGRES_PASSWORD: secret
```

One command (`docker compose up`) spins up everything together.

## Common Docker Commands

```bash
docker build -t myapp .       # Build an image
docker run -p 3000:3000 myapp # Run a container
docker ps                     # List running containers
docker stop <container>       # Stop a container
docker logs <container>       # View logs
```

> 💡 Tip: Use `.dockerignore` to exclude files like `node_modules` and `.git` from your image. It keeps builds fast and images small.
