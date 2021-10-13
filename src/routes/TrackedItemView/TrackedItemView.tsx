import React from 'react';
import { useParams } from 'react-router-dom';

import { useAppSelector } from '../../hooks/hooks';
import {RootState} from "../../store/store";

import './style.scss';

const TrackedItemView = (): JSX.Element => {
    let { id }: any = useParams();
    const detailedItem = useAppSelector((state: RootState) => state.track.trackItems.find((item) => item.id === +id));
    return (
        <div className="tracked-item-page">
            <h1>Detail info</h1>
            <p>User: {detailedItem?.trackedUser.text}</p>
            <p className="label">Amount of time the user spent on a project, minutes:</p>
            <p>{`${detailedItem?.trackedTime} ${detailedItem?.trackedTime! > 1 ? 'minutes' : 'minute'}`}</p>
            <p className="label">A note about the project the user worked on:</p>
            <p>{detailedItem?.note}</p>
        </div>
    )
};

export default TrackedItemView;
