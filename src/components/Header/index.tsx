import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Genre } from "../../interfaces/genre";
import { GenreStore } from "../../stores/GenreStore";
import { MovieStore } from "../../stores/MovieStore";
import Box from "@material-ui/core/Box";
import "./style.css";

type Props = {
  genreStore: GenreStore;
  movieStore: MovieStore;
};

function Header({ genreStore, movieStore }: Props) {
  // const [genres, setGenres] = useState<Genre[]>([]);
  // useEffect(() => {
  //   setGenres(genreStore.genres);
  // }, [genreStore.genres]);

  // function handleClick(genreId: number) {
  //   if (movieStore.movies.results.length <= 0) {
  //     return;
  //   }
  //   movieStore.filterMovies(genreId);
  // }

  return (
    <nav className="header">
      <strong>Buscar Filmes com MOBX</strong>
      {/* <Box display="flex" flexDirection="row" flexWrap="wrap">
        <Box
          onClick={() => movieStore.FindMovies()}
          className="menu"
          p={0.3}
          m={1}
          bgcolor="#4D54DB"
          borderRadius={4}
        >
          Todos
        </Box>

        {genres.map((genre) => (
          <Box
            className="menu"
            onClick={() => handleClick(genre.id)}
            p={0.3}
            m={1}
            bgcolor="#4D54DB"
            borderRadius={4}
            key={genre.id}
          >
            {genre.name}
          </Box>
        ))}
      </Box> */}
    </nav>
  );
}

export default observer(Header);
