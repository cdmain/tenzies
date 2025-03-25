import { useState } from "react"
import Die from "./Die"

export default function Main() {

    const [die, setDie] = useState(generateAllNewDice())

    function generateAllNewDice() {
        return new Array(10)
            .fill(0)
            .map(() => Math.ceil(Math.random() * 6))
    }

    const rollDice = die.map(num => (
            <Die value={num} />
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