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
        <div className="my-16 mx-3">
            {allPlace}
        </div>
    )
}