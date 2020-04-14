import classnames from 'classnames';
import './style.scss';
import './editor.scss';
import icon from './icon';

const { registerBlockType } = wp.blocks;
const { RichText, AlignmentToolbar, BlockControls, BlockAlignmentToolbar } = wp.editor;
const { Dashicon, Toolbar, Button, Tooltip, } = wp.components;

export default registerBlockType(
	'gutenburger/custom-toolbar',
	{
		title: 'Custom Toolbar',
		description: 'Add a custom toolbar',
		category: 'common',
		icon: 'editor-alignleft',
		keywords: [ 'Custom', 'Toolbar' ],
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
            highContrast: {
                type: 'boolean',
                default: false,
            }
		},
        getEditWrapperProps( { blockAlignment } ) {
            if ( 'left' === blockAlignment || 'right' === blockAlignment || 'full' === blockAlignment ) {
                return { 'data-align': blockAlignment };
            }
        },
		edit: props => {
			const { attributes: { textAlignment, blockAlignment, message, highContrast }, className, setAttributes } = props;
            const classes = classnames(
                className,
                { 'high-contrast': highContrast },
            );
            return (
				<div className={ classes }>
					<BlockControls>
						<BlockAlignmentToolbar
							value={ blockAlignment }
							onChange={ blockAlignment => setAttributes( { blockAlignment } ) }
						/>
						<AlignmentToolbar
							value={ textAlignment }
							onChange={ textAlignment => setAttributes( { textAlignment } ) }
						/>
                        <Toolbar>
                            <Tooltip text="High Contrast">
                                <Button
                                    isPressed={ highContrast }
                                    onClick={ () => setAttributes( { highContrast: ! highContrast } ) }
                                >
                                    { icon }
                                </Button>
                            </Tooltip>
                        </Toolbar>
					</BlockControls>
					<RichText
						tagName="div"
						multiline="p"
						placeholder="Add a message"
                        value={ message }
                        className={ classnames(
                            'message-body',
                            { 'high-contrast': highContrast }
                        ) }
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