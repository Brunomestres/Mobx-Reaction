import { Container } from "@material-ui/core";
import Home from "./pages/Home";
import Header from "./components/Header";
import { observer, useLocalObservable } from "mobx-react-lite";
import { GenreStore } from "./stores/GenreStore";
import { MovieStore } from "./stores/MovieStore";

function App() {
  const genreStore = useLocalObservable(() => new GenreStore());
  const movieStore = useLocalObservable(() => new MovieStore());
  return (
    <Container maxWidth="md">
      <Header genreStore={genreStore} movieStore={movieStore} />
      <Home movieStore={movieStore} genreStore={genreStore} />
    </Container>
  );
}

export default observer(App);
