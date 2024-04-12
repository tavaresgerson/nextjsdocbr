---
título: Estrutura do projeto Next.js
description: Uma lista de convenções de pastas e arquivos em um projeto Next.js
---

Esta página fornece uma visão geral da estrutura do projeto de um aplicativo Next.js. Abrange arquivos e pastas de nível superior, arquivos de configuração e convenções de roteamento nos diretórios `app` e `pages`.

Clique nos nomes dos arquivos e pastas para saber mais sobre cada convenção.

## Pastas de nível superior

Pastas de nível superior são usadas para organizar o código e os ativos estáticos do seu aplicativo.

<img
    alt="Rotear segmentos para segmentos de caminho"
    src="/assets/top-level-folders.avif"
/>

| Pasta                                                                     | Descrição                         |
|---------------------------------------------------------------------------|-----------------------------------|
| [`app`](/docs/app/building-your-application/routing)                      | Roteador de aplicativos           |
| [`páginas`](/docs/pages/construindo-sua-aplicação/routing)                | Roteador de páginas               |
| [`public`](/docs/app/building-your-application/optimizing/static-assets)  | Ativos estáticos a servir         |
| [`src`](/docs/app/building-your-application/configurando/src-directory)   | Pasta de origem do aplicativo opcional |

## Arquivos de nível superior

Arquivos de nível superior são usados ​​para configurar seu aplicativo, gerenciar dependências, executar middleware, integrar ferramentas de monitoramento e definir variáveis ​​de ambiente.

