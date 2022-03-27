

// Sometimes when a customer is charged, there is a duplicate transaction created. We need to find those transactions so that they can be dealt with. 
// Everything about the transaction should be identical, except the transaction id and the time at which it occurred, as there can be up to a minute delay.


// Find all transactions that have the same sourceAccount, targetAccount, category, amount, and the time difference between each consecutive transaction is less than 1 minute.
// The incoming transactions are not guaranteed to be in any particular order.
// List of all the duplicate transaction groups, ordered by time ascending (Transaction[][]). The groups should be sorted in ascending order of the first transaction in the group.

// :::: Example :::
// Input transactions:
// [
//     {
//       id: 3,
//       sourceAccount: 'A',
//       targetAccount: 'B',
//       amount: 100,
//       category: 'eating_out',
//       time: '2018-03-02T10:34:30.000Z'
//     },
//     {
//       id: 1,
//       sourceAccount: 'A',
//       targetAccount: 'B',
//       amount: 100,
//       category: 'eating_out',
//       time: '2018-03-02T10:33:00.000Z'
//     },
//     {
//       id: 6,
//       sourceAccount: 'A',
//       targetAccount: 'C',
//       amount: 250,
//       category: 'other',
//       time: '2018-03-02T10:33:05.000Z'
//     },
//     {
//       id: 4,
//       sourceAccount: 'A',
//       targetAccount: 'B',
//       amount: 100,
//       category: 'eating_out',
//       time: '2018-03-02T10:36:00.000Z'
  
//     },
//   {
//     id: 2,
//     sourceAccount: 'A',
//     targetAccount: 'B',
//     amount: 100,
//     category: 'eating_out',
//     time: '2018-03-02T10:33:50.000Z'
//   },
//   {
//     id: 5,
//     sourceAccount: 'A',
//     targetAccount: 'C',
//     amount: 250,
//     category: 'other',
//     time: '2018-03-02T10:33:00.000Z'
//   }
// ];

// Expected output:
// [
//   [
//     {
//       id: 1,
//       sourceAccount: "A",
//       targetAccount: "B",
//       amount: 100,
//       category: "eating_out",
//       time: "2018-03-02T10:33:00.000Z"
//     },
//     {
//       id: 2,
//       sourceAccount: "A",
//       targetAccount: "B",
//       amount: 100,
//       category: "eating_out",
//       time: "2018-03-02T10:33:50.000Z"
//     },
//     {
//       id: 3,
//       sourceAccount: "A",
//       targetAccount: "B",
//       amount: 100,
//       category: "eating_out",
//       time: "2018-03-02T10:34:30.000Z"
//     }
//   ],
//   [
//     {
//       id: 5,
//       sourceAccount: "A",
//       targetAccount: "C",
//       amount: 250,
//       category: "other",
//       time: "2018-03-02T10:33:00.000Z"
//     },
//     {
//       id: 6,
//       sourceAccount: "A",
//       targetAccount: "C",
//       amount: 250,
//       category: "other",
//       time: "2018-03-02T10:33:05.000Z"
//     }
//   ]
// ];


