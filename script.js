let countdownInterval;

function updateCountdown(targetDate) {
  const now = new Date().getTime();
  const distance = targetDate - now;

  if (distance < 0) {
    clearInterval(countdownInterval);
    document.getElementById('days').textContent = '00';
    document.getElementById('hours').textContent = '00';
    document.getElementById('minutes').textContent = '00';
    document.getElementById('seconds').textContent = '00';
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
}

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

  if (countdownInterval) {
    clearInterval(countdownInterval);
  }

  updateCountdown(targetDate);
  countdownInterval = setInterval(() => updateCountdown(targetDate), 1000);
});