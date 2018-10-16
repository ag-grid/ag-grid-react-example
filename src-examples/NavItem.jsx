import React from 'react'
import * as PropTypes from 'prop-types';
import {Link, Route} from 'react-router-dom'

// for bootstrap li active functionality
export default function NavItem({children, to, exact}) {
    return (
        <Route path={to} exact={exact} children={({match}) => (
            <li className="nav-item">
                <Link className={match ? 'nav-link active' : 'nav-link'} to={to}>{children}</Link>
            </li>
        )}/>
    )
}

NavItem.propTypes = {
    to: PropTypes.string.isRequired,
    exact: PropTypes.bool,
    children: PropTypes.node.isRequired,
};
