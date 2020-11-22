import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink} from "reactstrap";
import {connect} from "react-redux";
import {initializeApplication} from "./redux/reducers/appReducer";
import {Link} from "react-router-dom";

const App = ({ initializeApplication, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        initializeApplication();
    }, []);

    const toggleNavBar = () => {
        setIsOpen(!isOpen);
    };

    return(
        <>
            <Navbar color="dark" dark fixed="top" expand="sm">
                <Link to="/" style={{textDecoration: "none"}} className="py-0">AlbumStore</Link>
                <NavbarToggler onClick={toggleNavBar}/>
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <Link to="/albums/fav" className="py-0">Favorites</Link>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
            {children}
        </>
    );
};

App.propTypes = {
    children: PropTypes.element
};

export default connect(null, {initializeApplication})(App);