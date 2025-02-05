/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/***/ (() => {

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var url = 'https://in3.dev/inv/';
var items = []; // priskyrimas tik dėl tipo deklaravimo. Deklaravimas tik dėl aiškumo.
var sask = null; // null reiškia, kad dar nepasibaigė užklausa į serverį

fetch(url).then(function (response) {
  return response.json();
}).then(function (data) {
  sask = data;
  renderSeller(sask);
  renderBuyer(sask);
  renderItems(sask);
  init(sask);
  getTotalAmountCount(sask);
  getTotalDiscount(sask);
  getWithoutPvm(sask);
  getPvmValue(sask);
  getFinalSum(sask);
});
var init = function init(sask) {
  document.querySelector('[data-number]').innerText = sask.number;
  document.querySelector('[data-date]').innerText = sask.date;
  document.querySelector('[data-due-date]').innerText = sask.due_date;
  document.querySelector('[data-shipping-price]').innerText = "Transportavimo kaina: ".concat(sask.shippingPrice, " \u20AC");
};
var renderSeller = function renderSeller(sask) {
  var ul = document.querySelector('[data-comp-seller]');
  var companyTemplate = document.querySelector('[data-company-template]');
  var div = companyTemplate.content.cloneNode(true);
  var seller = sask.company.seller;
  var name = div.querySelector('[data-company-name]');
  var address = div.querySelector('[data-company-address]');
  var code = div.querySelector('[data-company-code]');
  var vat = div.querySelector('[data-company-vat]');
  var phone = div.querySelector('[data-company-phone]');
  var email = div.querySelector('[data-company-email]');
  name.innerText = seller.name;
  address.innerText = seller.address;
  code.innerText = seller.code;
  vat.innerText = seller.vat;
  phone.innerText = seller.phone;
  email.innerText = seller.email;
  ul.appendChild(div);
};
var renderBuyer = function renderBuyer(sask) {
  var ul = document.querySelector('[data-comp-buyer]');
  var companyTemplate = document.querySelector('[data-company-template]');
  var div = companyTemplate.content.cloneNode(true);
  var buyer = sask.company.buyer;
  var name = div.querySelector('[data-company-name]');
  var address = div.querySelector('[data-company-address]');
  var code = div.querySelector('[data-company-code]');
  var vat = div.querySelector('[data-company-vat]');
  var phone = div.querySelector('[data-company-phone]');
  var email = div.querySelector('[data-company-email]');
  name.innerText = buyer.name;
  address.innerText = buyer.address;
  code.innerText = buyer.code;
  vat.innerText = buyer.vat;
  phone.innerText = buyer.phone;
  email.innerText = buyer.email;
  ul.appendChild(div);
};
var renderItems = function renderItems(sask) {
  var table = document.querySelector('[data-items]');
  var itemTemplate = document.querySelector('[data-item-template]');
  var items = sask.items;
  var itemsSorted = items.sort(function (a, b) {
    return a.price - b.price;
  });
  itemsSorted.forEach(function (item, index) {
    var td = itemTemplate.content.cloneNode(true);
    var counting = td.querySelector('[data-item-count]');
    var description = td.querySelector('[data-item-description]');
    var quantity = td.querySelector('[data-item-quantity]');
    var price = td.querySelector('[data-item-price]');
    var discount = td.querySelector('[data-item-discount]');
    counting.innerText = index + 1;
    description.innerText = item.description;
    quantity.innerText = item.quantity;
    price.innerText = "".concat(item.price, " \u20AC");
    var discountText = '';
    if (item.discount && _typeof(item.discount) === 'object' && Object.keys(item.discount).length > 0) {
      if (item.discount.type === "fixed") {
        discountText = "- ".concat(item.discount.value, "\u20AC");
      } else if (item.discount.type === "percentage") {
        discountText = "- ".concat(item.discount.value, "%");
      }
      discount.innerText = discountText;
    } else {
      discount.innerText = 'Be nuolaidų';
    }
    var tr = document.createElement('tr');
    tr.appendChild(td);
    table.appendChild(tr);
  });
};
var getTotalAmountCount = function getTotalAmountCount(sask) {
  document.querySelector('[data-total-count]').innerText = sask.items.map(function (item) {
    return item.quantity;
  }).reduce(function (count, quantity) {
    return count + quantity;
  }, 0);
};
var totalDiscount = 0;
var getTotalDiscount = function getTotalDiscount(sask) {
  totalDiscount = sask.items.reduce(function (total, item) {
    var discountAmount = 0;
    if (item.discount && _typeof(item.discount) === 'object' && Object.keys(item.discount).length > 0) {
      if (item.discount.type === 'fixed') {
        discountAmount = item.discount.value;
      } else if (item.discount.type === 'percentage') {
        discountAmount = item.price * item.discount.value / 100;
      }
    }
    return total + discountAmount;
  }, 0);
  document.querySelector('[data-total-discount]').innerText = totalDiscount.toFixed(2);
};
var getWithoutPvm = function getWithoutPvm(sask) {
  var withoutPvmValue = sask.items.map(function (item) {
    return item.price;
  }).reduce(function (count, price) {
    return count + price;
  }, 0);
  document.querySelector('[data-without-pvm]').innerText = withoutPvmValue.toFixed(2);
  return withoutPvmValue;
};
var getPvmValue = function getPvmValue(withoutPvmValue) {
  var pvmValue = withoutPvmValue * 21 / 100;
  document.querySelector('[data-pvm]').innerText = pvmValue.toFixed(2);
  return pvmValue;
};
var getFinalSum = function getFinalSum(sask) {
  var withoutPvmValue = getWithoutPvm(sask);
  var pvmValue = getPvmValue(withoutPvmValue);
  var finalSum = withoutPvmValue - totalDiscount + pvmValue + sask.shippingPrice;
  document.querySelector('[data-with-pvm]').innerText = finalSum.toFixed(2);
};

/***/ }),

/***/ "./src/style.scss":
/*!************************!*\
  !*** ./src/style.scss ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"/app": 0,
/******/ 			"style": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkcart"] = self["webpackChunkcart"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	__webpack_require__.O(undefined, ["style"], () => (__webpack_require__("./src/app.js")))
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["style"], () => (__webpack_require__("./src/style.scss")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;