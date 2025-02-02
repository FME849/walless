import { type Networks } from '@walless/core';
import { decryptWithPasscode } from '@walless/crypto';
import { modules } from '@walless/ioc';
import { type PrivateKeyRecord } from '@walless/storage';
import {
	type PrivateKeyDocument,
	type PublicKeyDocument,
	selectors,
} from '@walless/store';

export const settings = {
	requirePasscode: true,
};

export const triggerActionToGetPrivateKey = async () => {
	try {
		const response = await modules.storage.find(selectors.solanaKeys);
		const [publicKey] = response.docs as PublicKeyDocument[];
		const encryptedKey = await modules.storage.safeGet<PrivateKeyDocument>(
			publicKey._id,
		);

		return await decryptWithPasscode(
			'123456',
			encryptedKey as PrivateKeyRecord,
		);
	} catch (error) {
		console.log('Get private key error');
		console.log((error as Error).message);
		return null;
	}
};

export const getPrivateKey = async (network: Networks, passcode: string) => {
	const result = await modules.storage.find({
		selector: {
			type: 'PublicKey',
			network: network,
		},
	});
	const [publicKey] = result.docs as PublicKeyDocument[];
	const encryptedKey = await modules.storage.safeGet<PrivateKeyDocument>(
		publicKey.privateKeyId,
	);

	return await decryptWithPasscode(passcode, encryptedKey as never);
};
