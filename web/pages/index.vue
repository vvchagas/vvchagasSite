<template>
  <div class="min-h-screen bg-background text-foreground">
    <NuxtRouteAnnouncer />

    <a
      href="#conteudo"
      class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-blue-600 focus:px-3 focus:py-2 focus:text-white"
    >
      Pular para o conteúdo
    </a>

    <SiteHeader />

    <main id="conteudo" class="mx-auto w-full max-w-6xl px-4 md:px-6">
      <section id="inicio" class="relative overflow-hidden pt-10 md:pt-14">
        <div class="absolute inset-0 -z-10">
          <div
            class="absolute left-1/2 top-[-220px] h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-blue-500/30 via-indigo-500/20 to-fuchsia-500/20 blur-3xl"
          />
          <div
            class="absolute -left-24 top-28 h-64 w-64 rounded-full bg-blue-500/15 blur-2xl"
          />
          <div
            class="absolute -right-24 top-52 h-72 w-72 rounded-full bg-indigo-500/15 blur-2xl"
          />
        </div>

        <div class="grid items-center gap-10 md:grid-cols-2">
          <div>
            <p
              class="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/60 px-3 py-1 text-xs font-semibold text-foreground/90 backdrop-blur"
            >
<span
                aria-hidden="true"
                class="inline-flex size-2 rounded-full bg-blue-600 shadow-[0_0_0_4px_rgba(12,129,232,.15)]"
              />
               Web Desenvolvedor, Suporte de TI e Manutenção de Notebooks 
            </p>

            <h1 class="mt-5 text-3xl font-black tracking-tight sm:text-4xl">
              Victor               <span
                class="text-blue-600"
                >Chagas</span
              >
            </h1>

            <p class="mt-4 max-w-prose text-base text-muted sm:text-lg">
              Desenvolvimento web, suporte de TI e
              manutenção de notebooks. Do diagnóstico ao resultado: com clareza
              e sem enrolação.
            </p>

            <div class="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <NuxtLink
                id="nuxtlink"
                to="/servicosView"
                class="inline-flex items-center justify-center rounded-full bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Ver serviços
              </NuxtLink>
              <NuxtLink
              id="nuxtlink"
                to="/portfolioView"
                class="inline-flex items-center justify-center rounded-full border border-border/70 bg-card/50 px-5 py-3 text-sm font-bold text-foreground/90 shadow-sm transition hover:border-blue-500/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Confira portfólio
              </NuxtLink>
            </div>

            <dl class="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div
                class="rounded-2xl border border-border/60 bg-card/60 p-4 backdrop-blur"
              >
                <dt class="text-sm font-semibold text-foreground/80">
                  Entrega
                </dt>
                <dd class="mt-1 text-2xl font-black">Rápida</dd>
                <dd class="mt-1 text-xs text-muted">
                  Organização e comunicação
                </dd>
              </div>
              <div
                class="rounded-2xl border border-border/60 bg-card/60 p-4 backdrop-blur"
              >
                <dt class="text-sm font-semibold text-foreground/80">Foco</dt>
                <dd class="mt-1 text-2xl font-black">Resultados</dd>
                <dd class="mt-1 text-xs text-muted">
                  Sem complicar o que é simples
                </dd>
              </div>
              <div
                class="rounded-2xl border border-border/60 bg-card/60 p-4 backdrop-blur"
              >
                <dt class="text-sm font-semibold text-foreground/80">
                  Suporte
                </dt>
                <dd class="mt-1 text-2xl font-black">Prático</dd>
                <dd class="mt-1 text-xs text-muted">
                  Para você seguir adiante
                </dd>
              </div>
            </dl>
          </div>

          <div class="relative">
            <div
              class="absolute inset-0 -z-10 rounded-[2rem] bg-gradient-to-b from-blue-500/15 to-transparent blur-2xl"
            />
            <div
              class="rounded-[2rem] border border-border/70 bg-card/70 p-5 shadow-sm backdrop-blur"
            >
              <div class="flex items-center justify-between gap-4">
                <div>
                  <p class="text-xs font-semibold text-muted">
                    Status do atendimento
                  </p>
                  <p class="text-lg font-extrabold">Pronto para ajudar</p>
                </div>
                <span
                  class="inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-xs font-semibold text-foreground/90"
                >
                  <span
                    aria-hidden="true"
                    class="size-2 rounded-full bg-green-500"
                  />
                  Online
                </span>
              </div>

              <div class="mt-5 grid gap-3">
                <div class="rounded-2xl bg-muted/60 p-4">
                  <h3 class="font-bold">1) Diagnóstico</h3>
                  <p class="mt-1 text-sm text-muted">
                    Entendemos o problem e definimos o caminho mais eficiente.
                  </p>
                </div>
                <div class="rounded-2xl bg-muted/60 p-4">
                  <h3 class="font-bold">2) Execução</h3>
                  <p class="mt-1 text-sm text-muted">
                    Trabalho direto na solução: códigos, ajustes e manutenção.
                  </p>
                </div>
                <div class="rounded-2xl bg-muted/60 p-4">
                  <h3 class="font-bold">3) Entrega</h3>
                  <p class="mt-1 text-sm text-muted">
                    Você recebe clareza do que foi feito e como manter.
                  </p>
                </div>
              </div>

              <div class="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <NuxtLink class="card-link" to="/contatoView">
                  <span class="card-icon material-symbols-outlined text-blue-500" aria-hidden="true">chat</span>
                  <span class="card-title">Atendimento</span>
                  <span class="card-desc"
                    >Vamos alinhar em poucos minutos.</span
                  >
                </NuxtLink>
                <NuxtLink class="card-link" to="/servicosView">
                  <span class="card-icon material-symbols-outlined text-purple-500" aria-hidden="true">settings</span>
                  <span class="card-title">Soluções</span>
                  <span class="card-desc">Web e suporte de TI completo.</span>
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="sobre" class="mt-14 md:mt-18">
        <div class="flex items-end justify-between gap-4">
          <div>
            <h2 class="text-2xl font-black tracking-tight md:text-3xl">
              Sobre
            </h2>
            <p class="mt-2 text-muted">
              Uma combinação de web e suporte técnico para transformar
              dificuldade em solução.
            </p>
          </div>
          <div
            class="hidden sm:block rounded-2xl border border-border/60 bg-card/60 px-4 py-3 text-sm text-muted"
          >
            <p class="font-semibold text-foreground/90">Trabalho com:</p>
            <p class="mt-1">Sites, manutenções e ajustes para o dia a dia.</p>
          </div>
        </div>

        <div class="mt-7 grid gap-4 md:grid-cols-3">
          <article
            class="rounded-3xl border border-border/60 bg-card/60 p-6 shadow-sm backdrop-blur"
          >
            <h3 class="text-lg font-extrabold">Web moderna</h3>
            <p class="mt-3 text-sm text-muted">
              Layouts responsivos, semântica, acessibilidade e performance.
            </p>
            <ul class="mt-4 space-y-2 text-sm text-muted">
              <li class="flex gap-2">
                <span aria-hidden="true" class="material-symbols-outlined text-base text-emerald-500">task_alt</span> Landing pages e portfólios
              </li>
              <li class="flex gap-2">
                <span aria-hidden="true" class="material-symbols-outlined text-base text-emerald-500">task_alt</span> UI com foco em conversão
              </li>
              <li class="flex gap-2">
                <span aria-hidden="true" class="material-symbols-outlined text-base text-emerald-500">task_alt</span> Ajustes e melhorias contínuas
              </li>
            </ul>
          </article>

          <article
            class="rounded-3xl border border-border/60 bg-card/60 p-6 shadow-sm backdrop-blur"
          >
            <h3 class="text-lg font-extrabold">Assistência de TI</h3>
            <p class="mt-3 text-sm text-muted">
              Diagnóstico prático para você voltar a trabalhar: configurações,
              redes e rotinas.
            </p>
            <ul class="mt-4 space-y-2 text-sm text-muted">
              <li class="flex gap-2">
                <span aria-hidden="true" class="material-symbols-outlined text-base text-violet-500">psychology</span> Orientação objetiva
              </li>
              <li class="flex gap-2">
                <span aria-hidden="true" class="material-symbols-outlined text-base text-teal-500">shield</span> Boas práticas e segurança
              </li>
              <li class="flex gap-2">
                <span aria-hidden="true" class="material-symbols-outlined text-base text-amber-500">build</span> Correções e otimização
              </li>
            </ul>
          </article>

          <article  
            class="rounded-3xl border border-border/60 bg-card/60 p-6 shadow-sm backdrop-blur"
          >
            <h3 class="text-lg font-extrabold">Manutenção de notebooks</h3>
            <p class="mt-3 text-sm text-muted">
              Limpeza, ajustes de desempenho, atualização e recuperação do
              funcionamento.
            </p>
            <ul class="mt-4 space-y-2 text-sm text-muted">
              <li class="flex gap-2">
                <span aria-hidden="true" class="material-symbols-outlined text-base text-rose-500">thermostat</span> Controle térmico
              </li>
              <li class="flex gap-2">
                <span aria-hidden="true" class="material-symbols-outlined text-base text-sky-500">save</span> Otimização de armazenamento
              </li>
              <li class="flex gap-2">
                <span aria-hidden="true" class="material-symbols-outlined text-base text-amber-500">bolt</span> Performance no uso real
              </li>
            </ul>
          </article>
        </div>
      </section>

      <section id="servicos" class="mt-14 md:mt-18">
        <div
          class="flex flex-col gap-3 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <h2 class="text-2xl font-black tracking-tight md:text-3xl">
              Serviços
            </h2>
            <p class="mt-2 text-muted">
              Escolha o que você precisa agora — a gente monta o plano de ação.
            </p>
          </div>
          
        </div>

        <div class="mt-7 grid gap-4 md:grid-cols-2">
          <article
            class="rounded-3xl border border-border/60 bg-card/60 p-6 shadow-sm backdrop-blur"
          >
            <div class="flex items-start justify-between gap-4">
              <div>
                <h3 class="text-lg font-extrabold">Desenvolvimento de sites</h3>
                <p class="mt-2 text-sm text-muted">
                  Landing pages, portfólios e páginas institucionais.
                </p>
              </div>
              <span class="badge border border-border/60 ">WEB</span>
            </div>
            <ul class="mt-4 space-y-2 text-sm text-muted">
              <li class="flex gap-2">
                <span aria-hidden="true" class="material-symbols-outlined text-base text-amber-500">bolt</span> Responsivo e semântico
              </li>
              <li class="flex gap-2">
                <span aria-hidden="true" class="material-symbols-outlined text-base text-fuchsia-500">palette</span> Visual moderno (claro/escuro)
              </li>
              <li class="flex gap-2">
                <span aria-hidden="true" class="material-symbols-outlined text-base text-cyan-500">accessibility_new</span> Acessibilidade e foco
              </li>
            </ul>
          </article>

          <article
            class="rounded-3xl border border-border/60 bg-card/60 p-6 shadow-sm backdrop-blur"
          >
            <div class="flex items-start justify-between gap-4">
              <div>
                <h3 class="text-lg font-extrabold">Ajustes e melhorias</h3>
                <p class="mt-2 text-sm text-muted">
                  Correções, performance e evolução do seu site.
                </p>
              </div>
              <span class="badge border border-border/60">UI/UX</span>
            </div>
            <ul class="mt-4 space-y-2 text-sm text-muted">
              <li class="flex gap-2">
                <span aria-hidden="true" class="material-symbols-outlined text-base text-indigo-500">widgets</span> Componentes e layouts
              </li>
              <li class="flex gap-2">
                <span aria-hidden="true" class="material-symbols-outlined text-base text-emerald-500">trending_up</span> Melhorias de navegação
              </li>
              <li class="flex gap-2">
                <span aria-hidden="true" class="material-symbols-outlined text-base text-blue-500">search</span> Revisão de conteúdo e CTA
              </li>
            </ul>
          </article>

          <article
            class="rounded-3xl border border-border/60 bg-card/60 p-6 shadow-sm backdrop-blur"
          >
            <div class="flex items-start justify-between gap-4">
              <div>
                <h3 class="text-lg font-extrabold">Assistência de TI</h3>
                <p class="mt-2 text-sm text-muted">
                  Configurações, suporte e orientação objetiva.
                </p>
              </div>
              <span class="badge border border-border/60">TI</span>
            </div>
            <ul class="mt-4 space-y-2 text-sm text-muted">
              <li class="flex gap-2">
                <span aria-hidden="true" class="material-symbols-outlined text-base text-orange-500">construction</span> Setup e rotinas
              </li>
              <li class="flex gap-2">
                <span aria-hidden="true" class="material-symbols-outlined text-base text-cyan-500">wifi</span> Conectividade e rede
              </li>
              <li class="flex gap-2">
                <span aria-hidden="true" class="material-symbols-outlined text-base text-amber-500">build</span> Correções práticas
              </li>
            </ul>
          </article>

          <article
            class="rounded-3xl border border-border/60 bg-card/60 p-6 shadow-sm backdrop-blur"
          >
            <div class="flex items-start justify-between gap-4">
              <div>
                <h3 class="text-lg font-extrabold">Manutenção de notebooks</h3>
                <p class="mt-2 text-sm text-muted">
                  Diagnóstico, limpeza, otimização e reparos.
                </p>
              </div>
              <span class="badge border border-border/60">NOTEBOOK</span>
            </div>
            <ul class="mt-4 space-y-2 text-sm text-muted">
              <li class="flex gap-2">
                <span aria-hidden="true" class="material-symbols-outlined text-base text-teal-500">cleaning_services</span> Limpeza e ajustes
              </li>
              <li class="flex gap-2">
                <span aria-hidden="true" class="material-symbols-outlined text-base text-purple-500">memory</span> Upgrade e performance
              </li>
              <li class="flex gap-2">
                <span aria-hidden="true" class="material-symbols-outlined text-base text-emerald-500">battery_charging_full</span> Energia e uso prolongado
              </li>
            </ul>
          </article>
        </div>

        <div
          class="mt-6 text-foreground border border-slate-200 rounded-3xl border border-blue-300/50 bg-blue-500/10 p-5 text-center shadow-sm dark:border-blue-500/30 dark:bg-blue-500/15"
        >
          <div
            class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between "
          >
            <div>
              <h3 class="text-lg font-extrabold text-start">Quer um orçamento?</h3>
              <p class="mt-1 text-sm">
                Envie uma mensagem com o que você precisa e eu retorno com um
                caminho claro.
              </p>
            </div>
            <NuxtLink
              id="nuxtlink"
              to="/contatoView"
              class="inline-flex items-center justify-center rounded-full bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Falar agora
            </NuxtLink>
          </div>
        </div>
      </section>

      <section id="portfolio" class="mt-14 md:mt-18">
        <div class="flex items-end justify-between gap-4">
          <div>
            <h2 class="text-2xl font-black tracking-tight md:text-3xl">
              Meus Portfólios
            </h2>
            <p class="mt-2 text-muted">
              Exemplos de projetos concluidos, e focados em seu objetivo!
            </p>
          </div>
          <NuxtLink to="/aboutView" class="border border/60 rounded-full px-2 py-1 hover:-translate-y-[5px] duration-400">Clique para ver mais projetos</NuxtLink> 
        </div>

        <div class="mt-7 flex justify-beetween gap-4 md:grid-cols-3">
          <article
            class="group relative overflow-hidden rounded-3xl border border-border/60 bg-card/60 p-5 shadow-sm backdrop-blur"
          >
            <div
              class="absolute inset-0  from-blue-500/20 via-indigo-500/10 to-fuchsia-500/20 opacity-0 transition group-hover:opacity-100"
            />
            <div class="relative">
              <div class="flex items-start justify-between gap-4">
                <div>
                  <h3 class="text-lg font-extrabold">YU-GI-OH! API </h3>
                  <p class="mt-2 text-sm text-muted">
                    Projeto com API de cartas do jogo YU-GI-OH!
                  </p>
                </div>
                <span class="badge border border-border/60">SITE</span>
              </div>
              <div
                class="mt-4 aspect-[4/3] rounded-2xl bg-muted/60 ring-1 ring-border/60"
              >
                <div class="flex h-full items-center justify-center">
                  <img src="/yu-gi-oh_foto.webp" alt="YU-GI-OH! API">
                </div>
              </div>
              <ul class="mt-4 space-y-2 text-sm text-muted">
                <li class="flex gap-2">
                  <span aria-hidden="true" class="material-symbols-outlined text-base text-emerald-500">check</span> Responsivo
                </li>
                <li class="flex gap-2">
                  <span aria-hidden="true" class="material-symbols-outlined text-base text-emerald-500">check</span> Semântica
                </li>
                <li class="flex gap-2">
                  <span aria-hidden="true" class="material-symbols-outlined text-base text-emerald-500">check</span> Estrutura clara 
                </li>
              </ul>
            </div>
          </article>

          <article
            class="group relative overflow-hidden rounded-3xl border border-border/60 bg-card/60 p-5 shadow-sm backdrop-blur"
          >
            <div
              class="absolute inset-0 from-indigo-500/20 via-fuchsia-500/10 to-blue-500/20 opacity-0 transition group-hover:opacity-100"
            />
            <div class="relative">
              <div class="flex items-start justify-between gap-4">
                <div>
                  <h3 class="text-lg font-extrabold">Loja do Seu Zé</h3>
                  <p class="mt-2 text-sm text-muted">ERP com cobrança</p>
                </div>
                <span class="badge border border-border/60">SITE</span>
              </div>
              <div
                class="mt-4 aspect-[4/3] rounded-2xl bg-muted/60 ring-1 ring-border/60"
              >
                <div class="flex h-full items-center justify-center">
                  <img src="/loja-do-seu-ze.webp" alt="Loja do Seu Zé">
                </div>
              </div>
              <ul class="mt-4 space-y-2 text-sm text-muted">
                <li class="flex gap-2">
                  <span aria-hidden="true" class="material-symbols-outlined text-base text-emerald-500">check</span> Acessibilidade
                </li>
                <li class="flex gap-2">
                  <span aria-hidden="true" class="material-symbols-outlined text-base text-emerald-500">check</span> Responsividade
                </li>
                <li class="flex gap-2">
                  <span aria-hidden="true" class="material-symbols-outlined text-base text-emerald-500">check</span> Performance
                </li>
              </ul>
            </div>
          </article>
        </div>
      </section>

      <section id="contato" class="mt-14 pb-12 md:mt-18">
        <div
          class="rounded-[2.5rem] border border-border/70 from-blue-500/15 via-indigo-500/10 to-fuchsia-500/15 p-6 shadow-sm backdrop-blur md:p-10"
        >
          <div class="grid gap-8 md:grid-cols-2 md:items-start">
            <div>
              <h2 class="text-2xl font-black tracking-tight md:text-3xl">
                Contato
              </h2>
              <p class="mt-3 text-muted">
                Me diga o que você precisa e eu retorno com um caminho claro.
                Sem pensamento de vender, use sua criatividade e me conte e
                vamos conversar juntos!
              </p>

              <ul class="mt-6 space-y-3 text-sm text-muted">
                <li class="flex items-start gap-3">
                  <span
                    aria-hidden="true"
                    class="material-symbols-outlined mt-0.5 flex size-9 items-center justify-center rounded-xl bg-muted/60 text-lg text-rose-500"
                    >location_on</span
                  >
                  <div>
                    <p class="font-semibold text-foreground/90">Atendimento</p>
                    <p>Online e/ou presencial (conforme disponibilidade).</p>
                  </div>
                </li>
                <li class="flex items-start gap-3">
                  <span
                    aria-hidden="true"
                    class="material-symbols-outlined mt-0.5 flex size-9 items-center justify-center rounded-xl bg-muted/60 text-lg text-amber-500"
                    >bolt</span
                  >
                  <div>
                    <p class="font-semibold text-foreground/90">Objetivo</p>
                    <p>Resolver e deixar você andando sem travar.</p>
                  </div>
                </li>
              </ul>
            </div>

            <form
              class=" bg-background  rounded-3xl border border-border/60 bg-card/70 p-6 shadow-sm backdrop-blur md:p-8"
              @submit.prevent="submit"
            >
              <div class="flex items-center justify-between gap-4">
                <h3 class="text-lg font-extrabold">Enviar mensagem</h3>
                <span class="text-xs font-semibold text-muted"
                  >Resposta rápida</span
                >
              </div>

              <div class="mt-5 grid gap-4">
                <label class="block">
                  <span class="text-sm font-semibold">Seu nome</span>
                  <input
                    v-model="form.name"
                    type="text"
                    class="mt-2 w-full rounded-2xl border border-border/70 bg-background/50 px-4 py-3 text-sm outline-none transition focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/20"
                    placeholder="Ex: Maria"
                    required
                  > 
                </label>

                <label class="block">
                  <span class="text-sm font-semibold">Seu número ou e-mail</span>
                  <input
                    v-model="form.contact"
                    type="text"
                    class="mt-2 w-full rounded-2xl border border-border/70 bg-background/50 px-4 py-3 text-sm outline-none transition focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/20"
                    placeholder="Ex: (11) 99999-9999 ou maria@email.com"
                    required
                  >
                </label>

                <label class="block">
                  <span class="text-sm font-semibold">Assunto</span>
                  <select
                    v-model="form.topic"
                    class="mt-2 w-full rounded-2xl border border-border/70 bg-background/50 px-4 py-3 text-sm outline-none transition focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/20"
                    required
                  >
                    <option class="bg-background text-foreground" value="web">Web</option>
                    <option class="bg-background text-foreground" value="ti">TI</option>
                    <option class="bg-background text-foreground" value="assistencia-tecnica">Assistência técnica</option>
                  </select>
                </label>

                <label class="block">
                  <span class="text-sm font-semibold">Por onde você me encontrou?</span>
                  <select
                    v-model="form.source"
                    class="mt-2 w-full rounded-2xl border border-border/70 bg-background/50 px-4 py-3 text-sm outline-none transition focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/20"
                    required
                  >
                    <option class="bg-background text-foreground" value="google">Google / Web</option>
                    <option class="bg-background text-foreground" value="linkedin">Linkedin</option>
                    <option class="bg-background text-foreground" value="indicacao">Indicação</option>
                    <option class="bg-background text-foreground" value="github">Github</option>
                  </select>
                </label>

                <label class="block">
                  <span class="text-sm font-semibold">Mensagem</span>
                  <textarea
                    v-model="form.message"
                    rows="5"
                    class="mt-2 w-full resize-none rounded-2xl border border-border/70 bg-background/50 px-4 py-3 text-sm outline-none transition focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/20"
                    placeholder="Conte me, qual é sua idéia de um site, qual é o problema que você está passando ou problema com seu notebook."
                    required
                  />
                </label>

                <button
                  type="submit"
                  class="inline-flex w-full items-center justify-center rounded-2xl bg-blue-600 px-4 py-3 text-sm font-extrabold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Enviar
                </button>

                <p
                  v-if="toast"
                  class="rounded-2xl border border-border/70 bg-card/60 px-4 py-3 text-sm text-muted"
                  role="status"
                >
                  {{ toast }}
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>

    <SiteFooter />
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useHead } from "nuxt/app";
import type { MessageTopic } from "~/shared/messages";


