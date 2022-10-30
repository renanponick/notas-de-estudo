import React from 'react';
import Button from '../button';
import style from './Form.module.scss';

class Form extends React.Component {
    render(){
        return (
            <form className={style.newTask}>
                <div className={style.inputContainer}>
                    <label htmlFor='task'>
                        Add a new Task
                    </label>
                    <input
                        type='text'
                        name='task'
                        id='task'
                        placeholder='What you will do?'
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
                        max='01:00:00'
                        required
                    />
                </div>
                <div className={style.inputContainer}>
                    <Button />
                </div>
            </form>
        )
    }
}

export default Form