# Estrutura do projeto Next.js

Esta página fornece uma visão geral da estrutura de arquivos e pastas de um projeto Next.js. Ele abrange arquivos e pastas de nível superior, arquivos de configuração e convenções de roteamento dentro dos diretórios `app` e `pages`.

### Arquivos de nível superior

<table>
  <tr>
    <td colspan="2">
      <strong>Next.js</strong>
    </td>
  </tr>
  <tr>
    <td>next.config.js</td>
    <td>Arquivo de configuração para Next.js</td>
  </tr>
  <tr>
    <td>
      middleware.ts
    </td>
    <td>
      Next.js solicita os middlewares
    </td>
  </tr>
  <tr>
    <td>instrumentation.ts</td>
    <td>Telemetria e Instrumentações</td>
  </tr>
  <tr>
    <td>.env</td>
    <td>Variáveis de ambiente</td>
  </tr>
  <tr>
    <td>.env.local</td>
    <td>Variáveis de ambiente local</td>
  </tr>
  <tr>
    <td>.env.production</td>
    <td>Variáveis do ambiente de produção</td>
  </tr>
  <tr>
    <td>.env.development</td>
    <td>Variáveis do ambiente de desenvolvimento</td>
  </tr>
  <tr>
    <td>.next-env.d.ts</td>
    <td>Arquivo de declaração TypeScript para Next.js</td>
  </tr>
  <tr>
    <td colspan="2">Ecossistema</td>
  </tr>
  <tr>
    <td>package.json</td>
    <td>Dependências e scripts do projeto</td>
  </tr>
  <tr>
    <td>.gitignore</td>
    <td>Git arquivos e pastas para ignorar</td>
  </tr>
  <tr>
    <td>tsconfig.json</td>
    <td>Arquivo de configuração para TypeScript</td>
  </tr>
  <tr>
    <td>jsconfig.json</td>
    <td>Arquivo de configuração para JavaScript</td>
  </tr>
  <tr>
    <td>.eslintrc.json</td>
    <td>Arquivo de configuração para ESLint</td>
  </tr>
</table>
	
### Pastas de nível superior

<table>
  <tr>
    <td>app</td>
    <td>Roteador de aplicativos</td>
  </tr>
  <tr>
    <td>pages</td>
    <td>Roteador de páginas</td>
  </tr>
  <tr>
    <td>public</td>
    <td>Ativos estáticos a serem atendidos</td>
  </tr>
  <tr>
    <td>src</td>
    <td>Pasta de origem do aplicativo opcional</td>
  </tr>
</table>

### Convenções de roteamento do `app` 

#### Arquivos de roteamento

<table>
  <tr>
    <td>layout</td>
    <td>.js .jsx .tsx</td>
    <td>Layout</td>
  </tr>
  <tr>
    <td>page</td>
    <td>.js .jsx .tsx</td>
    <td>Página</td
  </tr>
  <tr>
    <td>loading</td>
    <td>.js .jsx .tsx</td>
    <td>Carregando UI</td>
  </tr>
  <tr>
    <td>not-found</td>
    <td>.js .jsx .tsx</td>
    <td>UI não encontrada</td>
  </tr>
  <tr>
    <td>error</td>
    <td>.js .jsx .tsx</td>
    <td>Erro na interface do usuário</td>
  </tr>
  <tr>
    <td>global-error</td>
    <td>.js .jsx .tsx</td>
    <td>UI de erro global</td>
  </tr>
  <tr>
    <td>route</td>
    <td>.js .ts</td>
    <td>Endpoint da API</td>
  </tr>
  <tr>
    <td>template</td>
    <td>.js .jsx .tsx</td>
    <td>layout</td>
  </tr>
  <tr>
    <td>default</td>
    <td>.js .jsx .tsx</td>
    <td>Página de fallback da rota paralela</td>
  </tr>
</table>

#### Rotas aninhadas

<table>
  <tr>
    <td>folder</td>
    <td>Segmento de rota</td>
  </tr>
	<tr>
    <td>folder/folder</td>
    <td>Segmento de rota aninhado</td>
  </tr>
</table>
