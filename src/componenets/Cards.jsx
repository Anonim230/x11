import Card from "./Card";
import add from "../assets/images/add.svg"
import { context } from "../App";
import { useContext } from "react";
export default function Cards(){
    const {cards, setCards, settings, setSettings} = useContext(context)
    // console.log(cards);
    return <div className="mt-4 flex">
        {cards.map((card, i) => 
        <div key={i} onClick={e => {
            // console.log(cards, settings, card);
            setCards(cards.map(v => v.number === card.number ? {...v, active: true } : {...v, active: false }))
            setSettings({...settings, newCard: { ...settings.newCard, active: false }})
        }} className={"w-24 h-16 bg-card pt-4 px-2 "+ (cards[i].active ? 'card-active ' : "hover:cursor-pointer ") + (i === 0 ? "mr-4" : "mr-4")} style={{borderRadius: "8px"}}>
            <p className="text-xs text-white font-inter mb-2">••••{card.number.substring(12)}</p>
            <p className="text-xs text-white font-inter mb-2">{card.date.split('/')[0]} / {card.date.split('/')[1]}</p>
        </div>
         )}
        <div onClick={e => { setSettings({...settings, newCard: {...settings.newCard, active: true}}); setCards(cards.map(v => {return {...v, active: false}}))}} 
        className={ "w-24 h-16 bg-blue-100 px-2 flex " + (settings.newCard.active ? 'card-active' : 'hover:cursor-pointer')} style={{borderRadius: "8px"}}>
            <div className="my-auto">
            <img src={add} alt="" className="mx-auto"/>
            <p className="text-xs font-inter text-center">Новая карта</p>
            </div>
        </div> 
    </div>
}