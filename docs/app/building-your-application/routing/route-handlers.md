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

```ts
// app/api/route.ts

import { type NextRequest } from 'next/server'
 
export async function GET(request: NextRequest) {
  const requestHeaders = new Headers(request.headers)
}
```

#### Redirects

```ts
// app/api/route.ts

import { redirect } from 'next/navigation'
 
export async function GET(request: Request) {
  redirect('https://nextjs.org/')
}
```

### Segmentos de rota dinâmica

> Recomendamos a leitura da página [Definindo Rotas](/docs/app/building-your-application/routing/defining-routes.md) antes de continuar.

Os manipuladores de rota podem usar [segmentos dinâmicos](/docs/app/building-your-application/routing/dynamic-routes.md) para criar manipuladores de solicitação a partir de dados dinâmicos.

```ts
// app/items/[slug]/route.ts

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const slug = params.slug // 'a', 'b', or 'c'
}
```


| Rota                        |	Exemplo de URL     | params          |
|-----------------------------|--------------------|-----------------|
| `app/items/[slug]/route.js` |	`/items/a`         | `{ slug: 'a' }` |
| `app/items/[slug]/route.js` |	`/items/b`         | `{ slug: 'b' }` |
| `app/items/[slug]/route.js` | `/items/c`         | `{ slug: 'c' }` |

## Parâmetros de consulta de URL
O objeto de solicitação passado para o Route Handler é uma instância `NextRequest`, que possui alguns [métodos adicionais de conveniência](/docs/app/api-reference/functions/next-request.md), inclusive para manipulação mais fácil de parâmetros de consulta.

```ts
// app/api/search/route.ts

import { type NextRequest } from 'next/server'
 
export function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('query')
  // a consulta é "hello" para /api/search?query=hello
}
```

## Streaming
O streaming é comumente usado em combinação com Large Language Models (LLMs), como OpenAI, para conteúdo gerado por IA. Saiba mais sobre o [SDK de IA](https://sdk.vercel.ai/docs).

```ts
// app/api/chat/route.ts

import { Configuration, OpenAIApi } from 'openai-edge'
import { OpenAIStream, StreamingTextResponse } from 'ai'
 
export const runtime = 'edge'
 
const apiConfig = new Configuration({
  apiKey: process.env.OPENAI_API_KEY!,
})
 
const openai = new OpenAIApi(apiConfig)
 
export async function POST(req: Request) {
  // Extraia as `mensagens` do corpo da solicitação
  const { messages } = await req.json()
 
  // Solicite a API OpenAI para a resposta com base no prompt
  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages: messages,
    max_tokens: 500,
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 1,
    presence_penalty: 1,
  })
 
  // Converta a resposta em um fluxo de texto amigável
  const stream = OpenAIStream(response)
 
  // Responda com o stream
  return new StreamingTextResponse(stream)
}
```

Essas abstrações usam APIs da Web para criar um fluxo. Você também pode usar as APIs Web subjacentes diretamente.

```ts
// app/api/route.ts

// https://developer.mozilla.org/docs/Web/API/ReadableStream#convert_async_iterator_to_stream
function iteratorToStream(iterator: any) {
  return new ReadableStream({
    async pull(controller) {
      const { value, done } = await iterator.next()
 
      if (done) {
        controller.close()
      } else {
        controller.enqueue(value)
      }
    },
  })
}
 
function sleep(time: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, time)
  })
}
 
const encoder = new TextEncoder()
 
async function* makeIterator() {
  yield encoder.encode('<p>One</p>')
  await sleep(200)
  yield encoder.encode('<p>Two</p>')
  await sleep(200)
  yield encoder.encode('<p>Three</p>')
}
 
export async function GET() {
  const iterator = makeIterator()
  const stream = iteratorToStream(iterator)
 
  return new Response(stream)
}
```

## Corpo da Solicitação
Você pode ler o corpo da solicitação usando os métodos padrão da API Web:

```ts
// app/items/route.ts

import { NextResponse } from 'next/server'
 
export async function POST(request: Request) {
  const res = await request.json()
  return NextResponse.json({ res })
}
```

## Solicitar Corpo de FormData
Você pode ler o `FormData` usando a função `request.formData()`:

```ts
// app/items/route.ts

import { NextResponse } from 'next/server'
 
export async function POST(request: Request) {
  const formData = await request.formData()
  const name = formData.get('name')
  const email = formData.get('email')
  return NextResponse.json({ name, email })
}
```

Como os dados `formData` são todos strings, você pode usar [zod-form-data](https://www.npmjs.com/zod-form-data) para validar a solicitação e recuperar os dados no formato de sua preferência (por exemplo, `number`).

## CORS
Você pode definir cabeçalhos CORS em uma `Response` usando os métodos padrão da API Web:

```ts
// app/api/route.ts

export async function GET(request: Request) {
  return new Response('Hello, Next.js!', {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}
```

## Tempos de execução Edge e Node.js
Os manipuladores de rota têm uma API da Web isomórfica para oferecer suporte a tempos de execução Edge e Node.js perfeitamente, incluindo suporte para streaming. Como os Route Handlers usam a mesma configuração de [segmento de rota](/docs/app/api-reference/file-conventions/route-segment-config.md) que as páginas e os layouts, eles oferecem suporte a recursos há muito esperados, como Route Handlers de uso geral [regenerados estaticamente](/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating.md).

Você pode usar a opção de configuração do segmento de tempo de execução para especificar o tempo de execução:

```ts
export const runtime = 'edge' // 'nodejs' é o padrão
```

## Respostas não UI
Você pode usar manipuladores de rota para retornar conteúdo que não seja da UI. Observe que [`sitemap.xml`](/docs/app/api-reference/file-conventions/metadata/sitemap.md), [`robots.txt`](/docs/app/api-reference/file-conventions/metadata/robots.md), [ícones de aplicativos](/docs/app/api-reference/file-conventions/metadata/app-icons.md) e [opengraph](/docs/app/api-reference/file-conventions/metadata/opengraph-image.md) têm suporte integrado.

```ts
app/rss.xml/route.ts

TypeScript

export async function GET() {
  return new Response(`<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
 
<channel>
  <title>Next.js Documentation</title>
  <link>https://nextjs.org/docs</link>
  <description>The React Framework for the Web</description>
</channel>
 
</rss>`)
}
```

## Opções de configuração de segmento
Os manipuladores de rota usam a mesma [configuração de segmento de rota](h/docs/app/api-reference/file-conventions/route-segment-config.md) que páginas e layouts.

```ts
// app/items/route.ts

export const dynamic = 'auto'
export const dynamicParams = true
export const revalidate = false
export const fetchCache = 'auto'
export const runtime = 'nodejs'
export const preferredRegion = 'auto'
```

Consulte a [referência da API](/docs/app/api-reference/file-conventions/route-segment-config.md) para obter mais detalhes.
