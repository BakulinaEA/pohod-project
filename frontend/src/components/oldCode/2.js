// const mysql = require('mysql');

// const conn = mysql.createConnection({
//   host: "MealPlan",
//   user: "root",
//   password: "12345678"
// });

// conn.connect (err => {
//   if (err){
//     console.log(err);
//     return err;
//   }
//   else {
//     console.log ('Database ---- OK');
//   }
// });

// document.getElementById('surveyForm').addEventListener('submit', function(event) {
//     event.preventDefault();

//     const duration = parseInt(document.getElementById('duration').value);
//     const participants = parseInt(document.getElementById('participants').value);
//     const activity = document.getElementById('activity').value;
//     const protein = 100;
//     const fat = 70;
//     const carbs = 300;

//     const totalProtein = protein * duration * participants;
//     const totalFat = fat * duration * participants;
//     const totalCarbs = carbs * duration * participants;

//     const mealPlan = `
//         <h2>План питания для ${activity} похода:</h2>
//         <p>Продолжительность: ${duration} дней</p>
//         <p>Количество участников: ${participants}</p>
//         <p>Общее количество белков: ${totalProtein} г</p>
//         <p>Общее количество жиров: ${totalFat} г</p>
//         <p>Общее количество углеводов: ${totalCarbs} г</p>
//     `;

//     document.getElementById('meal-plan').innerHTML = mealPlan;
// });



function createMealPlan() {
  const products = [
    { name: 'Хлеб', calories: 250 },
    { name: 'Сыр', calories: 400 },
    { name: 'Мясо', calories: 200 },
    { name: 'Овсянка', calories: 150 },
    { name: 'Яйца', calories: 155 },
    { name: 'Рис', calories: 205 },
    { name: 'Картофель', calories: 120 },
    { name: 'Бананы', calories: 105 },
    { name: 'Яблоки', calories: 50 },
    { name: 'Овощи', calories: 25 }
  ];

  const mealPlan = [];
  const totalCalories = 3000; // примерная сумма калорий в день

  while (totalCalories > 0) {
    const randomProduct = products[Math.floor(Math.random() * products.length)];
    if (totalCalories - randomProduct.calories >= 0) {
      mealPlan.push(randomProduct.name);
      totalCalories -= randomProduct.calories;
    }
  }

  return mealPlan;
}

// console.log(createMealPlan());



