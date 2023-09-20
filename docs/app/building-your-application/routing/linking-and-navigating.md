# Ligação e navegação

Existem duas maneiras de navegar entre rotas no Next.js:

* Usando o Componente `<Link>`
* Usando o hook `useRouter`

Esta página abordará como usar `<Link>`, `useRouter()` e mergulhar mais fundo em como a navegação funciona.

## Componente `<Link>`

`<Link>` é um componente interno que estende a tag HTML `<a>` para fornecer prefixação e navegação do lado do cliente entre rotas. É a principal maneira de navegar entre rotas no Next.js.

Você pode usá-lo importando-o de `next/link`, e passando um prop `href` para o componente:

```ts
// app/page.tsx

import Link from 'next/link'
 
export default function Page() {
  return <Link href="/dashboard">Dashboard</Link>
}
```

Existem outros acessórios opcionais para os quais você pode passar o `<Link>`. Veja a [Referência da API](/docs/app/api-reference/components/link.md) para mais.

## Exemplos

### Vinculação a segmentos dinâmicos
Ao vincular a [segmentos dinâmicos](/docs/app/building-your-application/routing/dynamic-routes.md), você pode usar [templates literais e interpolação](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Template_literals) para gerar uma lista de links. Por exemplo, para gerar uma lista de postagens de blog:

```ts
// app/blog/PostList.js

import Link from 'next/link'
 
export default function PostList({ posts }) {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </li>
      ))}
    </ul>
  )
}
```

### Verificando links ativos

Você pode usar [`usePathname()`](/docs/app/api-reference/functions/use-pathname.md) para determinar se um link está ativo. Por exemplo, para adicionar uma classe ao link ativo, você pode verificar se o atual `pathname` combina com `href` do link:

```ts
// app/ui/Navigation.js

'use client'
 
import { usePathname } from 'next/navigation'
import Link from 'next/link'
 
export function Navigation({ navLinks }) {
  const pathname = usePathname()
 
  return (
    <>
      {navLinks.map((link) => {
        const isActive = pathname === link.href
 
        return (
          <Link
            className={isActive ? 'text-blue' : 'text-black'}
            href={link.href}
            key={link.name}
          >
            {link.name}
          </Link>
        )
      })}
    </>
  )
}
```

### Rolando para um id

O comportamento padrão do roteador de aplicativos Next.js é rolar para o topo de uma nova rota ou manter a posição da rolagem para navegação para trás e para frente.

Se você deseja rolar para um `id` específico na navegação, você pode anexar seu URL com um `#` link ou apenas passe um hash link para o prop `href`. Isso é possível desde que o `<Link>` renderize o elemento `<a>`.

```
<Link href="/dashboard#settings">Settings</Link>
 
// Saída
<a href="/dashboard#settings">Settings</a>
```

### Desativando restauração de rolagem
O comportamento padrão do roteador de aplicativos Next.js é rolar para o topo de uma nova rota ou manter a posição da rolagem na navegação para trás e para frente. Se você deseja desativar esse comportamento, pode passar `scroll={false}` para o componente `<Link>` ou `scroll: false` para `router.push()` ou `router.replace()`.

``` tsx
// next/link
<Link href="/dashboard" scroll={false}>
  Dashboard
</Link>
```

```
// useRouter
import { useRouter } from 'next/navigation'
 
const router = useRouter()

router.push('/dashboard', { scroll: false })
```

## Hook `useRouter()`
O hook `useRouter` permite alterar programaticamente as rotas.

Este gancho só pode ser usado dentro dos Componentes do Cliente e é importado de `next/navigation`.

```ts
// app/page.js

'use client'
 
import { useRouter } from 'next/navigation'
 
export default function Page() {
  const router = useRouter()
 
  return (
    <button type="button" onClick={() => router.push('/dashboard')}>
      Dashboard
    </button>
  )
}
```

Para uma lista completa de métodos do `useRouter`, veja as [Referência da API](/docs/app/api-reference/functions/use-router.md).

> **Recomendação:** Use o componente `<Link>` para navegar entre rotas, a menos que você tenha um requisito específico para usar `useRouter`.

