import React, { Component } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';


class ProductoForm extends Component {
    state={
        nombreProducto:'',
        precioCompra:0,
        precioVenta:0   
    }
    capturarTecla=(evento)=>{
        // console.log(evento.target.value)
        // console.log(evento.target.name)
        // this.setState({nombreProducto:evento.target.value})
        this.setState({[evento.target.name]:evento.target.value})
    }
    guardar=()=>{
        console.log(this.state)

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
                                {/* <Form.Control type="text" value={this.state.nombreProducto} onChange={(evento)=>{this.capturarTeclaProducto(evento)}} placeholder="Inserte nombre del producto" /> */}
                                <Form.Control type="text" name="nombreProducto" onChange={this.capturarTecla} placeholder="Inserte nombre del producto" />

                                {/* <Form.Text className="text-muted">
                                    Campo obligatorio
                                </Form.Text> */}
                            </Form.Group>
                            
                            <Form.Group>
                                <Form.Label>Precio Compra</Form.Label>
                                <Form.Control type="number" name="precioCompra" onChange={this.capturarTecla}/>
                                {/* <Form.Text className="text-muted">
                                    Campo obligatorio
                                </Form.Text> */}
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Precio Venta</Form.Label>
                                <Form.Control type="number" name="precioVenta" onChange={this.capturarTecla} />
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

export default withRouter(ProductoForm)