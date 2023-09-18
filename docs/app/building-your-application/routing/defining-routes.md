# Definindo rotas

> Recomendamos a leitura do [Fundamentos do roteamento](/docs/app/building-your-application/routing.md) página antes de continuar.

Esta página o guiará sobre como definir e organizar rotas no aplicativo Next.js.

## Criando rotas

O Next.js usa um roteador baseado no sistema de arquivos onde pastas são usados para definir rotas.

Cada pasta representa um rota segmento que mapeia para um segmento de URL. Para criar uma rota aninhada, você pode aninhar pastas dentro uma da outra.

![image](https://github.com/tavaresgerson/nextjsdocbr/assets/22455192/d7d4921d-c7a1-414e-9846-7a01efe61df0)

Um arquivo especial [`page.js`](/docs/app/building-your-application/routing/pages-and-layouts.md) é usado para tornar os segmentos de rota acessíveis ao público.

![image](https://github.com/tavaresgerson/nextjsdocbr/assets/22455192/a6faf1b1-c261-46c9-a1c9-9e1b7a479e2c)

Neste exemplo, o caminho `/dashboard/analytics` da URL não é acessível ao público porque não possui um arquivo `page.js` correspondente. Esta pasta pode ser usada para armazenar componentes, folhas de estilo, imagens ou outros arquivos localizados.

> **É bom saber:** extensões de arquivo `.js`, `.jsx`, ou `.tsx` podem ser usadas para arquivos especiais.

## Criando interface do usuário
Convenções especiais de arquivos são usados para criar a interface do usuário para cada segmento de rota. Os mais comuns são páginas mostrar interface do usuário exclusiva para uma rota e layouts para mostrar a interface do usuário compartilhada em várias rotas.

Por exemplo, para criar sua primeira página, adicione um arquivo `page.js` dentro do diretório `app` e exporte um componente React:

```ts
// app/page.tsx

export default function Page() {
  return <h1>Hello, Next.js!</h1>
}
```

## Próximos passos
Saiba mais sobre como criar páginas e layouts.

#### [Páginas e layouts](/docs/app/building-your-application/routing/pages-and-layouts.md)
Crie sua primeira página e layout compartilhado com o App Router.
