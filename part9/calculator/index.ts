import express from 'express'
import calculateBmi from './bmiCalculator'
import calculateExercises from './exerciseCalculator'

const app = express()

app.get('/hello', (_req, res) => {
    res.send('Hello Fullstack!')
})

app.get('/bmi', (req, res) => {
    const { heigth, weight } = req.body

    if (weight && heigth) {
        res.json(calculateBmi(heigth, weight))
    } else {
        res.status(400).json({
            error: "malformatted parameters"
        })
    }
})

app.post('/exercises', (req, res) => {
    const { daily_exercises, target} = req.body
    
    if (!target || !daily_exercises)
        return res.status(400).json({ error: "parameters missing" })
    
    if (isNaN(Number(target)) || !Array.isArray(daily_exercises))
        return res.status(400).json({ error: "malformatted parameters" })
    return res.json(calculateExercises(daily_exercises, target))
})

const PORT= 3000

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})