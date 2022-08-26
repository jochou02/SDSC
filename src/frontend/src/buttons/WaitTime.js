import React, {Component, useState} from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Accordion from 'react-bootstrap/Accordion';
import ProgressBar from 'react-bootstrap/ProgressBar';
import 'bootstrap/dist/css/bootstrap.min.css';

const initial_wait = {
    "Cafe Ventanas": {
        "name": "Cafe Ventanas",
        "id": 56,
        "busyness": 22,
        "people": 22,
        "isAvailable": true,
        "capacity": 100,
        "hourSummary": "open",
        "isOpen": true,
        "bestLabel": null,
        "bestLocations": [],
        "percentage": 0.22,
        "subLocs": false
    },
    "WongAvery Library": {
        "name": "WongAvery Library",
        "id": 8,
        "busyness": 8,
        "people": 59,
        "isAvailable": true,
        "capacity": 748,
        "hourSummary": "open",
        "isOpen": true,
        "bestLabel": "floor",
        "bestLocations": [
            {
                "abbreviation": "2",
                "id": 15,
                "busyness": 6
            }
        ],
        "percentage": 0.08,
        "subLocs": [
            {
                "busyness": 11,
                "people": 21,
                "capacity": 190,
                "isAvailable": true,
                "id": 14,
                "name": "1st Floor",
                "abbreviation": "1",
                "hourSummary": "open",
                "isOpen": true,
                "percentage": 0.11
            },
            {
                "busyness": 6,
                "people": 33,
                "capacity": 523,
                "isAvailable": true,
                "id": 15,
                "name": "2nd Floor",
                "abbreviation": "2",
                "hourSummary": "open",
                "isOpen": true,
                "percentage": 0.06
            }
        ]
    },
    "WongAvery Grad Study": {
        "name": "WongAvery Grad Study",
        "id": 17,
        "busyness": 15,
        "people": 5,
        "isAvailable": true,
        "capacity": 35,
        "hourSummary": "open",
        "isOpen": true,
        "bestLabel": null,
        "bestLocations": [],
        "percentage": 0.15,
        "subLocs": false
    },
    "RIMAC Fitness Gym": {
        "name": "RIMAC Fitness Gym",
        "id": 12,
        "busyness": 17,
        "people": 30,
        "isAvailable": true,
        "capacity": 180,
        "hourSummary": "open",
        "isOpen": true,
        "bestLabel": null,
        "bestLocations": [],
        "percentage": 0.17,
        "subLocs": false
    },
    "Main Gym": {
        "name": "Main Gym",
        "id": 13,
        "busyness": 3,
        "people": 1,
        "isAvailable": true,
        "capacity": 50,
        "hourSummary": "open",
        "isOpen": true,
        "bestLabel": null,
        "bestLocations": [],
        "percentage": 0.03,
        "subLocs": false
    },
    "6th Restaurant": {
        "name": "6th Restaurant",
        "id": 70,
        "busyness": 0,
        "people": 0,
        "isAvailable": true,
        "capacity": 350,
        "hourSummary": "open",
        "isOpen": true,
        "bestLabel": null,
        "bestLocations": [],
        "percentage": 0,
        "subLocs": [
            {
                "busyness": 0,
                "people": 0,
                "capacity": 300,
                "isAvailable": true,
                "id": 162,
                "name": "Indoors",
                "abbreviation": "6I",
                "hourSummary": "open",
                "isOpen": true,
                "percentage": 0
            },
            {
                "busyness": 0,
                "people": 0,
                "capacity": 50,
                "isAvailable": true,
                "id": 163,
                "name": "Patio",
                "abbreviation": "6I",
                "hourSummary": "open",
                "isOpen": true,
                "percentage": 0
            }
        ]
    },
    "Roger's Market": {
        "name": "Roger's Market",
        "id": 55,
        "busyness": 0,
        "people": 0,
        "isAvailable": true,
        "capacity": 75,
        "hourSummary": "open",
        "isOpen": true,
        "bestLabel": null,
        "bestLocations": [],
        "percentage": 0,
        "subLocs": false
    },
    "Club Med": {
        "name": "Club Med",
        "id": 58,
        "busyness": 17,
        "people": 7,
        "isAvailable": true,
        "capacity": 40,
        "hourSummary": "open",
        "isOpen": true,
        "bestLabel": null,
        "bestLocations": [],
        "percentage": 0.17,
        "subLocs": false
    },
    "Canyon Vista": {
        "name": "Canyon Vista",
        "id": 57,
        "busyness": 2,
        "people": 2,
        "isAvailable": true,
        "capacity": 100,
        "hourSummary": "open",
        "isOpen": true,
        "bestLabel": null,
        "bestLocations": [],
        "percentage": 0.02,
        "subLocs": false
    },
    "Geisel Library": {
        "name": "Geisel Library",
        "id": 7,
        "busyness": 12,
        "people": 335,
        "isAvailable": true,
        "capacity": 2785,
        "hourSummary": "open",
        "isOpen": true,
        "bestLabel": "floor",
        "bestLocations": [
            {
                "abbreviation": "1W",
                "id": 2,
                "busyness": 6
            },
            {
                "abbreviation": "2W",
                "id": 4,
                "busyness": 9
            },
            {
                "abbreviation": "6",
                "id": 7,
                "busyness": 9
            }
        ],
        "percentage": 0.12,
        "subLocs": [
            {
                "busyness": 11,
                "people": 16,
                "capacity": 150,
                "isAvailable": true,
                "id": 1,
                "name": "1st Floor East",
                "abbreviation": "1E",
                "hourSummary": "open",
                "isOpen": true,
                "percentage": 0.11
            },
            {
                "busyness": 6,
                "people": 29,
                "capacity": 520,
                "isAvailable": true,
                "id": 2,
                "name": "1st Floor West",
                "abbreviation": "1W",
                "hourSummary": "open",
                "isOpen": true,
                "percentage": 0.06
            },
            {
                "busyness": 27,
                "people": 165,
                "capacity": 620,
                "isAvailable": true,
                "id": 3,
                "name": "2nd Floor East",
                "abbreviation": "2E",
                "hourSummary": "open",
                "isOpen": true,
                "percentage": 0.27
            },
            {
                "busyness": 9,
                "people": 41,
                "capacity": 460,
                "isAvailable": true,
                "id": 4,
                "name": "2nd Floor West",
                "abbreviation": "2W",
                "hourSummary": "open",
                "isOpen": true,
                "percentage": 0.09
            },
            {
                "busyness": 4,
                "people": 3,
                "capacity": 80,
                "isAvailable": true,
                "id": 5,
                "name": "4th Floor",
                "abbreviation": "4",
                "hourSummary": "open",
                "isOpen": true,
                "percentage": 0.04
            },
            {
                "busyness": 8,
                "people": 13,
                "capacity": 155,
                "isAvailable": true,
                "id": 6,
                "name": "5th Floor",
                "abbreviation": "5",
                "hourSummary": "open",
                "isOpen": true,
                "percentage": 0.08
            },
            {
                "busyness": 9,
                "people": 39,
                "capacity": 440,
                "isAvailable": true,
                "id": 7,
                "name": "6th Floor",
                "abbreviation": "6",
                "hourSummary": "open",
                "isOpen": true,
                "percentage": 0.09
            },
            {
                "busyness": 7,
                "people": 14,
                "capacity": 195,
                "isAvailable": true,
                "id": 8,
                "name": "7th Floor",
                "abbreviation": "7",
                "hourSummary": "open",
                "isOpen": true,
                "percentage": 0.07
            },
            {
                "busyness": 9,
                "people": 15,
                "capacity": 165,
                "isAvailable": true,
                "id": 9,
                "name": "8th Floor",
                "abbreviation": "8",
                "hourSummary": "open",
                "isOpen": true,
                "percentage": 0.09
            },
            {
                "busyness": 0,
                "people": 0,
                "capacity": 195,
                "isAvailable": true,
                "id": 194,
                "name": "Teaching and Learning Commons",
                "abbreviation": "TLC",
                "hourSummary": "open",
                "isOpen": true,
                "percentage": 0
            }
        ]
    },
    "64 Degrees": {
        "name": "64 Degrees",
        "id": 54,
        "busyness": 0,
        "people": 1,
        "isAvailable": true,
        "capacity": 175,
        "hourSummary": "open",
        "isOpen": true,
        "bestLabel": null,
        "bestLocations": [],
        "percentage": 0,
        "subLocs": false
    },
    "Foodworx": {
        "name": "Foodworx",
        "id": 53,
        "busyness": 5,
        "people": 1,
        "isAvailable": true,
        "capacity": 20,
        "hourSummary": "open",
        "isOpen": true,
        "bestLabel": null,
        "bestLocations": [],
        "percentage": 0.05,
        "subLocs": false
    },
    "Pines": {
        "name": "Pines",
        "id": 52,
        "busyness": 0,
        "people": 0,
        "isAvailable": true,
        "capacity": 100,
        "hourSummary": "open",
        "isOpen": true,
        "bestLabel": null,
        "bestLocations": [],
        "percentage": 0,
        "subLocs": false
    },
    "OceanView Terrace": {
        "name": "OceanView Terrace",
        "id": 51,
        "busyness": 3,
        "people": 3,
        "isAvailable": true,
        "capacity": 100,
        "hourSummary": "open",
        "isOpen": true,
        "bestLabel": null,
        "bestLocations": [],
        "percentage": 0.03,
        "subLocs": false
    },
    "Price Center": {
        "name": "Price Center",
        "id": 14,
        "busyness": 0,
        "people": 0,
        "isAvailable": false,
        "capacity": 650,
        "hourSummary": "open",
        "isOpen": true,
        "bestLabel": "food court",
        "bestLocations": [
            {
                "abbreviation": "E",
                "id": 11,
                "busyness": 0
            }
        ],
        "percentage": 0,
        "subLocs": [
            {
                "busyness": 0,
                "people": 0,
                "capacity": 450,
                "isAvailable": false,
                "id": 11,
                "name": "Price Center East",
                "abbreviation": "E",
                "hourSummary": "open",
                "isOpen": true,
                "percentage": 0
            },
            {
                "busyness": 0,
                "people": 0,
                "capacity": 200,
                "isAvailable": false,
                "id": 10,
                "name": "Price Center West",
                "abbreviation": "W",
                "hourSummary": "open",
                "isOpen": true,
                "percentage": 0
            }
        ]
    },
    "Student Services Center": {
        "name": "Student Services Center",
        "id": 10,
        "busyness": 23,
        "people": 14,
        "isAvailable": true,
        "capacity": 62,
        "hourSummary": "open",
        "isOpen": true,
        "bestLabel": "location",
        "bestLocations": [
            {
                "abbreviation": "CO",
                "id": 22,
                "busyness": 10
            }
        ],
        "percentage": 0.23,
        "subLocs": [
            {
                "busyness": 0,
                "people": 0,
                "capacity": 14,
                "isAvailable": false,
                "id": 21,
                "name": "Campus Card Office",
                "abbreviation": "CCO",
                "hourSummary": "open",
                "isOpen": true,
                "percentage": 0
            },
            {
                "busyness": 10,
                "people": 1,
                "capacity": 15,
                "isAvailable": true,
                "id": 22,
                "name": "Cashier's Office",
                "abbreviation": "CO",
                "hourSummary": "open",
                "isOpen": true,
                "percentage": 0.1
            },
            {
                "busyness": 29,
                "people": 10,
                "capacity": 33,
                "isAvailable": true,
                "id": 27,
                "name": "Financial Aid Office",
                "abbreviation": "FAO",
                "hourSummary": "open",
                "isOpen": true,
                "percentage": 0.29
            }
        ]
    },
    "Parking Offices": {
        "name": "Parking Offices",
        "id": 9,
        "busyness": 0,
        "people": 0,
        "isAvailable": false,
        "capacity": 90,
        "hourSummary": "open",
        "isOpen": true,
        "bestLabel": "office",
        "bestLocations": [
            {
                "abbreviation": "O",
                "id": 19,
                "busyness": 0
            },
            {
                "abbreviation": "G",
                "id": 17,
                "busyness": 0
            }
        ],
        "percentage": 0,
        "subLocs": [
            {
                "busyness": 0,
                "people": 0,
                "capacity": 15,
                "isAvailable": false,
                "id": 19,
                "name": "Osler",
                "abbreviation": "O",
                "hourSummary": "open",
                "isOpen": true,
                "percentage": 0
            },
            {
                "busyness": 0,
                "people": 0,
                "capacity": 60,
                "isAvailable": false,
                "id": 17,
                "name": "Gilman",
                "abbreviation": "G",
                "hourSummary": "open",
                "isOpen": true,
                "percentage": 0
            },
            {
                "busyness": 0,
                "people": 0,
                "capacity": 10,
                "isAvailable": false,
                "id": 18,
                "name": "Athena",
                "abbreviation": "A",
                "hourSummary": "open",
                "isOpen": true,
                "percentage": 0
            },
            {
                "busyness": 0,
                "people": 0,
                "capacity": 5,
                "isAvailable": false,
                "id": 20,
                "name": "Hillcrest",
                "abbreviation": "H",
                "hourSummary": "open",
                "isOpen": true,
                "percentage": 0
            }
        ]
    },
    "7th Market": {
        "name": "7th Market",
        "id": 60,
        "busyness": 68,
        "people": 10,
        "isAvailable": true,
        "capacity": 15,
        "hourSummary": "open",
        "isOpen": true,
        "bestLabel": null,
        "bestLocations": [],
        "percentage": 0.68,
        "subLocs": false
    },
    "The Bistro": {
        "name": "The Bistro",
        "id": 59,
        "busyness": 0,
        "people": 0,
        "isAvailable": true,
        "capacity": 70,
        "hourSummary": "Closed until 11:00am",
        "isOpen": false,
        "bestLabel": null,
        "bestLocations": [],
        "percentage": 0,
        "subLocs": false
    }
}
 
