// This is just the algorithm to this problem

//Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.
/**
 * @param {number[]} height
 * @return {number}
 */

//  Input: height = [0,1,0,2,1,0,1,3,2,1,2,1]
//  Output: 6
//  Explanation: The above elevation map (black section) is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water (blue section) are being trapped.

const trap = function (height) {
    // loop through the length of array
    // for the first row, check if the column has atleast "1" depth, followed by a 0, followed by another at least one depth
    // if this is the case, assign the lowest number after comparing current column and the next one after zero to a new array called "water"
    // keep doing this until you reach the end of the row 1
    // repeat for row 2, and for row 3 etc.
    //
   const length = height.length
   let water = 0
  
   for(let i=0; i<= length; i++) {
     const prev = height[i-1]? height[i-1] : 0
     const next = height[i+1]? height[i+1] : 0
  
     if(prev && next && height[i] === 0 ){
       if(prev <= next) water++
     }
   }
  
  
  };
  
  
  const height = [0,1,0,2,1,0,1,3,2,1,2,1]
  trap(height)