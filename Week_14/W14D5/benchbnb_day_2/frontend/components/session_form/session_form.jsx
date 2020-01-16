import React from 'react';
import { Link, Redirect } from 'react-router-dom';


export default class SessionForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        username: "",
        password: ""
      };
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleSubmit(e) {
        e.preventDefault();
        const user = Object.assign({}, this.state);
        this.props.processForm(user);
        if (!this.props.errors) {
            this.props.history.push("/");
        }
    }

    update(property) {
        return e => this.setState({
            [property]: e.currentTarget.value
        })
    }

    renderErrors() {
        // debugger;
        if (this.props.errors) {
            return Object.keys(this.props.errors).map(
                (error, idx) => (<li key={idx}>{this.props.errors}</li>)
            )
        }
    }

    render() {
        return (
            <div>
                <ul>
                    {this.renderErrors()}
                </ul>
                <h1>{this.props.formType}</h1>

                <form onSubmit={this.handleSubmit}>
                    <label>
                        Username:
                        <input type="text" onChange={this.update('username')}/> 
                    </label>

                    <label>
                        Password: 
                        <input type="text" onChange={this.update('password')}/>
                    </label>

                    <input type="submit" value={this.props.formType}/>
                </form>
            </div>
        )
    }
}

