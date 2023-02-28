
let socket = io();
let students = [];

socket.on('call', (student) => {
    const calledElement = document.getElementById('called')
    const studentList = document.createElement('li')
    studentList.className = 'bg-slate-300 rounded-xl p-3 w-10/12 right-0 left-0 mx-auto mt-3'
    studentList.innerHTML = student.name
    calledElement.prepend(studentList)
    const audio = new Audio('assets/sounds/notif.mp3')
    audio.play()
})

socket.on('send' ,(called) => {
    const student = students.find(s => s.id === called.id)
    if (student) {
        const studentElement = document.getElementById(called.id)
        studentElement.classList.add('bg-green-100')
        studentElement.innerHTML = `<span>${called.name}</span><span>On the way</span>`
    }
})

async function fetchClasses() {
    const res = await axios.get('http://localhost:8000/classes')
    const classes = res.data

    const select = document.getElementById('classes')
    for (let i = 0; i < classes.length; i++) {
        let opt = document.createElement('option')
        opt.value = classes[i].id
        opt.innerHTML = classes[i].name
        select.appendChild(opt)
    }

    console.log(res.data)
}

async function fetchStudents(cardId) {
    const res = await axios.get('http://localhost:8000/students?card=' + cardId)
    return res.data
}

async function joinClass(e) {
    const classId = e.value
    console.log(e.value)
    socket.emit('class:join', classId)
}

const btn = document.getElementById('send')

btn.addEventListener('click', async () => {
    const cardIdInput = document.getElementById('cardId')
    const formElement = document.getElementById('form')
    const statusElement = document.getElementById('status')
    const statusList = document.getElementById('statusList')
    statusElement.classList.remove('hidden')

    students = await fetchStudents(cardIdInput.value)

    students.forEach(s => {
        const li = document.createElement('li')
        li.id = s.id
        li.className = 'flex flex-row justify-between my-2 bg-gray-100 p-3 rounded-md'
        li.innerHTML = `<span>${s.name}</span><span>awaiting...</span>`
        statusList.appendChild(li)
    })

    formElement.remove()

    socket.emit('call', cardIdInput.value)
})


fetchClasses()
console.log('hi')