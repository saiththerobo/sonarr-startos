import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '4.0.17:6',
  releaseNotes: {
    en_US: 'Add File Browser volume mount for shared downloads and media.',
    es_ES: 'Lanzamiento inicial de Sonarr en StartOS.',
    de_DE: 'Erstveroeffentlichung von Sonarr auf StartOS.',
    pl_PL: 'Pierwsze wydanie Sonarr na StartOS.',
    fr_FR: 'Premiere version de Sonarr sur StartOS.',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
