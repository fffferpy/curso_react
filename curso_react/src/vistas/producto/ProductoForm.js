import React, { Component } from 'react';
import { Row, Col, Form, Button, Table } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import firebase, {db} from '../../config/firebase';
import moment from 'moment';
import { confirmAlert } from 'react-confirm-alert';
import Informe from '../../componentes/Informe'


                    //  *************************STATES*********************

class ProductoForm extends Component {
    state={
        producto:'',
        codigo:0,
        precioCompra:0,
        precioVenta:0,
        listaMovimientos: [],
        metodoDesuscribirse:null,
        productoEditarId: null
       
    }
    confirmarAccion = (productoId) => {
        confirmAlert({
          title: 'Accion borrar',
          message: 'Esta seguro?.',
          buttons: [
            {
              label: 'Si',
              onClick: () => this.borrarProducto(productoId)
            },
            {
              label: 'No',
            //   onClick: () => alert('Click No')
            }
          ]
        });
      };

                    //********************************************LUEGO DE MONTAR EL COMPONENTE *******************************
    componentDidMount(){
        this.obtenerProducto()
    }
                    //********************************************CARGAR PARA EDITAR *******************************

    cargarForm =(productoId)=>{
        console.log (productoId)
        db.collection('productos').doc(`${productoId}`).get()
        .then((snap)=>{
          console.log(snap.data())
          this.setState({
            producto: snap.data().producto,
            precioCompra: snap.data().precioCompra,
            precioVenta: snap.data().precioVenta,
            codigo : snap.data().codigo,
            productoEditarId : snap.id
          })
         })
        .catch((error)=>{
            alert(error)
        })
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
                    <td>{documento.codigo}</td>
                    <td> <a href = '#' onClick ={()=>this.cargarForm(documento.id)}> Editar </a> | <a href = '#' onClick ={()=>this.confirmarAccion(documento.id)}> Borrar </a> </td>

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
            codigo:this.state.codigo,
            
        }
        if(this.state.productoEditarId) {
                        
            db.collection('productos').doc(`${this.state.productoEditarId}`).update(datosMovimmientos)
            .then(()=>{
                // se ejecuta cuando se inserto con exito
                alert('Editado correctamente')
                this.limpiarCampos()    
            })
            .catch((error)=>{
                // se ejecuta cuando sucede un error 
                alert(error)
            })
            // console.log(datosMovimmientos)       

        } else{
            //   console.log({...datosMovimmientos, creado: firebase.firestore.FieldValue.serverTimestamp()})                
            db.collection('productos').add({...datosMovimmientos, creado: moment().unix()})
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
                    //******************************BORRAR PRODUCTO *************************************************
    borrarProducto = (productoId) =>{
        console.log(productoId)
        db.collection('productos').doc(productoId).delete()
        .then(()=>{
            // se ejecuta cuando se inserto con exito
            alert('Eliminado correctamente')    

        })
        .catch((error)=>{
            // se ejecuta cuando sucede un error 
            alert(error)
        })
    }



                    //******************************CARGA MOVIMIENTOS EN LISTA TEMPORAL *************************************************
    obtenerProducto = ()=>{
            let listaTemporal = []
            let metodoDesuscribirse = db.collection('productos').orderBy('creado')
            .onSnapshot((snap)=>{
                listaTemporal = []
                snap.forEach((documento)=>{
                    let producto = {
                        id : documento.id,
                        producto : documento.data().producto,
                        precioCompra : documento.data().precioCompra,
                        precioVenta : documento.data().precioVenta,
                        codigo : documento.data().codigo,
                        // creado: moment.unix(documento.data().creado.seconds).format("DD/MM/YYYY") || ''
                        creado : moment.unix(documento.data().creado).format("DD/MM/YYYY")
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
                        // ************************************LIMPIAR CAMPOS******************************************************

    limpiarCampos=()=>{
        this.setState({
            producto:'',
            precioCompra:0,
            precioVenta:0,
            codigo:0,
            productoEditarId: null
        })
    }

                    // ************************************ANTES DE DESMONTAR EL COMPONENTE******************************************************
     componentWillUnmount(){
         if (this.state.metodoDesuscribirse){
              this.state.metodoDesuscribirse()
         }}
    

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
                                        <Form.Control type="text" name="producto" value = {this.state.producto}onChange={this.capturarTecla} />
                                    
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
                                        <Form.Label>Precio precioVenta</Form.Label>
                                        <Form.Control type="number" name="precioVenta" value = {this.state.precioVenta} onChange={this.capturarTecla} />
                                    
                                    </Form.Group>
                        </Col>
                        <Col md={1}>
                           <Form.Group>
                                <Form.Label>Código</Form.Label>
                                <Form.Control type="number" name="codigo" value = {this.state.codigo} onChange={this.capturarTecla} />
                               
                            </Form.Group>
                    </Col>
                    
                    </Row>
                                
                </Form>

                {/* //  *******************************************BOTONES***************************************** */}
                <Row>
                        <Col md={6}>
                            <Button variant="info" size="sm" onClick={() => {this.guardar()}}>Guardar</Button>{' '}
                            <Button variant="warning" size="sm"  onClick={() => {this.limpiarCampos()}}>Limpiar Campos</Button>{' '}
                            <Button variant="danger" size="sm"  onClick={() => {this.props.history.goBack()}}>Volver</Button>
                        </Col>
                        <Col >
                         <Informe listaMovimientos = {this.state.listaMovimientos} />           
                    </Col>
                </Row>
                <br/>
                {/* //  ********************************************TABLA****************************************** */}
                <Row>
                    <Col>
                            <Table striped bordered hover size="sm">
                                        <thead>
                                            <tr>
                                                <th>Producto</th>
                                                <th>Precio Compra</th>
                                                <th>Precio Venta</th>
                                                <th>Creado</th>
                                                <th>Codigo</th>
                                                {/* <th>Entradas</th>
                                                <th>Salidas</th>
                                                <th>Stock</th> */}
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

export default withRouter(ProductoForm)