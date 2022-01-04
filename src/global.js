// Custom component global
import Default from '@/components/CustomComponent/default.vue';
import Button from '@/components/CustomComponent/button.vue';
import Vue from 'vue'


Vue.component('app-default', Default);
Vue.component('child', Button);