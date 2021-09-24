import { makeObservable, observable, action } from "mobx";
import { Genre } from "../interfaces/genre";
import { MovieResults } from "../interfaces/movie";
import { API_KEY, api } from "../services/api";

export class GenreStore {
  public genres: Genre[] = [];
  public namesGenres: string[] = [];
  constructor() {
    makeObservable(this, {
      genres: observable,
      setGenre: action,
      namesGenres: observable,
    });

    this.getGenre();
  }
  public setGenre(genres: Genre[]) {
    this.genres = genres;
  }

  public async getGenre() {
    try {
      const response = await api.get(
        `genre/movie/list?api_key=${API_KEY}&language=pt-BR`
      );

      this.setGenre(response.data.genres);
    } catch (error) {
      console.log(error);
    }
  }
  public genreByMovie(movie: MovieResults) {
    return this.genres
      .filter((e) => movie.genre_ids.includes(e.id))
      .map((e) => e.name)
      .join(", ");
  }
}
