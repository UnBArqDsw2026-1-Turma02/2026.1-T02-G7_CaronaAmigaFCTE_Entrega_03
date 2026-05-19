# Padrão de Projeto - Observer

## Introdução

_Resumo breve do que é o padrão e por que ele é relevante no Carona Amiga FCTE._

## Objetivos

Este artefato tem como objetivo registrar a finalidade do padrão Observer no contexto do Carona Amiga FCTE, destacando sua contribuição para uma arquitetura em que componentes interessados possam reagir a mudanças de estado sem depender diretamente uns dos outros.

Também busca relacionar o padrão a situações do domínio em que eventos importantes, como alterações em solicitações, confirmações ou cancelamentos de caronas, precisam ser comunicados a outras partes do sistema de forma organizada, desacoplada e evolutiva.

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

O padrão Observer se encaixa no Carona Amiga FCTE como uma solução comportamental adequada para cenários em que mudanças relevantes no domínio precisam gerar reações em diferentes partes do sistema. Ao separar o elemento que sofre a alteração dos componentes que acompanham essa alteração, o padrão reduz o acoplamento, melhora a coesão das responsabilidades e favorece uma arquitetura mais flexível para notificações, atualizações de interface e regras associadas ao ciclo de vida das caronas.

## Referências Bibliográficas

> <a id="ref1"></a> REFACTORING GURU. **Observer**. Disponível em: <https://refactoring.guru/pt-br/design-patterns/observer>. Acesso em: 19 maio 2026.

> <a id="ref2"></a> MOREIRA, Diogo. **Padrão Observer**. Disponível em: <https://diogomoreira.gitbook.io/padroes-de-projeto/padroes-gof-comportamentais/padrao-observer>. Acesso em: 19 maio 2026.

## Histórico de Versões

| Versão |    Data    | Descrição                          | Autor(es)                                                   | Revisor(es)                                               |                  Detalhes da revisão                   |
| :----: | :--------: | ---------------------------------- | ----------------------------------------------------------- | --------------------------------------------------------- | :----------------------------------------------------: |
|  1.0   | 19/05/2026 | Adição dos objetivos e referências | [Karoline Luz da Conceição](https://github.com/KarolineLuz) | [Ana Victória Guedes da Costa](https://github.com/navicg) | Obetivos e Referências feitas de acordo com o projeto. |
