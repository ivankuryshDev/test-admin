import React from 'react';
import { Table } from 'semantic-ui-react'
import {Link, useHistory} from 'react-router-dom';

import { RootState } from "../../store/store";
import { useAppSelector } from "../../hooks/hooks";
import { ITrackItem } from "../../types/generic";


import './style.scss';

const ListOfTrackedItemsView = (): JSX.Element => {
    const trackedItems = useAppSelector((state: RootState) => state.track.trackItems);
    const history = useHistory();

    const goTo = (id: number) => {
        history.push('/list/'+id);
    }
    return <div className="list-of-tracked-items-page">
        <h1>List</h1>
        <Table celled>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Tracked time, minutes</Table.HeaderCell>
                    <Table.HeaderCell>Note</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {
                    trackedItems && trackedItems.length ? trackedItems.map((item: ITrackItem, index: number) => {
                        return <Table.Row onClick={() => goTo(item.id)} key={item.id}>
                            <Table.Cell>
                                {item.trackedUser.text}
                            </Table.Cell>
                            <Table.Cell>
                                {item.trackedTime}
                            </Table.Cell>
                            <Table.Cell>
                                {item.note}
                            </Table.Cell>
                        </Table.Row>
                    })
                        :
                        <></>
                }
            </Table.Body>
        </Table>
        {
            trackedItems && !trackedItems.length &&
                <h3 style={{}}>None</h3>
        }
    </div>
};

export default ListOfTrackedItemsView;
