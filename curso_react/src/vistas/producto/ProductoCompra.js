import React, { Component } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';


class ProductoCompra extends Component {
    state={
        fecha:'',
        producto:'',
        codigo:0,
        precioCompra:0,
        cantidad:0
       
    }
    capturarTecla=(evento)=>{
    
        this.setState({[evento.target.name]:evento.target.value})
    }
    guardar=()=>{
        console.log(this.state)

    }
  
    
    render() {
        return (
            <>
                <Row style={{marginTop:"10px"}}> 
                    <Col><h2>Compras</h2></Col>
                </Row>
                <Row>
                    <Col xs={4} md={6}>
                        <Form>
                        <Form.Group>
                                <Form.Label>Fecha</Form.Label>
                                <Form.Control type="date" name="fecha" onChange={this.capturarTecla} />
                                {/* <Form.Text className="text-muted">
                                    Campo obligatorio
                                </Form.Text> */}
                            </Form.Group>

                            <Form.Group controlId="exampleForm.ControlSelect1">
                                <Form.Label>Producto</Form.Label>
                                <Form.Control as="select" name="producto" onChange={this.capturarTecla}>
                                <option>champion</option>
                                <option>zapatilla</option>
                                <option>media</option>
                               
                                </Form.Control>
                            </Form.Group>
                            
                            <Form.Group>
                                {/* <Form.Label>Código Producto</Form.Label> */}
                                <Form.Control type="number" name = "producto" onChange={this.capturarTecla} placeholder="Código Producto" />
                                {/* <Form.Text className="text-muted">
                                    Campo obligatorio
                                </Form.Text> */}
                            </Form.Group>

                            <Form.Group>
                                {/* <Form.Label>Precio Compra</Form.Label> */}
                                <Form.Control type="number" name ="precioCompra" onChange={this.capturarTecla} placeholder="Precio Compra" />
                                {/* <Form.Text className="text-muted">
                                    Campo obligatorio
                                </Form.Text> */}
                            </Form.Group>

                            <Form.Group>
                                {/* <Form.Label>Cantidad</Form.Label> */}
                                <Form.Control type="number" name = "cantidad" onChange={this.capturarTecla} placeholder="Cantidad" />
                                {/* <Form.Text className="text-muted">
                                    Campo obligatorio
                                </Form.Text> */}
                            </Form.Group>                         
                        </Form>
                    
                    </Col>
                    
                </Row>
                <Row>
                    <Col md={6}>
                        <Button variant="primary"onClick={() => {this.guardar()}}>Guardar</Button>{' '}
                        <Button variant="danger" onClick={() => {this.props.history.goBack()}}>Volver</Button>
                    </Col>
                </Row>
                
            </>
        )
    }
}

export default withRouter(ProductoCompra)