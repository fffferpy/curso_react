import React, { Component } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';


class ProductoForm extends Component {
    state={
        nombreProducto:''
        
    }
    render() {
        return (
            <>
                <Row style={{marginTop:"10px"}}> 
                    <Col><h2>Nuevo Producto</h2></Col>
                </Row>
                <Row>
                    <Col xs={4} md={6}>
                        <Form>
                            <Form.Group>
                                <Form.Label>Producto</Form.Label>
                                <Form.Control type="text" placeholder="Inserte nombre del producto" />
                                {/* <Form.Text className="text-muted">
                                    Campo obligatorio
                                </Form.Text> */}
                            </Form.Group>
                            
                            <Form.Group>
                                <Form.Label>Precio Compra</Form.Label>
                                <Form.Control type="number"  />
                                {/* <Form.Text className="text-muted">
                                    Campo obligatorio
                                </Form.Text> */}
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Precio Venta</Form.Label>
                                <Form.Control type="number"  />
                                {/* <Form.Text className="text-muted">
                                    Campo obligatorio
                                </Form.Text> */}
                            </Form.Group>
                            
                        </Form>
                    
                    </Col>
                    
                </Row>
                <Row>
                    <Col md={6}>
                        <Button variant="primary">Guardar</Button>{' '}
                        <Button variant="danger" onClick={() => {this.props.history.goBack()}}>Volver</Button>
                    </Col>
                </Row>
                
            </>
        )
    }
}

export default withRouter(ProductoForm)