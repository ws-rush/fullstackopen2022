interface result { 
	periodLength: number,
	trainingDays: number,
	success: boolean,
	rating: number,
	ratingDescription: string,
	target: number,
	average: number
}

interface argsProps {
	target: number,
	data: number[]
}

export default function calculateExercises(days: Array<number>, target: number): result {
	const metric = 3
	const average = days.reduce((a, b) => a + b) / days.length
	const rating = Math.floor((average / target) * metric)
	let ratingDescription = ''

	switch(rating) {
		case 0:
			ratingDescription = 'wakeup man!!'
			break
		case 1:
			ratingDescription = 'it is bad honsly'
			break
		case 2:
			ratingDescription = 'not too bad but could be better'
			break
		case 3:
			ratingDescription = 'you are great, keep it going'
			break
	}

	return {
		periodLength: days.length,
		trainingDays: days.filter(day => day).length,
		success: average === target,
		rating,
		ratingDescription,
		target,
		average
	}
}

function parseArguments(args: Array<string>): argsProps {
	if (args.length < 4) throw new Error('Not enough arguments')
	if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
		return {
			target: Number(args[2]),
			data: args.slice(3)
				.filter((arg: string): boolean => !isNaN(Number(arg)))
				.map((arg: string): number => Number(arg))
		}
	} else {
		throw new Error('Provided targe or any of data were not all numbers!')
	}
}

try {
	const { target, data }: argsProps = parseArguments(process.argv)
	console.log(calculateExercises(data, target))
} catch (err: unknown) {
	let errorMessage = 'Something bad happened.'
	if (err instanceof Error) {
		errorMessage += ' Error: ' + err.message;
	}
	console.log(errorMessage);
}