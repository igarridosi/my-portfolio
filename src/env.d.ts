interface ImportMetaEnv {
  readonly VITE_GITHUB_TOKEN: string
  // Agrega aquí otras variables de entorno si las necesitas
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
