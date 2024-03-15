import { useContext } from "react";
import { context } from "../App";

export default function Card(props){
    const {cards, settings, setCards, setSettings} = useContext(context)
    return <div onClick={e => {
        // console.log(cards, settings);
        setCards(cards.map(v => v.number === props.card.number ? {...v, active: true } : {...v, active: false }))
        setSettings({...settings, newCard: { ...settings.newCard, active: false }})
        // console.log(cards, settings);
    }} className={"w-24 h-16 bg-card pt-4 px-2 "+ (props.card.active ? 'card-active ' : "") + (props.index === 0 ? "mr-4" : "mr-4")} style={{borderRadius: "8px"}}>
        <p className="text-xs text-white font-inter mb-2">••••{props.card.number.substring(12, 16)}</p>
        <p className="text-xs text-white font-inter mb-2">{props.card.date.split('/')[0]} / {props.card.date.split('/')[1]}</p>
    </div>
}