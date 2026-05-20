import { Mensagem } from "../models/Mensagem";
import { MensagemSMS } from "../models/MensagemSMS";
import { Notificacao } from "../models/Notificacao";
import { NotificacaoPush } from "../models/NotificacaoPush";

export class FabricaComunicacaoInterna {
    private criarMensagem(
        destinatario: string,
        conteudo: string,
        remetente?: string,
    ): Mensagem {
        return new MensagemSMS({
            numeroTelefone: destinatario,
            conteudo: conteudo,
            remetenteId: remetente,
        });
    }

    private criarNotificacao(
        usuario: string,
        titulo: string,
        conteudo: string,
    ): Notificacao {
        return new NotificacaoPush({ 
            usuarioId: usuario, 
            titulo: titulo, 
            mensagem: conteudo });
    }
}
