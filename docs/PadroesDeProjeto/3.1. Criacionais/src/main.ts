import { Carona } from "./prototipos/Carona";
import { PreferenciaDeCarona } from "./prototipos/PreferenciaDeCarona";
import { RegistroDePrototipos } from "./prototipos/RegistroDePrototipos";
import { Rota } from "./prototipos/Rota";
import { SolicitacaoDeCarona } from "./prototipos/SolicitacaoDeCarona";

const registro = new RegistroDePrototipos();

const preferenciaPadrao = new PreferenciaDeCarona(
  true,
  true,
  false,
  "Preferencias padrao para caronas entre estudantes da FCTE."
);

const caronaRecorrenteFcte = new Carona(
  "Motorista FCTE",
  new Rota("Campus FCTE", "Asa Norte", ["Parada central", "Eixinho"]),
  "2026-05-22",
  "18:00",
  3,
  preferenciaPadrao,
  [
    new SolicitacaoDeCarona(
      "Passageiro exemplo",
      "Entrada principal da FCTE",
      "pendente",
      "Solicitacao criada como parte do modelo."
    ),
  ]
);

const caronaNoturna = new Carona(
  "Motorista noturno",
  new Rota("Campus FCTE", "Taguatinga", ["Biblioteca", "Metro"]),
  "2026-05-22",
  "22:10",
  2,
  new PreferenciaDeCarona(
    false,
    false,
    false,
    "Modelo para deslocamentos noturnos, com rota mais direta."
  )
);

registro.adicionarPrototipo("CARONA_RECORRENTE_FCTE", caronaRecorrenteFcte);
registro.adicionarPrototipo("CARONA_NOTURNA", caronaNoturna);
registro.adicionarPrototipo("PREFERENCIA_PADRAO", preferenciaPadrao);

console.log("Prototipos cadastrados:", registro.listarChaves());

const cloneDaCarona = registro.getPrototipoClonado<Carona>(
  "CARONA_RECORRENTE_FCTE"
);

if (cloneDaCarona) {
  cloneDaCarona.remarcar("2026-05-29", "18:30");
  cloneDaCarona.alterarVagas(1);
  cloneDaCarona.adicionarSolicitacao(
    new SolicitacaoDeCarona(
      "Novo passageiro",
      "Bloco de aulas",
      "pendente",
      "Solicitacao adicionada apenas ao clone."
    )
  );

  console.log("Original:", caronaRecorrenteFcte.resumo());
  console.log("Clone alterado:", cloneDaCarona.resumo());
  console.log("Solicitacoes no original:", caronaRecorrenteFcte.solicitacoes.length);
  console.log("Solicitacoes no clone:", cloneDaCarona.solicitacoes.length);
}
