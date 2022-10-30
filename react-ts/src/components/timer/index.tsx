import { useEffect, useState } from 'react';
import { toSecond } from '../../common/utils/time';
import { ITask } from '../../types/tasks';
import Button from '../button';
import Clock from './clock';
import style from './Timer.module.scss'

interface Props {
    selected?: ITask
    doneTask: () => void
}

export default function Timer({ selected, doneTask }: Props) {
    const [ duration, setDuration ] = useState<number>();

    useEffect(() => {
        setDuration(toSecond(selected?.duration || '00:00'))
    }, [selected]);

    function countdown(count = 0){
        setTimeout(() => {
            if(count > 0) {
                setDuration(count - 1);
                return countdown(count - 1);
            }
            doneTask()
        }, 1000)
    }

    return (
        <div className={style.timer}>
            <p className={style.title} >Select a card and start the timer</p>
            <div className={ style.clockWrapper }>
                <Clock
                    duration={ duration }
                />
            </div>
            <Button onClick={ () => countdown(duration)} >
                Start
            </Button>
        </div>
    )
}