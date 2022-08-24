import React, { Component, useEffect, useState } from "react";
import './App.css';
import TutorBox from "./components/TutorBox";
import myjson from "./Sample.json";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


class Tutor extends Component {
    render() {
        return (
            <div>
                <div class="pt-4 pb-4 text-center text-secondary">
                    <h1>Tutors</h1>
                </div>
                <div class="row justify-content-center">
                    {myjson.tutor.map((tutor) => (
                            <TutorBox tutor={tutor} />
                    ))}
                </div>

            </div>
        );
    }
}

export default Tutor;