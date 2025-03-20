export default function Menu({ games }) {
    return (
      <div className="menu">
        {games.map((game, index) => (
          <div key={index} className="product">
            <img src={game.image} alt={game.product} className="image" />
            <h1 className="">{game.product}</h1>
            <p className="">{game.description}</p>
            <p className="price">{game.price}</p>
          </div>
        ))}
      </div>
    );
  }
  