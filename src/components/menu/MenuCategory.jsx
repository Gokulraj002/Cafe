import MenuItem from './MenuItem';

/** A titled group of menu items. */
export default function MenuCategory({ category, showTitle = true, className = '' }) {
  return (
    <div className={`menu-category ${className}`}>
      {showTitle && (
        <header className="menu-category__header">
          <h3 className="type-title">{category.title}</h3>
          {category.note && <p className="type-caption mb-0">{category.note}</p>}
        </header>
      )}
      <ul className="menu-category__items list-unstyled mb-0">
        {category.items.map((item) => (
          <MenuItem key={item.name} {...item} />
        ))}
      </ul>
    </div>
  );
}
