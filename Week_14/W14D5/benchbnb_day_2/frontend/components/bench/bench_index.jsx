import React from 'react';
import BenchIndexItem from './bench_index_item';
import * as APIUtil from '../../util/bench_api_util';

class BenchIndex extends React.Component {
    componentDidMount() {
        APIUtil.fetchBenches();
    }

    render() {
        <div>
            <ul>
                {this.props.benches.map(bench => (
                    <li><BenchIndexItem bench={bench}/></li>
                ))}
            </ul>
        </div>
    }
}

export default BenchIndex;