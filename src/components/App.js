import { lazy, Suspense, useState } from 'react';
import { Context } from '../data/context';

const Main = lazy(() => import('./Main').then(module => ({default:module.Main})));

function App() {

  const [result, setResult] = useState("");

  return (
    <div className="App">
      <Suspense fallback={<h1>Loading...</h1>}>
        <Context.Provider value={{
          result, setResult
        }}>

          <Main/>

        </Context.Provider>
      </Suspense>
    </div>
  );
}

export default App;
