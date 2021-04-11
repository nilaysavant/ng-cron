export const basicCronExample = 
`import React, { useState } from 'react';
import { ReCron, ReQuartzCron } from '@sbzen/re-cron';

const App = () => {
  const [quartzCron, setQuartzCron] = useState('0 22 * * */3 * *');

  return (
    <ReCron 
      value={quartzCron} 
      onChange={setQuartzCron} />
    // or <ReQuartzCron value={quartzCron} onChange={setQuartzCron} />
  );
};
export default App;`;

export const unixCronExample = 
`import React, { useState } from 'react';
import { ReUnixCron } from '@sbzen/re-cron';

const App = () => {
  const [unixCron] = useState('5 0 * JAN *');

  return (
    <ReUnixCron value={unixCron} />
  );
};
export default App;`;