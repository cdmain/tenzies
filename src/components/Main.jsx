import { useState, useRef, useEffect } from "react"
import { nanoid } from "nanoid"
import { useWindowSize } from 'react-use'
import Confetti from 'react-confetti'
import Die from "./Die"

export default function Main() {
    const [dice, setDice] = useState(() => generateAllNewDice())

    const gameWon = dice.every(die => die.isHeld) &&
        dice.every(die => die.value === dice[0].value)

    const { width, height } = useWindowSize()

    const buttonRef = useRef(null)
        
    useEffect(() => {
        if (gameWon) {
            buttonRef.current.focus()
        }
    }, [gameWon])

    function generateAllNewDice() {
        return new Array(10)
            .fill(0)
            .map(() => ({
                value: 5,//Math.ceil(Math.random() * 6), 
                isHeld: false,
                id: nanoid(10)
        }))
    }

    function rollDice() {
        if (!gameWon){
            setDice(oldDice =>
                oldDice.map(die =>
                    die.isHeld ? die : {...die, value: Math.ceil(Math.random()*6)})
            )
        } else {
            setDice(generateAllNewDice())
        }
    }

    function hold(id) {
        setDice(oldDice => 
            oldDice.map(die =>
                die.id === id ? {...die, isHeld: !die.isHeld} : die
            )
        )
    }

    const diceElements = dice.map(dieObj => (
            <Die 
                key={dieObj.id} 
                value={dieObj.value}
                isHeld={dieObj.isHeld}
                hold={() => hold(dieObj.id)} 
            />
        ))

    return (
        <main className="page">
            {gameWon && <Confetti width={width} height={height}/>}
            <div aria-live="polite" className="sr-only">
                {gameWon && <p>Congratulations! You won! Press "New Game" to start again.</p>}
            </div>
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className="dice-container">
                {diceElements}
            </div>
            <button ref={buttonRef} className="rollButton" onClick={rollDice}
                >{gameWon ? "New Game" : "Roll"}
            </button>
        </main>
    )
}