import { configureStore } from '@reduxjs/toolkit';
import menuReducer from './reducers/menuStateSlice.js';
import headerBarReducer from './reducers/headerBarStateSlice.js';
import sideBarReducer from './reducers/sideBarStateSlice.js';
import getPersonalData from './reducers/getPersonalDataSlice.js';
import getAccounts from './reducers/getAccountsSlice.js';
// import getRoles from "./reducers/getRolesSlice.js";
// import getPermissions from "./reducers/getPermissionsSlice.js";
// import getPermissionsForRoles from "./reducers/getPermissionsForRoleSlice.js";

import {createPersistMiddleware, loadState} from "../redux/middleware/localstorage.js";


const preloadedSideBarState = loadState('sideBarState') || { state: "2" };
const preloadedHeaderBarState = loadState('headerBarState') || { state : null };
const preloadedMenuState = loadState('menuState') || { state : null };

const store = configureStore({
    reducer: {
        menuState: menuReducer,
        headerBarState: headerBarReducer,
        sideBarState: sideBarReducer,

        personalData : getPersonalData,
        accounts : getAccounts,
        // roles : getRoles,
        // permissions : getPermissions,
        // permissionsForRoles: getPermissionsForRoles
    },
    // preloadedState : {
    //     headerBarState: preloadedHeaderBarState,
    //     sideBarState: preloadedSideBarState,
    // },
    // middleware : (getDefaultMiddleware) => (
    //     getDefaultMiddleware().concat([
    //         createPersistMiddleware('headerBarState', (state) => state.headerBarState),
    //         createPersistMiddleware('sideBarState', (state) => state.sideBarState),
    //     ])
    // )
});

store.subscribe(() => {

});


export default store;
