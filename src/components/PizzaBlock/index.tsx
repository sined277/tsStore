import React from "react";
import { useState } from "react";
import { addPizza } from "../../redux/slices/cartSlice";
import { useAppDispatch } from "../../redux/store";
import { pizzaCartProps } from "@components/PizzaCart";

export interface IPizzaBlock {
    category: number;
    id: number;
    imageUrl: string;
    price: number;
    rating: number;
    sizes: number[];
    title: string;
    types: number[];
}

const PizzaBlock: React.FC<IPizzaBlock> = ({
  title,
  price,
  types,
  sizes,
  id,
  imageUrl,
  category,
  rating,
}) => {
  const typesOfPizza = ["тонкое", "традиционное"];
  const [activeType, setActiveType] = useState<number>(0);
  const [activeSize, setActiveSize] = useState<number>(0);
  const pizzaForAdding = {
    title,
    price,
    type: typesOfPizza[activeType],
    size: activeSize,
    id,
    imageUrl,
    category,
    rating,
    count: 1
  };

  const dispatch = useAppDispatch();

  const addPizzaHandler = (pizzaObj: pizzaCartProps) => {
    if (pizzaForAdding.size === 0) {
      return alert("Choose the pizza size please");
    }
    dispatch(addPizza(pizzaObj));
  };

  return (
    <div className="pizza-block">
      <img
        className="pizza-block__image"
        src={
          "https://dodopizza-a.akamaihd.net/static/Img/Products/Pizza/ru-RU/b750f576-4a83-48e6-a283-5a8efb68c35d.jpg"
        }
        alt="Pizza"
      />
      <h4 className="pizza-block__title">{title}</h4>
      <div className="pizza-block__selector">
        <ul>
          {types.map((type, index) => {
            return (
              <li
                onClick={() => setActiveType(index)}
                className={activeType === index ? "active" : undefined}
                key={index}
              >
                {typesOfPizza[type]}
              </li>
            );
          })}
        </ul>
        <ul>
          {sizes.map((size, index) => {
            return (
              <li
                onClick={() => setActiveSize(size)}
                className={activeSize === size ? "active" : undefined}
                key={index}
              >
                {size} sm
              </li>
            );
          })}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">от {price} $</div>
        <div
          onClick={() => addPizzaHandler(pizzaForAdding)}
          className="button button--outline button--add"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Добавить</span>
        </div>
      </div>
    </div>
  );
};

export default PizzaBlock;
