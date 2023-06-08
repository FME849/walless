import { type ConnectOptions, Networks } from '@walless/core';
import { modules } from '@walless/ioc';
import { type MessengerCallback, Message } from '@walless/messaging';
import {
	type PublicKeyDocument,
	type TrustedDomainDocument,
	selectors,
} from '@walless/store';

import { handleClosePopup, handleOpenPopup, requestSourceMap } from './shared';

export const handleConnect: MessengerCallback = async (payload, channel) => {
	const { onlyIfTrusted, domain } = (payload.options as ConnectOptions) || {};

	const domainResponse = await modules.storage.find(selectors.trustedDomains);
	const trustedDomains = domainResponse.docs as TrustedDomainDocument[];

	if (onlyIfTrusted) {
		let isTrusted = true;
		const savedDomain = trustedDomains.find(({ _id }) => _id == domain);
		if (savedDomain) {
			if (!savedDomain.trusted) isTrusted = false;
		} else {
			isTrusted = await triggerRequireTrustedDomain(domain as string);
		}

		if (!isTrusted) {
			return console.log(
				`handle connect: Domain name ${domain} is not trusted`,
			);
		}
	}

	requestSourceMap[payload.requestId] = channel;
	await handleOpenPopup(payload.requestId);
};

export const handleResolveConnect: MessengerCallback = async (payload) => {
	const { requestId } = payload;
	const sourceChannel = requestSourceMap[requestId];
	if (sourceChannel) {
		if (!payload.isApproved) {
			sourceChannel.postMessage({
				from: 'walless@kernel',
				requestId,
				message: Message.REJECT_REQUEST_CONNECT,
			});
		} else {
			const keyResponse = await modules.storage.find(selectors.allKeys);
			const publicKeys = keyResponse.docs as PublicKeyDocument[];
			const solanaPublicKeys = publicKeys.find(
				(key) => key.network === Networks.solana,
			);

			sourceChannel.postMessage({
				from: 'walless@kernel',
				requestId,
				publicKeys: [solanaPublicKeys],
			});
		}
		delete requestSourceMap[requestId];
		handleClosePopup(requestId);
	}
};

const triggerRequireTrustedDomain = async (domainName: string) => {
	// Temporary trigger method for simulate user action to trust any site
	const newTrustedDomain = await modules.storage.upsert(
		domainName,
		async () => {
			return {
				type: 'TrustedDomain',
				trusted: true,
				timestamp: new Date().toISOString(),
				connectCount: 0,
			};
		},
	);
	console.log('New trust domain: ', newTrustedDomain);
	return true;
};
