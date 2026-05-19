import type { FabricaComunicacao } from "../domain/types";

import { Motorista } from "./Motorista";
import { Usuario, type UsuarioProps } from "./Usuario";

type PassageiroProps = UsuarioProps & {
	motoristasFav?: Motorista[];
};

export class Passageiro extends Usuario {
	// UML: "motoristasFav [*] {ordenada}"
	private motoristasFav: Motorista[];

	public constructor(props: PassageiroProps) {
		super(props);
		this.motoristasFav = Passageiro.validarMotoristasFav(props.motoristasFav ?? []);
	}

	// ========================
	// GETTERS
	// ========================

	public getMotoristasFav(): readonly Motorista[] {
		return this.motoristasFav;
	}

	// ========================
	// COMPORTAMENTOS (UML)
	// ========================

	public solicitarCarona(): void {
		// TODO: implementar quando existir Carona/SolicitacaoCarona no domínio
	}

	public favoritarMotorista(): void;
	public favoritarMotorista(motorista: Motorista): void;
	public favoritarMotorista(motorista?: Motorista): void {
		if (!motorista) {
			throw new Error("Informe o motorista para favoritar.");
		}

		this.adicionarMotoristaFavorito(motorista);
	}

	// UML tem "Passageiro (f: FabricaComunicacao)".
	public static criarComFabrica(
		fabricaComunicacao: FabricaComunicacao,
		dados: Omit<PassageiroProps, "fabricaComunicacao">,
	): Passageiro {
		return new Passageiro({ ...dados, fabricaComunicacao });
	}

	// ========================
	// MÉTODOS SEMÂNTICOS
	// ========================

	public adicionarMotoristaFavorito(motorista: Motorista): void {
		if (this.motoristasFav.includes(motorista)) return;
		this.motoristasFav.push(motorista);
	}

	public removerMotoristaFavorito(motorista: Motorista): void {
		this.motoristasFav = this.motoristasFav.filter((m) => m !== motorista);
	}

	// ========================
	// VALIDAÇÕES
	// ========================

	private static validarMotoristasFav(valor: Motorista[]): Motorista[] {
		if (!Array.isArray(valor)) {
			throw new Error("Lista de motoristas favoritos inválida.");
		}

		return [...valor];
	}
}
