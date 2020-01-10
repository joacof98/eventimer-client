import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import {AuthProvider} from './context/auth';
import AuthRoute from './util/AuthRoute';
import AuthRouteUsers from './util/AuthRouteUsers';

import 'semantic-ui-css/semantic.min.css';
import './App.css';

import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Perfil from './Pages/Perfil';
import Menubar from './Components/Menubar';

function App() {
  return (
    <AuthProvider>{/*Necesito que TODA la app pueda ver al user del contexto*/}
      <Router>
      	<Container>
      	  <Menubar />
        	<AuthRoute exact path='/' component={Home} />
          <AuthRoute exact path='/entrar' component={Login} />
          <AuthRoute exact path='/registrate' component={Register} />
      	  <AuthRouteUsers exact path="/user/:userId" component={Perfil} />
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
