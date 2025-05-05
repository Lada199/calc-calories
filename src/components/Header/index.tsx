import React from 'react'
import { Link } from 'react-router-dom';

export const Header = () => {
    return (
        <header>
            <ul>
                <li><Link to="/">Калькулятор</Link></li>
                <li><Link to="/recipe">Расчет калорий</Link></li>
            </ul>
        </header>
    )
}
