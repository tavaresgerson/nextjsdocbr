# Manipuladores de rota
Os manipuladores de rota permitem criar manipuladores de solicitação personalizados para uma determinada rota usando as APIs de [solicitação](https://developer.mozilla.org/docs/Web/API/Request) e [resposta](https://developer.mozilla.org/docs/Web/API/Response) da Web.

![image](https://github.com/tavaresgerson/nextjsdocbr/assets/22455192/7fd1f017-7439-46c3-9d20-66803edceded)

> **É bom saber:** os manipuladores de rota estão disponíveis apenas dentro do diretório do aplicativo. Eles são equivalentes a [API Routes](/docs/pages/building-your-application/routing/api-routes.md) dentro do diretório de páginas, o que significa que você não precisa usar API Routes e Route Handlers juntos.

Convenção
Os manipuladores de rota são definidos em um arquivo [route.js|ts](/docs/app/api-reference/file-conventions/route.md) dentro do diretório app:

```ts
// app/api/route.ts

export async function GET(request: Request) {}
```

Os manipuladores de rota podem ser aninhados dentro do diretório do aplicativo, semelhante a `page.js` e `layout.js`. Mas não pode haver um arquivo `route.js` no mesmo nível de segmento de rota que `page.js`.

### Métodos HTTP suportados
Os seguintes [métodos HTTP](https://developer.mozilla.org/docs/Web/HTTP/Methods) são suportados: `GET`, `POST`, `PUT`, `PATCH`, `DELETE`, `HEAD` e `OPTIONS`. Se um método não suportado for chamado, Next.js retornará uma resposta `405 Method Not Allowed`.

### APIs NextRequest e NextResponse estendidas
Além de suportar [Solicitação](https://developer.mozilla.org/docs/Web/API/Request) e [Resposta](https://developer.mozilla.org/docs/Web/API/Response) nativas. Next.js os estende com [NextRequest](/docs/app/api-reference/functions/next-request.md) e [NextResponse](/docs/app/api-reference/functions/next-response.md) para fornecer ajudantes convenientes para casos de uso avançados.

## Comportamento

### Cache
Os manipuladores de rota são armazenados em cache por padrão ao usar o método `GET` com o objeto `Response`.

```ts
// app/items/route.ts

import { NextResponse } from 'next/server'
 
export async function GET() {
  const res = await fetch('https://data.mongodb-api.com/...', {
    headers: {
      'Content-Type': 'application/json',
      'API-Key': process.env.DATA_API_KEY,
    },
  })
  const data = await res.json()
 
  return NextResponse.json({ data })
}
```

> **Aviso de TypeScript:** embora `Response.json()` seja válido, os tipos nativos de TypeScript atualmente mostram um erro, você pode usar `NextResponse.json()` para respostas tipadas.

## Desativando o cache
Você pode cancelar o armazenamento em cache:

* Usando o objeto `Request` com o método `GET`.
* Usando qualquer um dos outros métodos `HTTP`.
* Usando funções dinâmicas como cookies e cabeçalhos.
* As opções de configuração do segmento especificam manualmente o modo dinâmico.

Por exemplo:

```ts
// app/products/api/route.ts

import { NextResponse } from 'next/server'
 
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  const res = await fetch(`https://data.mongodb-api.com/product/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      'API-Key': process.env.DATA_API_KEY,
    },
  })
  const product = await res.json()
 
  return NextResponse.json({ product })
}
```

Da mesma forma, o método `POST` fará com que o `Route Handler` seja avaliado dinamicamente.

```ts
// app/items/route.ts

import { NextResponse } from 'next/server'
 
