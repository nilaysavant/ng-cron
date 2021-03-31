export const basicCron = 
`import { ReCron, CronType } from '@sbzen/re-cron';

<ReCron cronType={CronType.UNIX}></ReCron>`;

export const quartzCron = 
`import { ReQuartzCron } from '@sbzen/re-cron';

<ReQuartzCron value={this.state.quartzCron}></ReQuartzCron>`;

export const unixCron = 
`import { ReUnixCron } from '@sbzen/re-cron';

<ReUnixCron value={this.state.unixCron}></ReUnixCron>`;