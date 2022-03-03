/**
This was a whiteboarding question asked in the recent tech interview. To find out the company I interviewed for DM me ;)


PAGINATION INTERFACE
We have a list of items and we want to add pagination. You will create a text-based UI to show and navigate between the pages.

Your pagination component is based on three integer values: (1) total number of pages, (2) number of pages to show, and (3) the current page.

It uses an * to mark the current page. That page should be centered as much as feasible. A “<” on the left side indicates that the user can move down from the current page. A “>” on the right side indicates that the user can move up from the current page. Here is an example:

┍━━━━━━━━━━━━━━━━━━━━━━━━━┑
│         Inputs          │     
┝━━━━━━━┯━━━━━━━┯━━━━━━━━━┿━━━━━━━━━━━━━━━━━━━━━━━━━━━┑
│ Total │ Show  │ Current │ Output                    │
┝━━━━━━━┿━━━━━━━┿━━━━━━━━━┿━━━━━━━━━━━━━━━━━━━━━━━━━━━┥
│   10  │   7   │    5    │ < 2 3 4 5* 6 7 8 >        │
┕━━━━━━━┷━━━━━━━┷━━━━━━━━━┷━━━━━━━━━━━━━━━━━━━━━━━━━━━┙


┍━━━━━━━━━━━━━━━━━━━━━━━━━┑
│         Inputs          │     
┝━━━━━━━┯━━━━━━━┯━━━━━━━━━┿━━━━━━━━━━━━━━━━━━━━━━━━━━━┑
│ Total │ Show  │ Current │ Output                    │
┝━━━━━━━┿━━━━━━━┿━━━━━━━━━┿━━━━━━━━━━━━━━━━━━━━━━━━━━━┥
│   10  │   7   │    1    │ 1* 2 3 4 5 6 7 >          │
│   10  │   7   │    10   │ < 4 5 6 7 8 9 10*         │
│    5  │   7   │    3    │ < 1 2 3* 4 5 >            │
┕━━━━━━━┷━━━━━━━┷━━━━━━━━━┷━━━━━━━━━━━━━━━━━━━━━━━━━━━┙



*/

const paginate = (total, show, current) => {
    let centerPage = Math.floor(show/2)
    if(current === 10) centerPage = current - 1 - centerPage 
   
    
    let start = current - centerPage 
    if (current === 1) start = 1
   
   
    let end = current + centerPage
    if(current === 1) end = show
    if(current === 10) end = current
     

    if (show > total) {
     let padding = (show - total)/2
     start = start + padding
     end = end - padding
    }
   
    let output = ''
    
    for(let i = start; i<=end; i++){
      if(i === current) {
      output = `${output} ${i}*`
      } else output = `${output} ${i}`
    }
     
    if(current ===1)  output = `${output} >`
    else if(current === 10) output = `<${output}`
    else output = `<${output} >`
    
   }
   
   
   paginate(5, 7, 3)