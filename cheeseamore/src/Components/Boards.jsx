import React from 'react';
import { Link } from "react-router-dom";
import '../CSS/Boards.css';
import Love from "../Assets/The Love Board.png";
import Chic from "../Assets/The Chic Board.png";
import Gourmet from "../Assets/The Gourmet Board.png";
import Chocolate from "../Assets/The Chocolate Board.png";

const HomepageBoards = () => {
    return (
        <div>
            <h2 className='boards-heading1'> Boards and Boxes </h2>
            <h3 className='boards-heading2'> Ready-to-eat platters </h3>
            <div>
                <div className='boards-grid'>
                    <div><img className="boards-image" src={Love} alt="" srcSet="" /> </div>
                    <div><img className="boards-image" src={Chocolate} alt="" srcSet="" /> </div>
                    <div><img className="boards-image" src={Chic} alt="" srcSet="" /> </div>
                    <div><img className="boards-image" src={Gourmet} alt="" srcSet="" /> </div>
                </div >
                <Link to="/Shop">
                    <button className='boards-button'> View more </button>
                </Link>
            </div >
        </div >
    );
};

export default HomepageBoards;