type Status = "READY" | "RESISTED" | "BOUGHT" | null;

function StatusTag({className='', stat, days}: {stat: Status, className?: string, days: number}) {

    const statusDict = {
        READY: "bg-blue border-2 border-dark-blue text-dark-blue",
        RESISTED: "bg-green border-2 border-dark-green text-dark-green",
        BOUGHT: "bg-red border-2 border-dark-red text-dark-red",
        WAITING: "bg-yellow border-2 border-dark-yellow text-dark-yellow"
    }
    return (
        <div className={`${className} rounded-xl ${statusDict[stat ?? "WAITING"]} px-1`}>
            {stat ?? days.toString() + ' days'}
        </div>
    )
}

export default StatusTag;