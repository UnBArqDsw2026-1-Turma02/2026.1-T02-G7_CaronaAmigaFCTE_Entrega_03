export interface Mensagem {}

export interface Notificacao {}

export interface FabricaComunicacao {
	criarMensagem(): Mensagem;
	criarNotificacao(): Notificacao;
}

export interface HistoricoViagem {}
