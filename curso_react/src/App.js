import React, { Component }  from 'react';
import { Container } from 'react-bootstrap';
import Home from './vistas/Home';
import Menu from './vistas/Menu';
// import ProductoList from './vistas/producto/ProductoList';
import ProductoForm from './vistas/producto/ProductoForm';
import ProductoCompra from './vistas/producto/ProductoCompra';
import ProductoVenta from './vistas/producto/ProductoVenta';
import ProductoFormbk from './vistas/producto/ProductoFormbk';
import Login from './vistas/auth/Login';
import Registro from './vistas/auth/Registro';
import UsuarioList from './vistas/auth/UsuariosList';
import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import {auth, db} from './config/firebase'; 



class App extends Component {
  state={
    usuarioLogeado: false,
    email: '',
    titulo:''
  }
componentDidMount(){
  this.authListener()
}


  authListener = () => {
    auth.onAuthStateChanged((user) => {
      if(user) {
        let emailUsuario = user.email
        console.log('Email usuario: ', user.email)
        console.log('Nombre usuario: ', user.displayName)
        console.log('Id usuario: ', user.uid)
        db.collection('usuarios').doc(user.uid).get()
        .then((user)=>{
          // console.log(user.data())
          if(user.data().estado == 0){
            auth.signOut()
            alert('Usuario no habilitado')
          }else{
            this.setState({usuarioLogeado: true, email : emailUsuario})
          }
        })
         // User is signed in.
  
      } else {
        console.log('Login incorrecto/logout: ', user)
          // User is signed out.
          this.setState({usuarioLogeado: false})
      }
  
    })
  }

  logear = (email, password) => {
    // console.log('metodo autenticacion')
    auth.signInWithEmailAndPassword(email, password)
    .catch(error => {
      alert(error)
    })
  }
  
  salir =() => {
    auth.signOut();
  }

 render() {
   return(
     <Router>
        <Container>
         {this.state.usuarioLogeado== true? <Menu metodoSalir = {this.salir} atributoEmail = {this.state.email}/> : null}
          <Switch>
              <PrivateRoute exact path="/home" component={Home} usuarioLogeado={this.state.usuarioLogeado}/>
              <PrivateRoute exact path="/productos" component={ProductoForm} usuarioLogeado={this.state.usuarioLogeado}/>
              <PrivateRoute exact path="/productos/nuevo" component={ProductoFormbk} usuarioLogeado={this.state.usuarioLogeado}/>
              <PrivateRoute exact path="/productos/editar/:productoId" component={ProductoFormbk} usuarioLogeado={this.state.usuarioLogeado}/>
              <PrivateRoute exact path="/productos/compras" component={ProductoCompra} usuarioLogeado={this.state.usuarioLogeado} />
              <PrivateRoute exact path="/productos/ventas" component={ProductoVenta} usuarioLogeado={this.state.usuarioLogeado} />
              <PrivateRoute exact path="/usuarios" component={UsuarioList} usuarioLogeado={this.state.usuarioLogeado} />
              <PublicRoute  exact path="/" component={Login} usuarioLogeado={this.state.usuarioLogeado} logear= {this.logear}/>
              <PublicRoute  exact path="/registro" component={Registro} usuarioLogeado={this.state.usuarioLogeado}/>
          </Switch>
        </Container>
     </Router>
   )
 }
}

const PrivateRoute = ({component:Component, usuarioLogeado,  ...rest}) => {
  return(
    <Route {...rest} render={(props) => usuarioLogeado === true ? <Component {...props} /> : <Redirect to={{pathname: '/'}} />}/>
    // <Route {...rest} render={()=> {usuarioLogeado===true? <Component />: <Redirect/>}}/>
  )
}

const PublicRoute = ({component: Component, usuarioLogeado, logear, ...rest }) => {
  return (
    <Route 
      {...rest} render={(props) => usuarioLogeado === false  ? <Component { ...props}  logear= {logear}/>: <Redirect to={{pathname: '/home'}}/>}
    />
  )
}
export default App;
