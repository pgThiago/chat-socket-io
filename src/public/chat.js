const room = location.pathname.replace(/\//g, '')
// const hostname = location.hostname.includes('localhost') ? `http://localhost:3333/${room}` : `https://talk-socket-io.herokuapp.com/${room}`
const hostname = location.hostname.includes('localhost') ? `http://localhost:3333/` : `https://talk-socket-io.herokuapp.com/`
const socket = io(hostname)

let user = null
let inputIsEmpty = true
const userInputElement = document.getElementById('user_name')
const messageElement = document.getElementById('message')

const btnNameElement = document.getElementById('btn-name')
const btnMessageElement = document.getElementById('btn-message')

const userForm = document.getElementById('user_name_form')
const messageForm = document.getElementById('message_form')

function rebuildButton(btnId, text){
    const newBtn = document.createElement('button')
    newBtn.id = btnId
    newBtn.setAttribute('type', 'submit')
    newBtn.innerHTML = text

    return newBtn
}

socket.on('update_messages', (messages) => {
    updateMessagesOnScreen(messages)
})

function updateMessagesOnScreen(messages){    
    const messagesElement = document.querySelector('#messages')
    let messagesList = '<ul>'
    messages.forEach(message => {
        messagesList += `<li>${message.userName}: ${message.msg}</li>`
    })
    messagesList += '</ul>'

    messagesElement.innerHTML = messagesList
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#message_form')
    form.addEventListener('submit', (event) => {
        event.preventDefault()
        if(!user){
            alert('First tell us your name :)')
            return
        }
        const message = document.forms['message_form_name']['msg'].value
        document.forms['message_form_name']['msg'].value = ''
        socket.emit('new_message', { msg: message, userName: user })
    })
})

document.addEventListener('DOMContentLoaded', () => {
    const userForm = document.querySelector('#user_name_form')
    userForm.addEventListener('submit', (event) => {
        event.preventDefault()
        user = document.forms['user_name']['user_name_input'].value
        userForm.parentNode.removeChild(userForm)
    })
})

function isEmpty(inputData){
    inputData === '' ? inputIsEmpty = true : inputIsEmpty = false
}

userInputElement.addEventListener('input', (event) => {
    const inputValue = userInputElement.value
    isEmpty(inputValue)
    const btnNameElement = document.getElementById('btn-name')
    if(inputIsEmpty){
        if(!btnNameElement) return
        btnNameElement.remove()
    }else{
        if(btnNameElement) return
        userForm.appendChild(rebuildButton('btn-name', 'Start'))
    }
})

messageElement.addEventListener('input', (event) => {
    const messageValue = messageElement.value
    isEmpty(messageValue)
    const btnMessageElement = document.getElementById('btn-message')
    if(inputIsEmpty){
        if(!btnMessageElement) return
        btnMessageElement.remove()
    }else{
        if(btnMessageElement) return
        messageForm.appendChild(rebuildButton('btn-message', 'Send'))
    }
})