import './style.scss';
import HeadingToolbar from './heading-toolbar';

const { registerBlockType } = wp.blocks;
const { RichText, BlockControls, InspectorControls, __experimentalBlock: Block } = wp.editor;
const { PanelBody } = wp.components;

export default registerBlockType(
	'gutenburger/richtext-heading',
	{
		title: 'Rich Text + Heading',
		description: 'Use a rich text component with a heading too',
		category: 'common',
		icon: 'editor-alignleft',
		keywords: [ 'Rich', 'Text' ],
		attributes: {
			heading: {
				type: 'array',
				source: 'children',
				selector: '.heading',
			},
			message: {
				type: 'array',
				source: 'children',
				selector: '.message-body',
			}
		},
		edit: props => {
			const { attributes: { message, heading, level }, className, setAttributes } = props;
			const tagName = level ? 'h' + level : 'h2';
			return (
				<div className={ className }>
					<BlockControls>
						<HeadingToolbar
							minLevel={ 2 }
							maxLevel={ 4 }
							selectedLevel={ level || 2 }
							onChange={ ( newLevel ) =>
								setAttributes( { level: newLevel } )
							}
						/>
					</BlockControls>
					<InspectorControls>
						<PanelBody title="Heading settings">
							<HeadingToolbar
								isCollapsed={ false }
								minLevel={ 2 }
								maxLevel={ 4 }
								selectedLevel={ level || 2 }
								onChange={ ( newLevel ) =>
									setAttributes( { level: newLevel } )
								}
							/>
						</PanelBody>
					</InspectorControls>
					<RichText
						tagName= { tagName }
						placeholder="Add a heading"
						onChange={ heading => setAttributes( { heading } ) }
						value={ heading }
					/>
					<RichText
						tagName="div"
						multiline="p"
						placeholder="Add a message"
						onChange={ message => setAttributes( { message } ) }
						value={ message }
					/>
				</div>
			);
		},
		save: props => {
			const { attributes: { message, heading } } = props;
			return (
				<div>
					<div class="heading">
						{ heading }
					</div>
					<div className="message-body">
						{ message }
					</div>
				</div>
			);
		},
	},
);