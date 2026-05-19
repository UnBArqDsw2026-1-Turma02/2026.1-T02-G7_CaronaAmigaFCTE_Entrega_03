import { CaronaAvulsa } from "../models/CaronaAvulsa";
import { ContatoEmergencia } from "../models/ContatoEmergencia";
import { Localizacao } from "../models/Localizacao";
import { Motorista } from "../models/Motorista";
import { Passageiro } from "../models/Passageiro";
import { PreferenciaPareamento } from "../models/PreferenciaPareamento";
import { Veiculo } from "../models/Veiculo";

import type {
	FabricaComunicacao,
	Mensagem,
	Notificacao,
} from "../domain/types";

const fabricaComunicacao: FabricaComunicacao = {
	criarMensagem(): Mensagem {
		return {} as Mensagem;
	},
	criarNotificacao(): Notificacao {
		return {} as Notificacao;
	},
};

function criarContatoEmergencia(): ContatoEmergencia {
	return new ContatoEmergencia({
		contatos: ["(61) 99999-9999"],
		telefone: "(61) 98888-8888",
	});
}

function criarPreferencias(): PreferenciaPareamento {
	return new PreferenciaPareamento({ mesmoCurso: true, motoristaMulher: false });
}

const veiculo = new Veiculo({
	placa: "ABC1D23".replace(/[^A-Z0-9]/g, "").padEnd(7, "0").slice(0, 7),
	modelo: "Onix",
	cor: "Preto",
	fotoVeiculo: "foto.jpg",
	capacidadeMaxPassageiros: 4,
	documentacaoValida: true,
});

const motorista = new Motorista({
	nome: "Ana Motorista",
	emailInstitucional: "ana@fcte.unb.br",
	telefone: "(61) 90000-0001",
	senhaHash: "senha",
	fotoPerfil: "ana.png",
	preferencias: criarPreferencias(),
	contatoEmergencia: criarContatoEmergencia(),
	id: "m-1",
	avaliacaoMedia: 4.8,
	qtdViagens: 12,
	fabricaComunicacao,

	cnh: "12345678900",
	verificado: true,
	veiculo,
});

const passageiro = new Passageiro({
	nome: "Bia Passageira",
	emailInstitucional: "bia@fcte.unb.br",
	telefone: "(61) 90000-0002",
	senhaHash: "senha",
	fotoPerfil: "bia.png",
	preferencias: criarPreferencias(),
	contatoEmergencia: criarContatoEmergencia(),
	id: "p-1",
	avaliacaoMedia: 4.2,
	qtdViagens: 3,
	fabricaComunicacao,
});

const origem = new Localizacao({
	latitude: -15.765,
	longitude: -47.870,
	descricao: "FCTE (origem)",
});

const destino = new Localizacao({
	latitude: -15.780,
	longitude: -47.930,
	descricao: "Rodoviária (destino)",
});

const carona = new CaronaAvulsa({
	origem,
	destino,
	horarioPartida: new Date(Date.now() + 10 * 60_000),
	vagasDisponiveis: 2,
	precoBase: 12.5,
	codigoVerificacao: "COD-123",
	motorista,
});

carona.adicionarPassageiroAvulso(passageiro);

console.log("Status inicial:", carona.getStatus());
carona.publicar();
console.log("Status final:", carona.getStatus());
console.log("Passageiros:", carona.getPassageiros().map((p) => p.getNome()));
