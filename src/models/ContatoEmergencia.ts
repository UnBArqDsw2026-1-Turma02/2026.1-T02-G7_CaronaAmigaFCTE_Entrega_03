import type { Usuario } from "./Usuario";

type ContatoEmergenciaProps = {
	usuario?: Usuario;
	contatos: string[];
	telefone: string;
};

export class ContatoEmergencia {
	private readonly usuario?: Usuario;
	private contatos: string[];
	private telefone: string;

	public constructor(props: ContatoEmergenciaProps) {
		this.usuario = props.usuario;
		this.contatos = ContatoEmergencia.validarContatos(props.contatos);
		this.telefone = ContatoEmergencia.validarTelefone(props.telefone);
	}

	// ========================
	// GETTERS
	// ========================

	public getUsuario(): Usuario | undefined {
		return this.usuario;
	}

	public getContatos(): readonly string[] {
		return this.contatos;
	}

	public getTelefone(): string {
		return this.telefone;
	}

	// ========================
	// COMPORTAMENTOS (UML)
	// ========================

	public notificarContato(): void {
		// TODO: Integrar com FabricaComunicacao (Mensagem/Notificacao)
	}

	public notificarContatos(): void {
		// TODO: Integrar com FabricaComunicacao (Mensagem/Notificacao)
	}

	public testarContato(): boolean {
		return this.telefone.trim().length > 0;
	}

	// ========================
	// MÉTODOS SEMÂNTICOS
	// ========================

	public atualizarTelefone(telefone: string): void {
		this.telefone = ContatoEmergencia.validarTelefone(telefone);
	}

	public adicionarContato(contato: string): void {
		const valor = ContatoEmergencia.validarContato(contato);
		this.contatos.push(valor);
	}

	public removerContato(contato: string): void {
		const valor = contato.trim();
		this.contatos = this.contatos.filter((c) => c !== valor);
	}

	// ========================
	// VALIDAÇÕES
	// ========================

	private static validarContato(contato: string): string {
		const valor = contato.trim();
		if (valor.length === 0) {
			throw new Error("Contato inválido.");
		}
		return valor;
	}

	private static validarContatos(contatos: string[]): string[] {
		if (!Array.isArray(contatos)) {
			throw new Error("Lista de contatos inválida.");
		}

		return contatos.map(ContatoEmergencia.validarContato);
	}

	private static validarTelefone(telefone: string): string {
		const valor = telefone.trim();
		if (valor.length === 0) {
			throw new Error("Telefone é obrigatório.");
		}
		return valor;
	}
}
