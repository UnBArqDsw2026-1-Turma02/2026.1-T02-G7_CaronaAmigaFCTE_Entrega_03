type AvaliacaoProps = {
	id: string;
	nota: number;
	comentario?: string;
	avaliadorId: string;
	avaliadoId: string;
	data?: Date;
};

export class Avaliacao {
	private readonly id: string;
	private nota: number;
	private comentario?: string;
	private avaliadorId: string;
	private readonly avaliadoId: string;
	private readonly data: Date;

	public constructor(props: AvaliacaoProps) {
		this.id = Avaliacao.validarId(props.id);
		this.nota = Avaliacao.validarNota(props.nota);
		this.comentario = props.comentario?.trim(); // pode ser undefined, por conta do "?"
		this.avaliadorId = Avaliacao.validarId(props.avaliadorId);
		this.avaliadoId = Avaliacao.validarId(props.avaliadoId);
		this.data = props.data ?? new Date(); // se data null ou undefined, instancia Date
	}

	public getId(): string {
		return this.id;
	}

	public getNota(): number {
		return this.nota;
	}

	public getComentario(): string | undefined {
		return this.comentario;
	}

	public getAvaliador(): string {
		return this.avaliadorId;
	}

	public getAvaliado(): string {
		return this.avaliadoId;
	}

	public getData(): Date {
		return this.data;
	}

	public atualizarComentario(comentario: string): void {
		this.comentario = Avaliacao.validarTexto(comentario, "Comentário");
	}
	
	private static validarId(valor: string): string {
		const texto = valor.trim();
		if (texto.length === 0) {
			throw new Error("Id é obrigatório.");
		}
		return texto;
	}
	
	// private publicar (avaliador: string, avaliado: string, nota: number, comentario: string) {
	// 	try{
	// 		avaliador = Avaliacao.validarId(avaliador);
	// 		avaliado = Avaliacao.validarId(avaliado);
	// 		nota = Avaliacao.validarNota(nota);
	// 		comentario = Avaliacao.validarTexto(comentario, "Comentario");
	
	// 		console.log(`Avaliação Publicada com Sucesso!! \n
	// 						Avaliador = ${avaliador}
	// 						Avaliado = ${avaliado}
	// 						Nota = ${nota}
	// 						Comentário = ${comentario}
	// 						`)
	// 	} catch (error) {
	// 		console.log(String(error));
	// 	}
	// }

	private static validarNota(valor: number): number {
		if (valor < 0 || valor > 5) {
			throw new Error("Nota inválida. Deve estar entre 0 e 5.");
		}
		return valor;
	}

	private static validarTexto(valor: string, nomeCampo: string): string {
		const texto = valor.trim();
		if (texto.length === 0) {
			throw new Error(`${nomeCampo} é obrigatório.`);
		}
		return texto;
	}
}
