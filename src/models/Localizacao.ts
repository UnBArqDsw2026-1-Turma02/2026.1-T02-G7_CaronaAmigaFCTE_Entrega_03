type LocalizacaoProps = {
	latitude: number;
	longitude: number;
	descricao: string;
	timestamp?: Date;
};

export class Localizacao {
	private latitude: number;
	private longitude: number;
	private descricao: string;
	private timestamp: Date;

	public constructor(props: LocalizacaoProps) {
		this.latitude = Localizacao.validarLatitude(props.latitude);
		this.longitude = Localizacao.validarLongitude(props.longitude);
		this.descricao = Localizacao.validarDescricao(props.descricao);
		this.timestamp = props.timestamp ?? new Date();
	}

	// ========================
	// GETTERS
	// ========================

	public getLatitude(): number {
		return this.latitude;
	}

	public getLongitude(): number {
		return this.longitude;
	}

	public getDescricao(): string {
		return this.descricao;
	}

	public getTimestamp(): Date {
		return this.timestamp;
	}

	// ========================
	// COMPORTAMENTOS (UML)
	// ========================

	public getCoordenadas(): string {
		return `${this.latitude},${this.longitude}`;
	}

	// ========================
	// VALIDAÇÕES
	// ========================

	private static validarLatitude(valor: number): number {
		if (!Number.isFinite(valor) || valor < -90 || valor > 90) {
			throw new Error("Latitude inválida.");
		}
		return valor;
	}

	private static validarLongitude(valor: number): number {
		if (!Number.isFinite(valor) || valor < -180 || valor > 180) {
			throw new Error("Longitude inválida.");
		}
		return valor;
	}

	private static validarDescricao(valor: string): string {
		const texto = valor.trim();
		if (texto.length === 0) {
			throw new Error("Descrição é obrigatória.");
		}
		return texto;
	}
}
