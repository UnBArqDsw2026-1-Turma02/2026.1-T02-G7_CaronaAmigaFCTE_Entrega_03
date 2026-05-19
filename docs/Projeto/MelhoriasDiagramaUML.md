# Melhorias sugeridas — Diagrama de Classes (UML)

> Backlog curto do que vale ajustar no diagrama antes/ao longo da implementação em TypeScript.

## Entidade `Usuario`
- [x] Adicionar atributo `telefone: string` (contato do usuário).
  - Sugestão de restrição: não vazio; opcionalmente formato E.164 (`+55...`) ou apenas dígitos.
- [x] Definir identificador do usuário (`id: string`) e marcar como único.
- [ ] Marcar restrições já implícitas no código:
  - `avaliacaoMedia` no intervalo `{0..5}`.
  - `qtdViagens` inteiro `>= 0`.

## Visibilidade e encapsulamento (padrão do projeto)
- [ ] Padronizar **atributos sempre `private`**.
- [ ] Usar `protected` **apenas** quando subclasses precisarem acessar diretamente (preferir métodos protegidos).
- [ ] Evitar atributo “sem modificador” (em TypeScript vira `public` por padrão).
- [ ] Acesso ao estado sempre via getters/métodos semânticos (ex.: `atualizarPreferencias`).

## Associações e multiplicidades
- [ ] Explicitar multiplicidades entre `Usuario` e `HistoricoViagem` (ex.: `Usuario 1` → `HistoricoViagem 0..*`).
- [ ] Se existir `Motorista`/`Passageiro` como subclasses, deixar claro se:
  - herança é **disjunta** (ou o mesmo usuário pode ser ambos),
  - e se é **total** (todo usuário é motorista ou passageiro) ou parcial.

## Tipos de dados e enums
- [ ] Substituir “float” por `number` (TypeScript) no diagrama.
- [ ] Criar enums/value-objects quando fizer sentido (ex.: `StatusCarona`, `FormaPagamento`, `TipoNotificacao`).
- [ ] Evitar `string` genérica em tudo quando o domínio pede tipo (ex.: `EmailInstitucional`, `CNH`).

## Consistência de métodos
- [ ] Padronizar assinatura de autenticação no diagrama:
  - opção A: `login(email, senha): boolean` (como no código),
  - opção B: `login(): boolean` + dados já no objeto (menos explícito).
- [ ] Para exclusão de perfil, decidir se é “soft delete” (status) ou apagar/anonimizar dados.

## Ajustes no `Passageiro`
- [ ] Corrigir atributo no diagrama: hoje está `motoristasFav: motoristasFav [*] {ordenada}`.
  - Sugestão: `motoristasFav: Motorista[*] {ordenada}`.
- [ ] Ajustar `favoritarMotorista()` para receber o motorista (ex.: `favoritarMotorista(m: Motorista): void`).
  - Alternativa (se quiser manter o diagrama como está): permitir overload (com e sem parâmetro) na implementação.
- [ ] Revisar `getPreferencias(): List` no diagrama do Passageiro.
  - Sugestão: herdar `getPreferencias(): PreferenciaPareamento` de `Usuario` (mais específico que `List`).

## Ajustes no `Motorista`
- [ ] Revisar `publicarCarona(): void` para explicitar no diagrama o que “publicar” significa.
  - Sugestão: criar entidade `Carona`/`SolicitacaoCarona` e conectar o método à criação/registro dessa entidade.
- [ ] Explicitar no diagrama que `Motorista` **possui** `Veiculo`.
  - Regra do domínio já usada no código: não publica carona se não tiver veículo cadastrado.

## Ajustes na `Carona`
- [ ] Marcar `Carona` como **abstrata** no diagrama (Template Method `publicar()` + primitives).
- [ ] Adicionar ao diagrama ao menos 1 implementação concreta (ex.: `CaronaAvulsa`) para permitir instanciar/testar o fluxo.
- [ ] Decidir responsabilidade entre `Motorista.publicarCarona()` e `Carona.publicar()` (quem cria/registra a carona de fato).

## Nomes e idioma
- [ ] Padronizar idioma (PT-BR) e convenção de nomes:
  - atributos em `camelCase` (`emailInstitucional`, `fotoPerfil`),
  - classes em `PascalCase` (`ContatoEmergencia`).
