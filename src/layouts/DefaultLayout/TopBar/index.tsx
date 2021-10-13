import React, { memo } from 'react';

import { NavLink } from 'react-router-dom';
import { Image, Menu } from 'semantic-ui-react';

import logo from '../../../assets/png/logo.png';

import './style.scss';

const TopBar = (): JSX.Element => {
    return (
        <section className="top-bar-container">
            <Menu className="top-bar-container__menu" stackable>
                <Menu.Item className="top-bar-container__menu__item">
                    <Image className="top-bar-container__menu__item__image" src={logo} />
                </Menu.Item>

                <Menu.Item className="top-bar-container__menu__item" name="tracker" exact to="/" as={NavLink}>
                    Tracker
                </Menu.Item>
                <Menu.Item className="top-bar-container__menu__item" name="list" to="/list" as={NavLink}>
                    List of tracked items
                </Menu.Item>
            </Menu>
        </section>
    );
};

export default memo(TopBar);
