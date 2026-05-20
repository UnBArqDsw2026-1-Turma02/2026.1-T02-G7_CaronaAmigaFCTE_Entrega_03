import { Mensagem } from "../models/Mensagem";
import { Notificacao } from "../models/Notificacao";

export class FabricaComunicacaoExterna {
    private criarMensagem(
        destinatario: string,
        conteudo: string,
        remetente?: string,
    ): Mensagem {
        return new MensagemChat(remetente, destinatario, conteudo);
    }

    private criarNotificacao(
        usuarioId: string,
        titulo: string,
        mensagem: string,
    ): Notificacao {
        return new NotificacaoPush(usuarioId, titulo, mensagem);
    }
}
