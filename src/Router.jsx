import { Route, Routes } from 'react-router-dom';
import Pokedex from './pages/Pokedex';

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Pokedex />} />
    </Routes>
  );
}

export default Router;
