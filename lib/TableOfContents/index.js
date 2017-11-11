(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("react-router-dom"));
	else if(typeof define === 'function' && define.amd)
		define([, ], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("react"), require("react-router-dom")) : factory(root["React"], root["ReactRouterDOM"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_13__, __WEBPACK_EXTERNAL_MODULE_48__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 148);
/******/ })
/************************************************************************/
/******/ ({

/***/ 102:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Page = /** @class */ (function () {
    function Page(title, description, url, layout, body, output, date, categories, tags, feed) {
        this.title = title;
        this.description = description;
        this.url = url;
        this.layout = layout;
        this.body = body;
        this.output = output;
        this.date = date;
        this.categories = categories;
        this.tags = tags;
        this.feed = feed;
    }
    Page.prototype.getCrumbs = function (website) {
        var _this = this;
        if (this.url == '/') {
            return [[this]];
        }
        if (this.categories.length == 0) {
            return [[website.getPageOfUrl('/'), this]];
        }
        return this.categories.map(function (categoryTitle) {
            return website.getCategoryOfTitle(categoryTitle)
                .getCrumbs(website)
                .map(function (crumb) { return crumb.concat([_this]); });
        }).reduce(function (a, b) { return a.concat(b); }, []);
    };
    Page.prototype.compareTo = function (another) {
        if (this.date === another.date) {
            if (this.title === another.title) {
                return this.url > another.url ? 1 : -1;
            }
            return this.title > another.title ? 1 : -1;
        }
        return this.date.getTime() > another.date.getTime() ? 1 : -1;
    };
    return Page;
}());
exports.Page = Page;
exports.default = Page;


/***/ }),

/***/ 104:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Page_1 = __webpack_require__(102);
var Category = /** @class */ (function (_super) {
    __extends(Category, _super);
    function Category(title, description, url, layout, body, output, date, categories, tags) {
        var _this = _super.call(this, title, description, url, layout, body, output, date, categories, tags, false) || this;
        _this.pages = [];
        return _this;
    }
    return Category;
}(Page_1.Page));
exports.default = Category;


/***/ }),

/***/ 105:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Page_1 = __webpack_require__(102);
var Tag = /** @class */ (function (_super) {
    __extends(Tag, _super);
    function Tag(title, url, layout, body) {
        var _this = _super.call(this, '#' + title, '', url, layout, body, true, new Date(Date.UTC(0, 0)), [], [], false) || this;
        _this.pages = [];
        _this.originalTitle = title;
        return _this;
    }
    return Tag;
}(Page_1.default));
exports.default = Tag;


/***/ }),

/***/ 109:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Page_1 = __webpack_require__(102);
exports.Page = Page_1.default;
var Collection_1 = __webpack_require__(110);
exports.Collection = Collection_1.default;
var Category_1 = __webpack_require__(104);
exports.Category = Category_1.default;
var Tag_1 = __webpack_require__(105);
exports.Tag = Tag_1.default;
var Layout_1 = __webpack_require__(111);
exports.Layout = Layout_1.default;
var Include_1 = __webpack_require__(112);
exports.Include = Include_1.default;
var MenuEntry_1 = __webpack_require__(113);
exports.MenuEntry = MenuEntry_1.default;
var Website_1 = __webpack_require__(114);
exports.Website = Website_1.default;


/***/ }),

/***/ 110:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Collection = /** @class */ (function () {
    function Collection(title, layout, output) {
        this.pages = [];
        this.title = title;
        this.layout = layout;
        this.output = output;
    }
    return Collection;
}());
exports.default = Collection;


/***/ }),

/***/ 111:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Layout = /** @class */ (function () {
    function Layout(name, component) {
        this.name = name;
        this.component = component;
    }
    return Layout;
}());
exports.default = Layout;


/***/ }),

/***/ 112:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Include = /** @class */ (function () {
    function Include(name, component) {
        this.name = name;
        this.component = component;
    }
    return Include;
}());
exports.default = Include;


