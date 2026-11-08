function StatusTag({className=''}) {

    const statusDict = {
        READY: "bg-blue border-2 border-dark-blue text-dark-blue",
        RESISTED: "bg-green border-2 border-dark-green text-dark-green",
        BOUGHT: "bg-red border-2 border-dark-red text-dark-red"
    }
    return (
        <div className={`${className} rounded-xl ${statusDict["READY"]} px-1`}>
            Ready
        </div>
    )
}

export default StatusTag;