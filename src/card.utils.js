function getCardsFromServer(){
    // console.log(JSON.parse(localStorage.getItem('cards')));
    return JSON.parse(localStorage.getItem('cards')) || [{ number: "1234123412341234", date: "12/12", cvv: 123, active: true }]
  }
  function saveCard(card){
    // console.log(card);
    localStorage.setItem('cards', JSON.stringify([ ...getCardsFromServer(), card]))
  }
  function pay(){
  
  }
export {getCardsFromServer, saveCard, pay}