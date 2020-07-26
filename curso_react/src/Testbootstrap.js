import React, {Component} from 'react'; 
import { Container, Row, Col, Button, Navbar, Nav, NavDropdown, Form, FormControl, Table, Image } from 'react-bootstrap';

class Testbootstrap extends Component {
    render(){
        return(
            <Container>
                {/* Menu */}
                <Row> 
                    {/* xs={2} md={1} lg={1}> */}
                  
                        {/* Columna para logo */}
                    {/* <Col> 
                        Columna 1
                    </Col> */}
                    <Image src="../public/achievement-3481967_1920.jpg/100px250" fluid />
                    <Col> 
                        <Navbar bg="light" expand="lg">
                            <Navbar.Brand href="#home"><h1>Loli Store</h1></Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="mr-auto">
                                <Nav.Link href="#link">Stock</Nav.Link>
                                <Nav.Link href="#link">Compras</Nav.Link>
                                <Nav.Link href="#link">Ventas</Nav.Link>
                                <Nav.Link href="#link">Anulaciones</Nav.Link>
                                    <NavDropdown title="Reportes" id="basic-nav-dropdown">
                                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                                     </NavDropdown>
                                </Nav>
                                <Form inline>
                                <FormControl type="text" placeholder="Escribe el texto" className="mr-sm-2" />
                                <Button variant="light">Buscar</Button> 
                                {/* <Button variant="dark">Dark</Button> */}
                                {/* <Button variant="outline-success">Buscar</Button> */}
                                </Form>
                            </Navbar.Collapse>
                        </Navbar>
                    </Col>
                </Row>
            </Container>

         )
    }

}
export default Testbootstrap 