import { PrototipoClonavel } from "./PrototipoClonavel";

export class PreferenciaDeCarona
  implements PrototipoClonavel<PreferenciaDeCarona>
{
  constructor(
    public aceitaBagagem: boolean,
    public aceitaConversa: boolean,
    public permiteDesvio: boolean,
    public observacoes: string
  ) {}

  clonar(): PreferenciaDeCarona {
    return new PreferenciaDeCarona(
      this.aceitaBagagem,
      this.aceitaConversa,
      this.permiteDesvio,
      this.observacoes
    );
  }
}
