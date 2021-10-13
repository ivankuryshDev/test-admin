import React from 'react';
import { Link } from 'react-router-dom';

import './style.scss';

const PageNotFound = (): JSX.Element => {
    return (
        <div className="page-not-found">
            <h1 className="page-not-found__text-404">404</h1>
            <Link className="page-not-found__home" to="/">
                Home
            </Link>
        </div>
    );
};

export default PageNotFound;
