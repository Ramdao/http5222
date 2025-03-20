import {useState, useEffect} from "react";

export default function UselessFact() {
  //API request - https://uselessfacts.jsph.pl/api/v2/facts/random
  //Although you can technically use one state variable and save a JSON object in it, just to show you that you can have multiple state variables per component, I'm using two.
  const [randomFact, setRandomFact] = useState("");
  const [factSource, setFactSource] = useState("");

  //useEffect is used to run a script upon component load
  //It takes two parameters: the callback function and the dependency list
  //useEffect is synchronous so to use an asynchronous function you have to define it within the synchronous callback, then call the function
  useEffect(() => {
    const getFact = async () => {
      let response = await fetch(
        "https://uselessfacts.jsph.pl/api/v2/facts/random"
      );
      let data = await response.json();
      //console.log(data);
      setRandomFact(data.text);
      setFactSource(data.source);
    }
    getFact();
  }, [])

  let fact = (randomFact) ? `${randomFact} (${factSource})` : "Loading...";
  return(
    <section>
      <h2>Your useless, random fact</h2>
      <div>{fact}</div>
    </section>
  )
}