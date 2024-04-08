const common = {
    state: {
        popupList: [],
        orientation: 1,
        filterVer: 0,
    },
    mutations: {
        orientation: (state, orientation) => {
            state.orientation = orientation
        },
        filterVer: (state, filterVer) => {
            state.filterVer = filterVer
        },
        addPopup: (state, popup) => {
            if (state.popupList && state.popupList.indexOf(popup) < 0) {
                state.popupList.push(popup);
            }
        },
        removePopup: (state, popup) => {
            if (state.popupList.indexOf(popup) > -1) {
                state.popupList.splice(state.popupList.indexOf(popup), 1);
            }
        }
    },
    actions: {
        addPopup({ commit }, popup) {
            commit('addPopup', popup);
        },
        removePopup({ commit }, popup) {
            commit('removePopup', popup);
        }
    }
}

export default common;
