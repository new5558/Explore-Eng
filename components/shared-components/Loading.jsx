export default ({ color, loading = true, positionFixed = false }) => {
    return (
        <div className={"lds-facebook " + (loading ? "" : "hidden ") + (positionFixed ? "fixed z-50" : "relative")}>
            <div style={{ background: color }}></div>
            <div style={{ background: color }}></div>
            <div style={{ background: color }}></div>
        </div>
    )
}