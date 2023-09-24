# Manipulação de erros

A convenção do arquivo `error.js` permite que você lide normalmente com erros de tempo de execução inesperados em [rotas aninhadas](/docs/app/building-your-application/routing.md).

* Envolva automaticamente um segmento de rota e seus filhos aninhados em um [React Error Boundary](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary).
* Crie uma UI de erro personalizada para segmentos específicos usando a hierarquia do sistema de arquivos para ajustar a granularidade.
* Isole erros nos segmentos afetados enquanto mantém o restante do aplicativo funcional.
* Adicione funcionalidade para tentar se recuperar de um erro sem recarregar a página inteira.

Crie uma UI de erro adicionando um arquivo `error.js` dentro de um segmento de rota e exportando um componente React:

![image](https://github.com/tavaresgerson/nextjsdocbr/assets/22455192/10a2f2c6-ab65-4ff0-9f60-c469396632da)

```ts
// app/dashboard/error.tsx

'use client' // Os componentes de erro devem ser componentes do cliente
 
import { useEffect } from 'react'
 
export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  useEffect(() => {
    // Registrar o erro em um serviço de relatório de erros
    console.error(error)
  }, [error])
 
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button
        onClick={
          // Tente recuperar tentando renderizar novamente o segmento
          () => reset()
        }
      >
        Tente novamente
      </button>
    </div>
  )
}
```

## Como funciona o `erro.js`

![image](https://github.com/tavaresgerson/nextjsdocbr/assets/22455192/6010b95e-41aa-4348-828c-6b3e584b7324)

* `error.js` cria automaticamente um [limite de erro React](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary) que envolve um segmento filho aninhado ou componente `page.js`.
* O componente React exportado do arquivo `error.js` é usado como componente substituto.
* Se um erro for gerado dentro do limite do erro, o erro será contido e o componente substituto será renderizado.
* Quando o componente de erro de fallback está ativo, os layouts acima do limite de erro mantêm seu estado e permanecem interativos, e o componente de erro pode exibir funcionalidade para recuperação do erro.

## Recuperando-se de erros
A causa de um erro às vezes pode ser temporária. Nestes casos, simplesmente tentar novamente pode resolver o problema.

Um componente de erro pode usar a função `reset()` para solicitar ao usuário que tente se recuperar do erro. Quando executada, a função tentará renderizar novamente o conteúdo do limite do Erro. Se for bem-sucedido, o componente de erro de fallback será substituído pelo resultado da nova renderização.

```ts
// app/dashboard/error.tsx

'use client'
 
export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  )
}
```

## Rotas aninhadas
Os componentes React criados por meio de arquivos especiais e que são renderizados em uma hierarquia aninhada específica.

Por exemplo, uma rota aninhada com dois segmentos que incluem arquivos `layout.js` e `error.js` são renderizadas na seguinte hierarquia de componentes simplificada:

![image](https://github.com/tavaresgerson/nextjsdocbr/assets/22455192/12b17359-ded9-4a23-99e5-472a2be28289)

A hierarquia de componentes aninhados tem implicações para o comportamento dos arquivos error.js em uma rota aninhada:

* Os erros aumentam até o limite de erro pai mais próximo. Isso significa que um arquivo error.js tratará erros para todos os seus segmentos filhos aninhados. A IU de erro mais ou menos granular pode ser obtida colocando arquivos `error.js` em diferentes níveis nas pastas aninhadas de uma rota.
* Um limite `error.js` **não** tratará erros lançados em um componente `layout.js` no mesmo segmento porque o limite de erro está aninhado dentro desse componente layouts.

## Tratamento de erros em layouts
Os limites de `error.js` não detectam erros lançados nos componentes `layout.js` ou `template.js` do mesmo segmento. Essa hierarquia intencional mantém a UI importante compartilhada entre rotas irmãs (como navegação) visível e funcional quando ocorre um erro.

Para lidar com erros em um layout ou modelo específico, coloque um arquivo `error.js` no segmento pai do layout.

Para lidar com erros no layout ou modelo raiz, use uma variação de error.js chamada global-error.js.

## Tratamento de erros em layouts raiz
O limite raiz `app/error.js` não captura erros lançados no componente raiz `app/layout.js` ou `app/template.js`.

Para lidar especificamente com erros nesses componentes raiz, use uma variação de `error.js` chamada `app/global-error.js` localizada no diretório raiz do aplicativo.

Ao contrário do `error.js` raiz, o limite de erro `global-error.js` envolve todo o aplicativo e seu componente substituto substitui o layout raiz quando ativo. Por isso, é importante observar que `global-error.js` deve definir suas próprias tags `<html>` e `<body>`.

`global-error.js` é a UI de erro menos granular e pode ser considerada um tratamento de erros "pega-tudo" para todo o aplicativo. É improvável que seja acionado com frequência, pois os componentes raiz são normalmente menos dinâmicos e outros limites do `error.js` detectarão a maioria dos erros.

Mesmo que um global-error.js seja definido, ainda é recomendado definir um `error.js` raiz cujo componente substituto será renderizado no layout raiz, que inclui UI e marca compartilhadas globalmente.

```ts
// app/global-error.tsx

'use client'
 
export default function GlobalError({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <html>
      <body>
        <h2>Something went wrong!</h2>
        <button onClick={() => reset()}>Try again</button>
      </body>
    </html>
  )
}
```

## Tratamento de erros do servidor
Se um erro for gerado dentro de um componente de servidor, Next.js encaminhará um objeto Error (sem informações confidenciais de erro na produção) para o arquivo `error.js` mais próximo como o suporte de erro.

### Protegendo informações confidenciais sobre erros
Durante a produção, o objeto `Error` encaminhado ao cliente inclui apenas uma mensagem genérica e uma propriedade `digest`.

Esta é uma precaução de segurança para evitar o vazamento de detalhes potencialmente confidenciais incluídos no erro para o cliente.

A propriedade `message` contém uma mensagem genérica sobre o erro e a propriedade `digest` contém um `hash` do erro gerado automaticamente que pode ser usado para corresponder ao erro correspondente nos logs do lado do servidor.

Durante o desenvolvimento, o objeto `Error` encaminhado ao cliente será serializado e incluirá a mensagem do erro original para facilitar a depuração.
