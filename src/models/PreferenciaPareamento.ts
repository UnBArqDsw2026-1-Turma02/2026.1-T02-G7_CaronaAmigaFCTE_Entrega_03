import type { Carona } from "./Carona";
import type { Usuario } from "./Usuario";

type PreferenciaPareamentoProps = {
	usuario?: Usuario;
	mesmoCurso?: boolean;
	motoristaMulher?: boolean;
};

type PreferenciaAtualizacao = {
	mesmoCurso?: boolean;
	motoristaMulher?: boolean;
};

export class PreferenciaPareamento {
	private readonly usuario?: Usuario;
	private mesmoCurso: boolean;
	private motoristaMulher: boolean;

	public constructor(props: PreferenciaPareamentoProps = {}) {
		this.usuario = props.usuario;
		this.mesmoCurso = props.mesmoCurso ?? false;
		this.motoristaMulher = props.motoristaMulher ?? false;
	}

	// ========================
	// GETTERS
	// ========================

	public getUsuario(): Usuario | undefined {
		return this.usuario;
	}

	public getMesmoCurso(): boolean {
		return this.mesmoCurso;
	}

	public getMotoristaMulher(): boolean {
		return this.motoristaMulher;
	}

	// ========================
	// COMPORTAMENTOS (UML)
	// ========================

	public aplicarFiltro(): Carona[];
	public aplicarFiltro(caronas: Carona[]): Carona[];
	public aplicarFiltro(caronas: Carona[] = []): Carona[] {
		// TODO: filtrar por regras reais quando `Carona` tiver dados do domínio
		return [...caronas];
	}

	public atualizar(): void;
	public atualizar(atualizacao: PreferenciaAtualizacao): void;
	public atualizar(
		atualizacao?: PreferenciaAtualizacao,
	): void {
		if (!atualizacao) return;

		if (typeof atualizacao.mesmoCurso === "boolean") {
			this.mesmoCurso = atualizacao.mesmoCurso;
		}

		if (typeof atualizacao.motoristaMulher === "boolean") {
			this.motoristaMulher = atualizacao.motoristaMulher;
		}
	}
}
