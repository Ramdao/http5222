import UselessFact from "../components/UselessFact/UselessFact"
import {useEffect} from "react"

export default function Home() {
  useEffect(() => {
    document.title = "Home | Random Site"
  }, [])
  return(
    <main id="main">
      <h1>Welcome to my home page!</h1>
      <p>This is just a random site to test React.</p>
      <UselessFact />
    </main>
  )
}