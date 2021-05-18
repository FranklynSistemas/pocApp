import { Route, Switch } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { GlobalProvider } from './context/GlobalState';

import { Home } from './components/Home';
import { PokemonDetail } from './components/PokemonDetail'
import { Favorites } from './components/Favorites'

function App() {
  return (
    <GlobalProvider>
      <TransitionGroup  className="App">
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/detail/:pokemonName" exact>
            {({ match }) => (
                <CSSTransition
                  in={match != null}
                  timeout={500}
                  classNames="page"
                  unmountOnExit
                >
                  <div className="page">
                    <PokemonDetail {...match} />
                  </div>
                </CSSTransition>
              )}
          </Route>
          <Route path="/favorites" component={Favorites} exact />
        </Switch>
      </TransitionGroup>
    </GlobalProvider>
  );
}

export default App;
