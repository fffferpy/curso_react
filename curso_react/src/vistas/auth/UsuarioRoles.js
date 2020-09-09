import React, { Component } from 'react'
import {db} from '../../config/firebase';
import { Row, Col, Form, Button, Table , Badge } from 'react-bootstrap';


export default class UsuarioRoles extends Component {
    state = {
        listaRoles : [],  // ESTO ES PARA CREAR LOS CHECKBOXS
        rolesUsuarios : [] //LISTA QUE SE VA A ENVIAR A DB 
    }
    componentDidMount(){
        this.obtenerRoles()
    }
    obtenerRoles=()=>{
        let listaTemporal = []
       db.collection('roles').get()
       .then ((snap)=>{
        snap.forEach(documento =>{
            listaTemporal.push({
                id : documento.id,
                ...documento.data()
            })
        })
        this.setState({
            listaRoles : listaTemporal
        })
       })  
    }
    manejarCheckBox=(evento)=>{
        // console.log(evento.target.name)
        // console.log(evento.target.checked)	
        // ESTO ES PARA AGREGAR ROLES
        if (evento.target.checked){  // aqui se marco el checkbox
           let existe = this.state.rolesUsuarios.includes(`${evento.target.name}`);
            if(!existe){
                let nombreRol = evento.target.name
                this.setState({
                    rolesUsuarios : [...this.state.rolesUsuarios, nombreRol]
                })
            }
        }
        // ESTO ES PARA REMOVER ROLES
        if (!evento.target.checked){  // aqui se desmarco el checkbox
            let existe = this.state.rolesUsuarios.includes(`${evento.target.name}`);
            if(existe){
                let nombreRol = evento.target.name
                let rolesFiltrados = this.state.rolesUsuarios.filter((rolActual)=>{
                    return rolActual != nombreRol
                })
                this.setState({
                    rolesUsuarios : rolesFiltrados
                })
            }
        }
    }
    verRoles=()=>{
        console.log(this.state.rolesUsuarios)
    }
    guardarRoles=()=>{
        let usuarioId = this.props.match.params.usuarioId
        db.collection('usuarios').doc(usuarioId).update({roles : this.state.rolesUsuarios})
        .then(()=>{
            alert ('Roles actualizados')
        })
        .catch((error)=>{
            alert(error)
        })
    }
    renderRoles=()=>{
        return this.state.listaRoles.map((rol) => {
            return (
                <Form.Group key={rol.id} >
                    <Form.Check type="checkbox" label={`${rol.nombreRol}`} name={`${rol.nombreRol}`}  onChange={this.manejarCheckBox}  />
                </Form.Group> 
            )
        })
    }
    render() {
        return (
            <div style={{margin: "40px"}}>
                <Row className="justify-content-md-center">
                    <Col md={4}>
                        <Form>
                            { this.renderRoles()}
                            
                        </Form>
                        <Button variant="primary" onClick={this.guardarRoles}>Guardar</Button> {' '}
                        <Button variant="info" onClick={this.verRoles}>Ver Roles</Button>
                    </Col>
                </Row>
            </div>
        )
    }
}
