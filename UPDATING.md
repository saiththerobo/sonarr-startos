# Updating the upstream version

This package wraps the [linuxserver/prowlarr](https://hub.docker.com/r/linuxserver/prowlarr) image published by LinuxServer.io.

## Determining the upstream version

Check the latest stable tag on Docker Hub:

```sh
curl -s "https://hub.docker.com/v2/repositories/linuxserver/prowlarr/tags?page_size=20" \
  | python3 -c "import sys,json; [print(t['name']) for t in json.load(sys.stdin)['results'] if t['name'].count('.')==2 and 'nightly' not in t['name'] and 'develop' not in t['name'] and 'arm' not in t['name'] and 'amd64' not in t['name']]" \
  | head -3
```

The current pin lives in `startos/manifest/index.ts` at `images['prowlarr'].source.dockerTag`.

## Applying the bump

- Bump `dockerTag` in `startos/manifest/index.ts` to `lscr.io/linuxserver/prowlarr:<new version>`.
- Create a new version file in `startos/versions/` per the release instructions in `CLAUDE.md`.
