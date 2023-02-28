            


async function fetchClasses() {
    const res = await axios.get('http://localhost:8000/classes')
    const classes = res.data

    const select = document.getElementById('classes')
    for (let i = 0; i < classes.length; i++ ) {
        let opt = document.createElement('option')
        opt.value = classes[i].id
        opt.innerHTML = classes[i].name
        select.appendChild(opt)
    }

    console.log(res.data)
}

async function joinClass(e) {
    const classId = e.value

}


fetchClasses()
console.log('hi')