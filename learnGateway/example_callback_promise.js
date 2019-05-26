// Exmaple to show callback, promise and async-await


// Callback hell
/*
function cleanTheRoom(){
    // I need to get broom
    callToGet('/getBroom', function(broom){
        console.log(`got the ${broom} !`);
        // I need to get lizol
        callToGet('/getLyzol', function(lizol){
            console.log(`got the ${lizol} !`);
            // I should get reward
            callToGiveReward('/postReward?value=10', function(resutl){
                console.log(`Reward result [success/fail] : ${result}`)
            })
        })
    })
}
*/

// Promise
/*
function cleanTheRoom(){
    console.log('Before calling ......')
    callToGet('/getBroom')
    .then((broom) => {
        console.log(`got the ${broom} !`);
        return callToGet('/getlizol');
    })
    .then((lizol) => {
        console.log(`got the ${lizol} !`);
        return callToGiveReward('/postReward?value=10')
    })
    .then((result) => {
        console.log(`Reward ${result}`)
    })
    .catch((err) => {
        console.log(err);
    })
    console.log('NONBLOCKING : After calling ......')
}

function callToGet(url){
    return new Promise((resolve, reject) => {
        if(url == ""){
            reject(new Error("please pass the url"));
        }else{
            // use this url
            if(url  === '/getBroom')
            setTimeout(resolve('broom'), 2000);
            else
            setTimeout(resolve('lizol'), 2000);
            
        }
    })
}

function callToGiveReward(url){
    return new Promise((resolve, reject) => {
        if(url == ""){
            reject(new Error("please pass the url"));
        }else{
            // use this url
            setTimeout(resolve('success'), 4000);
        }
    })
}

cleanTheRoom();
*/
// async-await
async function cleanTheRoom(){
    console.log('Before calling ......')
    const broom = await callToGet('/getBroom')
    console.log(`got the ${broom} !`);
    const lizol = await callToGet('/getlizol');
    console.log(`got the ${lizol} !`);
    const result = await callToGiveReward('/postReward?value=10')
    console.log(`Reward ${result}`);
    console.log('BLOCKING : After calling ......')
}

function callToGet(url){
    return new Promise((resolve, reject) => {
        if(url == ""){
            reject(new Error("please pass the url"));
        }else{
            // use this url
            if(url  === '/getBroom')
            setTimeout(resolve('broom'), 2000);
            else
            setTimeout(resolve('lizol'), 2000);
            
        }
    })
}

function callToGiveReward(url){
    return new Promise((resolve, reject) => {
        if(url == ""){
            reject(new Error("please pass the url"));
        }else{
            // use this url
            setTimeout(resolve('success'), 4000);
        }
    })
}

cleanTheRoom();
