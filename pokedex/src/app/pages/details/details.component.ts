import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';

//Service
import { PokeAPIService } from 'src/app/service/poke-api.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  private urlPokemon: string = 'https://pokeapi.co/api/v2/pokemon'
  private urlName: string = 'https://pokeapi.co/api/v2/pokemon-species'

  public pokemon: any
  public isLoading: boolean = false
  public apiError: boolean = false


  constructor(
    private activeRouter: ActivatedRoute,
    private pokeAPIService: PokeAPIService
  ) { }

  ngOnInit(): void {
    this.getPokemon()
  }

  public getPokemon(){
    const id = this.activeRouter.snapshot.params['id']
    const pokemon = this.pokeAPIService.apiGetPokemons(`${this.urlPokemon}/${id}`)
    const name = this.pokeAPIService.apiGetPokemons(`${this.urlName}/${id}`)

    return forkJoin([pokemon, name]).subscribe(
      res => {
        this.pokemon = res
        this.isLoading = true
      }, error => {
        this.apiError = true
      }
    )
  }
}
