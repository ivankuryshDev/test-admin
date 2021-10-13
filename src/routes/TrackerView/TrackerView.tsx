import React, {ChangeEvent, memo, useCallback, useEffect, useState} from 'react';
import { AnyAction } from "@reduxjs/toolkit";
import { Dropdown, Button, Form } from 'semantic-ui-react';

import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import { getUsers, submit } from '../../store/slices/trackSlice';
import {ITrackedUser, IUserItem} from "../../types/generic";

import './style.scss';
import {RootState} from "../../store/store";

const styles = {
    form: {
        width: '300px',
        margin: '30px auto 0 auto',
        minWidth: '300px'
    },
    field: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start'
    }
}

const Tracker = (): JSX.Element => {
    const dispatch = useAppDispatch();
    const [users, setUsers] = useState<[]>([]);
    const [selected, setSelected] = useState<ITrackedUser | null>(null);
    const [trackedTime, setTrackedTime] = useState<number>(0);
    const [note, setNote] = useState('');
    const [loading, setLoading] = useState<boolean>(false);
    const trackedItems = useAppSelector((state: RootState) => state.track.trackItems);


    useEffect(() => {
        void async function fetchMyAPI() {
            const result: AnyAction = await dispatch( getUsers() );
            if (getUsers.fulfilled.match(result as any)) {
                const transformedUsers = result.payload.data.reduce((compose: ITrackedUser[], item: IUserItem) => {
                    compose.push({
                            key: item.id,
                            text: item.name,
                            value: item.id,
                    });
                    return compose
                }, []);
                setUsers(transformedUsers);
            } else {
                console.log('error', result);
            }
        }()
    }, [dispatch])

    const onChange = useCallback((e: any, data: any) => {
        const foundUser = users.find((item: any) => item.key === data.value);
        setSelected(foundUser!);
        setTrackedTime(0);
        setNote('');
    }, [users])

    const handleInputChange = useCallback((e: any) => {
        if(e.target.name === 'trackedTime'){
            if(e.target.value.toString().length <= 10) {
                setTrackedTime(+e?.target?.value)
            }
        } else {
            setNote(e?.target?.value)
        }
    }, [])

    const onSubmit = useCallback(async () => {
        setLoading(true);
        const items = trackedItems;
        const newId = items.length ? items[items.length-1].id+1 : 1;

        // Simulation of real request
        const result: AnyAction = await dispatch(
            submit({
                id: newId,
                trackedUser: selected!,
                trackedTime: trackedTime,
                note: note
            })
        );

        if (submit.fulfilled.match(result)) {
            setSelected(null);
            setTrackedTime(0);
            setNote('');
        } else {
            console.log('error', result);
        }
        setLoading(false);


    }, [dispatch, note, selected, trackedItems, trackedTime]);

    return (
        <div className="tracker-page">
            <h1>Tracker</h1>
            <Dropdown
                placeholder='Select user'
                search
                selection
                options={users}
                onChange={onChange}
                value={selected?.value || 0}
            />
            {
                selected ? <>
                    <Form onSubmit={onSubmit} style={styles.form}>
                        <Form.Field style={styles.field}>
                            <label>Amount of time the user spent on a project, minutes</label>
                            <input
                                required
                                type='number'
                                value={trackedTime || ''}
                                name='trackedTime'
                                onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
                                placeholder='minutes'
                            />
                        </Form.Field>
                        <Form.Field style={styles.field}>
                            <label>A note about the project the user worked on</label>
                            <textarea
                                required
                                value={note}
                                name='note'
                                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => handleInputChange(e)}
                                placeholder='text'
                                maxLength={256}
                            />
                        </Form.Field>
                        <Button
                            type='submit'
                            color='green'
                            loading={loading}
                            disabled={loading}
                        >
                            Save
                        </Button>
                    </Form>
                </>
                    :
                    <></>
            }
        </div>
    )
};

export default memo(Tracker);
