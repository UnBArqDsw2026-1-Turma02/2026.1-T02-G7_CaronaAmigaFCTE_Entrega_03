import type { Carona } from "./Carona";
import type { Passageiro } from "./Passageiro";
import { StatusCarona } from "./StatusCarona";

export class ValidacaoEmbarque {
	public validarEmbarque(passageiro: Passageiro, carona: Carona): boolean {
		const status = carona.getStatus();
		if (
			status !== StatusCarona.ATIVA &&
			status !== StatusCarona.EM_ANDAMENTO
		) {
			return false;
		}

		return carona
			.getPassageiros()
			.some((p) => p.getId() === passageiro.getId());
	}

	public podeConfirmarEmbarque(carona: Carona): boolean {
		return carona.getStatus() === StatusCarona.ATIVA;
	}
}
