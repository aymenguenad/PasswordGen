let generateButton= document.querySelector('.generate')
let titleDiv= document.querySelector('.title')
let passwordLength= document.querySelector('.passwordLength')
let input= document.querySelector('.lengthInput')
let text= document.querySelector('.text')
let inTitle= document.querySelector('.inTitle')

let passwordCondition={
  symbols: "!@#$%^&*()_+~`?><.,".split(''),
  minLetters: "abcdefghijklmnopqrstuvwxyz".split(''),
  majLetters: "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(''),
  numbers: "0123456789".split('')
}


//input Conditions
input.addEventListener('input', inputConditions)
function inputConditions() {
    const inputValue = input.value;
    if(isNaN(inputValue)){
      alert('Please Insert A Number')
      input.value= ''
      return 
    }
    if (inputValue >= 6 && inputValue <= 20) {
        input.style.color = 'green'; 
    } else {
        input.style.color = 'red';
    }
}

//Button
generateButton.addEventListener('click',handleCodeGeneration)

let myCopyButton=null
function copyButton(password) {
  if (myCopyButton!==null) {
    myCopyButton.remove()
  }
  myCopyButton = document.createElement('button');
  myCopyButton.className = 'copyButton';
  myCopyButton.textContent = 'Copy Password';
  inTitle.appendChild(myCopyButton);

  myCopyButton.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(password);
      
      // Feedback visuel temporaire
      myCopyButton.textContent = 'Copied!';
      setTimeout(() => {
        myCopyButton.textContent = 'Copy Password';
      }, 2000);
      
    } catch (err) {
      console.error('Error', err);
      myCopyButton.textContent = 'Copy Failed';
    }
  });
  
  // Ajouter le bouton au DOM
  inTitle.appendChild(myCopyButton);
  
  return myCopyButton;
}

function handleCodeGeneration(){
  if(input.value.trim()===''){
    alert('Choose Your Length')
    return
      }
    let password= codeGen()
    text.textContent= `Your Password Is:" ${password} "`
    myCopyButton= copyButton(password)
}



function shuffler(){
    let combiner= []
    let charactersLength=  Math.max(
  passwordCondition.symbols.length,
  passwordCondition.minLetters.length,
  passwordCondition.majLetters.length,
  passwordCondition.numbers.length
);
    for(let i=0; i<charactersLength/4; i++){
      combiner.push(passwordCondition.symbols[i])
      combiner.push(passwordCondition.minLetters[i])
      combiner.push(passwordCondition.majLetters[i])
      combiner.push(passwordCondition.numbers[i])
    }
    let shuffle= combiner.filter((e=> e!=null))
    shuffle.sort(()=> Math.random()- 0.5)
    return shuffle
  }


function randomChar(pool) {
  return pool[Math.floor(Math.random() * pool.length)];
}

function codeGen(){
  let result = [];

  // 1 caractère garanti de chaque groupe
  result.push(randomChar(passwordCondition.symbols));
  result.push(randomChar(passwordCondition.minLetters));
  result.push(randomChar(passwordCondition.majLetters));
  result.push(randomChar(passwordCondition.numbers));

  // Mélange complet des groupes
  let shuffled = shuffler();

  // Compléter jusqu'à la longueur voulue
  for (let i = result.length; i < input.value; i++) {
    result.push(shuffled[Math.floor(Math.random() * shuffled.length)]);
  }

  // Mélanger une dernière fois pour éviter l’ordre fixe
  return result.sort(() => Math.random() - 0.5).join('');
  
} 

