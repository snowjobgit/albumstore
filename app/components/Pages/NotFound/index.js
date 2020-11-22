import React from 'react';
import {Link, useLocation} from 'react-router-dom';

const NotFound = () => {
    let location = useLocation();

    return (
        <div>
            <h3>
                No match for <code>{location.pathname}</code>
            </h3>
            <p>But hey, try to find something else <Link to="/">here</Link></p>
        </div>
    );

};

export default NotFound;