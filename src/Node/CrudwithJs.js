console.log('script loaded')

const form = document.querySelector('#crudForm');
let data = JSON.parse(localStorage.getItem('JS Crud')) || []
let oldData = false
let oldDataIndex;


const handleSubmit = (e) => {
    e.preventDefault()
    let user = {}
    
    const input = document.querySelectorAll('input:not([type="radio"]):not([type="checkbox"])')
    const inputRadio = document.querySelectorAll('input[type="radio"]:checked')
    const inputCheckbox = document.querySelectorAll('input[type="checkbox"]:checked')

    input.forEach(x => user[x.id] = x.value)
    user[inputRadio[0]?.name] = inputRadio[0]?.value
    inputCheckbox.forEach((item) => {
        // user[item.name] = [... (user[item.name] ?? []), item.value]
        user = {...user, [item.name] : [... (user[item.name] ?? []), item.value]}
    })

    if(!oldData){
        data = [...data, {...user, id: Date.now()}]
    }else{
        data.splice(oldDataIndex, 1, user)
        oldData = false
    }
    printData()
    form.reset()
}

const printData = () => {
    let str = ''
    data.forEach((o, index) => {
        str = str.concat(`<tr>
                <td>${index + 1}</td>
                <td>${o.firstName}</td>
                <td>${o.lastName}</td>
                <td>${o.email}</td>
                <td>${o.address}</td>
                <td>${o.city}</td>
                <td>${o.gender ?? 'none'}</td>
                <td>${o.hobbies?.join(', ') ?? 'none'}</td>
                <td class="text-nowrap">
                    <button class="btn btn-warning mx-1" onClick = "editData(${o.id})">Edit</button>
                    <button class="btn btn-danger mx-1" onClick = "deleteData(${o.id})">Delete</button>
                </td>
            </tr>`)
        })
    document.querySelector('tbody').innerHTML = str

}

const deleteData = (id) => {
    // data.splice(id, 1)
    data = data.filter((item) => +item.id !== +id)
    printData()
}

const editData = (id) => {
    const editUser = data.find((item) => +item.id === id)

    const input = document.querySelectorAll('input')

    input.forEach((inp) => {
        for(const key in editUser){
            if(inp.type === "checkbox" && inp.name === key){
                if(editUser[key].includes(inp.value)){
                    inp.checked = true
                }else{
                    inp.checked = false
                }
            }else if(inp.type === "radio" && inp.name === key){
                if(editUser[key].includes(inp.value)){
                    inp.checked = true
                }else{
                    inp.checked = false
                }
            }else if(inp.type !== "radio" && inp.type !== "checkbox"){
                // console.log('------- inp : ' , inp)
                inp.value = editUser[key]
            }
        }
    })


    // const input = document.querySelectorAll('input:not([type="radio"]):not([type="checkbox"])')
    // const inputCheckbox = document.querySelectorAll('input[type="checkbox"]')

    // input.forEach(x => x.value = obj[x.name])
    // document.querySelector(`input[type="radio"][value="${obj.gender}"]`).checked = true
    // inputCheckbox.forEach(x => {
    //     if(obj.hobbies.includes(x.value)){
    //         x.checked = true
    //     }
    // })
    // oldData = true
    oldDataIndex = id
}





























































 
  // Whenever the user explicitly chooses dark mode
  localStorage.theme = 'dark'
  

// On page load or when changing themes, best to add inline in `head` to avoid FOUC
if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
  

 