function ListOfResults(props) {
  const cities = props.cities;

  function handleClick(lat, lon, name) {
    props.onAdd(lat, lon, name);
  }
  return (
    <ul className="flex flex-col justify-center gap-2.5 p-0 m-0 w-3/4 md:w-4/5">
      {cities.map((city, index) => {
        return (
          <li
            className="list-none  bg-white border border-gray-400 rounded px-1.5 py-0.5 hover:cursor-pointer hover:bg-[#ffa500]"
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
