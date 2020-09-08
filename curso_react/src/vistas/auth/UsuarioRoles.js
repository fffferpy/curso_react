import React, { Component } from 'react'
import {db} from '../../config/firebase';
import { Row, Col, Form, Button, Table , Badge } from 'react-bootstrap';


export default class UsuarioRoles extends Component {
    state = {
        listaRoles : []
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
    manejarCheckBox=()=>{

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
                        <Button variant="primary" onClick={this.guardarRoles}>Guardar</Button>
                    </Col>
                </Row>
            </div>
        )
    }
}
