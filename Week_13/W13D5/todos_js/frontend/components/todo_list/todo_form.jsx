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
        console.log(this.props);
        this.props.receiveTodo(todo);
        this.setState({
            title: "",
            body: ""
        });
    }

    update(text){
        return e => this.setState({[text]: e.target.value});
    }

    render(){
        debugger;
        console.log('hello');
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Title
                    <input type="text" onChange={this.update('title')}/>
                </label>

                <label>
                    Body
                    <textarea cols="30" rows="10" onChange={this.update('body')}></textarea>
                </label>

                <button>Submit</button>
            </form>
        )        
    }
}

export default TodoForm;