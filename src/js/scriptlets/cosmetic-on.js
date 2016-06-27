/*******************************************************************************

    uBlock Origin - a browser extension to block requests.
    Copyright (C) 2015-2016 Raymond Hill

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see {http://www.gnu.org/licenses/}.

    Home: https://github.com/gorhill/uBlock
*/

'use strict';

/******************************************************************************/

(function() {
    if ( typeof vAPI !== 'object' || typeof vAPI.domFilterer !== 'object' ) {
        return;
    }

    // Insert all cosmetic filtering-related style tags in the DOM

    var styles = vAPI.domFilterer.styleTags;
    var i = styles.length, style;
    while ( i-- ) {
        style = styles[i];
        if ( style.sheet !== null ) {
            style.sheet.disabled = false;
            style[vAPI.sessionId] = undefined;
        }
    }

    var elems = [];
    try {
        elems = document.querySelectorAll('[' + vAPI.domFilterer.hiddenId + ']');
    } catch (e) {
    }
    i = elems.length;
    while ( i-- ) {
        var elem = elems[i];
        var shadow = elem.shadowRoot;
        if ( shadow === undefined ) {
            style = elems[i].style;
            if ( typeof style === 'object' || typeof style.removeProperty === 'function' ) {
                style.setProperty('display', 'none', 'important');
            }
            continue;
        }
        if (
            shadow !== null &&
            shadow.className === vAPI.domFilterer.shadowId &&
            shadow.firstElementChild !== null
        ) {
            shadow.removeChild(shadow.firstElementChild);
        }
    }

    vAPI.domFilterer.toggleOn();
})();
