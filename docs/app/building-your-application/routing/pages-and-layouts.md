# Páginas e layouts

> Recomendamos a leitura de [Fundamentos do roteamento](/docs/app/building-your-application/routing.md) e [Definindo rotas](/docs/app/building-your-application/routing/defining-routes.md) antes de continuar.

O App Router no Next.js 13 introduziu novas convenções de arquivos para criar páginas facilmente, layouts compartilhados, e modelos. Esta página orientará você sobre como usar esses arquivos especiais no aplicativo Next.js.

## Páginas
Uma página é a interface do usuário que é único para uma rota. Você pode definir páginas exportando um componente de um arquivo `page.js`. Use pastas aninhadas para definir uma rota e um arquivo `page.js` para tornar a rota acessível ao público.

Crie sua primeira página adicionando um arquivo `page.js` arquivo dentro do diretório `app`:

![image](https://github.com/tavaresgerson/nextjsdocbr/assets/22455192/497db434-5bd1-4ac3-bfae-2c28022f4860)

```ts
// app/page.tsx

// `app/page.tsx` é a UI para a URL `/`
export default function Page() {
  return <h1>Hello, Home page!</h1>
}
```

```ts
// app/dashboard/page.tsx

// `app/dashboard/page.tsx` é a UI para a URL `/dashboard`
export default function Page() {
  return <h1>Hello, Dashboard Page!</h1>
}
```

> **É bom saber**: Uma página é sempre a folha do subárvore de rota.
> * As extensões de arquivo `.js`, `.jsx`, ou `.tsx` podem ser usadas para páginas.
> * A `page.js` é necessária para que o arquivo torne um segmento de rota acessível ao público.
> * Páginas são [Componentes do servidor](/docs/app/building-your-application/rendering/server-components.md) por padrão, mas pode ser definido como um [Componente do cliente](/docs/app/building-your-application/rendering/client-components.md).
> * As páginas podem buscar dados. Ver a seção [Busca de dados](/docs/app/building-your-application/data-fetching.md) para mais informações.

## Layouts
Um layout é a interface do usuário que é compartilhado entre várias páginas. Na navegação, os layouts preservam o estado, permanecem interativos e não se renderizam novamente. Layouts também podem ser aninhado.

Você pode definir um layout por default exportando um componente react de um arquivo `layout.js`. O componente deve aceitar suporta um `children` que será preenchido com um layout filho (se existir) ou uma página filho durante a renderização.

![image](https://github.com/tavaresgerson/nextjsdocbr/assets/22455192/f0cdeb0f-3063-4f3f-a332-79345c89b269)


```ts
// app/dashboard/layout.tsx

export default function DashboardLayout({
  children, // será uma página ou layout aninhado
}: {
  children: React.ReactNode
}) {
  return (
    <section>
      {/* Incluir a UI compartilhada aqui, por exemplo. um cabeçalho ou barra lateral */}
      <nav></nav>
 
      {children}
    </section>
  )
}
```

> É bom saber:

> O layout de mais alto nível é chamado de Layout da raiz. Este layout é compartilhado em todas as páginas de um aplicativo. Os layouts de raiz devem conter as tags `html` e `body`.
> Qualquer segmento de rota pode opcionalmente definir seu próprio Layout. Esses layouts serão compartilhados em todas as páginas desse segmento.
> Layouts em uma rota são aninhado por padrão. Cada layout pai envolve layouts de crianças abaixo dele usando o prop do React `children`.
> Você pode usar [Grupos de rotas](/docs/app/building-your-application/routing/route-groups.md) optar por segmentos de rota específicos dentro e fora de layouts compartilhados.
> Layouts são [Componentes do servidor](/docs/app/building-your-application/rendering/server-components.md) por padrão, mas pode ser definido como um [Componente do cliente](/docs/app/building-your-application/rendering/client-components.md).
> Layouts podem buscar dados. Veja a seção [Busca de dados](/docs/app/building-your-application/data-fetching.md) para mais informações.
> Não é possível passar dados entre o layout dos pais e seus filhos. No entanto, você pode buscar os mesmos dados em uma rota mais de uma vez e o React irá [desduplicar automaticamente os pedidos sem afetar o desempenho](/docs/app/building-your-application/caching.md).
> Os layouts não têm acesso aos segmentos de rota abaixo de si. Para acessar todos os segmentos de rota, você pode usar [`useSelectedLayoutSegment`](/docs/app/api-reference/functions/use-selected-layout-segment.md) ou [`useSelectedLayoutSegments`](/docs/app/api-reference/functions/use-selected-layout-segments.md) em um componente do cliente.
> Extensões de arquivo `.js`, `.jsx`, ou `.tsx` podem ser usadas para layouts.
> Os arquivos `layout.js` e `page.js` pode ser definido na mesma pasta. O layout envolverá a página.

## Layout da raiz (Necessário)

O layout raiz é definido no nível superior do diretório `app` e se aplica a todas as rotas. Esse layout permite modificar o HTML inicial retornado do servidor.

```ts
// app/layout.tsx

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
```

> **É bom saber:**
> O diretório `app` deve incluir um layout raiz.
> O layout raiz deve definir as tags `<html>` e `<body>` pois o Next.js não os cria automaticamente.
> Você pode usar o suporte de [SEO embutido](/docs/app/building-your-application/optimizing/metadata.md) para gerenciar os elementos HTML no `<head>`, por exemplo o elemento `<title>`.
> Você pode usar o [grupos de rotas](/docs/app/building-your-application/routing/route-groups.md) para criar vários layouts de raiz.
> O layout raiz é um [Componente do servidor](/docs/app/building-your-application/rendering/server-components.md) por padrão e não pode ser definido como um [Componente do cliente](/docs/app/building-your-application/rendering/client-components.md).

> **Migrando do diretório `pages`**: O layout raiz substitui os arquivos [`_app.js`](/docs/pages/building-your-application/routing/custom-app.md) e [`_document.js`](/docs/pages/building-your-application/routing/custom-document.md). Veja o [guia de migração](/docs/app/building-your-application/upgrading/app-router-migration.md).

## Layouts de aninhamento

Layouts definidos dentro de uma pasta (por exemplo. `app/dashboard/layout.js`) aplica-se a segmentos de rota específicos (por exemplo. `acme.com/dashboard`) que são renderizados quando esses segmentos estiverem ativos. Por padrão, os layouts na hierarquia de arquivos são aninhado, o que significa que eles envolvem layouts de crianças através de seus props `children`.

![image](https://github.com/tavaresgerson/nextjsdocbr/assets/22455192/88200f6e-bc6f-434b-b21f-6979d630a260)

```ts
// app/dashboard/layout.tsx

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <section>{children}</section>
}
```

> **É bom saber:**
> * Somente o layout raiz pode conter as tags `<html>` e `<body>`.

Se você combinar os dois layouts acima, o layout raiz (`app/layout.js`) envolveria o layout do painel (`app/dashboard/layout.js`), que envolveria segmentos de rota dentro de `app/dashboard/*`.

Os dois layouts seriam aninhados como tal:

![image](https://github.com/tavaresgerson/nextjsdocbr/assets/22455192/92852c0a-d947-4180-a03c-e4fccd0aaa30)

Você pode usar [Grupos de rotas](https://nextjs.org/docs/app/building-your-application/routing/route-groups) para optar por segmentos de rota específicos dentro e fora de layouts compartilhados.

## Templates
Os templates são semelhantes aos layouts, pois envolvem cada layout ou página da criança. Ao contrário dos layouts que persistem nas rotas e mantêm o estado, os templates criam uma nova instância para cada um de seus filhos na navegação. Isso significa que, quando um usuário navega entre rotas que compartilham um template, uma nova instância do componente é montada, os elementos DOM são recriados, o estado não é preservado e os efeitos são ressincronizados.

Pode haver casos em que você precise desses comportamentos específicos, e os templates seriam uma opção mais adequada do que os layouts. Por exemplo:

* Recursos que dependem de `useEffect` (por exemplo, visualizações de página de log) e `useState` (por exemplo, um formulário de feedback por página).
* Para alterar o comportamento padrão da estrutura. Por exemplo, os limites de suspensão dentro dos layouts mostram apenas o fallback na primeira vez em que o layout é carregado e não ao alternar páginas. Para templates, o fallback é mostrado em cada navegação.
* Um modelo pode ser definido exportando um componente de react padrão de um arquivo `template.js`. O componente deve aceitar um prop `children`.

![image](https://github.com/tavaresgerson/nextjsdocbr/assets/22455192/ec15aa56-3232-4817-9ee6-e2697e14daef)

```ts
// app/template.tsx

export default function Template({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>
}
```

Em termos de aninhamento, `template.js` é renderizado entre um layout e seus filhos. Aqui está uma saída simplificada:

```
<Layout>
  {/* Observe que o template recebe uma chave exclusiva. */}
  <Template key={routeParam}>{children}</Template>
</Layout>
```

## Modificando <head>

No app diretório, você pode modificar o elemento HTML `<head>`, como `title` e `meta` usando o suporte de [SEO embutido](/docs/app/building-your-application/optimizing/metadata.md).

Os metadados podem ser definidos exportando um objeto [`metadata`](/docs/app/api-reference/functions/generate-metadata.md) ou a função [`generateMetadata`](/docs/app/api-reference/functions/generate-metadata.md) em um arquivo [`layout.js`](/docs/app/api-reference/file-conventions/layout.md) ou [`page.js`](/docs/app/api-reference/file-conventions/page.md).

```ts
// app/page.tsx

import { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'Next.js',
}
 
export default function Page() {
  return '...'
}
```

> **É bom saber:** Você não deveria adicionar manualmente tags como `<head>`, `<title>` e `<meta>` na raiz dos layouts. Em vez disso, você deve usar o [API de metadados](/docs/app/api-reference/functions/generate-metadata.md) que lida automaticamente com requisitos avançados, como streaming e duplicação de elementos no `<head>`.
