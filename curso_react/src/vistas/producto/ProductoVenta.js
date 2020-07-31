import React, { Component } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';


class ProductoVenta extends Component {
    state={
        nombreProducto:''
        
    }
    capturarTeclaProducto=(evento)=>{
        console.log(evento.target.value)
    }
    render() {
        return (
            <>
                <Row style={{marginTop:"10px"}}> 
                    <Col><h2>Ventas</h2></Col>
                </Row>
                <Row>
                    <Col xs={4} md={6}>
                        <Form>
                            <Form.Group>
                                <Form.Label>Producto</Form.Label>
                                <Form.Control type="text" value={this.state.nombreProducto} onChange={(evento)=>{this.capturarTeclaProducto(evento)}} placeholder="Inserte nombre del producto" />
                                {/* <Form.Control type="text" placeholder="Inserte nombre del producto" /> */}

                                {/* <Form.Text className="text-muted">
                                    Campo obligatorio
                                </Form.Text> */}
                            </Form.Group>
                            
                            <Form.Group>
                                <Form.Label>Código Producto</Form.Label>
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

                            <Form.Group>
                                <Form.Label>Cantidad</Form.Label>
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

export default withRouter(ProductoVenta)