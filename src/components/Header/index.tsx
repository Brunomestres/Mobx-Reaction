import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Genre } from "../../interfaces/genre";
import { GenreStore } from "../../stores/GenreStore";
import Box from "@material-ui/core/Box";
import "./style.css";

type Props = {
  store: GenreStore;
};

function Header({ store }: Props) {
  const [genres, setGenres] = useState<Genre[]>([]);
  useEffect(() => {
    setGenres(store.genres);
  }, [store.genres]);

  return (
    <nav className="header">
      <strong>Buscar Filmes com MOBX</strong>
      <Box display="flex" flexDirection="row" flexWrap="wrap">
        {genres.map((genre) => (
          <Box
            className="menu"
            onClick={() => store.setCurrent(genre.id)}
            p={0.3}
            m={1}
            bgcolor="#4D54DB"
            borderRadius={4}
            key={genre.id}
          >
            {genre.name}
          </Box>
        ))}
      </Box>
    </nav>
  );
}

export default observer(Header);
