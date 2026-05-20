import { Notificacao } from "./Notificacao";

type NotificacaoPushProps = {
  usuarioId: string;
  titulo: string;
  mensagem: string;
  urgente?: boolean;
};

export class NotificacaoPush extends Notificacao {
  private readonly urgente: boolean;

  public constructor(props: NotificacaoPushProps) {
    super(props.usuarioId, props.titulo, props.mensagem);
    this.urgente = props.urgente ?? false;
  }

  public isUrgente(): boolean {
    return this.urgente;
  }

  public entregar(): void {
    // Placeholder: integração com provedor de push
    // eslint-disable-next-line no-console
    console.log(`NotificacaoPush entregue a ${this.getUsuarioId()} (urgente=${this.urgente})`);
  }
}