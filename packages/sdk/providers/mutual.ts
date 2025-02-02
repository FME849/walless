import { type ConnectOptions } from '@walless/core';
import { RequestType } from '@walless/messaging';

import { sendRequest } from '../utils/messaging';

export const requestConnect = async (options: ConnectOptions) => {
	return await sendRequest({
		from: 'walless@sdk',
		type: RequestType.REQUEST_CONNECT,
		options,
	});
};
