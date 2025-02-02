import { RequestType } from '@walless/messaging';

import { sendRequest } from '../utils/messaging';

export const requestSignAndSendTransaction = async (
	transaction: string,
	options: unknown,
) => {
	return await sendRequest({
		from: 'walless@sdk',
		type: RequestType.SIGN_SEND_TRANSACTION_ON_SOLANA,
		transaction,
		options,
	});
};

export const requestSignMessage = async (message: string) => {
	return await sendRequest({
		from: 'walless@sdk',
		type: RequestType.SIGN_MESSAGE_ON_SOLANA,
		message,
	});
};

export const requestSignTransaction = async (transaction: string) => {
	return await sendRequest({
		from: 'walless@sdk',
		type: RequestType.SIGN_TRANSACTION_ON_SOLANA,
		transaction,
	});
};
