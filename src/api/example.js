// src/api/example.js
const url = process.env.REACT_APP_API_URL;

// 전체 목록 가져오기
export const getItems = async () => {
    const response = await fetch(`${url}/examples`);
    if(!response.ok) {
        throw new Error('데이터를 가져오는데 실패했습니다.');
    }
    return await response.json();
}


// 새로운 아이템 추가
export const addItem = async (text) => {
    const response = await fetch(`${url}/examples`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({text})
    })
    if(!response.ok) {
        throw new Error('추가하는데 실패했습니다.');
    }
    return await response.json();
}

// 아이템 삭제
export const deleteItem = async (id) => {
    const response = await fetch(`${url}/examples/${id}`, {
        method: 'DELETE'
    });
    if(!response.ok) {
        throw new Error('삭제하는데 실패했습니다.');
    }
    return await response.json();
}