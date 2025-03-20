import {useState} from "react";
import movieListStyles from "./MovieList.module.css";
import Movie from "../Movie/Movie";

var movieArray = [
  {
    title: "The King's Man",
    year: "2021"
  },
  {
    title: "The Dark Knight",
    year: "2008"
  }
];
export default function MovieList() {
  const [moviesList, setMoviesList] = useState(movieArray);
  function formHandler(e) {
    e.preventDefault(); //prevent page reload on form submit
    //console.log(e.target.title.value);
    let newMovie = {
      title: e.target.title.value,
      year: e.target.year.value
    };
    /*
      We cannot use [ moviesList, newMovie ] as our new array value because, this is actually the following structure:
      [
        [
          {...},
          {...}
        ],
        {<newMovie>}
      ]
    */
    /*
      ...moviesList is spreading out the moviesList array so that your new array has the following structure:
      [
        {...},
        {...},
        {<newMovie>}
      ]  
    */
    setMoviesList(
      [
        ...moviesList,
        newMovie
      ]
    )
  }

  return(
    <section id={movieListStyles["movies"]}>
      <h2>My Movies</h2>
      <form onSubmit={formHandler}>
        <label htmlFor="title">Movie title:</label>
        <input type="text" id="title" name="title" />
        <label htmlFor="year">Year released:</label>
        <input type="text" id="year" name="year" />
        <button type="submit">Add movie</button>
      </form>
      {
        moviesList.map((m) => (
          <Movie 
            key={m.title + m.year}
            title={m.title} 
            year={m.year} 
          />
        ))
      }
    </section>
  )
}