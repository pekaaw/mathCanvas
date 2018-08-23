import RemoveChildren from '../Utilities/RemoveChildren';
import StringToFragment from '../Utilities/StringToFragment';

// import MathQuill from 'node-mathquill/build/mathquill';
const MathQuill = require('exports-loader?MathQuill!node-mathquill/build/mathquill.js');
const MQ = MathQuill.getInterface(2);
import MathQuillCSS from 'node-mathquill/build/mathquill.css';

import template from './template.hbs';
import template_css from './template.css';

let singleton = null;

export default class MathCanvas {
    constructor(container, options) {
        if (singleton === null) {
            singleton = this;
        }
        
        if (!(container instanceof HTMLElement)) {
            throw new Error("MathCanvas needs an HTMLElement as first parameter. This element will contain the Editor.");
        }

        this.$container = container;
        this._options = options || { template: { name: null } };

        this._init();
        return singleton;
    }

    _init() {
        this._setupHandlers()
            ._render();
    }

    _setupHandlers() {
        this._inputUpdatedHandler = this._inputUpdated.bind(this);
        this._saveHandler = this.save.bind(this);
        
        return this;
    }

    _render() {
        RemoveChildren(this.$container);
        this.$container.appendChild(StringToFragment(template(this._options)));

        this.$inputField = this.$container.querySelector('span#math-canvas-formula-input');
        this.$saveInput = this.$container.querySelector('button[data-action="save"]');
        this.$notebook = this.$container.querySelector('section.js-notebook');

        console.log(this.$inputField);
        this._mqInput = MQ.MathField(this.$inputField, {
                spacesBehavesLikeTab: true,
                handlers: {
                    edit: singleton._inputUpdatedHandler
                }
            }
        );
        this._mqNotes = [];
        this.$saveInput.addEventListener('click', this._saveHandler);
        // this._mqInput.typedText("x=2");
        // this._mqInput.latex("cc=12^3");
    }

    _inputUpdated(mathField) {

        // this.$notebook.textContent = mathField.latex();
        // console.log(mathField.latex());
        let content = mathField.latex();
        // this.$notebook.appendChild(node);
        
    }

    save() {
        let noteElement = document.createElement('div');
        this.$notebook.appendChild(noteElement);

        let noteSpan = document.createElement('span'),
            mqNote = MQ.MathField(noteSpan);
        noteSpan.classList.add('math-canvas-formula');
        noteSpan.classList.add('mb-2');
        noteElement.appendChild(noteSpan);
        this._mqNotes.push({
            note: mqNote,
            noteSpan: noteSpan,
            noteElement: noteElement
        });
        mqNote.latex(this._mqInput.latex());

    }
}
