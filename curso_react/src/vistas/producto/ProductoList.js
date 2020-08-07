import React, { Component } from 'react';
import { Row, Col, Button, Table } from 'react-bootstrap';
import {db} from '../../config/firebase';


class ProductoList extends Component {
    state={
        listaProductos : [

        ]
    }
    creaNuevoProducto = () => {
        // console.log('Nuevo producto');
        // console.log('Props del componente ProductoList: ', this.props)
        this.props.history.push('/productos/nuevo')
        
    }
    volver=()=>{
        this.props.history.goBack()
    }
    componentDidMount(){
        let listaTemporal = []
        db.collection('productos').get()
        .then((snap)=>{
            snap.forEach((documento)=>{
                // console.log(documento.data())
                listaTemporal.push(documento.data())
            })
            this.setState({
                listaProductos : listaTemporal
            })
            
         })
        .catch((error)=>{
            alert(error)
        })
    }
    renderItems = ()=> {
        return this.state.listaProductos.map((documento)=>{
            return(
                <tr>
                    <td>{documento.nombreProducto}</td>
                    <td>{documento.precioCompra}</td>
                    <td>{documento.precioVenta}</td>
                    
                </tr>
            )
        })
    }
    render() {
        return (    
            <div>
               <Row style={{marginTop:"10px"}}> 
                   <Col><h2>Productos</h2></Col>
               </Row>
               <Row>
                   <Col>
                        <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            {/* <th>Código</th> */}
                                            <th>Producto</th>
                                            <th>Precio Compra</th>
                                            <th>Precio Venta</th>
                                            {/* <th>Entradas</th>
                                            <th>Salidas</th>
                                            <th>Stock</th> */}
                                            {/* <th>Status</th>
                                            <th>Acciones</th> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                            {this.renderItems()}
                                       
                                    </tbody>
                                </Table>
                        </Col>
               </Row>
               <Row>
                   <Col>
                        <Button variant="primary" onClick={this.creaNuevoProducto} >Agregar Producto</Button> {' '}
                        <Button variant="danger" onClick={this.volver} >Volver</Button>
                   </Col>
               </Row>
            </div>

        )
                
            
        
    }
}


export default ProductoList;