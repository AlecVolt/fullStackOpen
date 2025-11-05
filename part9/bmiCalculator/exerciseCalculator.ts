interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (exerciseHours: number[], target: number) => {
  const average = exerciseHours.reduce((acc, curr) => acc + curr, 0) / exerciseHours.length;
  const rating = average / target >= 1 ? 3 : average / target >= 0.5 ? 2 : 1;
  const ratingDescription =
    rating === 3
      ? 'Great job, you met your target!'
      : rating === 2
      ? 'Not too bad but could be better'
      : 'You need to work harder';

  return {
    periodLength: exerciseHours.length,
    trainingDays: exerciseHours.filter((hours) => hours > 0).length,
    success: average >= target,
    rating,
    ratingDescription,
    target,
    average,
  };
};

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
console.log(calculateExercises([3, 3, 2, 4.5, 0, 3.1, 1.3], 2));
console.log(calculateExercises([0, 1, 0, 0.5, 0, 3, 0], 2));
