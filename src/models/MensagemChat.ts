import { Mensagem } from "./Mensagem";

export class MensagemChat extends Mensagem {
  private readonly dataEnvio: Date;

  public constructor(destinatarioId: string, conteudo: string, remetenteId?: string, dataEnvio?: Date) {
    super(destinatarioId, conteudo, remetenteId);
    this.dataEnvio = dataEnvio ?? new Date();
  }

  public getDataEnvio(): Date {
    return this.dataEnvio;
  }

  public enviar(): void {
    // Implementação mínima: placeholder para envio via chat interna
    // Aqui você integraria ao serviço de mensagens em tempo real.
    // Por enquanto apenas registra que a mensagem foi "enviada".
    // eslint-disable-next-line no-console
    console.log(MensagemChat enviada para ${this.getDestinatario()} às ${this.dataEnvio.toISOString()});
  }
}