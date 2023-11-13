# Componentes do servidor

Os componentes do React Server permitem que você escreva UI que pode ser renderizada e opcionalmente armazenada em cache no servidor. No Next.js, o trabalho de renderização é dividido por segmentos de rota para permitir streaming e renderização parcial, e há três estratégias diferentes de renderização de servidor:

- Renderização estática
- Renderização Dinâmica
- Streaming

Esta página explicará como funcionam os componentes do servidor, quando você pode usá-los e as diferentes estratégias de renderização do servidor.

## Benefícios da renderização de servidor
Existem alguns benefícios em fazer o trabalho de renderização no servidor, incluindo:

- **Busca de dados:** os componentes do servidor permitem mover a busca de dados para o servidor, mais perto de sua fonte de dados. Isso pode melhorar o desempenho, reduzindo o tempo necessário para buscar os dados necessários para a renderização e a quantidade de solicitações que o cliente precisa fazer.
- **Segurança:** os componentes do servidor permitem manter dados confidenciais e lógica no servidor, como tokens e chaves de API, sem o risco de expô-los ao cliente.
- **Cache:** Ao renderizar no servidor, o resultado pode ser armazenado em cache e reutilizado em solicitações subsequentes e entre usuários. Isso pode melhorar o desempenho e reduzir custos, reduzindo a quantidade de renderização e busca de dados feita em cada solicitação.
- **Tamanhos de pacotes:** os componentes do servidor permitem manter grandes dependências que anteriormente afetariam o tamanho do pacote JavaScript do cliente no servidor. Isso é benéfico para usuários com Internet mais lenta ou dispositivos menos potentes, pois o cliente não precisa baixar, analisar e executar nenhum JavaScript para componentes de servidor.
- **Carregamento inicial da página e [primeira pintura de conteúdo (FCP)](https://web.dev/fcp/):** No servidor, podemos gerar HTML para permitir que os usuários visualizem a página imediatamente, sem esperar que o cliente baixe, analise e execute o JavaScript necessário para renderizar a página.
- **Otimização de mecanismos de pesquisa e compartilhamento de redes sociais:** O HTML renderizado pode ser usado por bots de mecanismos de pesquisa para indexar suas páginas e bots de redes sociais para gerar visualizações de cartões sociais para suas páginas.
- **Streaming:** os componentes do servidor permitem dividir o trabalho de renderização em partes e transmiti-los para o cliente assim que estiverem prontos. Isso permite que o usuário veja partes da página mais cedo, sem ter que esperar que a página inteira seja renderizada no servidor.

## Usando componentes de servidor em Next.js
Por padrão, Next.js usa componentes de servidor. Isso permite que você implemente automaticamente a renderização do servidor sem configuração adicional e você pode optar por usar componentes de cliente quando necessário; consulte [Componentes de cliente](/docs/app/building-your-application/rendering/client-components.md).

## Como os componentes do servidor são renderizados?
No servidor, Next.js usa APIs do React para orquestrar a renderização. O trabalho de renderização é dividido em partes: por segmentos de rota individuais e [Limites de Suspense](https://react.dev/reference/react/Suspense).

Cada pedaço é renderizado em duas etapas:

1. O React renderiza os componentes do servidor em um formato de dados especial chamado **React Server Component Payload (RSC Payload)**.
2. O Next.js usa as instruções RSC Payload e Client Component JavaScript para renderizar HTML no servidor.

Então, no cliente:

1. O HTML é usado para mostrar imediatamente uma visualização rápida e não interativa da rota - isto é apenas para o carregamento inicial da página.
2. A carga útil dos componentes do React Server é usada para reconciliar as árvores dos componentes do cliente e do servidor e atualizar o DOM.
3. As instruções JavaScript são usadas para [hidratar](https://react.dev/reference/react-dom/client/hydrateRoot) os componentes do cliente e tornar o aplicativo interativo.

> **O que é a carga útil do componente React Server (RSC)?**
>
> O RSC Payload é uma representação binária compacta da árvore renderizada de componentes do React Server. É usado pelo React no cliente para atualizar o DOM do navegador. A carga útil RSC contém:
> - O resultado renderizado dos componentes do servidor
> - Espaços reservados para onde os componentes do cliente devem ser renderizados e referências aos seus arquivos JavaScript
> - Quaisquer adereços passados de um componente de servidor para um componente de cliente

## Estratégias de renderização de servidor
Existem três subconjuntos de renderização de servidor: Estático, Dinâmico e Streaming.

### Renderização estática (padrão)
Com a renderização estática, as rotas são renderizadas no momento da construção ou em segundo plano após a revalidação dos dados. O resultado é armazenado em cache e pode ser enviado para uma Content Delivery Network (CDN). Essa otimização permite compartilhar o resultado do trabalho de renderização entre usuários e solicitações do servidor.

A renderização estática é útil quando uma rota possui dados que não são personalizados para o usuário e podem ser conhecidos no momento da construção, como uma postagem de blog estática ou uma página de produto.

### Renderização Dinâmica
Com a renderização dinâmica, as rotas são renderizadas para cada usuário no momento da solicitação.

A renderização dinâmica é útil quando uma rota possui dados personalizados para o usuário ou possui informações que só podem ser conhecidas no momento da solicitação, como cookies ou parâmetros de pesquisa da URL.

> **Rotas Dinâmicas com Dados em Cache**
>
> Na maioria dos sites, as rotas não são totalmente estáticas ou dinâmicas – é um espectro. Por exemplo, você pode ter uma página de comércio eletrônico que usa dados de produtos armazenados em cache que são revalidados em um intervalo, mas também possui dados de clientes personalizados e não armazenados em cache.
>
> Em Next.js, você pode ter rotas renderizadas dinamicamente que possuem dados armazenados em cache e não armazenados em cache. Isso ocorre porque a carga útil e os dados do RSC são armazenados em cache separadamente. Isso permite que você opte pela renderização dinâmica sem se preocupar com o impacto no desempenho da busca de todos os dados no momento da solicitação.
>
> Saiba mais sobre o [cache de rota completa](/docs/app/building-your-application/caching.md) e o [cache de dados](/docs/app/building-your-application/caching.md).

### Mudando para renderização dinâmica
Durante a renderização, se uma função dinâmica ou solicitação de dados sem cache for descoberta, Next.js mudará para renderizar dinamicamente toda a rota. Esta tabela resume como as funções dinâmicas e o cache de dados afetam se uma rota é renderizada estática ou dinamicamente:


| Funções Dinâmicas    | Dados           | Rota                            |
|----------------------|-----------------|---------------------------------|
| Nâo                  | cache           | Renderizado estaticamente       |
| Sim                  | cache           | Renderizado dinamicamente       |
| Não                  | Sem cache       | Renderizado dinamicamente       |
| Sim                  | Sem cache       | Renderizado dinamicamente       |

Na tabela acima, para que uma rota seja totalmente estática, todos os dados devem ser armazenados em cache. No entanto, você pode ter uma rota renderizada dinamicamente que use buscas de dados armazenados em cache e não armazenados em cache.

Como desenvolvedor, você não precisa escolher entre renderização estática e dinâmica, pois Next.js escolherá automaticamente a melhor estratégia de renderização para cada rota com base nos recursos e APIs usados. Em vez disso, você escolhe quando armazenar em cache ou revalidar dados específicos e pode optar por transmitir partes de sua IU.

Funções Dinâmicas
As funções dinâmicas dependem de informações que só podem ser conhecidas no momento da solicitação, como os cookies do usuário, os cabeçalhos das solicitações atuais ou os parâmetros de pesquisa da URL. Em Next.js, essas funções dinâmicas são:

- `cookies()` e `headers()`: usá-los em um componente de servidor fará com que toda a rota opte pela renderização dinâmica no momento da solicitação.
- `useSearchParams()`:
  - Nos componentes do cliente, ele ignorará a renderização estática e, em vez disso, renderizará todos os componentes do cliente até o limite Suspense do pai mais próximo no cliente.
  - Recomendamos agrupar o componente cliente que usa `useSearchParams()` em um limite `<Suspense/>`. Isso permitirá que qualquer componente do cliente acima dele seja renderizado estaticamente. veja este [Exemplo](/docs/app/api-reference/functions/use-search-params.md).
- `searchParams`: usar a propriedade [Pages](/docs/app/api-reference/file-conventions/page.md) ativará a renderização dinâmica da página no momento da solicitação.
 
O uso de qualquer uma dessas funções ativará toda a rota para renderização dinâmica no momento da solicitação.

### Streaming

![image](https://github.com/tavaresgerson/nextjsdocbr/assets/22455192/8da92120-516f-4fae-a45a-e8caa0fa7a8c)

O streaming permite renderizar progressivamente a UI a partir do servidor. O trabalho é dividido em partes e transmitido ao cliente assim que fica pronto. Isso permite que o usuário veja partes da página imediatamente, antes que todo o conteúdo seja renderizado.

![image](https://github.com/tavaresgerson/nextjsdocbr/assets/22455192/2450f9d6-79af-48af-b815-6cc5c5c7cb91)

O streaming é integrado ao Next.js App Router por padrão. Isso ajuda a melhorar o desempenho inicial do carregamento da página, bem como a interface do usuário que depende de buscas de dados mais lentas que bloqueariam a renderização de toda a rota. Por exemplo, comentários na página de um produto.

Você pode iniciar o streaming de segmentos de rota usando loading.js e componentes de UI com [React Suspense](/docs/app/building-your-application/routing/loading-ui-and-streaming.md). Consulte a seção [Carregando UI e Streaming](/docs/app/building-your-application/routing/loading-ui-and-streaming.md) para obter mais informações.
