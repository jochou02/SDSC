import React, {Component, useState} from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Accordion from 'react-bootstrap/Accordion';
import ProgressBar from 'react-bootstrap/ProgressBar';
 
class WaitTime extends Component {
    constructor(props) {
        super(props);
        // const gfste = 10;
        // const gfstw = 30; 
        // const gsece = 25;
        // const gsecw = 90;
        // const gfor = 45;
        // const gfif = 60;
        // const gsix = 50;
        // const gsev = 40;
        // const geig = 80;
        // const gtlc = 45;
        // const rim = 85;
        // const maing = 45;
        // const cafev = 30;
        // const sixth = 60;
        // const bistro = 55;
        // const cv = 15;
        // const sfd = 35;
        // const fw = 5;
        // const pines = 75;
        // const ovt = 45;
        // const cm = 20;
        this.state = {
            setShow: false,
             gfste: 10,
             gfstw: 30, 
             gsece: 25,
             gsecw: 90,
             gfor: 45,
             gfif: 60,
             gsix: 50,
             gsev: 40,
             geig: 80,
             gtlc: 45,
             rim: 85,
             maing: 45,
             cafev: 30,
             sixth: 60,
             bistro: 55,
             cv: 15,
             sfd : 35,
             fw: 5,
             pines: 75,
             ovt: 45,
             cm: 20
        }
    }

    handleClose() {
        this.setState({setShow: false});
    }
    
    handleShow() {
        this.setState({setShow: true});
    }

