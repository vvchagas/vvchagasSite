export interface Project {
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

// Preencha githubUrl/liveUrl com os links reais assim que publicar cada repositório.
export const projects: Project[] = [
  {
    slug: "SIGE-Sistema de Emergências",
    title: "SIGE - Sistema de Emergências",
    description: "Sistema de gestão de ocorrências",
    longDescription:
      "O projeto SIGE é um sistema de gerenciamento de emergências desenvolvido como um projeto facultativo. Ele foi criado com o objetivo de fornecer uma solução eficiente para lidar com situações de emergência, permitindo que os usuários registrem, acompanhem e gerenciem incidentes de forma organizada. Desenvolvido com Vue 3, Tailwind CSS, C#, ASP.NET Core e Entity Framework.",
    tag: "SITE",
    icon: "ambulance",
    image: "/SIGE.webp",
    highlights: ["Responsivo e semântico", "UI clara para conversão", "Performance e acessibilidade"],
    stack: ["Vue 3", "Tailwind CSS", "C#", "ASP.NET Core", "Entity Framework"],
    githubUrl: "https://github.com/vvchagas/SIGE-Sistema-de-Emergencias",
  },
  {
    slug: "Data Secreta",
    title: "Data Secreta",
    description: "Mini jogo de adivinhação de datas",
    longDescription:
      "Data Secreta é um mini jogo de adivinhação de datas desenvolvido para projeto pessoal. O objetivo do jogo é desafiar os jogadores a adivinhar uma data secreta com base em dicas fornecidas. O jogo foi criado com foco em acessibilidade, garantindo que todos os usuários possam desfrutar da experiência de forma inclusiva. Além disso, o projeto priorizou a performance, proporcionando uma experiência rápida e fluida para os jogadores. Em breve terá uma versão online para que todos possam jogar e se divertir com o desafio de adivinhar a data secreta!",
    tag: "GAME",
    icon: "calendar_month",
    image: "/DataSecreta.webp",
    highlights: ["Lógica de Programação", "Mini jogo", "Performance"],
    stack: ["C#", "ASP.NET Core"],
    githubUrl: "https://github.com/vvchagas/DataSecreta",
  },
  {
    slug: "Projeto com NuvemShop ERP",
    title: "NuvemShop ERP",
    description: "Loja com integração ERP com a nuvemShop",
    longDescription:
      "Formulário de contato direto ao ponto: poucos campos, validação clara e envio sem fricção. Os dados caem direto numa caixa de mensagens organizada por assunto.",
    tag: "SITE",
    icon: "shopping_cart",
    image: "/erp.webp",
    highlights: ["UX clara", "API", "Fluxo de envio direto"],
    stack: ["Vue3", "Prisma","PostegresSQL", "Tailwind CSS", "TypeScript"],
    githubUrl: "https://github.com/vvchagas/ERP-project",
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
