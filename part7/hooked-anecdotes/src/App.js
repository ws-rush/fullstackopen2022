import { useState } from 'react'
import { Routes, Route, NavLink, Link, useParams, useMatch, useNavigate, Navigate } from 'react-router-dom'
import { useField } from './hooks'

const Menu = ({ user, onLogout }) => {
  const navigate = useNavigate()
  const styles = {
    display: 'flex',
    justifyContent: 'space-around',
    background: 'lightgray',
    padding: '10px'
  }

  const handleLogout = () => {
    onLogout(null)
    navigate('/')
  }

  return (
    <div style={styles}>
      <NavLink to='/'>anecdotes</NavLink>
      <NavLink to='/create'>create new</NavLink>
      <NavLink to='/about'>about</NavLink>
      {
        user 
        ? <em><button onClick={handleLogout}>logout</button> {user} logged in</em> 
        : <NavLink to='/login'>login</NavLink>
      }
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <h6>paramed</h6>
    <ul>
      {anecdotes.map(anecdote => 
        <li key={anecdote.id} >
          <Link to={`/paramed-anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
        </li>
      )}
    </ul>
    <h6>matched</h6>
    <ul>
      {anecdotes.map(anecdote => 
        <li key={anecdote.id} >
          <Link to={`/matched-anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
        </li>
      )}
    </ul>
  </div>
)

const ParamedAnecdote = ({ vote, anecdotes }) => {
  const params = useParams()
  const anecdote = anecdotes.find(anecdote => anecdote.id === Number(params.id))

  return (
    <div>
      <h2>{anecdote.content} by {anecdote.author}</h2>
      <p>has {anecdote.votes} votes</p>
      <button onClick={() => vote(anecdote.id)}>vote</button>
      <p>for more info see <a href={anecdote.info}>{anecdote.info}</a></p>
    </div>
  )
}

const MatchedAnecdote = ({ vote, anecdote }) => {
  return (
    <div>
      <h2>{anecdote.content} by {anecdote.author}</h2>
      <p>has {anecdote.votes} votes</p>
      <button onClick={() => vote(anecdote.id)}>vote</button>
      <p>for more info see <a href={anecdote.info}>{anecdote.info}</a></p>
    </div>
  )
}

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = (props) => {
  const navigate = useNavigate()
  const [content, contentReset] = useField('text')
  const [author, authorReset] = useField('text')
  const [info, infoReset] = useField('text')

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })

    props.notify(`a new anecdote ${content.value} created!`)
    setTimeout(() => {
      props.notify('')
    }, 5000)
    navigate('/')
  }

  const reset = () => {
    contentReset()
    authorReset()
    infoReset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name='content' {...content} />
        </div>
        <div>
          author
          <input name='author' {...author} />
        </div>
        <div>
          url for more info
          <input name='info' {...info} />
        </div>
        <button>create</button>
        {/* reset button */}
        <button type='reset' onClick={reset}>reset</button>
      </form>
    </div>
  )

}

const Login = (props) => {
  const navigate = useNavigate()

  const onSubmit = (event) => {
    event.preventDefault()
    props.onLogin('mluukkai')
    navigate('/')
  }

  return (
    <div>
      <h2>login</h2>
      <form onSubmit={onSubmit}>
        <div>
          username: <input />
        </div>
        <div>
          password: <input type='password' />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

const NotFound = () => {
  return (
    <div>
      <h2>404</h2>
      <p>Page not found</p>
    </div>
  )
}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  // matched pararmeters
  const match = useMatch('/matched-anecdotes/:id')
  const anecdote = match
    ? anecdotes.find(anecdote => anecdote.id === Number(match.params.id))
    : null

  const [notification, setNotification] = useState('')
  const [user, setUser] = useState(null)

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu user={user} onLogout={setUser} />
      {notification}
      <Routes>
        <Route path='/' element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route path='/paramed-anecdotes/:id' element={<ParamedAnecdote vote={vote} anecdotes={anecdotes} />} />
        <Route path='/matched-anecdotes/:id' element={<MatchedAnecdote vote={vote} anecdote={anecdote} />} />
        <Route path='/create' element={
          user
            ? <CreateNew addNew={addNew} notify={setNotification} />
            : <Navigate replace to='/login' />
        } />
        <Route path='/about' element={<About />} />
        <Route path='/login' element={<Login onLogin={setUser} />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
