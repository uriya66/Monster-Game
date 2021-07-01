const ATTACK_VALUE = 10;
const MONSTER_ATTACK_VALUE = 13;
const STRONG_ATTACK_VALUE = 15;
const HEAL_VALUE = 20;

let chosenMaxLife = 100;
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;  
let cntAttack = 3;
let cntHeal = 1;
let bonusLife = true;


adjustHealthBars(chosenMaxLife);

function attackMonster (mode){
  let maxDamage;
  const initialPlayerHealth = currentPlayerHealth; 
  
  if (mode === 'ATTACK'){
     maxDamage = ATTACK_VALUE; 
  } else if (mode === 'STRONG_ATTACK') {
    maxDamage = STRONG_ATTACK_VALUE;
  }
  const damage = dealMonsterDamage(maxDamage);
  currentMonsterHealth -= damage;
  const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerHealth -= playerDamage;

  if (currentPlayerHealth <= 0 && bonusLife){
    bonusLife = false;
    removeBonusLife();
    currentPlayerHealth = initialPlayerHealth;
    setPlayerHealth(initialPlayerHealth);
    alert('You would be dead but bonus life saved you!');
  }
  if (currentMonsterHealth <= 0 && currentPlayerHealth > 0)
    {
      alert ('You Won!');
    }
  else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) 
    {
      alert ('You Lost!');
    }
    else if (currentMonsterHealth <= 0 && currentPlayerHealth <= 0){
      alert ('You have a draw!');
    }
  outputResult(currentPlayerHealth,currentMonsterHealth);
}


function attackRegular (){
  attackMonster('ATTACK');
}

function strongAttackMonster (){
   cntAttack--;
  attackMonster('STRONG_ATTACK');
  changeAttackText(cntAttack);
  if (cntAttack === 0){
    document.getElementById("strong-attack-btn").disabled = true;
     }
   }

function healPlayer(){
   if (currentPlayerHealth === chosenMaxLife){
    alert ('You have a maximum life');
    return;
  }else if (currentPlayerHealth >= chosenMaxLife - HEAL_VALUE) {
    alert('You can\'t heal to more than your max initial health.');
    currentPlayerHealth = chosenMaxLife;
    increasePlayerHealth(HEAL_VALUE);
    outputResult(currentPlayerHealth,currentMonsterHealth);
    cntHeal--;
    changeHealText(cntHeal);
    document.getElementById("heal-btn").disabled = true;
    return;
  }else { 
  currentPlayerHealth += HEAL_VALUE;
  increasePlayerHealth(HEAL_VALUE);
  outputResult(currentPlayerHealth,currentMonsterHealth);
  cntHeal--;
  changeHealText(cntHeal);
  document.getElementById("heal-btn").disabled = true;
     }
}

function restart (){
  currentMonsterHealth = chosenMaxLife;
  currentPlayerHealth = chosenMaxLife;
  adjustHealthBars(chosenMaxLife);
  outputResult(currentPlayerHealth,currentMonsterHealth);
  document.getElementById("heal-btn").disabled = false;
  document.getElementById("strong-attack-btn").disabled = false;
  cntAttack = 3;
  cntHeal = 1;
  changeAttackText(cntAttack);
  changeHealText(cntHeal);
}


function changeAttackText(cnt){
  strongAttackBtn.textContent  ='STRONG ATTACK ' + cnt + 'X';
 }

 function changeHealText(cnt){
   healBtn.textContent  ='HEAL ' + cnt + 'X';
  }

function showLog () {


}

attackBtn.addEventListener('click',attackRegular);
strongAttackBtn.addEventListener('click',strongAttackMonster);
healBtn.addEventListener('click', healPlayer);
restartbtn.addEventListener('click', resetGame);
logBtn.addEventListener('click', showLog);