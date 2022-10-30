import React, { useState } from 'react';
import { ITask } from '../../types/tasks';
import Button from '../button';
import style from './Form.module.scss';
import { v4 as uuidv4 } from 'uuid'

interface Props {
    setTasks: React.Dispatch<React.SetStateAction<ITask[]>>
}

export default function Form({ setTasks }: Props) {
    const [ name, setName ] = useState('');
    const [ duration, setDuration ] = useState("00:00:00");

    function addTask(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault();
        setTasks(
            oldTasks => [...oldTasks, {
                name,
                duration,
                id: uuidv4(),
                selected: false,
                done: false
            }]
        );
        setName("")
        setDuration("")
    }

    return (
        <form className={style.newTask} onSubmit={ addTask }>
            <div className={style.inputContainer}>
                <label htmlFor='task'>
                    Add a new Task
                </label>
                <input
                    type='text'
                    name='task'
                    id='task'
                    placeholder='What you will do?'
                    value={ name }
                    onChange={ event => setName(event.target.value)}
                    required
                />
            </div>
            <div className={style.inputContainer}>
                <label htmlFor='duration'>
                    Duration
                </label>
                <input 
                    type='time'
                    step='1'
                    name='duration'
                    id='duration'
                    min='00:00:00'
                    max='02:00:00'
                    value={ duration }
                    onChange={ event => setDuration(event.target.value)}
                    required
                />
            </div>
            <div className={style.inputContainer}>
                <Button type='submit'>Add</Button>
            </div>
        </form>
    )
    
}