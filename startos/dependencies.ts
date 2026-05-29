import { sdk } from './sdk'

export const setDependencies = sdk.setupDependencies(async ({ effects }) => ({
  filebrowser: {
    kind: 'exists',
    versionRange: '>=2.62.2:0',
  },
}))
