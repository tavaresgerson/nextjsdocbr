# Next.js

## O que é o Next.js?
Next.js é uma estrutura para a criação de aplicativos da web.

Com o Next.js, você pode criar interfaces de usuário usando componentes React. E também o Next.js fornece estrutura, recursos e otimizações adicionais para o seu aplicativo.

Sob o capô, o Next.js também abstrai e configura automaticamente ferramentas para você, como: agrupar, compilar e muito mais. Isso permite que você se concentre na criação de seu aplicativo, em vez de gastar tempo configurando ferramentas.

Seja você um desenvolvedor individual ou parte de uma equipe maior, o Next.js pode ajudá-lo a criar aplicativos da Web interativos, dinâmicos e rápidos.

### Principais Características
Alguns dos principais recursos do Next.js incluem:

| Característica     |  Descrição  |
|--------------------|-------------|
| Roteamento         | Um roteador baseado em sistema de arquivos criado sobre os Componentes do servidor que suporta layouts, roteamento aninhado, estados de carregamento, tratamento de erros e muito mais. |
| Renderização       | Renderização do lado do cliente e do servidor com componentes de cliente e servidor. Otimizado ainda mais com o Static and Dynamic Rendering no servidor com o Next.js. Streaming nos tempos de execução do Edge e Node.js. |
| fetch              | Busca de dados simplificados com suporte ao async/await em componentes react e API `fetch()` alinhada com o React e a Web Platform.
| Estilo             | Suporte para seus métodos de estilo preferidos, incluindo módulos CSS, Tailwind CSS e CSS-in-JS |
| Otimizações        | Otimizações de imagem, fontes e scripts para melhorar os principais sinais da Web e a experiência do usuário do seu aplicativo. |
| Typescript         |	Suporte aprimorado ao TypeScript, com melhor verificação de tipo e compilação mais eficiente, além de plug-in TypeScript personalizado e verificador de tipo. |
| Referência da API  | Atualizações no design da API em Next.js. Consulte a Seção de Referência da API para obter novas APIs. |

### Como usar esses documentos
As seções e páginas dos documentos são organizadas sequencialmente, do básico ao avançado, para que você possa segui-las passo a passo ao criar seu aplicativo Next.js. No entanto, você pode lê-los em qualquer ordem ou pular para as páginas que se aplicam ao seu caso de uso.

Para começar, faça o checkout da [Instalação](/docs/getting-started/installation.md). Se você é novo em React or Server Components, recomendamos a leitura da página [React Essentials](/docs/getting-started/react-essentials.md).

### Conhecimento necessários
Embora nossos documentos sejam projetados para serem amigáveis ao iniciante, precisamos estabelecer uma linha de base para que os documentos possam manter o foco na funcionalidade Next.js. Garantiremos links para a documentação relevante sempre que introduzirmos um novo conceito.

Para aproveitar ao máximo nossos documentos, é recomendável que você tenha um entendimento básico de HTML, CSS e React. Se você precisar aprimorar suas habilidades do React, confira estes recursos:

* [Reagir: documentação oficial do reação](https://react.dev/learn)
* [React Essentials](/docs/getting-started/react-essentials.md)
 

## Sumário
* Introdução
  * [Instalação](/docs/getting-started/installation.md)
  * [Estrutura do projeto](/docs/getting-started/project-structure.md)
  * [React Essentials](/docs/getting-started/react-essentials.md)
* [Construindo sua aplicação usando App Router](/docs/app/building-your-application/building-your-application.md)
  * [Roteamento](/docs/app/building-your-application/routing.md)
    * [Definindo Rotas](/docs/app/building-your-application/routing/defining-routes.md)
    * [Páginas e Layouts](/docs/app/building-your-application/routing/pages-and-layouts.md)
    * [Ligação e Navegação](/docs/app/building-your-application/routing/linking-and-navigating.md)
    * [Grupos de rotas](/docs/app/building-your-application/routing/route-groups.md)
    * [Rotas Dinâmicas](/docs/app/building-your-application/routing/dynamic-routes.md)
    * [Carregando UI e Streaming](/docs/app/building-your-application/routing/loading-ui-and-streaming.md)
    * [Manipulação de erros](/docs/app/building-your-application/routing/error-handling.md)
    * [Rotas Paralelas](/docs/app/building-your-application/routing/parallel-routes.md)
    * [Interceptando Rotas](/docs/app/building-your-application/routing/intercepting-routes.md)
    * [Manipuladores de rota](/docs/app/building-your-application/routing/route-handlers.md)
    * [Middleware](/docs/app/building-your-application/routing/middleware.md)
    * [Organização do Projeto](/docs/app/building-your-application/routing/colocation.md)
    * [Internacionalização](/docs/app/building-your-application/routing/internationalization.md)
  * Rendering
    * Static and Dynamic
    * Edge and Node.js Runtimes
  * Data Fetching
    * Fetching
    * Caching
    * Revalidating
    * Server Actions
  * Styling
    * CSS Modules
    * Tailwind CSS
    * CSS-in-JS
    * Sass
  * Optimizing
    * Images
    * Fonts
    * Scripts
    * Metadata
    * Static Assets
    * Lazy Loading
    * Analytics
    * OpenTelemetry
    * Instrumentation
  * Configuring
    * TypeScript
    * ESLint
    * Environment Variables
    * Absolute Imports and Module Path Aliases
    * MDX
    * src Directory
    * Draft Mode
  * Deploying
    * Static Exports
  * Upgrading
    * Codemods
    * App Router Migration
