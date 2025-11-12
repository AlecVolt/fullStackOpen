import CoursePart from './CoursePart';

const Content = ({ courseParts }: { courseParts: { name: string; exerciseCount: number }[] }) => {
  return courseParts.map((part) => <CoursePart key={part.name} name={part.name} exerciseCount={part.exerciseCount} />);
};

export default Content;
