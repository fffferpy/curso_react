import React, { Component } from 'react'
import {Modal, Button} from 'react-bootstrap'
import NumberFormat from 'react-number-format';

class ProductoModal extends Component {
    render() {
        return (
            <div>
                <Modal show={this.props.propsShowModal} onHide={this.props.funcionCloseModal}  >
                        <Modal.Header closeButton>
                            <Modal.Title>Modal heading</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <NumberFormat style = {{borderColor:'#f3f3f3', backgroundColor:'#FFEBCD', width:'300px'}} value={2456981} thousandSeparator={true} prefix={'$'} />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.props.funcionGuardar}>
                                GUARDAR
                            </Button>
                            {/* <Button variant="primary" onClick={handleClose}>
                                Save Changes
                            </Button> */}
                        </Modal.Footer>
                </Modal>
            </div>
        )
    }
}
export default ProductoModal