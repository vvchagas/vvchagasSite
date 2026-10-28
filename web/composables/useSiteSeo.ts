import { computed, toValue, type MaybeRefOrGetter } from 'vue'

interface SiteSeoOptions {
  title: MaybeRefOrGetter<string>
  description: MaybeRefOrGetter<string>
  image?: MaybeRefOrGetter<string>
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
  const title = computed(() => toValue(options.title))
  const description = computed(() => toValue(options.description))
  const canonical = computed(() => new URL(route.path, `${origin.replace(/\/$/, '')}/`).toString())
  const image = computed(() => new URL(options.image ? toValue(options.image) : '/yu-gi-oh_foto.webp', `${origin.replace(/\/$/, '')}/`).toString())
  const pageTitle = computed(() => `${title.value} | vvchagas`)

  useSeoMeta({
    title,
    description,
    robots: options.noIndex ? 'noindex, nofollow' : 'index, follow',
    ogTitle: pageTitle,
    ogDescription: description,
    ogImage: image,
    ogUrl: canonical,
    ogType: 'website',
    ogLocale: computed(() => locale.value === 'en' ? 'en_US' : 'pt_BR'),
    twitterCard: 'summary_large_image',
    twitterTitle: pageTitle,
    twitterDescription: description,
    twitterImage: image,
  })

  useHead({
    htmlAttrs: { lang: computed(() => locale.value === 'en' ? 'en' : 'pt-BR') },
    link: [{ rel: 'canonical', href: canonical }],
  })
}
