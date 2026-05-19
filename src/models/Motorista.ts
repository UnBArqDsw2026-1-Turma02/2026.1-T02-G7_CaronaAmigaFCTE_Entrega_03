import type { FabricaComunicacao } from "../domain/types";

import { Usuario, type UsuarioProps } from "./Usuario";
import type { Veiculo } from "./Veiculo";

type MotoristaProps = UsuarioProps & {
	cnh: string;
	verificado?: boolean;
	veiculo?: Veiculo;
};

export class Motorista extends Usuario {
	private cnh: string;
	private verificado: boolean;
	private veiculo?: Veiculo;

	public constructor(props: MotoristaProps) {
		super(props);
		this.cnh = Motorista.validarCnh(props.cnh);
		this.verificado = props.verificado ?? false;
		this.veiculo = props.veiculo;
	}

	public getCnh(): string {
		return this.cnh;
	}

	public getVerificado(): boolean {
		return this.verificado;
	}

	public getVeiculo(): Veiculo | undefined {
		return this.veiculo;
	}

	// ========================
	// COMPORTAMENTOS
	// ========================

	public verificarMotorista(): void {
		this.verificado = true;
	}

	public publicarCarona(): void {
		this.exigirMotoristaVerificado();
		this.exigirVeiculoCadastrado();
		// TODO: criar/registrar uma Carona (quando a classe existir)
	}

	public aceitarPassageiro(): void {
		// TODO: implementar conforme regras do domínio
	}

	public validarCarona(): void {
		// TODO: implementar conforme regras do domínio
	}

	// ========================
	// MÉTODOS SEMÂNTICOS
	// ========================

	public atualizarVeiculo(veiculo: Veiculo): void {
		this.veiculo = veiculo;
	}

	// UML indica "Motorista (f: FabricaComunicacao)".
	// Se você quiser, dá pra criar um construtor auxiliar só com a fábrica:
	public static criarComFabrica(
		fabricaComunicacao: FabricaComunicacao,
		dados: Omit<MotoristaProps, "fabricaComunicacao">,
	): Motorista {
		return new Motorista({ ...dados, fabricaComunicacao });
	}

	// ========================
	// HELPERS (privados)
	// ========================

	private exigirMotoristaVerificado(): void {
    if (!this.verificado) {
      throw new Error("Motorista não verificado.");
    }
  }

	private exigirVeiculoCadastrado(): void {
		if (!this.veiculo) {
			throw new Error("Veículo não cadastrado.");
		}
	}

	// ========================
	// VALIDAÇÕES
	// ========================

	private static validarCnh(cnh: string): string {
		const valor = cnh.trim();

		if (valor.length === 0) {
			throw new Error("CNH é obrigatória.");
		}

		return valor;
	}

}
