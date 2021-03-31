import { QuartzService, CronQuartzUIService } from '@sbzen/cron-core';

export class QuartzCronDI {
	private static map = new Map<string, CronQuartzUIService>();

	static get(session: string) {
		if (!this.map.has(session)) {
			this.create(session);
		}
		return this.map.get(session);
	}

	static destroy(session: string) {
		const service = this.get(session);
		service.destroy();
		this.map.delete(session);
	}

	private static create(session: string) {
		const inst = new CronQuartzUIService(new QuartzService());
		this.map.set(session, inst);
	}
}