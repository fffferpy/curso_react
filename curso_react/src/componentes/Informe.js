import React from "react";
import { Row, Col , Jumbotron, Button} from 'react-bootstrap';
import ReactExport from "react-export-excel";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;


class Informe extends React.Component {

render(){
    return(
        <Row>
        <Col md={12}>
        <ExcelFile element={<Button variant="primary" >Exportar a Excel</Button>} >
        <ExcelSheet data={this.props.listaMovimientos} name="Movimientos">
        <ExcelColumn label="Codigo" value="codigo"/>
        <ExcelColumn label="Producto" value="producto"/>
        {this.props.tipoMovimiento=='1'?<ExcelColumn label="Precio Compra" value="precioCompra"/>:<ExcelColumn label="Precio Venta" value="precioVenta"/>}
        <ExcelColumn label="Cantidad" value="cantidad"/>
        <ExcelColumn label="Fecha" value="fecha"/>

        </ExcelSheet>
        </ExcelFile>
        </Col>
        </Row>
    )
    }
}

export default Informe;