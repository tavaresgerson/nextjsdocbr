---
título: Instalação
descrição: Crie um novo aplicativo Next.js com `create-next-app`. Configure o TypeScript, estilos e configure seu arquivo `next.config.js`.
---

Requisitos de sistema:

- [Node.js 18.17](https://nodejs.org/) ou posterior.
- macOS, Windows (incluindo WSL) e Linux são suportados.

## Instalação Automática

Recomendamos iniciar um novo aplicativo Next.js usando [`create-next-app`](/docs/app/api-reference/create-next-app), que configura tudo automaticamente para você. Para criar um projeto, execute:

```bash filename="Terminal"
npx create-next-app@latest
```

Na instalação, você verá os seguintes prompts:

```txt filename="Terminal"
What is your project named? my-app
Would you like to use TypeScript? No / Yes
Would you like to use ESLint? No / Yes
Would you like to use Tailwind CSS? No / Yes
Would you like to use `src/` directory? No / Yes
Would you like to use App Router? (recommended) No / Yes
Would you like to customize the default import alias (@/*)? No / Yes
What import alias would you like configured? @/*
```

Após as instruções, `create-next-app` criará uma pasta com o nome do seu projeto e instalará as dependências necessárias.

Se você é novo no Next.js, consulte a documentação da [estrutura do projeto](/docs/getting-started/project-structure) para obter uma visão geral de todos os arquivos e pastas possíveis em seu aplicativo.

::: tip **É bom saber**:
- Next.js agora vem com [TypeScript](/docs/app/building-your-application/configurando/typescript), [ESLint](/docs/app/building-your-application/configurando/eslint) e [ Configuração Tailwind CSS](/docs/app/building-your-application/styling/tailwind-css) por padrão.
- Opcionalmente, você pode usar um [diretório `src`](/docs/app/building-your-application/configurando/src-directory) na raiz do seu projeto para separar o código do seu aplicativo dos arquivos de configuração.
:::

## Instalação manual

Para criar manualmente um novo aplicativo Next.js, instale os pacotes necessários:

```bash filename="Terminal"
npm install next@latest react@latest react-dom@latest
```

Abra seu arquivo `package.json` e adicione os seguintes `scripts`:

```json filename="package.json"
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

Esses scripts referem-se aos diferentes estágios de desenvolvimento de um aplicativo:

- `dev`: executa [`next dev`](/docs/app/api-reference/next-cli#development) para iniciar Next.js no modo de desenvolvimento.
- `build`: executa [`next build`](/docs/app/api-reference/next-cli#build) para construir o aplicativo para uso em produção.
- `start`: executa [`next start`](/docs/app/api-reference/next-cli#production) para iniciar um servidor de produção Next.js.
- `lint`: executa [`next lint`](/docs/app/api-reference/next-cli#lint) para definir a configuração ESLint integrada do Next.js.

### Criando diretórios

Next.js usa roteamento do sistema de arquivos, o que significa que as rotas em seu aplicativo são determinadas pela forma como você estrutura seus arquivos.

#### O diretório `app`

Para novos aplicativos, recomendamos usar o [App Router](/docs/app). Este roteador permite que você use os recursos mais recentes do React e é uma evolução do [Roteador de páginas](/docs/pages) com base no feedback da comunidade.

Crie uma pasta `app/` e adicione um arquivo `layout.tsx` e `page.tsx`. Eles serão renderizados quando o usuário visitar a raiz do seu aplicativo (`/`).

<div class="one-image">
<img
    alt="Estrutura de pastas do aplicativo"
    src="/assets/app-getting-started.avif"
/>
</div>

Crie um [layout raiz](/docs/app/building-your-application/routing/pages-and-layouts#root-layout-required) dentro de `app/layout.tsx` com os `<html>` e ` necessários <corpo>` tags:

::: code-group
```tsx [app/layout.tsx]
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

```jsx [app/layout.js]
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
```
:::

Por fim, crie uma página inicial `app/page.tsx` com algum conteúdo inicial:

::: code-group
```tsx [app/page.tsx]
export default function Page() {
  return <h1>Hello, Next.js!</h1>
}
```

```jsx [app/page.js]
export default function Page() {
  return <h1>Hello, Next.js!</h1>
}
```
:::

::: tip **É bom saber**
Se você esquecer de criar `layout.tsx`, Next.js criará automaticamente este arquivo ao executar o servidor de desenvolvimento com `next dev`.
:::

Saiba mais sobre [usar o App Router](/docs/app/building-your-application/routing/defining-routes).

#### O diretório `pages` (opcional)

Se preferir usar o Pages Router em vez do App Router, você pode criar um diretório `pages/` na raiz do seu projeto.

Em seguida, adicione um arquivo `index.tsx` dentro da pasta `pages`. Esta será sua página inicial (`/`):

```tsx filename="pages/index.tsx" switcher
export default function Page() {
  return <h1>Hello, Next.js!</h1>
}
```

Em seguida, adicione um arquivo `_app.tsx` dentro de `pages/` para definir o layout global. Saiba mais sobre o [arquivo de aplicativo personalizado](/docs/pages/building-your-application/routing/custom-app).

::: code-group
```tsx [pages/_app.tsx]
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
```

```jsx [pages/_app.js]
export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}
```
:::

Finalmente, adicione um arquivo `_document.tsx` dentro de `pages/` para controlar a resposta inicial do servidor. Saiba mais sobre o [arquivo de documento personalizado](/docs/pages/building-your-application/routing/custom-document).

```tsx filename="pages/_document.tsx" switcher
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
```

Saiba mais sobre [usar o roteador de páginas](/docs/pages/building-your-application/routing/pages-and-layouts).

::: tip **É bom saber**
Embora você possa usar ambos os roteadores no mesmo projeto, as rotas em `app` serão priorizadas em vez de `pages`. Recomendamos usar apenas um roteador em seu novo projeto para evitar confusão.
:::

#### A pasta `public` (opcional)

Crie uma pasta `public` para armazenar ativos estáticos, como imagens, fontes, etc. Os arquivos dentro do diretório `public` podem então ser referenciados pelo seu código a partir do URL base (`/`).

## Execute o servidor de desenvolvimento

1. Execute `npm run dev` para iniciar o servidor de desenvolvimento.
2. Visite `http://localhost:3000` para visualizar seu aplicativo.
3. Edite o arquivo `app/page.tsx` (ou `pages/index.tsx`) e salve-o para ver o resultado atualizado em seu navegador.
