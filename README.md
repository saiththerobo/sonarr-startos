<p align="center">
  <img src="icon.svg" alt="Prowlarr Logo" width="21%">
</p>

# Prowlarr on StartOS

> **Upstream repo:** <https://github.com/Prowlarr/Prowlarr>

Prowlarr is an indexer manager and proxy for Sonarr, Radarr, Lidarr, Readarr, and other \*arr apps. It centralises indexer management so you configure your trackers once in Prowlarr and sync them automatically to all connected apps.

---

## Table of Contents

- [Image and Container Runtime](#image-and-container-runtime)
- [Volume and Data Layout](#volume-and-data-layout)
- [Installation and First-Run Flow](#installation-and-first-run-flow)
- [Configuration Management](#configuration-management)
- [Network Access and Interfaces](#network-access-and-interfaces)
- [Actions (StartOS UI)](#actions-startos-ui)
- [Backups and Restore](#backups-and-restore)
- [Health Checks](#health-checks)
- [Dependencies](#dependencies)
- [Limitations and Differences](#limitations-and-differences)
- [What Is Unchanged from Upstream](#what-is-unchanged-from-upstream)
- [Contributing](#contributing)
- [Quick Reference for AI Consumers](#quick-reference-for-ai-consumers)

---

## Image and Container Runtime

| Property      | Value                                        |
| ------------- | -------------------------------------------- |
| Image         | `lscr.io/linuxserver/prowlarr:2.3.5`         |
| Architectures | x86_64, aarch64                              |
| Entrypoint    | `/init` (s6-overlay)                         |

Runs as root inside the container (`PUID=0`, `PGID=0`).

---

## Volume and Data Layout

| Volume | Mount Point | Purpose                            |
| ------ | ----------- | ---------------------------------- |
| `main` | `/config`   | Database, logs, and configuration  |

---

## Installation and First-Run Flow

On first start Prowlarr initialises its SQLite database and configuration files under `/config`. No admin setup is required before visiting the web UI. Prowlarr will prompt you to set authentication in **Settings → General** after logging in for the first time.

---

## Configuration Management

All Prowlarr configuration is done through the web UI. No StartOS-side config is exposed. Settings persist in the `main` volume across restarts and upgrades.

---

## Network Access and Interfaces

| Interface | Port | Protocol | Purpose             |
| --------- | ---- | -------- | ------------------- |
| Web UI    | 9696 | HTTP     | Prowlarr web interface |

**Access methods:**

- LAN IP with unique port
- `<hostname>.local` with unique port
- Tor `.onion` address
- Custom domains (if configured)

---

## Actions (StartOS UI)

None.

---

## Backups and Restore

**Included in backup:**

- `main` volume (database, config, logs)

**Restore behavior:** Volume is fully restored before the service starts.

---

## Health Checks

| Check         | Method              | Messages                                                               |
| ------------- | ------------------- | ---------------------------------------------------------------------- |
| Web Interface | Port listening (9696) | Success: "The web interface is ready" / Error: "The web interface is not ready" |

---

## Dependencies

None.

---

## Limitations and Differences

1. **No HTTPS termination inside the container** — TLS is handled by the StartOS reverse proxy.
2. **Authentication is not pre-configured** — set it up in Settings → General after first launch.

---

## What Is Unchanged from Upstream

The service is identical to upstream. No patches are applied to the image.

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for build instructions and development workflow.

---

## Quick Reference for AI Consumers

```yaml
package_id: prowlarr
image: lscr.io/linuxserver/prowlarr:2.3.5
architectures: [x86_64, aarch64]
volumes:
  main: /config
ports:
  ui: 9696
dependencies: none
startos_managed_env_vars: [PUID, PGID, TZ]
actions: none
```
