// A mock function to mimic making an async request for data

import { anyReturn } from "../../types/generic";

const fetchMimicAPI = (status = 1, { ...args }): Promise<anyReturn> => {
    if (status === 1) {
        return new Promise<anyReturn>((resolve) =>
            setTimeout(() => resolve({ data: {...args} }), 200)
        );
    }
    return new Promise<anyReturn>((reject) =>
        setTimeout(() => reject({ data: {status} }), 200)
    );
}
export default fetchMimicAPI