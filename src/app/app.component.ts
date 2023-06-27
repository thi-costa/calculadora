import { Component } from '@angular/core';
import { Historico } from './classes/historico';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  private idCont = 0;
  private static readonly VAZIO_DEFAULT = '';

  private _historicoOperacoes: Historico[] = [];

  valorDaOperacao = AppComponent.VAZIO_DEFAULT;

  get historicoOperacoes(): Historico[] {
    if (this._historicoOperacoes.length < 4) return this._historicoOperacoes;
    //this._historicoOperacoes.filter(h => h.operacao != "");

    return this._historicoOperacoes.slice(
      this._historicoOperacoes.length - 3,
      this._historicoOperacoes.length
    );
  }

  acionarTecla(valorOuOperacao: string): void {
    this.valorDaOperacao += valorOuOperacao;
  }
  limparLinhaHistorico(): void {
    this._historicoOperacoes.pop();
  }

  confirmarOperacao(): void {
    try {
      /* let historico = new Historico();
      historico.operacao = this.valorDaOperacao;
      this.historicoOperacoes.push(historico); */

      let resultadoDaOperacao = eval(this.valorDaOperacao);

      this._historicoOperacoes.push({
        operacao: this.valorDaOperacao,
        dataCriacao: new Date(),
        id: this.idCont++,
      });
      this.valorDaOperacao = resultadoDaOperacao;

      console.log(this._historicoOperacoes);
    } catch (erro) {
      this._historicoOperacoes.push({
        operacao: this.valorDaOperacao,
        dataCriacao: new Date(),
        ocorreuErro: true,
        id: this.idCont++,
      });
    }
  }

  limparOperacao(): void {
    this.valorDaOperacao = AppComponent.VAZIO_DEFAULT;
  }
  limparHistoricoId(id: number){
    this._historicoOperacoes = this._historicoOperacoes.filter(_historico => _historico.id !== id)
  }
}
