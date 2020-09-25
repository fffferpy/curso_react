import React, { Component } from 'react';
import { Row, Col, Form, Button, Table } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import firebase, {db} from '../../config/firebase';
import moment from 'moment';
import { confirmAlert } from 'react-confirm-alert';
import Informe from '../../componentes/Informe';
import { MdDeleteForever, MdCreate } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';



                    //  *************************STATES*********************

class ProductoForm extends Component {
    state={
        productoNombre:'',
        codigo:0,
        precioCompra:0,
        precioVenta:0,
        listaMovimientos: [],
        metodoDesuscribirse:null,
        productoEditarId: null,
        mostrarFiltro: false,// variable para mostrar y ocultar filtros 
        filtroCodigo:'',
        filtroProducto:'',
        ultimoProductoVisible:'',
        primerProductoVisible:''
       
    }

    filtrar = () =>{
        this.setState({mostrarFiltro:!this.state.mostrarFiltro})
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
            productoNombre: snap.data().productoNombre,
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
        return this.state.listaMovimientos
        .filter((documento)=>{
            return (documento.productoNombre.toLowerCase().indexOf(this.state.filtroProducto.toLowerCase())>=0)
        }) 
        .map((documento, index) => {
            let indice = index + 1
            return (
                // key es un identificador unico
                <tr key={documento.id}> 
                    {/* <td>{indice}</td> */}
                    <td>{documento.productoNombre}</td>
                    <td>{documento.precioCompra}</td>
                    <td>{documento.precioVenta}</td>
                    <td>{documento.creado}</td>
                    <td>{documento.saldo}</td>
                    <td>{documento.codigo}</td>
                    {/* <td> <a href = '#' onClick ={()=>this.cargarForm(documento.id)}> Editar </a> | <a href = '#' onClick ={()=>this.confirmarAccion(documento.id)}> Borrar </a> </td> */}
                    {/* FcEditImage */}
                    {/* <td> <FcEditImage size="24" onClick ={()=>this.cargarForm(documento.id)} /> <FcEmptyTrash size="24" onClick ={()=>this.confirmarAccion(documento.id)} /></td> */}
                    <td> <MdCreate size="19" onClick ={()=>this.cargarForm(documento.id)} /> <MdDeleteForever color="#3b5998" size="24" onClick ={()=>this.confirmarAccion(documento.id)} /></td>
 
                    
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
            productoNombre:this.state.productoNombre,
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
                this.obtenerProducto()  
            })
            .catch((error)=>{
                // se ejecuta cuando sucede un error 
                alert(error)
            })
            // console.log(datosMovimmientos)       

        } else{
            //   console.log({...datosMovimmientos, creado: firebase.firestore.FieldValue.serverTimestamp()})                
            db.collection('productos').add({...datosMovimmientos, saldo : 0, creado: moment().unix()})
            .then(()=>{
                // se ejecuta cuando se inserto con exito
                // alert('Insertado correctamente')    
                toast.success('Insertado correctamente', {
                    position: "bottom-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
               this.limpiarCampos() 
               this.obtenerProducto()   

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
            this.obtenerProducto() 

        })
        .catch((error)=>{
            // se ejecuta cuando sucede un error 
            alert(error)
        })
    }



                    //******************************CARGA MOVIMIENTOS EN LISTA TEMPORAL *************************************************
    obtenerProducto = ()=>{
            let listaTemporal = []
            // let metodoDesuscribirse = db.collection('productos').orderBy('creado')
            // .onSnapshot((snap)=>{
            //    db.collection('productos').where('productoNombre','==','celular').orderBy('creado')
               db.collection('productos').orderBy('creado')
               .limit(7)
                .get()
                .then (snap =>{
                    listaTemporal = []
                    snap.forEach((documento)=>{
                        let producto = {
                            id : documento.id,
                            productoNombre : documento.data().productoNombre,
                            precioCompra : documento.data().precioCompra,
                            precioVenta : documento.data().precioVenta,
                            codigo : documento.data().codigo,
                            // creado: moment.unix(documento.data().creado.seconds).format("DD/MM/YYYY") || ''
                            creado : moment.unix(documento.data().creado).format("DD/MM/YYYY"),
                            saldo : documento.data().saldo
                        }
                        listaTemporal.push(producto)
                        console.log (producto)
                    })
                    //  console.log('Siguiente - Primer registro mostrado: ', snap.docs[0].data())
                     console.log('Siguiente - Ultimo registro mostrado: ', snap.docs[snap.docs.length-1].data());
                    this.setState({
                        listaMovimientos : listaTemporal,
                        ultimoProductoVisible : snap.docs[snap.docs.length-1],
                        primerProductoVisible : snap.docs[0]
                        // metodoDesuscribirse : metodoDesuscribirse
                    })
                })
                .catch(error =>{
                    alert(error)
                    console.log(error)
                })
    }
    paginaAnterior=()=>{
        let listaTemporal = []
        // let metodoDesuscribirse = db.collection('productos').orderBy('creado')
        // .onSnapshot((snap)=>{
           db.collection('productos').orderBy('creado')
           .endBefore(this.state.primerProductoVisible)
           .limitToLast(7)
           .get()
           .then (snap =>{
               if (snap.docs[0]){
                listaTemporal = []
                snap.forEach((documento)=>{
                    let producto = {
                        id : documento.id,
                        productoNombre : documento.data().productoNombre,
                        precioCompra : documento.data().precioCompra,
                        precioVenta : documento.data().precioVenta,
                        codigo : documento.data().codigo,
                        // creado: moment.unix(documento.data().creado.seconds).format("DD/MM/YYYY") || ''
                        creado : moment.unix(documento.data().creado).format("DD/MM/YYYY"),
                        saldo : documento.data().saldo
                    }
                    listaTemporal.push(producto)
                    console.log (producto)
                })
                //  console.log('Siguiente - Primer registro mostrado: ', snap.docs[0].data())
                 console.log('Siguiente - Ultimo registro mostrado: ', snap.docs[snap.docs.length-1].data());
                this.setState({
                    listaMovimientos : listaTemporal,
                    ultimoProductoVisible : snap.docs[snap.docs.length-1],
                    primerProductoVisible : snap.docs[0]

                    // metodoDesuscribirse : metodoDesuscribirse
                })
               }

            })
            .catch(error =>{
                alert(error)
                console.log(error)
            })     
    }
    siguientePagina=()=>{
        let listaTemporal = []
        // let metodoDesuscribirse = db.collection('productos').orderBy('creado')
        // .onSnapshot((snap)=>{
           db.collection('productos').orderBy('creado')
           .startAfter(this.state.ultimoProductoVisible)
           .limit(7)
           .get()
           .then (snap =>{
            if (snap.docs[0]){
                listaTemporal = []
                snap.forEach((documento)=>{
                    let producto = {
                        id : documento.id,
                        productoNombre : documento.data().productoNombre,
                        precioCompra : documento.data().precioCompra,
                        precioVenta : documento.data().precioVenta,
                        codigo : documento.data().codigo,
                        // creado: moment.unix(documento.data().creado.seconds).format("DD/MM/YYYY") || ''
                        creado : moment.unix(documento.data().creado).format("DD/MM/YYYY"),
                        saldo : documento.data().saldo
                    }
                    listaTemporal.push(producto)
                    console.log (producto)
                })
                //  console.log('Siguiente - Primer registro mostrado: ', snap.docs[0].data())
                 console.log('Siguiente - Ultimo registro mostrado: ', snap.docs[snap.docs.length-1].data());
                this.setState({
                    listaMovimientos : listaTemporal,
                    ultimoProductoVisible : snap.docs[snap.docs.length-1],
                    primerProductoVisible : snap.docs[0]

                    // metodoDesuscribirse : metodoDesuscribirse
                })
            }

            })
            .catch(error =>{
                alert(error)
                console.log(error)
            }) 
    }
                        // ************************************LIMPIAR CAMPOS******************************************************

    limpiarCampos=()=>{
        this.setState({
            productoNombre:'',
            precioCompra:0,
            precioVenta:0,
            codigo:0,
            productoEditarId: null
        })
    }

                    // ************************************ANTES DE DESMONTAR EL COMPONENTE******************************************************
    //  componentWillUnmount(){
    //      if (this.state.metodoDesuscribirse){
    //           this.state.metodoDesuscribirse()
    //      }}
    

                    // ************************************RENDERIZADO **************************************************************************
    render() {
        return (
            // *************************************** ESTO ES IGUAL A <div> *********************
            // <div style={{backgroundColor:"#3b5998"}}>      
            <div>      

                <Form>
                    <Row style={{marginRight:"0.1%",backgroundColor:"#dbdbdb", color:"#000",marginLeft:"0.1%", paddingTop:5, paddingLeft:"40%"}}> 
                    <Col><h4>PRODUCTOS</h4></Col>
                    {/* <Row style={{color:"#000", borderStyle:"#000", textAlign:"justify"}}size="sm">  */}
                    {/* <Col md={{ span: 3, offset: 5 }} xs={{ span: 3, offset: 3 }}><h2>PRODUCTOS</h2></Col> */}
                    {/* <Col md={{ span: 3, offset: 5 }} xs={{ span: 3, offset: 3 }}><p style={{ fontSize:10, fontFamily:"calibri", paddingTop :"1%", paddingBottom:"1%"}}>PRODUCTOS</p></Col> */}
                    </Row>
                    <Row>
                    
                        <Col md={4}>
                                    <Form.Group>
                                        <Form.Label>Producto</Form.Label>
                                        <Form.Control type="text" size="sm"  name="productoNombre" value = {this.state.productoNombre}onChange={this.capturarTecla} />
                                    
                                    </Form.Group>
                        </Col> 
                        <Col md={2}>
                                    <Form.Group>
                                        <Form.Label>Precio Compra</Form.Label>
                                        <Form.Control type="number"  size="sm" name="precioCompra" value = {this.state.precioCompra} onChange={this.capturarTecla} />
                                    
                                    </Form.Group>
                        </Col>
                        <Col md={2}>
                                    <Form.Group>
                                        <Form.Label>Precio precioVenta</Form.Label>
                                        <Form.Control type="number" size="sm"  name="precioVenta" value = {this.state.precioVenta} onChange={this.capturarTecla} />
                                    
                                    </Form.Group>
                        </Col>
                        <Col md={1}>
                           <Form.Group>
                                <Form.Label>Código</Form.Label>
                                <Form.Control type="number"  size="sm" name="codigo" value = {this.state.codigo} onChange={this.capturarTecla} />
                               
                            </Form.Group>
                    </Col>
                    
                    </Row>
                                
                </Form>

                {/* //  *******************************************BOTONES***************************************** */}
                <Row>
                        <Col md={8}>
                            <Button style={{ backgroundColor:'#3b5998', borderColor:'#3b5998', color:'#fff'}} size="sm" onClick={() => {this.guardar()}}>Guardar</Button>{' '}
                            <Button style={{ backgroundColor:'#dedede', borderColor:'#dedede', color:'#000'}} size="sm"  onClick={this.limpiarCampos}>Limpiar Campos</Button>{' '}
                            <Button className="float-right" style={{ backgroundColor:'#3b5998', borderColor:'#3b5998', color:'#fff'}} size="sm" onClick={() => {this.filtrar()}}>Filtrar</Button>{' '}
                            <Button variant = "info" size="sm" onClick={() => {this.props.history.goBack()}}>Volver</Button>

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
                                                {/* <th>Producto</th> */}
                                                <th>Producto  {this.state.mostrarFiltro==true?<Form.Control type="text" size="sm" name="filtroProducto" value = {this.state.filtroProducto} onChange={this.capturarTecla} />:null}</th>
                                                <th>Precio Compra</th>
                                                <th>Precio Venta</th>
                                                <th>Creado</th>
                                                <th>Saldo</th>
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
                <Row>
                    <Col>
                        <Button style={{ backgroundColor:'#3b5998', borderColor:'#3b5998', color:'#fff'}} size="sm"  onClick={this.paginaAnterior}>Anterior</Button>{' '}
                        <Button style={{ backgroundColor:'#3b5998', borderColor:'#3b5998', color:'#fff'}} size="sm" onClick={this.siguientePagina}>Siguiente</Button>{' '}

                    </Col>
                </Row>
              
                <ToastContainer />

                
            </div>
        )
    }
}

export default withRouter(ProductoForm)