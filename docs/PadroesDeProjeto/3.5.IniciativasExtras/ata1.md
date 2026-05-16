# Ata da [Nº01] Reunião de Arquitetura e Desenho de Software – Grupo 7

### Local
Reunião realizada via **Microsoft Teams**.

### Horário da Reunião

|          | Data       | Início | Término |
|----------|------------|--------|---------|
| Previsto | 12/05/2026 | 15:00  | 16:00   |
| Realizado| 15/05/2026 | 15:18  | 16:03   |

<font size="2"><p style="text-align: left">Fonte: [João Marcos Moraes de Andrade](https://github.com/JJOAOMARCOSS), 2026.</p></font>

## Participantes presentes:
- [x] [João Marcos Moraes de Andrade](https://github.com/JJOAOMARCOSS)
- [x] [Luiza da Silva Pugas](https://github.com/luizaxx)
- [x] [Wanjo Christopher Paraizo Escobar](https://github.com/wChrstphr)

---

## Pauta:
* Definição dos padrões de projeto a serem utilizados pelo Grupo 1  
* Análise do diagrama de classes atual do sistema  
* Identificação de possíveis pontos de aplicação dos padrões  
* Discussão sobre ajustes necessários no modelo (ex: classe Carona)

---

## Decisões:
* O Grupo 1 ficou responsável pelos seguintes padrões de projeto:
  - **Criacionais:** Abstract Factory e Factory Method  
  - **Estrutural:** Bridge  
  - **Comportamental:** Template Method  

* Foi decidido analisar o diagrama de classes existente e adaptar os padrões às estruturas já modeladas, ao invés de criar tudo do zero  

* Foram identificados possíveis pontos de aplicação dos padrões, como:
  - Uso de **Abstract Factory / Factory Method** para criação de objetos como mensagens e tipos de usuário  
  - Uso de **Template Method** para definir fluxos padronizados (ex: processo de criação/execução de uma carona)  
  - Uso de **Bridge** a ser definido posteriormente com base na separação de abstração e implementação  

* Foi discutida a necessidade de ajustes no modelo atual, especialmente:
  - Revisão da classe **Carona Recorrente**, que apresentou inconsistências conceituais  
  - Possível substituição dessa classe por atributos ou métodos dentro da própria classe **Carona**  

* Foi definido que cada integrante irá aprofundar a aplicação do seu padrão e validar a melhor forma de integração ao sistema  

---

## Link da gravação
[Gravação da 1ª reunião](https://youtu.be/y6FIosTab0s)

---

## Bibliografia

Não houve utilização de referências externas.

---

## Histórico de Versões

| Versão | Data | Descrição | Autor(es) | Revisor(es) | Detalhes da revisão |
| :----: | :--: | --------- | ----------- | ------ | :---: |
| 1.0 | 16/05/2026 | Criação da ata da reunião | [João Marcos Moraes de Andrade](https://github.com/JJOAOMARCOSS) | [Luiza da Silva Pugas](https://github.com/luizaxx) | Documento inicial estruturado com base na reunião |