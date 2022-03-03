import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Visualiser from './components/Visualiser';

function App() {
  return (
    <div className="wrapper">
      <Header />
      <Visualiser /> 
    </div>
  );
}

export default App;
