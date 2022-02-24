
// here is the url link to the problem. This solution is wrong and fails some test cases.
// https://leetcode.com/problems/substring-with-concatenation-of-all-words/
/**
 * @param {string} s
 * @param {string[]} words
 * @return {number[]}
 */

var findSubstring = (s, words) => {
    const iterations = []
    let indexes = []
  
    let arrFact = [...words.keys()]
    arrFact.push(words.length)
    arrFact.shift()
    
    //find all possible permutations of current words - factorial of words.length
    let perms = arrFact.reduce((curr, acc) => curr * acc, 1)
    const arrayUnique = words.length === new Set(words).size

    // if all values in array are not unique, divide the number of permutations by 2. This is a hack, which 
    // does not work
    if (!arrayUnique) perms = perms/2
      
       perms = perms > 60 ? 60 : perms
  
    while (iterations.length < perms) {
      const joined = words.join('')
      const iterationExists = iterations.includes(joined)   
        if(!iterationExists){ 
          iterations.push(joined)
        } 
          shuffleArray(words)
    }
    
                
   iterations.forEach((iteration) => { 
      const indexOfFirst = s.indexOf(iteration)
      
      const pushToArray = (iteration, index) => {
        const ind = s.indexOf(iteration, index)
        if(ind > -1) {
          indexes.push(ind)
          pushToArray(iteration, index + 1)
        }
      }
      
      pushToArray(iteration, 0)
  
    })
    return [...new Set(indexes)]
    
      
  };
  
  function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
      }
  }