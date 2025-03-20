import styles from "./Header.module.css";
import {Link, NavLink} from "react-router";

export default function Header() {
  //This is a regular Javascript line comment
  return(
    <header id={styles["header"]}>
      {/* This is a JSX comment */}
      <h2 className={styles.sitename}>
        <Link to="/">Random React Site</Link>
      </h2>
      <nav aria-label="Main navigation">
        <ul>
          <li><NavLink 
            to="/"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "special" : ""
            }
          >
            Home
          </NavLink></li>
          <li><NavLink to="/movies">Movies</NavLink></li>
        </ul>
      </nav>
    </header>
  )
}