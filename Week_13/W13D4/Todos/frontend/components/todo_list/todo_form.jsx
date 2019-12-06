import React from 'react';
import {uniqueId} from '../../util/id_generator';
import {receiveTodo} from '../../actions/todo_actions';

class TodoForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            body: "",
            done: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e){
        e.preventDefault();
        const todo = Object.assign({}, this.state, {id: uniqueId});
        receiveTodo(todo);
        this.setState({
            title: "",
            body: ""
        });
    }

    render(){
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Title
                    <input type="text"/>
                </label>

                <label>
                    <textarea cols="30" rows="10"></textarea>
                </label>

                <button>Submit</button>
            </form>
        )        
    }
}

export default TodoForm;