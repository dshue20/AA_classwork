import React from 'react';

export default class Tab extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            selected: 0
        }
        this.selectedTabHandler = this.selectedTabHandler.bind(this);
    }

    selectedTabHandler(idx){
        this.setState({ selected: idx });
    }
    
    render(){
        const tabs = this.props.tabs.map((tab, idx) => (
          <li
            key={idx}
            onClick={() => this.selectedTabHandler(idx)}
          >
            <p className="tab-title">{tab.title}</p>
          </li>
        ));
        return (
          <div className="tab">
            <h1>Tabs</h1>
            <div className="tab-background">
              <ul className="tab-list">{tabs}</ul>
              <article className="tab-content">
                {this.props.tabs[this.state.selected].content}
              </article>
            </div>
          </div>
        );
    }
}