export const loadState = (stateKey) => {
	try {
		const serializedState = localStorage.getItem(stateKey);
		if (serializedState === null) return undefined;
		return JSON.parse(serializedState);
	} catch (err) {
		return undefined;
	}
};

const saveState = (stateKey, stateValue, menuState) => {
	try {

		const serializedState = JSON.stringify(stateValue);
		return localStorage.setItem(stateKey, serializedState);
	} catch {
		// ignore write errors
	}
};

export const createPersistMiddleware = (stateKey, selector) => (storeAPI) => (next) => (action) => {
	const result = next(action);

	try {
		const stateToSave = selector(storeAPI.getState());
		saveState(stateKey, stateToSave);
		if (stateKey === 'headerBarState' && stateToSave.state === 'logout') {
			console.log(selector);
			stateToSave.state = null;
            localStorage.clear();
        }
	} catch (error) {
		console.warn('Failed to save state:', error);
	}

	return result;
};


