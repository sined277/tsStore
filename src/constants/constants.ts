import { categoriesType, sortNamesType } from "../interfaces/interfaces";

export const categories: categoriesType = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
];

export const sortNames: sortNamesType[] = [
    {
        name: "популярности",
        sortProperty: "rating",
    },
    {
        name: "цене",
        sortProperty: "price",
    },
    {
        name: "алфавиту",
        sortProperty: "title",
    },
];