import React from "react";
import { Mutation, Query } from "react-apollo";
import mutations from "../../client/graphql/mutations";
const { UPDATE_GOD_ABODE } = mutations;
import queries from "../../client/graphql/queries"
const { FETCH_ABODES } = queries

class AbodeDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      abode: this.props.abode.name || ""
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
    // if we are editing we'll return a Mutation component
    if (this.state.editing) {
      return (
        <Mutation mutation={UPDATE_GOD_ABODE}>
          {(updateGodAbode, data) => (
            <div>
              <form
                onSubmit={e => {
                  e.preventDefault();
                  updateGodAbode({
                    // change name to abodeId
                    variables: { godId: this.props.godId, abodeId: this.props.abode.id }
                  }).then(() => this.setState({ editing: false }));
                }}
              >
                <select
                  value={this.state.abode}
                  onChange={this.fieldUpdate("abode")}
                >
                  <Query query={FETCH_ABODES}>
                      {({ loading, error, data }) => {
                        if (loading) return <option>Loading...</option>;
                        if (error) return <option>Error...</option>;
                        return data.abodes.map((abode, index) => (
                          <option key={index}>{abode.name}</option>
                        ));
                      }}
                  </Query>
                </select>
                <button type="submit">Update Abode</button>
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
          <h2>{this.state.abode}</h2>
        </div>
      );
    }
  }
}

export default AbodeDetail;