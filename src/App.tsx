import { Container } from '@material-ui/core';
import Home from './pages/Home';
import Header from './components/Header';
import { observer } from 'mobx-react-lite';

function App() {

  return (
    <Container maxWidth="md">
      <Header />
      <Home />
    </Container>
  );
}

export default observer(App);