## Como funciona o roteamento e a navegação

O App Router usa uma abordagem híbrida para roteamento e navegação. No servidor, o código do seu aplicativo é automaticamente dividido por segmentos de rota. E no cliente, Next.js pré-busca e armazena em cache os segmentos de rota. Isso significa que, quando um usuário navega para uma nova rota, o navegador não recarrega a página, e apenas os segmentos da rota que mudam são renderizados novamente - melhorando a experiência e o desempenho da navegação.

### 1. Pré-busca (Prefetching)
   Prefetching é uma maneira de pré-carregar uma rota em segundo plano antes que o usuário a visite.

   Existem duas maneiras pelas quais as rotas são pré-carregada no Next.js:
   1. Componente `<Link>`: As rotas são pré-fixadas automaticamente à medida que se tornam visíveis na viewport do usuário. A prefixação acontece quando a página é carregada pela primeira vez ou quando é exibida através da rolagem.
   2. `router.prefetch()`: O hook `useRouter` pode ser usado para buscar rotas programaticamente.

O <Link> tem o comportamento de pré-busca diferente para rotas estáticas e dinâmicas:

* [Rotas estáticas](/docs/app/building-your-application/rendering/server-components.md): `prefetch` por padrão é `true`. Toda a rota é pré-buscada e armazenada em cache.
* [Rotas dinâmicas](/docs/app/building-your-application/rendering/server-components.md): `prefetch` por padrão é automático. Somente o layout compartilhado até o primeiro arquivo `loading.js` é pré-buscado e armazenado em cache por 30 segundos. Isso reduz o custo de buscar uma rota dinâmica inteira e significa que você pode mostrar um estado de carregamento instantâneo para obter um melhor feedback visual aos usuários.
  
Você pode desativar o `prefetching` configurando o prop `prefetch` para `false`.

Veja a [Referência da API do `<Link>`](/docs/app/api-reference/components/link.md) para mais informações.

> **É bom saber:** O prefetching não está ativado no desenvolvimento, apenas em produção.

### 2. Cache
Next.js tem um cache do lado do cliente na memória chamado [Router Cache](/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating.md). À medida que os usuários navegam pelo aplicativo, a carga útil do componente React Server de segmentos de rota pré-buscados e rotas visitadas é armazenada no cache.

Isso significa que na navegação o cache é reaproveitado ao máximo, ao invés de fazer uma nova requisição ao servidor - melhorando o desempenho ao reduzir o número de requisições e dados transferidos.

Saiba mais sobre como funciona o [cache do roteador](/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating.md) e como configurá-lo.

### 3. Renderização parcial
Renderização parcial significa que apenas os segmentos de rota que mudam na navegação são renderizados novamente no cliente e quaisquer segmentos compartilhados são preservados.

Por exemplo, ao navegar entre duas rotas irmãs: `/dashboard/settings` e `/dashboard/analytics`, as páginas de `settings` e `analytics` serão renderizadas e o layout do `dashboard` compartilhado será preservado.

![image](https://github.com/tavaresgerson/nextjsdocbr/assets/22455192/65b52468-3089-40fc-9a3c-a6816d2f9275)

Sem renderização parcial, cada navegação faria com que a página inteira fosse renderizada novamente no servidor. Renderizar apenas o segmento que muda reduz a quantidade de dados transferidos e o tempo de execução, levando a um melhor desempenho.

### 4. Navegação suave
Por padrão, o navegador realiza uma navegação difícil entre as páginas. Isso significa que o navegador recarrega a página e redefine o estado React, como o hook `useState` em seu aplicativo e o estado do navegador, como a posição de rolagem do usuário ou o elemento em foco. No entanto, em Next.js, o App Router usa navegação suave. Isso significa que o React renderiza apenas os segmentos que foram alterados, preservando o React e o estado do navegador, e não há recarga completa da página.

### 5. Navegação para frente e para trás
Por padrão, Next.js manterá a posição de rolagem para navegação para trás e para frente e reutilizará segmentos de rota no [cache do roteador](/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating.md).
