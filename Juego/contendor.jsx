

import "./style2.css"
// import Game from "./Game2.jsx"
import Game from "./Game2.jsx"


const GameContainer = () => {
    return (
        <>
            <div id="game-container" tabindex="0">
                <div id="question-container" style={{display: "none"}}>
                    <div id="question"></div>
                    <button class="option-btn" id="optionA"></button>
                    <button class="option-btn" id="optionB"></button>
                    <button class="option-btn" id="optionC"></button>
                    <button class="option-btn" id="optionD"></button>
                </div>
            </div>
            <Game/>

            {/* <iframe title="Juego" src="index2.html" width="100%" height="100%" frameBorder="0"></iframe> */}
        </>
    );
}

export default GameContainer;
