import type { HistoricoViagem } from "../domain/types";

import { Carona } from "./Carona";
import type { Localizacao } from "./Localizacao";
import type { Motorista } from "./Motorista";
import type { Passageiro } from "./Passageiro";
import { StatusCarona } from "./StatusCarona";

type CaronaAvulsaProps = {
	origem: Localizacao;
	destino: Localizacao;
	horarioPartida: Date;
	vagasDisponiveis: number;
	precoBase: number;
	codigoVerificacao: string;
	passageiros?: Passageiro[];
	motorista: Motorista;
};

export class CaronaAvulsa extends Carona {
	public constructor(props: CaronaAvulsaProps) {
		super({ ...props });
	}

	// ========================
	// MÉTODOS PÚBLICOS (apoio ao uso)
	// ========================

	public adicionarPassageiroAvulso(passageiro: Passageiro): void {
		this.adicionarPassageiro(passageiro);
	}

	// ========================
	// PRIMITIVAS (implementação concreta)
	// ========================

	protected validarCarona(): void {
		if (this.getStatus() !== StatusCarona.ATIVA) {
			throw new Error("Carona precisa estar ATIVA para publicar.");
		}

		const motorista = this.getMotorista();
		if (!motorista.getVerificado()) {
			throw new Error("Motorista não verificado.");
		}

		if (!motorista.getVeiculo()) {
			throw new Error("Motorista sem veículo cadastrado.");
		}

		const agora = new Date();
		if (this.getHorarioPartida().getTime() < agora.getTime() - 60_000) {
			throw new Error("Horário de partida no passado.");
		}

		if (this.getOrigem().getCoordenadas() === this.getDestino().getCoordenadas()) {
			throw new Error("Origem e destino não podem ser iguais.");
		}
	}

	protected notificarPassageiros(): void {
		// TODO: integrar com FabricaComunicacao (Notificacao/Mensagem) quando existir.
		// Regra mínima: apenas garante que a lista está acessível.
		this.getPassageiros();
	}

	protected confirmarEmbarque(): void {
		if (this.getStatus() !== StatusCarona.ATIVA) {
			throw new Error("Status inválido para confirmar embarque.");
		}
		this.atualizarStatus(StatusCarona.EM_ANDAMENTO);
	}

	protected finalizarCarona(): void {
		if (this.getStatus() !== StatusCarona.EM_ANDAMENTO) {
			throw new Error("Status inválido para finalizar carona.");
		}
		this.atualizarStatus(StatusCarona.CONCLUIDA);
	}

	protected gerarHistorico(): HistoricoViagem {
		// `HistoricoViagem` hoje é uma interface vazia (stub). Mantemos um payload útil
		// pro futuro sem forçar a tipagem agora.
		return {
			tipo: "CARONA_AVULSA",
			motoristaId: this.getMotorista().getId(),
			passageirosIds: this.getPassageiros().map((p) => p.getId()),
			origem: this.getOrigem().getDescricao(),
			destino: this.getDestino().getDescricao(),
			horarioPartida: this.getHorarioPartida().toISOString(),
			precoBase: this.getPrecoBase(),
		} as unknown as HistoricoViagem;
	}

	// ========================
	// OUTROS COMPORTAMENTOS (UML)
	// ========================

	public cancelar(): void {
		if (this.getStatus() === StatusCarona.CONCLUIDA) {
			throw new Error("Não é possível cancelar uma carona concluída.");
		}
		this.atualizarStatus(StatusCarona.CANCELADA);
	}

	public detectarDesvio(): boolean {
		// TODO: quando existir rastreamento/rota, implementar de verdade.
		return false;
	}
}
