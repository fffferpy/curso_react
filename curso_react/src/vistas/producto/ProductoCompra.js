import React, { Component } from 'react';
import { Row, Col, Form, Button, Table , Badge } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import firebase, {db} from '../../config/firebase';
import moment from 'moment';
import {confirmAlert} from 'react-confirm-alert'; 
import { ToastContainer, toast } from 'react-toastify';
import Informe from '../../componentes/Informe'

// *********************************COMENTARIO ************************
                    //  *************************STATES*********************

class ProductoCompra extends Component {
    state={
        fecha:'',
        producto:'01',
        codigo:'0',
        precioCompra:'0',
        cantidad:0,
        tipoMovimiento: 1,
        estado: 1,            // estado 1 = activo / 0 = anulado
        listaMovimientos: [],
        listaProductos: [],
        metodoDesuscribirse:null,
        productoEditarId: null,
        mostrarFiltro: false,// variable para mostrar y ocultar filtros 
        filtroCodigo:'',
        filtroProducto:'' 
    }

    filtrar = () =>{
         this.setState({mostrarFiltro:!this.state.mostrarFiltro})
    }

    limpiarCampos = () => {
        this.setState({
            fecha:'',
            producto:'champion',
            codigo:0,
            precioCompra:0,
            cantidad:0,
            tipoMovimiento: 1,
            estado: 1,
            metodoDesuscribirse:null,
            productoEditarId: null
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

                    // LUEGO DE MONTAR EL COMPONENTE *******************************
    componentDidMount(){
        this.obtenerMovimientos()
        this.obtenerProductos() 
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


                    // RENDERIZA LISTA DE MOVIMMIENTOS *****************************
    renderListaMovimientos = () => {
        return this.state.listaMovimientos
        .filter((documento)=>{
            return (documento.codigo.toString().indexOf(this.state.filtroCodigo)>=0) 
            && (documento.producto.toLowerCase().indexOf(this.state.filtroProducto.toLowerCase())>=0)
        }) 
        .map((documento) => {
            return (
                // key es un identificador unico
                    <tr key={documento.id}> 
                    <td>{documento.codigo}</td>
                    <td>{documento.producto}</td>
                    <td>{documento.precioCompra}</td>
                    <td>{documento.cantidad}</td>
                    <td>{moment(documento.fecha).format('DD/MM/YYYY')}</td>
                    <td>{documento.estado==1?<Badge pill variant="info"> Activo </Badge>:<Badge pill variant="danger"> Anulado </Badge>}</td>
                    <td> <a href = '#' onClick ={()=>this.cargarForm(documento.id)}> Editar </a> {documento.estado==0?null:<a href = '#' onClick ={()=>this.confirmarAccion(documento.id)}>| Anular </a>} </td>

                </tr>
            )
        })
    }

renderItems =() => {
    return this.state.listaProductos.map((producto)=>{
        return (
        <option key={producto.id} value = {producto.producto}>{producto.producto}</option>
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
                                <Form.Control as="select" name="producto" value = {this.state.producto}  onChange={this.capturarTecla}>
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
                    <Col md={8}>
                        <Button variant="info" size="sm" onClick={() => {this.guardar()}}>Guardar</Button>{' '}
                        <Button variant="warning" size="sm" onClick={() => {this.limpiarCampos()}}>Limpiar Campos</Button>{' '}
                        <Button variant="info" size="sm"  onClick={this.filtrar}>Filtrar</Button>{' '}
                        <Button variant="danger" size="sm"  onClick={() => {this.props.history.goBack()}}>Volver</Button>
                    </Col>
                    <Col md={4}>
                         <Informe listaMovimientos = {this.state.listaMovimientos} tipoMovimiento = '1'/>           
                    </Col>
            </Row>
            {/* //  ********************************************TABLA****************************************** */}
            <br/>
            <Row>
                <Col>
                        <Table striped bordered hover size="sm">
                                    <thead>
                                        <tr>
                                            <th>Código  {this.state.mostrarFiltro==true?<Form.Control type="text" name="filtroCodigo" value = {this.state.filtroCodigo} onChange={this.capturarTecla} />:null}</th>
                                            <th>Producto  {this.state.mostrarFiltro==true?<Form.Control type="text" name="filtroProducto" value = {this.state.filtroProducto} onChange={this.capturarTecla} />:null}</th>
                                            <th>Precio Compra</th>
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
            <ToastContainer />
              
               
                
            </>
        )
    }
}

export default withRouter(ProductoCompra)