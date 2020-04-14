import './style.scss';
import classnames from 'classnames';

const { registerBlockType } = wp.blocks;
const { RichText, AlignmentToolbar, BlockControls } = wp.editor;

export default registerBlockType(
	'gutenburger/text-alignment-toolbar',
	{
		title: 'Alignment Toolbar',
		description: 'Add an alignment toolbar',
		category: 'common',
		icon: 'editor-alignleft',
		keywords: [ 'Rich', 'Text' ],
		attributes: {
			message: {
				type: 'array',
				source: 'children',
				selector: '.message-body',
			},
			textAlignment: {
				type: 'string',
			},
		},
		edit: props => {
			const { attributes: { textAlignment, message }, className, setAttributes } = props;
			return (
				<div className={ classnames( className, 'stack') }>
					<BlockControls>
						<AlignmentToolbar
							value={ textAlignment }
							onChange={ textAlignment => setAttributes( { textAlignment } ) }
						/>
					</BlockControls>
					<RichText
						tagName="div"
						multiline="p"
						placeholder="Add a message"
						value={ message }
						style={ { textAlign: textAlignment } }
						onChange={ message => setAttributes( { message } ) }
					/>
				</div>
			);
		},
		save: props => {
			const { attributes: { textAlignment, message } } = props;
			return (
				<div>
					<div className="message-body" style={ { textAlign: textAlignment } }>
						{ message }
					</div>
				</div>
			);
		},
	},
);