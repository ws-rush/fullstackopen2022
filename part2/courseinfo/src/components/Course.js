const Header = ({course}) => {
  return (
    <h1>{course}</h1>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  )
}

const Content = ({parts}) => {
  return (
    <div>
      {parts.map(part => 
        <Part key={part.id} part={part} />
      )}
    </div>
  )
}

const Total = ({sum}) => {
  
  if (sum === 0)
    return (
      <p>
        <strong>there is no exercises</strong>
      </p>
    )

  return (
    <p>
      <strong>total of {sum} exercise</strong>
    </p>
  )
}

const Course = ({course}) => {
  const sum = course.parts
    .map(part => part.exercises)
    .reduce((a, b) => a + b, 0)

  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total sum={sum} /> 
    </>
  )
}

export default Course