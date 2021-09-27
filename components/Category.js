import styles from '../styles/Category.module.scss';

export default function Category({ category, activeCategory }) {
  return (
    <div
      className={`${styles.category} , ${
        activeCategory == category.id && styles.activeCategory
      }`}
    >
      <a href={`?category=${category.id}`}>
        <h3>{category.name}</h3>
      </a>
    </div>
  );
}
