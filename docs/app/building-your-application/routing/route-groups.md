# Grupos de rotas

No diretório do aplicativo, as pastas aninhadas normalmente são mapeadas para caminhos de URL. No entanto, você pode marcar uma pasta como um Grupo de rotas para evitar que a pasta seja incluída na URL da rota.

Isso permite organizar seus segmentos de rota e arquivos de projeto em grupos lógicos sem afetar a estrutura do caminho da URL.

Os grupos de rotas são úteis para:

* Organizar rotas em grupos, por ex. por seção do site, intenção ou equipe.
* Habilitar [layouts aninhados](/docs/app/building-your-application/routing/pages-and-layouts.md) no mesmo nível de segmento de rota:
  * Criação de vários layouts aninhados no mesmo segmento, incluindo vários layouts raiz
  * Adicionar um layout a um subconjunto de rotas em um segmento comum
 
## Convenção
Um grupo de rotas pode ser criado colocando o nome de uma pasta entre parênteses: `(folderName)`

## Exemplos

### Organize rotas sem afetar o caminho da URL
Para organizar rotas sem afetar o URL, crie um grupo para manter juntas as rotas relacionadas. As pastas entre parênteses serão omitidas da URL (por exemplo, `(marketing)` ou `(shop)`).

![image](https://github.com/tavaresgerson/nextjsdocbr/assets/22455192/6a8d929d-efae-4250-88b0-399f06b07ffe)

Embora as rotas dentro de `(marketing)` e `(shop)` compartilhem a mesma hierarquia de URL, você pode criar um layout diferente para cada grupo adicionando um arquivo `layout.js` dentro de suas pastas.

![image](https://github.com/tavaresgerson/nextjsdocbr/assets/22455192/0d0350b5-05b5-439e-a530-749817cf09e1)

### Optando por segmentos específicos em um layout
Para incluir rotas específicas em um layout, crie um novo grupo de rotas (por exemplo, `(shop)`) e mova as rotas que compartilham o mesmo layout para o grupo (por exemplo, `account` e `cart`). As rotas fora do grupo não compartilharão o layout (por exemplo, `checkout`).

![image](https://github.com/tavaresgerson/nextjsdocbr/assets/22455192/135863d8-5aa9-4b17-91c5-65f1e71f59d8)

### Criando vários layouts raiz
Para criar vários layouts raiz, remova o arquivo `layout.js` de nível superior e adicione um arquivo `layout.js` dentro de cada grupo de rotas. Isso é útil para particionar um aplicativo em seções que possuem uma interface de usuário ou experiência completamente diferente. As tags `<html>` e `<body>` precisam ser adicionadas a cada layout raiz.

![image](https://github.com/tavaresgerson/nextjsdocbr/assets/22455192/017621aa-bdf6-4ab7-b2b2-2e83a7bd3f65)

No exemplo acima, tanto `(marketing)` quanto `(shop)` têm seu próprio layout raiz.

> **Bom saber:**
> * A nomeação de grupos de rotas não tem nenhum significado especial além da organização. Eles não afetam o caminho do URL.
> * As rotas que incluem um grupo de rotas não devem resolver para o mesmo caminho de URL que outras rotas. Por exemplo, como os grupos de rotas não afetam a estrutura da URL, `(marketing)/about/page.js` e `(shop)/about/page.js` resolveriam para `/about` e causariam um erro.
> * Se você usar vários layouts raiz sem um arquivo `layout.js` de nível superior, seu arquivo home `page.js` deverá ser definido em um dos grupos de rotas, por exemplo: `app/(marketing)/page.js.`
> * Navegar por vários layouts raiz causará um carregamento completo da página (em oposição a uma navegação no lado do cliente). Por exemplo, navegar de `/cart` que usa `app/(shop)/layout.js` para `/blog` que usa `app/(marketing)/layout.js` causará um carregamento completo da página. Isso se aplica apenas a vários layouts raiz.

