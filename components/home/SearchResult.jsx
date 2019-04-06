export default ({ data, goToPlace }) => {
    const allPlace = data ?
        data.map((place, index) => {
            return (
                <div data-latitude={place.latitude} data-longitude={place.longitude} onClick={goToPlace} key={index} className="px-4 py-4 shadow my-3">
                    {place.name}
                </div>
            )
        })
        :
        null
    return (
        <div className="mt-16 mx-3 sticky z-30 bg-white">
            {allPlace}
        </div>
    )
}