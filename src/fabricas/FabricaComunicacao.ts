import { Mensagem } from "../models/Mensagem";
import { Notificacao } from "../models/Notificacao";

export interface FabricaComunicacao {
	criarMensagem(
		destinatario: string,
		conteudo: string,
		remetente?: string,
	): Mensagem;

	criarNotificacao(
		usuarioId: string,
		titulo: string,
		mensagem: string,
	): Notificacao;
}
