let countdownInterval;


let initialTargetDate = null;

function updateCountdown(targetDate) {
  const now = new Date().getTime();
  const distance = targetDate - now;

  // Set initial target date for animation reference
  if (!initialTargetDate) initialTargetDate = targetDate;

  if (distance < 0) {
    clearInterval(countdownInterval);
    document.getElementById('days').textContent = '00';
    document.getElementById('hours').textContent = '00';
    document.getElementById('minutes').textContent = '00';
    document.getElementById('seconds').textContent = '00';
    // Move characters together at the end
    animateCharacters(1);
    animateTimerBar(1);
    triggerCelebration();
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById('days').textContent = String(days).padStart(2, '0');
  document.getElementById('hours').textContent = String(hours).padStart(2, '0');
  document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
  document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');

  // Animate characters and timer bar
  const total = initialTargetDate - (initialTargetDate - 1000 * 60); // avoid div by zero
  const progress = 1 - Math.max(0, distance / (initialTargetDate - now + distance));
  animateCharacters(progress);
  animateTimerBar(progress);
}

function animateCharacters(progress) {
  // progress: 0 (far apart) to 1 (together)
  const guy = document.getElementById('guy-img');
  const girl = document.getElementById('girl-img');
  const flight = document.getElementById('flight-img');
  if (!guy || !girl || !flight) return;
  // Max translate: 0px (start), 80px (end)
  const maxMove = 80;
  const guyMove = -maxMove * progress;
  const girlMove = maxMove * progress;
  const flightMove = -maxMove * progress * 0.7;
  guy.style.transform = `translateX(${guyMove}px)`;
  girl.style.transform = `translateX(${girlMove}px)`;
  flight.style.transform = `translateX(${flightMove}px)`;
}

function animateTimerBar(progress) {
  // progress: 0 (full) to 1 (empty)
  const bar = document.getElementById('timer-bar');
  if (!bar) return;
  bar.style.width = `${Math.max(0, 100 - progress * 100)}%`;
}

let celebrationTriggered = false;
function triggerCelebration() {
  if (celebrationTriggered) return;
  celebrationTriggered = true;

  const msg = document.createElement('div');
  msg.className = 'celebration-message';
  msg.innerHTML = "Together at last! <span>💕</span>";
  document.body.appendChild(msg);

  const colors = ['#e94560', '#f9d423', '#ffb6b9', '#ff8fa3', '#ffd166', '#ef476f'];
  const emojis = ['💕', '❤️', '💖', '✨', '🎉', '🌹', '💘'];
  const total = 120;
  for (let i = 0; i < total; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti';
    if (Math.random() < 0.4) {
      piece.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      piece.classList.add('confetti-emoji');
    } else {
      piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    }
    piece.style.left = Math.random() * 100 + 'vw';
    piece.style.animationDelay = Math.random() * 2.5 + 's';
    piece.style.animationDuration = (3 + Math.random() * 3) + 's';
    document.body.appendChild(piece);
  }

  document.getElementById('guy-img').classList.add('celebrating', 'celebrating-guy');
  document.getElementById('girl-img').classList.add('celebrating', 'celebrating-girl');
}


// Set default target date: April 26, 2026, 6:32 PM Eastern Time (anchored to UTC so it's the same moment for everyone).
// April 26 is during US daylight saving, so 6:32pm EDT = 22:32 UTC.
const defaultTargetDate = Date.UTC(2026, 3, 26, 22, 32, 0, 0); // Month is 0-indexed


function startCountdown(targetDate) {
  if (countdownInterval) {
    clearInterval(countdownInterval);
  }
  initialTargetDate = targetDate;
  updateCountdown(targetDate);
  countdownInterval = setInterval(() => updateCountdown(targetDate), 1000);
}

// Start countdown automatically on page load
window.addEventListener('DOMContentLoaded', () => {
  startCountdown(defaultTargetDate);
});

// Allow manual override
document.getElementById('start-btn').addEventListener('click', () => {
  const targetInput = document.getElementById('target-date').value;
  if (!targetInput) {
    alert('Please select a target date and time');
    return;
  }
  const targetDate = new Date(targetInput).getTime();
  if (isNaN(targetDate)) {
    alert('Invalid date format');
    return;
  }
  startCountdown(targetDate);
});