import { i18n } from './i18n'
import { sdk } from './sdk'
import { uiPort } from './utils'

export const main = sdk.setupMain(async ({ effects }) => {
  console.info(i18n('Starting Sonarr'))

  const mounts = sdk.Mounts.of().mountVolume({
    volumeId: 'main',
    subpath: null,
    mountpoint: '/config',
    readonly: false,
  })

  const sonarrSub = await sdk.SubContainer.of(
    effects,
    { imageId: 'sonarr' },
    mounts,
    'sonarr-sub',
  )

  return sdk.Daemons.of(effects)
    .addOneshot('setup-tmpdir', {
      subcontainer: sonarrSub,
      exec: {
        command: ['mkdir', '-p', '/run/sonarr-temp'],
        user: 'root',
      },
      requires: [],
    })
    .addDaemon('primary', {
      subcontainer: sonarrSub,
      exec: {
        command: ['/app/sonarr/bin/Sonarr', '-nobrowser', '-data=/config'],
        env: {
          HOME: '/config',
          ASPNETCORE_FORWARDEDHEADERS_ENABLED: 'true',
        },
      },
      ready: {
        display: i18n('Web Interface'),
        fn: () =>
          sdk.healthCheck.checkPortListening(effects, uiPort, {
            successMessage: i18n('The web interface is ready'),
            errorMessage: i18n('The web interface is not ready'),
          }),
        gracePeriod: 30_000,
      },
      requires: ['setup-tmpdir'],
    })
})