import SiteHeader from "../components/SiteHeader.vue";
import SiteFooter from "../components/SiteFooter.vue";
useHead({
  title: "vvchagas - Início",
  link: [
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,300,0,0",
    },
  ],
});


const toast = ref<string | null>(null);


const form = ref({
  name: "",
  contact: "",
  topic: "web" as MessageTopic,
  source: "google",
  message: "",
});


async function submit() {
  await $fetch("/api/messages", {
    method: "POST",
    body: form.value,
  });

  toast.value =
    "Mensagem enviada! Só esperar minha resposta por e-mail ou WhatsApp.";
  form.value = {
    name: "",
    contact: "",
    topic: "web",
    source: "google",
    message: "",
  };
  window.setTimeout(() => (toast.value = null), 3500);
}
</script>

<style scoped>
:global(html) {
  /* Defaults: Tailwind is still used; variables enable non-Tailwind usage and semantic names */
  --bg: 255 255 255;
  --fg: 15 23 42;
  --muted: 71 85 105;
  --card: 255 255 255;
  --border: 226 232 240;
}
:global(html.dark) {
  --bg: 12 12 12;
  --fg: 226 232 240;
  --muted: 148 163 184;
  --card: 10 16 34;
  --border: 30 41 59;
}

/* Semantic colors used by classes above */
.bg-background {
  background-color: rgb(var(--bg));
}
.text-foreground {
  color: rgb(var(--fg));
}
.text-muted {
  color: rgb(var(--muted));
}
.bg-card {
  background-color: rgb(var(--card));
}
.border-border {
  border-color: rgb(var(--border));
}