| Arquivo                                                                                    |  Descrição                               |
|--------------------------------------------------------------------------------------------|------------------------------------------|
| **Next.js**                                                                                |                                          |
| [`next.config.js`](/docs/app/api-reference/next-config-js)                                 | Arquivo de configuração para Next.js |
| [`package.json`](/docs/getting-started/installation#manual-installation) | Dependências e scripts do projeto |
| [`instrumentation.ts`](/docs/app/building-your-application/optimizing/instrumentation) | Arquivo OpenTelemetria e Instrumentação |
| [`middleware.ts`](/docs/app/building-your-application/routing/middleware) | Next.js solicita middleware |
| [`.env`](/docs/app/building-your-application/configurando/variáveis-de-ambiente) | Variáveis ​​de ambiente |
| [`.env.local`](/docs/app/building-your-application/configurando/variáveis-de-ambiente) | Variáveis ​​de ambiente locais |
| [`.env.production`](/docs/app/building-your-application/configurando/variáveis-de-ambiente) | Variáveis ​​do ambiente de produção |
| [`.env.development`](/docs/app/building-your-application/configurando/variáveis-de-ambiente) | Variáveis ​​do ambiente de desenvolvimento |
| [`.eslintrc.json`](/docs/app/building-your-application/configurando/eslint) | Arquivo de configuração para ESLint |
| `.gitignore` | Arquivos e pastas Git a serem ignorados |
| `next-env.d.ts` | Arquivo de declaração TypeScript para Next.js |
| `tsconfig.json` | Arquivo de configuração para TypeScript |
| `jsconfig.json` | Arquivo de configuração para JavaScript |

## Convenções de roteamento `app`

As convenções de arquivo a seguir são usadas para definir rotas e manipular metadados no [`app` roteador](/docs/app).

### Arquivos de roteamento

| Arquivo   | Extensão | Descrição |
|-------------------------------------------------------------------------------|-------------------|----------------------------|
| [`layout`](/docs/app/api-reference/file-conventions/layout) | `.js` `.jsx` `.tsx` | Disposição |
| [`page`](/docs/app/api-reference/file-conventions/page) | `.js` `.jsx` `.tsx` | Página |
| [`loading`](/docs/app/api-reference/file-conventions/loading) | `.js` `.jsx` `.tsx` | Carregando IU |
| [`not-found`](/docs/app/api-reference/file-conventions/not-found) | `.js` `.jsx` `.tsx` | UI não encontrada |
| [`error`](/docs/app/api-reference/file-conventions/error) | `.js` `.jsx` `.tsx` | Erro na IU |
| [`global-error`](/docs/app/api-reference/file-conventions/error#global-errorjs) | `.js` `.jsx` `.tsx` | IU de erro global |
| [`route`](/docs/app/api-reference/file-conventions/route) | `.js` `.ts` | Ponto de extremidade da API |
| [`template`](/docs/app/api-reference/file-conventions/template) | `.js` `.jsx` `.tsx` | Layout re-renderizado |
| [`default`](/docs/app/api-reference/file-conventions/default) | `.js` `.jsx` `.tsx` | Página alternativa de rota paralela |

### Rotas aninhadas

| Pasta | Descrição |
|----------------------------------------------------------------------------|--------------------|
| [`folder`](/docs/app/building-your-application/routing#route-segments) | Segmento de rota |
| [`folder/folder`](/docs/app/building-your-application/routing#nested-routes) | Segmento de rota aninhado |

### Rotas Dinâmicas

| Pasta | Descrição |
|---------------------------------------------------------------------------------------------------------|--------------------------------|
| [`[folder]`](/docs/app/building-your-application/routing/dynamic-routes#convention) | Segmento de rota dinâmica |
| [`[...folder]`](/docs/app/building-your-application/routing/dynamic-routes#catch-all-segments) | Segmento de rota abrangente |
| [`[[...folder]]`](/docs/app/building-your-application/routing/dynamic-routes#optional-catch-all-segments) | Segmento de rota abrangente opcional |

### Rotear grupos e pastas privadas

| Pasta | Descrição |
|-----------------------------------------------------------------------------------|------------------------------------------------|
| [`(folder)`](/docs/app/building-your-application/routing/route-groups#convention) | Agrupar rotas sem afetar o roteamento |
| [`_folder`](/docs/app/building-your-application/routing/colocation#private-folders) | Optar pasta e todos os segmentos filhos fora do roteamento |

### Rotas Paralelas e Interceptadas

| Pasta | Descrição |
|----------------------------------------------------------------------------------------------|--------------------------|
| [`@folder`](/docs/app/building-your-application/routing/parallel-routes#slots) | Slot nomeado |
| [`(.)folder`](/docs/app/building-your-application/routing/intercepting-routes#convention) | Interceptar mesmo nível |
| [`(..)folder`](/docs/app/building-your-application/routing/intercepting-routes#convention) | Interceptar um nível acima |
| [`(..)(..)folder`](/docs/app/building-your-application/routing/intercepting-routes#convention) | Interceptar dois níveis acima |
| [`(...)folder`](/docs/app/building-your-application/routing/intercepting-routes#convention) | Interceptar da raiz |

### Convenções de arquivos de metadados

#### Ícones de aplicativos

| Nome | Extensão | Descrição |
|-------------------------------------------------------------|-----------------------------------|------------------------|
| [`favicon`](/docs/app/api-reference/file-conventions/metadata/app-icons#favicon) | `.ico` | Arquivo favicon |
| [`icon`](/docs/app/api-reference/file-conventions/metadata/app-icons#icon) | `.ico` `.jpg` `.jpeg` `.png` `.svg` | Arquivo de ícone do aplicativo |
| [`icon`](/docs/app/api-reference/file-conventions/metadata/app-icons#generate-icons-using-code-js-ts-tsx) | `.js` `.ts` `.tsx` | Ícone do aplicativo gerado |
| [`apple-icon`](/docs/app/api-reference/file-conventions/metadata/app-icons#apple-icon) | `.jpg` `.jpeg`, `.png` | Arquivo de ícone do aplicativo Apple |
| [`apple-icon`](/docs/app/api-reference/file-conventions/metadata/app-icons#generate-icons-using-code-js-ts-tsx) | `.js` `.ts` `.tsx` | Ícone do aplicativo Apple gerado |

#### Open Graph e imagens do Twitter

| Tipo | Extensão | Descrição |
|-------------------------------------------------------------------------|----------------------------|--------------------------|
| [`opengraph-image`](/docs/app/api-reference/file-conventions/metadata/opengraph-image#opengraph-image) | `.jpg` `.jpeg` `.png` `.gif` | Abra o arquivo de imagem do gráfico |
| [`opengraph-image`](/docs/app/api-reference/file-conventions/metadata/opengraph-image#generate-images-using-code-js-ts-tsx) | `.js` `.ts` `.tsx` | Imagem de gráfico aberto gerada |
| [`twitter-image`](/docs/app/api-reference/file-conventions/metadata/opengraph-image#twitter-image) | `.jpg` `.jpeg` `.png` `.gif` | Arquivo de imagem do Twitter |
| [`twitter-image`](/docs/app/api-reference/file-conventions/metadata/opengraph-image#generate-images-using-code-js-ts-tsx) | `.js` `.ts` `.tsx` | Imagem gerada no Twitter |

#### SEO

| Nome | Extensão | Descrição |
|---------------------------------------------------------------------------------------------------|-----------|---------------------|
| [`sitemap`](/docs/app/api-reference/file-conventions/metadata/sitemap#sitemap-files-xml)          | `.xml`    | Arquivo de mapa do site |
| [`sitemap`](/docs/app/api-reference/file-conventions/metadata/sitemap#generating-a-sitemap-using-code-js-ts) | `.js` `.ts` | Mapa do site gerado |
| [`robots`](/docs/app/api-reference/file-conventions/metadata/robots#static-robotstxt) | `.txt` | Arquivo de robôs |
| [`robots`](/docs/app/api-reference/file-conventions/metadata/robots#generate-a-robots-file) | `.js` `.ts` | Arquivo de robôs gerado |

## Convenções de roteamento `pages`

As convenções de arquivo a seguir são usadas para definir rotas no [roteador `pages`](/docs/pages).

### Arquivos Especiais

| Arquivo | Extensão | Descrição             |
|-------------------------------------------------------------------|-------------------|-----------------|
| [`_app`](/docs/pages/building-your-application/routing/custom-app) | `.js` `.jsx` `.tsx` | Aplicativo personalizado |
| [`_document`](/docs/pages/building-your-application/routing/custom-document) | `.js` `.jsx` `.tsx` | Documento personalizado |
| [`_error`](/docs/pages/building-your-application/routing/custom-error#more-advanced-error-page-customizing) | `.js` `.jsx` `.tsx` | Página de erro personalizada |
| [`404`](/docs/pages/building-your-application/routing/custom-error#404-page) | `.js` `.jsx` `.tsx` | Página de erro 404 |
| [`500`](/docs/pages/building-your-application/routing/custom-error#500-page) | `.js` `.jsx` `.tsx` | Página de erro 500 |

### Rotas

| Arquivo | Extensão | Descrição |
|--------------------------------------------------|-------------------|-----------|
| **Convenção de pastas** | | |
| [`index`](/docs/pages/building-your-application/routing/pages-and-layouts#index-routes) | `.js` `.jsx` `.tsx` | Página inicial |
| [`pasta/índice`](/docs/pages/building-your-application/routing/pages-and-layouts#index-routes) | `.js` `.jsx` `.tsx` | Página aninhada |
| **Convenção de arquivo** | | |
| [`index`](/docs/pages/building-your-application/routing/pages-and-layouts#index-routes) | `.js` `.jsx` `.tsx` | Página inicial |
| [`arquivo`](/docs/pages/building-your-application/routing/pages-and-layouts) | `.js` `.jsx` `.tsx` | Página aninhada |

### Rotas Dinâmicas

| Nome | Extensão | Descrição |
|---------------------------------------------------------------|-------------------|--------------------------------|
| **Convensão de pasta**                                        |                   |                                |
| [`[folder]/index`](/docs/pages/building-your-application/routing/dynamic-routes) | `.js` `.jsx` `.tsx` | Segmento de rota dinâmica |
| [`[...folder]/index`](/docs/pages/building-your-application/routing/dynamic-routes#catch-all-segments) | `.js` `.jsx` `.tsx` | Segmento de rota abrangente |
| [`[[...folder]]/index`](/docs/pages/building-your-application/routing/dynamic-routes#optional-catch-all-segments) | `.js` `.jsx` `.tsx` | Segmento de rota abrangente opcional |
| **Convensão de arquivos**                                     |                   |                                 |
| [`[file]`](/docs/pages/building-your-application/routing/dynamic-routes) | `.js` `.jsx` `.tsx` | Segmento de rota dinâmica |
| [`[...file]`](/docs/pages/building-your-application/routing/dynamic-routes#catch-all-segments) | `.js` `.jsx` `.tsx` | Segmento de rota abrangente |
| [`[[...file]]`](/docs/pages/building-your-application/routing/dynamic-routes#optional-catch-all-segments) | `.js` `.jsx` `.tsx` | Segmento de rota abrangente opcional |
