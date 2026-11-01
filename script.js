const form = document.querySelector('#calorie-form');
const errorMessage = document.querySelector('#form-error');
const resultsIntro = document.querySelector('#results-intro');
const resultBadge = document.querySelector('#result-badge');
const valueElements = document.querySelectorAll('.target-value');

function formatCalories(value) {
  return Math.round(value).toLocaleString('en-US');
}

function setError(message = '') {
  errorMessage.textContent = message;
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  setError();

  const age = Number(document.querySelector('#age').value);
  const height = Number(document.querySelector('#height').value);
  const weight = Number(document.querySelector('#weight').value);
  const activity = Number(document.querySelector('#activity').value);
  const gender = document.querySelector('input[name="gender"]:checked').value;

  if (!age || !height || !weight || age < 15 || age > 100 || height < 100 || height > 250 || weight < 30 || weight > 300) {
    setError('Please enter realistic values within the ranges shown.');
    return;
  }

  // Mifflin–St Jeor equation, commonly used for estimating resting energy needs.
  const baseMetabolicRate = gender === 'male'
    ? (10 * weight) + (6.25 * height) - (5 * age) + 5
    : (10 * weight) + (6.25 * height) - (5 * age) - 161;
  const maintenance = baseMetabolicRate * activity;
  const targets = [maintenance, maintenance - 500, maintenance + 300];

  valueElements.forEach((element, index) => { element.textContent = formatCalories(Math.max(1200, targets[index])); });
  resultBadge.textContent = 'CALCULATED';
  resultsIntro.textContent = 'Your estimate is ready. Use these targets as a flexible daily guide, not a rule.';
  document.querySelector('#results').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});
