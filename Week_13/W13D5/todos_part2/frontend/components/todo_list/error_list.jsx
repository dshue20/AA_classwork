import React from 'react';

const ErrorList = ({errors}) => {
    return (
        <ul>
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
    )
};

export default ErrorList;