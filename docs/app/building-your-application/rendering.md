# Renderização

A renderização converte o código que você escreve em interfaces de usuário. React e Next.js permitem criar aplicativos web híbridos onde partes do seu código podem ser renderizadas no servidor ou no cliente. Esta seção ajudará você a entender as diferenças entre esses ambientes de renderização, estratégias e tempos de execução.

## Fundamentos
Para começar, é útil estar familiarizado com três conceitos básicos da web:

- Os ambientes em que o código do seu aplicativo pode ser executado: o servidor e o cliente.
- O ciclo de vida de solicitação-resposta que é iniciado quando um usuário visita ou interage com seu aplicativo.
- O limite da rede que separa o código do servidor e do cliente.

### Renderizando Ambientes
Existem dois ambientes onde as aplicações web podem ser renderizadas: o cliente e o servidor.

![image](https://github.com/tavaresgerson/nextjsdocbr/assets/22455192/af8b0c61-ea62-48bb-a14d-51df0d39d3c7)

- O cliente refere-se ao navegador no dispositivo de um usuário que envia uma solicitação a um servidor para obter o código do seu aplicativo. Em seguida, transforma a resposta do servidor em uma interface de usuário.
- O servidor refere-se ao computador em um data center que armazena o código do seu aplicativo, recebe solicitações de um cliente e envia de volta uma resposta apropriada.

Historicamente, os desenvolvedores tiveram que usar diferentes linguagens (por exemplo, JavaScript, PHP) e estruturas ao escrever código para o servidor e o cliente. Com React, os desenvolvedores podem usar a mesma linguagem (JavaScript) e a mesma estrutura (por exemplo, Next.js ou a estrutura de sua escolha). Essa flexibilidade permite escrever código perfeitamente para ambos os ambientes, sem alternância de contexto.

No entanto, cada ambiente tem seu próprio conjunto de capacidades e restrições. Portanto, o código que você escreve para o servidor e o cliente nem sempre é o mesmo. Existem certas operações (por exemplo, busca de dados ou gerenciamento do estado do usuário) que são mais adequadas para um ambiente do que para outro.

Compreender essas diferenças é fundamental para usar React e Next.js de maneira eficaz. Abordaremos as diferenças e os casos de uso com mais detalhes nas páginas Componentes de [Servidor](/docs/app/building-your-application/rendering/server-components.md) e [Cliente](/docs/app/building-your-application/rendering/client-components.md). Por enquanto, vamos continuar construindo nossa base.

## Ciclo de vida de solicitação-resposta
Em termos gerais, todos os sites seguem o mesmo ciclo de vida de solicitação-resposta:

1. **Ação do usuário:** o usuário interage com uma aplicação web. Pode ser clicar em um link, enviar um formulário ou digitar um URL diretamente na barra de endereço do navegador.
2. **Solicitação HTTP:** O cliente envia uma solicitação HTTP ao servidor que contém as informações necessárias sobre quais recursos estão sendo solicitados, qual método está sendo usado (por exemplo, GET, POST) e dados adicionais, se necessário.
3. **Servidor:** O servidor processa a solicitação e responde com os recursos apropriados. Este processo pode levar algumas etapas, como roteamento, busca de dados, etc.
4. **Resposta HTTP:** Após processar a solicitação, o servidor envia uma resposta HTTP de volta ao cliente. Esta resposta contém um código de status (que informa ao cliente se a solicitação foi bem-sucedida ou não) e recursos solicitados (por exemplo, HTML, CSS, JavaScript, ativos estáticos, etc.).
5. **Cliente:** O cliente analisa os recursos para renderizar a interface do usuário.
6. **Ação do usuário:** Depois que a interface do usuário é renderizada, o usuário pode interagir com ela e todo o processo é reiniciado.

Uma parte importante da construção de uma aplicação web híbrida é decidir como dividir o trabalho no ciclo de vida e onde colocar o limite da rede.

## Limite da rede
No desenvolvimento web, o Limite da Rede é uma linha conceitual que separa os diferentes ambientes. Por exemplo, o cliente e o servidor, ou o servidor e o armazenamento de dados.

No React, você escolhe onde colocar o limite da rede cliente-servidor onde fizer mais sentido.

Nos bastidores, o trabalho é dividido em duas partes: o **gráfico do módulo cliente** e o **gráfico do módulo servidor**. O gráfico do módulo do servidor contém todos os componentes renderizados no servidor e o gráfico do módulo cliente contém todos os componentes renderizados no cliente.

Pode ser útil pensar nos gráficos de módulos como uma representação visual de como os arquivos do seu aplicativo dependem uns dos outros.

Você pode usar a convenção `"use client"` do React para definir o limite. Há também uma convenção `“use server”`, que diz ao React para fazer algum trabalho computacional no servidor enquanto estiver no cliente.

## Construindo Aplicativos Híbridos
Ao trabalhar nesses ambientes, é útil pensar no fluxo do código no seu aplicativo como unidirecional. Em outras palavras, durante uma resposta, o código do seu aplicativo flui em uma direção: do servidor para o cliente.

Se precisar acessar o servidor a partir do cliente, envie uma nova solicitação ao servidor em vez de reutilizar a mesma solicitação. Isso torna mais fácil entender onde renderizar seus componentes e onde colocar o limite da rede.

Na prática, esse modelo incentiva os desenvolvedores a pensarem primeiro no que desejam executar no servidor, antes de enviar o resultado ao cliente e tornar a aplicação interativa.

Este conceito ficará mais claro quando observarmos como você pode [intercalar componentes de cliente e servidor](/docs/app/building-your-application/rendering/composition-patterns.md) na mesma árvore de componentes.
