import React from 'react';
import TodoListItem from './todo_list_item';
import TodoForm from './todo_form';


class TodoList extends React.Component{
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        this.props.fetchTodos();
    }

    render() {
        const todoItems = this.props.todos.map(todo => (
                <TodoListItem
                    key={`todo-list-item${todo.id}`}
                    todo={todo}/>
            )
        );
        //debugger;
        
        return (
            <div>
                <ul className='todo-list'>
                    {todoItems}
                </ul>
                <TodoForm receiveTodo={this.props.receiveTodo} 
                createTodo={this.props.createTodo}
                errors={this.props.errors}/>
            </div>
        );
    }
}

export default TodoList;