type HistoricoViagemProps = {
	id: string;
	tipo: string;
	motoristaId: string;
	passageirosIds: string[];
	origem: string;
	destino: string;
	horarioPartida: Date;
	precoBase: number;
	dataRegistro?: Date;
	notaMedia?: number;
	comentarios?: string[];
};

export class HistoricoViagem {
	private readonly id: string;
	private tipo: string;
	private readonly motoristaId: string;
	private readonly passageirosIds: string[];
	private origem: string;
	private destino: string;
	private horarioPartida: Date;
	private precoBase: number;
	private readonly dataRegistro: Date;
	private notaMedia?: number;
	private comentarios: string[];

	public constructor(props: HistoricoViagemProps) {
		this.id = HistoricoViagem.validarId(props.id);
		this.tipo = HistoricoViagem.validarTexto(props.tipo, "Tipo de histórico");
		this.motoristaId = HistoricoViagem.validarId(props.motoristaId);
		this.passageirosIds = HistoricoViagem.validarPassageiros(props.passageirosIds);
		this.origem = HistoricoViagem.validarTexto(props.origem, "Origem");
		this.destino = HistoricoViagem.validarTexto(props.destino, "Destino");
		this.horarioPartida = HistoricoViagem.validarHorarioPartida(props.horarioPartida);
		this.precoBase = HistoricoViagem.validarPrecoBase(props.precoBase);
		this.dataRegistro = props.dataRegistro ?? new Date();
		this.notaMedia = props.notaMedia;
		this.comentarios = props.comentarios ? [...props.comentarios] : [];
	}

	public getId(): string {
		return this.id;
	}

	public getTipo(): string {
		return this.tipo;
	}

	public getMotoristaId(): string {
		return this.motoristaId;
	}

	public getPassageirosIds(): readonly string[] {
		return this.passageirosIds;
	}

	public getOrigem(): string {
		return this.origem;
	}

	public getDestino(): string {
		return this.destino;
	}

	public getHorarioPartida(): Date {
		return this.horarioPartida;
	}

	public getPrecoBase(): number {
		return this.precoBase;
	}

	public getDataRegistro(): Date {
		return this.dataRegistro;
	}

	public getNotaMedia(): number | undefined {
		return this.notaMedia;
	}

	public getComentarios(): readonly string[] {
		return this.comentarios;
	}

	public adicionarComentario(comentario: string): void {
		this.comentarios.push(HistoricoViagem.validarTexto(comentario, "Comentário"));
	}

	public atualizarNotaMedia(nota: number): void {
		this.notaMedia = HistoricoViagem.validarNota(nota);
	}

	private static validarId(valor: string): string {
		const texto = valor.trim();
		if (texto.length === 0) {
			throw new Error("Id é obrigatório.");
		}
		return texto;
	}

	private static validarTexto(valor: string, nomeCampo: string): string {
		const texto = valor.trim();
		if (texto.length === 0) {
			throw new Error(`${nomeCampo} é obrigatório.`);
		}
		return texto;
	}

	private static validarHorarioPartida(valor: Date): Date {
		if (!(valor instanceof Date) || Number.isNaN(valor.getTime())) {
			throw new Error("Horário de partida inválido.");
		}
		return valor;
	}

	private static validarPrecoBase(valor: number): number {
		if (!Number.isFinite(valor) || valor < 0) {
			throw new Error("Preço base inválido.");
		}
		return valor;
	}

	private static validarNota(valor: number): number {
		if (!Number.isFinite(valor) || valor < 0 || valor > 5) {
			throw new Error("Nota inválida. Deve ser entre 0 e 5.");
		}
		return valor;
	}

	private static validarPassageiros(valor: string[]): string[] {
		if (!Array.isArray(valor)) {
			throw new Error("Lista de passageiros inválida.");
		}
		return valor.map((id) => HistoricoViagem.validarId(id));
	}
}
