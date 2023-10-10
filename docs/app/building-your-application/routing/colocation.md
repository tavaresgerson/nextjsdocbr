# Organização do Projeto e Colocação de Arquivos

Além das convenções de roteamento de pastas e arquivos, Next.js não tem opinião sobre como você organiza e coloca seus arquivos de projeto.

Esta página compartilha o comportamento padrão e os recursos que você pode usar para organizar seu projeto.

* [Colocação segura por padrão](#coloca%C3%A7%C3%A3o-segura-por-padr%C3%A3o)
* [Recursos de organização do projeto](#recursos-de-organiza%C3%A7%C3%A3o-do-projeto)
* [Estratégias de organização do projeto](#estrat%C3%A9gias-de-organiza%C3%A7%C3%A3o-do-projeto)

## Colocação segura por padrão
No diretório do aplicativo, a hierarquia de pastas aninhadas define a estrutura da rota.

Cada pasta representa um segmento de rota mapeado para um segmento correspondente em um caminho de URL.

No entanto, mesmo que a estrutura da rota seja definida por meio de pastas, uma rota não estará acessível publicamente até que um arquivo `page.js` ou `route.js` seja adicionado a um segmento de rota.

![image](https://github.com/tavaresgerson/nextjsdocbr/assets/22455192/ffcb4e6c-31e5-4351-92ac-9685cec92b1a)

E, mesmo quando uma rota se torna acessível publicamente, apenas o **conteúdo retornado** por `page.js` ou `route.js` é enviado ao cliente.

![image](https://github.com/tavaresgerson/nextjsdocbr/assets/22455192/f1aedd53-9dfe-4c05-bfb2-aa377ae05ed4)

Isso significa que os **arquivos do projeto** podem ser **colocados com segurança** dentro de segmentos de rota no diretório do aplicativo sem serem roteáveis acidentalmente.

![image](https://github.com/tavaresgerson/nextjsdocbr/assets/22455192/9c487945-bf25-4ead-98d1-138d5a25a0c3)

> **Bom saber:**
> - Isso é diferente do diretório `pages`, onde qualquer arquivo nas páginas é considerado uma rota.
> - Embora você possa colocar seus arquivos de projeto no aplicativo, não é necessário. Se preferir, você pode mantê-los fora do diretório `app`.

## Recursos de organização do projeto
Next.js fornece vários recursos para ajudá-lo a organizar seu projeto.

### Pastas Privadas
Pastas privadas podem ser criadas prefixando uma pasta com um sublinhado: `_folderName`

Isso indica que a pasta é um detalhe de implementação privado e não deve ser considerada pelo sistema de roteamento, **optando assim pela saída da pasta e de todas as suas subpastas** do roteamento.

![image](https://github.com/tavaresgerson/nextjsdocbr/assets/22455192/066a0da1-9ce2-4299-a6a1-da6f21ffdf99)

Como os arquivos no diretório do aplicativo podem ser colocados com segurança por padrão, as pastas privadas não são necessárias para a colocação. No entanto, eles podem ser úteis para:

- Separando a lógica da UI da lógica de roteamento.
- Organização consistente de arquivos internos em um projeto e no ecossistema Next.js.
- Classificando e agrupando arquivos em editores de código.
- Evitando possíveis conflitos de nomenclatura com futuras convenções de arquivo Next.js.

> **Bom saber**
> - Embora não seja uma convenção de estrutura, você também pode considerar marcar arquivos fora de pastas privadas como "privados" usando o mesmo padrão de sublinhado.
> - Você pode criar segmentos de URL que começam com um sublinhado prefixando o nome da pasta com `%5F` (a forma codificada em URL de um sublinhado): `%5FfolderName`.
> - Se você não usa pastas privadas, seria útil conhecer as [convenções de arquivo especiais](/docs/getting-started/project-structure.md) do Next.js para evitar conflitos de nomenclatura inesperados.

### Grupos de rotas
Grupos de rotas podem ser criados colocando uma pasta entre parênteses: `(folderName)`

Isso indica que a pasta é para fins organizacionais e **não deve** ser incluída no caminho da URL da rota.

![image](https://github.com/tavaresgerson/nextjsdocbr/assets/22455192/e86e1462-d1d1-447b-971b-4149b333b628)

Os grupos de rotas são úteis para:

- Organizar [rotas em grupos](/docs/app/building-your-application/routing/route-groups.md), por ex.: por seção do site, intenção ou equipe.
- Habilitando layouts aninhados no mesmo nível de segmento de rota:
  - [Criação de vários layouts aninhados no mesmo segmento, incluindo vários layouts raiz](/docs/app/building-your-application/routing/route-groups.md)
  - [Adicionar um layout a um subconjunto de rotas em um segmento comum](/docs/app/building-your-application/routing/route-groups.md)


## Diretório `src`
Next.js suporta o armazenamento de código de aplicativo (incluindo `app`) dentro de um [diretório `src`](/docs/app/building-your-application/configuring/src-directory.md) opcional. Isso separa o código do aplicativo dos arquivos de configuração do projeto, que ficam principalmente na raiz de um projeto.

![image](https://github.com/tavaresgerson/nextjsdocbr/assets/22455192/c9405ee2-612e-412b-a451-f8767ae12016)

### Aliases do caminho do módulo
Next.js oferece suporte a aliases de caminho de módulo, que facilitam a leitura e a manutenção de importações em arquivos de projeto profundamente aninhados.

```js
// app/dashboard/settings/analytics/page.js

// antes
import { Button } from '../../../components/button'
 
// depois
import { Button } from '@/components/button'
```

## Estratégias de organização do projeto
Não existe uma maneira “certa” ou “errada” quando se trata de organizar seus próprios arquivos e pastas em um projeto Next.js.

A seção a seguir lista uma visão geral de alto nível das estratégias comuns. A lição mais simples é escolher uma estratégia que funcione para você e sua equipe e ser consistente em todo o projeto.

> **É bom saber:** em nossos exemplos abaixo, estamos usando `components` e pastas `lib` como espaços reservados generalizados, sua nomenclatura não tem significado especial na estrutura e seus projetos podem usar outras pastas como `ui`, `utils`, `hooks`, `styles`, etc.

### Armazene arquivos de projeto fora do `app`
Essa estratégia armazena todo o código do aplicativo em pastas compartilhadas na raiz do seu projeto e mantém o diretório do aplicativo apenas para fins de roteamento.

![image](https://github.com/tavaresgerson/nextjsdocbr/assets/22455192/395a1ba0-38bc-4ece-8c9c-bbf278690ded)

### Armazene arquivos de projeto em pastas de nível superior dentro de `app`
Essa estratégia armazena todo o código do aplicativo em pastas compartilhadas na raiz do diretório `app`.

![image](https://github.com/tavaresgerson/nextjsdocbr/assets/22455192/2ea1a21e-4b0d-4856-8edb-37cb167a1f36)

### Divida os arquivos do projeto por recurso ou rota
Essa estratégia armazena o código do aplicativo compartilhado globalmente no diretório raiz do aplicativo e divide o código do aplicativo mais específico nos segmentos de rota que os utilizam.

![image](https://github.com/tavaresgerson/nextjsdocbr/assets/22455192/79773cdd-0092-4bfb-9fdc-e06f467d7105)


