let hideTimeout;

function popUpRandomMole(){
  const moles = document.querySelectorAll('.wgs__mole-head:not(.wgs__mole-head--whacked)')
  if (!moles.length){
    alert('You won!');
    return;
  }
  const rand = Math.floor(Math.random() * moles.length);
  moles[rand].classList.remove('wgs__mole-head--hidden');
  hideTimeout = setTimeout(hideMole, 1000, mole);
}

function hideMole(mole){
  mole.classList.add('wgs__mole-head--hidden');
  setTimeout(popUpRandomMole, 1000);
}

window.addEventListener('DOMContentLoaded', () => {
  setTimeout(popUpRandomMole, 0);
  document.querySelectorAll('.wgs__mole-head').forEach(mole => {
    mole.addEventListener('click', e => {
      clearTimeout(hideTimeout);
      e.target.classList.add('wgs__mole-head--whacked');
      hideMole(e.target);
    })
  })
})