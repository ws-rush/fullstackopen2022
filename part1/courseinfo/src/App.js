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
      {parts.map(part => <Part part={part} />)}
    </div>
  )
}

const Total = ({exercises}) => {
  let total = exercises.reduce((a, b) => a + b, 0)

  if (total === 0)
    return (
      <p>there is no exercises</p>
    )

  return (
    <p>Number of exercises {total}</p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  let exercises = course.parts.map(part => part.exercises)

  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total exercises={exercises} />
    </>
  )
}

export default App