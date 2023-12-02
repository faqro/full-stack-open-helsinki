const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ sum }) => <p>Number of exercises {sum}</p>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => 
  <>
    {parts.map(part => 
      <Part key={part.id} part={part} />
    )}    
  </>

const Course = ({ course }) => {
    const {parts} = course
    const total = parts.reduce((sum, tot) => sum+tot.exercises, 0)
  
    return (
        <>
            <Header course={course.name} />
            <Content parts={parts} />
            <Total sum={total} />
        </>
    )
}

export default Course