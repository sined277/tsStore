import { categories } from "../../constants/constants";
import { useSelector } from "react-redux";
import { selectActiveCategoryIndex, selectCategory } from "../../redux/slices/filterSlice";
import React from "react";
import {useAppDispatch} from '../../redux/store'

const Categories = () => {
    const dispatch = useAppDispatch()
    const activeCategoryIndex = useSelector(selectActiveCategoryIndex)
    
    
    return (
        <div className="categories">
            <ul>
                {categories.map((categoryText, index) => (
                    <li
                        onClick={() => dispatch(selectCategory(index))}
                        key={index}
                        className={activeCategoryIndex === index ? "active" : undefined}
                    >
                        {categoryText}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Categories;
