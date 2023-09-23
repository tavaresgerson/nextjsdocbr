# Carregando UI e Streaming

O arquivo especial `loading.js` ajuda a criar uma UI de carregamento significativa com [React Suspense](https://react.dev/reference/react/Suspense). Com esta convenção, você pode mostrar um estado de carregamento instantâneo do servidor enquanto o conteúdo de um segmento de rota é carregado. O novo conteúdo é trocado automaticamente assim que a renderização for concluída.

![image](https://github.com/tavaresgerson/nextjsdocbr/assets/22455192/9f26b6a3-5302-4379-896b-eb677c2abdab)

## Estados de carregamento instantâneo
Um estado de carregamento instantâneo é uma interface de usuário substituta que é mostrada imediatamente após a navegação. Você pode pré-renderizar indicadores de carregamento, como esqueletos e spinners, ou uma parte pequena, mas significativa, de telas futuras, como foto de capa, título, etc.

Crie um estado de carregamento adicionando um arquivo `loading.js` dentro de uma pasta.

![image](https://github.com/tavaresgerson/nextjsdocbr/assets/22455192/f7486457-c427-4cab-aa28-c81a741c7e3f)

```ts
// app/dashboard/loading.tsx

export default function Loading() {
  // Você pode adicionar qualquer UI dentro do Load, incluindo um Skeleton.
  return <LoadingSkeleton />
}
```

Na mesma pasta, `loading.js` será aninhado dentro de `layout.js`. Ele agrupará automaticamente o arquivo `page.js` e todos os filhos abaixo em um limite `<Suspense>`.

![image](https://github.com/tavaresgerson/nextjsdocbr/assets/22455192/749d2a95-593a-4a96-ab1d-1647ef902784)


> **Bom saber:**
> * A navegação é imediata, mesmo com roteamento centrado no servidor.
> * A navegação é interrompível, o que significa que a alteração de rotas não precisa esperar que o conteúdo da rota seja totalmente carregado antes de navegar para outra rota.
> * Os layouts compartilhados permanecem interativos enquanto novos segmentos de rota são carregados.

> **Recomendação:** Use a convenção `loading.js` para segmentos de rota (layouts e páginas), pois Next.js otimiza essa funcionalidade.

## Streaming com Suspense
Além de `loading.js`, você também pode criar manualmente um Suspense Limites para seus próprios componentes de UI. O App Router suporta streaming com [Suspense](https://react.dev/reference/react/Suspense) para [tempos de execução Node.js e Edge](/docs/app/building-your-application/rendering/edge-and-nodejs-runtimes.md).

### O que é streaming?
Para saber como o Streaming funciona no React e Next.js, é útil entender a **renderização do lado do servidor (SSR)** e suas limitações.

Com o SSR, há uma série de etapas que precisam ser concluídas antes que um usuário possa ver e interagir com uma página:

1. Primeiro, todos os dados de uma determinada página são buscados no servidor.
2. O servidor então renderiza o HTML da página.
3. O HTML, CSS e JavaScript da página são enviados ao cliente.
4. Uma interface de usuário não interativa é mostrada usando HTML e CSS gerados.
5. Por fim, o React hidrata a interface do usuário para torná-la interativa.

![image](https://github.com/tavaresgerson/nextjsdocbr/assets/22455192/8220e0f1-4767-462e-b095-2f01324c5de2)

Essas etapas são sequenciais e de bloqueio, o que significa que o servidor só pode renderizar o HTML de uma página depois que todos os dados forem obtidos. E, no cliente, o React só pode hidratar a IU depois que o código de todos os componentes da página for baixado.

SSR com React e Next.js ajuda a melhorar o desempenho de carregamento percebido, mostrando uma página não interativa ao usuário o mais rápido possível.

![image](https://github.com/tavaresgerson/nextjsdocbr/assets/22455192/39502907-246b-47a9-a170-c738d058dc5e)

No entanto, ainda pode ser lento, pois toda a busca de dados no servidor precisa ser concluída antes que a página possa ser mostrada ao usuário.

O **streaming** permite dividir o HTML da página em pedaços menores e enviar progressivamente esses pedaços do servidor para o cliente.

![image](https://github.com/tavaresgerson/nextjsdocbr/assets/22455192/4caa93c8-45a4-4f7e-bf11-2af3ebff291a)

Isso permite que partes da página sejam exibidas mais rapidamente, sem esperar que todos os dados sejam carregados antes que qualquer UI possa ser renderizada.

O streaming funciona bem com o modelo de componentes do React porque cada componente pode ser considerado um pedaço. Componentes que têm maior prioridade (por exemplo, informações do produto) ou que não dependem de dados podem ser enviados primeiro (por exemplo, layout), e o React pode iniciar a hidratação mais cedo. Componentes com prioridade mais baixa (por exemplo, avaliações, produtos relacionados) podem ser enviados na mesma solicitação do servidor após a obtenção de seus dados.

![image](https://github.com/tavaresgerson/nextjsdocbr/assets/22455192/46d5fc2b-99be-4b4e-9148-f77de28a48c0)

O streaming é particularmente benéfico quando você deseja evitar que longas solicitações de dados bloqueiem a renderização da página, pois pode reduzir o [tempo até o primeiro byte (TTFB)](https://web.dev/ttfb/) e a [primeira pintura com conteúdo (FCP)](https://web.dev/first-contentful-paint/). Também ajuda a [melhorar o tempo de interação (TTI)](https://developer.chrome.com/en/docs/lighthouse/performance/interactive/), especialmente em dispositivos mais lentos.

### Exemplo
`<Suspense>` funciona agrupando um componente que executa uma ação assíncrona (por exemplo, buscar dados), mostrando a UI substituta (por exemplo, esqueleto, spinner) enquanto isso está acontecendo e, em seguida, trocando seu componente assim que a ação for concluída.

```ts
// app/dashboard/page.tsx

import { Suspense } from 'react'
import { PostFeed, Weather } from './Components'
 
export default function Posts() {
  return (
    <section>
      <Suspense fallback={<p>Loading feed...</p>}>
        <PostFeed />
      </Suspense>
      <Suspense fallback={<p>Loading weather...</p>}>
        <Weather />
      </Suspense>
    </section>
  )
}
```

Ao usar o Suspense, você obtém os benefícios de:

1. **Streaming Server Rendering** - Renderização progressiva de HTML do servidor para o cliente.
2. **Hidratação Seletiva** - O React prioriza quais componentes tornar interativos primeiro com base na interação do usuário.

Para mais exemplos de Suspense e casos de uso, consulte a [documentação do React](https://react.dev/reference/react/Suspense).

### SEO
* Next.js aguardará a conclusão da busca de dados dentro de [`generateMetadata`](https://nextjs.org/docs/app/api-reference/functions/generate-metadata) antes de transmitir a IU para o cliente. Isso garante que a primeira parte de uma resposta transmitida inclua tags `<head>`.
* Como o streaming é renderizado pelo servidor, ele não afeta o SEO. Você pode usar a ferramenta [Mobile Friendly Test do Google](https://search.google.com/test/mobile-friendly) para ver como sua página aparece para os rastreadores da web do Google e visualizar o HTML serializado ([fonte](https://web.dev/rendering-on-the-web/#seo-considerations)).

### Códigos de status
Durante o streaming, um código de status 200 será retornado para sinalizar que a solicitação foi bem-sucedida.

O servidor ainda pode comunicar erros ou problemas ao cliente dentro do próprio conteúdo transmitido, por exemplo, ao usar redirecionamento ou notFound. Como os cabeçalhos de resposta já foram enviados ao cliente, o código de status da resposta não pode ser atualizado. Isso não afeta o SEO.
