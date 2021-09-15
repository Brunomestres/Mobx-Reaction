import React, { useState, useEffect } from 'react';
import { observer, useLocalObservable } from 'mobx-react-lite';
import Card from '@material-ui/core/Card';
import { TextField, FormControl  } from '@material-ui/core';
import CardMovies from '../../components/CardMovies';
import { Store } from '../../store';
import { useStyles } from './styles';

function Home() {
  const [search, setSearch] = useState('');
  const store = useLocalObservable(() => new Store());
  const styles = useStyles();

  useEffect(() => {
    store.setPage(1);
    store.setSearch(search);
  }, [search])


  return (
    <Card className={styles.cardPrimary}>
      <FormControl className={styles.form} >
        <TextField   label="Filmes" value={search} variant="outlined" onChange={(e) => setSearch(e.target.value)}/>
      </FormControl>
      <CardMovies search={search} store={store} />
    </Card>
  )
}

export default observer(Home);
