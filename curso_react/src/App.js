import React, { Component }  from 'react';
import { Container } from 'react-bootstrap';
import Home from './vistas/Home';
import Menu from './vistas/Menu';
import ProductoList from './vistas/producto/ProductoList';
import ProductoForm from './vistas/producto/ProductoForm';
import ProductoCompra from './vistas/producto/ProductoCompra';
import ProductoVenta from './vistas/producto/ProductoVenta';

import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
// import './App.css';

class App extends Component {
 render() {
   return(
     <Router>
        <Container>
        <Menu/>
          <Switch>
             <Route exact path="/" component={Home}/>
             <Route exact path="/productos" component={ProductoList}/>
             <Route  path="/productos/nuevo" component={ProductoForm} />
             <Route  path="/productos/compras" component={ProductoCompra} />
             <Route  path="/productos/ventas" component={ProductoVenta} />

          </Switch>
        </Container>
     </Router>
   )
 }
}

export default App;
