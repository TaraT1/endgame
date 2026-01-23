import React, {useState} from "react"
import {clsx} from "clsx"
import { languages } from "./languages"
import { getRandomWord, getFarewellText } from "./utils" 
import Confetti from "react-confetti"

export default function AssemblyEndgame() {
    //state values
    const [currentWord, setCurrentWord] = React.useState(() => getRandomWord().toUpperCase())//lazy state initialization
    const [letterGuess, setLetterGuess] = React.useState([])

    //derived values
    //incorrect guesses
    
    const wrongGuessCount = letterGuess.filter(letter => !currentWord.includes(letter)).length
    const isGameWon = 
        currentWord.split("").every(letter => letterGuess.includes(letter))
    const isGameLost = 
        wrongGuessCount > languages.length - 1
    const isGameOver = isGameWon || isGameLost

    const lastGuessedLetter = letterGuess[letterGuess.length - 1]
    const isLastGuessWrong = lastGuessedLetter && !(currentWord.includes(lastGuessedLetter))

    //Static values
    //For language badges
    const languageElements = languages.map((language, index) => {
        const isLanguageLost = index < wrongGuessCount
        const styles = {
            backgroundColor: language.backgroundColor,
            color: language.color
        }
        const className = clsx("badge", isLanguageLost && "lost")
        return (
            <span 
                className={className}
                key={language.name} 
                style={styles}
                > {language.name}
            </span>
        )
    })

    //For word to be guessed
    const letterElements = currentWord.split('').map((letter, index) => {
        const revealLetter = isGameLost || letterGuess.includes(letter)
        const letterClassName = clsx(
            isGameLost && !letterGuess.includes(letter) &&  "missed-letter" 
        )
        return (
            <span key={index} className={letterClassName}> 
                {revealLetter ?  letter.toUpperCase() : ""}
            </span>
    )})

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

    //Reset game
    function newGame() {
        //new word, reset keyboard
        setCurrentWord(getRandomWord())
        setLetterGuess([])
    }

    //Update keyboard for incorrect or correct guesses
    const keyboardElements = keyboardKeys.map(letter => {
        const isGuess = letterGuess.includes(letter)
        const isInWord = isGuess && currentWord.includes(letter) 
        const isNotInWord = isGuess && !currentWord.includes(letter) 

        const className = clsx ({
            correct: isInWord,
            wrong: isNotInWord
        })


        return (
            <button 
                className={className}
                key={letter} 
                disabled={isGameOver}
                aria-disabled={isGuess}
                aria-label={`letter ${letter}`}
                onClick={() => addLetterGuess(letter)}
            > 
                {letter.toUpperCase()}
            </button>
        )
    })

    const gameStatusClass = clsx("game-status", {
        won: isGameWon,
        lost: isGameLost,
        farewell: !isGameOver && isLastGuessWrong
    })

    function renderGameStatus() {
        if (!isGameOver && isLastGuessWrong) {
            return (
            <p className="farewell-message"> 
                {getFarewellText(languages[wrongGuessCount - 1].name)}
            </p>
            )
        }

        if (!isGameOver) {
            return null
        }

        if (isGameWon) {
            return (
                <>
                    <h2>You win!</h2>
                    <p>Well done!🎉</p> 
                </>
            )
        } 
        
        if (isGameLost) {
            return (
                <>
                    <h2>Game Over!</h2>
                    <p> You lose! Better start learning Assembly 😭</p>
                </>
            )
        }
    }

    return (
        <main>
            {
                isGameWon && 
                    <Confetti 
                        recycle={false}
                        numberOfPieces={1000}
                    />
            }
            <header>
                <h1>Assembly: Endgame</h1>
                <p>Guess the word in under 8 attempts to keep the programming world safe from Assembly!</p>
            </header>

            <section 
                aria-live="polite" 
                role="status" 
                className={gameStatusClass}
            >
                {renderGameStatus()}
            </section>

            <section className="languages">
                {languageElements}
            </section>

            <section className="word">
                {letterElements}
            </section>

            {/* Screen reader only section for game updates */}
            <section className="sr-only"
                aria-live="polite"
                role="status"
            >
                <p>
                    {currentWord.includes(lastGuessedLetter) ? 
                        `Correct! The letter ${lastGuessedLetter} is in the word.` :
                        `Sorry! The letter ${lastGuessedLetter} is not in the word.`}

                        You have ${languages.length - 1} guesses remaining.
                </p>
                <p>Current word: {currentWord.split("").map(letter => letterGuess.includes(letter) ? letter + "." : "blank.").join(" ")}</p>

            </section>

            <section className="keyboard">
                {keyboardElements}
            </section>

            {isGameOver && <button className="new-game" onClick={newGame}>New Game</button>}

        </main>
    )
}

