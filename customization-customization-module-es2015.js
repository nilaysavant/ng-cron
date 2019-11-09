(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["customization-customization-module"],{

/***/ "../../node_modules/raw-loader/dist/cjs.js!./src/app/containers/doc/customization/customization.html":
/*!***************************************************************************************************************************************!*\
  !*** /home/runner/work/ng-cron/ng-cron/node_modules/raw-loader/dist/cjs.js!./src/app/containers/doc/customization/customization.html ***!
  \***************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<h1 class=\"doc-title\">\n\tCustomization\n</h1>\n\n<p>\n\tThis is a bootstrap 4 based component, but any time it can be used without any dependencies and will be absolutely unstyled.\n</p>\n\nThere are two kind of customizations you can do.\n<ul>\n\t<li>Some corrections</li>\n\t<li>Whole redesign</li>\n</ul>\n\n<div class=\"mt-4\">\n\t<h2 class=\"doc-subtitle\">Some corrections</h2>\n\t<p>\n\t\tEvery html element has specific css class and you can use that to make some ui corrections.\n\t\t<br>\n\t\tIt will work only if your styles will be added in global <code>styles.scss</code> file.\n\t</p>\n\n\t<div class=\"card\">\n\t\t<div class=\"card-body\">\n\t\t\t<h3 class=\"card-title h5\">Highlight specific elements</h3>\n\t\t\t<p>\n\t\t\t\tLet's highlight \"Specific second\" section and options \"1\" and \"20\"\n\t\t\t\t<ngx-prism language=\"html\">{{highlightSpecificHtml}}</ngx-prism>\n\t\t\t\t<ngx-prism language=\"css\">{{highlightSpecificScss}}</ngx-prism>\n\t\t\t</p>\n\t\t\t<div class=\"demo\">\n\t\t\t\t<quartz-cron class=\"my-cron\"></quartz-cron>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\n\t<div class=\"card mt-3\">\n\t\t<div class=\"card-body\">\n\t\t\t<h3 class=\"card-title h5\">Change the layout</h3>\n\t\t\t<p>\n\t\t\t\tLet's make a vertical tabs\n\t\t\t\t<ngx-prism language=\"html\">{{highlightSpecificVerticalHtml}}</ngx-prism>\n\t\t\t\t<ngx-prism language=\"css\">{{highlightSpecificVerticalScss}}</ngx-prism>\n\t\t\t</p>\n\t\t\t<div class=\"demo\">\n\t\t\t\t<quartz-cron class=\"my-vertical-cron\"></quartz-cron>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>\n\n<div class=\"mt-5\">\n\t<h2 class=\"doc-subtitle\">Whole redesign</h2>\n\t<p>\n\t\tThe template uses the bootstrap 4 css classes without any custom styling or overridings.\n\t\tTo customize the ui by yourself you need to use the <code>cssClassPrefix</code> input and pass the class prefix.\n\t\tThe prefix will be used in css classes generating, for example you passed <code>cssClassPrefix=\"my-\"</code> as a result\n\t\tthe bootstrap class will be transformed from <code>form-group</code> to <code>my-form-group</code>.\n\t</p>\n\t<ngx-prism language=\"html\">{{wholeRedesignHtml}}</ngx-prism>\n\t<ngx-prism language=\"css\">{{wholeRedesignScss}}</ngx-prism>\n\t<div class=\"demo mt-4\">\n\t\t<quartz-cron cssClassPrefix=\"my-\"></quartz-cron>\n\t</div>\n</div>\n");

/***/ }),

/***/ "./src/app/containers/doc/customization/customization-routing.module.ts":
/*!******************************************************************************!*\
  !*** ./src/app/containers/doc/customization/customization-routing.module.ts ***!
  \******************************************************************************/
/*! exports provided: DocCustomizationRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DocCustomizationRoutingModule", function() { return DocCustomizationRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "../../node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _customization_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./customization.component */ "./src/app/containers/doc/customization/customization.component.ts");




const routes = [
    {
        path: '',
        component: _customization_component__WEBPACK_IMPORTED_MODULE_3__["DocCustomizationComponent"]
    }
];
let DocCustomizationRoutingModule = class DocCustomizationRoutingModule {
};
DocCustomizationRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)
        ],
        exports: [
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]
        ]
    })
], DocCustomizationRoutingModule);



/***/ }),

/***/ "./src/app/containers/doc/customization/customization.component.ts":
/*!*************************************************************************!*\
  !*** ./src/app/containers/doc/customization/customization.component.ts ***!
  \*************************************************************************/
