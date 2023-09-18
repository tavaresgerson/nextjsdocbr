# Estrutura do projeto Next.js

Esta página fornece uma visão geral da estrutura de arquivos e pastas de um projeto Next.js. Ele abrange arquivos e pastas de nível superior, arquivos de configuração e convenções de roteamento dentro dos diretórios `app` e `pages`.

### Arquivos de nível superior

**Next.js**
|   	   									|								|
|-------------------------------------------------------------------------------|---------------------------------------------------------------|
| [next.config.js](https://nextjs.org/docs/app/api-reference/next-config-js)	| Arquivo de configuração para Next.js				|
| [middleware.ts](https://nextjs.org/docs/app/building-your-application/routing/middleware)  | Next.js solicita os middlewares			|
| [instrumentation.ts](https://nextjs.org/docs/app/building-your-application/optimizing/instrumentation) | Telemetria e Instrumentações		|
| [.env](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables)	| Variáveis de ambiente			|
| [.env.local](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables) | Variáveis de ambiente local		|
| [.env.production](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables) | Variáveis do ambiente de produção |
| [.env.development](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables) | Variáveis do ambiente de desenvolvimento |
| .next-env.d.ts											| Arquivo de declaração TypeScript para Next.js |

**Ecossistema**

|   	   									|								|
|-------------------------------------------------------------------------------|---------------------------------------------------------------|
| [package.json](https://nextjs.org/docs/getting-started/installation#manual-installation)	| Dependências e scripts do projeto		|
| .gitignore									| Git arquivos e pastas para ignorar				|
| tsconfig.json									| Arquivo de configuração para TypeScript			|
| jsconfig.json									| Arquivo de configuração para JavaScript			|
| [.eslintrc.json](https://nextjs.org/docs/app/building-your-application/configuring/eslint)	| Arquivo de configuração para ESLint		|


	
### Pastas de nível superior

|   	   									|								|
|-------------------------------------------------------------------------------|---------------------------------------------------------------|
| [app](https://nextjs.org/docs/app/building-your-application/routing)		| Roteador de aplicativos					|
| [pages](https://nextjs.org/docs/pages/building-your-application/routing)	| Roteador de páginas						|
| [public](https://nextjs.org/docs/getting-started/installation#create-the-public-folder) | Ativos estáticos a serem atendidos			|
| [src](https://nextjs.org/docs/app/building-your-application/configuring/src-directory)  | Pasta de origem do aplicativo opcional		|


### Convenções de roteamento do `app` 

#### Arquivos de roteamento

|   	   									|			|					|
|-------------------------------------------------------------------------------|-----------------------|---------------------------------------|
| [layout](https://nextjs.org/docs/app/api-reference/file-conventions/layout)	| .js .jsx .tsx		| Layout				|
| [page](https://nextjs.org/docs/app/api-reference/file-conventions/page)	| .js .jsx .tsx		| Página				|
| [loading](https://nextjs.org/docs/app/api-reference/file-conventions/loading) | .js .jsx .tsx		| Carregando UI				|
| [not-found](https://nextjs.org/docs/app/api-reference/file-conventions/not-found) | .js .jsx .tsx	| UI para rota não encontrada		|
| [error](https://nextjs.org/docs/app/api-reference/file-conventions/error)	| .js .jsx .tsx		| Erro na interface do usuário		|
| [global-error](https://nextjs.org/docs/app/api-reference/file-conventions/error#global-errorjs) | .js .jsx .tsx | UI de erro global		|
| [route](https://nextjs.org/docs/app/api-reference/file-conventions/route)	| .js .ts		| Endpoint da API			|
| [template](https://nextjs.org/docs/app/api-reference/file-conventions/template) | .js .jsx .tsx	| layout				|
| [default](https://nextjs.org/docs/app/api-reference/file-conventions/default) | .js .jsx .tsx		| Página de fallback da rota paralela	|

#### Rotas aninhadas
|											 |							|
|----------------------------------------------------------------------------------------|------------------------------------------------------|
| [folder](https://nextjs.org/docs/app/building-your-application/routing#route-segments) | Segmento de rota					|
| [folder/folder](https://nextjs.org/docs/app/building-your-application/routing#nested-routes) | Segmento de rota aninhado			|

#### Rotas dinâmicas

| Link                                                        | Descrição                |
| ----------------------------------------------------------- | ------------------------ |
| [[folder]](https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes#convention) | Segmento de rota dinâmica |
| [[...folder]](https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes) | Segmentos catch-all       |
| [[[...folder]]](https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes#optional-catch-all-segments) | Segmentos de captura opcionais |


#### Grupos de rotas e pastas particulares
| Link                                                                                               | Descrição                                                     |
| -------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| [(folder)](https://nextjs.org/docs/app/building-your-application/routing/route-groups#convention)  | Agrupe rotas sem afetar o roteamento                          |
| [_folder](https://nextjs.org/docs/app/building-your-application/routing/colocation#private-folders) | Opte a pasta e todos os segmentos filhos fora do roteamento    |
	
#### Rotas paralelas e interceptadas

| Link                                                                                                         | Descrição                |
| ------------------------------------------------------------------------------------------------------------ | ------------------------ |
| [@folder](https://nextjs.org/docs/app/building-your-application/routing/parallel-routes#convention)           | Slot nomeado             |
| [(.)folder](https://nextjs.org/docs/app/building-your-application/routing/intercepting-routes#convention)     | Interceptar o mesmo nível |
| [(..)folder](https://nextjs.org/docs/app/building-your-application/routing/intercepting-routes#convention)    | Interceptar um nível acima |
| [(..)(..)folder](https://nextjs.org/docs/app/building-your-application/routing/intercepting-routes#convention) | Intercepte dois níveis acima |
| [(...)folder](https://nextjs.org/docs/app/building-your-application/routing/intercepting-routes#convention)   | Interceptar da raiz      |
	
#### Convenções de arquivos de metadados

**Ícones de aplicativos**
| Link                                                                                                                                            | Extensões                 | Descrição                          |
| ----------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- | ---------------------------------- |
| [favicon](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/app-icons#favicon)                                                | .ico                      | Arquivo Favicon                     |
| [icon](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/app-icons#icon)                                                      | .ico .jpg .jpeg .png .svg | Arquivo de ícone do aplicativo      |
| [icon](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/app-icons#generate-icons-using-code-js-ts-tsx)                        | .js .ts .tsx              | Ícone de aplicativo gerado          |
| [apple-icon](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/app-icons#apple-icon)                                          | .jpg .jpeg, .png          | Arquivo de ícone do aplicativo Apple |
| [apple-icon](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/app-icons#generate-icons-using-code-js-ts-tsx)                  | .js .ts .tsx              | Ícone de aplicativo Apple gerado    |
		
**Imagens abertas de gráficos e Twitter**
| Link                                                                                                                                                    | Extensões                 | Descrição                              |
| ------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- | -------------------------------------- |
| [opengraph-image](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image#opengraph-image)                                   | .jpg .jpeg .png .gif      | Abrir arquivo de imagem de gráfico      |
| [opengraph-image](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image#generate-images-using-code-js-ts-tsx)              | .js .ts .tsx              | Imagem gerada de gráfico aberto         |
| [twitter-image](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image#twitter-image)                                     | .jpg .jpeg .png .gif      | Arquivo de imagem do Twitter            |
| [twitter-image](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image#twitter-image)                                     | .js .ts .tsx              | Imagem gerada do Twitter                |

**SEO**

| Link                                                                                                                        | Extensões        | Descrição                 |
| --------------------------------------------------------------------------------------------------------------------------- | ---------------- | ------------------------- |
| [sitemap](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap#static-sitemapxml)                     | .xml             | Arquivo de mapa do site    |
| [sitemap](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap#generate-a-sitemap)                     | .js .ts          | Mapa do site gerado        |
| [robots](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots#static-robotstxt)                         | .txt             | Arquivo de robôs           |
| [robots](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots#generate-a-robots-file)                   | .js .ts          | Arquivo de robôs gerados   |
		
### Convenções de roteamento para `pages`

#### Arquivos especiais

| Link                                                                                                                                             | Extensões        | Descrição                     |
| ------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------- | ----------------------------- |
| [_app](https://nextjs.org/docs/pages/building-your-application/routing/custom-app)                                                               | .js .jsx .tsx   | Aplicativo personalizado       |
| [_document](https://nextjs.org/docs/pages/building-your-application/routing/custom-document)                                                     | .js .jsx .tsx   | Documento personalizado        |
| [_error](https://nextjs.org/docs/pages/building-your-application/routing/custom-error#more-advanced-error-page-customizing)                       | .js .jsx .tsx   | Página de erro personalizada   |
| [404](https://nextjs.org/docs/pages/building-your-application/routing/custom-error#404-page)                                                     | .js .jsx .tsx   | 404 Página de erro             |
| [500](https://nextjs.org/docs/pages/building-your-application/routing/custom-error#500-page)                                                     | .js .jsx .tsx   | 500 Página de erro             |

### Rotas

#### Convenção de pasta		

| Link                                                                                                                                  | Extensões        | Descrição                  |
| ------------------------------------------------------------------------------------------------------------------------------------- | ---------------- | -------------------------- |
| [index](https://nextjs.org/docs/pages/building-your-application/routing/pages-and-layouts#index-routes)                                  | .js .jsx .tsx   | Página inicial             |
| [folder/index](https://nextjs.org/docs/pages/building-your-application/routing/pages-and-layouts#index-routes)                          | .js .jsx .tsx   | Página aninhada            |

#### Convenção de arquivo

| Link                                                                                                                                  | Extensões        | Descrição                  |
| ------------------------------------------------------------------------------------------------------------------------------------- | ---------------- | -------------------------- |
| [index](https://nextjs.org/docs/pages/building-your-application/routing/pages-and-layouts#index-routes)                               | .js .jsx .tsx   | Página inicial             |
| [file](https://nextjs.org/docs/pages/building-your-application/routing/pages-and-layouts)                                             | .js .jsx .tsx   | Página aninhada            |

  
### Rotas dinâmicas

#### Convenção de pasta

| Link                                                                                                                                                    | Extensões                 | Descrição                              |
| ------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- | -------------------------------------- |
| [[folder]/index](https://nextjs.org/docs/pages/building-your-application/routing/dynamic-routes)                                                         | .js .jsx .tsx             | Segmento de rota dinâmica              |
| [[...folder]/index](https://nextjs.org/docs/pages/building-your-application/routing/dynamic-routes#catch-all-segments)                                    | .js .jsx .tsx             | Segmentos catch-all                     |
| [[[...folder]]/index](https://nextjs.org/docs/pages/building-your-application/routing/dynamic-routes#optional-catch-all-segments)                        | .js .jsx .tsx             | Segmentos de captura opcionais          |

#### Convenção de arquivo

| Link                                                                                                                        | Extensões                 | Descrição                              |
| --------------------------------------------------------------------------------------------------------------------------- | ------------------------- | -------------------------------------- |
| [[file]](https://nextjs.org/docs/pages/building-your-application/routing/dynamic-routes)                                    | .js .jsx .tsx             | Segmento de rota dinâmica              |
| [[...file](https://nextjs.org/docs/pages/building-your-application/routing/dynamic-routes#catch-all-segments)]              | .js .jsx .tsx             | Segmentos catch-all                    |
| [[[...file]]](https://nextjs.org/docs/pages/building-your-application/routing/dynamic-routes#optional-catch-all-segments)   | .js .jsx .tsx             | Segmentos de captura opcionais         |
