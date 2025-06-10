import React from 'react';
import { Routes, Route } from 'react-router';
import { AddNewsItem, EditNewsItem, FeedPage } from '../pages';

const App: React.FC = () =>  {
  return (
    <Routes>
      <Route index element={<FeedPage />} />
      <Route path="add" element={<AddNewsItem/>} />
      <Route path="edit/:id" element={<EditNewsItem/>} />
    </Routes>
  );
};

export default App;
