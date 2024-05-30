import React, { useRef, useState, useEffect } from 'react';
import './ToDo.css';

function ToDo() {
    const taskRef = useRef(null);
    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem('allTasks');
        return savedTasks ? JSON.parse(savedTasks) : [];
    });

    useEffect(() => {
        localStorage.setItem('allTasks', JSON.stringify(tasks));
    }, [tasks]);

    const addTask = () => {
        const taskData = {
            task: taskRef.current.value,
            completed: false
        };
        setTasks([...tasks, taskData]);
        taskRef.current.value = '';
    };

    const editTask = (index) => {
        const newTask = prompt('Edit Task', tasks[index].task);
        if (newTask) {
            const updatedTasks = tasks.map((task, i) =>
                i === index ? { ...task, task: newTask } : task
            );
            setTasks(updatedTasks);
        }
    };

    const deleteTask = (index) => {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    };

    const completeTask = (index) => {
        const updatedTasks = tasks.map((task, i) =>
            i === index ? { ...task, completed: !task.completed } : task
        );
        setTasks(updatedTasks);
    };

    return (
        <div className='container border-black flex justify-center flex-col items-center mt-10'>
            <div>
                <input
                    type="text"
                    ref={taskRef}
                    id="task-text"
                    className="w-96 p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Add Your Task"
                    required
                />
                <button
                    type="button"
                    onClick={addTask}
                    className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-3.5 me-1 mx-3 mb-2 dark:focus:ring-yellow-900"
                >
                    Add Task
                </button>
            </div>
            <div className="w-5/6 mt-12">
                <ul className="space-y-4">
                    {tasks.map((task, index) => (
                        <li
                            key={index}
                            className={`flex justify-between items-center p-4 rounded-lg shadow-md ${task.completed ? 'bg-green-200 dark:bg-green-900' : 'bg-white dark:bg-gray-800'}`}
                        >
                            <span
                                className={`flex-grow text-gray-900 dark:text-white ${task.completed ? 'line-through' : ''}`}
                            >
                                {task.task}
                            </span>
                            <div className="flex-shrink-0 flex space-x-4">
                                <button
                                    onClick={() => completeTask(index)}
                                    className="font-medium text-blue-600 bg-black p-3 rounded-md dark:text-blue-500 hover:underline"
                                >
                                    {task.completed ? 'Undo' : 'Complete'}
                                </button>
                                <button
                                    onClick={() => editTask(index)}
                                    className="font-medium text-blue-600 bg-black p-3 rounded-md dark:text-blue-500 hover:underline"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => deleteTask(index)}
                                    className="font-medium bg-black p-3 rounded-md text-red-600 dark:text-red-500 hover:underline"
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default ToDo;
