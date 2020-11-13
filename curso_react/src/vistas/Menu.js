import React, {Component} from 'react'; 
import { Row, Col,Navbar, Nav, NavDropdown, } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import LocalizedStrings from "react-localization";
// const logo = require('./assets/crm.gif') 
// const logo = require('./assets/lolilogo2.png') 

const traduccion = {
        es: {
        inicio: "Inicio",
        stock: "Stock",
        productos:"Productos",
        compras:"Compras",
        ventas:"Ventas",
        usuarios:"Usuarios",
        roles:"Roles",
        reportes:"Reportes",
        movimientos:"Movimientos"
        },
        en: {
            inicio: "Home",
            consulta: "Query",
            stock:"Stock",
            compras:"Buying",
            ventas:"Selling",
            usuarios:"Users",
            roles:"Rol",
            reportes:"Reports",
            movimientos:"Movements"

        },
      
    }
    let strings = new LocalizedStrings(traduccion)
    strings.setLanguage('es');

class Menu extends Component {
    state = {
        titulo : 'INICIO'
    }
    // componentDidMount(){
    //     console.log('menuProps : ', this.props)
    // }
    definirTitulo = (titulo)=>{
        console.log(titulo)
        this.setState({titulo:titulo})
        

    }
      render(){
        // console.log('menuProps : ', this.props)

        return(
            <div>
                {/* Menu */}
                <Row> 
                  
                    <Col> 
                        <Navbar bg="light" expand="lg">
                            <Navbar.Brand href="/home">MiniPDV</Navbar.Brand>
                            {/* <Navbar.Brand href="#home"><Image src={require('./assets/resizeimage.jpg')} fluid /></Navbar.Brand> */}
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="mr-auto">
                                {/* <Nav.Link href="#link">Stock</Nav.Link> */}
                                {/* <LinkContainer exact to="/"><Nav.Link onClick={()=>{this.definirTitulo('INICIO')}} >{strings.inicio}</Nav.Link></LinkContainer> */}
                                {this.props.rolesUsuarios.includes('Stock')? <LinkContainer exact to="/productos/stock"><Nav.Link onClick={()=>{this.definirTitulo('STOCK')}} >{strings.stock}</Nav.Link></LinkContainer>:null}
                                {this.props.rolesUsuarios.includes('Productos')? <LinkContainer exact to="/productos"><Nav.Link onClick={()=>{this.definirTitulo('PRODUCTOS')}} >{strings.productos}</Nav.Link></LinkContainer>:null}
                                {this.props.rolesUsuarios.includes('Compras')?<LinkContainer exact to="/productos/compras"><Nav.Link  onClick={()=>{this.definirTitulo('COMPRAS')}}>{strings.compras}</Nav.Link></LinkContainer>:null}
                                {this.props.rolesUsuarios.includes('Ventas')?<LinkContainer exact to="/productos/ventas"><Nav.Link onClick={()=>{this.definirTitulo('VENTAS')}} >{strings.ventas}</Nav.Link></LinkContainer>:null}
                                {this.props.rolesUsuarios.includes('Usuarios')?<LinkContainer exact to="/usuarios"><Nav.Link onClick={()=>{this.definirTitulo('USUARIOS')}} >{strings.usuarios}</Nav.Link></LinkContainer>:null}
                                {this.props.rolesUsuarios.includes('Roles')?<LinkContainer exact to="/roles"><Nav.Link onClick={()=>{this.definirTitulo('ROLES')}} >{strings.roles}</Nav.Link></LinkContainer>:null}

                                {/* {/* <Nav.Link href="#link">Compras</Nav.Link> */}
                                {/* <Nav.Link href="#link">Compras</Nav.Link> */}
                                {/* <Nav.Link href="#link">Ventas</Nav.Link> */}
                                {/* <Nav.Link href="#link">Anulaciones</Nav.Link> */}
                                {this.props.rolesUsuarios.includes('Stock')?
                                    <NavDropdown title={strings.reportes} id="basic-nav-dropdown">
                                         <LinkContainer exact to="/productos/movimientos"><Nav.Link>{strings.movimientos}</Nav.Link></LinkContainer>
                                         <LinkContainer exact to="/uploadfile"><Nav.Link>UPLOAD FILE</Nav.Link></LinkContainer>
                                                {/* <NavDropdown.Item href="/productos">Movimientos</NavDropdown.Item> */}
                                                {/* <NavDropdown.Divider />
                                                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item> */}
                                    </NavDropdown>:null}
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