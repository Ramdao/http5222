export default function Movie(props) {
  return(
    <div>
      <h3>{props.title}</h3>
      <p>Year released: {props.year}</p>
    </div>
  )
}