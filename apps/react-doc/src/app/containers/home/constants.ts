export const features = [
	{
		icon: 'fab fa-angellist',
		title: 'Native',
		desc: `
			As simple as React. Nothing else.
			The Bootstrap CSS is a optional dependency.
		`
	},
	{
		icon: 'fas fa-brush',
		title: 'Customization',
		desc: `You can customize the component as you want.`
	},
	{
		icon: 'fab fa-npm',
		title: 'Open-source and on npm',
		desc: `Use it directly in your project using npm.`
	}
];

export const example = 
`import { ReCron } from '@sbzen/re-cron';

const App = () => {
  const [cronValue, setCronValue] = useState('2,0,4,3,1 0/1 3/2 ? * 4/5 *');

  return (
    <div>
      <input
        className="form-control mb-4"
        readOnly
        value={cronValue} />

      <ReCron
        value={cronValue}
        onChange={setCronValue} />
    </div>
  );
};
export default App;`;