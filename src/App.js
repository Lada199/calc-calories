
import './App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout/index.tsx';
import { MainCalc } from './pages/MainCalc/index.tsx';
import { RecipeCalc } from './pages/RecipeCalc/index.tsx';

function App() {
  return (
    <Router>
      <div className="App">
        <Layout>
          <Routes>
            <Route path="/" element={<MainCalc />} />
            <Route path="/recipe" element={<RecipeCalc />} />
          </Routes>

        </Layout>
      </div>
    </Router>

  );
}

export default App;