/***/ }),

/***/ 113:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var MenuEntry = /** @class */ (function () {
    function MenuEntry(title, short, url, icon) {
        this.title = title;
        this.short = short;
        this.url = url;
        this.icon = icon;
    }
    return MenuEntry;
}());
exports.default = MenuEntry;


/***/ }),

/***/ 114:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Category_1 = __webpack_require__(104);
var Tag_1 = __webpack_require__(105);
var Website = /** @class */ (function () {
    function Website() {
        this.layouts = {};
        this.includes = {};
        this.collections = {};
        this.categories = {};
        this.tags = {};
        this.pages = {};
        this.entities = {};
    }
    Website.prototype.addLayout = function (layout) {
        if (this.layouts[layout.name] != undefined) {
            throw new Error("layout of name " + layout.name + " is already added to the config");
        }
        this.layouts[layout.name] = layout;
    };
    Website.prototype.getLayoutOfName = function (name, requiredBy) {
        var layout = this.layouts[name];
        if (layout == undefined) {
            throw new Error("couldn't find layout of name " + name + " required by " + requiredBy);
        }
        return layout;
    };
    Website.prototype.addInclude = function (include) {
        if (this.includes[include.name] != undefined) {
            throw new Error("include of name " + include.name + " is already added to the config");
        }
        this.includes[include.name] = include;
    };
    Website.prototype.getIncludeOfName = function (name, requiredBy) {
        var include = this.includes[name];
        if (include == undefined) {
            throw new Error("couldn't find include of name " + name + (requiredBy ? ' required by ' + requiredBy : ''));
        }
        return include;
    };
    Website.prototype.addCollection = function (collection) {
        if (this.collections[collection.title] != undefined) {
            throw new Error("collection of title " + collection.title + " is already added to the config");
        }
        this.collections[collection.title] = collection;
    };
    Website.prototype.getCollectionOfTitle = function (title, requiredBy) {
        var collection = this.collections[title];
        if (collection == undefined) {
            throw new Error("couldn't find collection of title '" + title + "'" + (requiredBy ? ' required by ' + requiredBy : ''));
        }
        return collection;
    };
    Website.prototype.addPage = function (page) {
        if (page instanceof Category_1.default) {
            throw new Error("page '" + page.title + "' is a category");
        }
        if (page instanceof Tag_1.default) {
            throw new Error("page '" + page.title + "' is a tag");
        }
        this.addEntity(page);
        this.pages[page.url] = page;
    };
    Website.prototype.getPageOfUrl = function (url, requiredBy) {
        var page = this.pages[url];
        if (page == undefined) {
            throw new Error("couldn't find page of url '" + url + "'" + (requiredBy ? ' required by ' + requiredBy : ''));
        }
        return page;
    };
    Website.prototype.addCategory = function (category) {
        this.addEntity(category);
        var title = category.title;
        var previous = this.categories[title];
        if (previous != undefined) {
            throw new Error("detected two categories of the same title ('" + title + "'): " + previous + " and " + category);
        }
        this.categories[title] = category;
    };
    Website.prototype.getCategoryOfTitle = function (title, requiredBy) {
        var category = this.categories[title];
        if (category == undefined) {
            throw new Error("couldn't find category of title '" + title + "'" + (requiredBy ? ' required by ' + requiredBy : ''));
        }
        return category;
    };
    Website.prototype.addTag = function (tag) {
        this.addEntity(tag);
        var title = tag.originalTitle;
        var previous = this.tags[title];
        if (previous != undefined) {
            throw new Error("detected two tags of the same title ('" + title + "'): " + previous + " and " + tag);
        }
        this.tags[title] = tag;
    };
    Website.prototype.getTagOfTitle = function (title, requiredBy) {
        var tag = this.tags[title];
        if (tag == undefined) {
            throw new Error("couldn't find tag of title '" + title + "'" + (requiredBy ? ' required by ' + requiredBy : ''));
        }
        return tag;
    };
    Website.prototype.addEntity = function (page) {
        var url = page.url;
        var previous = this.entities[url];
        if (previous != undefined) {
            throw new Error("detected two pages with the same url (" + url + "): '" + previous.title + "' and '" + page.title + "'");
        }
        this.entities[url] = page;
    };
    Website.prototype.getEntityOfUrl = function (url, requiredBy) {
        var entity = this.entities[url];
        if (entity == undefined) {
            throw new Error("couldn't find entity of url '" + url + "'" + (requiredBy ? ' required by ' + requiredBy : ''));
        }
        return entity;
    };
    Website.prototype.menuContains = function (page) {
        return -1 !== this.menu
            .map(function (entry) { return entry.url; })
            .indexOf(page.url);
    };
    Website.prototype.getMenuEntry = function (page, requiredBy) {
        var found = this.menu.filter(function (entry) { return entry.url === page.url; });
        if (found.length === 0) {
            throw new Error("couldn't find menu entry for url '" + page.url + "'" + (requiredBy ? ' required by ' + requiredBy : ''));
        }
        return found[0];
    };
    return Website;
}());
exports.default = Website;


