/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GA_MEASUREMENT_ID?: string
  readonly VITE_FACEBOOK_PIXEL_ID?: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}