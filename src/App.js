import React, { Component } from "react";
import "./index.css";
import todosList from "./todos.json";

class App extends Component {
	state = {
		todos: todosList,
		value: ""
	};

	handleAddToDo = event => {
		if (event.key === "Enter") {
			const newTodo = {
				userId: 1,
				id: Math.floor(Math.random() * 1000000),
				title: event.target.value,
				completed: false
			};
			const newTodos = this.state.todos.slice();
			newTodos.push(newTodo);
			this.setState({ todos: newTodos });
			event.target.value = "";
		}
	};

	handleToggleComplete = todoIdToToggle => event => {
		const newTodos = this.state.todos.slice();
		const newNewTodos = newTodos.map(todo => {
			if (todo.id === todoIdToToggle) {
				todo.completed = !todo.completed;
			}
			return todo;
		});
		this.setState({ todos: newNewTodos });
	};

	handleDelete = todosId => {
		const newTodos = this.state.todos.filter(todo => {
			if (todo.id === todosId) {
				return false;
			}
			return true;
		});
		this.setState({ todos: newTodos });
	};

	handleChange = event => {
		this.setState({ value: event.target.value });
	};

	handleDeleteComplete = todoComplete => event => {
		const newTodos = this.state.todos.slice();
		const newNewTodos = newTodos.map(todo => {
			if (todo.completed === true) {
				return false;
			}
			return true;
		});
		this.setState({ todos: newNewTodos });
	};
	render() {
		return (
			<React.Fragment>
				<section className="todoapp">
					<header className="header">
						<h1>todos</h1>
						<input
							className="new-todo"
							placeholder="What needs to be done?"
							onKeyDown={this.handleAddToDo}
							autoFocus
							onChange={this.handleChange}
							value={this.state.value}
						/>
					</header>
					<TodoList
						todos={this.state.todos}
						handleToggleComplete={this.handleToggleComplete}
						handleDelete={this.handleDelete}
					/>
					<footer className="footer">
						<span className="todo-count">
							<strong>0</strong> item(s) left
						</span>
						<button
							className="clear-completed"
							onClick={this.props.handleDeleteComplete}
						>
							Clear completed
						</button>
					</footer>
				</section>
			</React.Fragment>
		);
	}
}

class TodoItem extends Component {
	render() {
		return (
			<li className={this.props.completed ? "completed" : ""}>
				<div className="view">
					<input
						className="toggle"
						type="checkbox"
						checked={this.props.completed}
						onChange={this.props.handleToggleComplete}
					/>
					<label>{this.props.title}</label>
					<button className="destroy" onClick={this.props.handleDelete} />
				</div>
			</li>
		);
	}
}

class TodoList extends Component {
	render() {
		return (
			<section className="main">
				<ul className="todo-list">
					{this.props.todos.map(todo => (
						<TodoItem
							key={todo.id}
							title={todo.title}
							completed={todo.completed}
							id={todo.id}
							handleToggleComplete={this.props.handleToggleComplete(todo.id)}
							handleDelete={event => this.props.handleDelete(todo.id)}
						/>
					))}
				</ul>
			</section>
		);
	}
}

export default App;
