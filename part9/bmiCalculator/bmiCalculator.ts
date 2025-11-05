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

console.log(calculateBmi(180, 74));

// underweight (under 18.5 kg/m2),
// normal weight (18.5 to 24.9),
// overweight (25 to 29.9), and
// obese (30 or more).

//kg/m2
//m = height / 100
//bmi = weight / (m * m)
