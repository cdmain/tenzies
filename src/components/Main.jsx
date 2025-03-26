import { useState } from "react"
import { nanoid } from "nanoid"
import Die from "./Die"

export default function Main() {
    const [dice, setDice] = useState(generateAllNewDice())

    function generateAllNewDice() {
        return new Array(10)
            .fill(0)
            .map(() => ({
                value: Math.ceil(Math.random() * 6), 
                isHeld: false,
                id: nanoid(10)
        }))
    }

    function rollDice() {
        setDice(oldDice =>
            oldDice.map(die =>
                die.isHeld ? die : {...die, value: Math.ceil(Math.random()*6)}
            )
        )
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
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className="dice-container">
                {diceElements}
            </div>
            <button className="rollButton" onClick={rollDice}>Roll</button>
        </main>
    )
}