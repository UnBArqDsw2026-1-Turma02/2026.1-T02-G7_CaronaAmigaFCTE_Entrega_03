import { Mensagem } from "../models/Mensagem";
import { Notificacao } from "../models/Notificacao";

export class FabricaComunicacaoInterna {
    private criarMensagem(
        destinatario: string,
        conteudo: string,
        remetente?: string,
    ): Mensagem {
        return new MensagemSMS(remetente, destinatario, conteudo);
    }

    private criarNotificacao(
        usuarioId: string,
        titulo: string,
        mensagem: string,
    ): Notificacao {
        return new AlertaEmergência(usuarioId, titulo, mensagem);
    }
}
