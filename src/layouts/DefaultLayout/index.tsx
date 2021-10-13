import './style.scss';

import React, { FC } from 'react';
import { Container } from 'semantic-ui-react';

import BottomBar from './BottomBar';
import TopBar from './TopBar';

const DefaultLayout: FC = ({ children }) => {
    return (
        <>
            <div className="default-layout-background" />
            <Container className="default-layout-container">
                <TopBar />
                <div className="content">
                    {children}
                </div>
                <BottomBar />
            </Container>
        </>
    );
};

export default DefaultLayout;
