import { CoursePart } from "../types";
import { assertNever } from "../utils/assert";

const Part = (props: CoursePart) => {
    switch (props.kind) {
        case "basic":
            return (
                <>
                    <h3> {props.name} {props.exerciseCount} </h3>
                    <p> {props.description} </p>
                </>
            );
        case "group":
            return (
                <>
                    <h3> {props.name} {props.exerciseCount} </h3>
                    <p> project exercises {props.groupProjectCount} </p>
                </>
            );
        case "background":
            return (
                <>
                    <h3> {props.name} {props.exerciseCount} </h3>
                    <i> {props.description} </i>
                    <br />
                    <a href={props.backgroundMaterial}> submit to: {props.backgroundMaterial} </a>
                </>
            );
        case "special":
            return (
                <>
                    <h3> {props.name} {props.exerciseCount} </h3>
                    <i> {props.description} </i>
                    <p> required skills: {props.requirements.join(", ")} </p>
                </>
            );
        default:
            return assertNever(props);
    }
};
  
export default Part;