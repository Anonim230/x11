import { createContext, useMemo, useRef, useState } from 'react';
import './output.css';
import fx from "money"
import EnterMoney from './componenets/EnterMoney';
import Cards from './componenets/Cards';
import NewCard from './componenets/NewCard';
import { getCardsFromServer, saveCard } from './card.utils';
var context
function App() {
  const [cards, setCards] = useState(getCardsFromServer())
  const [settings, setSettings] = useState({ newCard: { active: false, date: '0/0', number: '', cvv: ''} })
  const money = useRef({ money: 0, from: "usd", to: "rub" })
  context = createContext({ cards, setCards, settings, setSettings })
  fx.base = 'usd'
  fx.rates = {
    "rub": 15,
    "eur": 0.8
  }
  return (
    <context.Provider value={{cards, settings, setCards, setSettings, money}}>
      <div className="App flex h-screen">
        <form onSubmitCapture={e => {
          e.preventDefault()
          let elemenets = Object.values(e.target.elements)
          if(elemenets.find(v => v.type === 'checkbox').checked) {
            setCards([...cards, {
              number: elemenets.find(v => v.id === 'card-number').value,
              date: `${elemenets.find(v => v.id === 'month').value}/${elemenets.find(v => v.id === 'year').value}`,
              cvv: elemenets.find(v => v.id === 'cvv').value
            }])
            saveCard({
            number: elemenets.find(v => v.id === 'card-number').value,
            date: `${elemenets.find(v => v.id === 'month').value}/${elemenets.find(v => v.id === 'year').value}`,
            cvv: elemenets.find(v => v.id === 'cvv').value
          })
        }
          if(settings.newCard.active)
                alert(`Вы отправили ${money.current.money} ${money.current.from} на карту ${elemenets.find(v => v.id === 'card-number').value}`)
          else alert(`Вы отправили ${money.current.money} ${money.current.from} на карту ${cards.find(v => v.active).number}`)
        }} className="w-1/3 border border-main rounded mx-auto my-auto h-10/12 p-6">
            <EnterMoney />
            <Cards />
            <NewCard />
            <input type="submit" value="Оплатить" className='font-inter text-sm text-white py-3 px-4 rounded-3xl mt-4 hover:cursor-pointer' style={{backgroundColor: "#3E7BFA"}} />
        </form>
      </div>
    </context.Provider>
  );
}
export { context };
export default App;
