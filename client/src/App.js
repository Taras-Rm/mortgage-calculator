import './App.css';
import 'materialize-css';
import { Switch, Route, Redirect } from 'react-router-dom';
import { routes } from './routes/routes';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Switch>
          {routes.map(item => <Route component={item.component} path={item.path} exact={item.exact} key={item.path}/>)}
          <Redirect to="/banks" />
        </Switch>
      </div>
    </>
  );
}

export default App;
