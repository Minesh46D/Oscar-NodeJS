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
                <td>${o.id}</td>
                <td>${o.firstName}</td>
                <td>${o.lastName}</td>
                <td>${o.email}</td>
                <td>${o.address}</td>
                <td>${o.city}</td>
                <td>${o.gender ?? 'none'}</td>
                <td>${o.hobbies?.join(', ') ?? 'none'}</td>
                <td class="text-nowrap">
                    <button class="btn btn-warning mx-1" onClick = "editData(${index})">Edit</button>
                    <button class="btn btn-danger mx-1" onClick = "deleteData(${index})">Delete</button>
                </td>
            </tr>`)
        })
    document.querySelector('tbody').innerHTML = str

}

const deleteData = (id) => {
    data.splice(id, 1)
    printData()
}

const editData = (index) => {
    const obj = data[index]
    const input = document.querySelectorAll('input:not([type="radio"]):not([type="checkbox"])')
    const inputCheckbox = document.querySelectorAll('input[type="checkbox"]')

    input.forEach(x => x.value = obj[x.name])
    document.querySelector(`input[type="radio"][value="${obj.gender}"]`).checked = true
    inputCheckbox.forEach(x => {
        if(obj.hobbies.includes(x.value)){
            x.checked = true
        }
    })
    oldData = true
    oldDataIndex = index
}





























































 
  // Whenever the user explicitly chooses dark mode
  localStorage.theme = 'dark'
  

// On page load or when changing themes, best to add inline in `head` to avoid FOUC
if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
  

 