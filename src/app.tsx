import React from 'react';
import MainPage from './pages/main-page';

const OFFERS_COUNT = 312;

function App(): JSX.Element {
  return <MainPage offersCount={OFFERS_COUNT} />;
}

export default App;
