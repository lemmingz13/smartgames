let randoms = []
let random 
let audio
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
let plus = document.querySelector('.plus')
let minus = document.querySelector('.minus')
let multiply = document.querySelector('.multiply')
let divided = document.querySelector('.divided')
let types = document.querySelectorAll('.type_elem')

plus.classList.add('type_elem_active')

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
    }
}

let objAnswers = []

let arrPlus = [
    [9, 6, 8, 2, '1 + 7'],
    [8, 7, 9, 1, '2 + 5'],
    [5, 4, 6, 0, '3 + 2'],
    [8, 5, 7, 2, '4 + 3'],
    [3, 4, 6, 1, '2 + 2'],
    [10, 9, 11, 0, '3 + 7'],
    [9, 8, 7, 2, '6 + 1'],
    [6, 8, 9, 1, '4 + 4'],
    [3, 4, 5, 0, '0 + 3'],
    [6, 7, 9, 2, '5 + 4']
]

objAnswers = arrPlus

let arrMinus = [
    [5, 2, 4, 2, '7 - 3'],
    [1, 3, 4, 1, '5 - 2'],
    [1, 4, 2, 0, '3 - 2'],
    [5, 2, 1, 2, '4 - 3'],
    [1, 0, 3, 1, '2 - 2'],
    [3, 5, 2, 0, '7 - 4'],
    [8, 3, 5, 2, '6 - 1'],
    [1, 0, 3, 1, '4 - 4'],
    [3, 0, 1, 0, '3 - 0'],
    [7, 4, 5, 2, '8 - 3']
]

let arrMultiply = [
    [18, 24, 21, 2, '7 x 3'],
    [8, 10, 15, 1, '5 x 2'],
    [6, 8, 4, 0, '3 x 2'],
    [15, 10, 12, 2, '4 x 3'],
    [2, 4, 8, 1, '2 x 2'],
    [28, 21, 24, 0, '7 x 4'],
    [12, 16, 6, 2, '6 x 1'],
    [18, 16, 12, 1, '4 x 4'],
    [0, 3, 6, 0, '3 x 0'],
    [27, 21, 24, 2, '8 x 3']
]

let arrDivided = [
    [6, 2, 4, 2, '8 / 2'],
    [4, 5, 7, 1, '15 / 3'],
    [3, 5, 4, 0, '12 / 4'],
    [6, 3, 2, 2, '6 / 3'],
    [3, 2, 4, 1, '8 / 4'],
    [3, 5, 6, 0, '18 / 6'],
    [4, 5, 3, 2, '21 / 7'],
    [5, 7, 8, 1, '28 / 4'],
    [3, 5, 4, 0, '9 / 3'],
    [8, 5, 7, 2, '14 / 2']
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

plus.addEventListener('click', () => {
    types.forEach((el) => {
        el.classList.remove('type_elem_active')
    })
    plus.classList.add('type_elem_active')
    objAnswers = arrPlus
    randoms.pop()
    randomFunc()
    
})

minus.addEventListener('click', () => {
    types.forEach((el) => {
        el.classList.remove('type_elem_active')
    })
    minus.classList.add('type_elem_active')
    objAnswers = arrMinus
    randoms.pop()
    randomFunc()
    
})
multiply.addEventListener('click', () => {
    types.forEach((el) => {
        el.classList.remove('type_elem_active')
    })
    multiply.classList.add('type_elem_active')
    objAnswers = arrMultiply
    randoms.pop()
    randomFunc()
    
})
divided.addEventListener('click', () => {
    types.forEach((el) => {
        el.classList.remove('type_elem_active')
    })
    divided.classList.add('type_elem_active')
    objAnswers = arrDivided
    randoms.pop()
    randomFunc()
    
})