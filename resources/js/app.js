import Vue from "vue";
import Axios from "axios";
import Notifications from "vue-notification";
import moment from "moment";
import VModal from "vue-js-modal";
import VueFuse from "vue-fuse";
import "vue-js-modal/dist/styles.css";

import router from "./router";
import store from "./store";
import App from "./components/App.vue";

moment.locale("en");
Vue.prototype.$http = Axios;
Vue.prototype.moment = moment;
Vue.prototype.modal = VModal;

const token = localStorage.getItem("token");

Vue.use(Notifications);
Vue.use(VModal);
Vue.use(VueFuse);

if (token) {
    Vue.prototype.$http.defaults.headers.common["Authorization"] = token;
}

Vue.config.productionTip = false;

const app = new Vue({
    el: "#app",
    render: h => h(App),
    router,
    store
});
