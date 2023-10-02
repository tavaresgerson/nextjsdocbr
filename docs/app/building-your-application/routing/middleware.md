# Middleware

O middleware permite que você execute o código antes que uma solicitação seja concluída. Então, com base na solicitação recebida, você pode modificar a resposta reescrevendo, redirecionando, modificando os cabeçalhos da solicitação ou da resposta ou respondendo diretamente.

O middleware é executado antes que o conteúdo e as rotas armazenados em cache sejam correspondidos. Consulte **Caminhos correspondentes** nesta seção para obter mais detalhes.

## Convenção
Use o arquivo `middleware.ts` (ou `.js`) na raiz do seu projeto para definir o Middleware. Por exemplo, no mesmo nível das `pages`, `app`, ou dentro do `src`, se aplicável.

## Exemplo
```ts
// middleware.ts

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// Esta função pode ser marcada como `async` se estiver usando `await` dentro
export function middleware(request: NextRequest) {
  return NextResponse.redirect(new URL('/home', request.url))
}
 
// Consulte "Caminhos correspondentes" abaixo para saber mais
export const config = {
  matcher: '/about/:path*',
}
```

## Caminhos correspondentes
O middleware será invocado para todas as rotas do seu projeto. A seguir está a ordem de execução:

1. `headers` de `next.config.js`
2. `redirects` de `next.config.js`
3. Middleware (`rewrites`, `redirects`, etc.)
4. `beforeFiles` (`rewrites`) de `next.config.js`
5. Rotas do sistema de arquivos (`public/`, `_next/static/`, `pages/`, `app/`, etc.)
6. `afterFiles` (`rewrites`) de `next.config.js`
7. Rotas dinâmicas (`/blog/[slug]`)
8. `fallback` (`rewrite`) de `next.config.js`

Existem duas maneiras de definir em quais caminhos o Middleware será executado:

