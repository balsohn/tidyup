import React, { useEffect, useState } from "react";
import { getItems, addItem, deleteItem } from "../api/example";

function ExampleComponent() {
    const [items, setItems] =  useState([]);
    const [inputText, setInputText] = useState('');
    const [error, setError] = useState('');

    // 목록 불러오기
    const fetchItems = async () => {
        try {
            const data = await getItems();
            setItems(data);
            setError('');
        } catch (err) {
            setError(err.message);
        }
    }

    // 처음 렌더링될 때 목록 불러오기
    useEffect(() => {
        fetchItems();
    },[]);

    // 아이템 추가
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!inputText.trim()) return;

        try {
            await addItem(inputText);
            setInputText('');
            fetchItems(); // 목록 새로고침
            setError('');
        } catch (err) {
            setError(err.message);
        }
    }

    // 아이템 삭제
    const handleDelete = async (id) => {
        try { 
            await deleteItem(id);
            fetchItems(); // 목록 새로고침
            setError('');
        } catch(err) {
            setError(err.message);
        }
    }
    

    return (
        <div>
            <h1> Example 목록 </h1>

            {/* 에러 메세지 */}
            {error && (
                <div> {error} </div>
            )}
        

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="새 아이템 입력"
                />
                <button
                    type="submit"
                >
                    추가
                </button>
            </form>

            {/* 목록 */}
            <ul>
                {items.map((item) => (
                    <li key={item.id}>
                        <span>{item.text}</span>
                        <button
                            onClick={() => handleDelete(item.id)}
                        >
                            삭제
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ExampleComponent;