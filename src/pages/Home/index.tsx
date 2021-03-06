import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import Card from "@material-ui/core/Card";
import { TextField, FormControl } from "@material-ui/core";
import CardMovies from "../../components/CardMovies";
import { MovieStore } from "../../stores/MovieStore";
import { GenreStore } from "../../stores/GenreStore";
import { useStyles } from "./styles";
type Props = {
  movieStore: MovieStore;
  genreStore: GenreStore;
};

function Home({ movieStore, genreStore }: Props) {
  const styles = useStyles();
  const [search, setSearch] = useState("");
  useEffect(() => {
    movieStore.setPage(1);
    movieStore.setSearch(search);
  }, [search, movieStore]);

  return (
    <Card className={styles.cardPrimary}>
      <FormControl className={styles.form}>
        <TextField
          label="Digite o nome do filme"
          value={search}
          variant="outlined"
          onChange={(e) => setSearch(e.target.value)}
        />
      </FormControl>
      <CardMovies search={search} movieStore={movieStore} genreStore={genreStore} />
    </Card>
  );
}

export default observer(Home);
