export abstract class Notificacao {
	private readonly usuarioId: string;
	private readonly titulo: string;
	private readonly mensagem: string;
	private readonly dataEnvio: Date;

	protected constructor(usuarioId: string, titulo: string, mensagem: string) {
		this.usuarioId = Notificacao.validarTexto(usuarioId, "Usuário");
		this.titulo = Notificacao.validarTexto(titulo, "Título");
		this.mensagem = Notificacao.validarTexto(mensagem, "Mensagem");
		this.dataEnvio = new Date();
	}

	public getUsuarioId(): string {
		return this.usuarioId;
	}

	public getTitulo(): string {
		return this.titulo;
	}

	public getMensagem(): string {
		return this.mensagem;
	}

	public getDataEnvio(): Date {
		return this.dataEnvio;
	}

	public abstract entregar(): void;

	private static validarTexto(valor: string, nomeCampo: string): string {
		const texto = valor.trim();
		if (texto.length === 0) {
			throw new Error(`${nomeCampo} é obrigatório.`);
		}
		return texto;
	}
}
