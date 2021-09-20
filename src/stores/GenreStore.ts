import {
  makeObservable,
  observable,
  reaction,
  action,
  IReactionDisposer,
  computed,
} from "mobx";
import { Genre } from "../interfaces/genre";
import { MovieResults } from "../interfaces/movie";
import { API_KEY, api } from "../services/api";

export class GenreStore {
  public genres: Genre[] = [];
  public disposer: IReactionDisposer;
  public namesGenres: string[] = [];
  constructor() {
    makeObservable(this, {
      genres: observable,
      setGenre: action,
      namesGenres: observable,
      genresString: computed,
      genreByMovie: action,
    });

    this.disposer = reaction(
      () => this.genres,
      () => {
        this.getGenre();
      },
      { fireImmediately: true }
    );
  }

  public setGenre(genres: Genre[]) {
    this.genres = genres;
  }

  public async getGenre() {
    try {
      const response = await api.get(
        `genre/movie/list?api_key=${API_KEY}&language=pt-BR`
      );
      this.disposer();
      this.setGenre(response.data.genres);
    } catch (error) {
      console.log(error);
    }
  }

  public get genresString() {
    return this.namesGenres.join(", ");
  }

  public genreByMovie(movie: MovieResults) {
    this.namesGenres = this.genres
      .filter((e) => movie.genre_ids.includes(e.id))
      .map((e) => e.name);

    return this.genresString;
  }
}
