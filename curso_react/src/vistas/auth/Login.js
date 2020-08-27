import React from  'react'
import {Row, Col, Form, Button, Card} from 'react-bootstrap'



class Login extends React.Component {
state = {
    email : '',
    password:''
}
capturarTecla=(evento)=>{
    this.setState({[evento.target.name]:evento.target.value})
}
login =() =>{
    // console.log(this.state)
    this.props.logear(this.state.email, this.state.password)
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
                                </Form>
                                
                                <Button style={{ backgroundColor:'#bf4458', borderColor:'#000', borderWidth:'5px', color:'#000'}} type="submit" onClick={this.login}>
                                    Entrar
                                </Button>
                            </Card.Body>
                        </Card>

                    </Col>
                </Row>
            </div>
        )
    }
}  
export default Login