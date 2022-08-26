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

                                Example: Capacity {this.state.wait_data['WongAvery Library']['capacity']}
                            </h5>
                            <p className='fw-light fs-6 text-muted'>Capacity: 150</p>
                            {this.state.gfste < 20 ? <p className='text-success'> Not Busy(..%)</p> :
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

