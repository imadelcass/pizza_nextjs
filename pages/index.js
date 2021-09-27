// import { TablePagination } from '@material-ui/core';
import { useState } from 'react';
import Category from '../components/Category';
import Pizza from '../components/Pizza';
import styles from '../styles/Home.module.scss';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useRouter } from 'next/dist/client/router';
import Search from '../components/Search';

export default function Home({ pizzas, categories, activeCategory, search }) {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <div className={styles.categories}>
        {categories.map(category => (
          <Category
            key={category.id}
            category={category}
            activeCategory={activeCategory}
          />
        ))}
      </div>
      <Search activeCategory={activeCategory} />
      <div className={styles.pizzas}>
        {pizzas.data.map(pizza => (
          <Pizza key={pizza.id} pizza={pizza} />
        ))}
      </div>
      <div className={styles.pagination}>
        <ArrowBackIosNewIcon
          className={pizzas.current_page == 1 ? styles.disable : ''}
          onClick={
            pizzas.current_page > 1
              ? () =>
                  router.push(
                    `?${search !== null ? `search=${search}&` : ''}${
                      activeCategory !== null
                        ? `category=${activeCategory}&`
                        : ''
                    }page=${pizzas.current_page - 1}`
                  )
              : undefined
          }
        />
        {[...Array(pizzas.last_page)].map((i, page) => {
          return (
            <button
              onClick={
                pizzas.current_page != page + 1
                  ? () =>
                      router.push(
                        `?${search !== null ? `search=${search}&` : ''}${
                          activeCategory !== null
                            ? `category=${activeCategory}&`
                            : ''
                        }page=${page + 1}
                        `
                      )
                  : undefined
              }
              key={page}
              className={
                pizzas.current_page == page + 1 ? styles.btnActive : ''
              }
            >
              {page + 1}
            </button>
          );
        })}
        <ArrowForwardIosIcon
          className={
            pizzas.current_page >= pizzas.last_page ? styles.disable : ''
          }
          onClick={
            pizzas.current_page < pizzas.last_page
              ? () =>
                  router.push(
                    `?${search !== null ? `search=${search}&` : ''}${
                      activeCategory !== null
                        ? `category=${activeCategory}&`
                        : ''
                    }page=${pizzas.current_page + 1}`
                  )
              : undefined
          }
        />
      </div>
    </div>
  );
}
export const getServerSideProps = async context => {
  const category = context.query.category;
  const page = context.query.page;
  const search = context.query.search;
  const [pizzasReq, categoriesReq] = await Promise.all([
    fetch(
      `http://127.0.0.1:8000/api?category=${category || ''}&search=${
        search || ''
      }&page=${page || ''}`
    ),
    fetch('http://127.0.0.1:8000/api/categories'),
  ]);
  const [pizzas, categories] = await Promise.all([
    pizzasReq.json(),
    categoriesReq.json(),
  ]);

  return {
    props: {
      pizzas: pizzas,
      categories,
      activeCategory: category || null,
      search: search || null,
      
    },
  };
};
