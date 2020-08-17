import React, { Component } from 'react';
import { Row, Col, Form, Button, Table } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import firebase, {db} from '../../config/firebase';


                    //  *************************STATES*********************

class ProductoVenta extends Component {
    state={
        fecha:'',
        producto:'',
        codigo:0,
        precioVenta:0,
        cantidad:0,
        tipoMovimiento: 2,
        listaMovimientos: [],
        metodoDesuscribirse:null
       
    }

                    // LUEGO DE MONTAR EL COMPONENTE *******************************
    componentDidMount(){
        this.obtenerMovimientos()
    }


                    // RENDERIZA LISTA DE MOVIMMIENTOS *****************************
    renderListaMovimientos = () => {
        return this.state.listaMovimientos.map((documento) => {
            return (
                // key es un identificador unico
                <tr key={documento.codigo}> 
                    <td>{documento.codigo}</td>
                    <td>{documento.producto}</td>
                    <td>{documento.precioVenta}</td>
                    <td>{documento.cantidad}</td>
                </tr>
            )
        })
    }
                    // CAPTURA CARGA DE CAMPOS EN PANTALLA *************************
    capturarTecla=(evento)=>{
        this.setState({[evento.target.name]:evento.target.value})
    }


                    // GRABAR DATOS EN DB ***************************************
    guardar=()=>{
        // console.log(this.state)
        let datosMovimmientos = {
            fecha:this.state.fecha,
            producto:this.state.producto,
            codigo:this.state.codigo,
            precioVenta:this.state.precioVenta,
            cantidad:this.state.cantidad,
            tipoMovimiento: 2,
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
        console.log (datosMovimmientos)
    }


                    // CARGA MOVIMIENTOS EN LISTA TEMPORAL *************************************************
    obtenerMovimientos = ()=>{
            let listaTemporal = []
            let metodoDesuscribirse = db.collection('movimientos').where('tipoMovimiento','==', 2).orderBy('creado')
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

                    // ANTES DE DESMONTAR EL COMPONENTE******************************************************
    componentWillUnmount(){
        this.state.metodoDesuscribirse()
    }

                    // RENDERIZADO **************************************************************************
    render() {
        return (
            // *************************************** ESTO NO ME ACUERDO QUE MIERDA ERA *********************
            <>      
            <Form>
                <Row style={{marginTop:"10px"}}> 
                    <Col><h2>VENTAS</h2></Col>
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
                    <Col>                
                      {/* // *********AQUI DEBERIA TRAER DE LA COLLECTION PRODUCTOS ************************/}
                        <Form.Group controlId="exampleForm.ControlSelect1">
                                <Form.Label>Producto</Form.Label>
                                <Form.Control as="select" name="producto" onChange={this.capturarTecla}>
                                <option>champion</option>
                                <option>zapatilla</option>
                                <option>media</option>
                                <option>Crocs adultos 40-45 Hombres</option>
                                </Form.Control>
                        </Form.Group>
                    </Col>
                                                            
                    <Col md={1}>
                           <Form.Group>
                                <Form.Label>Código</Form.Label>
                                <Form.Control type="number" name="codigo" onChange={this.capturarTecla} />
                               
                            </Form.Group>
                    </Col>

                    <Col md={2}>
                             <Form.Group>
                                <Form.Label>Precio Venta</Form.Label>
                                <Form.Control type="number" name="precioVenta" onChange={this.capturarTecla} />
                              
                            </Form.Group>
                    </Col>
                    <Col md={2}> 

                        <Form.Group>
                            <Form.Label>Cantidad</Form.Label>
                            <Form.Control type="number" name="cantidad" onChange={this.capturarTecla} />
                            
                        </Form.Group>                         

                    </Col>
                </Row>
                            
            </Form>

            {/* //  *******************************************BOTONES***************************************** */}
            <Row>
                    <Col md={6}>
                        <Button variant="primary"onClick={() => {this.guardar()}}>Guardar</Button>{' '}
                        <Button variant="danger" onClick={() => {this.props.history.goBack()}}>Volver</Button>
                    </Col>
            </Row>
            {/* //  ********************************************TABLA****************************************** */}
            <br/>
            <Row>
                <Col>
                        <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>Código</th>
                                            <th>Producto</th>
                                            <th>Precio Venta</th>
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
              
               
                
            </>
        )
    }
}

export default withRouter(ProductoVenta)