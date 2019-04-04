export default ( {children, isClicked} ) => {
    return (
        <div className={"w-16 h-16 rounded-full flex items-center justify-center " + (isClicked ? "bg-blue" : "bg-black")}>
            {children}
        </div>
    );
}