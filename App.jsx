import React from "react"
import languages from "./languages"

export default function AssemblyEndgame() {

    const [word, setWord] = React.useState("react")
    const alphabets="ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const [gletters,setGletters] = React.useState([])
    const wg = gletters.filter(letter => !word.toUpperCase().includes(letter)).length
    const isGameWon = word.toUpperCase().split("").every(letter => gletters.includes(letter));
    const isGameLost = (wg >= languages.length - 1);
    const isGameOver = (isGameWon || isGameLost);

    const letters = word.toUpperCase().split("")
    const letter = letters.map((letter,index) => (
        <span key={index} className="letter">{gletters.includes(letter) ? letter : " "} </span>
        )
    )

    const alphabet = alphabets.split("").map(letter => (
        <button key={letter} className="keyboard-key" onClick={() => addguess(letter)} style={{ 
            backgroundColor: gletters.includes(letter) ? (word.toUpperCase().includes(letter) ? "#10A95B" : "#EC5D49") 
            : "#ffeb14" 
        }
            }>{letter}
        </button>
        )
    )    

    function addguess(letter){
        setGletters(prev => prev.includes(letter) ? prev : [...prev,letter])
    }

    function Newgame(){
        setGletters([])
    }

    const languageElements = languages.map(language => (
        <div
            key={language.name}
            className={wg > languages.indexOf(language) ? "lost":"language-chip"}
            style={{
                backgroundColor: language.backgroundColor,
                color: language.color
            }}
        >
            {language.name}
        </div>
    ))
        

    return (
        <main>
            <header>
                <h1>Assembly: Endgame</h1>
                <p>Guess the word within 8 attempts to keep the
                programming world safe from Assembly!</p>
            </header>
            {isGameOver ? <section className={isGameWon ? "game-won":"game-lost"}>
                <h2>{isGameWon ? "You won!" : "You Lost!"}</h2>
                <p>{isGameWon ? "Well Done!" : "Better luck next time!"}</p>
            </section> : <section className="null"></section>} 
            <section>
                <div className="language-chips">
                    {languageElements}
                </div>
            </section>
            <section className="words">
                {letter}
            </section>
            <section className="keyboard">
                {alphabet}
            </section>
            {isGameOver && <button className="new-game" onClick={Newgame}>New Game</button>}
        </main>
    )
}
