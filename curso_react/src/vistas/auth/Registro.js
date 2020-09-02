import React from  'react'
import {Row, Col, Form, Button, Card} from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';



class Registro extends React.Component {
state = {
    email : '',
    password:'',
    repassword:''
}

validarDatos=()=>{
    if(this.state.password!='' && this.state.repassword!='' && this.state.email != ''){
        // console.log(this.state)
        if(this.state.password==this.state.repassword){
            
        }else {alert('Datos no coinciden.')

        }

    }else {alert('Todos los campos son obligatorios.')
        // toast.danger('Todos los campos son obligatorios.', {
        //     position: "bottom-right",
        //     autoClose: 3000,
        //     hideProgressBar: false,
        //     closeOnClick: true,
        //     pauseOnHover: true,
        //     draggable: true,
        //     progress: undefined,
        //     })
    }
}
capturarTecla=(evento)=>{
    this.setState({[evento.target.name]:evento.target.value})
}
registro =() =>{
    // console.log(this.state)
    // this.props.logear(this.state.email, this.state.password)
}

    render() {
        return(
            <div style={{margin: "40px"}}>
                <Row className="justify-content-md-center">
                    <Col md={4}>
                        <Card>
                            <Card.Body>
                                <Form>
                                    <Form.Group controlId="formEmail">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="email" placeholder="Introduzca su email" name="email" value={this.state.email} onChange={this.capturarTecla} />
                                    </Form.Group>
                                    <Form.Group controlId="formPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" placeholder="Password" name="password"  value={this.state.password } onChange={this.capturarTecla}/>
                                    </Form.Group>
                                    <Form.Group controlId="formRePassword">
                                        <Form.Label>Repetir Password</Form.Label>
                                        <Form.Control type="password" placeholder="Password" name="repassword"  value={this.state.repassword } onChange={this.capturarTecla}/>
                                    </Form.Group>
                                </Form>
                                
                                <Button style={{ backgroundColor:'#3b5998', borderColor:'#3b5998', color:'#fff'}} type="submit" onClick={this.validarDatos}>
                                    Registrarse
                                </Button>
                            </Card.Body>
                        </Card>

                    </Col>
                </Row>
                <ToastContainer/>
            </div>
        )
    }
}  
export default Registro