import React, {useState, useEffect} from "react";
import "./App.css";

function App() {
    // 기본으로 Active 2개, Completed 2개가 있도록 초기값 설정
    const [todos, setTodos] = useState([
        {
            id: 1,
            text: "칼퇴",
            completed: false
        }, {
            id: 2,
            text: "이사",
            completed: false
        }, {
            id: 3,
            text: "커피챗",
            completed: true
        }, {
            id: 4,
            text: "주간회의",
            completed: true
        }
    ]);

    const [inputValue, setInputValue] = useState("");
    const [filter, setFilter] = useState("all"); // all, active, completed
    const [darkMode, setDarkMode] = useState(false);

    // 다크모드일 때 body 전체 배경과 텍스트 색상을 변경
    useEffect(() => {
        document.body.style.backgroundColor = darkMode
            ? "#333"
            : "#fff";
        document.body.style.color = darkMode
            ? "#fff"
            : "#333";
    }, [darkMode]);

    // Todo 추가
    const handleAddTodo = () => {
        if (!inputValue.trim()) 
            return;
        const newTodo = {
            id: Date.now(),
            text: inputValue,
            completed: false
        };
        setTodos([
            ...todos,
            newTodo
        ]);
        setInputValue("");
    };

    // 체크박스 토글
    const handleToggleTodo = (id) => {
        const updated = todos.map(
            (todo) => todo.id === id
                ? {
                    ...todo,
                    completed: !todo.completed
                }
                : todo
        );
        setTodos(updated);
    };

    // 삭제
    const handleDeleteTodo = (id) => {
        const filtered = todos.filter((todo) => todo.id !== id);
        setTodos(filtered);
    };

    // Enter 키로 추가
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleAddTodo();
        }
    };

    // 필터에 따라 보여줄 목록 필터링
    const getFilteredTodos = () => {
        if (filter === "active") {
            return todos.filter((todo) => !todo.completed);
        } else if (filter === "completed") {
            return todos.filter((todo) => todo.completed);
        } else {
            return todos;
        }
    };

    // 테마 토글
    const toggleTheme = () => {
        setDarkMode(!darkMode);
    };

    return (
        <div
            className={`app-container ${darkMode
                ? "dark"
                : "light"}`}>
            <div className="header">
                <button className="theme-toggle-btn" onClick={toggleTheme}>
                    {
                        darkMode
                            ? "☀️"
                            : "🌙"
                    }
                </button>
                <div className="tabs">
                    <span
                        className={filter === "all"
                            ? "active-tab"
                            : ""}
                        onClick={() => setFilter("all")}>
                        All
                    </span>
                    <span
                        className={filter === "active"
                            ? "active-tab"
                            : ""}
                        onClick={() => setFilter("active")}>
                        Active
                    </span>
                    <span
                        className={filter === "completed"
                            ? "active-tab"
                            : ""}
                        onClick={() => setFilter("completed")}>
                        Completed
                    </span>
                </div>
            </div>

            <div className="todo-list">
                {
                    getFilteredTodos().map((todo) => (
                        <div className="todo-item" key={todo.id}>
                            {/* 왼쪽: 체크박스 + 텍스트 */}
                            <div className="todo-left">
                                <input
                                    type="checkbox"
                                    checked={todo.completed}
                                    onChange={() => handleToggleTodo(todo.id)}/>
                                <span
                                    className={todo.completed
                                        ? "completed-text"
                                        : ""}>
                                    {todo.text}
                                </span>
                            </div>
                            {/* 오른쪽: 휴지통 아이콘 */}
                            <button className="delete-btn" onClick={() => handleDeleteTodo(todo.id)}>
                                🗑
                            </button>
                        </div>
                    ))
                }
            </div>

            <div className="add-todo">
                <input
                    type="text"
                    placeholder="Add Todo"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}/>
                <button onClick={handleAddTodo}>Add</button>
            </div>
        </div>
    );
}

export default App;
