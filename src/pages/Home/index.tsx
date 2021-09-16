import React, { useState, useEffect } from 'react';
import { observer, useLocalObservable } from 'mobx-react-lite';
import Card from '@material-ui/core/Card';
import { TextField, FormControl  } from '@material-ui/core';
import CardMovies from '../../components/CardMovies';
import { MovieStore } from '../../stores/MovieStore';
import { GenreStore } from '../../stores/GenreStore';
import { useStyles } from './styles';

function Home() {
  const styles = useStyles();
  const [search, setSearch] = useState('');
  const movieStore = useLocalObservable(() => new MovieStore());
  const genreStore = useLocalObservable(() => new GenreStore());

  useEffect(() => {
    movieStore.setPage(1);
    movieStore.setSearch(search);
  }, [search , movieStore])


  return (
    <Card className={styles.cardPrimary}>
      <FormControl className={styles.form} >
        <TextField label="Digite o nome do filme" value={search} variant="outlined" onChange={(e) => setSearch(e.target.value)}/>
      </FormControl>
      <CardMovies search={search} store={movieStore} />
    </Card>
  )
}

export default observer(Home);
