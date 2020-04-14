import './style.scss';

const { registerBlockType } = wp.blocks;
const { RichText } = wp.editor;

export default registerBlockType(
	'gutenburger/card',
	{
		title: 'Card',
		description: 'Make a repeatable card',
		category: 'common',
		icon: 'media-default',
		keywords: [ 'Card' ],
		attributes: {
			cards: {
				type: 'array',
				source: 'query',
				default: [
					
				],
				selector: '.card-item',
				query: {
					description: {
						type: 'array',
						selector: 'p',
						source: 'children',
					},
				},
			},
		},
		edit: props => {
			const { attributes: { cards }, className, setAttributes } = props;
			return (
				<div>
				<div className={ className }>
					{cards.map( card => {
						return (
							<div>
								<RichText
									tagName="p"
									placeholder="Add a description"
									onChange={ console.log('hello') }
									value=""
								/>
							</div>
						)
					} )}
				</div>
				<button
					onClick={ () => setAttributes({
						cards: [
							...props.attributes.cards,
							{
								description: "",
							}
						]
					}) }
				>Add slide</button>
				</div>
			)
		},
		save: props => {
			const { attributes: { cards } } = props;
			return (
				<div>
					{cards.map( card => {
						return (
							<div className="card-item">
								<p>{ card.description }</p>
							</div>
						)
					} )}
				</div>
			)
		},
	},
);