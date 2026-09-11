import { useEffect, useState } from "react";
import "./App.css";

const initialTasks = [
  {
    id: 1,
    title: "Revise JavaScript basics",
    subject: "Web Development",
    completed: false
  },
  {
    id: 2,
    title: "Practice Python loops",
    subject: "Programming",
    completed: true
  },
  {
    id: 3,
    title: "Complete Physics assignment",
    subject: "Physics",
    completed: false
  }
];

function TaskCard({ task, onToggle, onDelete }) {
  return (
    <div className={task.completed ? "task-card completed" : "task-card"}>
      <div className="task-info">
        <h3>{task.title}</h3>
        <p>{task.subject}</p>
      </div>

      <div className="task-actions">
        <button
          className="complete-button"
          onClick={() => onToggle(task.id)}
        >
          {task.completed ? "Completed ✓" : "Complete"}
        </button>

        <button
          className="delete-button"
          onClick={() => onDelete(task.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [taskTitle, setTaskTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    document.title = "StudySprint";
  }, []);

  function addTask(event) {
    event.preventDefault();

    if (taskTitle.trim() === "") {
      return;
    }

    const newTask = {
      id: Date.now(),
      title: taskTitle,
      subject: subject.trim() === "" ? "General" : subject,
      completed: false
    };

    setTasks([...tasks, newTask]);

    setTaskTitle("");
    setSubject("");
  }

  function toggleTask(id) {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          completed: !task.completed
        };
      }

      return task;
    });

    setTasks(updatedTasks);
  }

  function deleteTask(id) {
    const updatedTasks = tasks.filter((task) => {
      return task.id !== id;
    });

    setTasks(updatedTasks);
  }

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") {
      return task.completed;
    }

    if (filter === "pending") {
      return !task.completed;
    }

    return true;
  });

  const completedCount = tasks.filter((task) => {
    return task.completed;
  }).length;

  const totalTasks = tasks.length;

  return (
    <div className="app">
      <header className="navbar">
        <div className="logo">StudySprint</div>

        <nav>
          <a href="#dashboard">Dashboard</a>
          <a href="#tasks">Tasks</a>
          <a href="#about">About</a>
        </nav>
      </header>

      <main>
        <section className="hero" id="dashboard">
          <div>
            <p className="small-heading">STUDENT PRODUCTIVITY</p>
            <h1>Study smarter.<br />Stay on track.</h1>
            <p className="hero-text">
              Organize your daily study tasks and keep track of your progress
              in one simple place.
            </p>
          </div>

          <div className="progress-card">
            <p>Today's Progress</p>

            <h2>
              {completedCount} / {totalTasks}
            </h2>

            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{
                  width:
                    totalTasks === 0
                      ? "0%"
                      : `${(completedCount / totalTasks) * 100}%`
                }}
              ></div>
            </div>

            <span>
              {totalTasks === 0
                ? "No tasks yet"
                : `${completedCount} task${completedCount === 1 ? "" : "s"} completed`}
            </span>
          </div>
        </section>

        <section className="task-section" id="tasks">
          <div className="section-heading">
            <div>
              <p className="small-heading">YOUR TASKS</p>
              <h2>Today's Study Plan</h2>
            </div>
          </div>

          <form className="add-task" onSubmit={addTask}>
            <input
              type="text"
              placeholder="Enter a task..."
              value={taskTitle}
              onChange={(event) => setTaskTitle(event.target.value)}
            />

            <input
              type="text"
              placeholder="Subject"
              value={subject}
              onChange={(event) => setSubject(event.target.value)}
            />

            <button type="submit">+ Add Task</button>
          </form>

          <div className="filters">
            <button
              className={filter === "all" ? "active-filter" : ""}
              onClick={() => setFilter("all")}
            >
              All
            </button>

            <button
              className={filter === "pending" ? "active-filter" : ""}
              onClick={() => setFilter("pending")}
            >
              Pending
            </button>

            <button
              className={filter === "completed" ? "active-filter" : ""}
              onClick={() => setFilter("completed")}
            >
              Completed
            </button>
          </div>

          <div className="task-list">
            {filteredTasks.length === 0 ? (
              <div className="empty-state">
                <h3>No tasks found</h3>
                <p>Add a new task or change the filter.</p>
              </div>
            ) : (
              filteredTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onToggle={toggleTask}
                  onDelete={deleteTask}
                />
              ))
            )}
          </div>
        </section>

        <section className="about" id="about">
          <p className="small-heading">ABOUT STUDYSPRINT</p>
          <h2>A simple way to manage your study day.</h2>

          <p>
            StudySprint is a simple student productivity application made
            using React. It allows students to add tasks, mark them as
            completed, delete tasks and filter their study plan.
          </p>
        </section>
      </main>

      <footer>
        <p>StudySprint • Student Productivity App</p>
      </footer>
    </div>
  );
}

export default App;