import type { HistoricoViagem } from "../domain/types";

import type { Motorista } from "./Motorista";
import type { Passageiro } from "./Passageiro";
import type { Localizacao } from "./Localizacao";

import { StatusCarona } from "./StatusCarona";

type CaronaProps = {
	origem: Localizacao;
	destino: Localizacao;
	horarioPartida: Date;
	vagasDisponiveis: number;
	precoBase: number;
	codigoVerificacao: string;
	status?: StatusCarona;
	passageiros?: Passageiro[];
	motorista: Motorista;
};

export abstract class Carona {
	private origem: Localizacao;
	private destino: Localizacao;
	private horarioPartida: Date;
	private vagasDisponiveis: number;
	private precoBase: number;
	private codigoVerificacao: string;
	private status: StatusCarona;
	private passageiros: Passageiro[];
	private motorista: Motorista;

	protected constructor(props: CaronaProps) {
		this.origem = props.origem;
		this.destino = props.destino;
		this.horarioPartida = Carona.validarHorarioPartida(props.horarioPartida);
		this.vagasDisponiveis = Carona.validarVagasDisponiveis(props.vagasDisponiveis);
		this.precoBase = Carona.validarPrecoBase(props.precoBase);
		this.codigoVerificacao = Carona.validarCodigoVerificacao(props.codigoVerificacao);
		this.status = props.status ?? StatusCarona.ATIVA;
		this.passageiros = props.passageiros ? [...props.passageiros] : [];
		this.motorista = props.motorista;
	}

	// ========================
	// GETTERS
	// ========================

	public getOrigem(): Localizacao {
		return this.origem;
	}

	public getDestino(): Localizacao {
		return this.destino;
	}

	public getHorarioPartida(): Date {
		return this.horarioPartida;
	}

	public getVagasDisponiveis(): number {
		return this.vagasDisponiveis;
	}

	public getPrecoBase(): number {
		return this.precoBase;
	}

	public getCodigoVerificacao(): string {
		return this.codigoVerificacao;
	}

	public getStatus(): StatusCarona {
		return this.status;
	}

	public getPassageiros(): readonly Passageiro[] {
		return this.passageiros;
	}

	public getMotorista(): Motorista {
		return this.motorista;
	}

	// GoF Template Method
	// <<template>>
	public publicar(): void {
		this.validarCarona();
		this.notificarPassageiros();
		this.confirmarEmbarque();
		this.finalizarCarona();
		const historico = this.gerarHistorico();
		this.aplicarHistoricoGerado(historico);
	}
	// <<primitive>>
	protected abstract validarCarona(): void;
	// <<primitive>>
	protected abstract notificarPassageiros(): void;
	// <<primitive>>
	protected abstract confirmarEmbarque(): void;
	// <<primitive>>
	protected abstract finalizarCarona(): void;
	// <<primitive>>
	protected abstract gerarHistorico(): HistoricoViagem;

	public abstract cancelar(): void;

	public abstract detectarDesvio(): boolean;

	protected adicionarPassageiro(passageiro: Passageiro): void {
		if (this.vagasDisponiveis <= 0) {
			throw new Error("Sem vagas disponíveis.");
		}
		this.passageiros.push(passageiro);
		this.vagasDisponiveis = Carona.validarVagasDisponiveis(this.vagasDisponiveis - 1);
	}

	protected atualizarStatus(status: StatusCarona): void {
		this.status = status;
	}

	protected aplicarHistoricoGerado(_historico: HistoricoViagem): void {
		// @TODO: associar histórico ao motorista/passageiros (quando `HistoricoViagem` virar classe do domínio)
	}

	// Validações
	private static validarHorarioPartida(date: Date): Date {
		if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
			throw new Error("Horário de partida inválido.");
		}
		return date;
	}

	private static validarVagasDisponiveis(valor: number): number {
		if (!Number.isInteger(valor) || valor < 0) {
			throw new Error("Vagas disponíveis inválidas.");
		}
		return valor;
	}

	private static validarPrecoBase(valor: number): number {
		if (!Number.isFinite(valor) || valor < 0) {
			throw new Error("Preço base inválido.");
		}
		return valor;
	}

	private static validarCodigoVerificacao(valor: string): string {
		// Validação boba inicial
		const texto = valor.trim();
		if (texto.length === 0) {
			throw new Error("Código de verificação é obrigatório.");
		}
		return texto;
	}
}
