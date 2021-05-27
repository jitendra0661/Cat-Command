#!/usr/bin/env node

let fs= require("fs");

(function () {

let cmd=process.argv.slice(2);

let options=[];
let files=[];
let str=``;

for(let i=0;i<cmd.length;i++)
{
    if(cmd[i].startsWith('-'))
    {
        options.push(cmd[i]);
    }else{
        files.push(cmd[i]);
    }
}

for(let j=0;j<files.length;j++)
{
    if(fs.existsSync(files[j]))
    {
       str +=fs.readFileSync(files[j]).toString();
    }else
    {
        console.log("invalid file");
        return;
    }
}

      str = str.split("\n");

      if(options.includes("-s"))
      {
          str = removeLargeSpaces(str);
      }


      if(options.includes("-n") && options.includes("-b"))
      {
          if(options.indexOf("-n") > options.indexOf("-b"))
          {   
              //use -b
              str = addNonEmptyNum(str);
          } else {
              // use -n  
              str = addAllNum(str);
          }
      } 
      else{
        // either one is present or none is present
          if(options.includes("-n"))
          {
              str = addAllNum(str);
          }

          if(options.includes("-b")) {
              str = addNonEmptyNum(str);
          }
        }   

      str = str.join("\n");

      console.log(str);

})();

// console.log(options);
// console.log(files);

function removeLargeSpaces(arr)
{
    let y=[];
    let flag=false;

    for(let i=0;i<arr.length;i++)
    {
        if(arr[i]=== "" || arr[i]=="\r")
        {
            if(flag===true)
           {
            continue;
           } 
        else
        {
            y.push(arr[i]);
            flag=true;
        }
    } else
    {
        y.push(arr[i]);
        flag=false;
    }
}

return y;
}


//-n
function addAllNum(arr) 
{
    for(let i=1;i<=arr.length;i++)
    {
        arr[i-1] = i + " " + arr[i-1];
    }
    return arr;
}


//-b
function addNonEmptyNum(arr) {
    let lineNumber = 1;

    for(let i=0;i<arr.length;i++){
        if(arr[i]!== "" && arr[i]!=="\r")
        {
            arr[i] = lineNumber + " " + arr[i];
            lineNumber++;
        }
    }

    return arr;
}



