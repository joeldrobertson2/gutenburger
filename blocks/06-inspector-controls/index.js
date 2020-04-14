import classnames from 'classnames';
import './style.scss';
import icons from './icons';

const { registerBlockType } = wp.blocks;
const { RichText, AlignmentToolbar, BlockControls, BlockAlignmentToolbar, InspectorControls } = wp.editor;
const { Dashicon, Toolbar, Button, Tooltip, PanelBody, PanelRow, FormToggle } = wp.components;

export default registerBlockType(
	'gutenburger/inspector-controls',
	{
		title: 'Inspector Controls',
		description: 'Add a button to inspector controls',
		category: 'common',
		icon: 'admin-settings',
		keywords: [ 'Inspector', 'Button' ],
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
			const toggleHighContrast = () => setAttributes( { highContrast: ! highContrast } );
            return [
				<InspectorControls>
					<PanelBody
						title="High Contrast"
					>
						<PanelRow>
							<label>High Contrast</label>
							<FormToggle
								label="High Contrast"
								checked={ highContrast }
								onChange={ toggleHighContrast }
							/>
						</PanelRow>
					</PanelBody>
				</InspectorControls>,
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
								{ icons.contrast }
							</Button>
						</Tooltip>
					</Toolbar>
				</BlockControls>,
                <div
                    className={ classnames(
                        props.className,
                        { 'high-contrast': highContrast },
                    ) }
                >
                    <RichText
                        tagName="div"
                        multiline="p"
                        placeholder="Enter your message here.."
                        value={ message }
                        style={ { textAlign: textAlignment } }
                        onChange={ ( message ) => props.setAttributes( { message } ) }
                    />
                </div>
			];
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