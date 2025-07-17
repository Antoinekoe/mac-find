function ListOfResults(props) {
  const cities = props.cities;

  function handleClick(lat, lon, name) {
    props.onAdd(lat, lon, name);
  }
  return (
    <ul>
      {cities.map((city, index) => {
        return (
          <li
            className="li-search"
            onClick={() => handleClick(city.lat, city.lon, city.name)}
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
