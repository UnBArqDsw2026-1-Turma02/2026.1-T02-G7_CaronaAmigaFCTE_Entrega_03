export interface Mensagem {}

export interface Notificacao {}

export interface FabricaComunicacao {
	criarMensagem(): Mensagem;
	criarNotificacao(): Notificacao;
}

export interface PreferenciaPareamento {
	mesmoCurso: boolean;
	motoristaMulher: boolean;
}

export interface ContatoEmergencia {
	contatos: string[];
	telefone: string;
}

export interface HistoricoViagem {}
