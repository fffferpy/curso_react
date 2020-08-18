import React, { Component } from 'react';
import { Row, Col, Form, Button, Table } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import firebase, {db} from '../../config/firebase';
import moment from 'moment';

// *********************************COMENTARIO ************************
                    //  *************************STATES*********************

class ProductoCompra extends Component {
    state={
        fecha:'',
        producto:'champion',
        codigo:0,
        precioCompra:0,
        cantidad:0,
        tipoMovimiento: 1,
        listaMovimientos: [],
        metodoDesuscribirse:null,
        productoEditarId: null
    }
    limpiarCampos = () => {
        this.setState({
            fecha:'',
            producto:'champion',
            codigo:0,
            precioCompra:0,
            cantidad:0,
            tipoMovimiento: 1,
            metodoDesuscribirse:null,
            productoEditarId: null
        })
    
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
                    <tr key={documento.id}> 
                    <td>{documento.codigo}</td>
                    <td>{documento.producto}</td>
                    <td>{documento.precioCompra}</td>
                    <td>{documento.cantidad}</td>
                    <td>{documento.fecha}</td>
                    <td> <a href = '#' onClick ={()=>this.cargarForm(documento.id)}> Editar </a> </td>

                </tr>
            )
        })
    }
                        //********************************************CARGAR PARA EDITAR *******************************

    cargarForm =(documentoId)=>{
         console.log (documentoId)
         db.collection('movimientos').doc(`${documentoId}`).get()
         .then((snap)=>{
           console.log(snap.data())
           this.setState({
             fecha : snap.data().fecha,
             codigo : snap.data().codigo,  
             producto: snap.data().producto,
             precioCompra: snap.data().precioCompra,
             cantidad: snap.data().cantidad,
             // productoEditarId : snap.id   *******esto igual funciona
             productoEditarId : documentoId
         })
         console.log(this.state)
          })
         .catch((error)=>{
             alert(error)
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
            precioCompra:this.state.precioCompra,
            cantidad:this.state.cantidad,
            tipoMovimiento: 1,
        }
        if (this.state.productoEditarId){       // PARA EDITAR 
            console.log(this.state.productoEditarId)
            db.collection('movimientos').doc(`${this.state.productoEditarId}`).update(datosMovimmientos)
            //    db.collection("movimientos").doc(`${this.state.productoEditarId}`).update({
            .then(()=>{
                // se ejecuta cuando se inserto con exito
                alert('Editado correctamente')  
                this.limpiarCampos()  
            })
            .catch((error)=>{
                // se ejecuta cuando sucede un error 
                alert(error)
                console.log(error)
            })    
        } else{                                 // PARA GUARDAR
     
            db.collection('movimientos').add({
                ...datosMovimmientos, 
                // creado: firebase.firestore.FieldValue.serverTimestamp()
                creado : moment().unix()
            })
            .then(()=>{
                // se ejecuta cuando se inserto con exito
                alert('Insertado correctamente')  
                this.limpiarCampos()  
            })
            .catch((error)=>{
                // se ejecuta cuando sucede un error 
                alert(error)
            })
        }
        
        // console.log (datosMovimmientos)
    }


                    // CARGA MOVIMIENTOS EN LISTA TEMPORAL *************************************************
    obtenerMovimientos = ()=>{
            let listaTemporal = []
            let metodoDesuscribirse = db.collection('movimientos').where('tipoMovimiento','==', 1).orderBy('creado')
            .onSnapshot((snap)=>{
                listaTemporal = []
                snap.forEach((documento)=>{
                    listaTemporal.push({
                        id : documento.id,
                        creadoFormateado : moment.unix(documento.data().creado).format('DD-MM-YYYY'), 
                        ...documento.data()
                    })
                })
                console.log(listaTemporal)
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
        if (this.state.metodoDesuscribirse){
            this.state.metodoDesuscribirse()
        }
    }

                    // RENDERIZADO **************************************************************************
    render() {
        return (
            // *************************************** ESTO NO ME ACUERDO QUE MIERDA ERA *********************
            <>      
            <Form>
                <Row style={{marginTop:"10px"}}> 
                    <Col><h2>COMPRAS</h2></Col>
                </Row>
                <Row>
                    <Col md={3}>
                        <Form.Group>
                                <Form.Label>Fecha</Form.Label>
                                <Form.Control type="date" name="fecha" value = {this.state.fecha} onChange={this.capturarTecla} />
                                {/* <Form.Text className="text-muted">
                                    Campo obligatorio
                                </Form.Text> */}
                         </Form.Group>
                    </Col>
                    <Col>                
                      {/* // *********AQUI DEBERIA TRAER DE LA COLLECTION PRODUCTOS ************************/}
                        <Form.Group controlId="exampleForm.ControlSelect1">
                                <Form.Label>Producto</Form.Label>
                                <Form.Control as="select" name="producto" value = {this.state.producto} onChange={this.capturarTecla}>
                                <option value = 'champion'>champion</option>
                                <option value = 'zapatilla'> zapatilla</option>
                                <option value = 'media'>media</option>
                                <option value = 'Crocs adultos 40-45 Hombres'> Crocs adultos 40-45 Hombres</option>
                                </Form.Control>
                        </Form.Group>
                    </Col>
                                                            
                    <Col md={1}>
                           <Form.Group>
                                <Form.Label>Código</Form.Label>
                                <Form.Control type="number" name="codigo" value = {this.state.codigo} onChange={this.capturarTecla} />
                               
                            </Form.Group>
                    </Col>

                    <Col md={2}>
                             <Form.Group>
                                <Form.Label>Precio Compra</Form.Label>
                                <Form.Control type="number" name="precioCompra" value = {this.state.precioCompra} onChange={this.capturarTecla} />
                              
                            </Form.Group>
                    </Col>
                    <Col md={2}> 

                            <Form.Group>
                                <Form.Label>Cantidad</Form.Label>
                                <Form.Control type="number" name="cantidad" value = {this.state.cantidad} onChange={this.capturarTecla} />
                                {/* <Form.Text className="text-muted">
                                    Campo obligatorio
                                </Form.Text> */}
                            </Form.Group>                         

                    </Col>
                    
                </Row>
                            
            </Form>

            {/* //  *******************************************BOTONES***************************************** */}
            <Row>
                    <Col md={6}>
                    <Button variant="primary"onClick={() => {this.guardar()}}>Guardar</Button>{' '}
                    <Button variant="warning"onClick={() => {this.limpiarCampos()}}>Limpiar Cammpos</Button>{' '}
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
                                            <th>Precio Compra</th>
                                            <th>Cantidad</th>
                                            <th>Fecha</th>
                                            <th>Acciones</th>
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

export default withRouter(ProductoCompra)