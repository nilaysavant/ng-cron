export const activeTabExample = 
`import React from 'react';
import { ReCron, Tab, ReQuartzCron, ReUnixCron } from '@sbzen/re-cron';

const App = () => (
  <ReCron activeTab={Tab.SECONDS} />
  // or <ReQuartzCron activeTab={Tab.SECONDS} />
  // or <ReUnixCron activeTab={Tab.SECONDS} />
);
export default App;`;

export const formControlExample = 
`import React, { useState } from 'react';
import { ReCron } from '@sbzen/re-cron';

const App = () => {
  const [cronValue, setCronValue] = useState('0,1,2 2/4 6/2 ? 2-7 SUN,MON 2019/1');

  return (
    <div>
      <div className="py-2">
        <b>Cron Value: </b>
        <code>{cronValue}</code>
      </div>

      <ReCron
        value={cronValue}
        onChange={setCronValue} />
    </div>
  );
};
export default App;`;

export const disabledExample = 
`import React, { useState } from 'react';
import { ReCron } from '@sbzen/re-cron';

const App = () => {
  const [disabled, setDisabled] = useState(false);

  return (
    <div>
      <b>Disabled: </b>
      <code>{disabled ? 'true' : 'false'}</code>
      <br />
      <button
        type="button"
        className="btn btn-sm btn-secondary"
        onClick={() => setDisabled(!disabled)}>
        Toggle state
      </button>

      <ReCron disabled={disabled} />
    </div>
  );
};
export default App;`;