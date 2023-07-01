# Instalação

Requisitos do sistema:

* Node.js 16.8ou mais tarde.
* macOS, Windows ( incluindo WSL ) e Linux são suportados.

### Instalação automática
Recomendamos a criação de um novo aplicativo Next.js usando `create-next-app`, que configura tudo automaticamente para você. Para criar um projeto, execute:

```bash
npx create-next-app@latest
```

Na instalação, você verá os seguintes prompts:

```bash
What is your project named? my-app
Would you like to use TypeScript? No / Yes
Would you like to use ESLint? No / Yes
Would you like to use Tailwind CSS? No / Yes
Would you like to use `src/` directory? No / Yes
Would you like to use App Router? (recommended) No / Yes
Would you like to customize the default import alias? No / Yes
```

O Next.js agora é fornecido com as opções: TypeScript, ESLint e Tailwind CSS por padrão. Você também pode optar por usar o diretório `src` para o seus códigos.

Após os prompts, `create-next-app` criará uma pasta com o nome do seu projeto e instalará as dependências necessárias.

> É bom saber: Enquanto você pode usar o Roteador de páginas no seu novo projeto. Recomendamos iniciar novos aplicativos com o App Router para aproveitar os recursos mais recentes do React.

### Instalação manual
Para criar manualmente um novo aplicativo Next.js, instale os pacotes necessários:

```bash
npm install next@latest react@latest react-dom@latest
```

Abra o `package.json` e adicione o seguinte scripts:

```bash
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

Esses scripts se referem aos diferentes estágios do desenvolvimento de um aplicativo:

* `dev`: executa `next dev` para iniciar o Next.js no modo de desenvolvimento.
* `build`: executa `next build` para criar o aplicativo para uso da produção.
* `start`: executa `next start` para iniciar um servidor de produção Next.js.
* `lint`: executa `next lint` para validar a configuração ESLint incorporada do Next.js.

### Crie a pasta `app`
Em seguida, crie uma pasta `app` e adicione os arquivos `layout.tsx` e `page.tsx`. Eles serão renderizados quando o usuário visitar a raiz do seu aplicativo.

![image](https://github.com/tavaresgerson/nextjsdocbr/assets/22455192/5b48cd0d-412f-486c-b929-8bd0d55eab2a)

Crie um [layout raiz](https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#root-layout-required) dentro do arquivo `app/layout.tsx` com as tags necessárias <html> e <body>:

```tsx
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

Por fim, crie uma página inicial `app/page.tsx` com algum conteúdo inicial:

```tsx
export default function Page() {
  return <h1>Hello, Next.js!</h1>
}
```

> É bom saber: Se você esquecer de criar o arquivo `layout.tsx`, o Next.js criará automaticamente esse arquivo para você ao executar o servidor de desenvolvimento com `next dev`.

### Crie a pasta `public`
Você pode opcionalmente criar uma pasta `public` para armazenar arquivos estáticos, como imagens, fontes, etc. Arquivos dentro do diretório `public` pode ser referenciado pelo seu código a partir da URL base (`/`).

### Execute o servidor de desenvolvimento

1. Execute `npm run dev` para iniciar o servidor de desenvolvimento.
2. Abra no seu navegador `http://localhost:3000` para visualizar seu aplicativo.
3. Edite `app/layout.tsx` ou `app/page.tsx` e salve para ver o resultado atualizado no seu navegador.
