import { ITask } from '../../../types/tasks'
import style from './Item.module.scss'

interface Props extends ITask {
    selectTask: (selectedTask: ITask) => void
}

export default function Item(
    { id, name, duration, selected, done, selectTask }: Props
){
    return (
         <li 
            className={
                `${style.item} ` +
                `${selected ? style.selectedItem : ''} ` +
                `${done ? style.doneItem : ''}`
            }
            onClick={() => !done && selectTask({
                id,
                name,
                duration,
                selected,
                done
            })}
         >
            <h3>{ name }</h3>
            <span>{ duration }</span>
            { done && 
                <span className={style.done} aria-label='Item done' />
            }
        </li>
    )
}