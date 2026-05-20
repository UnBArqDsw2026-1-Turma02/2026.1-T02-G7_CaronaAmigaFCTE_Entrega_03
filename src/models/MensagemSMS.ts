import { Mensagem } from "./Mensagem";

type MensagemSMSProps = {
  numeroTelefone: string;
  conteudo: string;
  remetenteId?: string;
  provedorSMS?: string;
  dataEnvio?: Date;
};

export class MensagemSMS extends Mensagem {
  private readonly numeroTelefone: string;
  private readonly provedorSMS?: string;
  private readonly dataEnvio: Date;

  public constructor(props: MensagemSMSProps) {
    // Destinatário aqui usamos o número de telefone como identificador
    super(props.numeroTelefone, props.conteudo, props.remetenteId);
    this.numeroTelefone = MensagemSMS.validarNumero(props.numeroTelefone);
    this.provedorSMS = props.provedorSMS;
    this.dataEnvio = props.dataEnvio ?? new Date();
  }

  public getNumeroTelefone(): string {
    return this.numeroTelefone;
  }

  public getProvedor(): string | undefined {
    return this.provedorSMS;
  }

  public getDataEnvio(): Date {
    return this.dataEnvio;
  }

  public enviar(): void {
    // Placeholder: integrar com gateway SMS real
    // eslint-disable-next-line no-console
    console.log(`SMS enviado para ${this.numeroTelefone}: ${this.getConteudo()}`);
  }

  private static validarNumero(valor: string): string {
    const texto = valor.trim();
    if (texto.length === 0) {
      throw new Error("Número de telefone inválido.");
    }
    return texto;
  }
}