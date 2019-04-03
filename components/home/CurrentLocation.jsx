export default ({ zoom, acc }) => {
    const size = Math.pow(1.6, zoom) * 0.05 * acc/70;
    return (
    <div className="rounded-full flex items-center justify-center" style={{background: "rgba(55, 160, 200, 0.5)", width: size > 20 ? size : 20 + "px", height: size > 20 ? size : 20 + "px"}}>
        <div className="rounded-full bg-blue w-2 h-2"></div>
    </div>
    )
}