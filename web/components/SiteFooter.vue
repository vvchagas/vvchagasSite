<template>
  <footer class="border-t border-border/60 bg-footer/60">
    <div class="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-8 md:flex-row md:items-center md:justify-between md:px-6">
      <div>
        <p class="font-extrabold">VVCHAGAS</p>
        <p class="text-sm text-muted">Web • TI • Manutenção de notebooks</p>
      </div>

      <div class="flex flex-wrap gap-3 text-sm">
        <NuxtLink class="footer-link hover:-translate-y-0.5" to="/">Início</NuxtLink>
        <NuxtLink class="footer-link hover:-translate-y-0.5" to="/servicosView">Serviços</NuxtLink>
        <NuxtLink class="footer-link hover:-translate-y-0.5" to="/contatoView">Contato</NuxtLink>
        <NuxtLink class="footer-link hover:-translate-y-0.5" to="/messagesView">Mensagens</NuxtLink>
      </div>

      <div class="gap-6 flex flex-wrap items-center">
        <a
          href="https://wa.me/5514997760049"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 text-sm font-semibold transition-colors hover:text-green-600  hover:-translate-y-0.5"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" role="img" aria-hidden="true" class="size-4 shrink-0">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
          WhatsApp
        </a>

        <a href="https://mail.google.com/mail/u/0/#inbox?compose=CllgCJZXhjGdXcDqqFVrNpsqdnDjmqDsNHZLZBKLWqnWNGkCVZSfTPmBxgsJLDhNQTtmnCbFsFL" class="inline-flex items-center gap-2 text-sm font-semibold transition-colors hover:text-red-600  hover:-translate-y-0.5">
          <svg viewBox="0 0 24 24" fill="currentColor" role="img" aria-hidden="true" class="size-4 shrink-0">
            <path d="M22 4H2C.9 4 0 4.9 0 6v12c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-10 6.25L2 8V6l10 6.25L22 6v2z" />
          </svg>
          E-mail
        </a>

        <a href="https://github.com/vvchagas" target="_blank" rel="noopener noreferrer" aria-label="GitHub" class="transition hover:-translate-y-0.5 hover:text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" class="size-5" aria-hidden="true">
            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
            <path d="M9 18c-4.51 2-5-2-7-2" />
          </svg>
        </a>

        <a href="https://www.instagram.com/victorzx__7/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" class="transition hover:-translate-y-0.5 hover:text-fuchsia-600">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" class="size-5" aria-hidden="true">
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
          </svg>
        </a>

        <a href="https://www.linkedin.com/in/victor-vasques-chagas" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" class="transition hover:-translate-y-0.5  hover:text-blue-600">
          <svg viewBox="0 0 24 24" fill="currentColor" role="img" aria-hidden="true" class="size-5">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        </a>
      </div>
    </div>
  </footer>
</template>