export default ({ isPopupPresent, isFaddingOut, disabled, name, closePopup, onClickRight, onClickLeft, children, type = 0, latitude, longitude }) => {
    if (type === null) {
        type = 1;
    }
    const typeCss = {
        0: ["300px", "Drop-Off", "text-blue", "Direction"],
        1: ["220px", "Submit", "text-red", "Cancel"],
        2: ["300px", "Ok", "hidden", ""]
    };
    return (
        <div className={"fixed z-40 pin-t pin-l items-center justify-center h-full w-full px-6 " + (isPopupPresent ? "flex" : "hidden")}>
            <div onClick={closePopup} className="bg-red fixed pin-t pin-l z-30 h-screen w-screen" style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}>
            </div>
            <div className={"bg-white flex flex-col fixed z-40 shadow-lg " + ((isPopupPresent && !isFaddingOut) ? "fadeIn animated" : "fadeOut animated")} style={{ width: typeCss[type][0], borderRadius: "1rem" }}>
                {children}
                <span className="text-xl text-center px-2 truncate">
                    {name}
                    {/* 7-11 สาขา ปตท. REST AREA ประชาชื่น */}
                </span>
                <div className="flex justify-between">
                    <div onClick={disabled ? (e) => (e) : onClickLeft} className={"text-center w-full py-2 " + (disabled ? "text-grey" : "")}>
                        {typeCss[type][1]}
                    </div>
                    {
                        !(type === 0 && iOSversion() && iOSversion()[0] === 12 && iOSversion()[1] === 2 && longitude !== null && latitude !== null)
                            ?
                            (
                                <div className={"text-center w-full py-2 " + typeCss[type][2]}>
                                    <a className="text-green no-underline" href={"maps://maps.google.com/maps?daddr=" + latitude + "," + longitude + "&amp;ll="} target="_blank">
                                        {typeCss[type][3]}
                                    </a>
                                </div>
                            )
                            :
                            (
                                <div onClick={onClickRight} className={"text-center w-full py-2 " + typeCss[type][2]}>
                                    {typeCss[type][3]}
                                </div>
                            )
                    }
                </div>
            </div>
        </div>
    )
}

function iOSversion() {
    if (/iP(hone|od|ad)/.test(navigator.platform)) {
        // supports iOS 2.0 and later: <http://bit.ly/TJjs1V>
        var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
        alert([parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)])
        return [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];
    }
}