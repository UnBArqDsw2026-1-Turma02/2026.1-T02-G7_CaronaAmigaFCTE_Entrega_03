# Padrão de Projeto - Iterator

## Introdução

De acordo com o [Factory Guru](https://refactoring.guru/pt-br/design-patterns/factory-method), o **Template Method**  é um padrão de projeto comportamental que define o esqueleto de um algoritmo na superclasse mas deixa as subclasses sobrescreverem etapas específicas do algoritmo sem modificar sua estrutura.

No contexto do **Carona Amiga FCTE** — aplicativo de compartilhamento de caronas voltado à comunidade universitária da FCTE/UnB — o padrão é especialmente relevante porque o sistema oferece diferentes modalidades de carona (avulsa e recorrente) que compartilham um fluxo de publicação comum, mas diferem em como validam dados, notificam passageiros e confirmam embarques. O Template Method é a solução natural para evitar duplicação de código e garantir consistência entre essas modalidades.


## Objetivos

Este artefato tem por objetivo:

* Documentar formalmente a aplicação do padrão Template Method no projeto Carona Amiga FCTE;

* Descrever os participantes do padrão e como se mapeiam às classes do domínio;

* Apresentar um recorte do diagrama de classes que evidencia a estrutura do padrão;

* Registrar as consequências — benefícios e custos — da adoção do padrão no sistema;

* Servir como referência para a equipe de desenvolvimento durante a fase de implementação.


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

_Fechar o artefato com uma síntese do encaixe do padrão no domínio do projeto._

## Referências Bibliográficas

> <a id="ref1"></a> Referência 1 utilizada para embasar o conteúdo._

## Histórico de Versões

| Versão | Data | Descrição | Autor(es) | Revisor(es) | Detalhes da revisão |
| :----: | :--: | --------- | ----------- | ------ | :---: |
| 1.0 | 12/05/2026 | Criação do esqueleto do documento | _a definir_ | _a definir_ | Estrutura básica com as seções principais |