/* Header/footers translucidos */
.bg-header,
.bg-footer {
  background: rgba(var(--bg), 0.75);
}

.bg-muted {
  background-color: rgba(var(--muted), 0.12);
}

/* Google Fonts - Material Symbols */
.material-symbols-outlined {
  font-family: "Material Symbols Outlined";
  font-weight: normal;
  font-style: normal;
  font-size: 20px;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  word-wrap: normal;
  direction: ltr;
  -webkit-font-smoothing: antialiased;
  vertical-align: middle;
}

/* Nav links */
.nav-link {
  position: relative;
  font-weight: 600;
  font-size: 0.9rem;
  color: rgba(var(--fg), 0.75);
  transition: color 0.2s ease;
}
.nav-link::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -4px;
  height: 2px;
  width: 0%;
  border-radius: 999px;
  background: linear-gradient(90deg, #3b82f6, #a855f7);
  transition: width 0.25s ease;
}
.nav-link:hover {
  color: rgb(var(--fg));
}
.nav-link:hover::after {
  width: 100%;
}

.footer-link {
  font-weight: 600;
  color: rgba(var(--fg), 0.75);
  transition: color 0.2s ease;
}
.footer-link:hover {
  color: #3b82f6;
}

/* Badges */
.badge {
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  padding: 0.25rem 0.7rem;
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.04em;
}
/* Card links (Atendimento / Soluções) */
.card-link {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  border-radius: 1rem;
  padding: 1rem;
  border: 1px solid rgba(var(--border), 1);
  background: rgba(var(--card), 0.7);
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
}
.card-link:hover {
  transform: translateY(-4px);
  border-color: rgba(59, 130, 246, 0.6);
  box-shadow: 0 10px 30px rgba(59, 130, 246, 0.2);
}
.card-icon {
  font-size: 22px;
}
.card-title {
  font-weight: 800;
  font-size: 0.9rem;
}
.card-desc {
  font-size: 0.8rem;
  color: rgb(var(--muted));
}

