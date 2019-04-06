import ProgressiveImage from 'react-progressive-image';

export default ({ isPopupPresent, isFaddingOut, name, picture, closePopup, openInMaps }) => {
    return (
        <div className={"fixed z-40 pin-t pin-l items-center justify-center h-full w-full px-6 " + (isPopupPresent ? "flex" : "hidden")}>
            <div onClick={closePopup} className="bg-red fixed pin-t pin-l z-30 h-screen w-screen" style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}>
            </div>
            <div className={"bg-white flex flex-col fixed z-40 " + ((isPopupPresent && !isFaddingOut) ? "fadeIn animated" : "fadeOut animated")} style={{ borderRadius: "1rem" }}>
                {
                    picture
                        ?
                        (
                            <ProgressiveImage src={picture} placeholder="../../static/image/placeholder.jpg">
                                {(src, loading) =>
                                    (
                                        <div className="flex justify-center items-center" style={{ width: "300px", height: "200px" }}>
                                            <div className={"fixed z-50 " + (loading ? "lds-facebook" : "hidden")}>
                                                <div></div>
                                                <div></div>
                                                <div></div>
                                            </div>
                                            <img style={{ borderTopLeftRadius: "1rem", borderTopRightRadius: "1rem", backgroundPosition: "center", backgroundSize: "cover", width: "300px", height: "200px" }} src={src} />
                                        </div>
                                    )
                                }
                            </ProgressiveImage>
                        )
                        :
                        null
                }
                <span className="text-2xl text-center">
                    {name}
                </span>
                <div className="flex justify-between">
                    <div className="text-center w-full py-2">
                        Drop-Off
                        </div>
                    <div onClick={openInMaps} className="text-center w-full py-2 text-blue">
                        Direction
                        </div>
                </div>
            </div>
        </div>
    )
}