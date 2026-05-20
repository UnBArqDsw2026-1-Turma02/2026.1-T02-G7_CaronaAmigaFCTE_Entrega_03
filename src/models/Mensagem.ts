export abstract class Mensagem {
	private readonly destinatario: string;
	private readonly conteudo: string;
	private readonly remetente?: string;
	private readonly timestamp: Date;

	protected constructor(destinatario: string, conteudo: string, remetente?: string) {
		this.destinatario = Mensagem.validarTexto(destinatario, "Destinatário");
		this.conteudo = Mensagem.validarTexto(conteudo, "Conteúdo");
		this.remetente = remetente?.trim() || undefined;
		this.timestamp = new Date();
	}

	public getDestinatario(): string {
		return this.destinatario;
	}

	public getConteudo(): string {
		return this.conteudo;
	}

	public getRemetente(): string | undefined {
		return this.remetente;
	}

	public getTimestamp(): Date {
		return this.timestamp;
	}

	public abstract enviar(): void;

	private static validarTexto(valor: string, nomeCampo: string): string {
		const texto = valor.trim();
		if (texto.length === 0) {
			throw new Error(`${nomeCampo} é obrigatório.`);
		}
		return texto;
	}
}
