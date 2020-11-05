
import { Component } from '@angular/core';

import { PokemonapiService } from '../services/pokemonapi.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public next: string;
  public previous: string;
  public totalPaginas = 0;
  public pagina = 1;
  public listaPokemonApi = [];
  public listaPokemonExibir = [];




  constructor(private pokemonApi: PokemonapiService) {
    this.buscarPokemons;
  }
  
  public buscarPokemons() {
     this.pokemonApi.buscarPokemons().subscribe(dados => {
      this.listaPokemonApi = [];
      this.totalPaginas = dados['count'] / 10;

      this.previous = dados['previous'];
      this.next = dados['next'];
      let listaApi = dados['results']

      for (let item of listaApi) {
        this.pokemonApi.buscarPokemonNumero(item.url).subscribe(dadosPokemon => {
          this.listaPokemonApi.push(dadosPokemon);
          this.ordenarLista();

        });
      }
    })
  }

  private ordenarLista() {
    this.listaPokemonApi.sort((a, b) => {
      if (a.id > b.id) {
        return 1;
      }
      if (a.id < b.id) {
        return -1;
      }
      return 0;
    });
    this.listaPokemonExibir = this.listaPokemonApi;
  }
  public paginacao(url, movimento) {
    this.pagina = this.pagina + movimento;
    this.pokemonApi.url = url;

    this.buscarPokemons();
  }
}
