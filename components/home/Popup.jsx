export default ({ isPopupPresent, name, picture, closePopup, openInMaps }) => {
    console.log(isPopupPresent, name, 'popup')
    return isPopupPresent
        ?
        (
            <div className="fixed z-40 pin-t pin-l flex items-center justify-center h-full w-full px-6">
                <div onClick={closePopup} className="bg-red fixed pin-t pin-l z-30 h-screen w-screen" style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}>
                    s
                </div>
                <div className="bg-white flex flex-col fixed z-40 shadow" style={{ borderRadius: "1rem" }}>
                    <div style={{ borderTopLeftRadius: "1rem", borderTopRightRadius: "1rem", backgroundPosition: "center", backgroundSize: "cover", width: "300px", height: "200px", backgroundImage: "url(" + picture + ")" }}>
                    </div>
                    <span className="text-2xl text-center">
                        {name}
                    </span>
                    <div className="flex justify-between">
                        <div className="text-center w-full py-2">
                            Scan
                        </div>
                        <div onClick={openInMaps} className="text-center w-full py-2 text-blue">
                            Direction
                        </div>
                    </div>
                </div>
            </div>
        )
        :
        null
}