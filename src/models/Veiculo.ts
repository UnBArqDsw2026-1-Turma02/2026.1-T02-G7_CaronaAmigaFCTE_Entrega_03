type VeiculoProps = {
	placa: string;
	modelo: string;
	cor: string;
	fotoVeiculo: string;
	capacidadeMaxPassageiros: number;
	documentacaoValida?: boolean;
};

export class Veiculo {
	private placa: string;
	private modelo: string;
	private cor: string;
	private documentacaoValida: boolean;
	private fotoVeiculo: string;
	private capacidadeMaxPassageiros: number;

	public constructor(props: VeiculoProps) {
		this.placa = Veiculo.validarPlaca(props.placa);
		this.modelo = Veiculo.validarModelo(props.modelo);
		this.cor = Veiculo.validarCor(props.cor);
		this.fotoVeiculo = Veiculo.validarFotoVeiculo(props.fotoVeiculo);
		this.capacidadeMaxPassageiros = Veiculo.validarCapacidadeMaxPassageiros(
			props.capacidadeMaxPassageiros,
		);
		this.documentacaoValida = props.documentacaoValida ?? false;
	}

	// ========================
	// GETTERS
	// ========================

	public getPlaca(): string {
		return this.placa;
	}

	public getModelo(): string {
		return this.modelo;
	}

	public getCor(): string {
		return this.cor;
	}

	public getDocumentacaoValida(): boolean {
		return this.documentacaoValida;
	}

	public getFotoVeiculo(): string {
		return this.fotoVeiculo;
	}

	public getCapacidadeMaxPassageiros(): number {
		return this.capacidadeMaxPassageiros;
	}

	// ========================
	// COMPORTAMENTOS (UML)
	// ========================

	public validarDocumentacao(placa: string): boolean {
		// TODO: integrar com um serviço/validador real.
		// Regra mínima: placa informada e tamanho 7.
		return Veiculo.validarPlaca(placa).length === 7;
	}

	// ========================
	// MÉTODOS SEMÂNTICOS
	// ========================

	public atualizarFotoVeiculo(foto: string): void {
		this.fotoVeiculo = Veiculo.validarFotoVeiculo(foto);
	}

	public atualizarModelo(modelo: string): void {
		this.modelo = Veiculo.validarModelo(modelo);
	}

	public atualizarCor(cor: string): void {
		this.cor = Veiculo.validarCor(cor);
	}

	public atualizarCapacidadeMaxPassageiros(capacidade: number): void {
		this.capacidadeMaxPassageiros = Veiculo.validarCapacidadeMaxPassageiros(capacidade);
	}

	public marcarDocumentacaoValida(): void {
		this.documentacaoValida = true;
	}

	public marcarDocumentacaoInvalida(): void {
		this.documentacaoValida = false;
	}

	// ========================
	// VALIDAÇÕES
	// ========================

	private static validarPlaca(placa: string): string {
		const valor = placa.trim();
		if (valor.length !== 7) {
			throw new Error("Placa inválida. Deve ter tamanho 7.");
		}
		return valor;
	}

	private static validarModelo(modelo: string): string {
		const valor = modelo.trim();
		if (valor.length === 0) {
			throw new Error("Modelo é obrigatório.");
		}
		return valor;
	}

	private static validarCor(cor: string): string {
		const valor = cor.trim();
		if (valor.length === 0) {
			throw new Error("Cor é obrigatória.");
		}
		return valor;
	}

	private static validarFotoVeiculo(foto: string): string {
		const valor = foto.trim();
		if (valor.length === 0) {
			throw new Error("Foto do veículo é obrigatória.");
		}
		return valor;
	}

	private static validarCapacidadeMaxPassageiros(valor: number): number {
		if (!Number.isInteger(valor) || valor <= 0) {
			throw new Error("Capacidade máxima de passageiros inválida.");
		}
		return valor;
	}
}
