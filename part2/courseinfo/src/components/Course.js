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

const Total = ({exercises}) => {
  let total = exercises.reduce((a, b) => a + b, 0)

  if (total === 0)
    return (
      <p>
        <strong>there is no exercises</strong>
      </p>
    )

  return (
    <p>
      <strong>total of {total} exercise</strong>
    </p>
  )
}

const Course = ({course}) => {
  let exercises = course.parts.map(part => part.exercises)

  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total exercises={exercises} /> 
    </>
  )
}

export default Course