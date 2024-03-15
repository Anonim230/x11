import fx from "money"
import validator from "validator"
import getNumber from "../utils";
import { useContext, useState } from "react";
import { context } from "../App";

export default function EnterMoney(props){
  // validator.is
  const { money } = useContext(context)
  const [currentMoney, setMoney] = useState(money.current)
  function setCurrentMoney(value){
    money.current = value
    setMoney(value)
  }
  // console.log("currentMoney:", currentMoney, "money.current:", money.current);
  // const inputMoney = useMemo(() => <input type="text"
  // onChange={e => { let value = e.target.value = getNumber(e.target.value); setCurrentMoney({ ...currentMoney, money: Number(e.target.value)}); e.target.value = value; e.target.focus()}} 
  // className='w-2/3 h-10 border-t focus:outline-none border-l border-b rounded-bl rounded-tl border-main px-3 py-2' 
  // placeholder='0000.00'/>, [])
    return <>
        <div className='font-inter'>Пополнить банковской картой</div>
          <div className="mt-4">
            <p className="font-inter font-light text-gray-600 text-xs mb-2">Укажите сумму</p>
            <div className="flex">
                <div className='w-1/3'>
                  {/* {inputMoney} */}
                  <input type="text" 
                    inputMode="numeric"
                    min={fx(5).from('usd').to(currentMoney.to)}
                    defaultValue={currentMoney.money > 0 ? currentMoney.money : ''}
                      aria-valuemin={fx(5).from('usd').to(currentMoney.to)}
                      onChange={e => { let value = e.target.value = getNumber(e.target.value); setCurrentMoney({ ...currentMoney, money: Number(e.target.value)}); e.target.value = value; e.target.focus()}} 
                      className='w-2/3 h-10 border-t focus:outline-none border-l border-b rounded-bl rounded-tl border-main px-3 py-2' 
                      placeholder='0000.00'/>
                  <select id='from-select' type="text" onChange={e => {
                    e.target.classList.remove(Array(...e.target.classList).find(v => v.startsWith('currency')))
                    e.target.classList.add(`currency-${e.target.selectedOptions[0].value}`)
                    Array(...e.target.options).forEach(v => v.innerText = v.value !== e.target.selectedOptions[0].value ?  v.getAttribute('aria-valuetext') : "")
                    Array(...e.target.options).forEach(v => v.value === e.target.selectedOptions[0].value ?  v.toggleAttribute('disabled') : v.removeAttribute('disabled'))
                    setCurrentMoney({...currentMoney, from: e.target.selectedOptions[0].value})
                    // console.log(e.target.options, Array(...e.target.options));
                    // console.log(Array(...e.target.classList).find(v => v.startsWith('currency')),e.target.selectedOptions[0].value);
                  }} className='w-1/3 h-10 border-t border-b border-r border-main px-3 py-2 bg-white currency-usd' defaultValue="usd">
                    <option value="usd" aria-valuetext="$" disabled={true}></option>
                    <option value="rub" aria-valuetext='₽'>₽</option>
                    {/* <option value="eur" aria-valuetext='€'>€</option> */}
                  </select>
                </div>
                <div className='w-1/3'>
                  <input type="text" value={currentMoney.money > 0 ? fx(currentMoney.money).from(currentMoney.from).to(currentMoney.to) : ''} className='w-2/3 h-10 border-t focus:outline-none border-b border-main px-3 py-2' disabled={true} placeholder='0000.00'/>
                  <select type="text" id='to-select' onChange={e => {
                    e.target.classList.remove(Array(...e.target.classList).find(v => v.startsWith('currency')))
                    e.target.classList.add(`currency-${e.target.selectedOptions[0].value}`)
                    Array(...e.target.options).forEach(v => v.innerText = v.value !== e.target.selectedOptions[0].value ?  v.getAttribute('aria-valuetext') : "")
                    Array(...e.target.options).forEach(v => v.value === e.target.selectedOptions[0].value ?  v.toggleAttribute('disabled') : v.removeAttribute('disabled'))
                    setCurrentMoney({...currentMoney, to: e.target.selectedOptions[0].value})
                    // console.log(e.target.options, Array(...e.target.options));
                    // console.log(Array(...e.target.classList).find(v => v.startsWith('currency')),e.target.selectedOptions[0].value);
                  }}  className='w-1/3 h-10 border-t border-b border-r border-main px-3 py-2 bg-white rounded-br rounded-tr currency-rub' defaultValue="rub">
                    <option value="rub" aria-valuetext='₽' disabled={true}></option>
                    <option value="usd" aria-valuetext="$">$</option>
                    {/* <option value="eur" aria-valuetext='€'>€</option> */}
                  </select>
                </div>
              {/* <input type="text" className='w-1/3 border rounded-br rounded-tr border-black px-3 py-1' placeholder='0000.00 ₽'/> */}
            </div>
          </div>
    </>
}