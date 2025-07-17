function RestaurantSelected({ selectedMcDonalds }) {
  if (selectedMcDonalds) {
    return (
      <div className="restaurant-selected">
        <div className="info-restaurant-selected">
          <p>Restaurant sélectionné</p>
          <span>{selectedMcDonalds.display_name}</span>
          <button className="button-choose">Continuer</button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="restaurant-selected">
        <div className="info-restaurant-not-selected">
          <p>Aucun restaurant sélectionné</p>
        </div>
      </div>
    );
  }
}

export default RestaurantSelected;
