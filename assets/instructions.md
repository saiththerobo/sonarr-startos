# Prowlarr

Prowlarr is an indexer manager and proxy. It sits between your indexers (torrent trackers, Usenet indexers) and your \*arr apps (Sonarr, Radarr, Lidarr, Readarr), so you configure each indexer once and sync it automatically to all your apps.

## Documentation

- [Prowlarr wiki](https://wiki.servarr.com/prowlarr) — official documentation covering indexer setup, app integration, and troubleshooting.

## Getting set up

Prowlarr starts immediately with no pre-configuration required.

1. Open Prowlarr's **Dashboard** tab and click **Web UI**.
2. On first visit Prowlarr will ask you to set up authentication — go to **Settings → General** and configure a username and password.
3. Add your indexers under **Indexers → Add Indexer**.
4. Connect your \*arr apps under **Settings → Apps** — enter each app's URL and API key.

Once connected, any indexer you add or update in Prowlarr is synced automatically to all linked apps.

## Connecting to other apps on StartOS

Services on the same StartOS node communicate over an internal network using the address `http://<package-id>.startos:<port>`. Use these addresses when connecting Prowlarr to other services — do **not** use `localhost` or the LAN address shown on the Dashboard.

### Download clients

| App | Host | Port |
| --- | ---- | ---- |
| qBittorrent | `qbittorrent.startos` | `8080` |

To add qBittorrent: **Settings → Download Clients → Add → qBittorrent**, then enter the host and port above. The username is `admin` and the password is whatever was set via qBittorrent's **Reset Admin Password** action.

### \*arr apps (Sonarr, Radarr, Lidarr, Readarr)

| App | Host | Port |
| --- | ---- | ---- |
| Sonarr | `sonarr.startos` | `8989` |
| Radarr | `radarr.startos` | `7878` |
| Lidarr | `lidarr.startos` | `8686` |
| Readarr | `readarr.startos` | `8787` |

To link an app: **Settings → Apps → Add**, select the app, enter the host and port above, then paste the API key from that app's **Settings → General** page.

## Limitations

- Authentication is not pre-configured — set it up before exposing Prowlarr to untrusted networks.
- Prowlarr does not download content itself; it only manages indexers and forwards search requests.
