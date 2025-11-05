interface BodyValues {
  height: number;
  weight: number;
}

const parseBodyValues = (args: string[]): BodyValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

const calculateBmi = (height: number, weight: number): string => {
  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);

  if (bmi < 18.5) {
    return 'underweight';
  } else if (bmi < 25) {
    return 'normal weight';
  } else if (bmi < 30) {
    return 'overweight';
  } else {
    return 'obese';
  }
};

const bmiCalculator = (args: string[]): string => {
  if (require.main === module) {
    try {
      const { height, weight } = parseBodyValues(args);
      console.log(calculateBmi(height, weight));
      return calculateBmi(height, weight);
    } catch (error: unknown) {
      let errorMessage = 'Something went wrong: ';
      if (error instanceof Error) {
        errorMessage += error.message;
      }
      console.log(errorMessage);
      return errorMessage;
    }
  } else {
    const [height, weight] = args;
    return calculateBmi(Number(height), Number(weight));
  }
};

bmiCalculator(process.argv);
// console.log(bmiCalculator(['180', '74']));

export default bmiCalculator;
