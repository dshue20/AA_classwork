import React from 'react';

class TodoListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    changeTodo(e){
        e.preventDefault();
        
    }

    render() {
        return (
            <div>
                <li>
                    {this.props.todo.title}
                </li>
                <button onClick={this.changeTodo}>{this.props.todo.done? "Undo" : "Done"}</button>
                <button onClick={this.props.removeTodo}>Remove Todo</button>
            </div>
        )
    }
}

export default TodoListItem;