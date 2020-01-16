import * as APIUtil from '../util/bench_api_util';

export const RECEIVE_BENCHES = "RECEIVE_BENCHES";

export const receiveBenches = benches => {
    return {
        type: RECEIVE_BENCHES,
        benches
    }
}

export const fetchBenches = () => dispatch => {
    return APIUtil.fetchBenches().then(benches => dispatch(receiveBenches(benches)))
}
window.fetchBenches = fetchBenches;