/*! exports provided: DocCustomizationComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DocCustomizationComponent", function() { return DocCustomizationComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");


let DocCustomizationComponent = class DocCustomizationComponent {
    constructor() {
        this.highlightSpecificHtml = `<quartz-cron class="my-cron"></quartz-cron>`;
        this.highlightSpecificScss = `.my-cron [tab-name="SECONDS"] {
	.c-and {
		border: 1px solid #ccc;
		padding: 1rem;
		border-radius: 5px;

		&-item[item-value="1"],
		&-item[item-value="20"] {
			.c-and-item-check {
				background-color: red;
				border-radius: 5px;
				color: #fff;
				padding-left: 1.5rem;
			}
		}
	}
}`;
        this.highlightSpecificVerticalHtml = `<quartz-cron class="my-vertical-cron"></quartz-cron>`;
        this.highlightSpecificVerticalScss = `.my-vertical-cron .c-host {
	display: flex;
	flex-direction: row;

	.c-tabs {
		flex-direction: column;
		border: 0;
		border-right: 1px solid #ccc;

		.c-tab {
			text-align: left;
			border: 0;
			border-radius: 0;
		}
	}

	.c-tab-content {
		padding-top: .5rem;
		padding-left: 1rem;
	}
}`;
        this.wholeRedesignHtml = `<quartz-cron cssClassPrefix="my-"></quartz-cron>`;
        this.wholeRedesignScss = `$prefix: '.my';

#{$prefix}-row {
	overflow: hidden;

	#{$prefix}-col-1 {
		width: calc(100% / 12);
		float: left;
	}

	#{$prefix}-col-2 {
		width: calc(100% / 6);
		float: left;
	}
}

#{$prefix}-form-inline {
	display: flex;
	flex-direction: row;
}

#{$prefix}-form-control {
	margin: 0 .2rem;
}

#{$prefix}-form-check-label {
	padding-left: .4rem;
}`;
    }
};
DocCustomizationComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./customization.html */ "../../node_modules/raw-loader/dist/cjs.js!./src/app/containers/doc/customization/customization.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./customization.scss */ "./src/app/containers/doc/customization/customization.scss")).default]
    })
], DocCustomizationComponent);



/***/ }),

/***/ "./src/app/containers/doc/customization/customization.module.ts":
/*!**********************************************************************!*\
  !*** ./src/app/containers/doc/customization/customization.module.ts ***!
  \**********************************************************************/
/*! exports provided: DocCustomizationModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DocCustomizationModule", function() { return DocCustomizationModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "../../node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "../../node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _ngx_prism_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ngx-prism/core */ "../../node_modules/@ngx-prism/core/dist/index.js");
/* harmony import */ var _sbzen_cron__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @sbzen/cron */ "../../libs/cron/src/index.ts");
/* harmony import */ var _customization_routing_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./customization-routing.module */ "./src/app/containers/doc/customization/customization-routing.module.ts");
/* harmony import */ var _customization_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./customization.component */ "./src/app/containers/doc/customization/customization.component.ts");








let DocCustomizationModule = class DocCustomizationModule {
};
DocCustomizationModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ngx_prism_core__WEBPACK_IMPORTED_MODULE_4__["PrismModule"],
            _sbzen_cron__WEBPACK_IMPORTED_MODULE_5__["QuartzCronModule"],
            _customization_routing_module__WEBPACK_IMPORTED_MODULE_6__["DocCustomizationRoutingModule"]
        ],
        declarations: [
            _customization_component__WEBPACK_IMPORTED_MODULE_7__["DocCustomizationComponent"]
        ],
        exports: [
            _customization_component__WEBPACK_IMPORTED_MODULE_7__["DocCustomizationComponent"]
        ]
    })
], DocCustomizationModule);



/***/ }),

/***/ "./src/app/containers/doc/customization/customization.scss":
/*!*****************************************************************!*\
  !*** ./src/app/containers/doc/customization/customization.scss ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".demo {\n  max-width: 900px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3J1bm5lci93b3JrL25nLWNyb24vbmctY3Jvbi9hcHBzL2RvYy9zcmMvYXBwL2NvbnRhaW5lcnMvZG9jL2N1c3RvbWl6YXRpb24vY3VzdG9taXphdGlvbi5zY3NzIiwiYXBwcy9kb2Mvc3JjL2FwcC9jb250YWluZXJzL2RvYy9jdXN0b21pemF0aW9uL2N1c3RvbWl6YXRpb24uc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNDLGdCQUFBO0FDQ0QiLCJmaWxlIjoiYXBwcy9kb2Mvc3JjL2FwcC9jb250YWluZXJzL2RvYy9jdXN0b21pemF0aW9uL2N1c3RvbWl6YXRpb24uc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5kZW1vIHtcblx0bWF4LXdpZHRoOiA5MDBweDtcbn0iLCIuZGVtbyB7XG4gIG1heC13aWR0aDogOTAwcHg7XG59Il19 */");

/***/ })

}]);
//# sourceMappingURL=customization-customization-module-es2015.js.map