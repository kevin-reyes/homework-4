let startBtn = document.querySelector('#start');
let count = 0;
let score = 0;
let board = document.querySelector('#scoreboard');
let qdiv = document.querySelector('#qdiv');
let time;
let highscores = JSON.parse(localStorage.getItem('highscore')) || []
//write questions var, OBJ? ARR? something else
let questions = [{
question: "Inside which HTML element do we put the JavaScript??",
answers: ['Script', 'Scripting', 'js', 'Javascript'],
right:  'Script'
},{
    question: "2 How do you create a function in JavaScript?",
    answers: ['function:myFunction()', 'function = myFunction()', 'function myFunction()', 'function.function'],
    right:  'function myFunction()'
},{
    question: "3 How does a FOR loop start?",
    answers: ['for (i <= 5; i++)', 'for (i = 0; i <= 5)', 'for i = 1 to 5', 'for (i = 0; i <= 5; i++)'],
    right:  'for (i = 0; i <= 5; i++)'
},{
    question: "4 How can you add a comment in a JavaScript?",
    answers: ['<!--This is a comment-->', 'This is a comment', '//This is a comment', '/This is a comment/'],
    right:  '//This is a comment'
}]
//start game
startBtn.addEventListener('click', function(){
document.querySelector('#quiz-title').innerHTML = '';
document.querySelector('#quiz-description').innerHTML = '';
makeQ()
timer(60)
    
})  
//generate 1 question
    function makeQ(){
    qdiv.innerHTML = ''
    
    let h3 = document.createElement('h3')
    let h3text = document.createTextNode(questions[count].question);
    h3.appendChild(h3text)
    qdiv.appendChild(h3)
    //generate answer buttons
    for(let j = 0; j<questions[count].answers.length; j++){
        let btn = document.createElement('button');
        let btntext = document.createTextNode(questions[count].answers[j]);
        btn.appendChild(btntext);
        qdiv.appendChild(btn);
        btn.addEventListener('click', function(event){
            console.log(event.target.textContent)
            if(event.target.textContent === questions[count].right){
                alert('YOU RIGHT!')
                count ++;
                score += 10;
                board.textContent = 'YOUR SCORE: '+ score
                if(count === 4){
                    endGame()
                }else{
                   makeQ() 
                }
                
            }else{
                alert('WRONG!')
                count ++;
                score -= 5;
                board.textContent = 'YOUR SCORE: '+ score
                if(count === 4){
                    endGame()
                }else{
                   makeQ() 
                }
            }
        })
    }  
    }
    function endGame(){
        qdiv.innerHTML = '';
        qdiv.appendChild(document.createElement('h1').appendChild(document.createTextNode('')))
        let input = document.createElement('input');
        input.setAttribute('id', 'highscore');
        input.setAttribute('value', 'Please enter your initials')
        let btn = document.createElement('button');
        btn.setAttribute('id', 'submitBtn')
        let btntxt = document.createTextNode('Submit Highscore');
        btn.appendChild(btntxt);
        qdiv.appendChild(input)
        qdiv.appendChild(btn);
        btn.addEventListener('click', function(){
            highscores.push(`${score} - ${document.querySelector('#highscore').value}`)
            localStorage.setItem('highscore', JSON.stringify(highscores))
            showHighscore()
        })
        time = 1;
    }
    function showHighscore(){
       highscores = JSON.parse(localStorage.getItem('highscore'))
       qdiv.innerHTML = ''
       for (let i = 0; i<highscores.length; i++){
           let hs = document.createElement('div')
           let hstxt = document.createTextNode(highscores[i])
           hs.appendChild(hstxt)
           hs.setAttribute('class', 'hs')
        qdiv.appendChild(hs)
       }
    }
    function timer(seconds) {
        time = seconds;
        let handle =
            setInterval(function () {
                
                console.log(time);
                time--;
                document.querySelector("#timer").textContent = time
                if (time === 0) {
                    clearInterval(handle)
                    alert("GAME OVER")
                    questions.innerHTML = '';
                    answers.innerHTML = '';
                    document.querySelector("#timer").textContent = ''
                }
            }, 1000)
    }