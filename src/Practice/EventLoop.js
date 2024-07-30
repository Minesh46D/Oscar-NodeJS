const fun1 = () => {
    console.log('------- fun1 running :')   // 1
    fun2()                                          
    setTimeout(() => {
        fun3()
    }, 200);
    console.log('------- fun1 ended :')                // 3
}
const fun2 = () => {
    console.log('------- fun2 :')               // 2
}
const fun3 = () => {
    console.log('------- fun3 :')                              // 4
}

fun1()