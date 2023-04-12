let randoms = []
let random 
let audio
let play = document.querySelector('.play_circle')
let question = document.querySelector('.question')
let answers = document.querySelectorAll('.answer')
let btnNext = document.querySelector('.button_next')
let squeres = document.querySelector('.squeres')
let answersRight = 0
let answersWrong = 0
let btnAgain = document.querySelector('.button_again')
let header = document.querySelector('header')
let rightSound = new Audio('../sounds/right.mp3')
let wrongSound = new Audio('../sounds/wrong.mp3')
let nextSound = new Audio('../sounds/next.mp3')
let overSound = new Audio('../sounds/over.mp3')

function randomFunc() {
    let randomVar = Math.floor(Math.random() * 10)
    if(randoms.includes(randomVar)) {
        randomFunc()
    } else {
        randoms.push(randomVar)
        random = randomVar
        answers[0].innerHTML = `<div style="background: ${objAnswers[random][0]}; width: 100%; height: 100%"></div>`
        answers[1].innerHTML = `<div style="background: ${objAnswers[random][1]}; width: 100%; height: 100%"></div>`
        answers[2].innerHTML = `<div style="background: ${objAnswers[random][2]}; width: 100%; height: 100%"></div>`
        question.innerHTML = objAnswers[random][4]
        audio = new Audio(objAnswers[random][5])
        play.addEventListener('click', () => {
            audio.play()
        })
    }
}

let objAnswers = [
    ['pink', 'brown', 'black', 2, 'Black', 'sounds/black.mp3'],
    ['red', 'blue', 'green', 1, 'Blue', 'sounds/blue.mp3'],
    ['brown', 'yellow', 'white', 0, 'Brown', 'sounds/brown.mp3'],
    ['black', 'pink', 'green', 2, 'Green', 'sounds/green.mp3'],
    ['purple', 'grey', 'white', 1, 'Grey', 'sounds/grey.mp3'],
    ['pink', 'red', 'blue', 0, 'Pink', 'sounds/pink.mp3'],
    ['grey', 'green', 'purple', 2, 'Purple', 'sounds/purple.mp3'],
    ['white', 'red', 'yellow', 1, 'Red', 'sounds/red.mp3'],
    ['white', 'red', 'pink', 0, 'White', 'sounds/white.mp3'],
    ['black', 'grey', 'yellow', 2, 'Yellow', 'sounds/yellow.mp3']
]

randomFunc()

answers.forEach((el) => {
    el.addEventListener('click', () => {
        if(el.dataset.id == objAnswers[random][3]) {
            rightSound.play()
            ++answersRight
            el.classList.add('answer_green')
            answers.forEach((el) => {
                el.classList.add('button_noactive')
            })
            btnNext.classList.remove('button_noactive')
            btnNext.classList.add('button_next_active')
            let squereGreen = document.createElement('div')
            squereGreen.style.background = '#339900'
            squereGreen.style.height = '20px'
            squereGreen.style.width = '20px'
            squeres.append(squereGreen)
        } else {
            wrongSound.play()
            ++answersWrong
            el.classList.add('answer_red')
            answers[objAnswers[random][3]].classList.add('answer_green')
            answers.forEach((el) => {
                el.classList.add('button_noactive')
            })
            btnNext.classList.remove('button_noactive')
            btnNext.classList.add('button_next_active')
            let squereRed = document.createElement('div')
            squereRed.style.background = '#CC0000'
            squereRed.style.height = '20px'
            squereRed.style.width = '20px'
            squeres.append(squereRed)
        }
    })
})

function gameOver() {
    header.insertAdjacentHTML('beforebegin', `
    <div class="modal_over">
    <div class="modal_over_title">Game over</div>
    <div class="modal_over_description">You are doing great</div>
    <div class="modal_over_right">Right answers: <span class="rights">7</span></div>
    <div class="modal_over_wrong">Wrong answers: <span class="wrongs">3</span></div>
    <div class="main_buttons">
        <a href="../index.html" class="button_back">&#128281;</a>
        <div class="button_again_modal">&#128260;</div>
    </div>
    </div>
    <div class="modal_background">
    </div>
    `)
    document.querySelector('html').classList.add('scroll_noactive')
    document.querySelector('.rights').innerHTML = answersRight
    document.querySelector('.wrongs').innerHTML = answersWrong
    let btnAgainModal = document.querySelector('.button_again_modal')
    btnAgainModal.addEventListener('click', () => {
        document.querySelector('.modal_over').remove()
        document.querySelector('.modal_background').remove()
        document.querySelector('html').classList.remove('scroll_noactive')
        playAgain()
    })
}

btnNext.addEventListener('click', () => {
    if(randoms.length === 10) {
        overSound.play()
        gameOver()
    } else {
        nextSound.play()
        btnNext.classList.add('button_noactive')
        btnNext.classList.remove('button_next_active')
        answers.forEach((el) => {
            el.classList.remove('button_noactive')
        })
        answers.forEach((el) => {
            el.classList.remove('answer_green')
            el.classList.remove('answer_red')
        })
        randomFunc()
    }
    
})

function playAgain() {
    nextSound.play()
    randoms = []
    random = null
    audio = null
    answersRight = 0
    answersWrong = 0
    btnNext.classList.add('button_noactive')
    btnNext.classList.remove('button_next_active')
    squeres.innerHTML = ''
    answers.forEach((el) => {
        el.classList.remove('button_noactive')
    })
    answers.forEach((el) => {
        el.classList.remove('answer_green')
        el.classList.remove('answer_red')
    })
    randomFunc()
}

btnAgain.addEventListener('click', playAgain)
