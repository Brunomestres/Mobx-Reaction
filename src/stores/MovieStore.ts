import { makeAutoObservable, reaction, IReactionDisposer } from "mobx";
import { Movie } from "../interfaces/movie";
import { api, API_KEY } from "../services/api";
export class MovieStore {
  public disposer: IReactionDisposer;
  public search: string = "";
  public page: number = 1;
  public loading: boolean = false;
  public movies: Movie = {
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0,
  };
  constructor() {
    makeAutoObservable(this);

    this.disposer = reaction(
      () => [this.search, this.page],
      () => {
        this.FindMovies();
      }
    );
  }

  public setMovies(movies: Movie) {
    this.movies = movies;
  }

  public setPage(pageNumber: number) {
    this.page = pageNumber;
  }
  public setSearch(search: string) {
    this.search = search;
  }

  public setLoading(loading: boolean) {
    this.loading = loading;
  }
  public get current() {
    return this.movies.results
      .slice(0)
      .map((m) => m)
      .sort((l, r) => {
        let a = new Date(l.release_date);
        let b = new Date(r.release_date);
        return b.getTime() - a.getTime();
      })
      .slice(0, 5);
  }

  public limparMovies() {
    this.movies.results.length = 0;
  }

  async FindMovies() {
    if (this.loading) {
      return;
    }

    this.setLoading(true);

    try {
      const response = await api.get(
        `search/movie?api_key=${API_KEY}&language=pt-BR&query=${this.search}&page=${this.page}`
      );

      this.setMovies(response.data);
    } catch (error) {
      this.limparMovies();
      console.log(error);
    } finally {
      this.setLoading(false);
    }
  }


  public filterMovies(id:number){

    const movies = this.movies.results.map(e => e).filter( e => e.genre_ids.includes(id));
    console.log(this.movies)
    console.log(movies)
    // return movies;
  }
}
