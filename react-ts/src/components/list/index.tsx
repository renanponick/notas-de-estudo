import React from 'react';
import style from './List.module.scss';

function List(){
    const tasks = [
        { name: 'batata', duration: '02:00:00'},
        { name: 'batata2', duration: '02:00:00'},
    ]

    return (
        <aside className={style.tasksList}>
            <h2>Day Tasks</h2>
            <ul>
                {tasks.map((task, index) => (
                    <li key={index} className={style.item}>
                        <h3>{ task.name }</h3>
                        <span>{ task.duration }</span>
                    </li>
                ))}
            </ul>
        </aside>
    )
}

export default List