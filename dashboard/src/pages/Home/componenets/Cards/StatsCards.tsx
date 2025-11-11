interface StatCardProps{
    className: string;
    title: string;
    icon: React.ReactNode;
    value: any;
}

export default function StatsCard(props: StatCardProps){
    return (
        <div className={`w-full p-3 space-y-3 h-fit bg-gradient-to-br from-card to-background ` + props.className}>
            <div className="flex justify-between items-center">
                <h2 className="text-[0.6rem] text-foreground/40 font-medium">{props.title}</h2>
                <span className="*:size-5 text-foreground/40">{props.icon}</span>
            </div>
            <div className="flex justify-between items-center">
                <h2 className="text-md font-bold">{props.value}</h2>
            </div>
        </div>
    );
}