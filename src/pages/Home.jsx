import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Categories } from '../components/Categories';
import { Sort } from '../components/Sort';
import { PizzaBlock } from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import { Pagination } from '../components/Pagination';
import { SearchContext } from '../App';
import { setCategoryId, setSortType } from '../redux/slices/filterSlice';

export const Home = () => {
	const { searchValue } = React.useContext(SearchContext);
	const [items, setItems] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(true);
	// const [categoryId, setCategoryId] = React.useState(0);
	const [currentPage, setCurrentPage] = React.useState(1);
	const [pageMetaData, setPageMetaData] = React.useState({})
	// const [sortType, setSortType] = React.useState({
	// 	name: 'популярности',
	// 	sortProperty: 'rating',
	// });
	const categoryId = useSelector((state) => state.filter.categoryId);
	const sortType = useSelector((state) => state.filter.sort);
	const dispatch = useDispatch();

	React.useEffect(() => {
		setIsLoading(true);
		fetch(
			`https://7f678c67a9e8e4e6.mokky.dev/items?page=${currentPage}&limit=4${
				categoryId > 0 ? `&category=${categoryId}` : ''
			}&sortBy=${sortType.sortProperty}${
				searchValue ? `&title=*${searchValue}*` : ''
			}`
		)
			.then((res) => res.json())
			.then((data) => {
				setItems(data.items);
				setPageMetaData(data.meta);
			})
			.finally(() => setIsLoading(false));
		window.scrollTo(0, 0);
	}, [categoryId, sortType, searchValue, currentPage]);

	return (
		<div className="container">
			<div className="content__top">
				<Categories
					value={categoryId}
					onClickCategory={(i) => dispatch(setCategoryId(i))}
				/>
				<Sort value={sortType} onChangeSort={(i) => dispatch(setSortType(i))} />
			</div>
			<h2 className="content__title">Все пиццы</h2>
			<div className="content__items">
				{isLoading
					? [...new Array(6)].map((_, index) => (
							<Skeleton key={index} />
					  ))
					: items.map((obj) => (
							<PizzaBlock
								key={obj.id}
								imageUrl={obj.imageUrl}
								title={obj.title}
								price={obj.price}
								sizes={obj.sizes}
								types={obj.types}
							/>
					  ))}
			</div>
			<Pagination onChangePage={number => setCurrentPage(number)}/>
		</div>
	);
};
