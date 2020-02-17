import React, { Component } from "react";
import TodoItem from "./TodoItem";

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

export default TodoList;
