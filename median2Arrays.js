// https://leetcode.com/problems/median-of-two-sorted-arrays/

var findMedianSortedArrays = function(nums1, nums2) {  
    let joinedArr = nums1.concat(nums2).sort((a,b) => a - b)
    
    let firstPos = joinedArr.findIndex(el => Math.sign(el) === 1)
    let posArr = joinedArr.slice(firstPos)
    let negArr = joinedArr.slice(0,firstPos).sort((a,b) => a - b)
    let newArr = negArr.concat(posArr)

    let arrLength = newArr.length
    let median = 0
    let midIndex = Math.floor(arrLength/2)
          
    if (arrLength % 2 === 1) {
      median = newArr[midIndex]
    }
    else {
      median = (newArr[midIndex-1] + joinedArr[midIndex ])/2
    }
    return median
};


const nums1 = [3]
const nums2= [2, -1]

findMedianSortedArrays(nums1, nums2)

//test cases
// const nums1 = [3]
// const nums2= [2, -1, 0, -3]