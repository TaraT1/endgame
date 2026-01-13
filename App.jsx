import React, {useState} from "react"
import {clsx} from "clsx"
import { languages } from "./languages"

export default function AssemblyEndgame() {
    //state values
    const [currentWord, setCurrentWord] = React.useState("react".toUpperCase())
    const [letterGuess, setLetterGuess] = React.useState([])

    //derived values
    //incorrect guesses
    const wrongGuessCount = letterGuess.filter(letter => !currentWord.includes(letter)).length

    //Static values
    //For language badges
    const languageElements = languages.map((language, index) => {
        const isLanguageLost = index < wrongGuessCount
        const styles = {
            backgroundColor: language.backgroundColor,
            color: language.color
        }
        return (
            <span 
                className={`badge ${isLanguageLost ? "lost" : ""}`}
                key={language.name} 
                style={styles}
                > {language.name}
            </span>
        )
    })

    //For word to be guessed
    const letterElements = currentWord.split('').map((letter, index) => (
        <span 
            key={index}
            > 
            {letterGuess.includes(letter) ?  letter.toUpperCase() : ""}
        </span>)
    )

    //Keyboard 
    const keyboardKeys = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('')

    // Guessed letters
    function addLetterGuess(letter) {
        // setLetterGuess(prevLetter => [...prevLetter, letter])//allows for duplicate letters; Can convert to Set, but forces re-render
        setLetterGuess(prevLetter => 
            prevLetter.includes(letter) ? 
            prevLetter : 
            [...prevLetter, letter]
        )
    }

    //Update keyboard for incorrect or correct guesses
    const keyboardElements = keyboardKeys.map(letter => {
        const isGuess = letterGuess.includes(letter)
        const isInWord = isGuess && currentWord.includes(letter) //background color: green
        const isNotInWord = isGuess && !currentWord.includes(letter) //background color: red
        const className = clsx ({
            correct: isInWord,
            wrong: isNotInWord
        })

        return (
            <button 
                className={className}
                key={letter} 
                onClick={() => addLetterGuess(letter)}
            > 
                {letter.toUpperCase()}
            </button>
        )
    })

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

