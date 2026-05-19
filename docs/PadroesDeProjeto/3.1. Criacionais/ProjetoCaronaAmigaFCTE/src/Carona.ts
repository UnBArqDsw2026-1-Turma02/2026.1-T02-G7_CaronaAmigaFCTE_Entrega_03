import { Localizacao } from './Localizacao';
import { StatusCarona } from './StatusCarona';
import { Passageiro } from './Passageiro';
import { Motorista } from './Motorista';
import { HistoricoViagem } from './HistoricoViagem';


abstract class Carona {
    origem: Localizacao;
    destino: Localizacao;
    horarioPartida: Date;
    vagasDisponiveis: number;
    precoBase: number;
    codigoVerificacao: string;
    status: StatusCarona;
    passageiros: Passageiro[];
    motorista: Motorista;

    constructor(origem: Localizacao, destino: Localizacao, horarioPartida: Date, vagasDisponiveis: number, precoBase: number, codigoVerificacao: string, status: StatusCarona, passageiros: Passageiro[], motorista: Motorista) {
        this.origem = origem;
        this.destino = destino;
        this.horarioPartida = horarioPartida;
        this.vagasDisponiveis = vagasDisponiveis;
        this.precoBase = precoBase;
        this.codigoVerificacao = codigoVerificacao;
        this.status = status;
        this.passageiros = passageiros;
        this.motorista = motorista;
    }
    
    // <<template>>
    abstract publicar(): void;
    // <<primitiva 1>>
    abstract validarCarona(): void;
    // <<primitiva 2>>
    abstract notificarPassageiros(): void;
    // <<primitiva 3>>
    abstract confirmarEmbargue(): void;
    // <<primitiva 4>>
    abstract finalizarCarona(): void;
    // <<primitiva 5>>
    abstract gerarHistorico(): HistoricoViagem;
    abstract cancelar(): void;
    abstract detectarDesvio(): void;
}