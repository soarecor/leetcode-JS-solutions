// Have the function RunLength(str) take the str parameter being passed and return a compressed version of the string using the Run-length encoding algorithm. This algorithm works by taking the occurrence of each repeating character and outputting that number along with a single character of the repeating sequence. For example: "wwwggopp" would return 3w2g1o2p. The string will not contain any numbers, punctuation, or symbols.


const runLength = (str) => {
    let letterCount = {}
    let returnStr = ''

    const strSpread = [...str]
    strSpread.forEach((char) => {
        if(Object.keys(letterCount).includes(char)){
            letterCount[char]++
        } else {
            letterCount[char] = 1  
        }
    })
        
    for(const property in letterCount) {
        let stringCount = `${letterCount[property]}${property}`
        returnStr= returnStr.concat(stringCount)
    }
        
    return returnStr
}
    
    
console.log(runLength('wwwggopp'))

// ************************************* NEW PROBLEM *************************************************
// Have the function SumMultiplier(arr) take the array of numbers stored in arr and return the string true if any two numbers can be multiplied so that the answer is greater than double the sum of all the elements in the array. If not, return the string false. For example: if arr is [2, 5, 6, -6, 16, 2, 3, 6, 5, 3] then the sum of all these elements is 42 and doubling it is 84. There are two elements in the array, 16 * 6 = 96 and 96 is greater than 84, so your program should return the string true.


const sumMultiplier = (arr) => {
    const arrSumTimesTwo = arr.reduce((prev, curr) => prev + curr, 0) *2
    
    const arrSorted = arr.sort((a,b) => b - a)
    
    const largestMultiple = arrSorted[0] * arrSorted[1]
      
    if(largestMultiple > arrSumTimesTwo) return 'true'
    else return 'false'
    
}
    
console.log(sumMultiplier([2, 5, 6, -6, 6, 2, 11, 6, 5, 3, -1]))


// ************************************* NEW PROBLEM *************************************************
// Have the function StringExpression(str) read the str parameter being passed which will contain the written out version of the numbers 0-9 and the words "minus" or "plus" and convert the expression into an actual final number written out as well. For example: if str is "foursixminustwotwoplusonezero" then this converts to "46 - 22 + 10" which evaluates to 34 and your program should return the final string threefour. If your final answer is negative it should include the word "negative."

  const numMap = {
   one: 1,
   two: 2,
   three: 3,
   four: 4,
   five: 5,
   six: 6,
   seven: 7,
   eight: 8,
   nine: 9,
   zero: 0,
   minus: '-',
   plus: '+'
  }
 
//need to flip numMap for later use  
const flip = numMap => Object.fromEntries(Object.entries(numMap).map(a => a.reverse()))
const numMapFlipped = flip(numMap)

const stringExpression = (str) => {

  //strMap will hold an array of objects with the key and position of it like so
  // [ {key: 'one', position: 3}, {key: 'four', position: 22}]
  let strMap = []
  
  const recordNumPostion = (key, position) => {
    if(str.includes(key, position)) {
      let obj = {}
      obj.key = numMap[key]
      obj.position = str.indexOf(key, position)
      strMap.push(obj)
      
      //check if number is repeated in the incoming string 'str'
      const numberRepeated = str.includes(key,position + 1)
      if(numberRepeated) recordNumPostion(key, position + 1)
    }
  }
    
  //loop through numMap, and map the number key to the position of the key in string 'str'
  Object.keys(numMap).forEach((key) => {
    if(str.includes(key)){
      const position = str.indexOf(key)
      recordNumPostion(key, 0)

      //check if number is repeated in the incoming string 'str'
      const numberRepeated = str.includes(key,position + 1)
      if(numberRepeated) recordNumPostion(key, position + 1)
    }
    
  })
  
  const posMapped = strMap.map((element) => element.position)
  //removed duplicates from strMap
  strMap = strMap.filter(({position}, index) => !posMapped.includes(position, index + 1))
  
  //sort strMap ascending based on position
  const sorted = strMap.sort((a, b) => {
    if ( a.position < b.position ){
      return -1;
    }
    if ( a.position > b.position ){
      return 1;
    }
    return 0;
  })
  
  
  // evauluate the value of string of numbers with operators 
  const joinedKeys = sorted.map((item) => item.key).join('')
  const returnNum = eval(joinedKeys)
  
  
  let returnString = ''
  const stringReturnNum = [...returnNum.toString()]
  stringReturnNum.forEach((num) => returnString = `${returnString}${numMapFlipped[num]}`)
  
  
  return returnString
}

stringExpression('sixtwominustwotwoplusonetwo')
  

// ************************************* NEW PROBLEM *************************************************
// Have the function StringExpression(str) read the str parameter being passed which will contain the written out version of the numbers 0-9 and the words "minus" or "plus" and convert the expression into an actual final number written out as well. For example: if str is "foursixminustwotwoplusonezero" then this converts to "46 - 22 + 10" which evaluates to 34 and your program should return the final string threefour. If your final answer is negative it should include the word "negative."

const numMap = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
    zero: 0,
    minus: '-',
    plus: '+'
   }
  
 //need to flip numMap for later use  
 const flip = numMap => Object.fromEntries(Object.entries(numMap).map(a => a.reverse()))
 const numMapFlipped = flip(numMap)
 
 const stringExpression = (str) => {
 
   //strMap will hold an array of objects with the key and position of it like so
   // [ {key: 'one', position: 3}, {key: 'four', position: 22}]
   let strMap = []
   
   const recordNumPostion = (key, position) => {
     if(str.includes(key, position)) {
       let obj = {}
       obj.key = numMap[key]
       obj.position = str.indexOf(key, position)
       strMap.push(obj)
       
       //check if number is repeated in the incoming string 'str'
       const numberRepeated = str.includes(key,position + 1)
       if(numberRepeated) recordNumPostion(key, position + 1)
     }
   }
     
   //loop through numMap, and map the number key to the position of the key in string 'str'
   Object.keys(numMap).forEach((key) => {
     if(str.includes(key)){
       const position = str.indexOf(key)
       recordNumPostion(key, 0)
 
       //check if number is repeated in the incoming string 'str'
       const numberRepeated = str.includes(key,position + 1)
       if(numberRepeated) recordNumPostion(key, position + 1)
     }
     
   })
   
   const posMapped = strMap.map((element) => element.position)
   //removed duplicates from strMap
   strMap = strMap.filter(({position}, index) => !posMapped.includes(position, index + 1))
   
   //sort strMap ascending based on position
   const sorted = strMap.sort((a, b) => {
     if ( a.position < b.position ){
       return -1;
     }
     if ( a.position > b.position ){
       return 1;
     }
     return 0;
   })
   
   
   // evauluate the value of string of numbers with operators 
   const joinedKeys = sorted.map((item) => item.key).join('')
   const returnNum = eval(joinedKeys)
   
   
   let returnString = ''
   const stringReturnNum = [...returnNum.toString()]
   stringReturnNum.forEach((num) => returnString = `${returnString}${numMapFlipped[num]}`)
   
   
   return returnString
 }
 
 stringExpression('sixtwominustwotwoplusonetwo')
   
 