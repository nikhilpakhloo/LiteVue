import Vue from "vue";
const EventBus = new Vue();

export default {
    on(id, func) {
        EventBus.$on(id, func);
    },
    off(id, func = null) {
        EventBus.$off(id, func);
    },
    emit(id, ...data) {
        EventBus.$emit(id, ...data);
    }
};