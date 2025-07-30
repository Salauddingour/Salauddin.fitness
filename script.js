// 📊 Dummy Stat Updater
document.addEventListener("DOMContentLoaded", () => {
  const steps = Math.floor(Math.random() * 12000) + 1000;
  const calories = Math.floor(Math.random() * 700) + 200;
  const water = (Math.random() * 1 + 1).toFixed(1);
  const heartRate = Math.floor(Math.random() * 30 + 70);

  document.getElementById("steps").textContent = steps;
  document.getElementById("calories").textContent = calories;
  document.getElementById("water").textContent = `${water} L`;
  document.getElementById("heartRate").textContent = `${heartRate} bpm`;
});

// 🌦 Weather Fetch
document.getElementById("getWeather").addEventListener("click", () => {
  const city = document.getElementById("cityInput").value.trim();
  const apiKey = "3acd77a6182ec203538a33d5df34bce4";

  if (!city) return;

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
    .then(res => res.json())
    .then(data => {
      document.getElementById("weatherCity").textContent = `${data.name}, ${data.sys.country}`;
      document.getElementById("temperature").textContent = `${Math.round(data.main.temp)} °C`;
      document.getElementById("weatherCondition").textContent = data.weather[0].main;
    })
    .catch(err => {
      document.getElementById("weatherCity").textContent = "City not found";
      document.getElementById("temperature").textContent = "-- °C";
      document.getElementById("weatherCondition").textContent = "Unavailable";
    });
});

// 🧮 BMI Logic — using feet.inches input
document.getElementById("calculateBMI").addEventListener("click", () => {
  const heightFeet = parseFloat(document.getElementById("heightFeet").value);
  const weight = parseFloat(document.getElementById("weight").value);

  if (!heightFeet || !weight || heightFeet <= 0 || weight <= 0) {
    document.getElementById("bmiValue").textContent = "--";
    document.getElementById("bmiStatus").textContent = "Please enter valid numbers.";
    return;
  }

  const totalInches = heightFeet * 12;
  const heightMeters = totalInches * 0.0254;

  const bmi = (weight / (heightMeters * heightMeters)).toFixed(1);
  let status = "";

  if (bmi < 18.5) status = "Underweight 💡";
  else if (bmi < 25) status = "Normal ✅";
  else if (bmi < 30) status = "Overweight ⚠️";
  else status = "Obese 🔴";

  document.getElementById("bmiValue").textContent = bmi;
  document.getElementById("bmiStatus").textContent = status;
});

// 🚀 Smart Fitness Tips Engine
document.getElementById("generateTips").addEventListener("click", () => {
  const run = parseFloat(document.getElementById("runDistance").value) || 0;
  const duration = parseFloat(document.getElementById("exerciseDuration").value) || 0;
  const goal = document.getElementById("fitnessGoal").value;

  const goalTips = {
    abs: "Planks & crunches work well. Eat boiled eggs or paneer.",
    arms: "Do push-ups, curls. Add lentils & nuts to diet.",
    endurance: "Go for oats, bananas & long jogs.",
    flexibility: "Yoga and turmeric drinks help recovery."
  };

  let tip = "";

  if (run >= 5 || duration >= 45) {
    tip = `🔥 Intense day! Refuel with bananas + peanut butter. ${goalTips[goal]}`;
  } else if (run > 0 || duration > 0) {
    tip = `✅ Good effort! Stay hydrated and stretch. ${goalTips[goal]}`;
  } else {
    tip = `⏱️ No activity yet. Start with a 20 min walk. ${goalTips[goal]}`;
  }

  const panel = document.getElementById("tipPanel");
  const tipText = document.getElementById("generatedTip");
  tipText.textContent = tip;

  panel.classList.remove("hidden");
  panel.classList.add("show");
});

// 🏷️ General Tip Button Logic
const generalTips = [
  "Eat protein within 30 mins post workout.",
  "Sleep 7–8 hrs daily for recovery.",
  "Warm up before & stretch after workouts.",
  "Hydrate before meals for digestion boost.",
  "Avoid sugar post-run. Prefer fruit carbs.",
  "Meditation boosts muscle recovery more than caffeine."
];

document.getElementById("openTips").addEventListener("click", () => {
  const tip = generalTips[Math.floor(Math.random() * generalTips.length)];
  const panel = document.getElementById("tipPanel");
  const tipText = document.getElementById("generatedTip");

  tipText.textContent = `💡 ${tip}`;
  panel.classList.remove("hidden");
  panel.classList.add("show");
});