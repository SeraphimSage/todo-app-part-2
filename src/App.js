import React, { Component } from "react";
import "./index.css";
import todosList from "./todos.json";
import TodoList from "./components/TodoList.js";
import { Route, NavLink } from "react-router-dom";

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
					<Route
						exact
						path="/"
						render={() => (
							<TodoList
								todos={this.state.todos}
								handleToggleComplete={this.handleToggleComplete}
								handleDelete={this.handleDelete}
								handleDeleteComplete={this.handleDeleteComplete}
							/>
						)}
					/>
					<Route
						path="/active"
						render={() => (
							<TodoList
								todos={this.state.todos.filter(
									todo => todo.completed === false
								)}
								handleToggleComplete={this.handleToggleComplete}
								handleDelete={this.handleDelete}
								handleDeleteComplete={this.handleDeleteComplete}
							/>
						)}
					/>
					<Route
						path="/completed"
						render={() => (
							<TodoList
								todos={this.state.todos.filter(todo => todo.completed === true)}
								handleToggleComplete={this.handleToggleComplete}
								handleDelete={this.handleDelete}
								handleDeleteComplete={this.handleDeleteComplete}
							/>
						)}
					/>

					<footer className="footer">
						<span className="todo-count">
							<strong>0</strong> item(s) left
						</span>
						<ul className="filters">
							<li>
								<NavLink exact to="/" activeClassName="selected">
									All
								</NavLink>
							</li>
							<li>
								<NavLink to="/active" activeClassName="selected">
									Active
								</NavLink>
							</li>
							<li>
								<NavLink to="/completed" activeClassName="selected">
									Completed
								</NavLink>
							</li>
						</ul>
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

export default App;
