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