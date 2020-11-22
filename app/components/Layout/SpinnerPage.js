import React from 'react';
import {Spinner} from "reactstrap";

const SpinnerPage = () => {
    return(
        <div className="spinner-wrapper">
            <Spinner color="primary" size="md" />
        </div>
    );
};

export default SpinnerPage;