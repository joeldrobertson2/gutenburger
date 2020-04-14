import './style.scss';
import classnames from 'classnames';

const { registerBlockType } = wp.blocks;
const { RichText, AlignmentToolbar, BlockControls, BlockAlignmentToolbar } = wp.editor;

export default registerBlockType(
	'gutenburger/block-alignment-toolbar',
	{
		title: 'Block Alignment Toolbar',
		description: 'Add a block alignment toolbar',
		category: 'common',
		icon: 'editor-alignleft',
		keywords: [ 'Block', 'Align' ],
		attributes: {
			message: {
				type: 'array',
				source: 'children',
				selector: '.message-body',
			},
			textAlignment: {
				type: 'string',
			},
			blockAlignment: {
				type: 'string',
				default: 'wide',
			},
		},
        getEditWrapperProps( { blockAlignment } ) {
            if ( 'left' === blockAlignment || 'right' === blockAlignment || 'full' === blockAlignment ) {
                return { 'data-align': blockAlignment };
            }
        },
		edit: props => {
			const { attributes: { textAlignment, blockAlignment, message }, className, setAttributes } = props;
			return (
				<div className={ classnames( className, 'stack') }>
					<BlockControls>
						<BlockAlignmentToolbar
							value={ blockAlignment }
							onChange={ blockAlignment => setAttributes( { blockAlignment } ) }
						/>
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
			const { blockAlignment, textAlignment, message } = props.attributes;
			return (
				<div 
					className={ classnames( 
						`align${blockAlignment}`,
						'message-body',
					)}
					style={ { textAlign: textAlignment } }
				>
					{ message }
				</div>
			);
		},
	},
);