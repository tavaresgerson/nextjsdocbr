# Fundamentos do roteamento

O esqueleto de cada aplicativo é o seu roteamento. Esta página apresentará a você os conceitos fundamentais de roteamento para a web e como lidar com o roteamento em Next.js.

## Terminologia
Primeiro, você verá esses termos sendo usados em toda a documentação. Aqui está uma referência rápida:

![image](https://github.com/tavaresgerson/nextjsdocbr/assets/22455192/d7689116-0376-4211-9552-ed8a805da69d)

* **Árvore**: Uma convenção para visualizar uma estrutura hierárquica. Por exemplo, uma árvore de componentes com componentes pai e filho, uma estrutura de pastas etc.
* **Subárvore**: Parte de uma árvore, começando com uma nova raiz (primeiro) e terminando nas folhas (último).
* **Raiz**: O primeiro nó em uma árvore ou subárvore, como um layout raiz.
* **Folha**: Nós em uma subárvore que não tem filhos, como o último segmento em um caminho de URL.

![image](https://github.com/tavaresgerson/nextjsdocbr/assets/22455192/4effd0d6-1dfa-4b8a-b6db-c22df2d47631)

* **Segmento de URL**: Parte do caminho da URL delimitada por barras.
* **Caminho da URL**: Parte da URL que vem após o domínio (composto por segmentos).

  ## O Roteador `app`

Na versão 13, o Next.js introduziu um novo **Roteador de aplicativos** construído em Componentes do servidor react, que suporta layouts compartilhados, roteamento aninhado, estados de carregamento, tratamento de erros e muito mais.

O App Router funciona em um novo diretório chamado `app`. O diretório `app` funciona ao lado do diretório `pages` para permitir a adoção incremental. Isso permite que você opte por algumas rotas do seu aplicativo no novo comportamento, mantendo outras rotas no diretório `pages` para manter o comportamento anterior. Se o seu aplicativo usa o diretório `pages`, por favor, veja também a documentação de [Roteador de páginas](/docs/pages/building-your-application/routing.md).

> **É bom saber:** O roteador de aplicativos tem prioridade sobre o roteador de páginas. As rotas entre diretórios não devem ser resolvidas no mesmo caminho da URL e causarão um erro no tempo de construção para evitar um conflito.

![image](https://github.com/tavaresgerson/nextjsdocbr/assets/22455192/33d7ac0d-2442-48d1-8b16-f6ce4eff855d)

Por padrão, componentes dentro de `app` são [Componentes do servidor react](/docs/app/building-your-application/rendering/server-components.md). Essa é uma otimização de desempenho e permite adotá-las facilmente, e você também pode usar [Componentes do cliente](/docs/app/building-your-application/rendering/client-components.md).

> **Recomendação:** Confira a página do [Servidor](/docs/app/building-your-application/rendering/server-components.md) se você é novo no Server Components.

## Funções de pastas e arquivos

O Next.js usa um roteador baseado no sistema de arquivos em que:

* **Pastas** são usados para definir rotas. Uma rota é um único caminho de pastas aninhadas, seguindo a hierarquia do sistema de arquivos da pasta raiz até uma pasta final pasta de páginas isso inclui um arquivo `page.js`. Veja [Definindo rotas](/docs/app/building-your-application/routing/defining-routes.md).
* **Arquivos** são usados para criar interface do usuário exibida para um segmento de rota. Veja a seção [arquivos especiais](https://nextjs.org/docs/app/building-your-application/routing.md).

## Segmentos de rota
Cada pasta em uma rota representa um segmento de rota. Cada segmento de rota é mapeado para um correspondente segmento em um Caminho da URL.

![image](https://github.com/tavaresgerson/nextjsdocbr/assets/22455192/019b5659-53ae-4ec3-80df-6c7b27b21fdc)

## Rotas aninhadas
Para criar uma rota aninhada, você pode aninhar pastas umas dentro das outras. Por exemplo, você pode adicionar uma nova rota `/dashboard/settings` aninhando duas novas pastas no diretório `app`.

A rota `/dashboard/settings` é composta por três segmentos:

* `/`(Segmento raiz)
* `dashboard` (Segmento)
* `settings` (Segmento de páginas)


## Convenções de arquivo
O Next.js fornece um conjunto de arquivos especiais para criar interface do usuário com comportamento específico em rotas aninhadas:

|                    |                                                                   |  
|--------------------|-------------------------------------------------------------------|
| `layout`           |	UI compartilhada para um segmento e seus filhos                  |
| `page`             |	UI exclusiva de uma rota e tornar rotas acessíveis ao público    |
| `loading`          | Carregando interface do usuário para um segmento e seus filhos    |
| `not-found`        | UI não encontrada para um segmento e seus filhos                  |
| `error`            | Erro na interface do usuário de um segmento e seus filhos         |
| `global-error`     | UI de erro global                                                 |
| `route`            | Ponto final da API do lado do servidor                            |
| `template`         | UI de layout re-renderizada especializada                         |
| `default`          | UI de fallback para [Rotas paralelas](/docs/app/building-your-application/routing/parallel-routes.md) |

> **É bom saber:** extensões `.js`, `.jsx`, ou `.tsx` de arquivo podem ser usadas para arquivos especiais.

## Hierarquia de componentes

Os componentes react definidos em arquivos especiais de um segmento de rota são renderizados em uma hierarquia específica:

* `layout.js`
* `template.js`
* `error.js` (Limite de erro)
* `loading.js` (Limite de carregamento)
* `not-found.js` (Limite de erro)
* `page.js` ou `layout.js` aninhado

![image](https://github.com/tavaresgerson/nextjsdocbr/assets/22455192/cb032b78-33dd-45a9-b7eb-633e77def7d4)

Em uma rota aninhada, os componentes de um segmento serão aninhados por dentro dos componentes de seu segmento pai.

![image](https://github.com/tavaresgerson/nextjsdocbr/assets/22455192/23fe0c55-8ef2-44ab-a831-58e472b561ea)

## Colocação
Além de arquivos especiais, você tem a opção de colocar seus próprios arquivos (por exemplo componentes, estilos, testes, etc) nas pastas internas do diretório `app`.

Isso ocorre porque, enquanto as pastas definem rotas, apenas o conteúdo retornado por `page.js` ou `route.js` são endereçáveis publicamente.

![image](https://github.com/tavaresgerson/nextjsdocbr/assets/22455192/c3565970-19ec-41ea-905b-e3f1547423ed)

Saiba mais sobre [Organização e Colocação do Projeto](/docs/app/building-your-application/routing/colocation.md).

## Padrões avançados de roteamento

O App Router também fornece um conjunto de convenções para ajudá-lo a implementar padrões de roteamento mais avançados. Estes incluem:

* [**Rotas paralelas**](/docs/app/building-your-application/routing/parallel-routes.md): Permita mostrar simultaneamente duas ou mais páginas na mesma visualização que podem ser navegadas independentemente. Você pode usá-los para visualizações divididas que possuem sua própria subnavegação. Por exemplo. Painel.
* [**Interceptação de rotas**](/docs/app/building-your-application/routing/intercepting-routes.md): Permita interceptar uma rota e mostrá-la no contexto de outra rota. Você pode usá-los quando é importante manter o contexto da página atual. Por exemplo. Vendo todas as tarefas enquanto edita uma tarefa ou expande uma foto em um feed.

Esses padrões permitem criar UIs mais ricas e complexas, democratizando recursos historicamente complexos para equipes pequenas e desenvolvedores individuais implementarem.

## Próximos passos
Agora que você entende os fundamentos do roteamento no Next.js, siga os links abaixo para criar suas primeiras rotas:

#### [Definindo rotas](/docs/app/building-your-application/routing/defining-routes.md)
Aprenda a criar sua primeira rota no Next.js.

#### [Páginas e layouts](/docs/app/building-your-application/routing/pages-and-layouts.md)
Crie sua primeira página e layout compartilhado com o App Router.

#### [Ligação e navegação](/docs/app/building-your-application/routing/linking-and-navigating.md)
Aprenda como a navegação funciona no Next.js e como usar o componente Link e o gancho `useRouter`.

#### [Grupos de rotas](/docs/app/building-your-application/routing/route-groups.md)
Grupos de rotas podem ser usados para particionar seu aplicativo Next.js em diferentes seções.

#### [Rotas dinâmicas](/docs/app/building-your-application/routing/dynamic-routes.md)
Rotas dinâmicas podem ser usadas para gerar programaticamente segmentos de rota a partir de dados dinâmicos.

#### [Carregando interface do usuário e streaming](/docs/app/building-your-application/routing/loading-ui-and-streaming.md)
Criada sobre o Suspense, a interface do usuário de carregamento permite criar um fallback para segmentos de rota específicos e transmitir automaticamente o conteúdo à medida que se prepara.

#### [Tratamento de erros](/docs/app/building-your-application/routing/error-handling.md)
Lide com erros de tempo de execução envolvendo automaticamente segmentos de rota e seus filhos aninhados em um limite de erro de reação.

#### [Rotas paralelas](/docs/app/building-your-application/routing/parallel-routes.md)
Simultaneamente, renderize uma ou mais páginas na mesma visualização que pode ser navegada independentemente. Um padrão para aplicações altamente dinâmicas.

#### [Interceptação de rotas](/docs/app/building-your-application/routing/intercepting-routes.md)
Use rotas de interceptação para carregar uma nova rota dentro do layout atual enquanto mascara o URL do navegador, útil para padrões avançados de roteamento, como modais.

#### [Manipuladores de rota](/docs/app/building-your-application/routing/route-handlers.md)
Crie manipuladores de solicitações personalizados para uma determinada rota usando as APIs de solicitação e resposta da Web.

#### [Middleware](/docs/app/building-your-application/routing/middleware.md)
Aprenda a usar o Middleware para executar o código antes que uma solicitação seja concluída.

#### [Organização do Projeto](/docs/app/building-your-application/routing/colocation.md)
Aprenda a organizar seu projeto Next.js e coloque os arquivos.

#### [Internacionalização](/docs/app/building-your-application/routing/internationalization.md)
Adicione suporte para vários idiomas com roteamento internacionalizado e conteúdo localizado.
