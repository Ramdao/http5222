import MovieList from "../components/MovieList/MovieList";
import { useEffect } from "react";

export default function Movies() {
  useEffect(() => {
    document.title = "Movies | Random Site"
  }, []);

  return(
    <main id="main">
      <h1>Movies</h1>
      {/* title and year (below) are props passed to the Movie component */}
      <img src="/vite.svg" alt="Vite logo" />
      <MovieList />
    </main>
  )
}