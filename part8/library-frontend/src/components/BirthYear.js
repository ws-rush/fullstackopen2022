import { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { EDIT_AUTHOR, ALL_AUTHORS, AUTHORS_NAMES } from '../queries'

const BirthYear = (props) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const authors = useQuery(AUTHORS_NAMES)
  
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  })

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    editAuthor({ variables: { name, born: Number(born) } })

    setBorn('')
  }

  return (
    <div>
      <h2>Set Birthyear</h2>
      <form onSubmit={submit}>
        <div>
          name
          <select value={name} onChange={({ target }) => setName(target.value)}>
            {authors.data.allAuthors.map((author) => (
              <option key={author.name} value={author.name}>
                {author.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          born
          <input
            type="number"
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default BirthYear