import React from "react";
import { Row, Col , Jumbotron, Button} from 'react-bootstrap';
import ReactExport from "react-export-excel";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;


class Informe extends React.Component {

render(){
    return(
        // console.log(this.props.listaMovimientos)  como imprimir listaMovimientos???? *******************************
        // ************************************************************************************************************
        <Row>
        <Col md={12}>
        <ExcelFile element={<Button className="float-right" variant="info"  size="sm" >Exportar a Excel</Button>} >
        <ExcelSheet data={this.props.listaMovimientos} name="Movimientos">
        <ExcelColumn label="Codigo" value="codigo"/>
        <ExcelColumn label="Producto" value="productoNombre"/>
        {this.props.tipoMovimiento=='1'?<ExcelColumn label="Precio Compra" value="precioCompra"/>:<ExcelColumn label="Precio Venta" value="precioVenta"/>}
        <ExcelColumn label="Cantidad" value="cantidad"/>
        <ExcelColumn label="Estado" value="estado"/>
        <ExcelColumn label="Fecha" value="fecha"/>

        </ExcelSheet>
        </ExcelFile>
        </Col>
        </Row>
    )
    }
}

export default Informe;