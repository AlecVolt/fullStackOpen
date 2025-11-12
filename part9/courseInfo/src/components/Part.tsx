import type { CoursePart } from '../types';

const PartHeader = ({ part }: { part: CoursePart }) => {
  return (
    <h3>
      {part.name} --- {part.exerciseCount}
    </h3>
  );
};

const Part = ({ part }: { part: CoursePart }) => {
  switch (part.kind) {
    case 'basic':
      return (
        <div>
          <PartHeader part={part} />
          <p>
            <i>{part.description}</i>
          </p>
        </div>
      );
    case 'group':
      return (
        <div>
          <PartHeader part={part} />
          <p>project exercises {part.groupProjectCount}</p>
        </div>
      );
    case 'background':
      return (
        <div>
          <PartHeader part={part} />
          <p>
            <i>{part.description}</i>
          </p>
          <p>more info {part.backgroundMaterial}</p>
        </div>
      );
    case 'special':
      return (
        <div>
          <PartHeader part={part} />
          <p>
            <i>{part.description}</i>
          </p>
          <p>required scills: {part.requirements.join(', ')}</p>
        </div>
      );
    default:
      break;
  }
};

export default Part;
