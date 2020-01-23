import React from "react";
import { Mutation, Query } from "react-apollo";
import mutations from "../../client/graphql/mutations";
const { ADD_GOD_EMBLEM } = mutations;
import queries from "../../client/graphql/queries"
const { FETCH_EMBLEMS } = queries

class EmblemDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      emblem: ""
    };

    this.handleEdit = this.handleEdit.bind(this);
  }

  // this is the function that will trigger "editing" mode
  handleEdit(e) {
    e.preventDefault();
    this.setState({ editing: true });
  }

  fieldUpdate(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  render() {
    if (this.state.editing) {
      return (
        <Mutation mutation={ADD_GOD_EMBLEM}>
          {(addGodEmblem, data) => (
            <div>
              <form
                onSubmit={e => {
                  e.preventDefault();
                  if (this.state.emblem == "") {
                    this.state.emblem = "5c98e9d5d5a3ca0de10a1505";
                  }

                  addGodEmblem({
                    variables: {
                      godId: this.props.god.id,
                      emblemId: this.state.emblem
                    }
                  }).then(() => this.setState({ editing: false }));
                }}
              >
                <select
                  value={this.state.emblem}
                  onChange={this.fieldUpdate("emblem")}
                >
                  <Query query={FETCH_EMBLEMS}>
                      {({ loading, error, data }) => {
                        if (loading) return <option>Loading...</option>;
                        if (error) return <option>Error...</option>;
                        const filteredEmblems = data.emblems.filter(emblem => 
                          !this.props.god.emblems.map(emblem => emblem.name).includes(emblem.name))
                        return filteredEmblems.map((emblem, index) => (
                          <option value={emblem.id} key={index}>
                            {emblem.name}
                          </option>
                        ));
                      }}
                  </Query>
                </select>
                <button type="submit">Add Emblem</button>
              </form>
            </div>
          )}
        </Mutation>
      );
    } else {
      return (
        <div>
          <div
            onClick={this.handleEdit}
            style={{ fontSize: "10px", cursor: "pointer", display: "inline" }}
          >
            Edit
          </div>
          <div>
            {this.props.god.emblems.map((emblem, index) => (
              <li key={index}>{emblem.name}</li>
            ))}
          </div>
        </div>
      );
    }
  }
}

export default EmblemDetail;