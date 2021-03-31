import { UnixService, CronUnixUIService } from '@sbzen/cron-core';

export class UnixCronDI {
	private static map = new Map<string, CronUnixUIService>();

	static get(session: string) {
		if (!this.map.has(session)) {
			this.create(session);
		}
		return this.map.get(session);
	}

	static destroy(session: string) {
		this.map.delete(session);
	}

	private static create(session: string) {
		const inst = new CronUnixUIService(new UnixService());
		this.map.set(session, inst);
	}
}