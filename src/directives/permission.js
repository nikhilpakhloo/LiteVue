import { hasPermission } from "@/utils/hasPermission";

export default {
    inserted: function(el, binding) {
        let { value, modifiers } = binding;
        let keys =
            value && value.trim() !== ""
                ? value.split("|")
                : Object.keys(modifiers);
        if (keys && keys.length) {
            let hasAuth = keys.some(key => hasPermission(key));
            !hasAuth && el.parentNode.removeChild(el);
        }
    }
};
