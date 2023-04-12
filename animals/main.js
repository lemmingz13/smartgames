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
        answers[0].innerHTML = objAnswers[random][0]
        answers[1].innerHTML = objAnswers[random][1]
        answers[2].innerHTML = objAnswers[random][2]
        question.innerHTML = objAnswers[random][4]
        audio = new Audio(objAnswers[random][5])
        play.addEventListener('click', () => {
            audio.play()
        })
    }
}

let objAnswers = [
    ['&#128001;', '&#128016;', '&#128042;', 2, 'Camel', 'sounds/camel.mp3'],
    ['&#128021;', '&#128008;', '&#129421;', 1, 'Cat', 'sounds/cat.mp3'],
    ['&#128004;', '&#128015;', '&#129423;', 0, 'Cow', 'sounds/cow.mp3'],
    ['&#129420;', '&#128014;', '&#128021;', 2, 'Dog', 'sounds/dog.mp3'],
    ['&#129428;', '&#128024;', '&#128007;', 1, 'Elephant', 'sounds/elephant.mp3'],
    ['&#128014;', '&#129432;', '&#128019;', 0, 'Horse', 'sounds/horse.mp3'],
    ['&#128008;', '&#128021;', '&#128018;', 2, 'Monkey', 'sounds/monkey.mp3'],
    ['&#128042;', '&#128022;', '&#128015;', 1, 'Pig', 'sounds/pig.mp3'],
    ['&#128017;', '&#128024;', '&#129433;', 0, 'Sheep', 'sounds/sheep.mp3'],
    ['&#129428;', '&#128019;', '&#128034;', 2, 'Turtle', 'sounds/turtle.mp3']
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
