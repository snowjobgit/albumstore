import React from 'react'
import {compose} from "redux";
import {connect} from "react-redux";
import {setAlbumsSortingField} from "../../redux/reducers/appReducer";
import {FormGroup, Input} from "reactstrap";

const withSorting = Component => props => {
    return <Component {...props} sortingItems={[
        {value: "releaseDate", title: "Released"},
        {value: "sales", title: "Sales"},
        {value: "popularity", title: "Popular"},
    ]} />
};

const SortBar = ({setAlbumsSortingField, sortingItems, sortAlbumsKey, isFetching}) => {
    const onChangeHandle = ({target}) => {
        setAlbumsSortingField(target.value);
    };

    const inputDisabled = isFetching && "disabled";

    return(
        <FormGroup>
            <Input type="select" onChange={onChangeHandle} bsSize="sm" value={sortAlbumsKey} disabled={inputDisabled}>
                {sortingItems.map(el => (<option key={el.value} value={el.value}>{el.title}</option>))}
            </Input>
        </FormGroup>
    );
};

const mapStateToProps = (state) => ({
    isFetching: state.app.isFetching,
    sortAlbumsKey: state.app.sortAlbumsKey
});

export default compose(
    withSorting,
    connect(mapStateToProps, {setAlbumsSortingField})
)(SortBar);