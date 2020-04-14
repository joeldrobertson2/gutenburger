import './style.scss';

const { registerBlockType } = wp.blocks;
const { RichText } = wp.editor;

export default registerBlockType(
	'gutenburger/richtext',
	{
		title: 'Rich Text',
		description: 'Use a rich text component',
		category: 'common',
		icon: 'editor-alignleft',
		keywords: [ 'Rich', 'Text' ],
		attributes: {
			message: {
				type: 'array',
				source: 'children',
				selector: '.message-body',
			}
		},
		edit: props => {
			const { attributes: { message }, className, setAttributes } = props;
			const onChangeMessage = message => { setAttributes( { message } ) };
			return (
				<div className={ className }>
					<h2>Call to action</h2>
					<RichText
						tagName="div"
						multiline="p"
						placeholder="Add a message"
						onChange={ onChangeMessage }
						value={ message }
					/>
				</div>
			);
		},
		save: props => {
			const { attributes: { message } } = props;
			return (
				<div>
					<h2>Call to action</h2>
					<div className="message-body">
						{ message }
					</div>
				</div>
			);
		},
	},
);