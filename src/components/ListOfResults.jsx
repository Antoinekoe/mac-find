function ListOfResults(props) {
  const cities = props.cities;

  function handleClick(lat, lon) {
    props.onAdd(lat, lon);
  }
  return (
    <ul>
      {cities.map((city, index) => {
        return (
          <li
            className="li-search"
            onClick={() => handleClick(city.lat, city.lon)}
            key={index}
          >
            {city.display_name}
          </li>
        );
      })}
    </ul>
  );
}
export default ListOfResults;
