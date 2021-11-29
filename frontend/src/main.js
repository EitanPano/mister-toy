import Vue from 'vue';
import App from './app.vue';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import * as VueGoogleMaps from 'vue2-google-maps';

// Styles
import "./styles/styles.scss";

Vue.config.productionTip = false;
Vue.use(ElementUI);

Vue.use(VueGoogleMaps, {
    load: {
      key: 'AIzaSyC5N-qgV7qudjSjce4a8PEox5GnnCW1Sd8',
      libraries: 'places',

    },
})

new Vue({
    created() {
        this.$store.dispatch({ type: 'loadToys' });
    },
    router,
    store,
    render: h => h(App),
}).$mount('#app');
