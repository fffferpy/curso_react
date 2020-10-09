import React, { Component } from 'react'
import {Modal, Button} from 'react-bootstrap'

class ProductoModal extends Component {
    render() {
        return (
            <div>
                <Modal show={this.props.propsShowModal} onHide={this.props.funcionCloseModal}  >
                        <Modal.Header closeButton>
                            <Modal.Title>Modal heading</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Woohoo, you're reading this text in a modal!
                            
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