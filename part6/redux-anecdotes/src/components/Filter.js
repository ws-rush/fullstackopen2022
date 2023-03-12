import { useDispatch } from "react-redux"
import { updateFilter } from "../reducers/filterReducer"

export default function Filter() {
    const dispatch = useDispatch()

    const handleChange = (event) => {
      // input-field value is in variable event.target.value
      dispatch(updateFilter(event.target.value))
    }
    const style = {
      marginBottom: 10
    }
  
    return (
      <div style={style}>
        filter <input onChange={handleChange} />
      </div>
    )
}
