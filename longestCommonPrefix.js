

//https://leetcode.com/problems/longest-common-prefix/

// this solution is partially correct. More work to be done. This works for the current example - ["flower","flow","flight"]

var longestCommonPrefix = function (strs) {
    let splitStrings = [];
    let maxLength = 0;
    let equalLetters = [];
      
    if(strs.length === 1) return strs[0]
  
    strs.forEach((str) => {
      if (str.length > maxLength) maxLength = str.length;
      const splitStr = str.split('');
      splitStrings.push(splitStr);
    });
  
    for (let i = 0; i < splitStrings.length; i++) {
      //compare current splitStr and next splitStr, see if there are more than one occurence of prefix
      if (i === 1 && equalLetters.length === 0) break
      for (let j = 0; j < maxLength; j++) {
        let nextLetter = () => {
          if (!splitStrings[i + 1]) return '';
          else {
            if (splitStrings[i + 1][j]) return splitStrings[i + 1][j];
            else return '';
          }
        };
        let isLetterEqual = splitStrings[i][j] === nextLetter();
        if (isLetterEqual) equalLetters.push(splitStrings[i][j]);
      }
    }
  
    if(equalLetters.length > 1) {
      equalLetters = equalLetters.filter((letter, index) => {
        return equalLetters.slice(index + 1).includes(letter);
      });
    }
  
    return equalLetters.join('') || ''
};


console.log(longestCommonPrefix(["flower","flow","flight"]))