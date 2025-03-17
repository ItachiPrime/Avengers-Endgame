import React from "react"
import languages from "./languages"
import { getFarewellText } from "./utils"
import { useWindowSize } from 'react-use'
import Confetti from 'react-confetti'
import { getrandomword } from "./utils"

export default function AssemblyEndgame() {

    const { width, height } = useWindowSize()
    const [word, setWord] = React.useState(() => getrandomword())
    const alphabets="ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const [gletters,setGletters] = React.useState([])
    const wg = gletters.filter(letter => !word.toUpperCase().includes(letter)).length
    const isGameWon = word.toUpperCase().split("").every(letter => gletters.includes(letter));
    const isGameLost = (wg >= languages.length);
    const isGameOver = (isGameWon || isGameLost);

    const letters = word.toUpperCase().split("")
    const letter = letters.map((letter,index) => (
        <span key={index} className={(isGameLost && !gletters.includes(letter)) ? "missed-letter":"letter"}>{gletters.includes(letter) ? letter : isGameLost ? letter :" "} </span>
        )
    )

    console.log(word)

    const alphabet = alphabets.split("").map(letter => (
        <button key={letter} className="keyboard-key" onClick={() => addguess(letter)} style={{ 
            backgroundColor: gletters.includes(letter) ? (word.toUpperCase().includes(letter) ? "#10A95B" : "#EC5D49") 
            : "#ffeb14" 
        }
            } disabled={isGameOver}>{letter}
        </button>
        )
    )    

    function addguess(letter){
        setGletters(prev => prev.includes(letter) ? prev : [...prev,letter])
    }

    function Newgame(){
        setGletters([])
        setWord(getrandomword())
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
            <img src="favicon.png" className="logo"/>
                <h1>Avengers: Endgame</h1>
                <p>Guess the word within 10 attempts to keep the
                 world safe from Thanos!</p>
            </header>
            {isGameOver ? <section className={isGameWon ? "game-won":"game-lost"}>
                <h2>{isGameWon ? "You won!" : "You Lost!"}</h2>
                <p>{isGameWon ? "You did it… just like Iron Man!" : "The Avengers have been snapped... 💀"}</p>
                {isGameWon && <Confetti 
                width={width} 
                height={height} 
                recycle={false}
                numberOfPieces={1000}
                />}
            </section> : <section className={wg>0 ?"farewell": "null"}>
                {wg>0 && getFarewellText(languages[wg-1].name)}
                </section>} 
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
            {isGameOver && <button className="new-game" onClick={Newgame}>New Timeline</button>}
        </main>
    )
}
