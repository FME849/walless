import WebSQLite from 'react-native-quick-websql';
import { configure, create } from '@walless/store';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import SQLiteAdapterFactory from 'pouchdb-adapter-react-native-sqlite';

import 'react-native-get-random-values';

const SQLiteAdapter = SQLiteAdapterFactory(WebSQLite);

export const db = create('engine', SQLiteAdapter);

export const initializeStorage = async () => {
	await configure(db);
};

export default db;
