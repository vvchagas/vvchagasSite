interface SiteSeoOptions {
  title: string
  description: string
  image?: string
  noIndex?: boolean
}

/** Shared page metadata. Canonicals use the configured production origin and route path only. */
export function useSiteSeo(options: SiteSeoOptions) {
  const route = useRoute()
  const requestUrl = useRequestURL()
  const config = useRuntimeConfig()
  const { locale } = useLocale()
  const configuredOrigin = String(config.public.siteUrl || '').trim()
  const origin = configuredOrigin || requestUrl.origin
  const canonical = new URL(route.path, `${origin.replace(/\/$/, '')}/`).toString()
  const image = new URL(options.image || '/yu-gi-oh_foto.webp', `${origin.replace(/\/$/, '')}/`).toString()
  const pageTitle = `${options.title} | vvchagas`

  useSeoMeta({
    title: options.title,
    description: options.description,
    robots: options.noIndex ? 'noindex, nofollow' : 'index, follow',
    ogTitle: pageTitle,
    ogDescription: options.description,
    ogImage: image,
    ogUrl: canonical,
    ogType: 'website',
    ogLocale: 'pt_BR',
    twitterCard: 'summary_large_image',
    twitterTitle: pageTitle,
    twitterDescription: options.description,
    twitterImage: image,
  })

  useHead({
    htmlAttrs: { lang: locale.value === 'en' ? 'en' : 'pt-BR' },
    link: [{ rel: 'canonical', href: canonical }],
  })
}
