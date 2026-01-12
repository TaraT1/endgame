import React, {useState} from "react"
import { languages } from "./languages"

export default function AssemblyEndgame() {
    const [currentWord, setCurrentWord] = React.useState("react")

    const [letterGuess, setLetterGuess] = React.useState([])

    const languageElements = languages.map(language => {
        const styles = {
            backgroundColor: language.backgroundColor,
            color: language.color
        }
        return (
            <span 
                className="language-badge" 
                key={language.name} 
                style={styles}
                > {language.name}
            </span>
        )
    })
    const letterElements = currentWord.split('').map((letter, index) => (
        <span key={index}
            > {letter.toUpperCase()}
        </span>)
    )

    const keyboardKeys = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('')

    // Guessed letters
    function addLetterGuess(letter) {
        // setLetterGuess(prevLetter => [...prevLetter, letter])//allows for duplicate letters
        setLetterGuess(prevLetter => 
            prevLetter.includes(letter) ? 
            prevLetter : 
            [...prevLetter, letter]
        )
    }

    const keyboardElements = keyboardKeys.map((letter) => (
        <button 
            key={letter} onClick={() => addLetterGuess(letter)}>
                {letter}
            </button>
    ))

    return (
        <main>
            <header>
                <h1>Assembly: Endgame</h1>
                <p>Guess the word in under 8 attempts to keep the programming world safe from Assembly!</p>
            </header>

            <section className="game-status">
                <h2>You win!</h2>
                <p>Well done!🎉</p>
            </section>

            <section className="languages">
                {languageElements}
            </section>

            <section className="word">
                {letterElements}
            </section>

            <section className="keyboard">
                {keyboardElements}
            </section>

            <button className="new-game">New Game</button>

        </main>

    )
}

