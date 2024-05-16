import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [defaultTime, setDefaultTime] = useState(0);
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [showTimer, setShowTimer] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  
  
  useEffect(() => {
    let timer;
    if (isRunning && time > 0) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      setIsRunning(false);
      setShowTimer(false);
      console.log('Pomodoro completed!');
    }

    return () => clearInterval(timer);
  }, [isRunning, time]);

  const handlePomodoroClick = () => {
    if (!showTimer) {
      const userInput = prompt('Enter Pomodoro duration (in HH:MM:SS format):');
  
      // Check if the user clicked cancel or did not enter anything
      if (userInput === null || userInput.trim() === '') {
        return;
      }
  
      const timeArray = userInput.split(':').map(Number);
  
      if (timeArray.length === 3 && timeArray.every((val) => !isNaN(val))) {
        const seconds = timeArray[0] * 3600 + timeArray[1] * 60 + timeArray[2];
        setDefaultTime(seconds);
        setTime(seconds);
        setShowTimer(true);
        setIsRunning(true);
      } else {
        alert('Invalid input. Please enter a valid time in HH:MM:SS format.');
      }
    }
  };
  

  const handleShortClick = () => {
    if (!showTimer) {
      const userInput = prompt('Enter Short Break duration in minutes:');
      const minutes = parseInt(userInput, 10);

      // Check if the user clicked cancel or did not enter anything
      if (userInput === null || userInput.trim() === '') {
        return;
      }
  
      if (!isNaN(minutes) && minutes > 0 && minutes <= 100) {
        const seconds = minutes * 60;
        setDefaultTime(seconds);
        setTime(seconds);
        setShowTimer(true);
        setIsRunning(true);
      } else {
        alert('Invalid input. Please enter a valid duration in minutes, up to 100 minutes.');
      }
    }
  };
  
  

  const handleLongClick = () => {
    if (!showTimer) {
      const userInput = prompt('Enter Long break duration in minutes:');
      const minutes = parseInt(userInput, 10);

      // Check if the user clicked cancel or did not enter anything
      if (userInput === null || userInput.trim() === '') {
        return;
      }

  
      if (!isNaN(minutes) && minutes > 0 && minutes <= 100) {
        const seconds = minutes * 60;
        setDefaultTime(seconds);
        setTime(seconds);
        setShowTimer(true);
        setIsRunning(true);
      } else {
        alert('Invalid input. Please enter a valid duration in minutes, up to 100 minutes.');
      }
    }
  };
  
  const stopTimer = () => {
    setShowTimer(true);
    setIsRunning(false); // Stop the timer by setting isRunning to false
  };
  

  const resetTimer = (option) => {
    setShowTimer(true);
    setIsRunning(false);
    setTime(defaultTime); // Use this if setDefaultTime is a variable or constant
  };
  
  

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      setTasks((prevTasks) => [...prevTasks, newTask]);
      setNewTask('');
    }
  };

  const handleTaskInputChange = (e) => {
    setNewTask(e.target.value);
  };

  const handleInputKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddTask();
    }
  };

  const handleScroll = (e) => {
    const todoPanel = document.getElementById('todoPanel');
    if (e.deltaY !== 0) {
      todoPanel.scrollTop += e.deltaY;
    }
  };

  const formatTime = () => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    const formattedTime = `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

    // Update the document.title with the formatted time and Pomodoro
    document.title = isRunning ? `${formattedTime} Pomodoro` : 'Hello world';

    return formattedTime;
  };

  return (
    <div className="App">
      <header>
      <title>Hello world</title>
      </header>
      <div className="main-container" onWheel={handleScroll}>
          <div className="pomodoro-container">
            <div className="timer" id="timer">
              {formatTime()}
            </div>
            <button className="btn" onClick={stopTimer}>
              stop
            </button>
            <button className="btn" onClick={resetTimer}>
              Reset
            </button>
          </div>
          <div className="message">
              "You can't use up creativity. The more you use,<br/> the more you have."
          </div>
          <div className="Options">
            <button className="btn" onClick={handlePomodoroClick}>
            Pomodoro
            </button>
            <button className="btn" onClick={handleShortClick}>
              Short Break
            </button>
            <button className="btn" onClick={handleLongClick}>
              Long Break
            </button>
          </div>
        <div className="todopanel">
        <h2>Todo List</h2>
          <div id="todoPanel" className="todo-scroll">
            <ul>
              {tasks.map((task, index) => (
                <li key={index}>
                  <input type="checkbox" id={`cb${index + 1}`} name={`cb${index + 1}`} />
                  <label htmlFor={`cb${index + 1}`}>{task}</label>
                </li>
              ))}
            </ul>
            <input
              type="text"
              placeholder="Enter task"
              className="tasks"
              value={newTask}
              onChange={handleTaskInputChange}
              onKeyPress={handleInputKeyPress}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
