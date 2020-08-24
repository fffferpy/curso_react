import React, { Component } from 'react';
import { Row, Col, Form, Button, Table, Badge } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import firebase, {db} from '../../config/firebase';
import { ToastContainer, toast } from 'react-toastify';
import moment from 'moment';
import {confirmAlert} from 'react-confirm-alert'; 
import Informe from '../../componentes/Informe'

                    //  *************************STATES*********************

class ProductoVenta extends Component {
    state={
        fecha:'',
        producto:'01',
        codigo:0,
        precioVenta:0,
        cantidad:0,
        tipoMovimiento: 2,
        listaProductos: [],
        listaMovimientos: [],
        metodoDesuscribirse:null,
        productoEditarId: null,
        estado : 1
       
    }

                    // LUEGO DE MONTAR EL COMPONENTE *******************************
    componentDidMount(){
        this.obtenerMovimientos()
        this.obtenerProductos() 
    }

    limpiarCampos = () => {
        this.setState({
            fecha:'',
            producto:'01',
            codigo:0,
            precioVenta:0,
            cantidad:0,
            tipoMovimiento: 2,
            metodoDesuscribirse:null,
            productoEditarId: null,
            estado : 1
        })
    }

    obtenerProductos =()=>{
        let listaProductosTemporal = []
        db.collection('productos').get()
        .then((productos)=>{
            productos.forEach((producto)=>{
                listaProductosTemporal.push({
                    id : producto.id,
                    ...producto.data()      
                    // producto : producto.producto  // ES LO MISMO QUE LA LINEA ANTERIOR
                })
            })
            this.setState({
                listaProductos : listaProductosTemporal
            })
            console.log(this.state.listaProductos)
        })
        .catch((error)=>{
            alert(error)
        })
    }

    confirmarAccion = (movimientoId) => {
        confirmAlert({
          title: 'Accion anular',
          message: 'Esta seguro?.',
          buttons: [
            {
              label: 'Si',
              onClick: () => this.anularMovimiento(movimientoId)
            },
            {
              label: 'No',
            //   onClick: () => alert('Click No')
            }
          ]
        });
      };

      anularMovimiento =(movimientoId) => {
        console.log(movimientoId)
        let datosNuevos = {
            estado : 0
        }
        db.collection('movimientos').doc(movimientoId).update(datosNuevos)
        .catch((error)=>{
            alert(error)
        })

    }

    renderItems =() => {
        return this.state.listaProductos.map((producto)=>{
            return (
            <option key={producto.id} value = {producto.producto}>{producto.producto}</option>
            )
        }) 
    }

                    // RENDERIZA LISTA DE MOVIMMIENTOS *****************************
     renderListaMovimientos = () => {
         return this.state.listaMovimientos.map((documento) => {
             return (
                 // key es un identificador unico
                     <tr key={documento.id}> 
                     <td>{documento.codigo}</td>
                     <td>{documento.producto}</td>
                     <td>{documento.precioVenta}</td>
                     <td>{documento.cantidad}</td>
                     <td>{moment(documento.fecha).format('DD/MM/YYYY')}</td>
                     <td>{documento.estado==1?<Badge pill variant="info"> Activo </Badge>:<Badge pill variant="danger"> Anulado </Badge>}</td>
                     <td> <a href = '#' onClick ={()=>this.cargarForm(documento.id)}> Editar </a> {documento.estado==0?null:<a href = '#' onClick ={()=>this.confirmarAccion(documento.id)}>| Anular </a>} </td>

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
            estado: this.state.estado
        }
        if (this.state.productoEditarId){       // PARA EDITAR 
            console.log(this.state.productoEditarId)
            db.collection('movimientos').doc(`${this.state.productoEditarId}`).update(datosMovimmientos)
            //    db.collection("movimientos").doc(`${this.state.productoEditarId}`).update({
            .then(()=>{
                // se ejecuta cuando se inserto con exito
                // alert('Editado correctamente')  
                toast.success('Editado correctamente', {
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
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
                // alert('Insertado correctamente')  
                toast.success('Insertado correctamente', {
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
                this.limpiarCampos()  
            })
            .catch((error)=>{
                // se ejecuta cuando sucede un error 
                // alert(error)
                toast.danger(error, {
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
            })
        }
        
        // console.log (datosMovimmientos)
    }

   //********************************************CARGAR PARA EDITAR **************************
   cargarForm =(documentoId)=>{
     console.log (documentoId)
     db.collection('movimientos').doc(`${documentoId}`).get()
     .then((snap)=>{
       console.log(snap.data())
       this.setState({
          fecha : snap.data().fecha,
         codigo : snap.data().codigo,  
         producto: snap.data().producto,
         precioVenta: snap.data().precioVenta,
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

                    // CARGA MOVIMIENTOS EN LISTA TEMPORAL *************************************************
    obtenerMovimientos = ()=>{
            let listaTemporal = []
            let metodoDesuscribirse = db.collection('movimientos').where('tipoMovimiento','==', 2).orderBy('creado')
            .onSnapshot((snap)=>{
                listaTemporal = []
                snap.forEach((documento)=>{
                    listaTemporal.push({
                        id : documento.id,
                        creadoFormateado : moment.unix(documento.data().creado).format('DD-MM-YYYY'), 
                        ...documento.data()
                    })
                })
                this.setState({
                    listaMovimientos : listaTemporal,
                    metodoDesuscribirse : metodoDesuscribirse
                })
                console.log('listaTemporal: ', listaTemporal)
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
                    <Col><h2>VENTAS</h2></Col>
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
                                <Form.Control as="select" name="producto" value = {this.state.producto}onChange={this.capturarTecla}>
                                <option key= '01' value = '01'>Seleccione un producto</option>
                                    {this.renderItems()}
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
                                <Form.Label>Precio Venta</Form.Label>
                                <Form.Control type="number" name="precioVenta" value = {this.state.precioVenta} onChange={this.capturarTecla} />
                              
                            </Form.Group>
                    </Col>
                    <Col md={2}> 

                        <Form.Group>
                            <Form.Label>Cantidad</Form.Label>
                            <Form.Control type="number" name="cantidad" value = {this.state.cantidad} onChange={this.capturarTecla} />
                            
                        </Form.Group>                         

                    </Col>
                </Row>
                            
            </Form>

            {/* //  *******************************************BOTONES***************************************** */}
            <Row>
                    <Col md={6}>
                        <Button variant="info" size="sm" onClick={() => {this.guardar()}}>Guardar</Button>{' '}
                        <Button variant="warning" size="sm" onClick={() => {this.limpiarCampos()}}>Limpiar Campos</Button>{' '}
                        <Button variant="danger" size="sm" onClick={() => {this.props.history.goBack()}}>Volver</Button>
                    </Col>
                    <Col >
                         <Informe listaMovimientos = {this.state.listaMovimientos} tipoMovimiento = '2'/>           
                    </Col>
            </Row>
            {/* //  ********************************************TABLA****************************************** */}
            <br/>
            <Row>
                <Col>
                        <Table striped bordered hover size="sm">
                                    <thead>
                                        <tr>
                                            <th>Código</th>
                                            <th>Producto</th>
                                            <th>Precio Venta</th>
                                            <th>Cantidad</th>
                                            <th>Fecha</th>
                                            <th>Estado</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.renderListaMovimientos()}                                       
                                    </tbody>
                        </Table>
                </Col>
            </Row>
            <ToastContainer/>
               
                
            </>
        )
    }
}

export default withRouter(ProductoVenta)