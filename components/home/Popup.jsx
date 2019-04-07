export default ({ isPopupPresent, isFaddingOut, name, closePopup, onClickRight, onClickLeft, children, type }) => {
    return (
        <div className={"fixed z-40 pin-t pin-l items-center justify-center h-full w-full px-6 " + (isPopupPresent ? "flex" : "hidden")}>
            <div onClick={closePopup} className="bg-red fixed pin-t pin-l z-30 h-screen w-screen" style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}>
            </div>
            <div className={"bg-white flex flex-col fixed z-40 " + ((isPopupPresent && !isFaddingOut) ? "fadeIn animated" : "fadeOut animated")} style={{ borderRadius: "1rem" }}>
                {children}
                <span className="text-2xl text-center">
                    {name}
                </span>
                <div className="flex justify-between">
                    <div onClick={onClickLeft} className="text-center w-full py-2">
                        {type === 0 ? "Drop-Off" : "Submit"}
                    </div>
                    <div onClick={onClickRight} className="text-center w-full py-2 text-blue">
                        {type === 0 ? "Direction" : "Cancel"}
                    </div>
                </div>
            </div>
        </div>
    )
}