function findDuplicateTransactions (transactions = []) {
    if(!transactions.length) return []
   
    let duplicateTransactions = []
   
    const categoryIds = []
    // construct categoryIds array of objects
    // each object will have category ids that share the same category, amount, sourceAccount and targetAccount
    transactions.forEach((trans) => {
      const index = categoryIds.findIndex((element) => { return element.category === trans.category && element.amount === trans.amount && element.sourceAccount === trans.sourceAccount && element.targetAccount === trans.targetAccount })
      if(index > -1 ) {
        categoryIds[index].ids.push(trans.id)
      } else {
         categoryIds[categoryIds.length] = { ids: [trans.id], category: trans.category, amount: trans.amount, sourceAccount: trans.sourceAccount, targetAccount: trans.targetAccount}
      }
    })
   
    categoryIds.forEach((category) => {
       let subArr = []
       // subArr is the array "group" of duplicate transactions. Had a hard time naming this.
       category.ids.forEach((id) => {
        let trans = transactions.find((transaction) => transaction.id === id)
        subArr.push(trans)
       })
     
      subArr.sort((a,b) => {
        if(Date.parse(a.time) > Date.parse(b.time)) return 1
        else if (Date.parse(a.time) < Date.parse(b.time)) return -1
        else return 0
      })
     
      //compare current time to the previous time and next time in subArr, if time difference is > 1 minute remove object
      for(let i=0; i<subArr.length; i++){
        // check current index if prev comparison is < 60 AND next comparison is < 60.
        // If at the start means no previous value and at the end means no next value. This is being accounted for.

        let prev = subArr[i-1] ? Date.parse(subArr[i-1].time) : 0
        let curr = Date.parse(subArr[i].time)
        let next = subArr[i+1] ? Date.parse(subArr[i+1].time) : 0
       
        let isMoreThanMinute = (curr - prev) > 60000  && (next - curr) > 60000
        if(!subArr[i-1]) isMoreThanMinute = (next - curr) > 60000
        if (!subArr[i+1]) isMoreThanMinute = (curr - prev) > 60000
  
        if(isMoreThanMinute) {
          subArr.splice(i, 1)
          //reset loop since we are changing array length
          i = -1
        }
      }
      if(subArr.length > 1) duplicateTransactions.push(subArr)
    })
   
    duplicateTransactions.sort((a,b) => {
      if(Date.parse(a[0].time) > Date.parse(b[0].time)) return 1
      else if (Date.parse(a[0].time) < Date.parse(b[0].time)) return -1
      else return 0
    })
  
    return duplicateTransactions
  }

  const transactions = [
    {
      id: 24,
      sourceAccount: 'my_account',
      targetAccount: 'fitness_club',
      amount: -610,
      category: 'other',
      time: '2018-04-22T11:54:10.000Z'
    },
    {
      id: 38,
      sourceAccount: 'my_account',
      targetAccount: 'restaurant',
      amount: -970,
      category: 'eating_out',
      time: '2018-05-17T19:52:46.000Z'
    },
    {
      id: 17,
      sourceAccount: 'my_account',
      targetAccount: 'supermarket',
      amount: -1870,
      category: 'groceries',
      time: '2018-04-05T10:24:30.000Z'
    },
    {
      id: 23,
      sourceAccount: 'my_account',
      targetAccount: 'coffee_shop',
      amount: -70,
      category: 'eating_out',
      time: '2018-04-15T09:12:20.000Z'
    },
    {
      id: 42,
      sourceAccount: 'my_account',
      targetAccount: 'cinema',
      amount: -450,
      category: 'other',
      time: '2018-05-23T19:13:10.000Z'
    },
    {
      id: 7,
      sourceAccount: 'my_account',
      targetAccount: 'supermarket',
      amount: -160,
      category: 'groceries',
      time: '2018-03-02T13:14:00.000Z'
    },
    {
      id: 36,
      sourceAccount: 'my_account',
      targetAccount: 'internet_shop',
      amount: -1650,
      category: 'other',
      time: '2018-05-08T21:36:41.000Z'
    },
    {
      id: 31,
      sourceAccount: 'my_account',
      targetAccount: 'coffee_shop',
      amount: -90,
      category: 'eating_out',
      time: '2018-05-07T09:55:10.000Z'
    },
    {
      id: 1,
      sourceAccount: 'company_x',
      targetAccount: 'my_account',
      amount: 10000,
      category: 'salary',
      time: '2018-02-25T08:00:00.000Z'
    },
    {
      id: 8,
      sourceAccount: 'my_account',
      targetAccount: 'restaurant',
      amount: -670,
      category: 'eating_out',
      time: '2018-03-02T18:54:45.000Z'
    },
    {
      id: 5,
      sourceAccount: 'my_account',
      targetAccount: 'coffee_shop',
      amount: -50,
      category: 'eating_out',
      time: '2018-03-02T09:25:20.000Z'
    },
    {
      id: 11,
      sourceAccount: 'my_account',
      targetAccount: 'supermarket',
      amount: -1540,
      category: 'groceries',
      time: '2018-03-05T16:24:31.000Z'
    },
    {
      id: 28,
      sourceAccount: 'my_account',
      targetAccount: 'supermarket',
      amount: -1870,
      category: 'groceries',
      time: '2018-05-05T10:24:30.000Z'
    },
    {
      id: 19,
      sourceAccount: 'my_account',
      targetAccount: 'coffee_shop',
      amount: -90,
      category: 'eating_out',
      time: '2018-04-07T09:54:21.000Z'
    },
    {
      id: 14,
      sourceAccount: 'my_account',
      targetAccount: 'coffee_shop',
      amount: -50,
      category: 'eating_out',
      time: '2018-04-01T10:24:40.000Z'
    },
    {
      id: 13,
      sourceAccount: 'my_account',
      targetAccount: 'coffee_shop',
      amount: -50,
      category: 'eating_out',
      time: '2018-04-01T10:24:00.000Z'
    },
    {
      id: 27,
      sourceAccount: 'company_x',
      targetAccount: 'my_account',
      amount: 10000,
      category: 'salary',
      time: '2018-04-25T08:00:00.000Z'
    },
    {
      id: 3,
      sourceAccount: 'my_account',
      targetAccount: 'supermarket',
      amount: -1000,
      category: 'groceries',
      time: '2018-03-01T17:28:32.000Z'
    },
    {
      id: 201,
      sourceAccount: 'company_x',
      targetAccount: 'my_account',
      amount: 10000,
      category: 'pension_benefits',
      time: '2018-02-25T08:00:00.000Z'
    },
    {
      id: 2,
      sourceAccount: 'my_account',
      targetAccount: 'coffee_shop',
      amount: -50,
      category: 'eating_out',
      time: '2018-03-01T12:34:00.000Z'
    },
    {
      id: 25,
      sourceAccount: 'my_account',
      targetAccount: 'supermarket',
      amount: -850,
      category: 'groceries',
      time: '2018-04-20T18:51:31.000Z'
    },
    {
      id: 26,
      sourceAccount: 'my_account',
      targetAccount: 'cinema',
      amount: -450,
      category: 'other',
      time: '2018-04-23T19:13:10.000Z'
    },
    {
      id: 30,
      sourceAccount: 'my_account',
      targetAccount: 'coffee_shop',
      amount: -90,
      category: 'eating_out',
      time: '2018-05-07T09:54:21.000Z'
    },
    {
      id: 10,
      sourceAccount: 'my_account',
      targetAccount: 'fitness_club',
      amount: -560,
      category: 'other',
      time: '2018-03-04T12:54:10.000Z'
    },
    {
      id: 29,
      sourceAccount: 'my_account',
      targetAccount: 'cinema',
      amount: -580,
      category: 'other',
      time: '2018-05-05T20:01:18.000Z'
    },
    {
      id: 32,
      sourceAccount: 'my_account',
      targetAccount: 'coffee_shop',
      amount: -90,
      category: 'eating_out',
      time: '2018-05-07T09:56:09.000Z'
    },
    {
      id: 102,
      sourceAccount: 'my_account',
      targetAccount: 'internet_shop',
      amount: -250,
      category: 'other',
      time: '2018-03-01T22:16:50.000Z'
    },
    {
      id: 40,
      sourceAccount: 'my_account',
      targetAccount: 'fitness_club',
      amount: -610,
      category: 'other',
      time: '2018-05-22T11:54:10.000Z'
    },
    {
      id: 18,
      sourceAccount: 'my_account',
      targetAccount: 'cinema',
      amount: -580,
      category: 'other',
      time: '2018-04-05T20:01:18.000Z'
    },
    {
      id: 15,
      sourceAccount: 'my_account',
      targetAccount: 'coffee_shop',
      amount: -50,
      category: 'eating_out',
      time: '2018-04-01T10:25:10.000Z'
    },
    {
      id: 33,
      sourceAccount: 'my_account',
      targetAccount: 'coffee_shop',
      amount: -90,
      category: 'eating_out',
      time: '2018-05-07T09:57:05.000Z'
    },
    {
      id: 35,
      sourceAccount: 'my_account',
      targetAccount: 'coffee_shop',
      amount: -90,
      category: 'eating_out',
      time: '2018-05-07T09:58:06.000Z'
    },
    {
      id: 101,
      sourceAccount: 'company_x',
      targetAccount: 'my_account',
      amount: 240,
      category: 'salary',
      time: '2018-02-25T08:00:30.000Z'
    },
    {
      id: 20,
      sourceAccount: 'my_account',
      targetAccount: 'internet_shop',
      amount: -1650,
      category: 'other',
      time: '2018-04-08T21:36:41.000Z'
    },
    {
      id: 21,
      sourceAccount: 'my_account',
      targetAccount: 'supermarket',
      amount: -1690,
      category: 'groceries',
      time: '2018-04-10T18:14:10.000Z'
    },
    {
      id: 41,
      sourceAccount: 'my_account',
      targetAccount: 'supermarket',
      amount: -850,
      category: 'groceries',
      time: '2018-05-20T18:51:31.000Z'
    },
    {
      id: 37,
      sourceAccount: 'my_account',
      targetAccount: 'supermarket',
      amount: -1690,
      category: 'groceries',
      time: '2018-05-10T18:14:10.000Z'
    },
    {
      id: 22,
      sourceAccount: 'my_account',
      targetAccount: 'restaurant',
      amount: -970,
      category: 'eating_out',
      time: '2018-04-17T19:52:46.000Z'
    },
    {
      id: 4,
      sourceAccount: 'my_account',
      targetAccount: 'cinema',
      amount: -330,
      category: 'other',
      time: '2018-03-01T20:10:15.000Z'
    },
    {
      id: 9,
      sourceAccount: 'my_account',
      targetAccount: 'coffee_shop',
      amount: -50,
      category: 'eating_out',
      time: '2018-03-04T07:14:20.000Z'
    },
    {
      id: 39,
      sourceAccount: 'my_account',
      targetAccount: 'coffee_shop',
      amount: -70,
      category: 'eating_out',
      time: '2018-05-15T09:12:20.000Z'
    },
    {
      id: 16,
      sourceAccount: 'company_x',
      targetAccount: 'my_account',
      amount: 10000,
      category: 'salary',
      time: '2018-03-25T08:10:00.000Z'
    },
    {
      id: 12,
      sourceAccount: 'my_account',
      targetAccount: 'bowling_place',
      amount: -600,
      category: 'other',
      time: '2018-03-05T21:12:10.000Z'
    },
    {
      id: 6,
      sourceAccount: 'my_account',
      targetAccount: 'internet_shop',
      amount: -250,
      category: 'other',
      time: '2018-03-01T22:16:40.000Z'
    }
  ]
