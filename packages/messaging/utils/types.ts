import {
	type ChannelHashmap,
	type MiniBroadcast,
	type UnknownObject,
} from '@walless/core';

export enum Channels {
	'kernel' = 'kernel',
	'background' = 'background',
	'ui' = 'ui',
	'popup' = 'popup',
	'content' = 'content',
}

export interface EncryptedMessage {
	ciphered: string;
	iv: string;
}

interface IdentifiedPayload {
	id?: string;
}

export type MessagePayload = UnknownObject &
	IdentifiedPayload & {
		from?: string;
		type: RequestType;
		messsage?: string;
		transaction?: string;
		options?: unknown;
		passcode?: string;
	};

export type ResponsePayload = UnknownObject &
	IdentifiedPayload & {
		from?: string;
		requestId?: string;
		responseCode?: ResponseCode;
		message?: string;
	};

export interface RequestMetadata {
	id: string;
	timestamp: Date;
	timeout: number;
	resolve: (payload: unknown) => void;
	reject: (error: Error) => void;
}

export type GetKeyVault = (id: string) => Promise<CryptoKey>;
export type CreateAndHydrateKeyVault = (id: string) => Promise<CryptoKey>;

export interface EncryptionKeyVault {
	get: GetKeyVault;
	createAndHydrate: CreateAndHydrateKeyVault;
}

export type MessengerSend = (
	channelId: string,
	payload: MessagePayload,
) => Promise<void>;

export type MessengerRequest = (
	channelId: string,
	payload: MessagePayload,
	timeout?: number,
) => Promise<UnknownObject>;

export type MessengerCallback = (
	payload: MessagePayload,
	sender: MiniBroadcast,
) => void;

export type MessengerMessageListener = (
	channelId: string,
	handler: MessengerCallback,
) => void;

export interface Messenger {
	channels: ChannelHashmap;
	onMessage: MessengerMessageListener;
	send: MessengerSend;
	request: MessengerRequest;
}

export enum ResponseCode {
	SUCCESS,
	REQUIRE_PASSCODE,
	WRONG_PASSCODE,
	ERROR,
}

export enum RequestType {
	REQUEST_CONNECT,
	GET_ENDPOINT_ON_SOLANA,
	SIGN_SEND_TRANSACTION_ON_SOLANA,
	SIGN_TRANSACTION_ON_SOLANA,
	SIGN_MESSAGE_ON_SOLANA,
	SIGH_EXECUTE_TRANSACTION_ON_SUI,
	SIGN_TRANSACTION_ON_SUI,
	SIGN_MESSAGE_ON_SUI,
}
