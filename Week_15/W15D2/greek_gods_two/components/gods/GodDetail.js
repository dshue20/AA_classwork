import React, { Component } from "react";
import { Query } from "react-apollo";
import queries from "../../client/graphql/queries";
const { FETCH_GOD } = queries;
import NameDetail from '../detail/NameDetail';
import TypeDetail from '../detail/TypeDetail';
import DescriptionDetail from '../detail/DescriptionDetail';
import DomainDetail from "../detail/DomainDetail";
import AbodeDetail from "../detail/AbodeDetail";
import EmblemDetail from "../detail/EmblemDetail";
import RelativeDetail from "../detail/RelativeDetail";


const GodDetail = props => {
    return (
      // there we are getting the `id` for our query from React Router
      <Query query={FETCH_GOD} variables={{ id: props.match.params.id }}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error</p>;
          const god = data.god;
          return (
            <div className="detail">
              <h1 className="detail">
                <NameDetail id={god.id} name={god.name} />
              </h1>
              <h3>
                <TypeDetail id={god.id} type={god.type} />
              </h3>
              <h3>
                Abode: <AbodeDetail godId={god.id} abode={god.abode} />
              </h3>
              <h3>Emblems:</h3>
              <EmblemDetail god={god} />
              {/* <ul>
                {god.emblems.map((emblem, index) => (
                  <li key={index}>{emblem.name}</li>
                ))}
              </ul> */}
              <h3>Domains:</h3>
              <DomainDetail god={god} />
              <h3>Parents: </h3>
              <RelativeDetail god={god} type="parent" />
              <h3>Siblings:</h3>
              <RelativeDetail god={god} type="sibling" />
              <h3>Children:</h3>
              <RelativeDetail god={god} type="child" />
              <div>
                <DescriptionDetail id={god.id} description={god.description} />
              </div>
            </div>
          );
        }}
      </Query>
    );
}
// 5c98ec10d5a3ca0de10a1544
export default GodDetail;