    render() {
        return (
            <>
                <Button class="btn text-primary bg-transparent" onClick={handleShow}>
            Wait Times
                </Button>
                <Modal show={show} size="lg" onHide={handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Wait Times</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Accordion>
                        <Accordion.Item eventKey='0'>
                            <Accordion.Header>Geisel Library</Accordion.Header>
                            <Accordion.Body>
                            <h5>
                                1st Floor East
                            </h5>
                            <p className='fw-light fs-6 text-muted'>Capacity: 150</p>
                            {gfste < 20 ? <p className='text-success'> Not Busy({gfste}%)</p> :
                            gfste < 80 ? <p className='text-warning'> Busy({gfste}%)</p> :
                            <p className='text-danger'> Very Busy({gfste}%)</p>}
                            {gfste < 20 ? <ProgressBar animated='true' striped variant='success' now={gfste} label={`${gfste}%`} /> :
                            gfste < 80 ? <ProgressBar animated='true' striped variant='warning' now={gfste} label={`${gfste}%`} /> :
                            <ProgressBar animated='true' striped variant='danger' now={gfste} label={`${gfste}%`} />}
                            </Accordion.Body>
                            <Accordion.Body>
                            <h5>
                                1st Floor West                    
                            </h5>
                            {gfstw < 20 ? <p className='text-success'> Not Busy({gfstw}%)</p> :
                            gfstw < 80 ? <p className='text-warning'> Busy({gfstw}%)</p> :
                            <p className='text-danger'> Very Busy({gfstw}%)</p>}
                            {gfstw < 20 ? <ProgressBar animated='true' striped variant='success' now={gfstw} label={`${gfstw}%`} /> :
                            gfstw < 80 ? <ProgressBar animated='true' striped variant='warning' now={gfstw} label={`${gfstw}%`} /> :
                            <ProgressBar animated='true' striped variant='danger' now={gfstw} label={`${gfstw}%`} />}
                            </Accordion.Body>
                            <Accordion.Body>
                            <h5>
                                2nd Floor East                    
                            </h5>
                            {gsece < 20 ? <p className='text-success'> Not Busy({gsece}%)</p> :
                            gsece < 80 ? <p className='text-warning'> Busy({gsece}%)</p> :
                            <p className='text-danger'> Very Busy({gsece}%)</p>}
                            {gsece < 20 ? <ProgressBar animated='true' striped variant='success' now={gsece} label={`${gsece}%`} /> :
                            gsece < 80 ? <ProgressBar animated='true' striped variant='warning' now={gsece} label={`${gsece}%`} /> :
                            <ProgressBar animated='true' striped variant='danger' now={gsece} label={`${gsece}%`} />}
                            </Accordion.Body>
                            <Accordion.Body>
                            <h5>
                                2nd Floor West                    
                            </h5>
                            {gsecw < 20 ? <p className='text-success'> Not Busy({gsecw}%)</p> :
                            gsecw < 80 ? <p className='text-warning'> Busy({gsecw}%)</p> :
                            <p className='text-danger'> Very Busy({gsecw}%)</p>}
                            {gsecw < 20 ? <ProgressBar animated='true' striped variant='success' now={gsecw} label={`${gsecw}%`} /> :
                            gsecw < 80 ? <ProgressBar animated='true' striped variant='warning' now={gsecw} label={`${gsecw}%`} /> :
                            <ProgressBar animated='true' striped variant='danger' now={gsecw} label={`${gsecw}%`} />}
                            </Accordion.Body>
                            <Accordion.Body>
                            <h5>
                                4th Floor                    
                            </h5>
                            {gfor < 20 ? <p className='text-success'> Not Busy({gfor}%)</p> :
                            gfor < 80 ? <p className='text-warning'> Busy({gfor}%)</p> :
                            <p className='text-danger'> Very Busy({gfor}%)</p>}
                            {gfor < 20 ? <ProgressBar animated='true' striped variant='success' now={gfor} label={`${gfor}%`} /> :
                            gfor < 80 ? <ProgressBar animated='true' striped variant='warning' now={gfor} label={`${gfor}%`} /> :
                            <ProgressBar animated='true' striped variant='danger' now={gfor} label={`${gfor}%`} />}
                            </Accordion.Body>
                            <Accordion.Body>
                            <h5>
                                5th Floor                    
                            </h5>
                            {gfif < 20 ? <p className='text-success'> Not Busy({gfif}%)</p> :
                            gfif < 80 ? <p className='text-warning'> Busy({gfif}%)</p> :
                            <p className='text-danger'> Very Busy({gfif}%)</p>}
                            {gfif < 20 ? <ProgressBar animated='true' striped variant='success' now={gfif} label={`${gfif}%`} /> :
                            gfif < 80 ? <ProgressBar animated='true' striped variant='warning' now={gfif} label={`${gfif}%`} /> :
                            <ProgressBar animated='true' striped variant='danger' now={gfif} label={`${gfif}%`} />}
                            </Accordion.Body>
                            <Accordion.Body>
                            <h5>
                                6th Floor                    
                            </h5>
                            {gsix < 20 ? <p className='text-success'> Not Busy({gsix}%)</p> :
                            gsix < 80 ? <p className='text-warning'> Busy({gsix}%)</p> :
                            <p className='text-danger'> Very Busy({gsix}%)</p>}
                            {gsix < 20 ? <ProgressBar animated='true' striped variant='success' now={gsix} label={`${gsix}%`} /> :
                            gsix < 80 ? <ProgressBar animated='true' striped variant='warning' now={gsix} label={`${gsix}%`} /> :
                            <ProgressBar animated='true' striped variant='danger' now={gsix} label={`${gsix}%`} />}
                            </Accordion.Body>
                            <Accordion.Body>
                            <h5>
                                7th Floor                    
                            </h5>
                            {gsev < 20 ? <p className='text-success'> Not Busy({gsev}%)</p> :
                            gsev < 80 ? <p className='text-warning'> Busy({gsev}%)</p> :
                            <p className='text-danger'> Very Busy({gsev}%)</p>}
                            {gsev < 20 ? <ProgressBar animated='true' striped variant='success' now={gsev} label={`${gsev}%`} /> :
                            gsev < 80 ? <ProgressBar animated='true' striped variant='warning' now={gsev} label={`${gsev}%`} /> :
                            <ProgressBar animated='true' striped variant='danger' now={gsev} label={`${gsev}%`} />}
                            </Accordion.Body>
                            <Accordion.Body>
                            <h5>
                                8th Floor                    
                            </h5>
                            {geig < 20 ? <p className='text-success'> Not Busy({geig}%)</p> :
                            geig < 80 ? <p className='text-warning'> Busy({geig}%)</p> :
                            <p className='text-danger'> Very Busy({geig}%)</p>}
                            {geig < 20 ? <ProgressBar animated='true' striped variant='success' now={geig} label={`${geig}%`} /> :
                            geig < 80 ? <ProgressBar animated='true' striped variant='warning' now={geig} label={`${geig}%`} /> :
                            <ProgressBar animated='true' striped variant='danger' now={geig} label={`${geig}%`} />}
                            </Accordion.Body>
                            <Accordion.Body>
                            <h5>
                                Teaching and Learning Commons                    
                            </h5>
                            {gtlc < 20 ? <p className='text-success'> Not Busy({gtlc}%)</p> :
                            gtlc < 80 ? <p className='text-warning'> Busy({gtlc}%)</p> :
                            <p className='text-danger'> Very Busy({gtlc}%)</p>}
                            {gtlc < 20 ? <ProgressBar animated='true' striped variant='success' now={gtlc} label={`${gtlc}%`} /> :
                            gtlc < 80 ? <ProgressBar animated='true' striped variant='warning' now={gtlc} label={`${gtlc}%`} /> :
                            <ProgressBar animated='true' striped variant='danger' now={gtlc} label={`${gtlc}%`} />}
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey='1'>
                            <Accordion.Header>RIMAC Fitness Gym</Accordion.Header>
                            <Accordion.Body>
                            {rim < 20 ? <p className='text-success'> Not Busy({rim}%)</p> :
                            rim < 80 ? <p className='text-warning'> Busy({rim}%)</p> :
                            <p className='text-danger'> Very Busy({rim}%)</p>}
                            {rim < 20 ? <ProgressBar animated='true' striped variant='success' now={rim} label={`${rim}%`} /> :
                            rim < 80 ? <ProgressBar animated='true' striped variant='warning' now={rim} label={`${rim}%`} /> :
                            <ProgressBar animated='true' striped variant='danger' now={rim} label={`${rim}%`} />}
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey='2'>
                            <Accordion.Header>Main Gym</Accordion.Header>
                            <Accordion.Body>
                            {maing < 20 ? <p className='text-success'> Not Busy({maing}%)</p> :
                            maing < 80 ? <p className='text-warning'> Busy({maing}%)</p> :
                            <p className='text-danger'> Very Busy({maing}%)</p>}
                            {maing < 20 ? <ProgressBar animated='true' striped variant='success' now={maing} label={`${maing}%`} /> :
                            maing < 80 ? <ProgressBar animated='true' striped variant='warning' now={maing} label={`${maing}%`} /> :
                            <ProgressBar animated='true' striped variant='danger' now={maing} label={`${maing}%`} />}
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey='3'>
                            <Accordion.Header>Cafe Ventanas</Accordion.Header>
                            <Accordion.Body>
                            {cafev < 20 ? <p className='text-success'> Not Busy({cafev}%)</p> :
                            cafev < 80 ? <p className='text-warning'> Busy({cafev}%)</p> :
                            <p className='text-danger'> Very Busy({cafev}%)</p>}
                            {cafev < 20 ? <ProgressBar animated='true' striped variant='success' now={cafev} label={`${cafev}%`} /> :
                            cafev < 80 ? <ProgressBar animated='true' striped variant='warning' now={cafev} label={`${cafev}%`} /> :
                            <ProgressBar animated='true' striped variant='danger' now={cafev} label={`${cafev}%`} />}
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey='4'>
                            <Accordion.Header>6th Restaurants</Accordion.Header>
                            <Accordion.Body>
                            {sixth < 20 ? <p className='text-success'> Not Busy({sixth}%)</p> :
                            sixth < 80 ? <p className='text-warning'> Busy({sixth}%)</p> :
                            <p className='text-danger'> Very Busy({sixth}%)</p>}
                            {sixth < 20 ? <ProgressBar animated='true' striped variant='success' now={sixth} label={`${sixth}%`} /> :
                            sixth < 80 ? <ProgressBar animated='true' striped variant='warning' now={sixth} label={`${sixth}%`} /> :
                            <ProgressBar animated='true' striped variant='danger' now={sixth} label={`${sixth}%`} />}
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey='5'>
                            <Accordion.Header>The Bistro</Accordion.Header>
                            <Accordion.Body>
                            {bistro < 20 ? <p className='text-success'> Not Busy({bistro}%)</p> :
                            bistro < 80 ? <p className='text-warning'> Busy({bistro}%)</p> :
                            <p className='text-danger'> Very Busy({bistro}%)</p>}
                            {bistro < 20 ? <ProgressBar animated='true' striped variant='success' now={bistro} label={`${bistro}%`} /> :
                            bistro < 80 ? <ProgressBar animated='true' striped variant='warning' now={bistro} label={`${bistro}%`} /> :
                            <ProgressBar animated='true' striped variant='danger' now={bistro} label={`${bistro}%`} />}
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey='6'>
                            <Accordion.Header>Canyon Vista</Accordion.Header>
                            <Accordion.Body>
                            {cv < 20 ? <p className='text-success'> Not Busy({cv}%)</p> :
                            cv < 80 ? <p className='text-warning'> Busy({cv}%)</p> :
                            <p className='text-danger'> Very Busy({cv}%)</p>}
                            {cv < 20 ? <ProgressBar animated='true' striped variant='success' now={cv} label={`${cv}%`} /> :
                            cv < 80 ? <ProgressBar animated='true' striped variant='warning' now={cv} label={`${cv}%`} /> :
                            <ProgressBar animated='true' striped variant='danger' now={cv} label={`${cv}%`} />}
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey='7'>
                            <Accordion.Header>64 Degrees</Accordion.Header>
                            <Accordion.Body>
                            {sfd < 20 ? <p className='text-success'> Not Busy({sfd}%)</p> :
                            sfd < 80 ? <p className='text-warning'> Busy({sfd}%)</p> :
                            <p className='text-danger'> Very Busy({sfd}%)</p>}
                            {sfd < 20 ? <ProgressBar animated='true' striped variant='success' now={sfd} label={`${sfd}%`} /> :
                            sfd < 80 ? <ProgressBar animated='true' striped variant='warning' now={sfd} label={`${sfd}%`} /> :
                            <ProgressBar animated='true' striped variant='danger' now={sfd} label={`${sfd}%`} />}
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey='8'>
                            <Accordion.Header>Foodworx</Accordion.Header>
                            <Accordion.Body>
                            {fw < 20 ? <p className='text-success'> Not Busy({fw}%)</p> :
                            fw < 80 ? <p className='text-warning'> Busy({fw}%)</p> :
                            <p className='text-danger'> Very Busy({fw}%)</p>}
                            {fw < 20 ? <ProgressBar animated='true' striped variant='success' now={fw} label={`${fw}%`} /> :
                            fw < 80 ? <ProgressBar animated='true' striped variant='warning' now={fw} label={`${fw}%`} /> :
                            <ProgressBar animated='true' striped variant='danger' now={fw} label={`${fw}%`} />}
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey='9'>
                            <Accordion.Header>Pines</Accordion.Header>
                            <Accordion.Body>
                            {pines < 20 ? <p className='text-success'> Not Busy({pines}%)</p> :
                            pines < 80 ? <p className='text-warning'> Busy({pines}%)</p> :
                            <p className='text-danger'> Very Busy({pines}%)</p>}
                            {pines < 20 ? <ProgressBar animated='true' striped variant='success' now={pines} label={`${pines}%`} /> :
                            pines < 80 ? <ProgressBar animated='true' striped variant='warning' now={pines} label={`${pines}%`} /> :
                            <ProgressBar animated='true' striped variant='danger' now={pines} label={`${pines}%`} />}
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey='10'>
                            <Accordion.Header>OceanView Terrace</Accordion.Header>
                            <Accordion.Body>
                            {ovt < 20 ? <p className='text-success'> Not Busy({ovt}%)</p> :
                            ovt < 80 ? <p className='text-warning'> Busy({ovt}%)</p> :
                            <p className='text-danger'> Very Busy({ovt}%)</p>}
                            {ovt < 20 ? <ProgressBar animated='true' striped variant='success' now={ovt} label={`${ovt}%`} /> :
                            ovt < 80 ? <ProgressBar animated='true' striped variant='warning' now={ovt} label={`${ovt}%`} /> :
                            <ProgressBar animated='true' striped variant='danger' now={ovt} label={`${ovt}%`} />}
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey='11'>
                            <Accordion.Header>Club Med</Accordion.Header>
                            <Accordion.Body>
                            {cm < 20 ? <p className='text-success'> Not Busy({cm}%)</p> :
                            cm < 80 ? <p className='text-warning'> Busy({cm}%)</p> :
                            <p className='text-danger'> Very Busy({cm}%)</p>}
                            {cm < 20 ? <ProgressBar animated='true' striped variant='success' now={cm} label={`${cm}%`} /> :
                            cm < 80 ? <ProgressBar animated='true' striped variant='warning' now={cm} label={`${cm}%`} /> :
                            <ProgressBar animated='true' striped variant='danger' now={cm} label={`${cm}%`} />}
                            </Accordion.Body>
                        </Accordion.Item>
                        </Accordion>
                    </Modal.Body>
                    <Modal.Footer>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}
 
export default Component

