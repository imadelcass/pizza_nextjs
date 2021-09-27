import React from 'react';

function pizzaHome({ pizza}) {
  return <div>
    {pizza.name}
    {pizza.body}
    </div>;
}

export default pizzaHome;

export const getServerSideProps = async context => {
  const req = await fetch(
    `http://127.0.0.1:8000/api/pizzas/${context.params.slug}`
  );
  const pizza = await req.json();

  return {
    props: {
      pizza,
    },
  };
};
