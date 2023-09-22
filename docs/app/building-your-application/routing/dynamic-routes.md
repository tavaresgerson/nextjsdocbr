# Rotas Dinâmicas

Quando você não sabe os nomes exatos dos segmentos com antecedência e deseja criar rotas a partir de dados dinâmicos, você pode usar Segmentos Dinâmicos que são preenchidos no momento da solicitação ou pré-renderizados no momento da construção.

## Convenção
Um segmento dinâmico pode ser criado colocando o nome de uma pasta entre colchetes: `[folderName]`. Por exemplo, `[id]` ou `[slug]`.

Segmentos dinâmicos são passados com suporte a `params` para funções de [`layout`](/docs/app/api-reference/file-conventions/layout.md), [`page`](/docs/app/api-reference/file-conventions/page.md), [`route`](/docs/app/building-your-application/routing/route-handlers.md) e [`generateMetadata`](/docs/app/api-reference/functions/generate-metadata.md).

## Exemplo
Por exemplo, um blog pode incluir a seguinte rota `app/blog/[slug]/page.js` onde `[slug]` é o segmento dinâmico para postagens de blog.

```ts
// app/blog/[slug]/page.tsx

export default function Page({ params }: { params: { slug: string } }) {
  return <div>My Post: {params.slug}</div>
}
```

| Rota                          | Exemplo URL        | `params`             |
|-------------------------------|--------------------|----------------------|
| `app/blog/[slug]/page.js`     |	`/blog/a`          | `{ slug: 'a' }`      |
| `app/blog/[slug]/page.js`     | `/blog/b`          | `{ slug: 'b' }`      |
| `app/blog/[slug]/page.js`     | `/blog/c`          | `{ slug: 'c' }`      |

Consulte a seção `generateStaticParams()` para saber como gerar os parâmetros para o segmento.

> **É bom saber:** os segmentos dinâmicos são equivalentes às rotas dinâmicas no diretório de páginas.

## Gerando parâmetros estáticos
A função `generateStaticParams` pode ser usada em combinação com segmentos de rota dinâmica para gerar rotas estaticamente no momento da construção, em vez de sob demanda no momento da solicitação.

```ts
// app/blog/[slug]/page.tsx

export async function generateStaticParams() {
  const posts = await fetch('https://.../posts').then((res) => res.json())
 
  return posts.map((post) => ({
    slug: post.slug,
  }))
}
```

O principal benefício da função `generateStaticParams` é a recuperação inteligente de dados. Se o conteúdo for buscado na função `generateStaticParams` usando uma solicitação de busca, as solicitações serão [memorizadas automaticamente](/docs/app/building-your-application/caching.md). Isso significa que uma solicitação de busca com os mesmos argumentos em vários `generateStaticParams`, Layouts e Pages será feita apenas uma vez, o que diminui o tempo de construção.

Use o [guia de migração](/docs/app/building-your-application/upgrading/app-router-migration.md) se estiver migrando do diretório de páginas.

Consulte a documentação da [função do servidor `generateStaticParams`](/docs/app/api-reference/functions/generate-static-params.md) para obter mais informações e casos de uso avançados.

## Segmentos abrangentes
Os segmentos dinâmicos podem ser estendidos para abranger todos os segmentos subsequentes adicionando reticências entre colchetes `[...folderName]`.

Por exemplo, `app/shop/[...slug]/page.js` corresponderá a `/shop/clothes`, mas também a `/shop/clothes/tops`, `/shop/clothes/tops/t-shirts` e assim por diante.

| Rota                            | Exemplo de URL             | params                      |
|---------------------------------|----------------------------|-----------------------------|
| `app/shop/[...slug]/page.js`    | `/shop/a`                  | `{ slug: ['a'] }`           |
| `app/shop/[...slug]/page.js`	  | `/shop/a/b`                | `{ slug: ['a', 'b'] }`      |
| `app/shop/[...slug]/page.js`    | `/shop/a/b/c`              | `{ slug: ['a', 'b', 'c'] }` |

## Segmentos abrangentes opcionais
Segmentos pega-tudo podem se tornar opcionais incluindo o parâmetro entre colchetes duplos: `[[...folderName]]`.

Por exemplo, `app/shop/[[...slug]]/page.js` também corresponderá a `/shop`, além de `/shop/clothes`, `/shop/clothes/tops` e `/shop/clothes/tops/t-shirts`.

A diferença entre segmentos pega-tudo e pega-tudo opcional é que com opcional, a rota sem o parâmetro também é correspondida (`/shop` no exemplo acima).

| Rota                            | Exemplo de URL             | params                      |
|---------------------------------|----------------------------|-----------------------------|
| `app/shop/[[...slug]]/page.js`  | `/shop`                    | `{}`                        |
| `app/shop/[[...slug]]/page.js`	| `/shop/a`                  | `{ slug: ['a'] }`           |
| `app/shop/[[...slug]]/page.js`	| `/shop/a/b`                | `{ slug: ['a', 'b'] }`      |
| `app/shop/[[...slug]]/page.js`	| `/shop/a/b/c`	             | `{ slug: ['a', 'b', 'c'] }` |

## TypeScript
Ao usar TypeScript, você pode adicionar tipos de parâmetros dependendo do segmento de rota configurado.

```ts
// app/blog/[slug]/page.tsx

export default function Page({ params }: { params: { slug: string } }) {
  return <h1>My Page</h1>
}
```

| Rota                                 | params                                    |
|--------------------------------------|-------------------------------------------|
| `app/blog/[slug]/page.js`            | `{ slug: string }`                        |
| `app/shop/[...slug]/page.js`         | `{ slug: string[] }`                      |
| `app/[categoryId]/[itemId]/page.js`  | `{ categoryId: string, itemId: string }`  |

> **É bom saber:** isso pode ser feito automaticamente pelo [plugin TypeScript](/docs/app/building-your-application/configuring/typescript.md) no futuro.
