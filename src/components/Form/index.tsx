import React, { useState } from 'react'
import { Input } from '../UI/Input/index.tsx'
import { Select } from '../UI/Select/index.tsx'
import { Button } from '../UI/Button/index.tsx'
import { CheckBox } from '../UI/Checkbox/index.tsx'

export const Form = () => {
    const [weight, setWeight] = useState('')
    const [height, setHeight] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('male');
    const [activityLevel, setActivityLevel] = useState(1.375);
    const [goal, setGoal] = useState('maintain');
    const [macro, setMacro] = useState(false)
    const [calories, setCalories] = useState(null);
    const [macrosResult, setMacrosResult] = useState(null);
    const [error, setError] = useState(false)

    const calculateBMR = () => {
        if (gender === 'male') {
            return 10 * +weight + 6.25 * +height - 5 * +age + 5;
        } else {
            return 10 * +weight + 6.25 * +height - 5 * +age - 161;
        }
    };

    const calculateTDEE = (bmr) => {
        return bmr * activityLevel;
    };

    function calculateMacrosPerKg(weight, totalCalories, goal) {
        const proteinPerKg = {
            maintain: 1.6,
            deficit: 2.0,
            surplus: 1.8,
        };

        const fatsPerKg = {
            maintain: 1.0,
            deficit: 1.0,
            surplus: 1.1,
        };

        const protein = proteinPerKg[goal] * weight;
        const fats = fatsPerKg[goal] * weight;

        const proteinCalories = protein * 4;
        const fatCalories = fats * 9;
        const carbsCalories = totalCalories - proteinCalories - fatCalories;
        const carbs = carbsCalories > 0 ? carbsCalories / 4 : 0;

        return {
            protein: Math.round(protein),
            fats: Math.round(fats),
            carbs: Math.round(carbs),
        };
    };



    function handleCount(e) {
        e.preventDefault()
        if (
            (weight.length === 0 || weight < -0)
            ||
            (height.length === 0 || height < -0)
            ||
            (age.length === 0 || age < -0)) {
            setError(true)
            return

        }
        setError(false)


        const bmr = calculateBMR();
        const tdee = calculateTDEE(bmr);

        let finalCalories = tdee;

        if (goal === 'deficit') {
            finalCalories = tdee - tdee * 0.1;
        } else if (goal === 'surplus') {
            finalCalories = tdee + tdee * 0.1;
        }
        setCalories(finalCalories)

        if (macro) {
            const macros = calculateMacrosPerKg(weight, finalCalories, goal);
            setMacrosResult(macros);
        } else {
            setMacrosResult(null);
        }
    }
    return (
        <div className="form__wrapper">
            <div className="block__wrapper">
                <h3>Заполни поля</h3>
            </div>
            <div className="block__wrapper">

                <form action="">
                    <Input
                        error={(!weight || weight < 0) && error}
                        label='weight'
                        type='number'
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                    />
                    <Input
                        error={(!height || height < 0) && error}
                        label='height'
                        type='number'
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                    />
                    <Input
                        error={(!age || age < 0) && error}
                        label='age'
                        type='number'
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                    />

                    <Select
                        label='Пол:'
                        valueSelect={gender}
                        onChange={(e) => setGender(e.target.value)}
                        valueOption={
                            [
                                { 'value': 'male', 'descr': 'Мужчина' },
                                { 'value': 'female', 'descr': 'Женщина' }
                            ]
                        }
                    />
                    <Select
                        label='Уровень активности:'
                        valueSelect={activityLevel}
                        onChange={(e) => setActivityLevel(e.target.value)}
                        valueOption={
                            [
                                { 'value': 1.2, 'descr': 'Малоподвижный' },
                                { 'value': 1.375, 'descr': 'Умеренная активность' },
                                { 'value': 1.55, 'descr': 'Высокая активность' },
                                { 'value': 1.725, 'descr': 'Очень высокая активность' },
                            ]
                        }
                    />
                    <Select
                        label='Цель:'
                        valueSelect={goal}
                        onChange={(e) => setGoal(e.target.value)}
                        valueOption={
                            [
                                { 'value': 'maintain', 'descr': 'Поддержание веса' },
                                { 'value': 'deficit', 'descr': 'Дефицит калорий ' },
                                { 'value': 'surplus', 'descr': 'Профицит калорий' }
                            ]
                        }
                    />
                    {
                        error && <p>enter filds</p>
                    }
                    <CheckBox
                        checked={macro}
                        onChange={(e) => setMacro(e.target.checked)}
                        label='Расчитать макроэлементы'
                    />
                    <Button type='submit' onClick={handleCount}>
                        Рассчитать
                    </Button>
                </form>
            </div>
            {
                calories && <div className="block__wrapper pink"> <div className="output">
                    {Math.round(calories)} ккал
                </div>
                    {
                        macro && <div className="output__macro">
                            <p>Белки - {macrosResult.protein} г.,   Жиры - {macrosResult.fats} г.,   Угли - {macrosResult.carbs} г</p>
                        </div>
                    }

                </div>
            }
        </div>

    )
}
