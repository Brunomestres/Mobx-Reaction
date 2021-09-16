import {makeObservable, observable, reaction, action, IReactionDisposer} from 'mobx';
import { Genre } from '../interfaces/genre';
import {API_KEY, api } from '../services/api';


export class GenreStore{

  public genres: Genre[] = []
  public disposer: IReactionDisposer;
  constructor(){
    makeObservable(this,{
      genres: observable,
      setGenre: action
    });

    this.disposer = reaction(() => this.genres,() => {
      this.getGenre();
    },
    { fireImmediately: true } )

  }


  public setGenre(genres:Genre[]){
    this.genres = genres;
  }


  public async getGenre(){
    try {
      const response = await api.get<Genre[]>(`genre/movie/list?api_key=${API_KEY}&language=pt-BR`);
      this.setGenre(response.data);
      this.disposer();
      console.log(this.genres)
    } catch (error) {
      console.log(error);
    }
  }
}