1. [Matcher](#Matcher)
2. [Declarações Condicionais](#declarações-condicionais)

## Matcher
`matcher` permite filtrar Middleware para rodar em caminhos específicos.

```ts
// middleware.js

export const config = {
  matcher: '/about/:path*',
}
```

Você pode combinar um único caminho ou vários caminhos com uma sintaxe de array:

```ts
// middleware.js

export const config = {
  matcher: ['/about/:path*', '/dashboard/:path*'],
}
```

A configuração do `matcher` permite usar o `regex` completo, portanto, há suporte para correspondências como lookaheads negativos ou correspondência de caracteres. Um exemplo de lookahead negativo para corresponder a todos, exceto caminhos específicos, pode ser visto aqui:

```ts
// middleware.js

export const config = {
  matcher: [
    /*
     * Combine todos os caminhos de solicitação, exceto aqueles que começam com:
     * - api (rotas/API)
     * - _next/static (arquivos estáticos)
     * - _next/image (otimização de imagens)
     * - favicon.ico (favicon)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
```

> **É bom saber:** os valores do `matcher` precisam ser constantes para que possam ser analisados estaticamente no momento da construção. Valores dinâmicos, como variáveis, serão ignorados.

Correspondentes configurados:

1. DEVE começar com `/`
2. Pode incluir parâmetros nomeados: `/about/:path` corresponde a `/about/a` e `/about/b`, mas não a `/about/a/c`
3. Pode ter modificadores em parâmetros nomeados (começando com `:`): `/about/:path*` corresponde a `/about/a/b/c` porque `*` é zero ou mais. `?` é zero ou um e `+` é um ou mais
4. Pode usar expressão regular entre parênteses: `/about/(.*)` é o mesmo que `/about/:path*`

Leia mais detalhes na documentação do [path-to-regexp](https://github.com/pillarjs/path-to-regexp#path-to-regexp-1).

> **É bom saber:** para compatibilidade com versões anteriores, Next.js sempre considera `/public` como `/public/index`. Portanto, um `matcher` de `/public/:path` irá corresponder.

## Declarações Condicionais

```ts
// middleware.ts

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/about')) {
    return NextResponse.rewrite(new URL('/about-2', request.url))
  }
 
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.rewrite(new URL('/dashboard/user', request.url))
  }
}
```

## NextResponse
A API `NextResponse` permite que você:

1. redirecionar a solicitação recebida para um URL diferente
2. reescrever a resposta exibindo um determinado URL
3. Definir cabeçalhos de solicitação para rotas de API, getServerSideProps e reescrever destinos
4. Definir cookies de resposta
5. Definir cabeçalhos de resposta

Para produzir uma resposta do Middleware, você pode:

1. reescrever para uma rota ([página](/docs/app/building-your-application/routing/pages-and-layouts.md) ou [manipulador de rota](/docs/app/building-your-application/routing/route-handlers.md)) que produz uma resposta
2. retornar um `NextResponse` diretamente. Consulte **Produzindo uma resposta** nesta seção

## Usando Cookies
Cookies são cabeçalhos regulares. Em uma `Request`, eles são armazenados no cabeçalho `Cookie`. Em uma `Response`, eles estão no cabeçalho `Set-Cookie`. Next.js fornece uma maneira conveniente de acessar e manipular esses cookies por meio da extensão de `cookies` em `NextRequest` e `NextResponse`.

1. Para solicitações recebidas, os cookies vêm com os seguintes métodos: `get`, `getAll`, `set` e `delete`. Você pode verificar a existência de um cookie com `has` ou remover todos os cookies com `clear`.
2. Para respostas de saída, os cookies têm os seguintes métodos `get`, `getAll`, `set` e `delete`.

```ts
// middleware.ts

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  // Suponha que um cabeçalho "Cookie:nextjs=fast" esteja presente na solicitação recebida
  // Obtendo cookies da solicitação usando a API `RequestCookies`
  let cookie = request.cookies.get('nextjs')
  console.log(cookie) // => { name: 'nextjs', value: 'fast', Path: '/' }
  const allCookies = request.cookies.getAll()
  console.log(allCookies) // => [{ name: 'nextjs', value: 'fast' }]
 
  request.cookies.has('nextjs') // => true
  request.cookies.delete('nextjs')
  request.cookies.has('nextjs') // => false
 
  // Configurando cookies na resposta usando a API `ResponseCookies`
  const response = NextResponse.next()
  response.cookies.set('vercel', 'fast')
  response.cookies.set({
    name: 'vercel',
    value: 'fast',
    path: '/',
  })
  cookie = response.cookies.get('vercel')
  console.log(cookie) // => { name: 'vercel', value: 'fast', Path: '/' }
  // A resposta de saída terá um cabeçalho `Set-Cookie:vercel=fast;path=/test`.
 
  return response
}
```

## Configurando cabeçalhos
Você pode definir cabeçalhos de solicitação e resposta usando a API `NextResponse` (a configuração de cabeçalhos de solicitação está disponível desde Next.js v13.0.0).

```ts
// middleware.ts

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  // Clone os cabeçalhos da solicitação e defina um novo cabeçalho `x-hello-from-middleware1`
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-hello-from-middleware1', 'hello')
 
  // Você também pode definir cabeçalhos de solicitação em `NextResponse.rewrite`
  const response = NextResponse.next({
    request: {
      // New request headers
      headers: requestHeaders,
    },
  })
 
  // Defina um novo cabeçalho de resposta `x-hello-from-middleware2`
  response.headers.set('x-hello-from-middleware2', 'hello')
  return response
}
```

> **É bom saber:** Evite definir cabeçalhos grandes, pois isso pode causar o erro `431 Request Header Fields Too Large`, dependendo da configuração do servidor web back-end.

## Produzindo uma resposta
Você pode responder diretamente do Middleware retornando uma instância `Response` ou `NextResponse`. (Isso está disponível desde [Next.js v13.1.0](https://nextjs.org/blog/next-13-1#nextjs-advanced-middleware))

```ts
// middleware.ts

import { NextRequest } from 'next/server'
import { isAuthenticated } from '@lib/auth'
 
// Limite o middleware a caminhos começando com `/api/`
export const config = {
  matcher: '/api/:function*',
}
 
export function middleware(request: NextRequest) {
  // Chame nossa função de autenticação para verificar a solicitação
  if (!isAuthenticated(request)) {
    // Responder com JSON indicando uma mensagem de erro
    return Response.json(
      { success: false, message: 'authentication failed' },
      { status: 401 }
    )
  }
}
```

## Sinalizadores de Middleware Avançados
Na v13.1 do Next.js, dois sinalizadores adicionais foram introduzidos para middleware, `skipMiddlewareUrlNormalize` e `skipTrailingSlashRedirect` para lidar com casos de uso avançados.

`skipTrailingSlashRedirect` permite desabilitar os redirecionamentos padrão do Next.js para adicionar ou remover barras finais, permitindo o tratamento personalizado dentro do middleware, o que pode permitir a manutenção da barra final para alguns caminhos, mas não para outros, permitindo migrações incrementais mais fáceis.

```js
// next.config.js

module.exports = {
  skipTrailingSlashRedirect: true,
}
```

```js
// middleware.js

const legacyPrefixes = ['/docs', '/blog']
 
export default async function middleware(req) {
  const { pathname } = req.nextUrl
 
  if (legacyPrefixes.some((prefix) => pathname.startsWith(prefix))) {
    return NextResponse.next()
  }
 
  // aplicar tratamento de barra final
  if (
    !pathname.endsWith('/') &&
    !pathname.match(/((?!\.well-known(?:\/.*)?)(?:[^/]+\/)*[^/]+\.\w+)/)
  ) {
    req.nextUrl.pathname += '/'
    return NextResponse.redirect(req.nextUrl)
  }
}
```

`skipMiddlewareUrlNormalize` permite desabilitar a normalização de URL que Next.js faz para tornar o tratamento de visitas diretas e transições de cliente iguais. Existem alguns casos avançados em que você precisa de controle total usando o URL original que é desbloqueado.

```js
// next.config.js

module.exports = {
  skipMiddlewareUrlNormalize: true,
}
```

```js
// middleware.js

export default async function middleware(req) {
  const { pathname } = req.nextUrl
 
  // GET /_next/data/build-id/hello.json
 
  console.log(pathname)
  // com o sinalizador ficaria assim: /_next/data/build-id/hello.json
  // sem o sinalizador isso seria normalizado para /hello
}
```

## Histórico de versões

| Versão        | Mudanças                                                                                          |
|---------------|---------------------------------------------------------------------------------------------------|
| `v13.1.0`     | Sinalizadores de Middleware Avançados adicionados                                                 |
| `v13.0.0`     | Middleware pode modificar cabeçalhos de solicitação, cabeçalhos de resposta e enviar respostas    |
| `v12.2.0`     | O middleware está estável, consulte o [guia de atualização](/docs/messages/middleware-upgrade-guide.md) |
| `v12.0.9`     | Aplicar URLs absolutos no Edge Runtime ([PR](https://github.com/vercel/next.js/pull/33410))  |
| `v12.0.0`     | Middleware (Beta) adicionado                                                                  |

