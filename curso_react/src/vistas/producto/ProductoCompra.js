import React, { Component } from 'react';
import { Row, Col, Form, Button, Table } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import firebase, {db} from '../../config/firebase';



class ProductoCompra extends Component {
    state={
        fecha:'',
        producto:'',
        codigo:0,
        precioCompra:0,
        cantidad:0,
        tipoMovimiento: 1,
        listaMovimientos: [],
        metodoDesuscribirse:null
       
    }

    componentDidMount(){
        this.obtenerMovimientos()
    }
    renderListaMovimientos = () => {
        return this.state.listaMovimientos.map((documento) => {
            return (
                // key es un identificador unico
                <tr key={documento.codigo}> 
                    <td>{documento.codigo}</td>
                    <td>{documento.producto}</td>
                    <td>{documento.precioCompra}</td>
                    <td>{documento.cantidad}</td>
                </tr>
            )
        })
    }
    capturarTecla=(evento)=>{
    
        this.setState({[evento.target.name]:evento.target.value})
    }
    guardar=()=>{
        // console.log(this.state)
        let datosMovimmientos = {
            fecha:this.state.fecha,
            producto:this.state.producto,
            codigo:this.state.codigo,
            precioCompra:this.state.precioCompra,
            cantidad:this.state.cantidad,
            tipoMovimiento: 1,
            creado: firebase.firestore.FieldValue.serverTimestamp()
        }
        db.collection('movimientos').add(datosMovimmientos)
        .then(()=>{
            // se ejecuta cuando se inserto con exito
            alert('Insertado correctamente')    
        })
        .catch((error)=>{
            // se ejecuta cuando sucede un error 
            alert(error)
        })
        // console.log (datosMovimmientos)
    }

    obtenerMovimientos = ()=>{
            let listaTemporal = []
            let metodoDesuscribirse = db.collection('movimientos').where('tipoMovimiento','==', 1).orderBy('creado')
            .onSnapshot((snap)=>{
                listaTemporal = []
                snap.forEach((documento)=>{
                    listaTemporal.push(documento.data())
                })
                this.setState({
                    listaMovimientos : listaTemporal,
                    metodoDesuscribirse : metodoDesuscribirse
                })
            },(error)=>{
                alert(error)
                console.log(error)
            })
    }
    componentWillUnmount(){
        this.state.metodoDesuscribirse()
    }
    render() {
        return (
            <>
<Form>
                <Row style={{marginTop:"10px"}}> 
                    <Col><h2>Compras</h2></Col>
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
                  
                    
                    {/* <Col md={4}>
                            <Form.Group>
                                <Form.Label>Producto</Form.Label>
                                <Form.Control type="text" value={this.state.nombreProducto} onChange={(evento)=>{this.capturarTeclaProducto(evento)}} placeholder="Inserte nombre del producto" />
                                {/* <Form.Control type="text" placeholder="Inserte nombre del producto" /> */}

                                {/* <Form.Text className="text-muted">
                                    Campo obligatorio
                                </Form.Text>
                            </Form.Group>
                        </Col>  */}

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
                                <Form.Label>Precio Compra</Form.Label>
                                <Form.Control type="number" name="precioCompra" onChange={this.capturarTecla} />
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
                                            <th>Cantidad</th>
                                            {/* <th>Entradas</th>
                                            <th>Salidas</th>
                                            <th>Stock</th> */}
                                            {/* <th>Acciones</th> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.renderListaMovimientos()}                                       
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

export default withRouter(ProductoCompra)