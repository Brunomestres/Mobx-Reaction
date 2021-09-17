import { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Card, CardMedia, Typography } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import { Movie } from "../../interfaces/movie";
import { useStyles } from "./styled";
import { MovieStore } from '../../stores/MovieStore';

type Props = {
  search: string;
  store: MovieStore;
};

function CardMovies({ search, store }: Props) {
  const [movies, setMovies] = useState<Movie>(store.movies);
  const classes = useStyles();

  const handleChange = (event: any, value: number) => {
    store.setPage(value);
  };

  useEffect(() => {
    setMovies(store.movies);
  }, [store.search, store.page, store, store.movies]);

  return (
    <>
      {store.loading ? (
        <h1 style={{ marginLeft: "40%" }}> Carregando... </h1>
      ) : (
        <>
          {movies && movies.results.length > 0 ? (
            <div>
              <div>
                <h2>Filmes mais recentes</h2>
                {store.current?.map((movie: any) => (
                  <p key={movie.id}>{movie.title}</p>
                ))}
              </div>
              {movies.results.map((movie) => (
                <Card key={movie.id} className={classes.cardMovie}>
                  <CardMedia
                    className={classes.cover}
                    image={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
                  />
                  <Typography
                    className={classes.title}
                    variant="subtitle1"
                    component="h2"
                  >
                    {movie.title}
                  </Typography>
                </Card>
              ))}
              <div className={classes.pagination}>
                <Pagination
                  count={store.movies.total_pages}
                  color="secondary"
                  page={store.page}
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
