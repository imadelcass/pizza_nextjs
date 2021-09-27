import styles from '../styles/Pizza.module.scss';

export default function Pizza({ pizza }) {
  return (
    <a className={styles.pizza} href={`/pizzas/${pizza.slug}`}>
      <img className={styles.img} src={pizza.img} />
      <div className={styles.body}>
          <h3>{pizza.name}</h3>
          <p>{pizza.body}</p>
      </div>
    </a>
  );
}
