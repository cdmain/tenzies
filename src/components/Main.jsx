import { useState } from "react"
import { nanoid } from "nanoid"
import Die from "./Die"

export default function Main() {

    const [die, setDie] = useState(generateAllNewDice())

    function generateAllNewDice() {
        return new Array(10)
            .fill(0)
            .map(() => ({
                value: Math.ceil(Math.random() * 6), 
                isHeld: true,
                id: nanoid(10)
        }))
    }

    const rollDice = die.map(dieObj => (
            <Die key={dieObj.id} value={dieObj.value} />
        ))

    function reRollDice() {
        setDie(generateAllNewDice())
    }

    return (
        <main className="page">
            <div className="die-container">
                {rollDice}
            </div>
            <button className="rollButton" onClick={reRollDice}>Roll</button>
        </main>
    )
}