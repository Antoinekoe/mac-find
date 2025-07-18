// ListOfResults component - displays search results as clickable list items
function ListOfResults(props) {
  const cities = props.cities;

  // Handler for when user clicks on a search result
  function handleClick(lat, lon, name) {
    console.log("handleClick function rendered !");
    props.onAdd(lat, lon, name);
  }

  return (
    // Container for search results list
    <ul className="flex flex-col justify-center gap-2.5 p-0 m-0 w-3/4 md:w-1/2">
      {/* Map through cities and render each as a list item */}
      {cities.map((city, index) => {
        return (
          <li
            className="list-none  bg-white border border-gray-400 rounded px-1.5 py-0.5 hover:cursor-pointer hover:bg-[#ffa500]"
            // Sets the city infos to the parent component
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
