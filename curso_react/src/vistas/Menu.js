import React, {Component} from 'react'; 
import { Container, Row, Col, Button, Navbar, Nav, NavDropdown, Form, FormControl, Table, Image } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
// const logo = require('./assets/crm.gif') 
// const logo = require('./assets/lolilogo2.png') 
class Home extends Component {
    render(){
        return(
            <div>
                {/* Menu */}
                <Row> 
                  
                    <Col> 
                        <Navbar bg="light" expand="lg">
                            {/* <Navbar.Brand href="#home"><Image src={require('./assets/resizeimage.jpg')} fluid /></Navbar.Brand> */}
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="mr-auto">
                                {/* <Nav.Link href="#link">Stock</Nav.Link> */}
                                <LinkContainer exact to="/"><Nav.Link >Inicio</Nav.Link></LinkContainer>
                                <LinkContainer exact to="/productos"><Nav.Link >Stock</Nav.Link></LinkContainer>
                                <LinkContainer exact to="/productos/compras"><Nav.Link >Compras</Nav.Link></LinkContainer>
                                <LinkContainer exact to="/productos/ventas"><Nav.Link >Ventas</Nav.Link></LinkContainer>

                                {/* {/* <Nav.Link href="#link">Compras</Nav.Link> */}
                                {/* <Nav.Link href="#link">Compras</Nav.Link> */}
                                {/* <Nav.Link href="#link">Ventas</Nav.Link> */}
                                {/* <Nav.Link href="#link">Anulaciones</Nav.Link> */}
                                    <NavDropdown title="Reportes" id="basic-nav-dropdown">
                                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                                     </NavDropdown> 
                                </Nav>
                                {/* <Form inline>
                                    <FormControl type="text" placeholder="Escribe el texto" className="mr-sm-2" />
                                    <Button variant="light">Buscar</Button>
                                    <Button variant="dark">Dark</Button> 
                                    <Button variant="outline-success">Buscar</Button>
                                </Form> */}
                            </Navbar.Collapse>
                        </Navbar>
                    </Col>
                </Row>
              
            </div>

         )
    }

}
export default Home; 