export async function POST() {
  const res = await fetch('https://data.mongodb-api.com/...', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'API-Key': process.env.DATA_API_KEY,
    },
    body: JSON.stringify({ time: new Date().toISOString() }),
  })
 
  const data = await res.json()
 
  return NextResponse.json(data)
}
```

> **É bom saber:** assim como as rotas de API, os manipuladores de rotas podem ser usados para casos como tratamento de envios de formulários. Uma nova abstração para lidar com [formulários e mutações](/docs/app/building-your-application/data-fetching/forms-and-mutations.md) que se integra profundamente ao React está sendo trabalhada.

## Resolução de rota
Você pode considerar uma rota como a primitiva de roteamento de nível mais baixo.

Eles não participam de layouts ou navegações do lado do cliente como páginas.
Não pode haver um arquivo route.js na mesma rota que page.js.


| Páginas                | Rota                | Resultado       |
|------------------------|---------------------|-----------------|
| `app/page.js`          | `app/route.js`      | Conflito        |
| `app/page.js`          | `app/api/route.js`	 | Válido          |
| `app/[user]/page.js`   | `app/api/route.js`  | Válido          |

Cada arquivo `route.js` ou `page.js` assume todos os verbos HTTP dessa rota.

```ts
// app/page.js

export default function Page() {
  return <h1>Hello, Next.js!</h1>
}
 
// ❌ Conflito
// `app/route.js`
export async function POST(request) {}
```

## Exemplos
Os exemplos a seguir mostram como combinar Route Handlers com outras APIs e recursos Next.js.

### Revalidar dados armazenados em cache
Você pode [revalidar dados armazenados em cache](/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating.md) usando a opção `next.revalidate`:

```ts
app/items/route.ts

TypeScript

import { NextResponse } from 'next/server'
 
export async function GET() {
  const res = await fetch('https://data.mongodb-api.com/...', {
    next: { revalidate: 60 }, // Revalidate every 60 seconds
  })
  const data = await res.json()
 
  return NextResponse.json(data)
}
```

Como alternativa, você pode usar a opção de configuração de [revalidar segmento](/docs/app/api-reference/file-conventions/route-segment-config.md):

```ts
export const revalidate = 60
```

### Funções Dinâmicas
Route Handlers podem ser usados com funções dinâmicas do Next.js, como cookies e cabeçalhos.

#### Cookies
Você pode ler cookies com [`cookies`](https://nextjs.org/docs/app/api-reference/functions/cookies) de `next/headers`. Esta função de servidor pode ser chamada diretamente em um Route Handler ou aninhada dentro de outra função.

Esta instância de `cookies` é somente leitura. Para definir cookies, você precisa retornar uma nova `Response` usando o [`Set-Cookie`](https://developer.mozilla.org/docs/Web/HTTP/Headers/Set-Cookie).

```ts
// app/api/route.ts

import { cookies } from 'next/headers'
 
export async function GET(request: Request) {
  const cookieStore = cookies()
  const token = cookieStore.get('token')
 
  return new Response('Hello, Next.js!', {
    status: 200,
    headers: { 'Set-Cookie': `token=${token.value}` },
  })
}
```

Como alternativa, você pode usar abstrações sobre as APIs da Web subjacentes para ler cookies ([`NextRequest`](https://nextjs.org/docs/app/api-reference/functions/next-request)https://nextjs.org/docs/app/api-reference/functions/next-request):

```ts
// app/api/route.ts

import { type NextRequest } from 'next/server'
 
export async function GET(request: NextRequest) {
  const token = request.cookies.get('token')
}
```

#### Cabeçalhos
Você pode ler cabeçalhos com [`headers`](https://nextjs.org/docs/app/api-reference/functions/headers) de `next/headers`. Esta função de servidor pode ser chamada diretamente em um Route Handler ou aninhada dentro de outra função.

Esta instância de `headers` é somente leitura. Para definir cabeçalhos, você precisa retornar uma nova `Response` com novos `headers`.

```ts
// app/api/route.ts

import { headers } from 'next/headers'
 
export async function GET(request: Request) {
  const headersList = headers()
  const referer = headersList.get('referer')
 
  return new Response('Hello, Next.js!', {
    status: 200,
    headers: { referer: referer },
  })
}
```

Como alternativa, você pode usar abstrações sobre as APIs da Web subjacentes para ler cabeçalhos ([`NextRequest`](/docs/app/api-reference/functions/next-request.md)):
