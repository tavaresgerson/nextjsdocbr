# Internacionalização

Next.js permite configurar o roteamento e a renderização de conteúdo para oferecer suporte a vários idiomas. Tornar seu site adaptável a diferentes localidades inclui conteúdo traduzido (localização) e rotas internacionalizadas.

## Terminologia
* **Locale**: um identificador para um conjunto de preferências de idioma e formatação. Isso geralmente inclui o idioma preferido do usuário e possivelmente sua região geográfica.
  * `en-US`: Inglês falado nos Estados Unidos
  * `nl-NL`: holandês falado na Holanda
  * `nl`: Holandês, sem região específica
 
## Visão geral do roteamento
É recomendado usar as preferências de idioma do usuário no navegador para selecionar qual localidade usar. Alterar seu idioma preferido modificará o cabeçalho `Accept-Language` recebido em seu aplicativo.

Por exemplo, usando as bibliotecas a seguir, você pode examinar uma `Request` recebida para determinar qual localidade selecionar, com base nos `headers`, nas localidades que você planeja oferecer suporte e na localidade padrão.

```js
import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
 
let headers = { 'accept-language': 'en-US,en;q=0.5' }
let languages = new Negotiator({ headers }).languages()
let locales = ['en-US', 'nl-NL', 'nl']
let defaultLocale = 'en-US'
 
match(languages, locales, defaultLocale) // -> 'en-US'
```

O roteamento pode ser internacionalizado pelo subcaminho (`/fr/products`) ou pelo domínio (`my-site.fr/products`). Com essas informações, agora você pode redirecionar o usuário com base na localidade dentro do [Middleware](/docs/app/building-your-application/routing/middleware.md).

```js
// middleware.js

let locales = ['en-US', 'nl-NL', 'nl']
 
// Obtenha a localidade preferida, semelhante ao acima ou usando uma biblioteca
function getLocale(request) { ... }
 
export function middleware(request) {
  // Verifique se há algum código de idioma compatível no nome do caminho
  const { pathname } = request.nextUrl
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )
 
  if (pathnameHasLocale) return
 
  // Redirecionar se não houver localidade
  const locale = getLocale(request)
  request.nextUrl.pathname = `/${locale}${pathname}`
  // por exemplo. a solicitação recebida é /products
  // A nova URL agora é /en-US/products
  return Response.redirect(request.nextUrl)
}
 
export const config = {
  matcher: [
    // Ignore todos os caminhos internos (_next)
    '/((?!_next).*)',
    // Opcional: execute apenas no URL raiz (/)
    // '/'
  ],
}
```

Finalmente, certifique-se de que todos os arquivos especiais dentro de `app/` estejam aninhados em `app/[lang]`. Isso permite que o roteador Next.js manipule dinamicamente diferentes localidades na rota e encaminhe o parâmetro `lang` para cada layout e página. Por exemplo:

```js
// app/[lang]/page.js

// Agora você tem acesso à localidade atual
// por exemplo. /en-US/products -> `lang` é "en-US"
export default async function Page({ params: { lang } }) {
  return ...
}
```

O layout raiz também pode ser aninhado na nova pasta (por exemplo, `app/[lang]/layout.js`).

## Localização
Alterar o conteúdo exibido com base na localidade ou localização preferida do usuário não é algo específico do Next.js. Os padrões descritos abaixo funcionariam da mesma forma com qualquer aplicativo da web.

Vamos supor que queremos oferecer suporte a conteúdo em inglês e holandês em nosso aplicativo. Poderíamos manter dois “dicionários” diferentes, que são objetos que nos fornecem um mapeamento de alguma chave para uma string localizada. Por exemplo:

```json
// dictionaries/en.json

{
  "products": {
    "cart": "Add to Cart"
  }
}
```

```json
// dictionaries/nl.json

{
  "products": {
    "cart": "Toevoegen aan Winkelwagen"
  }
}
```

Podemos então criar uma função `getDictionary` para carregar as traduções para o local solicitado:

```js
// app/[lang]/dictionaries.js

import 'server-only'
 
const dictionaries = {
  en: () => import('./dictionaries/en.json').then((module) => module.default),
  nl: () => import('./dictionaries/nl.json').then((module) => module.default),
}
 
export const getDictionary = async (locale) => dictionaries[locale]()
```

Dado o idioma atualmente selecionado, podemos buscar o dicionário dentro de um layout ou página.

```js
// app/[lang]/page.js

import { getDictionary } from './dictionaries'
 
export default async function Page({ params: { lang } }) {
  const dict = await getDictionary(lang) // en
  return <button>{dict.products.cart}</button> // Add to Cart
}
```

Como todos os layouts e páginas no diretório `app/` são padronizados como componentes do servidor, não precisamos nos preocupar com o tamanho dos arquivos de tradução que afetam o tamanho do pacote JavaScript do lado do cliente. Este código só será executado no servidor e apenas o HTML resultante será enviado ao navegador.

## Geração Estática
Para gerar rotas estáticas para um determinado conjunto de localidades, podemos usar `generateStaticParams` com qualquer página ou layout. Isto pode ser global, por exemplo, no layout raiz:

```js
// app/[lang]/layout.js

export async function generateStaticParams() {
  return [{ lang: 'en-US' }, { lang: 'de' }]
}
 
export default function Root({ children, params }) {
  return (
    <html lang={params.lang}>
      <body>{children}</body>
    </html>
  )
}
```

## Recursos
- [Minimal i18n routing and translations](https://github.com/vercel/next.js/tree/canary/examples/app-dir-i18n-routing)
- [next-intl](https://next-intl-docs.vercel.app/docs/next-13)
- [next-international](https://github.com/QuiiBz/next-international)
- [next-i18n-router](https://github.com/i18nexus/next-i18n-router)
