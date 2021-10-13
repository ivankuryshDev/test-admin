export type TRoutes = {
    exact?: boolean;
    path?: string;
    guard?: any;
    layout?: any;
    component?: any;
    routes?: TRoutes;
}[];

export interface ITrackedUser {
    key: number,
    text: string,
    value: number
}

export interface ITrackItem {
    id: number,
    trackedUser: ITrackedUser,
    trackedTime: number,
    note: string
}

export interface IInitialStateTrack {
    loading: boolean;
    users: [],
    trackItems: ITrackItem[]
}

export interface anyReturn {
    data: {
        [key: string]: any;
    }
}

export interface IUserItem {
    [key: string]: any;
}