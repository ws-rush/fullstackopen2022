const Filter = ({text, handleChange}) => {
  return (
    <div>
      filter shown with
      <input value={text} onChange={handleChange} />
    </div>
  )
}

export default Filter