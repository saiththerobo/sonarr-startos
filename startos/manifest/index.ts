import { setupManifest } from '@start9labs/start-sdk'
import { long, short } from './i18n'

export const manifest = setupManifest({
  id: 'sonarr',
  title: 'Sonarr',
  license: 'GPL-3.0',
  packageRepo: 'https://github.com/saiththerobo/sonarr-startos',
  upstreamRepo: 'https://github.com/Sonarr/Sonarr',
  marketingUrl: 'https://sonarr.tv/',
  donationUrl: null,
  docsUrls: ['https://wiki.servarr.com/sonarr'],
  description: { short, long },
  volumes: ['main'],
  images: {
    sonarr: {
      source: { dockerTag: 'lscr.io/linuxserver/sonarr:4.0.17.2952-ls312' },
      arch: ['x86_64', 'aarch64'],
    },
  },
  alerts: {
    install: null,
    update: null,
    uninstall: null,
    restore: null,
    start: null,
    stop: null,
  },
  dependencies: {
    filebrowser: {
      description: {
        en_US: 'Used to save downloads and serve media from File Browser shared storage',
        es_ES: 'Usado para guardar descargas y servir contenido desde File Browser',
        de_DE: 'Wird verwendet, um Downloads zu speichern und Medien aus File Browser bereitzustellen',
        pl_PL: 'Uzywany do zapisywania pobran i serwowania mediow z File Browser',
        fr_FR: 'Utilise pour enregistrer les telechargements et servir les medias depuis File Browser',
      },
      optional: true,
      s9pk: null,
    },
  },
})
