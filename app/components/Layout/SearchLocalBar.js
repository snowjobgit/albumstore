import React from 'react';
import {connect} from "react-redux";
import {FormGroup, Input} from "reactstrap";
import {setSearchTermLocal} from "../../redux/reducers/appReducer";

const SearchLocalBar = ({ isFetching, searchTermLocal, setSearchTermLocal }) => {
    let disabled = isFetching && "disabled";

    const handleOnChange = (e) => {
        let value = e.target.value;
        setSearchTermLocal({searchTermLocal: value});
    };

    return (
        <FormGroup>
            <Input type="text" placeholder="Local search" bsSize="sm" value={searchTermLocal} disabled={disabled} onChange={handleOnChange}/>
        </FormGroup>
    );
};

const mapStateToProps = (state) => ({
    isFetching: state.app.isFetching,
    searchTermLocal: state.app.searchTermLocal,
});

export default connect(mapStateToProps, {setSearchTermLocal})(SearchLocalBar);