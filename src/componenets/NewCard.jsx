import { useContext } from "react"
import getNumber from "../utils"
import { context } from "../App"
import alertImage from '../assets/images/alert.png'
export default function NewCard(){
    const { settings } = useContext(context)
return <div className={(settings.newCard?.active ? '' : 'hidden')}>
    <div className="h-44 mt-4 flex">
        <div className=" bg-gradient h-44 w-2/3" style={{borderRadius: '12px', zIndex: 1}}>
            <div className="h-44 bg-mask px-5 py-10">
                <p className="text-sm font-inter text-white">Номер карты</p>
                <input id="card-number" type="text" inputMode="numeric" pattern="[0-9\s]{13,19}" 
                    autoComplete="cc-number" minLength='16' maxLength="16" 
                    required={settings.newCard?.active} className="bg-white outline-none w-11/12 rounded-md h-8 pl-3 mt-1" 
                    onChange={e => {
                //    console.log(validator.isCreditCard(e.target.value), e.target.value, cardNumber);
                    e.target.value = getNumber(e.target.value, {dotUsed: true})
                }} placeholder="Номер карты" />
                <p className="text-sm font-inter text-white">Действует до</p>
                <div className="mt-3 flex w-1/2">
                    <input type="text" id="month" inputMode="decimal" maxLength={2} minLength={1} className="w-1/2 rounded-md px-2 py-2 text-xs" placeholder="мм" onChange={e => {
                        if(isNaN(+e.target.value) || getNumber(e.target.value) < 1 || getNumber(e.target.value) > 12){
                            e.target.value = ''
                        }
                    }} /> <div className="text-white font-inter my-auto mx-1">/</div>
                    <input type="text" id="year" maxLength={2} minLength={1} className="w-1/2 rounded-md px-2 py-2 text-xs" placeholder="гг" onChange={e => {
                        if(isNaN(+e.target.value) || getNumber(e.target.value) < 1 || getNumber(e.target.value) > 12){
                            e.target.value = ''
                        }
                    }} />
                </div>
            </div>
        </div>
        <div className="w-1/3" style={{borderRadius: "8px 12px", position: 'relative', left: "-3%", backgroundColor: '#EBEBF0'}}>
            <div className="h-8 w-auto mt-8" style={{ backgroundColor: '#C7C9D9'}}></div>
            <div className="pl-6 mt-2" style={{color: '#555770'}}>
                <p className="text-xs">CVV/CVC</p>
                <input id="cvv" type="text" inputMode="decimal" placeholder="000" max={999} minLength={3} maxLength={3} required={settings.newCard?.active} min={0} className="bg-white outline-none w-1/2 mt-2 rounded-md px-2 py-1" />
                <p className="text-xs mt-2 w-10/12" style={{fontSize: "0.625rem", lineHeight: '0.75rem'}}>три цифры с обратной стороны карты</p>
            </div>
        </div>
        
    </div>
    <div className="text-xs font-inter pt-4 flex" style={{color: "#555770"}}>
    <div>
      <input type="checkbox" name="save-card" id="save-card" className='w-4 h-4 text-white'/>
    </div>
    <div className='ml-2 checkbox' style={{fontSize: '0.7rem'}}>
      <span className="flex">Запомнить эту карту. Это безопасно.<img className="my-auto ml-1 hover:cursor-pointer help" datamsg="asdasf" style={{width: '1rem'}} src={alertImage}/></span>
      <p>Сохраняя карту, вы соглашаетесь с условиями привязки карты.</p>
    </div>
  </div>


</div>}