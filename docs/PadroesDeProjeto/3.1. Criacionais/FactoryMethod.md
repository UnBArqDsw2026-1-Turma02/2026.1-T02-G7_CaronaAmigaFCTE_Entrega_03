# Padrão de Projeto - Factory Method

## Introdução

O **Factory Method** é um padrão de projeto criacional que define uma **interface para criação de objetos**, mas permite que **subclasses decidam qual classe instanciar**. Na prática, ele move a decisão de instância para um ponto único (a “fábrica”), evitando que o restante do código dependa diretamente de classes concretas [[1]](#ref1).

No contexto do **Carona Amiga FCTE**, esse padrão é útil quando o sistema precisa criar objetos semelhantes (ex.: mensagens/notificações) de formas diferentes, dependendo do **canal** (e-mail, push, etc.) ou do **contexto** do evento (carona confirmada, cancelada, etc.), sem espalhar `new` e `switch` por todo o código.

## Objetivos

Este artefato tem como finalidade:

- Explicar o padrão **Factory Method**, descrevendo intenção, motivação, aplicabilidade, participantes, colaborações e consequências;
- Relacionar o padrão ao domínio do **Carona Amiga FCTE**, indicando um **recorte do projeto** onde ele se encaixa;
- Apresentar um **diagrama UML** do recorte escolhido e um exemplo de código em **TypeScript**, para guiar modelagem/implementação.

## Metodologia

1. Foi consultada a descrição do padrão **Factory Method** no Refactoring.Guru (PT-BR) [[1]](#ref1).

2. Para o recorte do projeto, foram consideradas necessidades do domínio do **Carona Amiga FCTE** e discussões do grupo (por exemplo, criação de mensagens/tipos de usuário), buscando um caso em que a criação de objetos pudesse ficar **centralizada** e **extensível**.

3. A partir disso, foi proposto um recorte coerente (criação de **mensagens de notificação** por canal) e elaborado um **diagrama UML** com papéis e relacionamentos típicos do Factory Method.

4. Os artefatos deste documento e o diagrama UML foram desenvolvidos ao utilizar o **Visual Studio Code (VSCode)** como IDE principal.

## Explicação do Padrão

### Intenção

Definir um ponto único de criação de objetos (o **Factory Method**) para que o código cliente dependa de **abstrações** (interfaces/abstratas) e não de classes concretas, permitindo adicionar novos tipos de produto sem modificar o fluxo principal [[1]](#ref1).

### Motivação

Sem o Factory Method, é comum que a aplicação crie objetos com `new` diretamente, ou use condicionais espalhadas, como:

- “Se o canal for e-mail, crie `MensagemEmail`”
- “Se o canal for push, crie `MensagemPush`”

No **Carona Amiga FCTE**, isso pode acontecer ao notificar usuários sobre eventos importantes (carona confirmada, cancelada, avaliação disponível, etc.). Se a lógica de notificação precisar suportar novos canais (por exemplo, SMS) ou novas variações de mensagem, o código tende a crescer com `if/else` e alterações em vários lugares.

O **Factory Method** resolve esse acoplamento ao concentrar a criação em uma hierarquia de criadores, onde cada implementação sabe qual “produto” (mensagem) instanciar.

### Aplicabilidade

O Factory Method faz sentido quando:

- A classe não deve depender de classes concretas para criar objetos, apenas de interfaces/abstrações;
- Há necessidade de **estender** o sistema com novos “produtos” sem alterar o fluxo principal;
- A criação varia por algum critério estável (ex.: **canal de notificação**) e a aplicação não deve espalhar essa decisão.

No recorte deste projeto:

- **Produtos:** mensagens de notificação (`MensagemNotificacao`).
- **Criadores:** notificadores por canal (`NotificadorEmail`, `NotificadorPush`).

### Participantes

<font size="3"><p style="text-align: center">Tabela 1: Participantes do Factory Method</p></font>

| Papel | Responsabilidade | Exemplo no Carona Amiga FCTE |
|---|---|---|
| **Product** | Define a interface do objeto criado | `MensagemNotificacao` |
| **ConcreteProduct** | Implementa variações concretas do produto | `MensagemEmail`, `MensagemPush` |
| **Creator** | Declara o Factory Method e contém a lógica que usa o produto | `Notificador` |
| **ConcreteCreator** | Sobrescreve o Factory Method para retornar um ConcreteProduct | `NotificadorEmail`, `NotificadorPush` |

<font size="2"><p style="text-align: center">Fonte: [João Marcos Moraes de Andrade](https://github.com/JJOAOMARCOSS),  [Luiza da Silva Pugas](https://github.com/luizaxx) e [Wanjo Christopher Paraizo Escobar](https://github.com/wChrstphr), com base no Refactoring.Guru [[1]](#ref1), 2026.</p></font>

### Colaborações

- O **Creator** (`Notificador`) define o fluxo de notificação (`notificar()`), mas não decide diretamente qual mensagem concreta criar.
- Cada **ConcreteCreator** implementa o **Factory Method** (`criarMensagem()`) para retornar o produto adequado ao canal.
- O cliente usa o Creator e trata o produto como **abstração** (`MensagemNotificacao`), reduzindo dependência de detalhes.

### Consequências

Benefícios:

- Reduz acoplamento do código cliente com classes concretas de criação.
- Facilita extensão: adicionar `NotificadorSMS` não exige alterar `Notificador`.
- Melhora testabilidade: o Creator pode ser testado com produtos substitutos/mocks.

Custos/impactos:

- Aumenta o número de classes (Creators/Products) no modelo.
- Pode parecer “mais complexo” quando existe apenas um único produto concreto.

### Implementação

No módulo de notificações, uma forma de estruturar o padrão é:

- Criar uma interface `MensagemNotificacao` com um método como `formatar()`;
- Criar `MensagemEmail` e `MensagemPush` como produtos concretos;
- Criar `Notificador` como classe abstrata com `notificar(evento)` e um Factory Method `criarMensagem()`;
- Implementar `NotificadorEmail` e `NotificadorPush` para instanciar as mensagens adequadas.

---

## Recorte do Projeto e Diagrama UML

Como recorte, considera-se o envio de **notificações** relacionadas a eventos de carona (por exemplo, carona confirmada). O sistema pode evoluir para novos canais (push, SMS) e, com o Factory Method, a criação da mensagem de cada canal fica encapsulada no respectivo notificador.

<div align="center">
              Figura 1: Diagrama UML do Factory Method no recorte do módulo.

![Diagrama UML do Factory Method](../assets/factory-method-uml.png)

<font size="2"><p style="text-align: center">Fonte: [João Marcos Moraes de Andrade](https://github.com/JJOAOMARCOSS),  [Luiza da Silva Pugas](https://github.com/luizaxx) e [Wanjo Christopher Paraizo Escobar](https://github.com/wChrstphr), 2026.</p></font>
</div>

---

## Vídeo de explicação e execução

Link do vídeo: _a definir_

---

## Código (TypeScript)

<details>
  <summary><strong>Código para Factory Method (Notificador + Mensagens por canal)</strong></summary>

```ts
// Product
export interface MensagemNotificacao {
	formatar(): string;
}

// ConcreteProducts
export class MensagemEmail implements MensagemNotificacao {
	public constructor(
		private readonly assunto: string,
		private readonly corpo: string,
	) {}

	public formatar(): string {
		return [`Assunto: ${this.assunto}`, this.corpo].join("\n\n");
	}
}

export class MensagemPush implements MensagemNotificacao {
	public constructor(private readonly titulo: string, private readonly texto: string) {}

	public formatar(): string {
		return `${this.titulo} — ${this.texto}`;
	}
}

// Creator
export abstract class Notificador {
	public notificar(evento: string, destinatario: string): void {
		const mensagem = this.criarMensagem(evento, destinatario);
		this.enviar(destinatario, mensagem);
	}

	protected abstract criarMensagem(
		evento: string,
		destinatario: string,
	): MensagemNotificacao;

	protected enviar(destinatario: string, mensagem: MensagemNotificacao): void {
		// Exemplo didático: em uma app real, aqui teria integração com provedor.
		console.log(`[ENVIADO PARA ${destinatario}]\n${mensagem.formatar()}`);
	}
}

// ConcreteCreators
export class NotificadorEmail extends Notificador {
	protected criarMensagem(evento: string, destinatario: string): MensagemNotificacao {
		const assunto = `Atualização da carona: ${evento}`;
		const corpo = `Olá, ${destinatario}! Sua carona teve a seguinte atualização: ${evento}.`;
		return new MensagemEmail(assunto, corpo);
	}
}

export class NotificadorPush extends Notificador {
	protected criarMensagem(evento: string, destinatario: string): MensagemNotificacao {
		const titulo = "Carona Amiga FCTE";
		const texto = `${destinatario}, evento: ${evento}.`;
		return new MensagemPush(titulo, texto);
	}
}

// Exemplo de uso
const evento = "Carona confirmada";
const usuario = "Luiza";

new NotificadorEmail().notificar(evento, usuario);
new NotificadorPush().notificar(evento, usuario);
```

</details>

## Conclusão

O **Factory Method** é uma alternativa simples e extensível para centralizar a criação de objetos no **Carona Amiga FCTE**. No recorte de notificações por canal, o padrão reduz acoplamento entre a lógica de uso (notificar) e as classes concretas (mensagens), facilitando evolução do sistema com novos canais e variações sem alterações espalhadas.

---

## Referências Bibliográficas

> <a id="ref1"></a>1. Refactoring.Guru. *Factory Method (Padrões de Projeto)*. Disponível em: https://refactoring.guru/pt-br/design-patterns/factory-method. Acesso em: 18 mai. 2026.
>
> <a id="ref2"></a>2. Refactoring.Guru. *Factory Method in TypeScript (Example)*. Disponível em: https://refactoring.guru/design-patterns/factory-method/typescript/example. Acesso em: 18 mai. 2026.
>
> <a id="ref3"></a>3. GAMMA, Erich; HELM, Richard; JOHNSON, Ralph; VLISSIDES, John. *Design Patterns: Elements of Reusable Object-Oriented Software*. Addison-Wesley, 1994.

## Histórico de Versões

| Versão | Data | Descrição | Autor(es) | Revisor(es) | Detalhes da revisão |
| :----: | :--: | --------- | ----------- | ------ | :---: |
| 1.0 | 15/05/2026 | Criação do esqueleto do documento | [João Marcos Moraes de Andrade](https://github.com/JJOAOMARCOSS) | [Wanjo Christopher Paraizo Escobar](https://github.com/wChrstphr) | Estrutura básica com as seções principais |
| 1.1 | 18/05/2026 | Preenchimento do conteúdo do padrão Factory Method | [João Marcos Moraes de Andrade](https://github.com/JJOAOMARCOSS) | [Wanjo Christopher Paraizo Escobar](https://github.com/wChrstphr) | Revisão de texto, referências, diagrama UML e exemplo TypeScript |