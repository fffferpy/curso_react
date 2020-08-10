import React, { Component } from 'react';
import { Row, Col, Form, Button, Table } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import firebase, {db} from '../../config/firebase';
import moment from 'moment';


                    //  *************************STATES*********************

class ProductoForm extends Component {
    state={
        producto:'',
        // codigo:0,
        precioCompra:0,
        precioVenta:0,
        listaMovimientos: [],
        metodoDesuscribirse:null,
        // creado:''
       
    }

                    //********************************************LUEGO DE MONTAR EL COMPONENTE *******************************
    componentDidMount(){
        this.obtenerMovimientos()
    }


                    //*********************************************RENDERIZA LISTA DE MOVIMMIENTOS *****************************
    renderListaMovimientos = () => {
        return this.state.listaMovimientos.map((documento) => {
            return (
                // key es un identificador unico
                <tr key={documento.producto}> 
                    <td>{documento.producto}</td>
                    <td>{documento.precioCompra}</td>
                    <td>{documento.precioVenta}</td>
                    <td>{documento.creado}</td>
                </tr>
            )
        })
    }
                    // *****************************************CAPTURA CARGA DE CAMPOS EN PANTALLA *************************
    capturarTecla=(evento)=>{
        this.setState({[evento.target.name]:evento.target.value})
    }


                    //**************************************************GRABAR DATOS EN DB ***************************************
    guardar=()=>{
        // console.log(this.state)
        let datosMovimmientos = {
            producto:this.state.producto,
            precioCompra:this.state.precioCompra,
            precioVenta:this.state.precioVenta,
            creado: firebase.firestore.FieldValue.serverTimestamp()
        }
        db.collection('productos').add(datosMovimmientos)
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


                    //******************************CARGA MOVIMIENTOS EN LISTA TEMPORAL *************************************************
    obtenerMovimientos = ()=>{
            let listaTemporal = []
            let metodoDesuscribirse = db.collection('productos').orderBy('creado')
            .onSnapshot((snap)=>{
                listaTemporal = []
                snap.forEach((documento)=>{
                    let producto = {
                        producto : documento.data().producto,
                        precioCompra : documento.data().precioCompra,
                        precioVenta : documento.data().precioVenta,
                        creado: moment.unix(documento.data().creado.seconds).format("DD/MM/YYYY")
                    }
                    listaTemporal.push(producto)
                    console.log (producto)
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

                    // ************************************ANTES DE DESMONTAR EL COMPONENTE******************************************************
    componentWillUnmount(){
        this.state.metodoDesuscribirse()
    }

                    // ************************************RENDERIZADO **************************************************************************
    render() {
        return (
            // *************************************** ESTO ES IGUAL A <div> *********************
            <>      
                <Form>
                    <Row style={{marginTop:"10px"}}> 
                        <Col><h2>PRODUCTOS</h2></Col>
                    </Row>
                    <Row>
                    
                        <Col md={4}>
                                    <Form.Group>
                                        <Form.Label>Producto</Form.Label>
                                        <Form.Control type="text" name="producto" onChange={this.capturarTecla} />
                                    
                                    </Form.Group>
                        </Col> 
                        <Col md={2}>
                                    <Form.Group>
                                        <Form.Label>Precio Compra</Form.Label>
                                        <Form.Control type="number" name="precioCompra" onChange={this.capturarTecla} />
                                    
                                    </Form.Group>
                        </Col>
                        <Col md={2}>
                                    <Form.Group>
                                        <Form.Label>Precio precioVenta</Form.Label>
                                        <Form.Control type="number" name="precioVenta" onChange={this.capturarTecla} />
                                    
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
                <br/>
                {/* //  ********************************************TABLA****************************************** */}
                <Row>
                    <Col>
                            <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th>Producto</th>
                                                <th>Precio Compra</th>
                                                <th>Precio Venta</th>
                                                <th>Creado</th>

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

export default withRouter(ProductoForm)