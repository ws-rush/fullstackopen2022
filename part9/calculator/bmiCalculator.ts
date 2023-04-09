interface bmiProps {
	height: number,
	weight: number
}

export default function calculateBmi(cintemiters: number, kilograms: number): object {
	const bodymass = kilograms / Math.pow(cintemiters / 100, 2)
	let BMI: string = ''
	
	if (bodymass < 18.5) BMI = 'Underweight (Unhealthy)'
	else if (bodymass >= 18.5 && bodymass < 24.9) BMI = 'Normal range (Healthy)'
	else if (bodymass >= 25.0 && bodymass < 29.9) BMI = 'Overweight I (At risk)'
	else if (bodymass >= 30.5 && bodymass < 34.9) BMI = 'Overweight II (Moderately obese)'
	else if (bodymass >= 35.0 && bodymass < 39.9) BMI = 'Overweight III (Severely obese)'
	else BMI = 'Overweight IIII (visit doctor dude)'

	return {
		weight: kilograms,
		height: cintemiters,
		bmi: BMI
	}
}

function parseArgs(args: Array<string>): bmiProps {
	if (args.length < 4) throw new Error('Not enough arguments')
	else if (args.length > 4) throw new Error('Too much arguments')
	if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
		return {
			height: Number(args[2]),
			weight: Number(args[3])
		}
	} else {
		throw new Error('Provided values not all numbers!')
	}
}

try {
	const { height, weight }: bmiProps = parseArgs(process.argv)
	console.log(calculateBmi(height, weight))
} catch (err: unknown) {
	let errorMessage = 'Something bad happened.'
	if (err instanceof Error) {
		errorMessage += ' Error: ' + err.message;
	}
	console.log(errorMessage);
}