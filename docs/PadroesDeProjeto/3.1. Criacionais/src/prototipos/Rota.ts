import { PrototipoClonavel } from "./PrototipoClonavel";

export class Rota implements PrototipoClonavel<Rota> {
  constructor(
    public origem: string,
    public destino: string,
    public pontosDeReferencia: string[] = []
  ) {}

  clonar(): Rota {
    return new Rota(this.origem, this.destino, [...this.pontosDeReferencia]);
  }
}