class WaitTime extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: true,
            wait_data: initial_wait
        }

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    componentDidMount() {
        const headers = {"Content-Type": "application/json"};
        if (localStorage.getItem('auth-token')) {
            headers["Authorization"] = localStorage.getItem('auth-token');
        }

        fetch('127.0.0.1:8000/wait_time/data', {headers, })
            .then(res => res.json())
            .then((data) => {
                this.setState({
                    wait_data: data
                });
            })
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
                            <p className='fw-light fs-6 text-muted'>Capacity: {this.state.wait_data['Geisel Library']['subLocs'][0]['capacity']}</p>
                            {this.state.wait_data['Geisel Library']['subLocs'][0]['busyness'] < 20 ? <p className='text-success'> Not Busy({this.state.wait_data['Geisel Library']['subLocs'][0]['busyness']}%)</p> :
                            this.state.wait_data['Geisel Library']['subLocs'][0]['busyness'] < 80 ? <p className='text-warning'> Busy({this.state.wait_data['Geisel Library']['subLocs'][0]['busyness']}%)</p> :
                            <p className='text-danger'> Very Busy({this.state.wait_data['Geisel Library']['subLocs'][0]['busyness']}%)</p>}
                            {this.state.wait_data['Geisel Library']['subLocs'][0]['busyness'] < 20 ? <ProgressBar animated='true' striped variant='success' now={this.state.wait_data['Geisel Library']['subLocs'][0]['busyness']} label={`${this.state.wait_data['Geisel Library']['subLocs'][0]['busyness']}%`} /> :
                            this.state.wait_data['Geisel Library']['subLocs'][0]['busyness'] < 80 ? <ProgressBar animated='true' striped variant='warning' now={this.state.wait_data['Geisel Library']['subLocs'][0]['busyness']} label={`${this.state.wait_data['Geisel Library']['subLocs'][0]['busyness']}%`} /> :
                            <ProgressBar animated='true' striped variant='danger' now={this.state.wait_data['Geisel Library']['subLocs'][0]['busyness']} label={`${this.state.wait_data['Geisel Library']['subLocs'][0]['busyness']}%`} />}
                            </Accordion.Body>
                            <Accordion.Body>
                            <h5>
                                1st Floor West                    
                            </h5>
                            <p className='fw-light fs-6 text-muted'>Capacity: {this.state.wait_data['Geisel Library']['subLocs'][1]['capacity']}</p>
                            {this.state.wait_data['Geisel Library']['subLocs'][1]['busyness'] < 20 ? <p className='text-success'> Not Busy({this.state.wait_data['Geisel Library']['subLocs'][1]['busyness']}%)</p> :
                            this.state.wait_data['Geisel Library']['subLocs'][1]['busyness'] < 80 ? <p className='text-warning'> Busy({this.state.wait_data['Geisel Library']['subLocs'][1]['busyness']}%)</p> :
                            <p className='text-danger'> Very Busy({this.state.wait_data['Geisel Library']['subLocs'][1]['busyness']}%)</p>}
                            {this.state.wait_data['Geisel Library']['subLocs'][1]['busyness'] < 20 ? <ProgressBar animated='true' striped variant='success' now={this.state.wait_data['Geisel Library']['subLocs'][1]['busyness']} label={`${this.state.wait_data['Geisel Library']['subLocs'][1]['busyness']}%`} /> :
                            this.state.wait_data['Geisel Library']['subLocs'][1]['busyness'] < 80 ? <ProgressBar animated='true' striped variant='warning' now={this.state.wait_data['Geisel Library']['subLocs'][1]['busyness']} label={`${this.state.wait_data['Geisel Library']['subLocs'][1]['busyness']}%`} /> :
                            <ProgressBar animated='true' striped variant='danger' now={this.state.wait_data['Geisel Library']['subLocs'][1]['busyness']} label={`${this.state.wait_data['Geisel Library']['subLocs'][1]['busyness']}%`} />}
                            </Accordion.Body>
                            <Accordion.Body>
                            <h5>
                                2nd Floor East                    
                            </h5>
                            <p className='fw-light fs-6 text-muted'>Capacity: {this.state.wait_data['Geisel Library']['subLocs'][2]['capacity']}</p>
                            {this.state.wait_data['Geisel Library']['subLocs'][2]['busyness'] < 20 ? <p className='text-success'> Not Busy({this.state.wait_data['Geisel Library']['subLocs'][2]['busyness']}%)</p> :
                            this.state.wait_data['Geisel Library']['subLocs'][2]['busyness'] < 80 ? <p className='text-warning'> Busy({this.state.wait_data['Geisel Library']['subLocs'][2]['busyness']}%)</p> :
                            <p className='text-danger'> Very Busy({this.state.wait_data['Geisel Library']['subLocs'][2]['busyness']}%)</p>}
                            {this.state.wait_data['Geisel Library']['subLocs'][2]['busyness'] < 20 ? <ProgressBar animated='true' striped variant='success' now={this.state.wait_data['Geisel Library']['subLocs'][2]['busyness']} label={`${this.state.wait_data['Geisel Library']['subLocs'][2]['busyness']}%`} /> :
                            this.state.wait_data['Geisel Library']['subLocs'][2]['busyness'] < 80 ? <ProgressBar animated='true' striped variant='warning' now={this.state.wait_data['Geisel Library']['subLocs'][2]['busyness']} label={`${this.state.wait_data['Geisel Library']['subLocs'][2]['busyness']}%`} /> :
                            <ProgressBar animated='true' striped variant='danger' now={this.state.wait_data['Geisel Library']['subLocs'][2]['busyness']} label={`${this.state.wait_data['Geisel Library']['subLocs'][2]['busyness']}%`} />}
                            </Accordion.Body>
                            <Accordion.Body>
                            <h5>
                                2nd Floor West                    
                            </h5>
                            <p className='fw-light fs-6 text-muted'>Capacity: {this.state.wait_data['Geisel Library']['subLocs'][3]['capacity']}</p>
                            {this.state.wait_data['Geisel Library']['subLocs'][3]['busyness'] < 20 ? <p className='text-success'> Not Busy({this.state.wait_data['Geisel Library']['subLocs'][3]['busyness']}%)</p> :
                            this.state.wait_data['Geisel Library']['subLocs'][3]['busyness'] < 80 ? <p className='text-warning'> Busy({this.state.wait_data['Geisel Library']['subLocs'][3]['busyness']}%)</p> :
                            <p className='text-danger'> Very Busy({this.state.wait_data['Geisel Library']['subLocs'][3]['busyness']}%)</p>}
                            {this.state.wait_data['Geisel Library']['subLocs'][3]['busyness'] < 20 ? <ProgressBar animated='true' striped variant='success' now={this.state.wait_data['Geisel Library']['subLocs'][3]['busyness']} label={`${this.state.wait_data['Geisel Library']['subLocs'][3]['busyness']}%`} /> :
                            this.state.wait_data['Geisel Library']['subLocs'][3]['busyness'] < 80 ? <ProgressBar animated='true' striped variant='warning' now={this.state.wait_data['Geisel Library']['subLocs'][3]['busyness']} label={`${this.state.wait_data['Geisel Library']['subLocs'][3]['busyness']}%`} /> :
                            <ProgressBar animated='true' striped variant='danger' now={this.state.wait_data['Geisel Library']['subLocs'][3]['busyness']} label={`${this.state.wait_data['Geisel Library']['subLocs'][3]['busyness']}%`} />}
                            </Accordion.Body>
                            <Accordion.Body>
                            <h5>
                                4th Floor                    
                            </h5>
                            <p className='fw-light fs-6 text-muted'>Capacity: {this.state.wait_data['Geisel Library']['subLocs'][4]['capacity']}</p>
                            {this.state.wait_data['Geisel Library']['subLocs'][4]['busyness'] < 20 ? <p className='text-success'> Not Busy({this.state.wait_data['Geisel Library']['subLocs'][4]['busyness']}%)</p> :
                            this.state.wait_data['Geisel Library']['subLocs'][4]['busyness'] < 80 ? <p className='text-warning'> Busy({this.state.wait_data['Geisel Library']['subLocs'][4]['busyness']}%)</p> :
                            <p className='text-danger'> Very Busy({this.state.wait_data['Geisel Library']['subLocs'][4]['busyness']}%)</p>}
                            {this.state.wait_data['Geisel Library']['subLocs'][4]['busyness'] < 20 ? <ProgressBar animated='true' striped variant='success' now={this.state.wait_data['Geisel Library']['subLocs'][4]['busyness']} label={`${this.state.wait_data['Geisel Library']['subLocs'][4]['busyness']}%`} /> :
                            this.state.wait_data['Geisel Library']['subLocs'][4]['busyness'] < 80 ? <ProgressBar animated='true' striped variant='warning' now={this.state.wait_data['Geisel Library']['subLocs'][4]['busyness']} label={`${this.state.wait_data['Geisel Library']['subLocs'][4]['busyness']}%`} /> :
                            <ProgressBar animated='true' striped variant='danger' now={this.state.wait_data['Geisel Library']['subLocs'][4]['busyness']} label={`${this.state.wait_data['Geisel Library']['subLocs'][4]['busyness']}%`} />}
                            </Accordion.Body>
                            <Accordion.Body>
                            <h5>
                                5th Floor                    
                            </h5>
                            <p className='fw-light fs-6 text-muted'>Capacity: {this.state.wait_data['Geisel Library']['subLocs'][5]['capacity']}</p>
                            {this.state.wait_data['Geisel Library']['subLocs'][5]['busyness'] < 20 ? <p className='text-success'> Not Busy({this.state.wait_data['Geisel Library']['subLocs'][5]['busyness']}%)</p> :
                            this.state.wait_data['Geisel Library']['subLocs'][5]['busyness'] < 80 ? <p className='text-warning'> Busy({this.state.wait_data['Geisel Library']['subLocs'][5]['busyness']}%)</p> :
                            <p className='text-danger'> Very Busy({this.state.wait_data['Geisel Library']['subLocs'][5]['busyness']}%)</p>}
                            {this.state.wait_data['Geisel Library']['subLocs'][5]['busyness'] < 20 ? <ProgressBar animated='true' striped variant='success' now={this.state.wait_data['Geisel Library']['subLocs'][5]['busyness']} label={`${this.state.wait_data['Geisel Library']['subLocs'][5]['busyness']}%`} /> :
                            this.state.wait_data['Geisel Library']['subLocs'][5]['busyness'] < 80 ? <ProgressBar animated='true' striped variant='warning' now={this.state.wait_data['Geisel Library']['subLocs'][5]['busyness']} label={`${this.state.wait_data['Geisel Library']['subLocs'][5]['busyness']}%`} /> :
                            <ProgressBar animated='true' striped variant='danger' now={this.state.wait_data['Geisel Library']['subLocs'][5]['busyness']} label={`${this.state.wait_data['Geisel Library']['subLocs'][5]['busyness']}%`} />}
                            </Accordion.Body>
                            <Accordion.Body>
                            <h5>
                                6th Floor                    
                            </h5>
                            <p className='fw-light fs-6 text-muted'>Capacity: {this.state.wait_data['Geisel Library']['subLocs'][6]['capacity']}</p>
                            {this.state.wait_data['Geisel Library']['subLocs'][6]['busyness'] < 20 ? <p className='text-success'> Not Busy({this.state.wait_data['Geisel Library']['subLocs'][6]['busyness']}%)</p> :
                            this.state.wait_data['Geisel Library']['subLocs'][6]['busyness'] < 80 ? <p className='text-warning'> Busy({this.state.wait_data['Geisel Library']['subLocs'][6]['busyness']}%)</p> :
                            <p className='text-danger'> Very Busy({this.state.wait_data['Geisel Library']['subLocs'][6]['busyness']}%)</p>}
                            {this.state.wait_data['Geisel Library']['subLocs'][6]['busyness'] < 20 ? <ProgressBar animated='true' striped variant='success' now={this.state.wait_data['Geisel Library']['subLocs'][6]['busyness']} label={`${this.state.wait_data['Geisel Library']['subLocs'][6]['busyness']}%`} /> :
                            this.state.wait_data['Geisel Library']['subLocs'][6]['busyness'] < 80 ? <ProgressBar animated='true' striped variant='warning' now={this.state.wait_data['Geisel Library']['subLocs'][6]['busyness']} label={`${this.state.wait_data['Geisel Library']['subLocs'][6]['busyness']}%`} /> :
                            <ProgressBar animated='true' striped variant='danger' now={this.state.wait_data['Geisel Library']['subLocs'][6]['busyness']} label={`${this.state.wait_data['Geisel Library']['subLocs'][6]['busyness']}%`} />}
                            </Accordion.Body>
                            <Accordion.Body>
                            <h5>
                                7th Floor                    
                            </h5>
                            <p className='fw-light fs-6 text-muted'>Capacity: {this.state.wait_data['Geisel Library']['subLocs'][7]['capacity']}</p>
                            {this.state.wait_data['Geisel Library']['subLocs'][7]['busyness'] < 20 ? <p className='text-success'> Not Busy({this.state.wait_data['Geisel Library']['subLocs'][7]['busyness']}%)</p> :
                            this.state.wait_data['Geisel Library']['subLocs'][7]['busyness'] < 80 ? <p className='text-warning'> Busy({this.state.wait_data['Geisel Library']['subLocs'][7]['busyness']}%)</p> :
                            <p className='text-danger'> Very Busy({this.state.wait_data['Geisel Library']['subLocs'][7]['busyness']}%)</p>}
                            {this.state.wait_data['Geisel Library']['subLocs'][7]['busyness'] < 20 ? <ProgressBar animated='true' striped variant='success' now={this.state.wait_data['Geisel Library']['subLocs'][7]['busyness']} label={`${this.state.wait_data['Geisel Library']['subLocs'][7]['busyness']}%`} /> :
                            this.state.wait_data['Geisel Library']['subLocs'][7]['busyness'] < 80 ? <ProgressBar animated='true' striped variant='warning' now={this.state.wait_data['Geisel Library']['subLocs'][7]['busyness']} label={`${this.state.wait_data['Geisel Library']['subLocs'][7]['busyness']}%`} /> :
                            <ProgressBar animated='true' striped variant='danger' now={this.state.wait_data['Geisel Library']['subLocs'][7]['busyness']} label={`${this.state.wait_data['Geisel Library']['subLocs'][7]['busyness']}%`} />}
                            </Accordion.Body>
                            <Accordion.Body>
                            <h5>
                                8th Floor                    
                            </h5>
                            <p className='fw-light fs-6 text-muted'>Capacity: {this.state.wait_data['Geisel Library']['subLocs'][8]['capacity']}</p>
                            {this.state.wait_data['Geisel Library']['subLocs'][8]['busyness'] < 20 ? <p className='text-success'> Not Busy({this.state.wait_data['Geisel Library']['subLocs'][8]['busyness']}%)</p> :
                            this.state.wait_data['Geisel Library']['subLocs'][8]['busyness'] < 80 ? <p className='text-warning'> Busy({this.state.wait_data['Geisel Library']['subLocs'][8]['busyness']}%)</p> :
                            <p className='text-danger'> Very Busy({this.state.wait_data['Geisel Library']['subLocs'][8]['busyness']}%)</p>}
                            {this.state.wait_data['Geisel Library']['subLocs'][8]['busyness'] < 20 ? <ProgressBar animated='true' striped variant='success' now={this.state.wait_data['Geisel Library']['subLocs'][8]['busyness']} label={`${this.state.wait_data['Geisel Library']['subLocs'][8]['busyness']}%`} /> :
                            this.state.wait_data['Geisel Library']['subLocs'][8]['busyness'] < 80 ? <ProgressBar animated='true' striped variant='warning' now={this.state.wait_data['Geisel Library']['subLocs'][8]['busyness']} label={`${this.state.wait_data['Geisel Library']['subLocs'][8]['busyness']}%`} /> :
                            <ProgressBar animated='true' striped variant='danger' now={this.state.wait_data['Geisel Library']['subLocs'][8]['busyness']} label={`${this.state.wait_data['Geisel Library']['subLocs'][8]['busyness']}%`} />}
                            </Accordion.Body>
                            <Accordion.Body>
                            <h5>
                                Teaching and Learning Commons                    
                            </h5>
                            <p className='fw-light fs-6 text-muted'>Capacity: {this.state.wait_data['Geisel Library']['subLocs'][9]['capacity']}</p>
                            {this.state.wait_data['Geisel Library']['subLocs'][9]['busyness'] < 20 ? <p className='text-success'> Not Busy({this.state.wait_data['Geisel Library']['subLocs'][9]['busyness']}%)</p> :
                            this.state.wait_data['Geisel Library']['subLocs'][9]['busyness'] < 80 ? <p className='text-warning'> Busy({this.state.wait_data['Geisel Library']['subLocs'][9]['busyness']}%)</p> :
                            <p className='text-danger'> Very Busy({this.state.wait_data['Geisel Library']['subLocs'][9]['busyness']}%)</p>}
                            {this.state.wait_data['Geisel Library']['subLocs'][9]['busyness'] < 20 ? <ProgressBar animated='true' striped variant='success' now={this.state.wait_data['Geisel Library']['subLocs'][9]['busyness']} label={`${this.state.wait_data['Geisel Library']['subLocs'][9]['busyness']}%`} /> :
                            this.state.wait_data['Geisel Library']['subLocs'][9]['busyness'] < 80 ? <ProgressBar animated='true' striped variant='warning' now={this.state.wait_data['Geisel Library']['subLocs'][9]['busyness']} label={`${this.state.wait_data['Geisel Library']['subLocs'][9]['busyness']}%`} /> :
                            <ProgressBar animated='true' striped variant='danger' now={this.state.wait_data['Geisel Library']['subLocs'][9]['busyness']} label={`${this.state.wait_data['Geisel Library']['subLocs'][9]['busyness']}%`} />}
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey='1'>
                            <Accordion.Header>RIMAC Fitness Gym</Accordion.Header>
                            <Accordion.Body>
                            <p className='fw-light fs-6 text-muted'>Capacity: {this.state.wait_data['RIMAC Fitness Gym']['capacity']}</p>

                            {this.state.wait_data['RIMAC Fitness Gym']['busyness'] < 20 ? <p className='text-success'> Not Busy({this.state.wait_data['RIMAC Fitness Gym']['busyness']}%)</p> :
                            this.state.wait_data['RIMAC Fitness Gym']['busyness'] < 80 ? <p className='text-warning'> Busy({this.state.wait_data['RIMAC Fitness Gym']['busyness']}%)</p> :
                            <p className='text-danger'> Very Busy({this.state.wait_data['RIMAC Fitness Gym']['busyness']}%)</p>}
                            {this.state.wait_data['RIMAC Fitness Gym']['busyness'] < 20 ? <ProgressBar animated='true' striped variant='success' now={this.state.wait_data['RIMAC Fitness Gym']['busyness']} label={`${this.state.wait_data['RIMAC Fitness Gym']['busyness']}%`} /> :
                            this.state.wait_data['RIMAC Fitness Gym']['busyness'] < 80 ? <ProgressBar animated='true' striped variant='warning' now={this.state.wait_data['RIMAC Fitness Gym']['busyness']} label={`${this.state.wait_data['RIMAC Fitness Gym']['busyness']}%`} /> :
                            <ProgressBar animated='true' striped variant='danger' now={this.state.wait_data['RIMAC Fitness Gym']['busyness']} label={`${this.state.wait_data['RIMAC Fitness Gym']['busyness']}%`} />}
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey='2'>
                            <Accordion.Header>Main Gym</Accordion.Header>
                            <Accordion.Body>
                            <p className='fw-light fs-6 text-muted'>Capacity: {this.state.wait_data['Main Gym']['capacity']}</p>

                            {this.state.wait_data['Main Gym']['busyness'] < 20 ? <p className='text-success'> Not Busy({this.state.wait_data['Main Gym']['busyness']}%)</p> :
                            this.state.wait_data['Main Gym']['busyness'] < 80 ? <p className='text-warning'> Busy({this.state.wait_data['Main Gym']['busyness']}%)</p> :
                            <p className='text-danger'> Very Busy({this.state.wait_data['Main Gym']['busyness']}%)</p>}
                            {this.state.wait_data['Main Gym']['busyness'] < 20 ? <ProgressBar animated='true' striped variant='success' now={this.state.wait_data['Main Gym']['busyness']} label={`${this.state.wait_data['Main Gym']['busyness']}%`} /> :
                            this.state.wait_data['Main Gym']['busyness'] < 80 ? <ProgressBar animated='true' striped variant='warning' now={this.state.wait_data['Main Gym']['busyness']} label={`${this.state.wait_data['Main Gym']['busyness']}%`} /> :
                            <ProgressBar animated='true' striped variant='danger' now={this.state.wait_data['Main Gym']['busyness']} label={`${this.state.wait_data['Main Gym']['busyness']}%`} />}
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey='3'>
                            <Accordion.Header>Cafe Ventanas</Accordion.Header>
                            <Accordion.Body>
                            <p className='fw-light fs-6 text-muted'>Capacity: {this.state.wait_data['Cafe Ventanas']['capacity']}</p>

                            {this.state.wait_data['Cafe Ventanas']['busyness'] < 20 ? <p className='text-success'> Not Busy({this.state.wait_data['Cafe Ventanas']['busyness']}%)</p> :
                            this.state.wait_data['Cafe Ventanas']['busyness'] < 80 ? <p className='text-warning'> Busy({this.state.wait_data['Cafe Ventanas']['busyness']}%)</p> :
                            <p className='text-danger'> Very Busy({this.state.wait_data['Cafe Ventanas']['busyness']}%)</p>}
                            {this.state.wait_data['Cafe Ventanas']['busyness'] < 20 ? <ProgressBar animated='true' striped variant='success' now={this.state.wait_data['Cafe Ventanas']['busyness']} label={`${this.state.wait_data['Cafe Ventanas']['busyness']}%`} /> :
                            this.state.wait_data['Cafe Ventanas']['busyness'] < 80 ? <ProgressBar animated='true' striped variant='warning' now={this.state.wait_data['Cafe Ventanas']['busyness']} label={`${this.state.wait_data['Cafe Ventanas']['busyness']}%`} /> :
                            <ProgressBar animated='true' striped variant='danger' now={this.state.wait_data['Cafe Ventanas']['busyness']} label={`${this.state.wait_data['Cafe Ventanas']['busyness']}%`} />}
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey='4'>
                            <Accordion.Header>6th Restaurant</Accordion.Header>

                            <Accordion.Body>
                            <h5>
                                {this.state.wait_data['6th Restaurant']['subLocs'][0]['name']}
                            </h5>
                            <p className='fw-light fs-6 text-muted'>Capacity: {this.state.wait_data['6th Restaurant']['subLocs'][0]['capacity']}</p>

                            {this.state.wait_data['6th Restaurant']['subLocs'][0]['busyness'] < 20 ? <p className='text-success'> Not Busy({this.state.wait_data['6th Restaurant']['subLocs'][0]['busyness']}%)</p> :
                            this.state.wait_data['6th Restaurant']['subLocs'][0]['busyness'] < 80 ? <p className='text-warning'> Busy({this.state.wait_data['6th Restaurant']['subLocs'][0]['busyness']}%)</p> :
                            <p className='text-danger'> Very Busy({this.state.wait_data['6th Restaurant']['subLocs'][0]['busyness']}%)</p>}
                            {this.state.wait_data['6th Restaurant']['subLocs'][0]['busyness'] < 20 ? <ProgressBar animated='true' striped variant='success' now={this.state.wait_data['6th Restaurant']['subLocs'][0]['busyness']} label={`${this.state.wait_data['6th Restaurant']['subLocs'][0]['busyness']}%`} /> :
                            this.state.wait_data['6th Restaurant']['subLocs'][0]['busyness'] < 80 ? <ProgressBar animated='true' striped variant='warning' now={this.state.wait_data['6th Restaurant']['subLocs'][0]['busyness']} label={`${this.state.wait_data['6th Restaurant']['subLocs'][0]['busyness']}%`} /> :
                            <ProgressBar animated='true' striped variant='danger' now={this.state.wait_data['6th Restaurant']['subLocs'][0]['busyness']} label={`${this.state.wait_data['6th Restaurant']['subLocs'][0]['busyness']}%`} />}
                            </Accordion.Body>

                            <Accordion.Body>
                            <h5>
                                {this.state.wait_data['6th Restaurant']['subLocs'][1]['name']}
                            </h5>
                            <p className='fw-light fs-6 text-muted'>Capacity: {this.state.wait_data['6th Restaurant']['subLocs'][1]['capacity']}</p>

                            {this.state.wait_data['6th Restaurant']['subLocs'][1]['busyness'] < 20 ? <p className='text-success'> Not Busy({this.state.wait_data['6th Restaurant']['subLocs'][1]['busyness']}%)</p> :
                            this.state.wait_data['6th Restaurant']['subLocs'][1]['busyness'] < 80 ? <p className='text-warning'> Busy({this.state.wait_data['6th Restaurant']['subLocs'][1]['busyness']}%)</p> :
                            <p className='text-danger'> Very Busy({this.state.wait_data['6th Restaurant']['subLocs'][1]['busyness']}%)</p>}
                            {this.state.wait_data['6th Restaurant']['subLocs'][1]['busyness'] < 20 ? <ProgressBar animated='true' striped variant='success' now={this.state.wait_data['6th Restaurant']['subLocs'][1]['busyness']} label={`${this.state.wait_data['6th Restaurant']['subLocs'][1]['busyness']}%`} /> :
                            this.state.wait_data['6th Restaurant']['subLocs'][1]['busyness'] < 80 ? <ProgressBar animated='true' striped variant='warning' now={this.state.wait_data['6th Restaurant']['subLocs'][1]['busyness']} label={`${this.state.wait_data['6th Restaurant']['subLocs'][1]['busyness']}%`} /> :
                            <ProgressBar animated='true' striped variant='danger' now={this.state.wait_data['6th Restaurant']['subLocs'][1]['busyness']} label={`${this.state.wait_data['6th Restaurant']['subLocs'][1]['busyness']}%`} />}
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey='5'>
                            <Accordion.Header>The Bistro</Accordion.Header>
                            <Accordion.Body>
                            <p className='fw-light fs-6 text-muted'>Capacity: {this.state.wait_data['The Bistro']['capacity']}</p>

                            {this.state.wait_data['The Bistro']['busyness'] < 20 ? <p className='text-success'> Not Busy({this.state.wait_data['The Bistro']['busyness']}%)</p> :
                            this.state.wait_data['The Bistro']['busyness'] < 80 ? <p className='text-warning'> Busy({this.state.wait_data['The Bistro']['busyness']}%)</p> :
                            <p className='text-danger'> Very Busy({this.state.wait_data['The Bistro']['busyness']}%)</p>}
                            {this.state.wait_data['The Bistro']['busyness'] < 20 ? <ProgressBar animated='true' striped variant='success' now={this.state.wait_data['The Bistro']['busyness']} label={`${this.state.wait_data['The Bistro']['busyness']}%`} /> :
                            this.state.wait_data['The Bistro']['busyness'] < 80 ? <ProgressBar animated='true' striped variant='warning' now={this.state.wait_data['The Bistro']['busyness']} label={`${this.state.wait_data['The Bistro']['busyness']}%`} /> :
                            <ProgressBar animated='true' striped variant='danger' now={this.state.wait_data['The Bistro']['busyness']} label={`${this.state.wait_data['The Bistro']['busyness']}%`} />}
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey='6'>
                            <Accordion.Header>Canyon Vista</Accordion.Header>
                            <Accordion.Body>
                            <p className='fw-light fs-6 text-muted'>Capacity: {this.state.wait_data['Canyon Vista']['capacity']}</p>

                            {this.state.wait_data['Canyon Vista']['busyness'] < 20 ? <p className='text-success'> Not Busy({this.state.wait_data['Canyon Vista']['busyness']}%)</p> :
                            this.state.wait_data['Canyon Vista']['busyness'] < 80 ? <p className='text-warning'> Busy({this.state.wait_data['Canyon Vista']['busyness']}%)</p> :
                            <p className='text-danger'> Very Busy({this.state.wait_data['Canyon Vista']['busyness']}%)</p>}
                            {this.state.wait_data['Canyon Vista']['busyness'] < 20 ? <ProgressBar animated='true' striped variant='success' now={this.state.wait_data['Canyon Vista']['busyness']} label={`${this.state.wait_data['Canyon Vista']['busyness']}%`} /> :
                            this.state.wait_data['Canyon Vista']['busyness'] < 80 ? <ProgressBar animated='true' striped variant='warning' now={this.state.wait_data['Canyon Vista']['busyness']} label={`${this.state.wait_data['Canyon Vista']['busyness']}%`} /> :
                            <ProgressBar animated='true' striped variant='danger' now={this.state.wait_data['Canyon Vista']['busyness']} label={`${this.state.wait_data['Canyon Vista']['busyness']}%`} />}
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey='7'>
                            <Accordion.Header>64 Degrees</Accordion.Header>
                            <Accordion.Body>
                            <p className='fw-light fs-6 text-muted'>Capacity: {this.state.wait_data['64 Degrees']['capacity']}</p>

                            {this.state.wait_data['64 Degrees']['busyness'] < 20 ? <p className='text-success'> Not Busy({this.state.wait_data['64 Degrees']['busyness']}%)</p> :
                            this.state.wait_data['64 Degrees']['busyness'] < 80 ? <p className='text-warning'> Busy({this.state.wait_data['64 Degrees']['busyness']}%)</p> :
                            <p className='text-danger'> Very Busy({this.state.wait_data['64 Degrees']['busyness']}%)</p>}
                            {this.state.wait_data['64 Degrees']['busyness'] < 20 ? <ProgressBar animated='true' striped variant='success' now={this.state.wait_data['64 Degrees']['busyness']} label={`${this.state.wait_data['64 Degrees']['busyness']}%`} /> :
                            this.state.wait_data['64 Degrees']['busyness'] < 80 ? <ProgressBar animated='true' striped variant='warning' now={this.state.wait_data['64 Degrees']['busyness']} label={`${this.state.wait_data['64 Degrees']['busyness']}%`} /> :
                            <ProgressBar animated='true' striped variant='danger' now={this.state.wait_data['64 Degrees']['busyness']} label={`${this.state.wait_data['64 Degrees']['busyness']}%`} />}
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey='8'>
                            <Accordion.Header>Foodworx</Accordion.Header>
                            <Accordion.Body>
                            <p className='fw-light fs-6 text-muted'>Capacity: {this.state.wait_data['Foodworx']['capacity']}</p>

                            {this.state.wait_data['Foodworx']['busyness'] < 20 ? <p className='text-success'> Not Busy({this.state.wait_data['Foodworx']['busyness']}%)</p> :
                            this.state.wait_data['Foodworx']['busyness'] < 80 ? <p className='text-warning'> Busy({this.state.wait_data['Foodworx']['busyness']}%)</p> :
                            <p className='text-danger'> Very Busy({this.state.wait_data['Foodworx']['busyness']}%)</p>}
                            {this.state.wait_data['Foodworx']['busyness'] < 20 ? <ProgressBar animated='true' striped variant='success' now={this.state.wait_data['Foodworx']['busyness']} label={`${this.state.wait_data['Foodworx']['busyness']}%`} /> :
                            this.state.wait_data['Foodworx']['busyness'] < 80 ? <ProgressBar animated='true' striped variant='warning' now={this.state.wait_data['Foodworx']['busyness']} label={`${this.state.wait_data['Foodworx']['busyness']}%`} /> :
                            <ProgressBar animated='true' striped variant='danger' now={this.state.wait_data['Foodworx']['busyness']} label={`${this.state.wait_data['Foodworx']['busyness']}%`} />}
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey='9'>
                            <Accordion.Header>Pines</Accordion.Header>
                            <Accordion.Body>
                            <p className='fw-light fs-6 text-muted'>Capacity: {this.state.wait_data['Pines']['capacity']}</p>

                            {this.state.wait_data['Pines']['busyness'] < 20 ? <p className='text-success'> Not Busy({this.state.wait_data['Pines']['busyness']}%)</p> :
                            this.state.wait_data['Pines']['busyness'] < 80 ? <p className='text-warning'> Busy({this.state.wait_data['Pines']['busyness']}%)</p> :
                            <p className='text-danger'> Very Busy({this.state.wait_data['Pines']['busyness']}%)</p>}
                            {this.state.wait_data['Pines']['busyness'] < 20 ? <ProgressBar animated='true' striped variant='success' now={this.state.wait_data['Pines']['busyness']} label={`${this.state.wait_data['Pines']['busyness']}%`} /> :
                            this.state.wait_data['Pines']['busyness'] < 80 ? <ProgressBar animated='true' striped variant='warning' now={this.state.wait_data['Pines']['busyness']} label={`${this.state.wait_data['Pines']['busyness']}%`} /> :
                            <ProgressBar animated='true' striped variant='danger' now={this.state.wait_data['Pines']['busyness']} label={`${this.state.wait_data['Pines']['busyness']}%`} />}
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey='10'>
                            <Accordion.Header>OceanView Terrace</Accordion.Header>
                            <Accordion.Body>
                            <p className='fw-light fs-6 text-muted'>Capacity: {this.state.wait_data['OceanView Terrace']['capacity']}</p>

                            {this.state.wait_data['OceanView Terrace']['busyness'] < 20 ? <p className='text-success'> Not Busy({this.state.wait_data['OceanView Terrace']['busyness']}%)</p> :
                            this.state.wait_data['OceanView Terrace']['busyness'] < 80 ? <p className='text-warning'> Busy({this.state.wait_data['OceanView Terrace']['busyness']}%)</p> :
                            <p className='text-danger'> Very Busy({this.state.wait_data['OceanView Terrace']['busyness']}%)</p>}
                            {this.state.wait_data['OceanView Terrace']['busyness'] < 20 ? <ProgressBar animated='true' striped variant='success' now={this.state.wait_data['OceanView Terrace']['busyness']} label={`${this.state.wait_data['OceanView Terrace']['busyness']}%`} /> :
                            this.state.wait_data['OceanView Terrace']['busyness'] < 80 ? <ProgressBar animated='true' striped variant='warning' now={this.state.wait_data['OceanView Terrace']['busyness']} label={`${this.state.wait_data['OceanView Terrace']['busyness']}%`} /> :
                            <ProgressBar animated='true' striped variant='danger' now={this.state.wait_data['OceanView Terrace']['busyness']} label={`${this.state.wait_data['OceanView Terrace']['busyness']}%`} />}
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey='11'>
                            <Accordion.Header>Club Med</Accordion.Header>
                            <Accordion.Body>
                            <p className='fw-light fs-6 text-muted'>Capacity: {this.state.wait_data['Club Med']['capacity']}</p>

                            {this.state.wait_data['Club Med']['busyness'] < 20 ? <p className='text-success'> Not Busy({this.state.wait_data['Club Med']['busyness']}%)</p> :
                            this.state.wait_data['Club Med']['busyness'] < 80 ? <p className='text-warning'> Busy({this.state.wait_data['Club Med']['busyness']}%)</p> :
                            <p className='text-danger'> Very Busy({this.state.wait_data['Club Med']['busyness']}%)</p>}
                            {this.state.wait_data['Club Med']['busyness'] < 20 ? <ProgressBar animated='true' striped variant='success' now={this.state.wait_data['Club Med']['busyness']} label={`${this.state.wait_data['Club Med']['busyness']}%`} /> :
                            this.state.wait_data['Club Med']['busyness'] < 80 ? <ProgressBar animated='true' striped variant='warning' now={this.state.wait_data['Club Med']['busyness']} label={`${this.state.wait_data['Club Med']['busyness']}%`} /> :
                            <ProgressBar animated='true' striped variant='danger' now={this.state.wait_data['Club Med']['busyness']} label={`${this.state.wait_data['Club Med']['busyness']}%`} />}
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

