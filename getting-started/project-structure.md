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

#### Rotas dinâmicas
<table>
	<tr>
		<td>[folder]</td>
		<td>Segmento de rota dinâmica</td>
	</tr>
	<tr>
		<td>[...folder]</td>
		<td>Segmentos catch-all</td>
	</tr>
	<tr>
		<td>[[...folder]]</td>
		<td>Segmentos de captura opcionais</td>
	</tr>
</table>
	
#### Grupos de rotas e pastas particulares
<table>
	<tr>
		<td>(folder)</td>
		<td>Agrupe rotas sem afetar o roteamento</td>
	</tr>
	<tr>
		<td>_folder</td>
		<td>Opte a pasta e todos os segmentos filhos fora do roteamento</td>
	</tr>
</table>
	
#### Rotas paralelas e interceptadas

<table>
	<tr>
		<td>@folder</td>
		<td>Slot nomeado</td>
	</tr>
	<tr>
		<td>(.)folder</td>
		<td>Interceptar o mesmo nível</td>
	</tr>
	<tr>
		<td>(..)folder</td>
		<td>Interceptar um nível acima</td>
	</tr>
	<tr>
		<td>(..)(..)folder</td>
		<td>Intercepte dois níveis acima</td>
	</tr>
	<tr>
		<td>(...)folder</td>
		<td>Interceptar da raiz</td>
	</tr>
</table>
	
#### Convenções de arquivos de metadados

**Ícones de aplicativos**
<table>
	<tr>
		<td>favicon</td>
		<td>.ico</td>
		<td>Arquivo Favicon</td>
	</tr>
	<tr>
		<td>icon</td>
		<td>.ico .jpg .jpeg .png .svg</td>
		<td>Arquivo de ícone do aplicativo</td>
	</tr>
	<tr>
		<td>icon</td>
		<td>.js .ts .tsx</td>
		<td>Ícone de aplicativo gerado</td>
	</tr>
	<tr>
		<td>apple-icon</td>
		<td>.jpg .jpeg, .png</td>
		<td>Arquivo de ícone do aplicativo Apple</td>
	</tr>
	<tr>
		<td>apple-icon</td>
		<td>.js .ts .tsx</td>
		<td>Ícone de aplicativo Apple gerado</td>
	</tr>
</table>
		
**Imagens abertas de gráficos e Twitter**
<table>
	<tr>
		<td>opengraph-image</td>
		<td>.jpg .jpeg .png .gif</td>
		<td>Abrir arquivo de imagem de gráfico</td>
	</tr>
	<tr>
		<td>opengraph-image</td>
		<td>.js .ts .tsx</td>
		<td>Imagem gerada de gráfico aberto</td>
	</tr>
	<tr>
		<td>twitter-image</td>
		<td>.jpg .jpeg .png .gif</td>
		<td>Arquivo de imagem do Twitter</td>
	</tr>
	<tr>
		<td>twitter-image</td>
		<td>.js .ts .tsx</td>
		<td>Imagem gerada do Twitter</td>
	</tr>
</table>

**SEO**

<table>
	<tr>
		<td>sitemap</td>
		<td>.xml</td>
		<td>Arquivo de mapa do site</td>
	</tr>
	<tr>
		<td>sitemap</td>
		<td>.js .ts</td>
		<td>Mapa do site gerado</td>
	</tr>
	<tr>
		<td>robots</td>
		<td>.txt</td>
		<td>Arquivo de robôs</td>
	</tr>
	<tr>
		<td>robots</td>
		<td>.js .ts</td>
		<td>Arquivo de robôs gerados</td>
	</tr>
</table>
		
### Convenções de roteamento para `pages`

#### Arquivos especiais

<table>
	<tr>
		<td>_app</td>
		<td>.js .jsx .tsx</td>
		<td>Aplicativo personalizado</td>
	</tr>
	<tr>
		<td>_document</td>
		<td>.js .jsx .tsx</td>
		<td>Documento personalizado</td>
	</tr>
	<tr>
		<td>_error</td>
		<td>.js .jsx .tsx</td>
		<td>Página de erro personalizada</td>
	</tr>
	<tr>
		<td>404</td>
		<td>.js .jsx .tsx</td>
		<td>404 Página de erro</td>
	</tr>
	<tr>
		<td>500</td>
		<td>.js .jsx .tsx</td>
		<td>500 Página de erro</td>
	</tr>
</table>

### Rotas

#### Convenção de pasta		

<table>
	<tr>
		<td>index</td>
		<td>.js .jsx .tsx</td>
		<td>Página inicial</td>
	</tr>
	<tr>
		<td>folder/index</td>
		<td>.js .jsx .tsx</td>
		<td>Página aninhada</td>
	</tr>
</table>

#### Convenção de arquivo

<table>
	<tr>
		<td>index</td>
		<td>.js .jsx .tsx</td>
		<td>Página inicial</td>
	</tr>
	<tr>
		<td>file</td>
		<td>.js .jsx .tsx</td>
		<td>Página aninhada</td>
	</tr>
</table>

  
### Rotas dinâmicas

#### Convenção de pasta

<table>
	<tr>
		<td>[folder]/index</td>
		<td>.js .jsx .tsx</td>
		<td>Segmento de rota dinâmica</td>
	</tr>
	<tr>
		<td>[...folder]/index</td>
		<td>.js .jsx .tsx</td>
		<td>Segmentos catch-all</td>
	</tr>
	<tr>
		<td>[[...folder]]/index</td>
		<td>.js .jsx .tsx</td>
		<td>Segmentos de captura opcionais</td>
	</tr>
</table>

#### Convenção de arquivo

<table>
	<tr>
		<td>[file]</td>
		<td>.js .jsx .tsx</td>
		<td>Segmento de rota dinâmica</td>
	</tr>
	<tr>
		<td>[...file]</td>
		<td>.js .jsx .tsx</td>
		<td>Segmentos catch-all</td>
	</tr>
	<tr>
		<td>[[...file]]</td>
		<td>.js .jsx .tsx</td>
		<td>Segmentos de captura opcionais</td>
	</tr>
</table>
