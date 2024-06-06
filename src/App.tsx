import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import ItemPage from './pages/ItemPage/ItemPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:id/item" element={<ItemPage />} />
      </Routes>
    </Router>
  );
};

export default App;
