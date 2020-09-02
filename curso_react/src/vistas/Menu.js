import React, {Component} from 'react'; 
import { Row, Col,Navbar, Nav, NavDropdown, } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
// const logo = require('./assets/crm.gif') 
// const logo = require('./assets/lolilogo2.png') 
class Menu extends Component {
    state = {
        titulo : 'INICIO'
    }
    definirTitulo = (titulo)=>{
        console.log(titulo)
        this.setState({titulo:titulo})
    }
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
                                <LinkContainer exact to="/"><Nav.Link onClick={()=>{this.definirTitulo('INICIO')}} >Inicio</Nav.Link></LinkContainer>
                                <LinkContainer exact to="/productos"><Nav.Link onClick={()=>{this.definirTitulo('STOCK')}} >Stock</Nav.Link></LinkContainer>
                                <LinkContainer exact to="/productos/compras"><Nav.Link  onClick={()=>{this.definirTitulo('COMPRAS')}}>Compras</Nav.Link></LinkContainer>
                                <LinkContainer exact to="/productos/ventas"><Nav.Link onClick={()=>{this.definirTitulo('VENTAS')}} >Ventas</Nav.Link></LinkContainer>

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
                                {/* <Navbar.Collapse className="justify-content-center">
                                <h2>{this.state.titulo}  </h2>                 */}
                                    {/* <Navbar.Text>
                                    {this.state.titulo}                  
                                    </Navbar.Text> */}
                                {/* </Navbar.Collapse> */}
                                <Navbar.Collapse className="justify-content-end">
                                    <Navbar.Text>
                                    Signed in as: {this.props.atributoEmail}
                                    <a href='#' onClick={this.props.metodoSalir}>      Salir</a>
                                    </Navbar.Text>
                                </Navbar.Collapse>
                              
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
export default Menu; 