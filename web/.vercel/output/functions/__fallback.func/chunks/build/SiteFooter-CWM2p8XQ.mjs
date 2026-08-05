import { defineComponent, createElementBlock, computed, readonly, watch, ref, mergeProps, unref, withCtx, createVNode, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { b as useNuxtApp } from './server.mjs';
import { _ as __nuxt_component_0$1 } from './nuxt-link-XoKa4W7F.mjs';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderClass, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';

const __nuxt_component_0 = defineComponent({
  name: "ServerPlaceholder",
  render() {
    return createElementBlock("div");
  }
});

function useScrollReveal(elRef, options) {
  const { $gsap } = useNuxtApp();
  const {
    y = 24,
    duration = 0.8,
    delay = 0,
    start = "top 88%",
    once = true,
    scale = 0.985
  } = options ?? {};
  let ctx;
  function reveal(el) {
    if (!$gsap) return;
    if ((void 0).matchMedia("(prefers-reduced-motion: reduce)").matches) {
      $gsap.set(el, { opacity: 1, y: 0, scale: 1 });
      return;
    }
    ctx = $gsap.context(() => {
      $gsap.fromTo(
        el,
        { opacity: 0, y, scale },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration,
          delay,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start,
            toggleActions: once ? "play none none none" : "play reverse play reverse"
          }
        }
      );
    }, el);
  }
  watch(
    elRef,
    (el, oldEl) => {
      if (oldEl) {
        ctx?.revert();
        ctx = void 0;
      }
      if (el) reveal(el);
    },
    { immediate: true, flush: "post" }
  );
}
const dictionaries = {
  pt: {
    common: {
      skipToContent: "Pular para o conteúdo",
      close: "Fechar",
      cancel: "Cancelar",
      confirm: "Confirmar",
      deleting: "Excluindo…",
      send: "Enviar",
      sending: "Enviando…",
      success: "Mensagem enviada! Só esperar minha resposta por e-mail ou WhatsApp.",
      error: "Não foi possível enviar agora. Tente novamente em instantes."
    },
    nav: {
      home: "Início",
      about: "Sobre",
      services: "Serviços",
      contact: "Contato",
      talk: "Vamos conversar",
      openMenu: "Abrir menu",
      closeMenu: "Fechar menu",
      toggleLight: "Alternar para modo claro",
      toggleDark: "Alternar para modo escuro"
    },
    footer: {
      home: "Início",
      services: "Serviços",
      contact: "Contato",
      tagline: "Web • TI • Manutenção de notebooks",
      rights: "Todos os direitos reservados."
    },
    hero: {
      badge: "Web Desenvolvedor, Suporte de TI e Manutenção de Notebooks",
      description: "Desenvolvimento web, suporte de TI e manutenção de notebooks. Do diagnóstico ao resultado: com clareza e sem enrolação.",
      cta: "Ver serviços",
      statDeliveryLabel: "Entrega",
      statDeliveryValue: "Rápida",
      statDeliveryDesc: "Organização e comunicação",
      statFocusLabel: "Foco",
      statFocusValue: "Resultados",
      statFocusDesc: "Sem complicar o que é simples",
      statSupportLabel: "Suporte",
      statSupportValue: "Prático",
      statSupportDesc: "Para você seguir adiante",
      statusLabel: "Status do atendimento",
      statusValue: "Pronto para ajudar",
      statusOnline: "Online",
      step1Title: "1) Diagnóstico",
      step1Desc: "Entendemos o problema e definimos o caminho mais eficiente.",
      step2Title: "2) Execução",
      step2Desc: "Trabalho direto na solução: códigos, ajustes e manutenção.",
      step3Title: "3) Entrega",
      step3Desc: "Você recebe clareza do que foi feito e como manter.",
      cardAttendTitle: "Atendimento",
      cardAttendDesc: "Vamos alinhar em poucos minutos.",
      cardSolutionsTitle: "Soluções",
      cardSolutionsDesc: "Web e suporte de TI completo."
    },
    about: {
      sectionLabel: "Sobre",
      heading: "Soluções completas em Web, TI e assistência técnica",
      description: "Meu trabalho é transformar cada necessidade em uma solução útil para o seu dia a dia: com comunicação clara, entrega organizada e suporte de verdade.",
      quote: '"Não entrego apenas soluções: devolvo ritmo, confiança e espaço para o que importa."',
      webTitle: "1) Desenvolvimento Web",
      webDesc: "Criação de sites institucionais, landing pages e páginas de conversão com foco em performance, visual moderno e navegação intuitiva.",
      webItem1: "Layout responsivo e identidade profissional",
      webItem2: "Organização estratégica de seções e CTA",
      webItem3: "Ajustes contínuos para evolução do site",
      itTitle: "2) Suporte de TI",
      itDesc: "Atendimento para diagnóstico e correção de problemas técnicos com foco em rapidez e continuidade da sua rotina.",
      itCard1Title: "Ambiente estável",
      itCard1Desc: "Configuração de rede, sistema e periféricos.",
      itCard2Title: "Segurança e prevenção",
      itCard2Desc: "Boas práticas para evitar falhas recorrentes.",
      itCard3Title: "Suporte claro",
      itCard3Desc: "Explicação simples do que foi feito e próximo passo.",
      notebookTitle: "3) Assistência técnica para notebooks",
      notebookDesc: "Serviço técnico para notebooks com lentidão, superaquecimento, falhas de inicialização e necessidade de upgrade.",
      notebookItem1Title: "Limpeza e refrigeração",
      notebookItem1Desc: "Troca de pasta térmica e manutenção interna.",
      notebookItem2Title: "Upgrade de performance",
      notebookItem2Desc: "SSD, memória e ajustes para maior velocidade.",
      notebookItem3Title: "Reparo e diagnóstico",
      notebookItem3Desc: "Identificação técnica e solução objetiva.",
      techLabel: "Linguagens de programação que eu utilizo",
      techHeading: "A combinação certa de linguagens de programação cria a stack perfeita.",
      processLabel: "Meu processo",
      processHeading: "Uma ideia bem entendida vira uma solução que funciona.",
      process01Label: "01 — Escuta",
      process01Desc: "Entendo o contexto, a necessidade e o resultado que realmente faz diferença.",
      process02Label: "02 — Direção",
      process02Desc: "Transformo o objetivo em um caminho claro, visual e técnico.",
      process03Label: "03 — Entrega",
      process03Desc: "Construo, testo e ajusto para você poder usar com segurança.",
      processCallout: "Venha conhecer um dos projetos abaixo!",
      ctaHeading: "Quer conversar?",
      ctaDesc: "Envie uma mensagem e eu retorno com um caminho claro.",
      ctaBtn: "Falar agora"
    },
    services: {
      sectionLabel: "Serviços",
      heading: "Soluções completas para evoluir, estabilizar e manter sua presença digital.",
      description: "Atendemos desde a criação de sites e sistemas até suporte técnico e manutenção preventiva. Cada serviço foi pensado para reduzir atrito, aumentar desempenho e garantir continuidade.",
      webBadge: "Desenvolvimento Web",
      webTitle: "Sites, landing pages e sistemas sob medida",
      webDesc: "Planejamento, design responsivo, implementação em Nuxt e experiências focadas em conversão. Ideal para negócios que precisam de performance, clareza e escalabilidade.",
      webItem1: "Sites institucionais com SEO técnico e navegação fluida.",
      webItem2: "Landing pages para campanhas e captação de leads.",
      webItem3: "Integrações com APIs, automações e painéis administrativos.",
      webBtn: "Solicitar orçamento",
      itBadge: "Assistência de TI",
      itTitle: "Suporte ágil para ambiente de trabalho sem interrupções",
      itDesc: "Atendimento preventivo e corretivo para computadores, redes e periféricos, com foco em resolver problemas com rapidez e manter a operação funcionando bem.",
      itItem1: "Formatação, limpeza lógica e otimização de desempenho.",
      itItem2: "Configuração de redes e dispositivos de uso diário.",
      itItem3: "Atendimento para pequenas empresas e usuários domésticos.",
      itBtn: "Falar com suporte",
      notebookBadge: "Manutenção de Notebooks",
      notebookTitle: "Diagnóstico técnico e reparo com foco em durabilidade",
      notebookDesc: "Serviço dedicado para notebooks com aquecimento excessivo, lentidão, falhas de inicialização ou necessidade de upgrade de SSD e memória.",
      notebookItem1: "Troca de pasta térmica, limpeza interna e análise de temperatura.",
      notebookItem2: "Atualização para SSD, memória e melhorias de desempenho.",
      notebookItem3: "Correção de falhas de energia, teclado, tela e carregamento.",
      notebookBtn: "Pedir diagnóstico",
      ctaLabel: "Orçamento rápido",
      ctaHeading: "Quer um plano claro para o seu projeto ou manutenção?",
      ctaDesc: "Envie os detalhes da sua necessidade e retornamos com a melhor direção técnica e comercial.",
      ctaBtn: "Solicitar orçamento",
      ctaBtnSecondary: "Ver projetos"
    },
    contact: {
      sectionLabel: "Contato",
      heading: "Veja como e onde posso te ajudar!",
      description: "Entre em contato conosco para discutir suas necessidades de desenvolvimento web, suporte técnico ou manutenção de notebooks. Estamos prontos para oferecer soluções personalizadas e eficientes.",
      whatsappResponseTitle: "Tempo de resposta",
      whatsappResponseTime: "normalmente em até 10 horas úteis, dependendo do volume de solicitações",
      whatsappResponseDesc: "pois fique a vontade para nos enviar uma mensagem, com sua curiosidade ou ideia para tirar do papel pelo WhatsApp!",
      whatsappBtn: "Me mande mensagem no WhatsApp!",
      linkedinResponseTitle: "Tempo de resposta",
      linkedinResponseTime: "normalmente em até 1 dia útil, dependendo do volume de solicitações",
      linkedinResponseDesc: "pois fique a vontade para nos enviar uma mensagem, com sua curiosidade ou ideia para tirar do papel pelo Linkedin!",
      linkedinBtn: "Me mande mensagem no Linkedin!",
      emailResponseTitle: "Tempo de resposta",
      emailResponseTime: "normalmente em até 2 dias úteis, dependendo do volume de solicitações",
      emailResponseDesc: "pois fique a vontade para nos enviar uma mensagem, com sua curiosidade ou ideia para tirar do papel pelo email!",
      emailBtn: "Me mande mensagem pelo e-mail!",
      formIntro: "Ou se preferir, me mande uma mensagem por aqui mesmo! E qual seria o tema para conversarmos!",
      formResponseTitle: "Tempo de resposta",
      formResponseTime: "normalmente em até 1 dia útil, dependendo do volume de solicitações",
      formResponseDesc: "pois fique a vontade para nos enviar uma mensagem, com sua curiosidade ou ideia para tirar do papel por aqui mesmo!",
      formTitle: "Enviar mensagem",
      formFast: "Resposta rápida",
      formName: "Seu nome",
      formNamePlaceholder: "Ex: Maria",
      formContact: "Seu número ou e-mail",
      formContactPlaceholder: "Ex: (11) 99999-9999 ou maria@email.com",
      formSubject: "Assunto",
      formSubjectWeb: "Web",
      formSubjectIT: "TI",
      formSubjectTech: "Assistência técnica",
      formSource: "Por onde você me encontrou?",
      formSourceGoogle: "Google / Web",
      formSourceLinkedin: "Linkedin",
      formSourceIndication: "Indicação",
      formSourceGithub: "Github",
      formMessage: "Mensagem",
      formMessagePlaceholder: "Conte me, qual é sua ideia de um site, qual é o problema que você está passando ou problema com seu notebook.",
      formSend: "Enviar",
      formSending: "Enviando…",
      formSuccess: "Mensagem enviada! Só esperar minha resposta por e-mail ou WhatsApp.",
      formError: "Não foi possível enviar agora. Tente novamente em instantes."
    },
    indexSections: {
      aboutTitle: "Sobre",
      aboutDesc: "Uma combinação de web e suporte técnico para transformar dificuldade em solução.",
      aboutWork: "Trabalho com:",
      aboutWorkDesc: "Sites, manutenções e ajustes para o dia a dia.",
      aboutWebTitle: "Web moderna",
      aboutWebDesc: "Layouts responsivos, semântica, acessibilidade e performance.",
      aboutWebItem1: "Landing pages e portfólios",
      aboutWebItem2: "UI com foco em conversão",
      aboutWebItem3: "Ajustes e melhorias contínuas",
      aboutItTitle: "Assistência de TI",
      aboutItDesc: "Diagnóstico prático para você voltar a trabalhar: configurações, redes e rotinas.",
      aboutItItem1: "Orientação objetiva",
      aboutItItem2: "Boas práticas e segurança",
      aboutItItem3: "Correções e otimização",
      aboutNotebookTitle: "Manutenção de notebooks",
      aboutNotebookDesc: "Limpeza, ajustes de desempenho, atualização e recuperação do funcionamento.",
      aboutNotebookItem1: "Controle térmico",
      aboutNotebookItem2: "Otimização de armazenamento",
      aboutNotebookItem3: "Performance no uso real",
      servicesTitle: "Serviços",
      servicesDesc: "Escolha o que você precisa agora — a gente monta o plano de ação.",
      servWebTitle: "Desenvolvimento de sites",
      servWebDesc: "Landing pages, portfólios e páginas institucionais.",
      servWebItem1: "Responsivo e semântico",
      servWebItem2: "Visual moderno (claro/escuro)",
      servWebItem3: "Acessibilidade e foco",
      servAdjTitle: "Ajustes e melhorias",
      servAdjDesc: "Correções, performance e evolução do seu site.",
      servAdjItem1: "Componentes e layouts",
      servAdjItem2: "Melhorias de navegação",
      servAdjItem3: "Revisão de conteúdo e CTA",
      servItTitle: "Assistência de TI",
      servItDesc: "Configurações, suporte e orientação objetiva.",
      servItItem1: "Setup e rotinas",
      servItItem2: "Conectividade e rede",
      servItItem3: "Correções práticas",
      servNotebookTitle: "Manutenção de notebooks",
      servNotebookDesc: "Diagnóstico, limpeza, otimização e reparos.",
      servNotebookItem1: "Limpeza e ajustes",
      servNotebookItem2: "Upgrade e performance",
      servNotebookItem3: "Energia e uso prolongado",
      servCtaTitle: "Quer um orçamento?",
      servCtaDesc: "Envie uma mensagem com o que você precisa e eu retorno com um caminho claro.",
      servCtaBtn: "Falar agora",
      portfolioTitle: "Meus Portfólios",
      portfolioDesc: "Exemplos de projetos concluídos, e focados em seu objetivo!",
      portfolioMore: "Clique para ver mais projetos",
      port1Title: "YU-GI-OH! API",
      port1Desc: "Projeto com API de cartas do jogo YU-GI-OH!",
      port1Item1: "Responsivo",
      port1Item2: "Semântica",
      port1Item3: "Estrutura clara",
      port2Title: "Loja do Seu Zé",
      port2Desc: "ERP com cobrança",
      port2Item1: "Acessibilidade",
      port2Item2: "Responsividade",
      port2Item3: "Performance",
      contactTitle: "Contato",
      contactDesc: "Me diga o que você precisa e eu retorno com um caminho claro. Sem pensamento de vender, use sua criatividade e me conte e vamos conversar juntos!",
      contactLocLabel: "Atendimento",
      contactLocDesc: "Online e/ou presencial (conforme disponibilidade).",
      contactObjLabel: "Objetivo",
      contactObjDesc: "Resolver e deixar você andando sem travar."
    },
    portfolio: {
      eyebrow: "Meus Projetos",
      title: "Projetos que transformam ideias em resultado",
      description: "Cada projeto combina estratégia, clareza visual e uma experiência fluida em qualquer tela.",
      viewFull: "Ver o projeto completo",
      wantSimilar: "Eu quero um projeto semelhante",
      technologies: "Tecnologias",
      viewGithub: "Ver projeto no GitHub",
      lightboxClose: "Fechar imagem",
      lightboxAlt: "Foto do projeto ampliada"
    },
    admin: {
      restrictedTitle: "Acesso restrito",
      restrictedDesc: "Digite a senha de administrador para acessar as mensagens.",
      userLabel: "Usuário",
      passLabel: "Senha",
      loginBtn: "Entrar",
      verifying: "Verificando…",
      invalidAuth: "Usuário ou senha inválidos.",
      serverError: "Erro ao conectar com o servidor.",
      headerTitle: "Caixa de mensagens do site",
      headerDesc: "Aqui você visualiza os envios do formulário e pode filtrar por assunto.",
      filterLabel: "Filtrar por assunto",
      filterAll: "Todos",
      loading: "Carregando mensagens...",
      loadError: "Não foi possível carregar as mensagens agora.",
      noMessages: "Ainda não há mensagens para o filtro selecionado.",
      read: "Lida",
      unread: "Não lida",
      markRead: "Marcar como lida",
      markUnread: "Marcar como não lida",
      deleteMsg: "Excluir mensagem",
      confirmDeleteTitle: "Excluir mensagem",
      confirmDeleteMsg: "Tem certeza que deseja excluir permanentemente a mensagem de {name}?",
      sourcePrefix: "Origem:"
    }
  },
  en: {
    common: {
      skipToContent: "Skip to content",
      close: "Close",
      cancel: "Cancel",
      confirm: "Confirm",
      deleting: "Deleting…",
      send: "Send",
      sending: "Sending…",
      success: "Message sent! Just wait for my response by email or WhatsApp.",
      error: "Could not send right now. Please try again in a moment."
    },
    nav: {
      home: "Home",
      about: "About",
      services: "Services",
      contact: "Contact",
      talk: "Let's talk",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      toggleLight: "Switch to light mode",
      toggleDark: "Switch to dark mode"
    },
    footer: {
      home: "Home",
      services: "Services",
      contact: "Contact",
      tagline: "Web • IT • Laptop maintenance",
      rights: "All rights reserved."
    },
    hero: {
      badge: "Web Developer, IT Support and Laptop Maintenance",
      description: "Web development, IT support and laptop maintenance. From diagnosis to result: clear, no runaround.",
      cta: "View services",
      statDeliveryLabel: "Delivery",
      statDeliveryValue: "Fast",
      statDeliveryDesc: "Organization and communication",
      statFocusLabel: "Focus",
      statFocusValue: "Results",
      statFocusDesc: "No overcomplicating the simple stuff",
      statSupportLabel: "Support",
      statSupportValue: "Practical",
      statSupportDesc: "So you can keep moving forward",
      statusLabel: "Service status",
      statusValue: "Ready to help",
      statusOnline: "Online",
      step1Title: "1) Diagnosis",
      step1Desc: "We understand the problem and define the most efficient path.",
      step2Title: "2) Execution",
      step2Desc: "Direct work on the solution: code, adjustments, and maintenance.",
      step3Title: "3) Delivery",
      step3Desc: "You receive clarity on what was done and how to maintain it.",
      cardAttendTitle: "Assistance",
      cardAttendDesc: "Let's align in a few minutes.",
      cardSolutionsTitle: "Solutions",
      cardSolutionsDesc: "Full web and IT support."
    },
    about: {
      sectionLabel: "About",
      heading: "Complete solutions in Web, IT and technical assistance",
      description: "My work is to transform each need into a useful solution for your daily life: with clear communication, organized delivery and real support.",
      quote: `"I don't just deliver solutions: I give back rhythm, confidence and space for what matters."`,
      webTitle: "1) Web Development",
      webDesc: "Creation of institutional websites, landing pages and conversion pages with a focus on performance, modern design and intuitive navigation.",
      webItem1: "Responsive layout and professional identity",
      webItem2: "Strategic organization of sections and CTA",
      webItem3: "Continuous adjustments for site evolution",
      itTitle: "2) IT Support",
      itDesc: "Service for diagnosing and fixing technical problems with a focus on speed and continuity of your routine.",
      itCard1Title: "Stable environment",
      itCard1Desc: "Network, system and peripheral configuration.",
      itCard2Title: "Security and prevention",
      itCard2Desc: "Best practices to avoid recurring failures.",
      itCard3Title: "Clear support",
      itCard3Desc: "Simple explanation of what was done and next steps.",
      notebookTitle: "3) Technical assistance for laptops",
      notebookDesc: "Technical service for laptops with slowness, overheating, startup failures and need for upgrade.",
      notebookItem1Title: "Cleaning and cooling",
      notebookItem1Desc: "Thermal paste replacement and internal maintenance.",
      notebookItem2Title: "Performance upgrade",
      notebookItem2Desc: "SSD, memory and adjustments for greater speed.",
      notebookItem3Title: "Repair and diagnosis",
      notebookItem3Desc: "Technical identification and objective solution.",
      techLabel: "Programming languages I use",
      techHeading: "The right combination of programming languages creates the perfect stack.",
      processLabel: "My process",
      processHeading: "A well-understood idea becomes a solution that works.",
      process01Label: "01 — Listen",
      process01Desc: "I understand the context, the need and the result that really makes a difference.",
      process02Label: "02 — Direction",
      process02Desc: "I turn the goal into a clear, visual and technical path.",
      process03Label: "03 — Delivery",
      process03Desc: "I build, test and adjust so you can use it with confidence.",
      processCallout: "Come see one of the projects below!",
      ctaHeading: "Want to talk?",
      ctaDesc: "Send a message and I'll get back to you with a clear path.",
      ctaBtn: "Talk now"
    },
    services: {
      sectionLabel: "Services",
      heading: "Complete solutions to evolve, stabilize and maintain your digital presence.",
      description: "We serve from creating websites and systems to technical support and preventive maintenance. Each service was designed to reduce friction, increase performance and ensure continuity.",
      webBadge: "Web Development",
      webTitle: "Custom websites, landing pages and systems",
      webDesc: "Planning, responsive design, Nuxt implementation and experiences focused on conversion. Ideal for businesses that need performance, clarity and scalability.",
      webItem1: "Institutional websites with technical SEO and fluid navigation.",
      webItem2: "Landing pages for campaigns and lead generation.",
      webItem3: "Integrations with APIs, automations and admin panels.",
      webBtn: "Request a quote",
      itBadge: "IT Assistance",
      itTitle: "Agile support for a workplace without interruptions",
      itDesc: "Preventive and corrective service for computers, networks and peripherals, focused on solving problems quickly and keeping operations running well.",
      itItem1: "Formatting, logical cleaning and performance optimization.",
      itItem2: "Network and daily device configuration.",
      itItem3: "Service for small businesses and home users.",
      itBtn: "Contact support",
      notebookBadge: "Laptop Maintenance",
      notebookTitle: "Technical diagnosis and repair focused on durability",
      notebookDesc: "Dedicated service for laptops with excessive heating, slowness, startup failures or need for SSD and memory upgrade.",
      notebookItem1: "Thermal paste replacement, internal cleaning and temperature analysis.",
      notebookItem2: "Upgrade to SSD, memory and performance improvements.",
      notebookItem3: "Correction of power, keyboard, screen and charging failures.",
      notebookBtn: "Request diagnosis",
      ctaLabel: "Quick quote",
      ctaHeading: "Want a clear plan for your project or maintenance?",
      ctaDesc: "Send the details of your need and we'll get back to you with the best technical and commercial direction.",
      ctaBtn: "Request a quote",
      ctaBtnSecondary: "See projects"
    },
    contact: {
      sectionLabel: "Contact",
      heading: "See how and where I can help you!",
      description: "Contact us to discuss your web development, technical support or laptop maintenance needs. We are ready to offer personalized and efficient solutions.",
      whatsappResponseTitle: "Response time",
      whatsappResponseTime: "usually within 10 business hours, depending on request volume",
      whatsappResponseDesc: "feel free to send us a message with your idea or questions via WhatsApp!",
      whatsappBtn: "Send me a message on WhatsApp!",
      linkedinResponseTitle: "Response time",
      linkedinResponseTime: "usually within 1 business day, depending on request volume",
      linkedinResponseDesc: "feel free to send us a message with your idea or questions via LinkedIn!",
      linkedinBtn: "Send me a message on LinkedIn!",
      emailResponseTitle: "Response time",
      emailResponseTime: "usually within 2 business days, depending on request volume",
      emailResponseDesc: "feel free to send us a message with your idea or questions via email!",
      emailBtn: "Send me a message by email!",
      formIntro: "Or if you prefer, send me a message right here! What topic would you like to discuss?",
      formResponseTitle: "Response time",
      formResponseTime: "usually within 1 business day, depending on request volume",
      formResponseDesc: "feel free to send us a message with your idea right here!",
      formTitle: "Send message",
      formFast: "Quick response",
      formName: "Your name",
      formNamePlaceholder: "Ex: Mary",
      formContact: "Your number or email",
      formContactPlaceholder: "Ex: (11) 99999-9999 or mary@email.com",
      formSubject: "Subject",
      formSubjectWeb: "Web",
      formSubjectIT: "IT",
      formSubjectTech: "Technical assistance",
      formSource: "How did you find me?",
      formSourceGoogle: "Google / Web",
      formSourceLinkedin: "LinkedIn",
      formSourceIndication: "Referral",
      formSourceGithub: "Github",
      formMessage: "Message",
      formMessagePlaceholder: "Tell me your website idea, what problem you're facing or a laptop issue.",
      formSend: "Send",
      formSending: "Sending…",
      formSuccess: "Message sent! Just wait for my reply via email or WhatsApp.",
      formError: "Could not send right now. Please try again in a moment."
    },
    indexSections: {
      aboutTitle: "About",
      aboutDesc: "A combination of web and technical support to turn difficulty into solution.",
      aboutWork: "I work with:",
      aboutWorkDesc: "Websites, maintenance and adjustments for everyday life.",
      aboutWebTitle: "Modern web",
      aboutWebDesc: "Responsive layouts, semantics, accessibility and performance.",
      aboutWebItem1: "Landing pages and portfolios",
      aboutWebItem2: "UI focused on conversion",
      aboutWebItem3: "Continuous adjustments and improvements",
      aboutItTitle: "IT Assistance",
      aboutItDesc: "Practical diagnosis to get you back to work: configurations, networks and routines.",
      aboutItItem1: "Objective guidance",
      aboutItItem2: "Best practices and security",
      aboutItItem3: "Corrections and optimization",
      aboutNotebookTitle: "Laptop maintenance",
      aboutNotebookDesc: "Cleaning, performance adjustments, updates and recovery.",
      aboutNotebookItem1: "Thermal control",
      aboutNotebookItem2: "Storage optimization",
      aboutNotebookItem3: "Performance in real use",
      servicesTitle: "Services",
      servicesDesc: "Choose what you need now — we'll put together the action plan.",
      servWebTitle: "Website development",
      servWebDesc: "Landing pages, portfolios and institutional pages.",
      servWebItem1: "Responsive and semantic",
      servWebItem2: "Modern design (light/dark)",
      servWebItem3: "Accessibility and focus",
      servAdjTitle: "Adjustments and improvements",
      servAdjDesc: "Fixes, performance and evolution of your site.",
      servAdjItem1: "Components and layouts",
      servAdjItem2: "Navigation improvements",
      servAdjItem3: "Content and CTA review",
      servItTitle: "IT Assistance",
      servItDesc: "Configurations, support and objective guidance.",
      servItItem1: "Setup and routines",
      servItItem2: "Connectivity and network",
      servItItem3: "Practical fixes",
      servNotebookTitle: "Laptop maintenance",
      servNotebookDesc: "Diagnosis, cleaning, optimization and repairs.",
      servNotebookItem1: "Cleaning and adjustments",
      servNotebookItem2: "Upgrade and performance",
      servNotebookItem3: "Power and extended use",
      servCtaTitle: "Want a quote?",
      servCtaDesc: "Send a message with what you need and I'll get back with a clear path.",
      servCtaBtn: "Talk now",
      portfolioTitle: "My Portfolio",
      portfolioDesc: "Examples of completed projects, focused on their goal!",
      portfolioMore: "Click to see more projects",
      port1Title: "YU-GI-OH! API",
      port1Desc: "Project with YU-GI-OH! card game API.",
      port1Item1: "Responsive",
      port1Item2: "Semantic",
      port1Item3: "Clear structure",
      port2Title: "Seu Zé's Store",
      port2Desc: "ERP with billing",
      port2Item1: "Accessibility",
      port2Item2: "Responsiveness",
      port2Item3: "Performance",
      contactTitle: "Contact",
      contactDesc: "Tell me what you need and I'll get back to you with a clear path. No sales pitch — just share your idea and let's talk!",
      contactLocLabel: "Service",
      contactLocDesc: "Online and/or in-person (subject to availability).",
      contactObjLabel: "Goal",
      contactObjDesc: "Solve it and keep you moving without getting stuck."
    },
    portfolio: {
      eyebrow: "My Projects",
      title: "Projects that transform ideas into results",
      description: "Each project combines strategy, visual clarity, and a fluid experience on any screen.",
      viewFull: "View full project",
      wantSimilar: "I want a similar project",
      technologies: "Technologies",
      viewGithub: "View project on GitHub",
      lightboxClose: "Close image",
      lightboxAlt: "Expanded project picture"
    },
    admin: {
      restrictedTitle: "Restricted access",
      restrictedDesc: "Enter admin password to access messages.",
      userLabel: "Username",
      passLabel: "Password",
      loginBtn: "Log in",
      verifying: "Verifying…",
      invalidAuth: "Invalid username or password.",
      serverError: "Error connecting to server.",
      headerTitle: "Website Message Inbox",
      headerDesc: "Here you can view form submissions and filter by topic.",
      filterLabel: "Filter by subject",
      filterAll: "All",
      loading: "Loading messages...",
      loadError: "Could not load messages right now.",
      noMessages: "No messages for the selected filter yet.",
      read: "Read",
      unread: "Unread",
      markRead: "Mark as read",
      markUnread: "Mark as unread",
      deleteMsg: "Delete message",
      confirmDeleteTitle: "Delete message",
      confirmDeleteMsg: "Are you sure you want to permanently delete the message from {name}?",
      sourcePrefix: "Source:"
    }
  }
};
const locale = ref("pt");
function getByPath(obj, path) {
  return path.split(".").reduce((acc, key) => {
    if (acc && typeof acc === "object" && key in acc) {
      return acc[key];
    }
    return void 0;
  }, obj);
}
function useLocale() {
  function setLocale(next) {
    locale.value = next;
  }
  function t(key) {
    const value = getByPath(dictionaries[locale.value], key);
    if (typeof value === "string") return value;
    const fallback = getByPath(dictionaries.pt, key);
    return typeof fallback === "string" ? fallback : key;
  }
  return {
    locale: readonly(locale),
    isPt: computed(() => locale.value === "pt"),
    isEn: computed(() => locale.value === "en"),
    setLocale,
    t
  };
}
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "LanguageSwitcher",
  __ssrInlineRender: true,
  setup(__props) {
    const { locale: locale2 } = useLocale();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "lang-switcher",
        role: "group",
        "aria-label": "Idioma / Language"
      }, _attrs))} data-v-b4033222><button type="button" class="${ssrRenderClass([{ "lang-btn--active": unref(locale2) === "pt" }, "lang-btn"])}"${ssrRenderAttr("aria-pressed", unref(locale2) === "pt")} title="Português" data-v-b4033222><svg viewBox="0 0 30 20" class="lang-flag" aria-hidden="true" data-v-b4033222><rect width="30" height="20" fill="#009739" data-v-b4033222></rect><polygon points="15,3 27,10 15,17 3,10" fill="#fedd00" data-v-b4033222></polygon><circle cx="15" cy="10" r="5" fill="#012169" data-v-b4033222></circle><path d="M10,10 a5,5 0 0,0 10,0" fill="none" stroke="#fff" stroke-width="1.1" data-v-b4033222></path></svg><span class="sr-only" data-v-b4033222>Português</span></button><button type="button" class="${ssrRenderClass([{ "lang-btn--active": unref(locale2) === "en" }, "lang-btn"])}"${ssrRenderAttr("aria-pressed", unref(locale2) === "en")} title="English" data-v-b4033222><svg viewBox="0 0 30 20" class="lang-flag" aria-hidden="true" data-v-b4033222><rect width="30" height="20" fill="#b22234" data-v-b4033222></rect><g fill="#ffffff" data-v-b4033222><rect y="1.54" width="30" height="1.54" data-v-b4033222></rect><rect y="4.62" width="30" height="1.54" data-v-b4033222></rect><rect y="7.69" width="30" height="1.54" data-v-b4033222></rect><rect y="10.77" width="30" height="1.54" data-v-b4033222></rect><rect y="13.85" width="30" height="1.54" data-v-b4033222></rect><rect y="16.92" width="30" height="1.54" data-v-b4033222></rect></g><rect width="12" height="10.77" fill="#3c3b6e" data-v-b4033222></rect></svg><span class="sr-only" data-v-b4033222>English</span></button></div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/LanguageSwitcher.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const LanguageSwitcher = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$2, [["__scopeId", "data-v-b4033222"]]), { __name: "LanguageSwitcher" });
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "SiteHeader",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useLocale();
    const isDark = ref(false);
    const isMenuOpen = ref(false);
    watch(isMenuOpen, (open) => {
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<header${ssrRenderAttrs(mergeProps({ class: "sticky top-0 z-50 border-b border-border/60 bg-header/80 backdrop-blur" }, _attrs))} data-v-a1b0b27b><div class="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-6" data-v-a1b0b27b><div class="flex items-center gap-3" data-v-a1b0b27b><button type="button" class="inline-flex items-center justify-center rounded-full border border-border/70 bg-card/60 p-2 text-sm font-semibold shadow-sm backdrop-blur transition hover:border-blue-500/60 focus:outline-none focus:ring-2 focus:ring-blue-500 md:hidden"${ssrRenderAttr("aria-expanded", isMenuOpen.value)} aria-controls="menu-mobile"${ssrRenderAttr("aria-label", isMenuOpen.value ? unref(t)("nav.closeMenu") : unref(t)("nav.openMenu"))} data-v-a1b0b27b><span aria-hidden="true" class="${ssrRenderClass([{ "rotate-90": isMenuOpen.value }, "material-symbols-outlined block text-blue-600 dark:text-blue-400 transition-transform duration-200"])}" data-v-a1b0b27b>${ssrInterpolate(isMenuOpen.value ? "close" : "menu")}</span><span class="sr-only" data-v-a1b0b27b>${ssrInterpolate(isMenuOpen.value ? unref(t)("nav.closeMenu") : unref(t)("nav.openMenu"))}</span></button>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "group inline-flex items-center gap-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",
        onClick: ($event) => isMenuOpen.value = false
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="text-base font-black tracking-tight" data-v-a1b0b27b${_scopeId}>VVCHAGAS</span>`);
          } else {
            return [
              createVNode("span", { class: "text-base font-black tracking-tight" }, "VVCHAGAS")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><nav aria-label="Navegação principal" class="hidden items-center gap-6 md:flex" data-v-a1b0b27b>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        class: "nav-link hover:-translate-y-0.5 duration-300",
        to: "/"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(t)("nav.home"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(t)("nav.home")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        class: "nav-link hover:-translate-y-0.5 duration-300",
        to: "/about"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(t)("nav.about"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(t)("nav.about")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        class: "nav-link hover:-translate-y-0.5 duration-300",
        to: "/servicos"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(t)("nav.services"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(t)("nav.services")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        class: "nav-link hover:-translate-y-0.5 duration-300",
        to: "/contato"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(t)("nav.contact"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(t)("nav.contact")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</nav><div class="flex items-center gap-3" data-v-a1b0b27b>`);
      _push(ssrRenderComponent(LanguageSwitcher, { class: "hidden sm:inline-flex" }, null, _parent));
      _push(`<button type="button" class="theme-toggle inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/60 p-1.5 text-sm font-semibold shadow-sm backdrop-blur transition hover:border-blue-500/60 focus:outline-none focus:ring-2 focus:ring-blue-500"${ssrRenderAttr("aria-label", isDark.value ? unref(t)("nav.toggleLight") : unref(t)("nav.toggleDark"))} data-v-a1b0b27b><span aria-hidden="true" class="inline-flex size-8 items-center justify-center rounded-full bg-muted text-foreground/90" data-v-a1b0b27b>`);
      if (isDark.value) {
        _push(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor" data-v-a1b0b27b><path d="M21.64 13.65a1 1 0 0 0-1.17-.74 8.1 8.1 0 0 1-10.4-10.4 1 1 0 0 0-.74-1.17A10 10 0 1 0 21.64 13.65Z" data-v-a1b0b27b></path></svg>`);
      } else {
        _push(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor" data-v-a1b0b27b><path d="M12 18a6 6 0 1 1 0-12 6 6 0 0 1 0 12Zm0-16a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1Zm0 18a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0v-1a1 1 0 0 1 1-1ZM4.22 5.64a1 1 0 0 1 1.41 0l.71.7a1 1 0 1 1-1.41 1.42l-.71-.71a1 1 0 0 1 0-1.41Zm13.94 13.94a1 1 0 0 1 1.41 0l.71.7a1 1 0 1 1-1.41 1.42l-.71-.71a1 1 0 0 1 0-1.41ZM1 12a1 1 0 0 1 1-1h1a1 1 0 1 1 0 2H2a1 1 0 0 1-1-1Zm18 0a1 1 0 0 1 1-1h1a1 1 0 1 1 0 2h-1a1 1 0 0 1-1-1ZM4.22 18.36a1 1 0 0 1 0-1.41l.71-.71a1 1 0 1 1 1.41 1.42l-.71.7a1 1 0 0 1-1.41 0Zm13.94-13.94a1 1 0 0 1 0-1.41l.71-.71a1 1 0 1 1 1.41 1.42l-.71.7a1 1 0 0 1-1.41 0Z" data-v-a1b0b27b></path></svg>`);
      }
      _push(`</span></button>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        id: "talk-btn",
        to: "/contato",
        class: "hidden sm:inline-flex items-center justify-center rounded-full bg-blue-600 px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(t)("nav.talk"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(t)("nav.talk")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
      if (isMenuOpen.value) {
        _push(`<div class="fixed inset-0 top-[61px] z-40 bg-black/50 backdrop-blur-xs md:hidden" data-v-a1b0b27b></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<nav id="menu-mobile" aria-label="Menu mobile" class="${ssrRenderClass([isMenuOpen.value ? "translate-x-0" : "-translate-x-full", "fixed left-0 bottom-0 top-[61px] w-72 max-w-[80vw] border-r border-border/60 bg-background/95 bg-background transition-transform duration-300 ease-in-out md:hidden"])}" data-v-a1b0b27b><div class="flex flex-col gap-3 h-full overflow-y-auto px-5 py-6 bg-card text-foreground" data-v-a1b0b27b>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        class: "nav-link block py-2.5 text-base border-b border-border/40",
        to: "/",
        onClick: ($event) => isMenuOpen.value = false
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(t)("nav.home"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(t)("nav.home")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        class: "nav-link block py-2.5 text-base border-b border-border/40",
        to: "/about",
        onClick: ($event) => isMenuOpen.value = false
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(t)("nav.about"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(t)("nav.about")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        class: "nav-link block py-2.5 text-base border-b border-border/40",
        to: "/servicos",
        onClick: ($event) => isMenuOpen.value = false
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(t)("nav.services"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(t)("nav.services")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        class: "nav-link block py-2.5 text-base border-b border-border/40",
        to: "/contato",
        onClick: ($event) => isMenuOpen.value = false
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(t)("nav.contact"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(t)("nav.contact")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="mt-4 pt-4 border-t border-border/60 flex flex-col gap-3" data-v-a1b0b27b>`);
      _push(ssrRenderComponent(LanguageSwitcher, { class: "w-full justify-start" }, null, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/contato",
        class: "mt-2 flex items-center justify-center rounded-full bg-blue-600 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700",
        onClick: ($event) => isMenuOpen.value = false
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(t)("nav.talk"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(t)("nav.talk")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></nav></header>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/SiteHeader.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const SiteHeader = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$1, [["__scopeId", "data-v-a1b0b27b"]]), { __name: "SiteHeader" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "SiteFooter",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useLocale();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<footer${ssrRenderAttrs(mergeProps({ class: "border-t border-border/60 bg-footer/60" }, _attrs))}><div class="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-8 md:flex-row md:items-center md:justify-between md:px-6"><div><p class="font-extrabold">VVCHAGAS</p><p class="text-sm text-muted">${ssrInterpolate(unref(t)("footer.tagline"))}</p></div><div class="flex flex-wrap gap-3 text-sm">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        class: "footer-link hover:-translate-y-0.5",
        to: "/"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(t)("footer.home"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(t)("footer.home")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        class: "footer-link hover:-translate-y-0.5",
        to: "/servicos"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(t)("footer.services"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(t)("footer.services")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        class: "footer-link hover:-translate-y-0.5",
        to: "/contato"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(t)("footer.contact"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(t)("footer.contact")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="gap-6 flex flex-wrap items-center"><a href="https://wa.me/5514997760049" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 text-sm font-semibold transition-colors hover:text-green-600 hover:-translate-y-0.5"><svg viewBox="0 0 24 24" fill="currentColor" role="img" aria-hidden="true" class="size-4 shrink-0"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"></path></svg> WhatsApp </a><a href="https://mail.google.com/mail/u/0/#inbox?compose=CllgCJZXhjGdXcDqqFVrNpsqdnDjmqDsNHZLZBKLWqnWNGkCVZSfTPmBxgsJLDhNQTtmnCbFsFL" class="inline-flex items-center gap-2 text-sm font-semibold transition-colors hover:text-red-600 hover:-translate-y-0.5"><svg viewBox="0 0 24 24" fill="currentColor" role="img" aria-hidden="true" class="size-4 shrink-0"><path d="M22 4H2C.9 4 0 4.9 0 6v12c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-10 6.25L2 8V6l10 6.25L22 6v2z"></path></svg> E-mail </a><a href="https://github.com/vvchagas" target="_blank" rel="noopener noreferrer" aria-label="GitHub" class="transition hover:-translate-y-0.5 hover:text-gray-600"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" class="size-5" aria-hidden="true"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg></a><a href="https://www.instagram.com/victorzx__7/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" class="transition hover:-translate-y-0.5 hover:text-fuchsia-600"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" class="size-5" aria-hidden="true"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg></a><a href="https://www.linkedin.com/in/victor-vasques-chagas" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" class="transition hover:-translate-y-0.5 hover:text-blue-600"><svg viewBox="0 0 24 24" fill="currentColor" role="img" aria-hidden="true" class="size-5"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path></svg></a></div></div></footer>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/SiteFooter.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const SiteFooter = Object.assign(_sfc_main, { __name: "SiteFooter" });

export { SiteHeader as S, __nuxt_component_0 as _, useScrollReveal as a, SiteFooter as b, useLocale as u };
//# sourceMappingURL=SiteFooter-CWM2p8XQ.mjs.map
