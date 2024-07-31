console.log('------- Script Running :')

let data = JSON.parse(localStorage.getItem('Crud with JS data')) || []
let editId = ""

const handleSubmit = (e) => {
    let user = {}
    e.preventDefault()

    const input = document.querySelectorAll('input:not([type="radio"]):not([type="checkbox"]), select')
    const radio = document.querySelectorAll('input[type="radio"]:checked')
    const check = document.querySelectorAll('input[type="checkbox"]:checked')

    input.forEach((item) => user[item.name] = item.value)
    radio.forEach((item) => user[item.name] = item.value)
    check.forEach((item) => user[item.name] = user[item.name] ? [...user[item.name], item.value] : [item.value])
    
    if(!editId){
        user = {...user, id: Date.now()}
        data = [...data, user]
    }else{
        user.id = editId
        console.log('------- user : ' , user)
        data = data.map((item) => item.id === editId ? user : item)
        editId = ""
    }
    document.querySelector('form').reset()
    printData()
}

const handleDelete = (id) => {
    data = data.filter((item) => item.id != id)
    editId = ""
    printData()
}

const handleEdit = (id) => {
    const editUser = data.find((item) => +item.id === +id)
    
    const input = document.querySelectorAll('input:not([type="radio"]):not([type="checkbox"]), select')
    const multiInput = document.querySelectorAll('input[type="radio"], input[type="checkbox"]')

    input.forEach((inp) => inp.value = editUser[inp.name]);
    multiInput.forEach((item) => (editUser[item.name]?.includes(item.value)) ? item.checked = true : item.checked = false)

    editId = id
}

const printData = () => {
    let str = ''
    data.forEach((item, index) => {
        str += `<tr>
            <td>${index + 1}</td>
            <td>${item.firstName}</td>
            <td>${item.lastName}</td>
            <td>${item.email}</td>
            <td>${item.date}</td>
            <td>${item.age}</td>
            <td>${item.gender ?? '-'}</td>
            <td>${item.skill ?? '-'}</td>
            <td>${item.active}</td>
            <td>
                <button class="mx-1 text-black bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900" onClick="handleEdit(${item.id})">Edit</button>
                <button class="mx-1 text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" onClick="handleDelete(${item.id})">Delete</button>
            </td>
        </tr>`
    })
    document.querySelector('tbody').innerHTML = str;
    localStorage.setItem('Crud with JS data', JSON.stringify(data))
}
printData()