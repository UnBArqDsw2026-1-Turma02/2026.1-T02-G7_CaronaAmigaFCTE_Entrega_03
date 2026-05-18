# Padrão de Projeto - Abstract Factory

## Introdução

O **Abstract Factory** é um padrão de projeto criacional que define uma interface para criar famílias de objetos relacionados sem acoplar o cliente às classes concretas. Ao delegar a criação de cada produto a uma fábrica abstrata, e prover fábricas concretas para cada variante (por exemplo, famílias por canal ou por provedor), o padrão permite trocar conjuntos inteiros de produtos de forma consistente e localizada, favorecendo portabilidade e extensibilidade [[1]](#ref1).  

No contexto do **CaronaAmigaFCTE**, Abstract Factory é útil quando o sistema precisa trabalhar com famílias de componentes que devem permanecer compatíveis entre si — por exemplo, um conjunto de objetos usados para entregar notificações por um canal específico. Este documento parafraseia as [fontes clássicas (GoF)](#referências-bibliográficas) e [contemporâneas (Refactoring Guru)](#referências-bibliográficas) e aplica o padrão ao subsistema de notificações.

## Objetivos

- Explicar o padrão **Abstract Factory**: intenção, motivação, aplicabilidade, participantes, colaborações e consequências.
- Relacionar o padrão ao domínio do **CaronaAmigaFCTE**, propondo um recorte aplicável..
- Fornecer um diagrama UML e um exemplo de implementação em **TypeScript**.

## Metodologia

1. Consultas às descrições do padrão nas referências fornecidas (GoF e Refactoring Guru)
2. Identificação de domínio do CaronaAmigaFCTE coerente com o padrão a partir dos requisitos do projeto.
3. Adequação do [Diagrama de Classes](https://unbarqdsw2026-1-turma02.github.io/2026.1-T02-G7_CaronaAmigaFCTE_Entrega_02/#/Modelagem/2.1.ModelagemEstatica/Diagrama_de_classes?id=diagrama-de-classes-1) para o padrão escolhido
4. Elaboração de um exemplo de código em *TypeScript* que implementa o padrão para o recorte escolhido.
4. Verificação de rastreabilidade com outros artefatos do repositório.

## Explicação do Padrão

### Intenção

Fornecer uma interface para criação de famílias de objetos relacionados sem expor suas classes concretas; o cliente obtém produtos por meio da fábrica abstrata e assim permanece desacoplado das implementações concretas [[3]](#ref3).

### Motivação

Sem Abstract Factory, o código costuma instanciar classes concretas diretamente ou espalhar condicionais para escolher variantes, dificultando a manutenção e a troca de implementações. Abstract Factory centraliza a decisão de criação e garante que os produtos usados juntos pertençam à mesma família, evitando incompatibilidades (por exemplo, formatador de mensagem e remetente de canais distintos).

### Aplicabilidade

- Quando o sistema precisa manipular conjuntos de objetos relacionados e deve permanecer independente das classes concretas.  
- Quando é necessário trocar famílias inteiras de produtos na inicialização ou em tempo de execução (via injeção ou configuração).  
- Quando a criação de objetos está dispersa ou misturada com lógica de negócio, indicando extração para fábricas.

### Participantes

<font size="3"><p style="text-align: center">Tabela 1: Participantes do Abstract Factory</p></font>

| Papel | Responsabilidade | Exemplo no CaronaAmigaFCTE |
|---|---|---|
| **AbstractFactory** | Declara a interface para criar cada tipo de produto da família | `NotificationFactory` |
| **ConcreteFactory** | Implementa criação de produtos concretos para uma variante | `EmailNotificationFactory`, `SmsNotificationFactory` |
| **AbstractProduct** | Define a interface para um tipo de produto | `INotificationFormatter`, `INotificationSender` |
| **ConcreteProduct** | Implementa a variante concreta do produto | `EmailFormatter`, `SmtpSender`, `SmsFormatter` |
| **Client** | Usa apenas interfaces das fábricas e produtos | `RideNotificationService` |

<font size="2"><p style="text-align: center">Fonte: [João Marcos Moraes de Andrade](https://github.com/JJOAOMARCOSS),  [Luiza da Silva Pugas](https://github.com/luizaxx) e [Wanjo Christopher Paraizo Escobar](https://github.com/wChrstphr), com base no Refactoring Guru [[1]](#ref1) e Gang of Four [[3]](#ref3), 2026.</p></font>


### Colaborações

- O `Client` recebe uma `NotificationFactory` (por injeção ou configuração) e solicita produtos (formatter, sender, template).  
- A `ConcreteFactory` produz objetos concretos compatíveis; o `Client` usa apenas suas interfaces abstratas.  
- A escolha da fábrica concreta é realizada em um ponto de inicialização (bootstrap) ou por um componente configurador.

### Consequências

Benefícios:

- Isolamento de classes concretas, reduzindo acoplamento entre consumidores e implementações.
- Troca fácil de famílias inteiras de produtos (consistência entre produtos garantida).
- Melhora da testabilidade ao permitir o uso de fábricas de teste ou mocks.

Custos/impactos:

- Aumento no número de interfaces e classes, elevando complexidade conceitual.
- Difícil extensão para novos tipos de produto sem modificar a interface da fábrica (soluções alternativas: catálogo de protótipos, operação parametrizada).

### Implementação (sugestões)

- Implementar métodos de criação (`createFormatter()`, `createSender()`, `createTemplate()`) na `NotificationFactory` e sobrescrevê-los nas fábricas concretas.
- Se apenas uma instância por família for necessária, considerar o padrão `Singleton` para a `ConcreteFactory`.
- Para maior flexibilidade, considerar um catálogo que mapeie chaves para protótipos ou classes (approach Prototype / class-based factory).

### Padrões Relacionados

- `Factory Method` — frequentemente usado internamente por cada fábrica para criar produtos.  
- `Prototype` — pode ser usado para inicializar fábricas com protótipos clonáveis.  
- `Singleton` — fábricas concretas podem ser singletons quando apropriado.  
- `Builder`, `Bridge`, `Facade` — padrões complementares conforme necessidade do subsistema.

## Recorte do Projeto e Diagrama UML

Como recorte, considera-se o envio de **notificações** relacionadas a eventos de carona (por exemplo, carona confirmada). O sistema pode evoluir para novos canais (push, SMS) e, com o Factory Method, a criação da mensagem de cada canal fica encapsulada no respectivo notificador.


<div align="center">
              Figura 1: Diagrama UML do Abstract Factory no recorte do módulo.

![Diagrama UML do Factory Method](../assets/factory-method-uml.png)

<font size="2"><p style="text-align: center">Fonte: [João Marcos Moraes de Andrade](https://github.com/JJOAOMARCOSS),  [Luiza da Silva Pugas](https://github.com/luizaxx) e [Wanjo Christopher Paraizo Escobar](https://github.com/wChrstphr), 2026.</p></font>
</div>

### Exemplo em TypeScript (simplificado)

O exemplo abaixo mostra uma maneira prática de implementar `NotificationFactory` com três produtos (formatter, sender, template) e duas fábricas concretas (`EmailNotificationFactory`, `SmsNotificationFactory`). O `RideNotificationService` usa a fábrica para compor e enviar a notificação sem depender de classes concretas.

```ts
// Interfaces (AbstractProducts)
export interface INotificationFormatter { format(data: any): string }
export interface INotificationSender { send(address: string, payload: string): Promise<void> }
export interface INotificationTemplate { build(event: any): any }

// Abstract Factory
export interface NotificationFactory {
  createFormatter(): INotificationFormatter
  createSender(): INotificationSender
  createTemplate(): INotificationTemplate
}

// Concrete Products - Email
class EmailFormatter implements INotificationFormatter {
  format(data: any) { return `Assunto: ${data.subject}\n${data.body}` }
}
class SmtpSender implements INotificationSender {
  async send(address: string, payload: string) { console.log(`SMTP -> ${address}:`, payload) }
}
class EmailTemplate implements INotificationTemplate {
  build(event: any) { return { subject: `Atualização: ${event.type}`, body: event.message } }
}

// Concrete Products - SMS
class SmsFormatter implements INotificationFormatter {
  format(data: any) { return `${data.body}` }
}
class SmsGatewaySender implements INotificationSender {
  async send(address: string, payload: string) { console.log(`SMS -> ${address}:`, payload) }
}
class SmsTemplate implements INotificationTemplate {
  build(event: any) { return { body: `${event.type}: ${event.message}` } }
}

// Concrete Factories
export class EmailNotificationFactory implements NotificationFactory {
  createFormatter() { return new EmailFormatter() }
  createSender() { return new SmtpSender() }
  createTemplate() { return new EmailTemplate() }
}

export class SmsNotificationFactory implements NotificationFactory {
  createFormatter() { return new SmsFormatter() }
  createSender() { return new SmsGatewaySender() }
  createTemplate() { return new SmsTemplate() }
}

// Client
export class RideNotificationService {
  constructor(private factory: NotificationFactory) {}

  async notify(event: any, address: string) {
    const template = this.factory.createTemplate()
    const payloadData = template.build(event)
    const formatter = this.factory.createFormatter()
    const payload = formatter.format(payloadData)
    const sender = this.factory.createSender()
    await sender.send(address, payload)
  }
}

// Usage example (bootstrap)
const factory = new EmailNotificationFactory()
const svc = new RideNotificationService(factory)
svc.notify({ type: 'Carona Confirmada', message: 'Sua carona foi confirmada' }, 'user@example.com')
```

## Conclusão

Abstract Factory oferece um mecanismo para agrupar a criação de objetos relacionados por família, adequado ao subsistema de notificações do CaronaAmigaFCTE. A abordagem preserva a modularidade do sistema e facilita a adição de novos canais sem mudanças dispersas no código.

## Referências Bibliográficas

> <a id="ref1"></a>1. Refactoring.Guru. *Abstract Factory*. Disponível em: https://refactoring.guru/design-patterns/abstract-factory. Acesso em: 18 mai. 2026.
>
> <a id="ref2"></a>2. Refactoring.Guru. *Abstract Factory — exemplos e explicações*. Disponível em: https://refactoring.guru/pt-br/design-patterns/abstract-factory. Acesso em: 18 mai. 2026.
>
> <a id="ref3"></a>3. GAMMA, Erich; HELM, Richard; JOHNSON, Ralph; VLISSIDES, John. *Design Patterns: Elements of Reusable Object-Oriented Software*. Addison-Wesley, 1994. (Seção: Abstract Factory). Parafraseado.

## Histórico de Versões

| Versão | Data | Descrição | Autor(es) | Revisor(es) | Detalhes da revisão |
| :----: | :--: | --------- | ----------- | ------ | :---: |
| 1.0 | 18/05/2026 | Artefato inicial seguindo template do projeto |  [Wanjo Christopher Paraizo Escobar](https://github.com/wChrstphr) | [João Marcos Moraes de Andrade](https://github.com/JJOAOMARCOSS) | Estrutura e conteúdo base, recorte de Notificações e exemplo TypeScript (TOI) |


