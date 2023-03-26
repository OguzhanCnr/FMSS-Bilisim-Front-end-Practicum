import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
	const [todos, setTodos] = useState([]);
	const [inputValue, setInputValue] = useState('');

	//Tüm hepsini seçmemiz için oluşturulan state
	const [checkedAll, setCheckedAll] = useState(false);
	//Kategorize etmemiz için oluşturulan stateler
	const [selected, setSelected] = useState("All");
	const [filterTodos, setFilterTodos] = useState([]);

	//Filtreleme işlemine göre verilerin ekranda değişmesini sağlar
	useEffect(() => {
		if (selected == "All") {
			setFilterTodos(todos)
		}
		else if (selected == "Active") {
			setFilterTodos(todos.filter((item) => item.completed == false))
		}
		else {
			setFilterTodos(todos.filter((item) => item.completed == true))

		}
	}, [selected, todos]);

	//Yeni görev ekleme fonksiyonu
	const handleAddTodo = () => {
		if (inputValue !== '') {
			const newTodo = { text: inputValue, completed: false };
			setTodos([...todos, newTodo]);
			setInputValue('');
		}
	};

	//Seçili görevi siler
	const handleDeleteTodo = (index) => {
		const newTodos = [...todos];
		newTodos.splice(index, 1);
		setTodos(newTodos);
	};

	//Seçili görevi tamamlanmış olarak işaretler
	const handleToggleCompleted = (index) => {
		const newTodos = [...todos];
		newTodos[index].completed = !newTodos[index].completed;
		setTodos(newTodos);
	};
	//Tüm listeyi seçer veya tüm listeyi eski haline döndürür.
	const handleChackedAll = () => {
		const newTodos = [...todos];
		if (!checkedAll) {
			//checkedAll değilse tüm hepsini yapılmış olarak seçer
			newTodos.forEach(element => {
				element.completed = true
			});
			setCheckedAll(true)
		}
		else {
			//checkedAll ise tüm hepsini yapılmamış kabul ediliyor
			newTodos.forEach(element => {
				element.completed = false
			});
			setCheckedAll(false)
		}
		setTodos(newTodos);

	};

	const handleInputChange = (event) => {
		setInputValue(event.target.value);
	};

	//Listede seçilmiş olanları silmemizi sağlayan fonksiyon
	//Direkt copmleted olmayanları alıp yeni dizi oluşturursak silmiş oluyoruz
	const handleSelectedDelete = () => {
		const newTodos = todos.filter((todo) => {
			return todo.completed !== true;
		});
		setTodos(newTodos);

	};

	//Listeye veri eklerken enter tuşuna basınca da eklenmesini sağladığım fonksiyon
	const handleInputKeyPress = (event) => {
		if (event.key === 'Enter') {
			handleAddTodo();
		}
	};

	return (
		<>
			<section class="todoapp">
				<header class="header">
					<h1>todos</h1>
					<input class="new-todo" placeholder="What needs to be done?" type="text" value={inputValue} onChange={handleInputChange} onKeyPress={handleInputKeyPress} />
				</header>

				<section class="main">
					<input class="toggle-all" type="checkbox" checked={checkedAll} />
					<label for="toggle-all" onClick={() => handleChackedAll()}>
						Mark all as complete
					</label>

					<ul class="todo-list">
						{
							filterTodos
								.map((todo, index) => (
									<li class={todo.completed ? 'completed' : 'none'}>
										<div class="view">
											<input type="checkbox" class="toggle" checked={todo.completed} onChange={() => handleToggleCompleted(index)} />
											<label>{todo.text}</label>
											<button class="destroy" onClick={() => handleDeleteTodo(index)}></button>
										</div>
									</li>
								))}
					</ul>
				</section>

				<footer class="footer">
					<span class="todo-count">
						<strong>{todos.filter((item) => item.completed == false).length}</strong>
						items left
					</span>

					<ul class="filters">
						<li>
							<a onClick={() => setSelected("All")} class="selected">All</a>
						</li>
						<li>
							<a onClick={() => setSelected("Active")}>Active</a>
						</li>
						<li>
							<a onClick={() => setSelected("Completed")}>Completed</a>
						</li>
					</ul>

					<button class="clear-completed" onClick={() => handleSelectedDelete()}>
						Clear completed
					</button>
				</footer>
			</section>

			<footer class="info">
				<p>Updated by <a href="https://www.oguzhancinar.com.tr/">Oğuzhan Çınar</a></p>
			</footer>
		</>
	);
}

export default App;
