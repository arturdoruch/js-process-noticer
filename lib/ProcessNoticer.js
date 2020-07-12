/*
 * (c) Artur Doruch <arturdoruch@interia.pl>
 */

import objectUtils from '@arturdoruch/util/lib/object-utils';
import screenUtils from '@arturdoruch/util/lib/screen-utils';
import HtmlElement from '@arturdoruch/html/lib/element/HtmlElement';
import elementFactory from "@arturdoruch/html/lib/element/html-element-factory";

let defaultOptions = {
    // Global options
    elementsIdPrefix: 'ad-process-notice',
    listTag: 'ul',
    itemTag: 'li',
    centerList: false,
    // Per instance options.
    listClass: null,
    listItemClass: null,
    loaderClass: null,
};

let listElement;
let loaderElement;

/**
 * Sets noticer HTML elements global options, used by every instance of the ProcessNoticer.
 *
 * @param {{}}      options The noticer HTML elements options.
 * @param {string}  [options.elementsIdPrefix = 'ad-process-notice'] Prefix of "id" attribute of the list and loader elements.
 * @param {string}  [options.listTag = 'ul'] Tag name for list element.
 * @param {string}  [options.itemTag = 'li'] Tag name for list item element.
 * @param {boolean} [options.centerList = false] Whether to center displayed process notice list.
 */
export function setOptions(options) {
    defaultOptions = Object.assign(defaultOptions,
        objectUtils.filter(options, ['elementsIdPrefix', 'listTag', 'itemTag', 'centerList'])
    );
}

export default class ProcessNoticer {
    /**
     * @param {{}}      [options] Noticer HTML elements options used by current class instance.
     * @param {boolean} [options.centerList = false] Whether to center displayed process notice list.
     * @param {string}  [options.listClass = null] The class name of the noticer list element.
     * @param {string}  [options.listItemClass = null] The class name of the noticer a list item element.
     * @param {string}  [options.loaderClass = null] The class name of the noticer loader element.
     */
    constructor(options = {}) {
        this._notices = [];
        this._opts = Object.assign({}, defaultOptions,
            objectUtils.filter(options, ['centerList', 'listClass', 'listItemClass', 'loaderClass'])
        );

        if (!listElement) {
            listElement = new HtmlElement(this._opts.listTag, {
                id: this._opts.elementsIdPrefix + '__list',
                class: this._opts.listClass
            });
            listElement.appendTo().hide();
        }

        if (!loaderElement) {
            loaderElement = new HtmlElement('div', {
                id: this._opts.elementsIdPrefix + '__loader',
                class: this._opts.loaderClass
            });
            loaderElement.appendTo().hide();
        }
    }

    /**
     * Adds process notice.
     *
     * @param {string|null} message The process notice message.
     * @param {boolean} [displayLoader = false] Whether to display image loader.
     *
     * @return {Notice}
     */
    add(message, displayLoader) {
        if (!message && !displayLoader) {
            throw new TypeError('Missing "message" and "displayLoader" arguments of the function "ProcessNoticer.add".');
        }

        const notice = new Notice(message, displayLoader);
        this._notices.push(notice);

        return notice;
    }

    /**
     * Removes the notice.
     *
     * @param {Notice} notice
     */
    remove(notice) {
        if (!(notice instanceof Notice)) {
            throw new TypeError('Missing "notice" argument.');
        }
        // Remove item form array
        this._notices = this._notices.filter(function (_notice) {
            return _notice.id !== notice.id;
        });

        this.display();
    }

    /**
     * Displays added notices.
     */
    display() {
        const hasNotices = this._notices.length > 0;
        let displayLoader = false;

        listElement.empty();

        if (hasNotices) {
            for (let notice of this._notices) {
                listElement.el.appendChild(this._createItem(notice));

                if (notice.displayLoader === true) {
                    displayLoader = true;
                }
            }

            if (this._opts.centerList) {
                screenUtils.setElementPosition(listElement.el);
            }
        }

        toggleElement(listElement, hasNotices);
        toggleElement(loaderElement, displayLoader);
    }

    /**
     * Creates notice item.
     *
     * @param notice
     *
     * @return {Element}
     * @private
     */
    _createItem(notice) {
        const item = elementFactory.create(this._opts.itemTag, '', this._opts.listItemClass);
        item.appendChild(elementFactory.create('span', notice.message));

        return item;
    }
}

/**
 * @param {string} message
 * @param {boolean} displayLoader
 */
function Notice(message, displayLoader) {
    this.id = Math.floor(Math.random() * 999999999);
    this.message = message;
    this.displayLoader = displayLoader;
}

/**
 * @param {HtmlElement} element
 * @param {boolean} state
 */
function toggleElement(element, state) {
    state ? element.show() : element.hide();
}
