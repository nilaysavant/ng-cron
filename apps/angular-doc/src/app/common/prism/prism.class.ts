import { ChangeDetectorRef, ElementRef, Input, Injectable, ViewChild } from '@angular/core';
import * as _ from 'lodash-es';

import { PrismInterface } from './prism.interface';
import { CallbackType } from './prism.type';
import { PrismService } from './prism.service';


@Injectable()
export abstract class PrismHoodClass implements PrismInterface {
	@ViewChild('el', { read: ElementRef }) el: ElementRef;

	ready = false;
	__properties: any;

	_cd: any;
	@Input()
	set cd(cd: any) {
		this._cd = cd;
		if (this.ready === true) {
			this.__properties = cd;
		}
	}
	get cd() {
		return this._cd;
	}

	public _async = false;
	@Input()
	set async(async: boolean) {
		this._async = async;
	}
	get async(): boolean {
		return this._async;
	}

	public _callback: CallbackType | undefined;
	@Input()
	set callback(callback: CallbackType | undefined) {
		this._callback = callback;
	}
	get callback(): CallbackType | undefined {
		return this._callback;
	}

	public _code: string;
	@Input()
	set code(code: string) {
		this._code = code;
		if (this.ready) {
			if (this.__properties.code === true) {
				this.highlightElement({ code, language: this.language });
			}
		}
	}
	get code() {
		return this._code;
	}

	public _hooks: Object;
	@Input()
	set hooks(hooks: Object) {
		this._hooks = hooks;
		if (hooks instanceof Object) {
			_.forEach(hooks, (element: any, key: string) => {
				this.prismService.hooks().add(key, element);
			});
		}
		this.highlightElement({ code: this.code, language: this.language });
	}
	get hooks() {
		return this._hooks;
	}

	public _language: string;
	@Input() set language(language: string) {
		if (language) {
			if (typeof (language) === 'string') {
				this._language = language;
				this.highlightElement({ code: this.code, language });
			} else {
				throw new Error(`Property \`language\` should be \`string\` instead of provided \`${typeof (language)}\``);
			}
		} else {
			throw new Error('Missing property `language`.');
		}
	}
	get language() {
		return this._language;
	}

	@Input() public interpolation?: Object | undefined;

	constructor(
		public changeDetectorRef: ChangeDetectorRef,
		public prismService: PrismService
	) {}

	highlightElement(result: { code: string, language: string }) {
		if (this.ready === true) {
			this.prismService.highlight(this.el, {
				async: this.async,
				callback: this.callback,
				code: result.code,
				interpolation: this.interpolation
			});
		}
	}
}
