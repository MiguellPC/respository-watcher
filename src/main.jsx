import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';

import GlobalStyle from './styles/global';

import Main from './pages/Main';
import Repositorio from './pages/Repositorio';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GlobalStyle />
    <BrowserRouter>
      <Routes>
        <Route index element={<Main />} />
        <Route path="/repositorio/:id" element={<Repositorio />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
