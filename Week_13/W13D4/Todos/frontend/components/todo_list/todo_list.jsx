import React from 'react';
import TodoListItem from './todo_list_item';
import TodoForm from './todo_form';


class TodoList extends React.Component{
    constructor(props) {
        super(props);
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
                <TodoForm />
            </div>
        );
    }
}

export default TodoList;