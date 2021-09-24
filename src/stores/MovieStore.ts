import {
  makeObservable,
  reaction,
  IReactionDisposer,
  runInAction,
  observable,
  action,
  computed,
} from "mobx";
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
    makeObservable(this, {
      search: observable,
      page: observable,
      loading: observable,
      movies: observable,
      setMovies: action,
      setPage: action,
      setLoading: action,
      setSearch: action,
      cleanMovies: action,
      current: computed,
    });

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
      .slice()
      .sort((l, r) => {
        let a = new Date(l.release_date);
        let b = new Date(r.release_date);
        return b.getTime() - a.getTime();
      })
      .slice(0, 5);
  }

  public cleanMovies() {
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
      this.cleanMovies();
      console.log(error);
    } finally {
      this.setLoading(false);
    }
  }

  public disposers() {
    this.disposer();
  }
}
