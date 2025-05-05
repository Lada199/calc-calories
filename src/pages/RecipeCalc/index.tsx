import React, { useState } from 'react';
import { Input } from '../../components/UI/Input/index.tsx';
import { Button } from '../../components/UI/Button/index.tsx';

export const RecipeCalc = () => {
  const [ingredients, setIngredients] = useState([]);
  const [input, setInput] = useState({
    name: '',
    weight: '',
    proteinPer100g: '',
    fatPer100g: '',
    carbPer100g: '',
    caloriesPer100g: ''
  });
    const [error, setError] = useState(false)
  const handleChange = (field, value) => {
    setInput({ ...input, [field]: value });
  };

  const addIngredient = () => {
    const {
      name,
      weight,
      proteinPer100g,
      fatPer100g,
      carbPer100g,
      caloriesPer100g
    } = input;

    const weightFloat = parseFloat(weight);

    const protein = (weightFloat * parseFloat(proteinPer100g)) / 100;
    const fat = (weightFloat * parseFloat(fatPer100g)) / 100;
    const carbs = (weightFloat * parseFloat(carbPer100g)) / 100;
    const calories = (weightFloat * parseFloat(caloriesPer100g)) / 100;

    setIngredients([
      ...ingredients,
      { name, weight: weightFloat, protein, fat, carbs, calories }
    ]);

    // Reset input
    setInput({
      name: '',
      weight: '',
      proteinPer100g: '',
      fatPer100g: '',
      carbPer100g: '',
      caloriesPer100g: ''
    });
  };

  const total = ingredients.reduce(
    (acc, item) => {
      acc.protein += item.protein;
      acc.fat += item.fat;
      acc.carbs += item.carbs;
      acc.calories += item.calories;
      return acc;
    },
    { protein: 0, fat: 0, carbs: 0, calories: 0 }
  );

  return (
    <div className="recipe__wrapper">
        <div className="block__wrapper">
      <h3>Добавить ингредиент</h3>
      <form action="">
      <Input
        error={(!input.name || input.name < 0) && error}
        label='Название'
        type='text'
        value={input.name}
        onChange={(e) => handleChange('name', e.target.value)}
      />
      <Input
        error={(!input.caloriesPer100g || input.caloriesPer100g < 0) && error}
        label='Грамм'
        type='number'
        value={input.caloriesPer100g}
        onChange={(e) => handleChange('caloriesPer100g', e.target.value)}
      />
      <Input
        error={(!input.carbPer100g || input.carbPer100g < 0) && error}
        label='Калории на 100г'
        type='number'
        value={input.carbPer100g}
        onChange={(e) => handleChange('carbPer100g', e.target.value)}
      />
      <Input
        error={(!input.proteinPer100g || input.proteinPer100g < 0) && error}
        label='Белки на 100г'
        type='number'
        value={input.proteinPer100g}
        onChange={(e) => handleChange('proteinPer100g', e.target.value)}
      />
      <Input
        error={(!input.fatPer100g || input.fatPer100g < 0) && error}
        label='Жиры на 100г'
        type='number'
        value={input.fatPer100g}
        onChange={(e) => handleChange('fatPer100g', e.target.value)}
      />
      <Input
        error={(!input.carbPer100g || input.carbPer100g < 0) && error}
        label='Углеводы на 100г'
        type='number'
        value={input.carbPer100g}
        onChange={(e) => handleChange('carbPer100g', e.target.value)}
      />
      <Button onClick={addIngredient}>
      Добавить
      </Button>

      </form>


      
      

 
    
      </div>
      <div className="block__wrapper">
      <h3>Ингредиенты</h3>
      <ul>
        {ingredients.map((item, index) => (
          <li key={index}>
            {item.name}: {item.weight}г — {item.calories.toFixed(1)} ккал (Б: {item.protein.toFixed(1)}г, Ж: {item.fat.toFixed(1)}г, У: {item.carbs.toFixed(1)}г)
          </li>
        ))}
      </ul>

      <h3>Итого:</h3>
      <p>Калории: {total.calories.toFixed(1)} ккал</p>
      <p>Белки: {total.protein.toFixed(1)} г</p>
      <p>Жиры: {total.fat.toFixed(1)} г</p>
      <p>Углеводы: {total.carbs.toFixed(1)} г</p>
        </div>
    </div>
  );
};