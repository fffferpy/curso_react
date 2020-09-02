import React, { Component } from 'react';
import { Row, Col, Form, Button, Table } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import firebase, {db} from '../../config/firebase';
import moment from 'moment';
import { confirmAlert } from 'react-confirm-alert';
import Informe from '../../componentes/Informe';
import { MdDeleteForever, MdCreate } from "react-icons/md";


                    //  *************************STATES*********************

class ProductoForm extends Component {
    state={
        producto:'',
        codigo:0,
        precioCompra:0,
        precioVenta:0,
        listaMovimientos: [],
        metodoDesuscribirse:null,
        productoEditarId: null,
        mostrarFiltro: false,// variable para mostrar y ocultar filtros 
        filtroCodigo:'',
        filtroProducto:'' 
       
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
        return this.state.listaMovimientos
        .filter((documento)=>{
            return (documento.producto.toLowerCase().indexOf(this.state.filtroProducto.toLowerCase())>=0)
        }) 
        .map((documento) => {
            return (
                // key es un identificador unico
                <tr key={documento.producto}> 
                    <td>{documento.producto}</td>
                    <td>{documento.precioCompra}</td>
                    <td>{documento.precioVenta}</td>
                    <td>{documento.creado}</td>
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
            // <div style={{backgroundColor:"#3b5998"}}>      
            <div>      

                <Form>
                    <Row style={{marginTop:"10px",backgroundColor:"#3b5998", color:"#fff",marginBottom:"0%"}}> 
                    {/* <Col md={{ span: 3, offset: 5 }} xs={{ span: 3, offset: 3 }}><h2>PRODUCTOS</h2></Col> */}
                    <Col md={{ span: 3, offset: 5 }} xs={{ span: 3, offset: 3 }}><p style={{ fontFamily:"calibri"}}>PRODUCTOS</p></Col>
                    </Row>
                    <Row>
                    
                        <Col md={4}>
                                    <Form.Group>
                                        <Form.Label>Producto</Form.Label>
                                        <Form.Control type="text" size="sm"  name="producto" value = {this.state.producto}onChange={this.capturarTecla} />
                                    
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
              
               
                
            </div>
        )
    }
}

export default withRouter(ProductoForm)