/* Blobs animados no hero */
section#inicio .absolute.inset-0.-z-10 > div {
  animation: float 8s ease-in-out infinite;
}
section#inicio .absolute.inset-0.-z-10 > div:nth-child(2) {
  animation-delay: -2.5s;
}
section#inicio .absolute.inset-0.-z-10 > div:nth-child(3) {
  animation-delay: -5s;
}
@keyframes float {
  0%, 100% { transform: translate(-50%, 0) scale(1); }
  50% { transform: translate(-50%, 20px) scale(1.06); }
}
section#inicio .absolute.inset-0.-z-10 > div:not(:first-child) {
  animation-name: floatSide;
}
@keyframes floatSide {
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(18px) scale(1.05); }
}

/* Status "Online" pulsando */
.bg-green-500 {
  position: relative;
}
.bg-green-500::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 999px;
  background: rgb(34, 197, 94);
  animation: pulseDot 1.6s ease-out infinite;
}
@keyframes pulseDot {
  0% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.55); }
  100% { box-shadow: 0 0 0 8px rgba(34, 197, 94, 0); }
}

/* Botões com glow no hover */
.bg-blue-600 {
  transition: transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;
}
a.bg-blue-600:hover,
button.bg-blue-600:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(37, 99, 235, 0.45);
}

/* Cards de artigo com leve elevação no hover */
article.rounded-3xl {
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}
article.rounded-3xl:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 40px rgba(59, 130, 246, 0.15);
}

/* Título do hero com leve brilho no gradiente */
h1 span.bg-clip-text {
  background-size: 200% auto;
  animation: shine 6s linear infinite;
}
@keyframes shine {
  to { background-position: 200% center; }
}
</style>