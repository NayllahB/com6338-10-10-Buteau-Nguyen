
const animeBaseURL = 'https://api.jikan.moe/v4/anime/'
const naruto = '20'
const onePiece = '21'
const bleach = '269'

// General fetch function for anime data
const animeCard = async (animeId) => {
    const animeSpecificURL = `${animeBaseURL}${animeId}/full`
    try{
        const res = await fetch(animeSpecificURL)
        if (res.status != 200) throw new Error ('Anime not found')
        const animeData = await res.json()
        renderAnimeCard(animeData.data, animeId)
    }catch (err){
        const errorSection = document.getElementById(`anime_${animeId}`)
        errorSection.innerHTML = `<p>${err.message}</p>`
    }
}

// Function destructures anime data and grabs corresponding id to render html on webpage
 const renderAnimeCard = ({
    images:{
        jpg:{
            image_url
        }
    },
    title,
    year,
    studios
}, animeId) => {
    const [{name}] = studios
    const animeSection = document.getElementById(`anime_${animeId}`)
    animeSection.innerHTML = `
        <div class="anime_Card">
            <img src=${image_url} alt="Naruto">
            <div>
            <h3>${title}</h3>
            <p><b>Release Year:</b> ${year}</p> 
            <p><b>Animation Studio:</b> ${name}</p> 
        </div>
    `

    // Shortened synopsis for each anime
    const animeSynopsis = {
        '20': 'Naruto follows a determined young ninja on his quest to gain recognition and become the leader of his village, all while overcoming the dark legacy of the Nine-Tailed Fox sealed within him.',
        '21': 'One Piece follows Monkey D. Luffy and his crew of pirates as they journey across the seas in search of the ultimate treasure, the One Piece, while challenging powerful enemies and forging unbreakable bonds.',
        '269': 'Bleach tells the story of Ichigo Kurosaki, a teenager who becomes a Soul Reaper and battles evil spirits to protect the living and the dead, uncovering dark secrets along the way.'
    }
    
    // Adds in synopsis to html 
    const synopsisParagraph = document.createElement('p')
    synopsisParagraph.textContent = animeSynopsis[animeId]
    const animeCardDiv = animeSection.querySelector('.anime_Card > div')
    animeCardDiv.appendChild(synopsisParagraph)
}

//calls fetch fundtion for each anime
[naruto, bleach, onePiece].forEach(id => animeCard (id))

var questionsArr = [
    {
        question: 'Which anime series is part of the "Big Three"?',
        answer: 'Naruto, Bleach, One Piece',
        options: [
            'My Hero Academia',
            'One Piece',
            'Jujutsu Kaisen',
        ]

    },
    {
        question: 'Which is one of the Tokyo neighborhoods that is known for trendsetting fashion scenes?',
        answer: 'Harajuku',
        options: [
            'Akihabara',
            'Osaka',
            'Harajuku'
        ]
        
    },
    {
        question: 'What is one thing Japanese food culture is known for worldwide?',
        answer: 'Attention to detail',
        options: [
            'Attention to detail',
            'Easy recipes',
            'Cost efficiency'
        ]
        
    },
    {
        question: 'What year was Naruto released?',
        answer: '2002',
        options: [
            '1999',
            '2004',
            '2002'
        ]
        
    },
    {
        question: 'Which animation studio produced 2 out of the 3 "Big Three" animes?',
        answer: '2002',
        options: [
            'Pierrot',
            'Toei Animation',
            'Studio Ghibli'
        ]
        
    },
]

var quiz = document.getElementById('culture_quiz') 
var currentQuestionIndex = 0
correctAnswer = 0

const startQuiz = () => {

    //if local storage is not empty show previous score
    var previousScore = localStorage.getItem('previous-score')
    if(previousScore !== null){
        const previousScoreEl = document.createElement('p')
        previousScoreEl.textContent = `Previous Score: ${previousScore}%`
        culture_quiz.appendChild(previousScoreEl)
    }

    const quizButton = document.createElement('button') 
    quizButton.id = 'start-quiz' 
    quizButton.textContent = 'Start Quiz' 
    culture_quiz.appendChild(quizButton)  
    
    quizButton.onclick = function () {
        culture_quiz.innerHTML = ''
        showQuestion()
    }
}

const showQuestion = () => {
    culture_quiz.innerHTML = '' 
    
    var currentQuestion = questionsArr[currentQuestionIndex]
    culture_quiz.innerHTML = `<p>${currentQuestion.question}</p>`
    
    // creates div element (container)
    var answerContainer = document.createElement('div')
    answerContainer.id = 'quiz_answer_container'
    culture_quiz.appendChild(answerContainer)

    // creates button elements (options)
    currentQuestion.options.forEach(function(option){
        var optionButton = document.createElement('button')
        optionButton.textContent = option
        answerContainer.appendChild(optionButton)

        optionButton.onclick = function(){
            if (option === currentQuestion.answer){
                correctAnswer++    
            }

            currentQuestionIndex++

            // if no more questions end, if not continue to next
            if(currentQuestionIndex>=questionsArr.length){
                endQuiz()
            }else{
                showQuestion()
            }
            
        }
    })

}

const endQuiz = () => {
    var percentage = Math.round((correctAnswer/questionsArr.length) * 100);
    localStorage.setItem('previous-score', percentage)
    culture_quiz.innerHTML = ''
    currentQuestionIndex = 0
    correctAnswer = 0
    startQuiz()
}

startQuiz()