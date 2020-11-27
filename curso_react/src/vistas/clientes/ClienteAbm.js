import React, { Component } from 'react';
import { Row, Col, Form, Button, Table, OverlayTrigger, Tooltip, InputGroup, FormControl} from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import firebase, {db} from '../../config/firebase';
import moment from 'moment';
import { MdDeleteForever, MdCreate, MdFindInPage, MdSkipPrevious, MdSkipNext, MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { confirmAlert } from 'react-confirm-alert';
import { ToastContainer, toast } from 'react-toastify';


class ClienteAbm extends Component {
    state={
        clienteNombre:'',
        clienteCodigo:0,
        clienteRuc:'',
        clienteTelefono:0,
        mostrarFiltro:true,
        filtroClienteNombre:'',
        listaMovimientos: [],
    }


    componentDidMount(){
        this.obtenerClientes()
    }

    obtenerClientes = ()=>{
        let listaTemporal = []
        // let metodoDesuscribirse = db.collection('productos').orderBy('creado')
        db.collection('clientes').orderBy('creado')
        .onSnapshot((snap)=>{
            listaTemporal = []
            snap.forEach((documento)=>{
                let cliente = {
                    id : documento.id,
                    clienteNombre : documento.data().clienteNombre,
                    clienteCodigo : documento.data().clienteCodigo,
                    clienteRuc : documento.data().clienteRuc,
                    // creado: moment.unix(documento.data().creado.seconds).format("DD/MM/YYYY") || ''
                    creado : moment.unix(documento.data().creado).format("DD/MM/YYYY"),
                    clienteTelefono : documento.data().clienteTelefono
                }
                listaTemporal.push(cliente)
                console.log ('MOVIMIENTOS:', cliente)
            })
            this.setState({
                listaMovimientos : listaTemporal.reverse(),
                // metodoDesuscribirse : metodoDesuscribirse
            })
        },(error)=>{
            alert(error)
            console.log(error)
        })
}


renderListaMovimientos = () => {
    return this.state.listaMovimientos
    .filter((documento)=>{
        return (documento.clienteNombre.toLowerCase().indexOf(this.state.filtroClienteNombre.toLowerCase())>=0)
    }) 
    .map((documento) => {
        return (
            // key es un identificador unico
            <tr key={documento.id}> 
                <td>{documento.clienteNombre}</td>
                <td>{documento.clienteCodigo}</td>
                <td>{documento.clienteRuc}</td>
                {/* <td>{documento.creado}</td> */}
                <td>{documento.clienteTelefono}</td>
                <td style={{textAlign:"center"}}> 
                        <div>
                            <OverlayTrigger placement="left" delay={{ show: 250, hide: 400 }} overlay={<Tooltip id="button-tooltip" >Editar</Tooltip>} > 
                                <MdCreate size="19" onClick ={()=>this.cargarForm(documento.id)} />
                            </OverlayTrigger>
                            {' '}  
                            <OverlayTrigger placement="right" delay={{ show: 250, hide: 400 }} overlay={<Tooltip id="button-tooltip" >Borrar</Tooltip>} > 
                                <MdDeleteForever color="#3b5998" size="24"  />
                                {/* onClick ={()=>this.confirmarAccion(documento.id)} */}
                            </OverlayTrigger>
                        </div>
                       
                </td>
            </tr>
        )
    })
}

    capturarTecla=(evento)=>{
        this.setState({[evento.target.name]:evento.target.value})
    }

    cargarForm =(clienteId)=>{
        console.log (clienteId)
        db.collection('clientes').doc(`${clienteId}`).get()
        .then((snap)=>{
          console.log(snap.data())
          this.setState({
            clienteNombre: snap.data().clienteNombre,
            clienteRuc: snap.data().clienteRuc,
            clienteTelefono: snap.data().clienteTelefono,
            clienteCodigo : snap.data().clienteCodigo,
            clienteEditarId : snap.id
          })
         })
        .catch((error)=>{
            alert(error)
        })
    }

    confirmarAccion = (clienteId) => {
        confirmAlert({
          title: 'Accion borrar',
          message: 'Esta seguro?.',
          buttons: [
            {
              label: 'Si',
              onClick: () => this.borrarCliente(clienteId)
            },
            {
              label: 'No',
            //   onClick: () => alert('Click No')
            }
          ]
        });
      }

      borrarCliente = (clienteId) =>{
        console.log(clienteId)
        db.collection('clientes').doc(clienteId).delete()
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

    limpiarCampos = () => {
        this.setState({
            clienteNombre:'',
            clienteCodigo:0,
            clienteRuc:'',
            clienteTelefono:0,
            mostrarFiltro:true,
            filtroClienteNombre:'',
        })
    }

    guardar=()=>{
        // // console.log(this.state)
        // console.log(productoTemporal)
        let datosMovimmientos = {
            clienteNombre:this.state.clienteNombre,
            clienteCodigo:this.state.clienteCodigo,
            clienteRuc:this.state.clienteRuc,
            clienteTelefono:this.state.clienteTelefono,
        }

                                      // PARA GUARDAR
        if(this.state.clienteNombre!='' && this.state.clienteRuc!= '' && this.state.clienteCodigo!=0){    
            db.collection('clientes').add({
                ...datosMovimmientos, 
                creado : moment().unix(),
            })
            .then(()=>{
                // console.log (datosMovimmientos)
                // console.log(this.state.productoSeleccionado.Id)
               //     db.collection('productos').doc(this.state.productoSeleccionado.id).update({
               //     saldo : this.state.productoSeleccionado.saldo - parseInt(this.state.cantidad)
               //     })
               // .catch((error)=>{
                    // aqui hay que borrar en caso de que falle actualizacion de saldo en stock
               // })
                // se ejecuta cuando se inserto con exito
                alert('Insertado correctamente')  
                // toast.success('Insertado correctamente', {
                //     position: "bottom-right",
                //     autoClose: 1000,
                //     hideProgressBar: false,
                //     closeOnClick: true,
                //     pauseOnHover: true,
                //     draggable: true,
                //     progress: undefined,
                //     });
                this.limpiarCampos()  
                // this.closeModal()
            })
            .catch((error)=>{
                // se ejecuta cuando sucede un error 
                // alert(error)
                console.log(error)
            })
        }else {
            alert('Los campos con * son obligatorios')  
        }
        
        // console.log (datosMovimmientos)
    }

    render() {
        return (
            <div>
                 <Form>
                    {/* <Row style={{marginRight:"0.1%",backgroundColor:"#dbdbdb", color:"#000",marginLeft:"0.1%", paddingTop:5, paddingLeft:"40%"}}>  */}
                    <Row style = {{textAlign : "center", backgroundColor:"#dbdbdb", paddingTop:5}}>
                         <Col md={12} sm = {12} xs = {12} ><h4>CLIENTES</h4></Col>
                   
                    </Row>

                    <Row>
                    
                        <Col md={4} sm = {12} xs = {12}>
                            <Form.Group>
                                <Form.Label>NOMBRE</Form.Label>
                                <Form.Control type="text" size="sm"  name="clienteNombre" value = {this.state.clienteNombre} onChange={this.capturarTecla} />
                            </Form.Group>                        
                        </Col> 
                        <Col md={2} sm = {12} xs = {12}>
                            <Form.Group>
                                <Form.Label>CODIGO</Form.Label>
                                <Form.Control type="text" size="sm"  name="clienteCodigo" value = {this.state.clienteCodigo} onChange={this.capturarTecla} />
                            </Form.Group>                        
                        </Col>
                        <Col md={2} sm = {12} xs = {12}>
                            <Form.Group>
                                <Form.Label>RUC</Form.Label>
                                <Form.Control type="text" size="sm"  name="clienteRuc" value = {this.state.clienteRuc} onChange={this.capturarTecla} />
                            </Form.Group>                        
                        </Col>
                        <Col md={2} sm = {12} xs = {12}>
                            <Form.Group>
                                <Form.Label>TELEFONO</Form.Label>
                                <Form.Control type="text" size="sm"  name="clienteTelefono" value = {this.state.clienteTelefono} onChange={this.capturarTecla} />
                            </Form.Group>                        
                        </Col>
                        <Col md={6} sm = {2} xs = {4}>
                                <Button style={{ backgroundColor:'#3b5998', borderColor:'#3b5998', color:'#fff'}} size="sm" onClick={() => {this.guardar()}}>Guardar</Button>{' '}
                                <Button style={{ backgroundColor:'#dedede', borderColor:'#dedede', color:'#000'}} size="sm"  onClick={this.limpiarCampos}>Limpiar Campos</Button>{' '}
                                <Button variant = "info" size="sm" onClick={() => {this.props.history.goBack()}}>Volver</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                                <Table striped bordered hover size="sm" >
                                            <thead>
                                                <tr>
                                                    {/* <th>Producto</th> */}
                                                    <th>Cliente  {this.state.mostrarFiltro==true?<Form.Control size="sm" type="text"  name="filtroClienteNombre" value = {this.state.filtroClienteNombre} onChange={this.capturarTecla} />:null}</th>
                                                    {/* <th>Precio Compra</th> */}
                                                    <th>Codigo</th>
                                                    {/* <th>Creado</th> */}
                                                    <th>Ruc</th>
                                                    <th>Telefono</th>
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
                                
                </Form>
            </div>
        )
    }
}
export default  withRouter(ClienteAbm)
