import type { Localizacao } from "./Localizacao";

type RotaProps = {
	pontos: Localizacao[];
	tempoEstimadoMin?: number;
	distanciaKm?: number;
	desvioDetectado?: boolean;
};

export class Rota {
	private pontos: Localizacao[];
	private tempoEstimadoMin: number;
	private distanciaKm: number;
	private desvioDetectado: boolean;

	public constructor(props: RotaProps) {
		this.pontos = Rota.calcularRota(props.pontos);

		this.distanciaKm =
			props.distanciaKm ?? Rota.calcularDistanciaKm(this.pontos);
		this.tempoEstimadoMin =
			props.tempoEstimadoMin ?? Rota.calcularTempoEstimadoMin(this.pontos);

		this.distanciaKm = Rota.validarDistanciaKm(this.distanciaKm);
		this.tempoEstimadoMin = Rota.validarTempoEstimadoMin(this.tempoEstimadoMin);

		this.desvioDetectado =
			props.desvioDetectado ?? Rota.verificarDesvio(this.pontos, this.distanciaKm);
	}

	// ========================
	// GETTERS
	// ========================

	public getPontos(): readonly Localizacao[] {
		return this.pontos;
	}

	public getTempoEstimadoMin(): number {
		return this.tempoEstimadoMin;
	}

	public getDistanciaKm(): number {
		return this.distanciaKm;
	}

	public getDesvioDetectado(): boolean {
		return this.desvioDetectado;
	}

	// ========================
	// COMPORTAMENTOS (UML)
	// ========================

	public recalcular(pontos: Localizacao[]): void {
		this.pontos = Rota.calcularRota(pontos);
		this.distanciaKm = Rota.validarDistanciaKm(Rota.calcularDistanciaKm(this.pontos));
		this.tempoEstimadoMin = Rota.validarTempoEstimadoMin(
			Rota.calcularTempoEstimadoMin(this.pontos),
		);
		this.desvioDetectado = Rota.verificarDesvio(this.pontos, this.distanciaKm);
	}

	public verificarDesvio(): boolean {
		this.desvioDetectado = Rota.verificarDesvio(this.pontos, this.distanciaKm);
		return this.desvioDetectado;
	}

	// ========================
	// IMPLEMENTAÇÃO (privada)
	// ========================

	private static calcularRota(pontos: Localizacao[]): Localizacao[] {
		Rota.validarPontos(pontos);
		return [...pontos];
	}

	private static calcularTempoEstimadoMin(pontos: Localizacao[]): number {
		// Heurística simples: estima a partir da distância total e uma velocidade média.
		// (Sem integração com APIs de mapa/tempo de trânsito.)
		const distanciaKm = Rota.calcularDistanciaKm(pontos);
		const velocidadeMediaKmH = 40;
		const horas = distanciaKm / velocidadeMediaKmH;
		return Math.max(1, Math.round(horas * 60));
	}

	private static verificarDesvio(pontos: Localizacao[], distanciaKm: number): boolean {
		// Heurística simples: considera desvio quando o caminho é muito maior que a
		// distância em linha reta entre origem e destino.
		if (pontos.length < 2) {
			return false;
		}

		const distanciaDiretaKm = Rota.distanciaEntrePontosKm(pontos[0], pontos.at(-1)!);
		if (distanciaDiretaKm <= 0) {
			return false;
		}

		return distanciaKm / distanciaDiretaKm >= 1.5;
	}

	private static calcularDistanciaKm(pontos: Localizacao[]): number {
		Rota.validarPontos(pontos);

		let total = 0;
		for (let i = 1; i < pontos.length; i += 1) {
			total += Rota.distanciaEntrePontosKm(pontos[i - 1], pontos[i]);
		}
		return total;
	}

	private static distanciaEntrePontosKm(a: Localizacao, b: Localizacao): number {
		// Haversine (em km)
		const toRad = (deg: number): number => (deg * Math.PI) / 180;

		const lat1 = toRad(a.getLatitude());
		const lon1 = toRad(a.getLongitude());
		const lat2 = toRad(b.getLatitude());
		const lon2 = toRad(b.getLongitude());

		const dLat = lat2 - lat1;
		const dLon = lon2 - lon1;

		const sinDLat = Math.sin(dLat / 2);
		const sinDLon = Math.sin(dLon / 2);
		const aa = sinDLat * sinDLat + Math.cos(lat1) * Math.cos(lat2) * sinDLon * sinDLon;
		const c = 2 * Math.atan2(Math.sqrt(aa), Math.sqrt(1 - aa));

		const raioTerraKm = 6371;
		return raioTerraKm * c;
	}

	// ========================
	// VALIDAÇÕES
	// ========================

	private static validarPontos(pontos: Localizacao[]): void {
		if (!Array.isArray(pontos) || pontos.length < 2) {
			throw new Error("Rota precisa ter pelo menos 2 pontos.");
		}

		for (const ponto of pontos) {
			if (!ponto) {
				throw new Error("Rota possui ponto inválido.");
			}
		}
	}

	private static validarTempoEstimadoMin(valor: number): number {
		if (!Number.isInteger(valor) || valor <= 0) {
			throw new Error("Tempo estimado (min) inválido.");
		}
		return valor;
	}

	private static validarDistanciaKm(valor: number): number {
		if (!Number.isFinite(valor) || valor < 0) {
			throw new Error("Distância (km) inválida.");
		}
		return valor;
	}
}
