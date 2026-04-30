interface TagListProps {
	activeTag?: string | null;
	onTagClick?: (tag: string) => void;
	tags: string[];
}

export function TagList({ tags, activeTag, onTagClick }: TagListProps) {
	if (tags.length === 0) return null;

	return (
		<ul className="tag-list">
			{tags.map((tag) => (
				<li key={tag} className="tag-list__item">
					<button className={`tag-list__tag${activeTag === tag ? ' tag-list__tag--active' : ''}`} onClick={() => onTagClick?.(tag)} type="button">
						{tag}
					</button>
				</li>
			))}
		</ul>
	);
}
