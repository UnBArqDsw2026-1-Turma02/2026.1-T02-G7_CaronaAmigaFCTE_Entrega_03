# Padrão de Projeto - Prototype

## Introdução

_Resumo breve do que é o padrão e por que ele é relevante no Carona Amiga FCTE._

## Objetivos

O objetivo do padrão Prototype é permitir a criação de novos objetos a partir da cópia de um objeto já existente, chamado de protótipo. Em vez de construir uma nova instância do zero, repetindo todos os parâmetros, configurações e regras de inicialização, o sistema solicita que o próprio objeto original gere uma cópia de si, normalmente por meio de um método de clonagem.

Essa cópia nasce com o mesmo estado inicial do protótipo e, depois disso, pode ter apenas os dados necessários alterados. No contexto do Carona Amiga FCTE, isso pode ser útil para reaproveitar estruturas semelhantes, como modelos de carona, preferências de usuário, rotas recorrentes ou solicitações com dados parecidos, evitando repetição na criação dos objetos e reduzindo o acoplamento com classes concretas.

## Metodologia

_Explicar, em alto nível, como o conteúdo foi produzido e quais artefatos do projeto serviram de base._

## Explicação do Padrão

### Intenção

_Descrever o objetivo central do padrão._

### Motivação

_Apontar o problema que o padrão resolve no contexto do sistema._

### Aplicabilidade

_Indicar em quais situações o padrão faz sentido no Carona Amiga FCTE._

### Participantes

_Listar os papéis principais envolvidos no padrão._

### Colaborações

_Mostrar, em termos gerais, como os participantes interagem._

### Consequências

_Registrar benefícios, custos e impactos de usar o padrão._

### Implementação

_Apontar como o padrão poderia ser estruturado no projeto._

### Padrões Relacionados

_Citar padrões que se conectam ao padrão escolhido._

## Recorte do Projeto e TOI Ilustrativo

_Definir qual parte do Carona Amiga FCTE será usada como exemplo e indicar, de forma resumida, como o padrão apareceria no diagrama de classes._

## Conclusão

O padrão Prototype se encaixa no Carona Amiga FCTE como uma solução criacional útil para cenários em que novos objetos precisam ser formados com base em informações já existentes. Ao permitir a clonagem de objetos configurados previamente, o padrão diminui a repetição de lógica de criação, reduz dependências com classes concretas e contribui para uma arquitetura mais flexível, especialmente em partes do sistema que possam lidar com variações de cadastros, preferências, rotas ou solicitações de carona.

## Referências Bibliográficas

> <a id="ref1"></a> REFACTORING GURU. **Prototype**. Disponível em: <https://refactoring.guru/pt-br/design-patterns/prototype>. Acesso em: 19 maio 2026.

> <a id="ref2"></a> MOREIRA, Diogo. **Padrão Prototype**. Disponível em: <https://diogomoreira.gitbook.io/padroes-de-projeto/padroes-gof-criacionais/padrao-prototype>. Acesso em: 19 maio 2026.

## Histórico de Versões

| Versão |    Data    | Descrição                          | Autor(es)                                                   | Revisor(es)                                               |            Detalhes da revisão             |
| :----: | :--------: | ---------------------------------- | ----------------------------------------------------------- | --------------------------------------------------------- | :----------------------------------------: |
|  1.0   | 19/05/2026 | Adição dos objetivos e referências | [Karoline Luz da Conceição](https://github.com/KarolineLuz) | [Ana Victória Guedes da Costa](https://github.com/navicg) | Revisão das seções adicionadas ao artefato |
