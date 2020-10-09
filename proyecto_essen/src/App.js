import React from 'react';
import logo from './logo.svg';
import './App.css';
import ProductoModal from './components/products/ProductoModal'

class App extends React.Component{
state = {
  showModal: false
}
openModal=()=>{
this.setState({
  showModal: true
})
}
closeModal=()=>{
  this.setState({
    showModal: false
  }) 
}
guardar =()=>{
  console.log('Registro guardado')
}
render (){
  return (
    <div className="fer">
      <button className="btn btn-primary" onClick={this.openModal} >ABRIR MODAL</button>
      <ProductoModal propsShowModal={this.state.showModal} funcionCloseModal={this.closeModal} funcionGuardar={this.guardar}/>
    </div>
  );
}
}


export default App;
