import React, {Component, useState} from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Accordion from 'react-bootstrap/Accordion';
import ProgressBar from 'react-bootstrap/ProgressBar';
import 'bootstrap/dist/css/bootstrap.min.css';

 
class WaitTime extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: true,
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
        this.setState({show: false});
    }
    
    handleShow() {
        this.setState({show: true});
    }

    render() {
        return (
            <>
                <Button class="btn text-primary bg-transparent" onClick={this.handleShow}>
            Wait Times
                </Button>
                <Modal show = {this.state.show} size="lg" onHide={this.handleClose}>
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
                            {this.state.gfste < 20 ? <p className='text-success'> Not Busy({this.state.gfste}%)</p> :
                            this.state.gfste < 80 ? <p className='text-warning'> Busy({this.state.gfste}%)</p> :
                            <p className='text-danger'> Very Busy({this.state.gfste}%)</p>}
                            {this.state.gfste < 20 ? <ProgressBar animated='true' striped variant='success' now={this.state.gfste} label={`${this.state.gfste}%`} /> :
                            this.state.gfste < 80 ? <ProgressBar animated='true' striped variant='warning' now={this.state.gfste} label={`${this.state.gfste}%`} /> :
                            <ProgressBar animated='true' striped variant='danger' now={this.state.gfste} label={`${this.state.gfste}%`} />}
                            </Accordion.Body>
                            <Accordion.Body>
                            <h5>
                                1st Floor West                    
                            </h5>
                            {this.state.gfstw < 20 ? <p className='text-success'> Not Busy({this.state.gfstw}%)</p> :
                            this.state.gfstw < 80 ? <p className='text-warning'> Busy({this.state.gfstw}%)</p> :
                            <p className='text-danger'> Very Busy({this.state.gfstw}%)</p>}
                            {this.state.gfstw < 20 ? <ProgressBar animated='true' striped variant='success' now={this.state.gfstw} label={`${this.state.gfstw}%`} /> :
                            this.state.gfstw < 80 ? <ProgressBar animated='true' striped variant='warning' now={this.state.gfstw} label={`${this.state.gfstw}%`} /> :
                            <ProgressBar animated='true' striped variant='danger' now={this.state.gfstw} label={`${this.state.gfstw}%`} />}
                            </Accordion.Body>
                            <Accordion.Body>
                            <h5>
                                2nd Floor East                    
                            </h5>
                            {this.state.gsece < 20 ? <p className='text-success'> Not Busy({this.state.gsece}%)</p> :
                            this.state.gsece < 80 ? <p className='text-warning'> Busy({this.state.gsece}%)</p> :
                            <p className='text-danger'> Very Busy({this.state.gsece}%)</p>}
                            {this.state.gsece < 20 ? <ProgressBar animated='true' striped variant='success' now={this.state.gsece} label={`${this.state.gsece}%`} /> :
                            this.state.gsece < 80 ? <ProgressBar animated='true' striped variant='warning' now={this.state.gsece} label={`${this.state.gsece}%`} /> :
                            <ProgressBar animated='true' striped variant='danger' now={this.state.gsece} label={`${this.state.gsece}%`} />}
                            </Accordion.Body>
                            <Accordion.Body>
                            <h5>
                                2nd Floor West                    
                            </h5>
                            {this.state.gsecw < 20 ? <p className='text-success'> Not Busy({this.state.gsecw}%)</p> :
                            this.state.gsecw < 80 ? <p className='text-warning'> Busy({this.state.gsecw}%)</p> :
                            <p className='text-danger'> Very Busy({this.state.gsecw}%)</p>}
                            {this.state.gsecw < 20 ? <ProgressBar animated='true' striped variant='success' now={this.state.gsecw} label={`${this.state.gsecw}%`} /> :
                            this.state.gsecw < 80 ? <ProgressBar animated='true' striped variant='warning' now={this.state.gsecw} label={`${this.state.gsecw}%`} /> :
                            <ProgressBar animated='true' striped variant='danger' now={this.state.gsecw} label={`${this.state.gsecw}%`} />}
                            </Accordion.Body>
                            <Accordion.Body>
                            <h5>
                                4th Floor                    
                            </h5>
                            {this.state.gfor < 20 ? <p className='text-success'> Not Busy({this.state.gfor}%)</p> :
                            this.state.gfor < 80 ? <p className='text-warning'> Busy({this.state.gfor}%)</p> :
                            <p className='text-danger'> Very Busy({this.state.gfor}%)</p>}
                            {this.state.gfor < 20 ? <ProgressBar animated='true' striped variant='success' now={this.state.gfor} label={`${this.state.gfor}%`} /> :
                            this.state.gfor < 80 ? <ProgressBar animated='true' striped variant='warning' now={this.state.gfor} label={`${this.state.gfor}%`} /> :
                            <ProgressBar animated='true' striped variant='danger' now={this.state.gfor} label={`${this.state.gfor}%`} />}
                            </Accordion.Body>
                            <Accordion.Body>
                            <h5>
                                5th Floor                    
                            </h5>
                            {this.state.gfif < 20 ? <p className='text-success'> Not Busy({this.state.gfif}%)</p> :
                            this.state.gfif < 80 ? <p className='text-warning'> Busy({this.state.gfif}%)</p> :
                            <p className='text-danger'> Very Busy({this.state.gfif}%)</p>}
                            {this.state.gfif < 20 ? <ProgressBar animated='true' striped variant='success' now={this.state.gfif} label={`${this.state.gfif}%`} /> :
                            this.state.gfif < 80 ? <ProgressBar animated='true' striped variant='warning' now={this.state.gfif} label={`${this.state.gfif}%`} /> :
                            <ProgressBar animated='true' striped variant='danger' now={this.state.gfif} label={`${this.state.gfif}%`} />}
                            </Accordion.Body>
                            <Accordion.Body>
                            <h5>
                                6th Floor                    
                            </h5>
                            {this.state.gsix < 20 ? <p className='text-success'> Not Busy({this.state.gsix}%)</p> :
                            this.state.gsix < 80 ? <p className='text-warning'> Busy({this.state.gsix}%)</p> :
                            <p className='text-danger'> Very Busy({this.state.gsix}%)</p>}
                            {this.state.gsix < 20 ? <ProgressBar animated='true' striped variant='success' now={this.state.gsix} label={`${this.state.gsix}%`} /> :
                            this.state.gsix < 80 ? <ProgressBar animated='true' striped variant='warning' now={this.state.gsix} label={`${this.state.gsix}%`} /> :
                            <ProgressBar animated='true' striped variant='danger' now={this.state.gsix} label={`${this.state.gsix}%`} />}
                            </Accordion.Body>
                            <Accordion.Body>
                            <h5>
                                7th Floor                    
                            </h5>
                            {this.state.gsev < 20 ? <p className='text-success'> Not Busy({this.state.gsev}%)</p> :
                            this.state.gsev < 80 ? <p className='text-warning'> Busy({this.state.gsev}%)</p> :
                            <p className='text-danger'> Very Busy({this.state.gsev}%)</p>}
                            {this.state.gsev < 20 ? <ProgressBar animated='true' striped variant='success' now={this.state.gsev} label={`${this.state.gsev}%`} /> :
                            this.state.gsev < 80 ? <ProgressBar animated='true' striped variant='warning' now={this.state.gsev} label={`${this.state.gsev}%`} /> :
                            <ProgressBar animated='true' striped variant='danger' now={this.state.gsev} label={`${this.state.gsev}%`} />}
                            </Accordion.Body>
                            <Accordion.Body>
                            <h5>
                                8th Floor                    
                            </h5>
                            {this.state.geig < 20 ? <p className='text-success'> Not Busy({this.state.geig}%)</p> :
                            this.state.geig < 80 ? <p className='text-warning'> Busy({this.state.geig}%)</p> :
                            <p className='text-danger'> Very Busy({this.state.geig}%)</p>}
                            {this.state.geig < 20 ? <ProgressBar animated='true' striped variant='success' now={this.state.geig} label={`${this.state.geig}%`} /> :
                            this.state.geig < 80 ? <ProgressBar animated='true' striped variant='warning' now={this.state.geig} label={`${this.state.geig}%`} /> :
                            <ProgressBar animated='true' striped variant='danger' now={this.state.geig} label={`${this.state.geig}%`} />}
                            </Accordion.Body>
                            <Accordion.Body>
                            <h5>
                                Teaching and Learning Commons                    
                            </h5>
                            {this.state.gtlc < 20 ? <p className='text-success'> Not Busy({this.state.gtlc}%)</p> :
                            this.state.gtlc < 80 ? <p className='text-warning'> Busy({this.state.gtlc}%)</p> :
                            <p className='text-danger'> Very Busy({this.state.gtlc}%)</p>}
                            {this.state.gtlc < 20 ? <ProgressBar animated='true' striped variant='success' now={this.state.gtlc} label={`${this.state.gtlc}%`} /> :
                            this.state.gtlc < 80 ? <ProgressBar animated='true' striped variant='warning' now={this.state.gtlc} label={`${this.state.gtlc}%`} /> :
                            <ProgressBar animated='true' striped variant='danger' now={this.state.gtlc} label={`${this.state.gtlc}%`} />}
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey='1'>
                            <Accordion.Header>RIMAC Fitness Gym</Accordion.Header>
                            <Accordion.Body>
                            {this.state.rim < 20 ? <p className='text-success'> Not Busy({this.state.rim}%)</p> :
                            this.state.rim < 80 ? <p className='text-warning'> Busy({this.state.rim}%)</p> :
                            <p className='text-danger'> Very Busy({this.state.rim}%)</p>}
                            {this.state.rim < 20 ? <ProgressBar animated='true' striped variant='success' now={this.state.rim} label={`${this.state.rim}%`} /> :
                            this.state.rim < 80 ? <ProgressBar animated='true' striped variant='warning' now={this.state.rim} label={`${this.state.rim}%`} /> :
                            <ProgressBar animated='true' striped variant='danger' now={this.state.rim} label={`${this.state.rim}%`} />}
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey='2'>
                            <Accordion.Header>Main Gym</Accordion.Header>
                            <Accordion.Body>
                            {this.state.maing < 20 ? <p className='text-success'> Not Busy({this.state.maing}%)</p> :
                            this.state.maing < 80 ? <p className='text-warning'> Busy({this.state.maing}%)</p> :
                            <p className='text-danger'> Very Busy({this.state.maing}%)</p>}
                            {this.state.maing < 20 ? <ProgressBar animated='true' striped variant='success' now={this.state.maing} label={`${this.state.maing}%`} /> :
                            this.state.maing < 80 ? <ProgressBar animated='true' striped variant='warning' now={this.state.maing} label={`${this.state.maing}%`} /> :
                            <ProgressBar animated='true' striped variant='danger' now={this.state.maing} label={`${this.state.maing}%`} />}
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey='3'>
                            <Accordion.Header>Cafe Ventanas</Accordion.Header>
                            <Accordion.Body>
                            {this.state.cafev < 20 ? <p className='text-success'> Not Busy({this.state.cafev}%)</p> :
                            this.state.cafev < 80 ? <p className='text-warning'> Busy({this.state.cafev}%)</p> :
                            <p className='text-danger'> Very Busy({this.state.cafev}%)</p>}
                            {this.state.cafev < 20 ? <ProgressBar animated='true' striped variant='success' now={this.state.cafev} label={`${this.state.cafev}%`} /> :
                            this.state.cafev < 80 ? <ProgressBar animated='true' striped variant='warning' now={this.state.cafev} label={`${this.state.cafev}%`} /> :
                            <ProgressBar animated='true' striped variant='danger' now={this.state.cafev} label={`${this.state.cafev}%`} />}
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey='4'>
                            <Accordion.Header>6th Restaurants</Accordion.Header>
                            <Accordion.Body>
                            {this.state.sixth < 20 ? <p className='text-success'> Not Busy({this.state.sixth}%)</p> :
                            this.state.sixth < 80 ? <p className='text-warning'> Busy({this.state.sixth}%)</p> :
                            <p className='text-danger'> Very Busy({this.state.sixth}%)</p>}
                            {this.state.sixth < 20 ? <ProgressBar animated='true' striped variant='success' now={this.state.sixth} label={`${this.state.sixth}%`} /> :
                            this.state.sixth < 80 ? <ProgressBar animated='true' striped variant='warning' now={this.state.sixth} label={`${this.state.sixth}%`} /> :
                            <ProgressBar animated='true' striped variant='danger' now={this.state.sixth} label={`${this.state.sixth}%`} />}
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey='5'>
                            <Accordion.Header>The Bistro</Accordion.Header>
                            <Accordion.Body>
                            {this.state.bistro < 20 ? <p className='text-success'> Not Busy({this.state.bistro}%)</p> :
                            this.state.bistro < 80 ? <p className='text-warning'> Busy({this.state.bistro}%)</p> :
                            <p className='text-danger'> Very Busy({this.state.bistro}%)</p>}
                            {this.state.bistro < 20 ? <ProgressBar animated='true' striped variant='success' now={this.state.bistro} label={`${this.state.bistro}%`} /> :
                            this.state.bistro < 80 ? <ProgressBar animated='true' striped variant='warning' now={this.state.bistro} label={`${this.state.bistro}%`} /> :
                            <ProgressBar animated='true' striped variant='danger' now={this.state.bistro} label={`${this.state.bistro}%`} />}
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey='6'>
                            <Accordion.Header>Canyon Vista</Accordion.Header>
                            <Accordion.Body>
                            {this.state.cv < 20 ? <p className='text-success'> Not Busy({this.state.cv}%)</p> :
                            this.state.cv < 80 ? <p className='text-warning'> Busy({this.state.cv}%)</p> :
                            <p className='text-danger'> Very Busy({this.state.cv}%)</p>}
                            {this.state.cv < 20 ? <ProgressBar animated='true' striped variant='success' now={this.state.cv} label={`${this.state.cv}%`} /> :
                            this.state.cv < 80 ? <ProgressBar animated='true' striped variant='warning' now={this.state.cv} label={`${this.state.cv}%`} /> :
                            <ProgressBar animated='true' striped variant='danger' now={this.state.cv} label={`${this.state.cv}%`} />}
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey='7'>
                            <Accordion.Header>64 Degrees</Accordion.Header>
                            <Accordion.Body>
                            {this.state.sfd < 20 ? <p className='text-success'> Not Busy({this.state.sfd}%)</p> :
                            this.state.sfd < 80 ? <p className='text-warning'> Busy({this.state.sfd}%)</p> :
                            <p className='text-danger'> Very Busy({this.state.sfd}%)</p>}
                            {this.state.sfd < 20 ? <ProgressBar animated='true' striped variant='success' now={this.state.sfd} label={`${this.state.sfd}%`} /> :
                            this.state.sfd < 80 ? <ProgressBar animated='true' striped variant='warning' now={this.state.sfd} label={`${this.state.sfd}%`} /> :
                            <ProgressBar animated='true' striped variant='danger' now={this.state.sfd} label={`${this.state.sfd}%`} />}
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey='8'>
                            <Accordion.Header>Foodworx</Accordion.Header>
                            <Accordion.Body>
                            {this.state.fw < 20 ? <p className='text-success'> Not Busy({this.state.fw}%)</p> :
                            this.state.fw < 80 ? <p className='text-warning'> Busy({this.state.fw}%)</p> :
                            <p className='text-danger'> Very Busy({this.state.fw}%)</p>}
                            {this.state.fw < 20 ? <ProgressBar animated='true' striped variant='success' now={this.state.fw} label={`${this.state.fw}%`} /> :
                            this.state.fw < 80 ? <ProgressBar animated='true' striped variant='warning' now={this.state.fw} label={`${this.state.fw}%`} /> :
                            <ProgressBar animated='true' striped variant='danger' now={this.state.fw} label={`${this.state.fw}%`} />}
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey='9'>
                            <Accordion.Header>Pines</Accordion.Header>
                            <Accordion.Body>
                            {this.state.pines < 20 ? <p className='text-success'> Not Busy({this.state.pines}%)</p> :
                            this.state.pines < 80 ? <p className='text-warning'> Busy({this.state.pines}%)</p> :
                            <p className='text-danger'> Very Busy({this.state.pines}%)</p>}
                            {this.state.pines < 20 ? <ProgressBar animated='true' striped variant='success' now={this.state.pines} label={`${this.state.pines}%`} /> :
                            this.state.pines < 80 ? <ProgressBar animated='true' striped variant='warning' now={this.state.pines} label={`${this.state.pines}%`} /> :
                            <ProgressBar animated='true' striped variant='danger' now={this.state.pines} label={`${this.state.pines}%`} />}
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey='10'>
                            <Accordion.Header>OceanView Terrace</Accordion.Header>
                            <Accordion.Body>
                            {this.state.ovt < 20 ? <p className='text-success'> Not Busy({this.state.ovt}%)</p> :
                            this.state.ovt < 80 ? <p className='text-warning'> Busy({this.state.ovt}%)</p> :
                            <p className='text-danger'> Very Busy({this.state.ovt}%)</p>}
                            {this.state.ovt < 20 ? <ProgressBar animated='true' striped variant='success' now={this.state.ovt} label={`${this.state.ovt}%`} /> :
                            this.state.ovt < 80 ? <ProgressBar animated='true' striped variant='warning' now={this.state.ovt} label={`${this.state.ovt}%`} /> :
                            <ProgressBar animated='true' striped variant='danger' now={this.state.ovt} label={`${this.state.ovt}%`} />}
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey='11'>
                            <Accordion.Header>Club Med</Accordion.Header>
                            <Accordion.Body>
                            {this.state.cm < 20 ? <p className='text-success'> Not Busy({this.state.cm}%)</p> :
                            this.state.cm < 80 ? <p className='text-warning'> Busy({this.state.cm}%)</p> :
                            <p className='text-danger'> Very Busy({this.state.cm}%)</p>}
                            {this.state.cm < 20 ? <ProgressBar animated='true' striped variant='success' now={this.state.cm} label={`${this.state.cm}%`} /> :
                            this.state.cm < 80 ? <ProgressBar animated='true' striped variant='warning' now={this.state.cm} label={`${this.state.cm}%`} /> :
                            <ProgressBar animated='true' striped variant='danger' now={this.state.cm} label={`${this.state.cm}%`} />}
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
 
export default WaitTime;

