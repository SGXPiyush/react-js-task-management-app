import React, { useEffect, useState } from 'react'
import Image from "./assets/image.png";
import { ToastContainer, toast } from 'react-toastify';

const Home = () => {

    const [tasks, setTasks] = useState([

    ]);

    const [InputText, setInputText] = useState({ taskName: "", description: "", imgLink: "" });

    const [taskbox, setTaskbox] = useState(false)

    const [prioritybox, setPrioritybox] = useState(false)

    const [prioritySelector, setPrioritySelector] = useState({ selected: "", msg: "Select a Priority." })

    const [taskImg, setTaskImg] = useState({ img: "", msg: "Select Img." });

    useEffect(() => {
        let getTasks = localStorage.getItem("taskslist");
        if (getTasks) {
            setTasks(JSON.parse(getTasks));
        }
    }, [])
    

    const handleCreateTask = () => {
        setTaskbox(i => !i);
    }

    const handleImage = (e) => {
        if (URL.createObjectURL(e.target.files[0])) {
            setTaskImg({ ...taskImg, img: URL.createObjectURL(e.target.files[0]), msg: "Img Has Been Selected." })
        }
    }

    const handlePriorBox = () => {
        setPrioritybox(i => !i)
    }

    const handlePriorClick = (e) => {
        setPrioritySelector({ ...prioritySelector, selected: e, msg: e });
        setPrioritybox(i => !i)
    }

    const handleInput = (e) => {
        setInputText({ ...InputText, [e.target.name]: e.target.value })
    }

    const handleSubmit = () => {
        if (InputText.taskName) {
            if (InputText.description) {
                setTasks([...tasks, { taskName: InputText.taskName, description: InputText.description, imgLink: taskImg.img, completed: false }])
                localStorage.setItem("taskslist", JSON.stringify([...tasks, { taskName: InputText.taskName, description: InputText.description, imgLink: taskImg.img, completed: false }]));
                setInputText({ ...InputText, taskName: "", description: "", imgLink: "" })
                setTaskImg({ ...taskImg, img: "", msg: "Select Img." })
                setTaskbox(false)
                toast.success("Task Created Successfully.")
            }
            else {
                toast.error("Please Write description.")
            }
        }
        else if (!InputText.taskName && !InputText.description) {
            toast.error("Please Write Task Title and Description.")
        }

        else if (!InputText.taskName) {
            toast.error("Please Write Task Title.")
        }

    }

    const handleEnterKey = (e) => {
        if (e.keyCode === 13) {
            handleSubmit();
        }
    }

    const handleCompleted = (e) => {
        let index = e.target.id;
        index = parseInt(index.split("-")[1]);
        let ntask = tasks.filter(task => tasks.indexOf(task) !== index)
        tasks.forEach(i => {
            if (tasks.indexOf(i) === index) {
                tasks[index].completed = true;
                setTasks([tasks[index], ...ntask])
                localStorage.setItem("taskslist", JSON.stringify([tasks[index], ...ntask]));
            }
        })
    }
    
    const handleDelete = (e) => {
        let index = e.target.id
        index = parseInt(index.split("-")[1])
        setTasks(tasks.filter(task => tasks.indexOf(task) !== index))
        localStorage.setItem("taskslist", JSON.stringify(tasks.filter(task => tasks.indexOf(task) !== index)))
    }
    

    return (
        <div className='home-screen bg-gray-200'>

            <header className="header h-16 flex items-center px-4">

                <div className="search-box relative w-96 h-9 bg-white rounded-lg flex items-center justify-center">
                    <i className="bx bx-search absolute left-2 top-1 text-2xl"></i>
                    <input type="text" id="query" placeholder='Search For Task.' className='w-full h-full bg-transparent border-none outline-none rounded-lg text-base text-black pr-2 pl-10' />
                </div>

                <button onClick={handleCreateTask} className="create-a-task px-3 py-1 rounded-lg flex items-center justify-center ml-auto text-purple-500 border-2 border-purple-400 font-bold transition-all duration-500 hover:bg-purple-400 hover:text-white">
                    <i className="bx bxs-plus-circle text-xl mr-1"></i>
                    <span className="text">Create a Task</span>
                </button>

            </header>

            {/* Task Details Field */}

            {
                taskbox ? (
                    <div className='absolute w-screen h-screen top-0 left-0 bg-gray-700 bg-opacity-70 z-30 flex items-center justify-center '>
                        <div className="task-input-box w-2/4 bg-gray-200 rounded-lg px-3 py-3">
                            <div className="flex items-center w-full justify-between">
                                <h1 className="title flex items-center">Create A <span className='px-2 py-1 bg-purple-500 rounded-md text-white font-bold ml-2 shadow-xl'>Task.</span></h1>
                                <button onClick={() => { setTaskbox(false) }} className="close-btn w-8 h-8 rounded-md bg-white flex items-center justify-center text-xl cursor-pointer hover:shadow-xl transition-all duration-500">
                                    <i className="bx bx-x"></i>
                                </button>
                            </div>
                            <div className="input-box mt-6 relative w-full h-9 bg-white rounded-md flex items-center justify-center shadow-xl">
                                <span className="absolute top-3 left-2 w-3 h-3 bg-purple-400 rounded-full"></span>
                                <input type="text" autoFocus name='taskName' value={InputText.taskName} onChange={handleInput} onKeyDown={handleEnterKey} required id="taskName" placeholder='Enter the Task Title.' className='w-full h-full border-none outline-none rounded-md bg-transparent pr-2 pl-8' />
                            </div>

                            <div className="input-box mt-2 relative w-full h-9 bg-white rounded-md flex items-center justify-center shadow-xl">
                                <span className="absolute top-3 left-2 w-3 h-3 bg-purple-400 rounded-full"></span>
                                <input type="text" name='description' value={InputText.description} onChange={handleInput} onKeyDown={handleEnterKey} required className="w-full h-full border-none outline-none rounded-md bg-transparent pr-2 pl-8" id="task-description" placeholder='Enter the Description.' />
                            </div>

                            <div className="proiorty-selector relative w-full h-9 shadow-xl bg-white rounded-md mt-2 flex items-center justify-between pl-8 pr-1">
                                <span className="absolute top-3 left-2 w-3 h-3 rounded-full bg-purple-400"></span>
                                <span className="text font-bold">{prioritySelector.msg}</span>
                                <button onClick={handlePriorBox} className="dropdown-arrow text-2xl w-9 h-9 flex items-center justify-center cursor-pointer transition-all duration-500">
                                    <i className="bx bx-chevron-down"></i>
                                </button>
                                {
                                    prioritybox ? (
                                        <ul className="menu-list transition-all duration-500 absolute w-full px-3 py-3 bg-gray-100 shadow-xl top-11 left-0 rounded-md">
                                            <li onClick={() => { handlePriorClick("High") }} className="w-full py-1.5 rounded-md flex items-center px-3 bg-white hover:shadow-xl cursor-pointer transition-all duration-700">
                                                <span className="icon transform rotate-45 w-6 h-6 flex items-center justify-center bg-red-500 text-white font-bold">
                                                    <b className='transform -rotate-45 text-sm'>!!!</b>
                                                </span>
                                                <span className="text ml-4 font-bold text-base">High.</span>
                                            </li>

                                            <li onClick={() => { handlePriorClick("Medium") }} className="mt-2 w-full py-1.5 rounded-md flex flex-items-center px-3 bg-white hover:shadow-xl cursor-pointer transition-all duration-700">
                                                <span className="icon transform rotate-45 w-6 h-6 flex items-center justify-center bg-yellow-500 text-white font-bold"><b className="transform -rotate-45 text-sm">!!</b></span>
                                                <span className="text ml-4 font-bold text-base">Medium.</span>
                                            </li>

                                            <li onClick={() => { handlePriorClick("Low") }} className="mt-2 w-full py-1.5 rounded-md flex flex-items-center px-3 bg-white hover:shadow-xl cursor-pointer transition-all duration-700">
                                                <span className="icon transform rotate-45 w-6 h-6 flex items-center justify-center bg-green-500 text-white font-bold"><b className="transform -rotate-45 text-sm">!</b></span>
                                                <span className="text ml-4 font-bold text-base">Low.</span>
                                            </li>

                                        </ul>
                                    ) : (<></>)
                                }
                            </div>

                            <input type="file" id="img-selector" className='hidden' onChange={handleImage} />

                            <label htmlFor="img-selector" className='flex items-center justify-center w-full h-9 mt-2 bg-purple-500 rounded-md text-white font-bold cursor-pointer'>
                                <span className="text">{taskImg.msg}</span>
                            </label>

                            <button className='submit-task flex items-center justify-center w-full h-9 mt-2 bg-emerald-500 rounded-md text-white font-bold cursor-pointer' onClick={handleSubmit}>Submit Task.</button>

                        </div>
                    </div>
                ) : (<></>)
            }

            <ul className="card-container w-full flex px-3 flex-grow-0 flex-wrap justify-around">
                {
                    tasks.map(task => {
                        return task.completed ? (
                            <li key={tasks.indexOf(task)} className="card w-64 flex-grow-0 flex-shrink-0 rounded-lg px-2 py-2 flex flex-col cursor-pointer bg-white mt-4 mr-2 border-2 border-emerald-500">
                                <h3 className="task-title relative flex items-center pl-4"><div className='w-3 h-3 absolute left-0 top-1.5 bg-purple-500 rounded-full mr-2'></div>{task.taskName}</h3>
                                <h4 className="description text-gray-400">
                                    <span className="text-sm">description: {task.description}</span>
                                </h4>
                                <div className="completed-delete-btns mt-auto w-full flex items-center justify-between">
                                    <button id={`complete-${tasks.indexOf(task)}`} onClick={handleCompleted} className="completed px-3 py-1 border-2 border-emerald-500 text-white flex items-center justify-center rounded-md transition-all duration-500 bg-emerald-500">
                                        <span className="text text-base pointer-events-none">Completed</span>
                                    </button>
                                    <button id={`delete-${tasks.indexOf(task)}`} onClick={handleDelete} className="delete-btn px-3 py-1 border-2 border-red-500 text-red-500 font-bold flex items-center justify-center rounded-md transition-all duration-500 hover:bg-red-500 hover:text-white">
                                        <i className="bx bx-trash text-xl pointer-events-none"></i>
                                    </button>
                                </div>
                            </li>
                        ) : (
                            <li key={tasks.indexOf(task)} className="card w-64 flex-grow-0 flex-shrink-0 rounded-lg px-2 py-2 flex flex-col cursor-pointer bg-white mt-4 mr-2">
                                <h3 className="task-title relative flex items-center pl-4"><div className='w-3 h-3 absolute left-0 top-1.5 bg-purple-500 rounded-full mr-2'></div>{task.taskName}</h3>
                                <h4 className="description text-gray-400">
                                    <span className="text-sm">description: {task.description}</span>
                                </h4>
                                <div className="completed-delete-btns mt-auto w-full flex items-center justify-between">
                                    <button id={`complete-${tasks.indexOf(task)}`} onClick={handleCompleted} className="completed px-3 py-1 border-2 border-emerald-500 text-emerald-500 flex items-center justify-center rounded-md transition-all duration-500 hover:bg-emerald-500 hover:text-white">
                                        <span className="text text-base pointer-events-none">Complete</span>
                                    </button>
                                    <button id={`delete-${tasks.indexOf(task)}`} onClick={handleDelete} className="delete-btn px-3 py-1 border-2 border-red-500 text-red-500 font-bold flex items-center justify-center rounded-md transition-all duration-500 hover:bg-red-500 hover:text-white">
                                        <i className="bx bx-trash text-xl pointer-events-none"></i>
                                    </button>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default Home
