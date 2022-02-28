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


// Have the function SumMultiplier(arr) take the array of numbers stored in arr and return the string true if any two numbers can be multiplied so that the answer is greater than double the sum of all the elements in the array. If not, return the string false. For example: if arr is [2, 5, 6, -6, 16, 2, 3, 6, 5, 3] then the sum of all these elements is 42 and doubling it is 84. There are two elements in the array, 16 * 6 = 96 and 96 is greater than 84, so your program should return the string true.


const sumMultiplier = (arr) => {
    const arrSumTimesTwo = arr.reduce((prev, curr) => prev + curr, 0) *2
    
    const arrSorted = arr.sort((a,b) => b - a)
    
    const largestMultiple = arrSorted[0] * arrSorted[1]
      
    if(largestMultiple > arrSumTimesTwo) return 'true'
    else return 'false'
    
}
    
console.log(sumMultiplier([2, 5, 6, -6, 6, 2, 11, 6, 5, 3, -1]))