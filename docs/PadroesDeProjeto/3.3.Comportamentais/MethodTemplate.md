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

O conteúdo deste documento foi produzido a partir da análise dos seguintes artefatos do projeto:

* (Diagrama de casos de uso)[https://unbarqdsw2026-1-turma02.github.io/2026.1-T02-G7_CaronaAmigaFCTE_Entrega_02/#/Modelagem/2.3.ModelagemOrganizacionalCasosDeUso/Diagrama_de_casos_de_uso](RF01–RF25), que identificou os fluxos de publicação e solicitação de caronas;

* (Diagrama de classes UML)[https://unbarqdsw2026-1-turma02.github.io/2026.1-T02-G7_CaronaAmigaFCTE_Entrega_02/#/Modelagem/2.1.ModelagemEstatica/Diagrama_de_classes], com **foco** na hierarquia Carona → CaronaAvulsa / CaronaRecorrente;

* Requisitos funcionais RF06 (publicar carona), RF07 (solicitar carona) e RF09 (carona recorrente), extraídos do backlog do projeto. 


## Explicação do Padrão

O Template Method define o esqueleto de um algoritmo em uma operação, postergando alguns passos para as subclasses. Conforme descreve o Refactoring Guru, o padrão 

*"fornece uma interface para criar objetos em uma superclasse, mas permite que as subclasses alterem o tipo de objetos que serão criados"* ([Refactoring Guru — Factory Method](https://refactoring.guru/pt-br/design-patterns/factory-method))

No Template Method especificamente, o algoritmo é fixo na superclasse e os *passos primitivos* são delegados às subclasses, que os implementam conforme sua necessidade.

### Motivação

No Carona Amiga FCTE, o processo de publicação de uma carona envolve sempre as mesmas etapas gerais: validar os dados informados, notificar passageiros cadastrados na rota e confirmar o embarque. Contudo, cada modalidade executa esses passos de forma diferente:

* Uma CaronaAvulsa valida apenas origem, destino e horário pontual;

* Uma CaronaRecorrente precisa validar também os dias da semana e o horário fixo, e pausar a recorrência quando necessário.

Sem o Template Method, o método publicar() teria de usar condicionais para detectar o tipo de carona e executar a lógica correta — o que viola o Princípio Aberto/Fechado e dificulta a manutenção. Como destaca a DevMedia:

*"O pattern Template Method nos auxilia principalmente quando temos uma sequência de tarefas ou um algoritmo com passos que precisam ser implementados de forma diferente por cada subclasse"* ([DevMedia — Patterns: Template Method](https://www.devmedia.com.br/patterns-template-method/18953))

## Ilustração do Padrão
<div align="center">
              Figura 1: Exemplo de aplicação do padrão Method Template aplicado ao Carona Amiga FCTE.

![](https://i.ibb.co/KjPMxTcd/template-method-ilustracao-infantil.jpg)

<font size="2"><p style="text-align: center">Fonte: Imagem gerada por [Claude AI](https://claude.ai/new)</p></font>
</div>

## Colaborações

 fluxo de colaboração entre os participantes é o seguinte:

* O cliente (ex.: Motorista) invoca publicar() na instância concreta (CaronaAvulsa ou CaronaRecorrente);

* O método publicar(), definido em Carona como final, executa o esqueleto: chama sequencialmente validarCarona(), notificarPassageiros() e confirmarEmbarque();

* Cada chamada é despachada pelo polimorfismo para a implementação correta na subclasse;

* O cliente não conhece nem depende da subclasse concreta — apenas trabalha com o tipo Carona.

### Consequências

_Registrar benefícios, custos e impactos de usar o padrão._

### Implementação

<details>
  <summary><strong>Código para Method Template (Documento/Recibo + GeradorDeArquivo)</strong></summary>




</details>

### Padrões Relacionados

_Citar padrões que se conectam ao padrão escolhido._


## Conclusão

O padrão Template Method encaixa-se de forma natural na hierarquia de caronas do Carona Amiga FCTE. A existência de um fluxo de publicação com etapas obrigatórias e comuns — validação, notificação e confirmação — aliada à necessidade de comportamentos distintos entre CaronaAvulsa e CaronaRecorrente, configura exatamente o problema que o padrão foi projetado para resolver.

A adoção do padrão garante que o código de publicação seja escrito uma única vez em Carona.publicar(), enquanto as subclasses se concentram apenas nas suas particularidades. Isso reduz acoplamento, facilita testes e abre espaço para novas modalidades serem adicionadas sem modificar o código existente.

Como próximo passo natural, recomenda-se complementar a solução com o Factory Method, responsável por instanciar a subclasse correta com base no tipo de carona selecionado pelo motorista — separando assim a criação dos objetos da execução do algoritmo.


## Referências Bibliográficas

> <a id="ref1"></a> REFACTORING GURU. *Factory Method.* [https://refactoring.guru/pt-br/design-patterns/factory-method](https://refactoring.guru/pt-br/design-patterns/factory-method). Acesso em: maio 2026.

> <a id="ref2"></a> DEVMEDIA. *Patterns: Template Method.* [https://www.devmedia.com.br/patterns-template-method/18953](https://www.devmedia.com.br/patterns-template-method/18953). Acesso em: maio 2026.

> <a id="ref3"></a> AWAN, Talha. *GOF Design Patterns in React JS. TecHighness,* 2022\. [https://www.techighness.com/post/gof-design-patterns-react-js/](https://www.techighness.com/post/gof-design-patterns-react-js/). Acesso em: maio 2026.

## Histórico de Versões
## Histórico de Versões

| Versão | Data | Descrição | Autor(es) | Revisor(es) | Detalhes da revisão |
| :----: | :--: | --------- | ----------- | ------ | :---: |
| 1.0 | 16/05/2026 | Criação do esqueleto do documento | [Luiza da Silva Pugas](https://github.com/luizaxx)| [Wanjo Christopher Paraizo Escobar](https://github.com/wChrstphr) | Estrutura básica com as seções principais |
| 1.1 | 16/05/2026 | Preenchimento do conteúdo do padrão Method Template | [Luiza da Silva Pugas](https://github.com/luizaxx)  |[João Marcos Moraes de Andrade](https://github.com/JJOAOMARCOSS) | Revisão de texto, código quebrado, imagens corrretas |