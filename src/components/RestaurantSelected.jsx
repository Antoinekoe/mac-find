function RestaurantSelected({ selectedMcDonalds }) {
  if (selectedMcDonalds) {
    return (
      <div className="absolute box-border flex flex-col justify-center p-5 rounded-t-[15px] shadow-[0_-4px_8px_rgba(0,0,0,0.6)] bottom-0 z-[1500] w-full bg-white">
        <div className="flex flex-col justify-center gap-[10px] w-[70%] mx-auto md:w-1/2">
          <p className="m-0 p-0 font-black">Restaurant sélectionné</p>
          <span>{selectedMcDonalds.display_name}</span>
          <button className="bg-[#ffa500] font-black rounded-md border-0 px-2.5 py-3 text-black hover:cursor-pointer">
            Continuer
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="absolute box-border flex flex-col justify-center p-5 rounded-t-[15px] shadow-[0_-4px_8px_rgba(0,0,0,0.6)] bottom-0 z-[1500] w-full bg-white">
        <div className="flex flex-col justify-center items-center text-center gap-[30px] w-[70%] mx-auto md:w-4/5">
          <p className="m-0 p-0 font-bold">Aucun restaurant sélectionné</p>
        </div>
      </div>
    );
  }
}

export default RestaurantSelected;
