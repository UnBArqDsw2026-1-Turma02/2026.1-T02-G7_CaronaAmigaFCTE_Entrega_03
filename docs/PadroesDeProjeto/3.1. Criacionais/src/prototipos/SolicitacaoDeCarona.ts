import { PrototipoClonavel } from "./PrototipoClonavel";

export class SolicitacaoDeCarona
  implements PrototipoClonavel<SolicitacaoDeCarona>
{
  constructor(
    public passageiro: string,
    public pontoEncontro: string,
    public status: "pendente" | "aceita" | "recusada",
    public observacoes: string
  ) {}

  clonar(): SolicitacaoDeCarona {
    return new SolicitacaoDeCarona(
      this.passageiro,
      this.pontoEncontro,
      this.status,
      this.observacoes
    );
  }
}
