import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


const TutorBox = ({ tutor }) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <div class="col-3 mt-5 d-flex justify-content-center card-deck">
            <div class="card bg-light border-primary" style={{width: 225}}>
            <div class="text-center">
                <img class="card-img-top" src={tutor.Pfp}></img>
            </div>
            <div class="card-body">
                <div>
                    <h1 class="card-title text-center">
                        {tutor.Name}
                    </h1>
                </div>
                <div>
                    <h4 class="card-text text-center text-muted">Course: {tutor.Course}</h4>
                    <div class="col text-center">
                        <Button class="btn text-primary bg-transparent" onClick={handleShow}>
                            Connect
                        </Button>
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                            <Modal.Title>{tutor.Name}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <p>Email: {tutor.Email}</p>
                                <p>Discord: {tutor.Discord}</p>
                                <p>Bio: {tutor.Bio}</p>
                            </Modal.Body>
                            <Modal.Footer>
                            <Button variant="primary" onClick={handleClose}>
                                Close
                            </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                </div>
            </div>
        </div>
        </div>
        
    )
}

export default TutorBox; 