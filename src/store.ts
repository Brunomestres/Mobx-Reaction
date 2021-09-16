import { makeAutoObservable, reaction} from 'mobx';
import { Movie } from './interfaces/movie';
import api from './services/api';
const API_KEY = 'e4754b23001f38ed6b6b09be083d1dd8';
export class Store {

  constructor(){
    // makeObservable(this,
    //   {
    //   loading:observable,
    //   search: observable,
    //   page: observable,
    //   movies: observable,
    //   setMovies: action,
    //   setPage: action,
    //   FindMovies: action,
    //   setLoading: action,
    //   setSearch: action,
    //   countVotes: computed,
    //   current: computed
    // });

    makeAutoObservable(this);

    const disposer = reaction(() => [this.search,this.page] ,() => {
      this.FindMovies();
    })
  }

  public search:string = '';
  public page:number = 1;
  public loading:boolean = false;
  public movies:Movie = {
    page: 0 ,
    results: [],
    total_pages: 0,
    total_results: 0
  };


  public setMovies(movies:Movie){
    this.movies = movies;
  }

  public setPage(pageNumber:number){
    this.page = pageNumber;
  }
  public setSearch(search:string){
    this.search = search;
  }

  public setLoading(loading:boolean){
    this.loading = loading;
  }


  public get countVotes()
  {
    if(this.movies.results.length > 0){
      return this.movies.results.map(m => m).sort((l ,r ) => r.vote_count - l.vote_count)
        .slice(0 , 5)
    }
    return null;
  }

  public get current()
  {
    return this.movies.results.slice(0).map(m => m).sort((l, r) => {
      let a  = new Date(l.release_date);
      let b = new Date(r.release_date);
      return b.getTime() - a.getTime()
    } )
      .slice(0 , 5)

  }

  async FindMovies(){
    if(this.loading){
      return;
    }

    this.setLoading(true)

    try {

      const response = await api.get(`search/movie?api_key=${API_KEY}&language=pt-BR&query=${this.search}&page=${this.page}`);

      this.setMovies(response.data);
    } catch (error) {

      console.log(error);

    }finally{
      this.setLoading(false);
    }

  }

}

