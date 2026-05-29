<p align="center">
  <img src="icon.svg" alt="Sonarr Logo" width="21%">
</p>

# Sonarr on StartOS

> **Upstream repo:** <https://github.com/Sonarr/Sonarr>

Sonarr is a PVR for Usenet and BitTorrent users that monitors RSS feeds for new episodes of your favourite TV shows, downloads them, sorts and renames them, and integrates with your media server.

## Getting Started

Install Sonarr, then open the **Web UI** from the Interfaces tab. On first launch, set up authentication under **Settings → General**, then add your download client and indexers (or connect Prowlarr to sync indexers automatically).

---

## Table of Contents

- [Image and Container Runtime](#image-and-container-runtime)
- [Volume and Data Layout](#volume-and-data-layout)
- [Installation and First-Run Flow](#installation-and-first-run-flow)
- [Configuration Management](#configuration-management)
- [Network Access and Interfaces](#network-access-and-interfaces)
- [Backups and Restore](#backups-and-restore)
- [Health Checks](#health-checks)
- [Dependencies](#dependencies)
- [Limitations and Differences](#limitations-and-differences)
- [Contributing](#contributing)
- [Quick Reference for AI Consumers](#quick-reference-for-ai-consumers)

---

## Image and Container Runtime

| Property      | Value                                              |
| ------------- | -------------------------------------------------- |
| Image         | `lscr.io/linuxserver/sonarr:4.0.17.2952-ls312`    |
| Architectures | x86_64, aarch64                                    |
| Entrypoint    | `/app/sonarr/bin/Sonarr -nobrowser -data=/config`  |

---

## Volume and Data Layout

| Volume                    | Mount Point       | Purpose                                        |
| ------------------------- | ----------------- | ---------------------------------------------- |
| `main`                    | `/config`         | SQLite database, logs, and configuration files |
| `filebrowser` → `data`    | `/mnt/filebrowser`| Shared storage from File Browser (optional)    |

If File Browser is installed, its `data` volume is mounted at `/mnt/filebrowser`. This gives Sonarr access to qBittorrent downloads (e.g. `/mnt/filebrowser/qbittorrent-downloads`) and media folders (e.g. `/mnt/filebrowser/jellyfin/shows`). Configure these paths as root folders in **Settings → Media Management**.

---

## Installation and First-Run Flow

On first start Sonarr initialises its SQLite database and configuration files under `/config`. No setup is required before visiting the web UI. Configure authentication under **Settings → General** after first login.

---

## Configuration Management

All Sonarr configuration is done through the web UI. No StartOS-side config is exposed. Settings persist in the `main` volume across restarts and upgrades.

---

## Network Access and Interfaces

| Interface | Port | Protocol | Purpose             |
| --------- | ---- | -------- | ------------------- |
| Web UI    | 8989 | HTTP     | Sonarr web interface |

---

## Backups and Restore

**Included in backup:**

- `main` volume (database, config, logs)

**Restore behavior:** Volume is fully restored before the service starts.

---

## Health Checks

| Check         | Method                | Messages                                                               |
| ------------- | --------------------- | ---------------------------------------------------------------------- |
| Web Interface | Port listening (8989) | Success: "The web interface is ready" / Error: "The web interface is not ready" |

---

## Dependencies

| Dependency   | Required | Purpose                                                              |
| ------------ | -------- | -------------------------------------------------------------------- |
| File Browser | Optional | Shared storage for downloads and media folders                       |
| Prowlarr     | Optional | Indexer manager — syncs all trackers to Sonarr automatically        |
| qBittorrent  | Optional | Download client — add via Settings → Download Clients               |

To use Prowlarr, install it separately and connect it via **Settings → Apps** in Prowlarr. To use File Browser shared storage, install File Browser and Sonarr will automatically mount its volume.

---

## Limitations and Differences

1. **No HTTPS termination inside the container** — TLS is handled by the StartOS reverse proxy.
2. **Authentication is not pre-configured** — set it up in Settings → General after first launch.
3. **No download client pre-configured** — add qBittorrent, SABnzbd, or another client after install.

---

## What Is Unchanged from Upstream

The service runs the official linuxserver.io image without modification.

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for build instructions and development workflow.

---

## Quick Reference for AI Consumers

```yaml
package_id: sonarr
image: lscr.io/linuxserver/sonarr:4.0.17.2952-ls312
architectures: [x86_64, aarch64]
volumes:
  main: /config
  filebrowser(data): /mnt/filebrowser  # optional, mounted when filebrowser is installed
ports:
  ui: 8989
dependencies:
  filebrowser: optional  # kind: exists, >=2.62.2:0
actions: none
```
