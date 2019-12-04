import React from 'react';

export default class Autocomplete extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            inputVal: 'Search...'
        };
        this.handleInput = this.handleInput.bind(this);
    }

    handleInput(e){
        this.setState({inputVal: e.currentTarget.value});
    }

    autocompleter(){
        const matches = [];
        const len = this.state.inputVal.length;
        if (len === 0 || this.state.inputVal === 'Search...'){
            return this.props.names;
        }
        this.props.names.forEach(name => {
            const sub = name.slice(0, this.state.inputVal.length)
            if (sub.toLowerCase() === this.state.inputVal.toLowerCase()) matches.push(name);
        });

        if (!matches.length) matches.push('No Matches');
        return matches;
    }

    // it works :o yup nice! just styling now and we are done
    // getting kicked out of br rooms cool see ya
    render(){
        const names = this.autocompleter().map((name, idx) => {
            return (
                <li key={idx}>{name}</li>
            )
        });
        return (
          <div>
            <input onChange={this.handleInput} type="text" value={this.state.inputVal} />
            <ul>{names}</ul>
          </div>
        )
    }
}