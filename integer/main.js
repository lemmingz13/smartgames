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
    [9, 8, 0, 2, 'Zero', 'sounds/zero.mp3'],
    [2, 1, 7, 1, 'One', 'sounds/one.mp3'],
    [2, 4, 6, 0, 'Two', 'sounds/two.mp3'],
    [8, 5, 3, 2, 'Three', 'sounds/three.mp3'],
    [1, 4, 7, 1, 'Four', 'sounds/four.mp3'],
    [5, 3, 2, 0, 'Five', 'sounds/five.mp3'],
    [9, 0, 6, 2, 'Six', 'sounds/six.mp3'],
    [1, 7, 3, 1, 'Seven', 'sounds/seven.mp3'],
    [8, 6, 0, 0, 'Eight', 'sounds/eight.mp3'],
    [6, 3, 9, 2, 'Nine', 'sounds/nine.mp3']
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
