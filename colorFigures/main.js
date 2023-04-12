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
        answers[0].innerHTML = `<img class="img_quiz" src="${objAnswers[random][0]}"></img>`
        answers[1].innerHTML = `<img class="img_quiz" src="${objAnswers[random][1]}"></img>`
        answers[2].innerHTML = `<img class="img_quiz" src="${objAnswers[random][2]}"></img>`
        question.innerHTML = objAnswers[random][4]
        audio = new Audio(objAnswers[random][5])
        play.addEventListener('click', () => {
            audio.play()
        })
    }
}

let objAnswers = [
    ['images/redtriangle.png', 'images/greensquare.png', 'images/greentriangle.png', 2, 'Green triangle', 'sounds/greentriangle.mp3'],
    ['images/greensquare.png', 'images/redsquare.png', 'images/yellowhexagon.png', 1, 'Red square', 'sounds/redsquare.mp3'],
    ['images/yellowhexagon.png', 'images/yellowcircle.png', 'images/greenhexagon.png', 0, 'Yellow hexagon', 'sounds/yellowhexagon.mp3'],
    ['images/redrectangle.png', 'images/greensquare.png', 'images/bluerectangle.png', 2, 'Blue rectangle', 'sounds/bluerectangle.mp3'],
    ['images/greentriangle.png', 'images/redtriangle.png', 'images/redsquare.png', 1, 'Red triangle', 'sounds/redtriangle.mp3'],
    ['images/greensquare.png', 'images/greentriangle.png', 'images/redsquare.png', 0, 'Green square', 'sounds/greensquare.mp3'],
    ['images/yellowhexagon.png', 'images/greensquare.png', 'images/greenhexagon.png', 2, 'Green hexagon', 'sounds/greenhexagon.mp3'],
    ['images/yellowcircle.png', 'images/bluecircle.png', 'images/bluerectangle.png', 1, 'Blue circle', 'sounds/bluecircle.mp3'],
    ['images/redrectangle.png', 'images/redsquare.png', 'images/bluerectangle.png', 0, 'Red rectangle', 'sounds/redrectangle.mp3'],
    ['images/bluecircle.png', 'images/yellowhexagon.png', 'images/yellowcircle.png', 2, 'Yellow circle', 'sounds/yellowcircle.mp3']
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
