# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## SEO e publicação

### Configurar o domínio canônico

Defina `NUXT_PUBLIC_SITE_URL` no ambiente de build e runtime da Vercel, sem barra no final, por exemplo `https://seudominio.com.br`. A mesma origem é usada para canonical URLs, Open Graph, Twitter Cards, sitemap e robots.txt. O valor de fallback `https://example.com` existe apenas para desenvolvimento: **não publique até configurar o domínio real**. Em produção, valide que `www` e o domínio raiz redirecionam para a mesma versão canônica.

### Instalar dependências

Com acesso ao registry npm, na pasta `web`:

```bash
npm install
```

O projeto usa `@nuxtjs/sitemap` e `@nuxtjs/robots`, listados em `package.json`. `.npmrc` registra `legacy-peer-deps=true` porque a dependência já existente `@vercel/speed-insights` declara peer incompatível com a versão de `vue-router` usada pelo projeto. O comando sincroniza `package-lock.json`; envie ambos ao controle de versão. Para builds reproduzíveis na CI, use `npm ci` depois de atualizar e commitar o lockfile.

As rotas públicas `/`, `/sobre`, `/servicos` e `/contato` entram no sitemap. `/messages` recebe `noindex, nofollow`, é bloqueada no robots.txt e excluída do sitemap. A proteção real dessa área continua dependendo da autenticação do servidor; robots.txt não é controle de acesso.

### Auditoria rápida antes e depois do deploy

1. Rode `npm run build` e corrija qualquer erro de módulos/configuração.
2. Em produção, abra `/robots.txt` e confirme que a origem contém o sitemap e que `/messages` está disallow; abra `/sitemap.xml` e confirme URLs HTTPS no domínio canônico, sem `/messages` ou rotas duplicadas.
3. Use `curl -sL https://seudominio.com.br/` (ou “Exibir código-fonte” no navegador) e confirme que title, description, robots, canonical, `og:*`, Twitter Card e `lang` estão no HTML inicial, antes de executar JavaScript. Repita para cada rota pública e confirme canonical sem query string.
4. Verifique que cada URL responde com status apropriado, não contém `noindex` por engano, e que `/messages` tem `noindex`. Teste a renderização com o teste de resultados avançados e a inspeção de URL do Google Search Console.
5. No Search Console, valide a propriedade de domínio, envie `/sitemap.xml`, inspecione a home e as páginas principais, confira cobertura/indexação, canonical escolhido pelo Google, experiência mobile e Core Web Vitals após coleta de dados.
6. Valide imagem, título, descrição e URL dos compartilhamentos no Facebook Sharing Debugger, LinkedIn Post Inspector e Twitter/X Card Validator. Faça novo scrape após alterar previews em cache.
7. Confira favicon em `/favicon.ico`, HTTPS, redirecionamento para o host canônico, `lang="pt-BR"` (ou `en` quando o idioma for inglês) e ausência de erros de console/hidratação.

### Observações de auditoria

- A aplicação usa SSR no preset Vercel; mantenha os metadados em composables executados no setup das páginas para que sejam enviados no HTML renderizado no servidor.
- `useSiteSeo` centraliza title, description, robots, canonical, Open Graph e Twitter Cards. Atualize a descrição e a imagem social quando o conteúdo visual final estiver definido. A imagem padrão atual é `public/yu-gi-oh_foto.webp`; substitua por uma imagem de compartilhamento própria (idealmente 1200 × 630 px) antes da publicação.
- O seletor de idioma atual guarda preferência no `localStorage`, sem rotas separadas por idioma nem `hreflang`; buscadores recebem o idioma padrão português. Para páginas inglesas indexáveis, crie URLs distintas e implemente `hreflang`/canonicals por idioma.
- `@nuxtjs/robots` desativa indexação em ambientes não produtivos por padrão. Confirme o resultado da resposta no deploy final; não libere staging para indexação.
- A auditoria `npm audit` atual reportou 14 vulnerabilidades no conjunto de dependências (1 crítica, 11 altas, 1 moderada e 1 baixa), incluindo `@nuxt/devtools` (crítica) e `nuxt`, `@tiptap/core` e `prisma` (altas). Resolva/avalie os avisos e rode `npm audit` novamente antes da publicação; não apliquei atualizações automáticas porque algumas correções sugeridas envolvem mudanças de versão potencialmente incompatíveis.
