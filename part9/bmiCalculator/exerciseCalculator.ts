interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  targetHours: number;
  average: number;
}

interface HoursValues {
  targetHours: number;
  exerciseHours: number[];
}

const parseHoursValues = (args: string[]): HoursValues => {
  if (args.length < 4) throw new Error('Not enough arguments');

  const [, , targetHours, ...exerciseHours] = args;

  if (isNaN(Number(targetHours))) {
    throw new Error('Target hours must be a number');
  }

  for (const hours of exerciseHours) {
    if (isNaN(Number(hours))) {
      throw new Error('Exercise hours must be numbers');
    }
  }

  return {
    targetHours: Number(targetHours),
    exerciseHours: exerciseHours.map((hours) => Number(hours)),
  };
};

export const calculateExercises = (targetHours: number, exerciseHours: number[]): Result => {
  const average = exerciseHours.reduce((acc, curr) => acc + curr, 0) / exerciseHours.length;
  const rating = average / targetHours >= 1 ? 3 : average / targetHours >= 0.5 ? 2 : 1;
  const ratingDescription =
    rating === 3
      ? 'Great job, you met your target!'
      : rating === 2
      ? 'Not too bad but could be better'
      : 'You need to work harder';

  return {
    periodLength: exerciseHours.length,
    trainingDays: exerciseHours.filter((hours) => hours > 0).length,
    success: average >= targetHours,
    rating,
    ratingDescription,
    targetHours,
    average,
  };
};

try {
  const { targetHours, exerciseHours } = parseHoursValues(process.argv);
  console.log(calculateExercises(targetHours, exerciseHours));
} catch (error: unknown) {
  let errorMessage = 'Something went wrong: ';
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}

// console.log(calculateExercises(2, [3, 0, 2, 4.5, 0, 3, 1]));
// console.log(calculateExercises([3, 3, 2, 4.5, 0, 3.1, 1.3], 2));
// console.log(calculateExercises([0, 1, 0, 0.5, 0, 3, 0], 2));

// npm run calculateExercises 2 3 0 2 4.5 0 3 1
// npm run calculateExercises 2 3 3 2 4.5 0 3.1 1.3
// npm run calculateExercises 2 0 1 0 0.5 0 3 0

// npm run calculateExercises 2 1 0 2 4.5 0 3 1 0 4
