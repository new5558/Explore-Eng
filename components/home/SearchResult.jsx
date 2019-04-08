import Loading from "../shared-components/Loading";

export default ({ data, goToPlace, loading = false }) => {
    const allPlace = data ?
        data.map((place, index) => {
            return (
                <div data-latitude={place.latitude} data-longitude={place.longitude} onClick={goToPlace} key={index} className="px-4 py-4 shadow my-3">
                    {place.name}
                </div>
            )
        })
        :
        null;
    return (
        <div className="mt-16 mx-3 sticky z-30 bg-white">
            {
                loading
                    ?
                    (
                        <div className="flex items-center justify-center">
                            <Loading color="rgba(33, 33, 33, 0.3)" />
                        </div>
                    )
                    :
                    allPlace
            }
        </div>
    )
}