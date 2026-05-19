import { PrototipoClonavel } from "./PrototipoClonavel";

export class RegistroDePrototipos {
  private readonly prototipos = new Map<string, PrototipoClonavel<unknown>>();

  adicionarPrototipo(chave: string, prototipo: PrototipoClonavel<unknown>): void {
    this.prototipos.set(chave.toUpperCase(), prototipo);
  }

  getPrototipoClonado<T>(chave: string): T | undefined {
    const prototipo = this.prototipos.get(chave.toUpperCase());

    if (!prototipo) {
      return undefined;
    }

    return prototipo.clonar() as T;
  }

  listarChaves(): string[] {
    return [...this.prototipos.keys()];
  }
}
