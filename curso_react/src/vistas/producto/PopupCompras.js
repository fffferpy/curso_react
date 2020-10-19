import React, { Component } from 'react';
import { Row, Col, Form, Button, Table , Badge, OverlayTrigger, Tooltip, Modal } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import firebase, {db} from '../../config/firebase';
import moment from 'moment';
import {confirmAlert} from 'react-confirm-alert'; 
import { ToastContainer, toast } from 'react-toastify';
import Informe from '../../componentes/Informe';
import {MODULES_BECAME_STANDARD_YEAR, imprimirAviso } from './productos';  
import { MdDeleteForever, MdCreate, MdFindInPage} from "react-icons/md";
import NumberFormat from 'react-number-format';



                    //  *************************STATES*********************

class ProductoCompra extends Component {
    state={
        fecha:'',
        productoId:'',
        codigo:'0',
        precioCompra:'0',
        cantidad:0,
        tipoMovimiento: 1,
        estado: 1,            // estado 1 = activo / 0 = anulado
        listaMovimientos: [],
        listaProductos: [],
        metodoDesuscribirse:null,
        productoEditarId: null,
        mostrarFiltro: false,// variable para mostrar y ocultar filtros 
        filtroCodigo:'',
        filtroProductoNombre:'',
        titulo:''
    }


                    // LUEGO DE MONTAR EL COMPONENTE *******************************
    componentDidMount(){

    }

    obtenerProductos =()=>{
        let listaProductosTemporal = []
        db.collection('productos').get()
        .then((productos)=>{productos.forEach((producto)=>{listaProductosTemporal.push({
                    id : producto.id,
                    ...producto.data()      
                    // producto : producto.producto  // ES LO MISMO QUE LA LINEA ANTERIOR
                })
            })
            this.setState({
                listaProductos : listaProductosTemporal
            })
            // console.log(this.state.listaProductos)
        })
        .catch((error)=>{
            alert(error)
        })
    }


                    // RENDERIZA LISTA DE MOVIMMIENTOS *****************************


                        //********************************************CARGAR PARA EDITAR *******************************

 
                    // CAPTURA CARGA DE CAMPOS EN PANTALLA *************************
    capturarTecla=(evento)=>{
        // console.log('evento', evento)
        this.setState({[evento.target.name]:evento.target.value})
        if (evento.target.name== 'productoId'){
            console.log('obtenerCodigoProducto')
            let codigoObtenido = this.obtenerCodigoProducto(evento.target.value)
            console.log(codigoObtenido)
            this.setState({
                codigo : codigoObtenido
            })
        }
    }

    capturarPrecio=(evento, name)=>{
        console.log('evento', evento)
        console.log('name', name)
        this.setState({[name]:evento.floatValue})

    }

       
        // console.log (datosMovimmientos)
    

                    // RENDERIZADO **************************************************************************
    render() {
        return (
                <Modal  show={this.props.propsShowModal} onHide={this.props.funcionCloseModal}  >
                        <Modal.Header style={{ backgroundColor:"#dbdbdb", color:"#000"}} closeButton>
                            <Modal.Title>COMPRAS</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group>
                                                <Form.Label>Fecha</Form.Label>
                                                <Form.Control type="date"  size="sm" name="fecha" value = {this.state.fecha} onChange={this.capturarTecla} />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>                
                                        <Form.Group controlId="exampleForm.ControlSelect1">
                                                <Form.Label>Producto</Form.Label>
                                                {/* <Form.Control as="select"  size="sm"  name="productoId" value = {this.state.productoNombre}  onChange={this.capturarTecla}>
                                                <option key= '01' value = '01'>Seleccione un producto</option>
                                                    {this.renderItems()}
                                                </Form.Control> */}
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>                                            
                                    <Col md={6}>
                                        <Form.Group>
                                                <Form.Label>Código</Form.Label>
                                                <Form.Control type="number"  size="sm"  name="codigo" value = {this.state.codigo} onChange={this.capturarTecla} disabled />
                                            
                                            </Form.Group>
                                    </Col>

                                    <Col md={6}>
                                            <Form.Group>
                                                <Form.Label>Precio Compra</Form.Label>
                                                <NumberFormat style = {{borderColor:'#f3f3f3', backgroundColor:'#fff', width:'150px', borderRadius:"4px"}} 
                                                value={this.state.precioCompra} onValueChange ={(event)=>{this.capturarPrecio(event, "precioCompra" )}} thousandSeparator ={true} prefix={'G$'} />
                                            
                                            </Form.Group>
                                    </Col>
                                </Row>
                                <Row>  
                                    <Col md={6}> 

                                            <Form.Group>
                                                <Form.Label>Cantidad</Form.Label>
                                                <Form.Control type="number"  size="sm" name="cantidad" value = {this.state.cantidad} onChange={this.capturarTecla} />
                                            </Form.Group>                         

                                    </Col>
                                    
                                </Row>
                                            
                            </Form>
                            <Row>
                                <Col>
                                    <Table responsive striped bordered hover size="sm">
                                        <thead>
                                            <th style={{textAlign:"center"}}>Producto</th>
                                            <th style={{textAlign:"center"}}>Accion</th>
                                        </thead>
                                        <tbody>
                                            <tr>
                                            <td>celular con nombre super largo </td>
                                            <td style={{textAlign:"center"}}>precio A</td>
                                            </tr>
                                        </tbody>

                                    </Table>
                                </Col>
                            </Row>    

                        </Modal.Body>
                        <Modal.Footer>
                            <Row>
                                <Col md={12}>
                                    <Button style={{ backgroundColor:'#3b5998', borderColor:'#3b5998', color:'#fff'}} size="sm" onClick={() => {this.guardar()}}>Guardar</Button>{' '}
                                    <Button style={{ backgroundColor:'#dedede', borderColor:'#dedede', color:'#000'}} size="sm"  onClick={this.limpiarCampos}>Limpiar Campos</Button>{' '}
                                    {/* <Button variant = "info" size="sm" onClick={() => {this.props.history.goBack()}}>Volver</Button> */}
                                    </Col>
                            </Row>
                        </Modal.Footer>
                </Modal>
        )
    }
}

export default withRouter(ProductoCompra)