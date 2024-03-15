function getNumber(string, object = {dotUsed: false}){
    let str = ''
    let dotUsed = object?.dotUsed
    // console.log(string);
    for(let i of string.split('')) {
      if(!isNaN(+i))str += i
      else if(i === '.' & !dotUsed){ str += '.'; dotUsed = true }
    }
    return str
  }
  export default getNumber