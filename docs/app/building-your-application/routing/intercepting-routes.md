# Interceptando Rotas
A interceptação de rotas permite carregar uma rota de outra parte da sua aplicação dentro do layout atual. Este paradigma de roteamento pode ser útil quando você deseja exibir o conteúdo de uma rota sem que o usuário mude para um contexto diferente.

Por exemplo, ao clicar em uma foto em um feed, você pode exibir a foto em um modal, sobrepondo o feed. Nesse caso, Next.js intercepta a rota `/photo/123`, mascara a URL e a sobrepõe em `/feed`.

![image](https://github.com/tavaresgerson/nextjsdocbr/assets/22455192/1a678a19-9f56-482d-b042-2d74d3ae34e2)

No entanto, ao navegar até a foto clicando em um URL compartilhável ou atualizando a página, a página inteira da foto deverá ser renderizada em vez do modal. Nenhuma interceptação de rota deve ocorrer.

![image](https://github.com/tavaresgerson/nextjsdocbr/assets/22455192/e047dc9b-5888-44e3-8cf5-61569684ce24)

## Convenção
As rotas de interceptação podem ser definidas com a convenção `(..)`, que é semelhante à convenção de caminho relativo `../` mas para segmentos.

Você pode usar:
* `(.)` para combinar segmentos no mesmo nível
* `(..)` para combinar segmentos um nível acima
* `(..)(..)` para combinar segmentos dois níveis acima
* `(...)` para corresponder aos segmentos do diretório raiz do aplicativo

Por exemplo, você pode interceptar o segmento de foto de dentro do segmento de feed criando um diretório `(..)` de fotos.

![image](https://github.com/tavaresgerson/nextjsdocbr/assets/22455192/4cbb4f18-f8bd-4f43-95e6-a01d76438b22)

Observe que a convenção `(..)` é baseada em segmentos de rota, não no sistema de arquivos.

## Exemplos

### Modais
Rotas de interceptação podem ser usadas junto com [rotas paralelas](/docs/app/building-your-application/routing/parallel-routes.md) para criar modais.

Usar esse padrão para criar modais supera alguns desafios comuns ao trabalhar com modais, permitindo:

* Tornar o conteúdo modal compartilhável por meio de um URL
* Preservar o contexto quando a página for atualizada, em vez de fechar o modal
* Fechar o modal na navegação para trás em vez de ir para a rota anterior
* Reabrir o modal na navegação para frente

![image](https://github.com/tavaresgerson/nextjsdocbr/assets/22455192/2182d65d-d052-4461-886c-e168fe91b530)

> No exemplo acima, o caminho para o segmento da foto pode usar o matcher `(..)`, pois `@modal` é um slot e não um segmento. Isso significa que a rota da foto está apenas um nível de segmento acima, apesar de estar dois níveis do sistema de arquivos acima.

Outros exemplos podem incluir a abertura de um modal de login em uma barra de navegação superior e ao mesmo tempo ter uma página `/login` dedicada ou a abertura de um carrinho de compras em um modal lateral.

[Veja um exemplo](https://github.com/vercel-labs/nextgram) de modais com Rotas Interceptadas e Paralelas.
