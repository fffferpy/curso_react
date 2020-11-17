import React, { Component } from 'react';
import { Row, Col, Form, Button, Table } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import firebase, {db} from '../../config/firebase';
import moment from 'moment';

class ClienteAbm extends Component {
    state={
        clienteNombre:'',
        clienteCodigo:0,
        
    }

    capturarTecla=(evento)=>{
        this.setState({[evento.target.name]:evento.target.value})
    }

    render() {
        return (
            <div>
                 <Form>
                    {/* <Row style={{marginRight:"0.1%",backgroundColor:"#dbdbdb", color:"#000",marginLeft:"0.1%", paddingTop:5, paddingLeft:"40%"}}>  */}
                    <Row style = {{textAlign : "center", backgroundColor:"#dbdbdb", paddingTop:5}}>
                         <Col md={12} sm = {12} xs = {12} ><h4>CLIENTES</h4></Col>
                   
                    </Row>

                    <Row>
                    
                        <Col md={6} sm = {12} xs = {12}>
                            <Form.Group>
                                <Form.Label>NOMBRE</Form.Label>
                                <Form.Control type="text" size="sm"  name="clienteNombre" value = {this.state.clienteNombre} onChange={this.capturarTecla} />
                            </Form.Group>                        
                        </Col> 
                        <Col md={4} sm = {12} xs = {12}>
                            <Form.Group>
                                <Form.Label>CODIGO</Form.Label>
                                <Form.Control type="text" size="sm"  name="clienteCodigo" value = {this.state.clienteCodigo} onChange={this.capturarTecla} />
                            </Form.Group>                        
                        </Col>
                        {/* <Col md={6} sm = {2} xs = {4}>
                            <Button style ={{marginTop : "6%"}}variant = "info" size="sm" onClick={() => {this.props.history.goBack()}}>Volver</Button>

                        </Col> */}
                    </Row>
                    <Row>
                        <Col>
                                <Table striped bordered hover >
                                            <thead>
                                                <tr>
                                                    {/* <th>Producto</th> */}
                                                    {/* <th>Producto  {this.state.mostrarFiltro==true?<Form.Control type="text"  name="filtroProducto" value = {this.state.filtroProducto} onChange={this.capturarTecla} />:null}</th> */}
                                                    {/* <th>Precio Compra</th> */}
                                                    <th>Precio Venta</th>
                                                    {/* <th>Creado</th> */}
                                                    <th>Saldo</th>
                                                    {/* <th>Codigo</th> */}
                                                    {/* <th>Entradas</th>
                                                    <th>Salidas</th>
                                                    <th>Stock</th> */}
                                                    {/* <th>Acciones</th> */}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {/* {this.renderListaMovimientos()}                                        */}
                                            </tbody>
                                </Table>
                        </Col>
                    </Row>
                                
                </Form>
            </div>
        )
    }
}
export default  withRouter(ClienteAbm)
