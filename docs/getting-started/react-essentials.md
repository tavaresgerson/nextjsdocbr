# React Essentials

Para criar aplicativos com o Next.js, ele ajuda a se familiarizar com os recursos mais recentes do React, como os Componentes do Servidor. Esta página analisará as diferenças entre os componentes do servidor e do cliente, quando usá-los e os padrões recomendados.

Se você é novo no React, também recomendamos que leia a [documentação do React](https://react.dev/learn). Aqui estão alguns grandes recursos para o aprendizado:

* [Tutorial do react](https://react.dev/learn/tutorial-tic-tac-toe)
* [Pensando em react](https://react.dev/learn/thinking-in-react)
* [Aprenda o react](https://react.dev/learn/describing-the-ui)

## Componentes do servidor

Os componentes de servidor e cliente permitem que os desenvolvedores criem aplicativos que abrangem o servidor e o cliente, combinando a rica interatividade dos aplicativos do lado do cliente com o desempenho aprimorado da renderização tradicional do servidor.

### Pensando em componentes de servidor
Semelhante à forma como o React mudou a maneira como pensamos sobre a construção de UIs, os Componentes do React Server introduzem um novo modelo mental para a construção de aplicativos híbridos que alavancam [o servidor e cliente](https://nextjs.org/docs/app/building-your-application/rendering#rendering-environments).

Em vez do react, renderizando todo o seu aplicativo do lado do cliente (como no caso de aplicativos de página única), O React agora oferece a flexibilidade de escolher onde renderizar seus componentes com base em sua finalidade.

Por exemplo, considere uma [página](https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#pages) na sua aplicação:

![image](https://github.com/tavaresgerson/nextjsdocbr/assets/22455192/abe1197b-13ec-4b0c-a960-67bde3754978)

Se dividirmos a página em componentes menores, você notará que a maioria dos componentes não é interativa e pode ser renderizada no servidor como Componentes do Servidor. Para peças menores de interface interativa, podemos pontualmente interagir nos Componentes do cliente. Isso está alinhado com a abordagem Next.js server-first.

### Por que componentes de servidor?
Então, você pode estar pensando, por que Componentes do servidor? Quais são as vantagens de usá-los em relação aos componentes do cliente?

Os componentes do servidor permitem que os desenvolvedores aproveitem melhor a infraestrutura do servidor. Por exemplo, você pode mover a busca de dados para o servidor, mais perto do seu banco de dados, e manter grandes dependências que anteriormente afetariam o tamanho do pacote JavaScript do cliente no servidor, levando a um desempenho aprimorado. Os Componentes do servidor fazem com que a gravação de um aplicativo React seja semelhante ao PHP ou Ruby on Rails, mas com o poder e a flexibilidade do React e o modelo de componentes para modelar a interface do usuário.

Com os componentes do servidor, a carga inicial da página é mais rápida e o tamanho do pacote JavaScript do lado do cliente é reduzido. O tempo de execução base do cliente é armazenável em cache e previsível em tamanho e faz com que não aumente à medida que sua aplicação cresce. O JavaScript extra é adicionado apenas para a interatividade do lado do cliente e usada em seu aplicativo através do [Componentes do cliente](https://nextjs.org/docs/getting-started/react-essentials#client-components).

Quando uma rota é carregada com Next.js, o HTML inicial é renderizado no servidor. Este HTML é então progressivamente aprimorado no navegador, permitindo que o cliente assuma o aplicativo e adicione interatividade, carregando de forma assíncrona o tempo de execução do Next.js e React do lado do cliente.

Para facilitar a transição para os Componentes do Servidor, todos os componentes dentro do [Roteador de aplicativos](https://nextjs.org/docs/app/building-your-application/routing#the-app-router) são componentes de servidor por padrão, incluindo [arquivos especiais](https://nextjs.org/docs/app/building-your-application/routing#file-conventions) e [componentes localizados](https://nextjs.org/docs/app/building-your-application/routing#colocation). Isso permite adotá-los automaticamente sem trabalho extra e obter um ótimo desempenho imediatamente. Você também pode optar por componentes do cliente usando o 'diretiva `'use client'`.

## Componentes do cliente

Os componentes do cliente permitem adicionar interatividade do lado do cliente ao seu aplicativo. Em Next.js, eles são pré-renderizado no servidor e hidratado no cliente. Você pode pensar nos componentes do cliente como componentes no Roteador de páginas sempre funcionou.

#### A diretiva "usar cliente"
A `diretiva "use client"` é uma convenção para declarar um limite entre um módulo de Servidor e Componente do Cliente.

```ts
// app/counter.tsx

'use client'
 
import { useState } from 'react'
 
export default function Counter() {
  const [count, setCount] = useState(0)
 
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  )
}
```

![image](https://github.com/tavaresgerson/nextjsdocbr/assets/22455192/ce642a34-1857-4b85-a5b0-269ebbbcf842)

`"use client"` fica entre o servidor e código do cliente. É colocado na parte superior de um arquivo, acima das importações, para definir o ponto dee corte em que cruza o limite do servidor apenas para a parte do cliente. Uma vez que `"use client"` é definido em um arquivo, todos os outros módulos importados para ele, incluindo componentes filhos, são considerados parte do pacote do cliente.

Como os componentes do servidor são o padrão, todos os componentes fazem parte do gráfico do módulo Componente do servidor, a menos que sejam definidos ou importados em um módulo que comece com a diretiva `"use client"`.

> **É bom saber:**
> * É garantido que os componentes no visuais do módulo Component do servidor sejam renderizados apenas no servidor.
> * Os componentes no gráfico do módulo Componente do cliente são renderizados principalmente no cliente, mas com o Next.js, eles também podem ser pré-renderizados no servidor e hidratados no cliente.
> * A diretiva `"use client"` deve ser definida no topo de um arquivo antes de qualquer importação.
> * `"use client"` não precisa ser definido em todos os arquivos. O limite do módulo Cliente precisa ser definido apenas uma vez, no "ponto de entrada", para que todos os módulos importados sejam considerados um Componente do Cliente.

#### Quando usar componentes de servidor e cliente?
Para simplificar a decisão entre o Servidor e os Componentes do Cliente, recomendamos o uso de Componentes do Servidor (padrão no app diretório) até que você tenha um caso de uso para um componente do cliente.

Esta tabela resume os diferentes casos de uso para componentes de servidor e cliente:

| O que você precisa fazer?                                                               | Componente do servidor   | Componente do cliente  |
|-----------------------------------------------------------------------------------------|--------------------------|------------------------|
| Buscar dados.          		                                                              | ✅                       | ❌                     |
| Acesse recursos de back-end (diretamente)  		                                          | ✅                       | ❌                     |
| Mantenha informações confidenciais no servidor (acessando tokens, chaves de API, etc.)	| ✅                       | ❌                     |
| Mantenha grandes dependências no servidor/Reduza o JavaScript do lado do cliente	      | ✅                       | ❌                     |
| Adicione ouvintes de interatividade e eventos (`onClick(), `onChange()`, etc.)          | ❌                       | ✅                     |
| Use efeitos de estado e ciclo de vida (`useState()`, `useReducer()`, etc.)        	    | ❌                       | ✅                     |
| Use APIs somente no navegador		                                                        | ❌                       | ✅                     |
| Use ganchos personalizados que dependem de estado, efeitos ou APIs somente do navegador	| ❌                       | ✅                     |
| Usar [Componentes da classe de react](https://react.dev/reference/react/Component)      | ❌                       | ✅                     |

### Padrões

#### Movendo componentes do cliente para as Leaves
Para melhorar o desempenho do seu aplicativo, recomendamos mover os Componentes do Cliente para as Leaves da sua árvore de componentes sempre que possível.

Por exemplo, você pode ter um layout que possui elementos estáticos (por exemplo, logotipo, links, etc ) e uma barra de pesquisa interativa que usa o estado.

Em vez de tornar todo o layout um componente do cliente, mova a lógica interativa para um componente do cliente (por exemplo: `<SearchBar />`) e mantenha seu layout como um componente do servidor. Isso significa que você não precisa enviar todo o componente Javascript do layout para o cliente.

```ts
// app/layout.tsx

// SearchBar é um Client Component
import SearchBar from './searchbar'
// Logo é um Server Component
import Logo from './logo'
 
// Layout is a Server Component by default
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <nav>
        <Logo />
        <SearchBar />
      </nav>
      <main>{children}</main>
    </>
  )
}
```

### Compondo componentes de cliente e servidor
Os componentes do servidor e do cliente podem ser combinados na mesma árvore de componentes.

Nos bastidores, o React lida com a renderização da seguinte maneira:

No servidor, renderizações de reação tudo Componentes do servidor antes enviando o resultado para o cliente.
Isso inclui componentes do servidor aninhados dentro dos componentes do cliente.
Os componentes do cliente encontrados durante esta etapa são ignorados.
No cliente, o React renderiza componentes do cliente e slots em o resultado renderizado dos Componentes do servidor, mesclando o trabalho realizado no servidor e no cliente.
Se algum componente do servidor estiver aninhado dentro de um componente do cliente, o conteúdo renderizado será colocado corretamente no componente do cliente.
