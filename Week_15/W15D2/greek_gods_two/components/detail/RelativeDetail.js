import React from "react";
import { Mutation, Query } from "react-apollo";
import mutations from "../../client/graphql/mutations";
const { ADD_GOD_RELATIVE } = mutations;
import queries from "../../client/graphql/queries";
const { FETCH_GODS } = queries;

class RelativeDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      type: this.props.type,
      god: "",
      relative: ""
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
        <Mutation mutation={ADD_GOD_RELATIVE}>
          {(addGodRelative, data) => (
            <div>
              <form
                onSubmit={e => {
                  e.preventDefault();
                  if (this.state.god == "") {
                    this.state.god = "";
                  }
                  console.log(this.state)

                  addGodRelative({
                    variables: {
                      godId: this.props.god.id,
                      relativeId: this.state.god,
                      relationship: this.state.type
                    }
                  }).then(() => this.setState({ editing: false }));
                }}
              >
                <select
                  value={this.state.god}
                  onChange={this.fieldUpdate("god")}
                >
                  <Query query={FETCH_GODS}>
                    {({ loading, error, data }) => {
                      if (loading) return <option>Loading...</option>;
                      if (error) return <option>Error...</option>;
                      const relativeArray = {
                        parent: this.props.god.parents,
                        sibling: this.props.god.siblings,
                        child: this.props.god.children
                      };
                      const filteredGods = data.gods.filter(
                        relative =>
                          relative.name !== this.props.god.name &&
                          !relativeArray[this.state.type]
                            .map(otherGod => otherGod.name)
                            .includes(relative.name)
                      );
                      return filteredGods.map((god, index) => (
                        <option value={god.id} key={index}>
                          {god.name}
                        </option>
                      ));
                    }}
                  </Query>
                </select>
                <button type="submit">Add Relative</button>
              </form>
            </div>
          )}
        </Mutation>
      );
    } else {
      const relativeArray = {
        parent: this.props.god.parents,
        sibling: this.props.god.siblings,
        child: this.props.god.children
      };
      return (
        <div>
          <div
            onClick={this.handleEdit}
            style={{ fontSize: "10px", cursor: "pointer", display: "inline" }}
          >
            Add
          </div>
          <div>
            {relativeArray[this.props.type].map((relative, index) => (
              <li key={index}>{relative.name}</li>
            ))}
          </div>
        </div>
      );
    }
  }
}

export default RelativeDetail;
