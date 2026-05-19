import { PreferenciaDeCarona } from "./PreferenciaDeCarona";
import { PrototipoClonavel } from "./PrototipoClonavel";
import { Rota } from "./Rota";
import { SolicitacaoDeCarona } from "./SolicitacaoDeCarona";

export class Carona implements PrototipoClonavel<Carona> {
  constructor(
    public motorista: string,
    public rota: Rota,
    public data: string,
    public horario: string,
    public vagas: number,
    public preferencias: PreferenciaDeCarona,
    public solicitacoes: SolicitacaoDeCarona[] = []
  ) {}

  clonar(): Carona {
    return new Carona(
      this.motorista,
      this.rota.clonar(),
      this.data,
      this.horario,
      this.vagas,
      this.preferencias.clonar(),
      this.solicitacoes.map((solicitacao) => solicitacao.clonar())
    );
  }

  remarcar(data: string, horario: string): void {
    this.data = data;
    this.horario = horario;
  }

  alterarVagas(vagas: number): void {
    this.vagas = vagas;
  }

  adicionarSolicitacao(solicitacao: SolicitacaoDeCarona): void {
    this.solicitacoes.push(solicitacao);
  }

  resumo(): string {
    return `${this.motorista} | ${this.rota.origem} -> ${this.rota.destino} | ${this.data} ${this.horario} | ${this.vagas} vaga(s)`;
  }
}
