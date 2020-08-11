import React, { Component } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import {db} from '../../config/firebase';


class ProductoFormbk extends Component {
    state={
        producto:'',
        precioCompra:0,
        precioVenta:0   
    }
    componentDidMount (){
        this.recuperarProducto(this.props.match.params.productoId)
        // console.log(this.props.match.params.productoId)
    }
    recuperarProducto=(productoId)=>{
        db.collection('productos').doc(`${productoId}`).get()
        .then((snap)=>{
          console.log(snap.data())
          this.setState({
            producto: snap.data().producto,
            precioCompra: snap.data().precioCompra,
            precioVenta: snap.data().precioVenta 
          })
         })
        .catch((error)=>{
            alert(error)
        })
    }
    capturarTecla=(evento)=>{
        // console.log(evento.target.value)
        // console.log(evento.target.name)
        // this.setState({nombreProducto:evento.target.value})
        this.setState({[evento.target.name]:evento.target.value})
    }
    guardar=()=>{
        // console.log(this.state)
        if (this.props.match.params.productoId){
            // **************PARA EDITAR********************
            db.collection('productos').doc(`${this.props.match.params.productoId}`).update(this.state)
            .then(()=>{
                alert('Producto editado correctamente')
                // this.props.history.goBack()
                this.props.history.push('/productos')
            })
            .catch((error)=>{
                alert(error)
            })
        } else {
            // **************PARA GUARDAR  ********************
            db.collection('productos').add(this.state)
            .then(()=>{
                alert('Producto insertado correctamente')
                // this.props.history.goBack()
                this.props.history.push('/productos')
            })
            .catch((error)=>{
                alert(error)
            })
        }
       

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
                                <Form.Control type="text" name="producto" value = {this.state.producto} onChange={this.capturarTecla} placeholder="Inserte nombre del producto" />

                                {/* <Form.Text className="text-muted">
                                    Campo obligatorio
                                </Form.Text> */}
                            </Form.Group>
                            
                            <Form.Group>
                                <Form.Label>Precio Compra</Form.Label>
                                <Form.Control type="number" name="precioCompra" value = {this.state.precioCompra} onChange={this.capturarTecla}/>
                                {/* <Form.Text className="text-muted">
                                    Campo obligatorio
                                </Form.Text> */}
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Precio Venta</Form.Label>
                                <Form.Control type="number" name="precioVenta" value = {this.state.precioVenta} onChange={this.capturarTecla} />
                                {/* <Form.Text className="text-muted">
                                    Campo obligatorio
                                </Form.Text> */}
                            </Form.Group>
                            
                        </Form>
                    
                    </Col>
                    
                </Row>
                <Row>
                    <Col md={6}>
                        {/* <Button variant="primary"onClick={() => {this.guardar()}}>Guardar</Button>{' '} */}
                        <Button variant="primary"onClick={this.guardar}>Guardar</Button>{' '}
                        <Button variant="danger" onClick={() => {this.props.history.goBack()}}>Volver</Button>
                    </Col>
                </Row>
                
            </>
        )
    }
}

export default withRouter(ProductoFormbk)