

const promise1 = new Promise((resolve, reject) => {
    const error = true
    console.log('------- promise created :')
    if(!error){
        setTimeout(() => {
        }, 1000);
        resolve('success')
    }else{
        reject('error occured')
    }
})

// -------------------------- METHOD 1 -----------------------------

// promise1.then((res) => {
//     return res
// }).then((data) => {
//     console.log('------- data : ' , data)
// }).catch((err) => {
//     console.log('------- err : ' , err)
// })

// // ---------------------------- METHOD 2

// const fun1 = async () => {
//     try{
//         const res = await promise1
//         console.log('------- res : ' , res)
//     }catch(err){
//         console.log('------- error :',err)
//     }
// }

// fun1()

// ---------------------------- METHOD 3

const fun2 = async () => {
    try{
        const res = await promise1
        console.log('------- res : ' , res)
    }catch(err){
        console.log('------- error :',err)
    }
}

fun2()