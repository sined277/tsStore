import React from 'react'
import { useEffect } from 'react'
import { Categories, PizzaBlock, PizzaSkeleton, Sorting } from '../components'
import { useSelector } from 'react-redux'
import { selectActiveCategoryIndex, selectActiveSort } from '../redux/slices/filterSlice'
import { fetchPizzas, selectLoadingStatus, selectPizzas } from '../redux/slices/pizzaSlice'
import { IPizzaBlock } from '../components/PizzaBlock'
import { useAppDispatch } from '../redux/store'

const Home = () => {
    const pizzaData = useSelector(selectPizzas)
    const loadingStatus = useSelector(selectLoadingStatus)
    const activeCategoryIndex = useSelector(selectActiveCategoryIndex)
    const activeSort = useSelector(selectActiveSort)

    const category = activeCategoryIndex > 0 ? activeCategoryIndex : ""
    const sortBy = activeSort ? activeSort.sortProperty : ""

    const dispatch= useAppDispatch()

    useEffect(() => {
        try {
            dispatch(fetchPizzas({
                category: category,
                sortBy: sortBy
            }))
        } catch (error) {
            console.error("Error fetching pizzas:", error);
        }
    }, [dispatch, category, sortBy])

    const pizzas = pizzaData.map((pizza: IPizzaBlock) => <PizzaBlock key={pizza.id} {...pizza} />)
    const skeletons = [...Array(10)].map((_, index) => <PizzaSkeleton key={index} />);
    return (
        <div className="content">
            <div className="container">
                <div className="content__top">
                    <Categories />
                    <Sorting />
                </div>
                <h2 className="content__title">Все пиццы</h2>
                <div className="content__items">
                    {loadingStatus === "loading" || loadingStatus === "failed" ? skeletons : pizzas}
                </div>
            </div>
        </div>
    )
}

export default Home