// src/models/Usuario.ts

import type {
  FabricaComunicacao,
  HistoricoViagem,
} from "../domain/types";

import type { ContatoEmergencia } from "./ContatoEmergencia";
import type { PreferenciaPareamento } from "./PreferenciaPareamento";

// 🔹 Separação em partes (ficou mais organizado mentalmente)
type DadosBasicos = {
  nome: string;
  emailInstitucional: string;
  telefone: string;
  senhaHash: string;
};

type Perfil = {
  fotoPerfil: string;
  preferencias: PreferenciaPareamento;
  contatoEmergencia: ContatoEmergencia;
  id: string;
};

type Estatisticas = {
  avaliacaoMedia: number;
  qtdViagens: number;
};

export type UsuarioProps = DadosBasicos &
  Perfil &
  Estatisticas & {
    fabricaComunicacao: FabricaComunicacao;
  };

export abstract class Usuario {
  private nome: string;
  private emailInstitucional: string;
  private telefone: string;
  private senhaHash: string;
  private readonly id: string;

  private fotoPerfil: string;
  private preferencias: PreferenciaPareamento;
  private contatoEmergencia: ContatoEmergencia;

  private avaliacaoMedia: number;
  private qtdViagens: number;

  private fabricaComunicacao: FabricaComunicacao;

  // 👇 já preparando pro futuro
  private historico: HistoricoViagem[] = [];

  protected constructor(props: UsuarioProps) {
    this.nome = props.nome;
    this.emailInstitucional = props.emailInstitucional;
    this.telefone = Usuario.validarTelefone(props.telefone);
    this.id = Usuario.validarId(props.id);
    this.senhaHash = props.senhaHash;

    this.fotoPerfil = props.fotoPerfil;
    this.preferencias = props.preferencias;
    this.contatoEmergencia = props.contatoEmergencia;

    this.avaliacaoMedia = Usuario.validarAvaliacaoMedia(props.avaliacaoMedia);
    this.qtdViagens = Usuario.validarQtdViagens(props.qtdViagens);

    this.fabricaComunicacao = props.fabricaComunicacao;
  }

  // ========================
  // GETTERS
  // ========================

  public getNome(): string {
    return this.nome;
  }

  public getEmailInstitucional(): string {
    return this.emailInstitucional;
  }

  public getFotoPerfil(): string {
    return this.fotoPerfil;
  }

  public getTelefone(): string {
    return this.telefone;
  }

  public getId(): string {
    return this.id;
  }

  public getPreferencias(): PreferenciaPareamento {
    return this.preferencias;
  }

  public getContatoEmergencia(): ContatoEmergencia {
    return this.contatoEmergencia;
  }

  public getAvaliacaoMedia(): number {
    return this.avaliacaoMedia;
  }

  public getQtdViagens(): number {
    return this.qtdViagens;
  }

  public getHistorico(): readonly HistoricoViagem[] {
    return this.historico;
  }

  // ========================
  // COMPORTAMENTOS
  // ========================

  // 🔥 login melhorado
  private validarSenha(senha: string): boolean {
    return senha === this.senhaHash;
  }

  public login(email: string, senha: string): boolean {
    return email === this.emailInstitucional && this.validarSenha(senha);
  }

  public cadastrar(): void {
    Usuario.validarEmailInstitucional(this.emailInstitucional);
    Usuario.validarTelefone(this.telefone);
    Usuario.validarId(this.id);
    Usuario.validarSenhaHash(this.senhaHash);
  }

  public excluirPerfil(email: string, senha: string): void {
    if (!this.login(email, senha)) {
      throw new Error("Credenciais inválidas.");
    }

    this.fotoPerfil = "";
  }

  // ========================
  // MÉTODOS SEMÂNTICOS (🔥 importante)
  // ========================

  public atualizarFotoPerfil(foto: string): void {
    this.setFotoPerfil(foto);
  }

  public atualizarPreferencias(pref: PreferenciaPareamento): void {
    this.setPreferencias(pref);
  }

  public atualizarContatoEmergencia(contato: ContatoEmergencia): void {
    this.setContatoEmergencia(contato);
  }

  public atualizarTelefone(telefone: string): void {
    this.setTelefone(telefone);
  }

  protected adicionarHistorico(viagem: HistoricoViagem): void {
    this.historico.push(viagem);
  }

  protected incrementarQtdViagens(): void {
    this.qtdViagens = Usuario.validarQtdViagens(this.qtdViagens + 1);
  }

  // ========================
  // SETTERS PROTEGIDOS
  // ========================

  protected setFotoPerfil(foto: string): void {
    this.fotoPerfil = foto;
  }

  protected setPreferencias(pref: PreferenciaPareamento): void {
    this.preferencias = pref;
  }

  protected setTelefone(telefone: string): void {
    this.telefone = Usuario.validarTelefone(telefone);
  }

  protected setContatoEmergencia(contato: ContatoEmergencia): void {
    this.contatoEmergencia = contato;
  }

  protected setAvaliacaoMedia(avaliacao: number): void {
    this.avaliacaoMedia = Usuario.validarAvaliacaoMedia(avaliacao);
  }

  // ========================
  // VALIDAÇÕES
  // ========================

  private static validarEmailInstitucional(email: string): void {
    if (email.trim().length === 0) {
      throw new Error("E-mail institucional é obrigatório.");
    }
  }

  private static validarSenhaHash(senha: string): void {
    if (senha.trim().length === 0) {
      throw new Error("Senha é obrigatória.");
    }
  }

  private static validarId(id: string): string {
    const valor = id.trim();

    if (valor.length === 0) {
      throw new Error("Id é obrigatório.");
    }

    return valor;
  }

  private static validarTelefone(telefone: string): string {
    const valor = telefone.trim();

    if (valor.length === 0) {
      throw new Error("Telefone é obrigatório.");
    }

    return valor;
  }

  private static validarAvaliacaoMedia(valor: number): number {
    if (!Number.isFinite(valor)) {
      throw new Error("Avaliação inválida.");
    }

    if (valor < 0 || valor > 5) {
      throw new Error("Avaliação deve ser entre 0 e 5.");
    }

    return valor;
  }

  private static validarQtdViagens(valor: number): number {
    if (!Number.isInteger(valor) || valor < 0) {
      throw new Error("Quantidade de viagens inválida.");
    }

    return valor;
  }
}