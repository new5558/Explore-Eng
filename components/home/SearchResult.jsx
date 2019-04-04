export default ({ data }) => {
    const allPlace = data ?
        data.map((place, index) => {
            return (
                <div key={index} className="px-3 py-2 shadow my-3">
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