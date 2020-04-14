import './style.scss';
import './editor.scss';

const { registerBlockType } = wp.blocks;

export default registerBlockType(
	'gutenburger/static',
	{
		title: 'Static Block',
		description: 'Static burger',
		category: 'common',
		icon: 'format-aside',
		keywords: [ 'static' ],
		edit: props => {
			const { className } = props;
			return (
				<div className={ className }>
					<h2>Poop to action</h2>
					<p>This is really important</p>
				</div>
			);
		},
		save: props => {
			return (
				<div>
					<h2>Poop to action</h2>
					<p>This is really important</p>
				</div>
			);
		}
	}
);