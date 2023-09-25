# Rotas Paralelas
O roteamento paralelo permite renderizar simultânea ou condicionalmente uma ou mais páginas no mesmo layout. Para seções altamente dinâmicas de um aplicativo, como painéis e feeds em sites sociais, o Roteamento Paralelo pode ser usado para implementar padrões de roteamento complexos.

Por exemplo, você pode renderizar simultaneamente as páginas de equipe e de análise.

![image](https://github.com/tavaresgerson/nextjsdocbr/assets/22455192/e1530565-eff1-4a02-b834-d23c29b409a0)

O roteamento paralelo permite definir erros independentes e estados de carregamento para cada rota à medida que são transmitidos de forma independente.

![image](https://github.com/tavaresgerson/nextjsdocbr/assets/22455192/fd6dee83-952a-4b5e-9a92-0556b8b80a5e)

O roteamento paralelo também permite renderizar condicionalmente um slot com base em determinadas condições, como o estado de autenticação. Isso permite código totalmente separado no mesmo URL.

![image](https://github.com/tavaresgerson/nextjsdocbr/assets/22455192/c928ecc5-6153-4de8-85f6-a03bf57706d6)

## Convenção
Rotas paralelas são criadas usando slots nomeados. Os slots são definidos com a convenção `@folder` e são passados para o layout de mesmo nível que os adereços.

> Os slots não são segmentos de rota e não afetam a estrutura do URL. O caminho do arquivo `/@team/members` estaria acessível em `/members`.

Por exemplo, a seguinte estrutura de arquivo define dois slots explícitos: `@analytics` e `@team`

![image](https://github.com/tavaresgerson/nextjsdocbr/assets/22455192/0f992fc0-023b-43da-b10d-def8faa06c03)

A estrutura de pastas acima significa que o componente em `app/layout.js` agora aceita os props `@analytics` e `@team` nos slots e pode renderizá-los em paralelo ao lado do adereço `children`:

```ts
// app/layout.tsx

export default function Layout(props: {
  children: React.ReactNode
  analytics: React.ReactNode
  team: React.ReactNode
}) {
  return (
    <>
      {props.children}
      {props.team}
      {props.analytics}
    </>
  )
}
```

> **É bom saber:** a propriedade `children` é um slot implícito que não precisa ser mapeado para uma pasta. Isso significa que `app/page.js` é equivalente a `app/@children/page.js`.

## Rotas incomparáveis
Por padrão, o conteúdo renderizado em um slot corresponderá ao URL atual.

No caso de um slot sem correspondência, o conteúdo renderizado pelo `Next.js` difere com base na técnica de roteamento e na estrutura de pastas.

### `default.js`
Você pode definir um arquivo `default.js` para renderizar como substituto quando o Next.js não puder recuperar o estado ativo de um slot com base na URL atual.

Considere a seguinte estrutura de pastas. O slot `@team` possui um diretório de configurações, mas `@analytics` não.

![image](https://github.com/tavaresgerson/nextjsdocbr/assets/22455192/1502eae9-2fc3-4973-88e3-8f20b8808cb3)

#### Navegação
Na navegação, o Next.js renderizará o estado anteriormente ativo do slot, mesmo que não corresponda ao URL atual.

#### recarregar
Ao recarregar, Next.js tentará primeiro renderizar o arquivo `default.js` do slot incomparável. Se isso não estiver disponível, um 404 será renderizado.

> O 404 para rotas sem correspondência ajuda a garantir que você não renderize acidentalmente uma rota que não deveria ser renderizada paralelamente.

## `useSelectedLayoutSegment(s)`
Tanto `useSelectedLayoutSegment` quanto `useSelectedLayoutSegments` aceitam um `paraleloRoutesKey`, que permite ler o segmento de rota ativo dentro desse slot.

```ts
// app/layout.tsx

'use client'
 
import { useSelectedLayoutSegment } from 'next/navigation'
 
export default async function Layout(props: {
  //...
  auth: React.ReactNode
}) {
  const loginSegments = useSelectedLayoutSegment('auth')
  // ...
}
```

Quando um usuário navega para `@auth/login` ou `/login` na barra de URL, `loginSegments` será igual à string `"login"`.

## Exemplos

### Modais
O roteamento paralelo pode ser usado para renderizar modais.

![image](https://github.com/tavaresgerson/nextjsdocbr/assets/22455192/5c8f4299-c935-4dc5-8862-b4d63188a68c)

O slot `@auth` renderiza um componente `<Modal>` que pode ser mostrado navegando até uma rota correspondente, por exemplo `/login`.

```ts
// app/layout.tsx

export default async function Layout(props: {
  // ...
  auth: React.ReactNode
}) {
  return (
    <>
      {/* ... */}
      {props.auth}
    </>
  )
}
```

```ts
// app/@auth/login/page.tsx

import { Modal } from 'components/modal'
 
export default function Login() {
  return (
    <Modal>
      <h1>Login</h1>
      {/* ... */}
    </Modal>
  )
}
```

Para garantir que o conteúdo do modal não seja renderizado quando não estiver ativo, você pode criar um arquivo `default.js` que retorne nulo.

```ts
// app/@auth/default.tsx

export default function Default() {
  return null
}
```

### Dispensando um modal
Se um modal foi iniciado através da navegação do cliente, por ex. usando `<Link href="/login">`, você pode descartar o modal chamando `router.back()` ou usando um componente `Link`.

```ts
// app/@auth/login/page.tsx

'use client'
import { useRouter } from 'next/navigation'
import { Modal } from 'components/modal'
 
export default async function Login() {
  const router = useRouter()
  return (
    <Modal>
      <span onClick={() => router.back()}>Close modal</span>
      <h1>Login</h1>
      ...
    </Modal>
  )
}
```

> Mais informações sobre modais são abordadas na seção [Rotas de interceptação](/docs/app/building-your-application/routing/intercepting-routes.md).

Se quiser navegar para outro lugar e descartar um modal, você também pode usar uma rota pega-tudo.

![image](https://github.com/tavaresgerson/nextjsdocbr/assets/22455192/72c87fe0-a093-4184-9e14-4e124eec9b11)

```ts
// app/@auth/[...catchAll]/page.tsx

export default function CatchAll() {
  return null
}
```

> As rotas pega-tudo têm precedência sobre `default.js`.

## Rotas Condicionais
Rotas paralelas podem ser usadas para implementar roteamento condicional. Por exemplo, você pode renderizar uma rota `@dashboard` ou `@login` dependendo do estado de autenticação.

```ts
// app/layout.tsx

import { getUser } from '@/lib/auth'
 
export default function Layout({
  dashboard,
  login,
}: {
  dashboard: React.ReactNode
  login: React.ReactNode
}) {
  const isLoggedIn = getUser()
  return isLoggedIn ? dashboard : login
}
```

![image](https://github.com/tavaresgerson/nextjsdocbr/assets/22455192/3abfa73b-e3a4-456d-b37d-b9c48195562d)
