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
