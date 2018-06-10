/**
 * Created by shi.pengyan on 2016-10-30.
 */
import 'babel-polyfill';
import { app } from './app'

//global config
//window.UEDITOR_HOME_URL = '//cdn.cd121.com/ueditor/1.4.3.3/';
// or use local ueditor
// be carefull with image upload

const webRoot = window.location.origin + window.location.pathname;
window.WEB_ROOT = webRoot;
window.UEDITOR_HOME_URL = webRoot + 'static/ueditor/1.4.3.3/';


app.$mount('#app');
