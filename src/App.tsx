import { Container } from "@material-ui/core";
import Home from "./pages/Home";
import Header from "./components/Header";
import { observer, useLocalObservable} from "mobx-react-lite";
import { GenreStore } from "./stores/GenreStore";


function App() {
  const genreStore = useLocalObservable(() => new GenreStore());
  return (
    <Container maxWidth="md">
      <Header store={genreStore}/>
      <Home />
    </Container>
  );
}

export default observer(App);
