import { QuartzService } from '@sbzen/cron-core';

import { CronService } from './../cron.service';

export class QuartzCronDI {
	private static map = new Map<number, CronService>();

	static get(session: number) {
		if (!this.map.has(session)) {
			this.create(session);
		}
		return this.map.get(session);
	}

	static destroy(session: number) {
		this.map.delete(session);
	}

	private static create(session: number) {
		const inst = new CronService(new QuartzService());
		this.map.set(session, inst);
	}
}