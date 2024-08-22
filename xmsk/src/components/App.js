import React from 'react';
import Header from './Header';
import UserData from './UserData';
import Results from './Results';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <UserData />
        <Results />
      </main>
    </div>
  );
}

export default App;
