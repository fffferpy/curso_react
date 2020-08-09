import React, { Component } from 'react';
import { Row, Col, Form, Button, Table } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';


class ProductoVenta extends Component {
    state={
        fecha:'',
        producto:'',
        codigo:0,
        precioVenta:0,
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
            <Form>
                <Row style={{marginTop:"10px"}}> 
                    <Col><h2>Ventas</h2></Col>
                </Row>
                <Row>
                    <Col md={3}>
                            <Form.Group>
                                    <Form.Label>Fecha</Form.Label>
                                    <Form.Control type="date" name="fecha" onChange={this.capturarTecla} />
                                    {/* <Form.Text className="text-muted">
                                        Campo obligatorio
                                    </Form.Text> */}
                            </Form.Group>
                    </Col>
                            <Form.Group controlId="exampleForm.ControlSelect1">
                                <Form.Label>Producto</Form.Label>
                                <Form.Control as="select" name="producto" onChange={this.capturarTecla}>
                                <option>champion</option>
                                <option>zapatilla</option>
                                <option>media</option>
                                <option>Crocs adultos 40-45 Hombres</option>
                               
                                </Form.Control>
                            </Form.Group>
                    <Col md={1}>
                           <Form.Group>
                                <Form.Label>Código</Form.Label>
                                <Form.Control type="number" name="codigo" onChange={this.capturarTecla} />
                                {/* <Form.Text className="text-muted">
                                    Campo obligatorio
                                </Form.Text> */}
                            </Form.Group>
                    </Col>

                    <Col md={2}>
                             <Form.Group>
                                <Form.Label>Precio Venta</Form.Label>
                                <Form.Control type="number" name="precioVenta" onChange={this.capturarTecla} />
                                {/* <Form.Text className="text-muted">
                                    Campo obligatorio
                                </Form.Text> */}
                            </Form.Group>
                    </Col>
                    <Col md={2}> 

                        <Form.Group>
                            <Form.Label>Cantidad</Form.Label>
                            <Form.Control type="number" name="cantidad" onChange={this.capturarTecla} />
                            {/* <Form.Text className="text-muted">
                                Campo obligatorio
                            </Form.Text> */}
                        </Form.Group>                         

                    </Col>
                </Row>
                            
            </Form>
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
                                            <td><a href='#' >Anular</a></td>
                                        </tr>
                                       
                                    </tbody>
                        </Table>
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

export default withRouter(ProductoVenta)