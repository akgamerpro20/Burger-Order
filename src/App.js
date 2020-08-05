import React from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from '../src/containers/BurgerBuilder/BurgerBuilder'

function App() {
  return (
    <div className="App">
      <Layout>
        <BurgerBuilder/>
      </Layout>
    </div>
  );
}

export default App;