/***/ }),

/***/ 120:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(13);
var react_router_dom_1 = __webpack_require__(48);
var models_1 = __webpack_require__(109);
;
exports.TableOfContents = function (_a) {
    var website = _a.website,
        _b = _a.respectLimit,
        respectLimit = _b === void 0 ? false : _b;
    var topLevel = Object.keys(website.pages).map(function (key) {
        return website.pages[key];
    }).concat(Object.keys(website.categories).map(function (key) {
        return website.categories[key];
    })).filter(function (page) {
        return page.categories.length == 0;
    }).filter(function (page) {
        return page.url != '/';
    });
    var tags = Object.keys(website.tags).map(function (key) {
        return website.tags[key];
    });
    return React.createElement("ul", null, React.createElement("li", { key: '/' }, React.createElement(react_router_dom_1.Link, { to: '/' }, website.getPageOfUrl('/').title), React.createElement(Branch, { pages: topLevel, shallow: respectLimit, ellipsis: respectLimit })), !respectLimit ? tags.map(function (_a) {
        var title = _a.title,
            url = _a.url,
            pages = _a.pages;
        return React.createElement("li", { key: url }, React.createElement(react_router_dom_1.Link, { to: url }, title), React.createElement(Branch, { pages: pages, shallow: true }));
    }) : null);
};
function Branch(_a) {
    var pages = _a.pages,
        _b = _a.shallow,
        shallow = _b === void 0 ? false : _b,
        _c = _a.ellipsis,
        ellipsis = _c === void 0 ? false : _c;
    return React.createElement("ul", null, pages.filter(function (page) {
        return page instanceof models_1.Category;
    }).filter(function (page) {
        return page.output;
    }).map(function (page) {
        return page;
    }).map(function (_a) {
        var url = _a.url,
            title = _a.title,
            pages = _a.pages;
        return React.createElement("li", { key: url }, React.createElement(react_router_dom_1.Link, { to: url }, title), !shallow ? React.createElement(Branch, { pages: pages }) : null);
    }), pages.filter(function (page) {
        return !(page instanceof models_1.Category);
    }).filter(function (page) {
        return page.output;
    }).map(function (_a) {
        var title = _a.title,
            url = _a.url;
        return React.createElement("li", { key: url }, React.createElement(react_router_dom_1.Link, { to: url }, title));
    }), ellipsis ? React.createElement("li", { key: 'ellipsis' }, "\u2026") : null);
}
exports.Branch = Branch;
exports.default = exports.TableOfContents;

/***/ }),

/***/ 13:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_13__;

/***/ }),

/***/ 148:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(120);


/***/ }),

/***/ 48:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_48__;

/***/ })

/******/ });
});