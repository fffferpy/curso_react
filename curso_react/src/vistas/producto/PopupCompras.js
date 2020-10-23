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

class PopupCompra extends Component {
   componentDidMount (){
       console.log(this.props.listaProductos)
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
                                                <Form.Control type="date"  size="sm" name="fecha" value = {this.props.atributos.fecha} onChange={this.props.funcionCapturarTecla} />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>  
                                        <Form.Group>
                                                <Form.Label>Producto</Form.Label>
                                                <Form.Control type="text"  size="sm"  name="productoNombre" value = {this.props.atributos.productoNombre} onChange={this.props.funcionCapturarTecla} />
                                        </Form.Group>
              
                                    </Col>
                                </Row>
                                <Row>                                            
                                    <Col md={6}>
                                        <Form.Group>
                                                <Form.Label>Código</Form.Label>
                                                <Form.Control type="number"  size="sm"  name="codigo" value = {this.props.atributos.codigo} onChange={this.props.funcionCapturarTecla} disabled />
                                            
                                        </Form.Group>
                                    </Col>

                                    <Col md={6}>
                                            <Form.Group>
                                                <Form.Label>Precio Compra</Form.Label>
                                                <NumberFormat style = {{borderColor:'#f3f3f3', backgroundColor:'#fff', width:'150px', borderRadius:"4px"}} 
                                                value={this.props.atributos.precioCompra} onValueChange ={(event)=>{this.props.funcionCapturarPrecio(event, "precioCompra" )}} thousandSeparator ={true} prefix={'G$'} />
                                            
                                            </Form.Group>
                                    </Col>
                                </Row>
                                <Row>  
                                    <Col md={6}> 

                                            <Form.Group>
                                                <Form.Label>Cantidad</Form.Label>
                                                <Form.Control type="number"  size="sm" name="cantidad" value = {this.props.atributos.cantidad} onChange={this.props.funcionCapturarTecla} />
                                            </Form.Group>                         

                                    </Col>
                                    
                                </Row>
                                            
                            </Form>
                            <Row>
                            <Col md={3}></Col>
                            <Col md={3}></Col>
                                <Col md={6}>
                                    <Button style={{ backgroundColor:'#3b5998', borderColor:'#3b5998', color:'#fff'}} size="sm" onClick={() => {this.props.funcionGuardar()}}>Guardar</Button>{' '}
                                    <Button style={{ backgroundColor:'#dedede', borderColor:'#dedede', color:'#000'}} size="sm"  onClick={this.props.funcionLimpiarCampos}>Limpiar Campos</Button>{' '}
                                </Col>
                            </Row>
                            <br/>
                            <Row>
                                <Col>
                                    <Table responsive striped bordered hover size="sm">
                                        <thead>
                                            <th style={{textAlign:"center"}}>Producto</th>
                                            <th style={{textAlign:"center"}}>Accion</th>
                                        </thead>
                                        <tbody>
                                           {this.props.funcionRenderListaProductos()}
                                        </tbody>

                                    </Table>
                                </Col>
                            </Row>    

                        </Modal.Body>
                        <Modal.Footer>
                           
                        </Modal.Footer>
                </Modal>
        )
    }
}

export default withRouter(PopupCompra)