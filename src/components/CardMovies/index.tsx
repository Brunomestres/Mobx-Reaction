import { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Card, CardMedia, Typography } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import Paper from "@material-ui/core/Paper";
import { Movie } from "../../interfaces/movie";
import { useStyles } from "./styled";
import { MovieStore } from "../../stores/MovieStore";
import { GenreStore } from "../../stores/GenreStore";

type Props = {
  search: string;
  movieStore: MovieStore;
  genreStore: GenreStore;
};

function CardMovies({ search, movieStore, genreStore }: Props) {
  const [movies, setMovies] = useState<Movie>(movieStore.upperTitle);
  const classes = useStyles();

  const handleChange = (event: any, value: number) => {
    movieStore.setPage(value);
  };

  useEffect(() => {
    setMovies(movieStore.upperTitle);
  }, [movieStore.search, movieStore.page, movieStore, movieStore.movies]);

  return (
    <>
      {movieStore.loading ? (
        <h1 style={{ marginLeft: "40%" }}> Carregando... </h1>
      ) : (
        <>
          {movies && movies.results.length > 0 ? (
            <div>
              <div className={classes.paper}>
                <div>
                  <h2>Filmes adicionados recentemente:</h2>
                </div>
                {movieStore.current?.map((movie) => (
                  <Paper className={classes.paperItem} key={movie.id}>
                    <CardMedia
                      className={classes.paperImage}
                      image={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
                    />
                  </Paper>
                ))}
              </div>
              {movies.results.map((movie) => (
                <Card key={movie.id} className={classes.cardMovie}>
                  <CardMedia
                    className={classes.cover}
                    image={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
                  />
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <Typography
                      className={classes.title}
                      variant="subtitle1"
                      component="h2"
                    >
                      <b>{movie.original_title}</b>
                    </Typography>
                    <p className={classes.genres}>
                      Gênero:
                      {genreStore.genreByMovie(movie)}
                    </p>
                  </div>
                </Card>
              ))}
              <div className={classes.pagination}>
                <Pagination
                  count={movieStore.movies.total_pages}
                  color="secondary"
                  page={movieStore.page}
                  onChange={handleChange}
                  className={classes.paginationItem}
                />
              </div>
            </div>
          ) : (
            <></>
          )}
        </>
      )}
    </>
  );
}

export default observer(CardMovies);
