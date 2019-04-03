export default ({ zoom, acc }) => {
    return (
    <div className="rounded-full" style={{background: "rgba(55, 160, 200, 0.5)", width: Math.pow(1.6, zoom) * 0.05 * acc/70 + "px", height: Math.pow(1.6, zoom) * 0.05 * acc/70 + "px"}}>
        
    </div>
    )
}