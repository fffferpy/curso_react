import React, { Component } from 'react';
import { Row, Col, Button, Table } from 'react-bootstrap';

class ProductoList extends Component {
    creaNuevoProducto = () => {
        // console.log('Nuevo producto');
        // console.log('Props del componente ProductoList: ', this.props)
        this.props.history.push('/productos/nuevo')
        
    }
    volver=()=>{
        this.props.history.goBack()
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
                                            <th>Código</th>
                                            <th>Producto</th>
                                            <th>Precio Compra</th>
                                            <th>Precio Venta</th>
                                            <th>Entradas</th>
                                            <th>Salidas</th>
                                            <th>Stock</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>champ PLAT</td>
                                            <td>45.000</td>
                                            <td>70.000</td>
                                            <td>20</td>
                                            <td>15</td>
                                            <td>5</td>
                                            <td><a href='#' >Editar</a></td>
                                        </tr>
                                       
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