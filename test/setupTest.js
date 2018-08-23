window.$ = window.jQuery = require("jquery");
window.Popper = require('popper.js/dist/popper.min.js');
import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap/dist/css/bootstrap.css';
import template from './testframe.hbs';
import templateCSS from './testframe.css';
import packageInfo from '../package.json';
import assignIn from 'lodash/assignIn';

assignIn(packageInfo, { year: new Date().getFullYear() });

document.addEventListener("DOMContentLoaded", function() {
    var div = document.createElement('div');
    div.innerHTML = template(packageInfo);
    while (div.lastChild) {
        document.body.insertBefore(div.lastChild, document.body.firstChild);
    }
});
