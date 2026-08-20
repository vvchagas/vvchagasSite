export interface LocalizedText {
  pt: string;
  en: string;
}

export interface Project {
  slug: string;
  title: string | LocalizedText;
  description: string | LocalizedText;
  longDescription: string | LocalizedText;
  tag: string | LocalizedText;
  icon: string;
  image?: string;
  highlights: (string | LocalizedText)[];
  stack: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export const rawProjects: Project[] = [
  {
    slug: "yu-gi-oh-api",
    title: {
      pt: "YU-GI-OH! API",
      en: "YU-GI-OH! API",
    },
    description: {
      pt: "Projeto com API de cartas do jogo YU-GI-OH!",
      en: "Project with YU-GI-OH! card game API",
    },
    longDescription: {
      pt: "O projeto YU-GI-OH! API é um sistema que consome e apresenta dados de cartas do jogo YU-GI-OH! de forma organizada e responsiva. O objetivo é oferecer uma experiência fluida e clara para quem deseja consultar informações das cartas, com foco em performance, semântica e navegação intuitiva.",
      en: "The YU-GI-OH! API project is a system that consumes and presents YU-GI-OH! card game data in an organized and responsive way. It aims to offer a fluid and clear experience for those who want to look up card information, focused on performance, semantics, and intuitive navigation.",
    },
    tag: {
      pt: "SITE",
      en: "SITE",
    },
    icon: "smart_toy",
    image: "/yu-gi-oh_foto.webp",
    highlights: [
      { pt: "Responsivo", en: "Responsive" },
      { pt: "Semântica", en: "Semantic" },
      { pt: "Estrutura clara", en: "Clear structure" },
    ],
    stack: ["Vue 3", "TypeScript", "Tailwind CSS", "API REST"],
    githubUrl: "https://github.com/vvchagas/YU-GI-OH",
  },
  {
    slug: "loja-do-seu-ze",
    title: {
      pt: "Loja do Seu Zé",
      en: "Seu Zé's Store",
    },
    description: {
      pt: "ERP com cobrança",
      en: "ERP with billing",
    },
    longDescription: {
      pt: "O projeto Loja do Seu Zé é um sistema ERP com foco em cobrança e gestão de vendas. O objetivo é centralizar o fluxo de pedidos, pagamentos e controle financeiro em uma interface simples e acessível, proporcionando performance e responsividade para o uso diário.",
      en: "The Seu Zé's Store project is an ERP system focused on billing and sales management. It centralizes the order, payment, and financial control flow in a simple and accessible interface, providing performance and responsiveness for daily use.",
    },
    tag: {
      pt: "SITE",
      en: "SITE",
    },
    icon: "storefront",
    image: "/loja-do-seu-ze.webp",
    highlights: [
      { pt: "Acessibilidade", en: "Accessibility" },
      { pt: "Responsividade", en: "Responsiveness" },
      { pt: "Performance", en: "Performance" },
    ],
    stack: ["HTML5", "CSS3", "SQL", "JavaScript", "PHP"],
    githubUrl: "https://github.com/vvchagas/loja-do-seu-ze",
  },
  {
    slug: "sige-sistema-de-emergencias",
    title: {
      pt: "SIGE - Sistema de Emergências",
      en: "SIGE - Emergency Management System",
    },
    description: {
      pt: "Sistema de gestão de ocorrências",
      en: "Incident management system",
    },
    longDescription: {
      pt: "O projeto SIGE é um sistema de gerenciamento de emergências desenvolvido como um projeto facultativo. Ele foi criado com o objetivo de fornecer uma solução eficiente para lidar com situações de emergência, permitindo que os usuários registrem, acompanhem e gerenciem incidentes de forma organizada. Desenvolvido com Vue 3, Tailwind CSS, C#, ASP.NET Core e Entity Framework.",
      en: "The SIGE project is an emergency management system developed as an optional project. It was created to provide an efficient solution for handling emergency situations, allowing users to register, track, and manage incidents in an organized manner. Built with Vue 3, Tailwind CSS, C#, ASP.NET Core, and Entity Framework.",
    },
    tag: {
      pt: "SITE",
      en: "SITE",
    },
    icon: "ambulance",
    image: "/SIGE.webp",
    highlights: [
      { pt: "Responsivo e semântico", en: "Responsive and semantic" },
      { pt: "UI clara para conversão", en: "Clear UI for conversion" },
      { pt: "Performance e acessibilidade", en: "Performance and accessibility" },
    ],
    stack: ["Vue 3", "Tailwind CSS", "C#", "ASP.NET Core", "Entity Framework"],
    githubUrl: "https://github.com/vvchagas/SIGE-Sistema-de-Emergencias",
  },
  {
    slug: "data-secreta",
    title: {
      pt: "Data Secreta",
      en: "Secret Date",
    },
    description: {
      pt: "Mini jogo de adivinhação de datas",
      en: "Date guessing mini game",
    },
    longDescription: {
      pt: "Data Secreta é um mini jogo de adivinhação de datas desenvolvido para projeto pessoal. O objetivo do jogo é desafiar os jogadores a adivinhar uma data secreta com base em dicas fornecidas. O jogo foi criado com foco em acessibilidade, garantindo que todos os usuários possam desfrutar da experiência de forma inclusiva. Além disso, o projeto priorizou a performance, proporcionando uma experiência rápida e fluida para os jogadores.",
      en: "Secret Date is a date-guessing mini game developed as a personal project. The goal of the game is to challenge players to guess a secret date based on provided clues. Built with accessibility in mind, ensuring an inclusive experience for all players with fast and fluid performance.",
    },
    tag: {
      pt: "GAME",
      en: "GAME",
    },
    icon: "calendar_month",
    image: "/DataSecreta.webp",
    highlights: [
      { pt: "Lógica de Programação", en: "Programming Logic" },
      { pt: "Mini jogo", en: "Mini game" },
      { pt: "Performance", en: "Performance" },
    ],
    stack: ["C#", "ASP.NET Core"],
    githubUrl: "https://github.com/vvchagas/DataSecreta",
  },
  // {
  //   slug: "nuvemshop-erp",
  //   title: {
  //     pt: "NuvemShop ERP",
  //     en: "NuvemShop ERP",
  //   },
  //   description: {
  //     pt: "Loja com integração ERP com a NuvemShop",
  //     en: "Store integrated with NuvemShop ERP system",
  //   },
  //   longDescription: {
  //     pt: "O projeto NuvemShop ERP é uma loja online desenvolvida com integração a um sistema ERP, utilizando a plataforma NuvemShop. O objetivo do projeto é fornecer uma solução completa para gerenciamento de vendas, estoque e processos logísticos, permitindo que os usuários tenham uma experiência de compra eficiente e organizada. Desenvolvido com Vue 3, Prisma, PostgreSQL, Tailwind CSS e TypeScript.",
  //     en: "The NuvemShop ERP project is an online store integrated with an ERP system using the NuvemShop platform. It provides a complete solution for sales, inventory, and logistics management, ensuring an efficient shopping experience. Built with Vue 3, Prisma, PostgreSQL, Tailwind CSS, and TypeScript.",
  //   },
  //   tag: {
  //     pt: "SITE",
  //     en: "SITE",
  //   },
  //   icon: "shopping_cart",
  //   image: "/erp.webp",
  //   highlights: [
  //     { pt: "UX clara", en: "Clear UX" },
  //     { pt: "API", en: "API" },
  //     { pt: "Fluxo de envio direto", en: "Direct shipping workflow" },
  //   ],
  //   stack: ["Vue 3", "Prisma", "PostgreSQL", "Tailwind CSS", "TypeScript"],
  //   githubUrl: "https://github.com/vvchagas/ERP-project",
  // },
];

export interface ResolvedProject {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  tag: string;
  icon: string;
  image?: string;
  highlights: string[];
  stack: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export function resolveText(text: string | LocalizedText, locale: "pt" | "en" = "pt"): string {
  if (typeof text === "string") return text;
  return text[locale] ?? text.pt;
}

export function getTranslatedProjects(locale: "pt" | "en" = "pt"): ResolvedProject[] {
  return rawProjects.map((p) => ({
    ...p,
    title: resolveText(p.title, locale),
    description: resolveText(p.description, locale),
    longDescription: resolveText(p.longDescription, locale),
    tag: resolveText(p.tag, locale),
    highlights: p.highlights.map((h) => resolveText(h, locale)),
  }));
}

export function getProjectBySlug(slug: string, locale: "pt" | "en" = "pt"): ResolvedProject | undefined {
  return getTranslatedProjects(locale).find((p) => p.slug === slug);
}

// Retrocompatibilidade
export const projects = getTranslatedProjects("pt");
