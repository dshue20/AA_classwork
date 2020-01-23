import React from "react";
import { Mutation } from "react-apollo";
import mutations from "../../client/graphql/mutations";
const { UPDATE_GOD_DESCRIPTION } = mutations;

class DescriptionDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      description: this.props.description || ""
    };

    this.handleEdit = this.handleEdit.bind(this);
  }

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
        <Mutation mutation={UPDATE_GOD_DESCRIPTION}>
          {(updateGodDescription, data) => (
            <div>
              <form
                onSubmit={e => {
                  e.preventDefault();
                  updateGodDescription({
                    variables: { id: this.props.id, description: this.state.description }
                  }).then(() => this.setState({ editing: false }));
                }}
              >
                <textarea
                  value={this.state.description}
                  onChange={this.fieldUpdate("description")}
                />
                <button type="submit">Update Description</button>
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
          <h2>{this.state.description}</h2>
        </div>
      );
    }
  }
}

export default DescriptionDetail;