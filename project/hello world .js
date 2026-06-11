let userInput;
let slvButton;
let guessButton;
let secretWords = ["math", "wrong wrong time", "it`s not hot", "I show Meat"];
let secretWord;
let hiddenWord = "";
let lettersGuessed;
let pics = [];
let wrong;
let isWin;

//my fuctions--------------------------------

function clickSolve(){
  
  let theirGuess = userInput.value();
  secretWord = secretWord.toLowerCase();
  theirGuess = theirGuess.toLowerCase();
    if(isWin){
    //they won
    return 0;
  }
  
  if(secretWord == theirGuess){
    
    userInput.value("You Win")
    isWin = true;
    hiddenWord = secretWord;
    return 0;
  }else{
    userInput.value('you Lost');
    wrong = 9;
    isWin = true;
    return 0;
  }
}

function loadPictures(){
  for(let i = 1; i < 11; i++){
pics.push(loadImage("pics/p" + i + ".png"));
  }
}

function clickGuessButton(){
  //local variable that gets the letter in the inputbox.
  let theirGuess = userInput.value();
  
  if(wrong > 8){
    //they have no guesses left
    userInput.value("GAME OVER ")
    return 0;
  }
  if(theirGuess.length > 1){
    //they have guessed more then 1 letter
    userInput.value("Enter one letter at a time.")
    return 0;
  }
  if(!isLetter(theirGuess)){
    // Not a letter
    userInput.value("please enter a number")
    return 0;
  }
  
  theirGuess = theirGuess.toLowerCase();
  secretWord = secretWord.toLowerCase();
  
  //add their guess to the list of letters guessed
  lettersGuessed += theirGuess + ", ";
  
  if(secretWord.indexOf(theirGuess) > -1){
    let positions = [];
    for(let i = 0; i < secretWord.length; i++){
      if(secretWord[i] == theirGuess){
        positions.push(i);
      print(i)
        
      }
    }
    //they guessed correctly.
    //changing the string into an array of characters.
    let editHiddenWord = hiddenWord.split("")
    for(let i = 0; i <positions.length; i++){
      editHiddenWord[positions[i]] = theirGuess;
    }
    hiddenWord = editHiddenWord.join("")
    //hiddenWord [positions] = theirGuess;
  }else{
    wrong +=1
  }
}

function isLetter(thisChar){
  thisChar = thisChar.charCodeAt(thisChar);
    if (
        (thisChar > 64 && thisChar < 91) ||
        (thisChar > 96 && thisChar < 123)
      ){
      return true;
    }else{
      return false;
    
  }
}

function setSecretWord() {
  let randomNumber = Math.floor(Math.random() * 4);
  secretWord = secretWords[randomNumber];
  print(secretWord);
}

function makeBlanks(){
  for(let i = 0 ; i < secretWord.length ; i++){
    if(isLetter(secretWord.charAt(i))){
      hiddenWord += "-"
    }else{
      hiddenWord += secretWord.charAt(i);
    }
  }
}

function checkRepetingLetters(){
  
}
//p5js functions-----------------------------
function setup() {
  createCanvas(600, 600);

  userInput = createInput();
  userInput.position(20, 150);
  userInput.size(150, 30);

  guessButton = createButton("guess");
  guessButton.position(200, 150);
  guessButton.mousePressed(clickGuessButton)

  slvButton = createButton("solve");
  slvButton.position(250, 150);
  slvButton.mousePressed(clickSolve)

  wrong = 0;
  
  lettersGuessed = ""
  setSecretWord();
  makeBlanks();
  loadPictures();
  isWin = false;
}

function draw() {
  background("#415d43");
  //TITLE BOX-------------------------
  push();
  fill("#8fb996");
  rect(150, 0, 290, 100);
  //IMAGE BOX-------------------------
  fill("#8fb996");
  rect(20, 250, 250, 300);
  //TITLE-----------------------------
  fill("#415d43");
  textSize(40);
  text("Title", 250, 60);
  //CLUES-----------------------------
  fill("#8fb996");
  textSize(20);
  text("Clues: ", 350, 300);
  //LETTER GUESSED--------------------
  fill("#8fb996");
  textSize(20);
  text("Letters guessed: " + lettersGuessed, 350, 400);
  push()
  textSize(30)
  text("secret Word: " + hiddenWord, 20, 230);
  pop();

  image(pics[wrong], 25,255,240,290)
}

