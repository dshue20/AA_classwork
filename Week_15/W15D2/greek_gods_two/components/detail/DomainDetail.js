import React from "react";
import { Mutation } from "react-apollo";
import mutations from "../../client/graphql/mutations";
const { ADD_GOD_DOMAIN, REMOVE_GOD_DOMAIN } = mutations;

class DomainDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      adding: false,
      removing: false,
      domain: ""
    };

    this.handleAdd = this.handleAdd.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.fieldUpdate = this.fieldUpdate.bind(this);
  }

  handleAdd(e) {
    e.preventDefault();
    this.setState({ adding: true });
  }

  handleRemove(e) {
    e.preventDefault();
    this.setState({ removing: true });
  }

  fieldUpdate(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  render() {
    if (this.state.adding) {
      return (
        <Mutation mutation={ADD_GOD_DOMAIN}>
          {(ADD_GOD_DOMAIN, data) => (
            <div>
              <form
                onSubmit={e => {
                  e.preventDefault();
                  ADD_GOD_DOMAIN({
                    variables: {
                      id: this.props.god.id,
                      domain: this.state.domain
                    }
                  }).then(() => this.setState({ adding: false }));
                }}
              >
                <input
                  value={this.state.domain}
                  onChange={this.fieldUpdate("domain")}
                />
                <button type="submit">Update Domains</button>
              </form>
            </div>
          )}
        </Mutation>
      );
    } else if (this.state.removing) {
        return (
          <Mutation mutation={REMOVE_GOD_DOMAIN}>
            {(REMOVE_GOD_DOMAIN, data) => (
              <div>
                <ul>
                  {this.props.god.domains.map((domain, index) => (
                    <li key={index}>
                      {domain}
                      <button
                        onClick={e => {
                          e.preventDefault();
                          REMOVE_GOD_DOMAIN({
                            variables: {
                              id: this.props.god.id,
                              domain: domain
                            }
                          }).then(() => this.setState({ removing: false }));
                        }}
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Mutation>
        );
    }
    else {
      return (
        <div>
          <div
            onClick={this.handleAdd}
            style={{ fontSize: "10px", cursor: "pointer", display: "inline" }}
          >
            Add
          </div>
          <div
            onClick={this.handleRemove}
            style={{ fontSize: "10px", cursor: "pointer", display: "inline" }}
          >
            Remove
          </div>
          <ul>
            {this.props.god.domains.map((domain, index) => (
              <li key={index}>{domain}</li>
            ))}
          </ul>
        </div>
      );
    }
  }
}

export default DomainDetail;