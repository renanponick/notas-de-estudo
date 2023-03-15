import { useState } from 'react';
import Form from '../components/form';
import List from '../components/list';
import Timer from '../components/timer';
import { ITask } from '../types/tasks';
import styles from './App.module.scss'

function App() {
  const [ tasks, setTasks ] = useState<ITask[]>([]);
  const [ selected, setSelected ] = useState<ITask>();

  function selectTask(selectedTask: ITask) {
    setSelected(selectedTask);
    setTasks(oldTasks => oldTasks.map(
      task => ({
        ...task,
        selected: task.id === selectedTask.id ? true : false 
      })
    ));
  }

  function doneTask() {
    if(selected){
      setSelected(undefined);
      setTasks(oldTasks => oldTasks.map(task => {
        if(task.id === selected.id){
          return {
            ...task,
            selected: false,
            done: true
          }
        }
        return task
      }))
    }
  }

  return (
    <div className={ styles.AppStyle }>
      <Form setTasks={ setTasks }/>
      <List
        tasks={ tasks }
        selectTask={ selectTask }
      />
      <Timer 
        selected={ selected }
        doneTask={ doneTask }
      />
    </div>
  );
}

export default App;
