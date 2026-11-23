import { BrowserRouter, Routes as Switch, Route } from 'react-router';
import Main from './pages/Main';
import Repositorio from './pages/Repositorio';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" element={<Main />} />
        <Route path="/repositorio" element={<Repositorio />} />
      </Switch>
    </BrowserRouter>
  );
}
