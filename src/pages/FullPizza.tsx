import axios from 'axios';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

interface pizzaData {
	imageUrl: string,
	title: string,
	price: number,
}

export const FullPizza: React.FC = () => {
	const { id } = useParams();
	const [pizza, setPizza] = React.useState<pizzaData>();
	const navigate = useNavigate();

	React.useEffect(() => {
		const fetchPizzaData = async () => {
			try {
				const { data } = await axios.get("https://7f678c67a9e8e4e6.mokky.dev/items/" + id);
				setPizza(data);
			} catch (error) {
				alert("Ошибка при получении пиццы!")
				navigate('/');
			}
		}
		fetchPizzaData();
	}, [])

	if (!pizza) {
		return (
			<div className='container'>
				<h2>Loading...</h2>
			</div>
		);
	}

	return (
		<div className='container'>
			<img src={pizza.imageUrl} alt="name" />
			<h2>{pizza.title}</h2>
			<h4>{pizza.price} ₽</h4>
		</div>
	);
};