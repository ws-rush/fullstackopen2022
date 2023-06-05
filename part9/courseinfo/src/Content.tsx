import { CoursePart } from "./types";

const Content = ({ parts }: { parts: CoursePart[] }) => {
    return (
      <>
        {parts.map((part: any) => (
            <p key={part.id}>
                {part.name} {part.exerciseCount}
            </p>
        ))}
      </>
    );
  };
  
  export default Content;