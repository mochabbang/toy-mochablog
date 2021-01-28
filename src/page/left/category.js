import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Link } from 'react-router-dom';

const DvCategory = styled.div`
    padding-left: 5px;
    padding-right: 20px;    
`;

const Ul = styled.ul`line-height: 40px;`;

const Li = styled.li`
    list-style: none;
    a {
        list-style: none;
        text-decoration: none;
        color: ${props => props.isCategory ? 'teal' : 'black' };
        font-size: 14px;
    }
`;

const ButtonEdit = styled.input.attrs({
    required: true
})`
    position: absolute;
    margin: 10px 0px 0px 15px;
    padding: 1px 7px;
    border-radius: 4px;
    color: #ababab;
    background-color: #fff;
    border-color: #ababab;
    cursor: pointer;
`;

const ImgDelete = styled.img.attrs({
    required: true
})`
    position: absolute;
    width: 15px;
    margin-top: 14px;
    cursor: pointer;
`;

const EditInput = styled.input.attrs({
    required: true
})`
    width: 70%;
    margin-left: 25px;
`;

const ImgModify = styled.img.attrs({
    required: true
})`
    position: absolute;
    width: 20px;
    margin-top: 10px;
    margin-left: 10px;
    cursor: pointer;
`;

function Category({ changeCategory, login }) {

    let pre_category = 0;
    if (sessionStorage.getItem('category'))
        pre_category = Number(sessionStorage.getItem('category'));

    const [categoryList, setCategoryList] = useState([]);
    const [edit, setEdit] = useState(false);
    const [toggle, setToggle] = useState('');

    const onToggle = e => {
        const {value} = e.target;

        setToggle(value);
    }

    const categoryData = useCallback(async () => {
        const getData = await axios.get('/get/category');

        setCategoryList(getData.data);
        
    },[]);

    const addCategory = async () => {
        let category_name = window.prompt('추가할 카테고리의 이름을 입력해주세요.');
        
        if(category_name) {
            category_name = category_name.trim();

            if(category_name !== '' && category_name.length > 0) {
                const add = await axios.post('/add/category', {
                    data: { name: category_name }
                });

                alert(add.data.msg);
                categoryData();
                setEdit(!edit);
            }
            else {
                return alert('최소 1글자 이상 입력해야 합니다.');
            }
        }
    };

    const removeCategory = async (category) => {
        if (window.confirm(category.name + ' 카테고리를 삭제하시겠습니까?')) {
            const remove = await axios.post('/delete/category', {
                data: category,
            });

            if(remove) {
                alert('카테고리 삭제가 완료되었습니다.');
                categoryData();
                setEdit(!edit);
                changeCategory(0);
            }
        }
    };

    const modifyCategory = async(category) => {
        if(toggle !== '' && toggle.length > 0) {
            if(toggle === category.name)
                return alert('변경 사항이 없습니다.');

            if(window.confirm(toggle + '로 수정하시겠습니까?')) {
                const modify = await axios.post('/update/category', {
                    data: { id: category.id, name: toggle }
                });

                alert(modify.data.msg);
                categoryData();
                setEdit(!edit);
            }
        }
        else 
            return alert('변경할 카테고리의 이름을 최소 1글자 이상 입력해주세요.');
    }

    useEffect(() => {
        categoryData();     
    }, [categoryData]);
    
    return (
        <DvCategory>
            <Ul>
                <Li isCategory={(pre_category === 0)}>
                    <Link to='/' onClick={() => changeCategory(0)}>전체 보기</Link>
                    {
                        login ? (!edit ? <ButtonEdit type='button' value='Edit' onClick={()=> setEdit(!edit)} /> : 
                        <ButtonEdit type='button' value='Add' onClick={addCategory} />) : null
                    }
                    <hr/>
                </Li>            
                {
                    categoryList.map(el => {
                        if (!edit) {
                            return (
                                <Li key={el.id} isCategory={(pre_category === el.id)}>
                                    <Link to='/' onClick={() => changeCategory(el.id)}>{el.name}</Link>
                                </Li>
                            )
                        }
                        else {
                            return (
                                <Li key={el.id}>
                                    <ImgDelete src='https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../assets/preview/2012/png/iconmonstr-x-mark-2.png&r=0&g=0&b=0'
                                        onClick={() => removeCategory(el)} />
                                    <EditInput type='text' name='category_name' maxLength='20' defaultValue={el.name} onChange={onToggle} />
                                    <ImgModify src='https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../assets/preview/2017/png/iconmonstr-check-mark-17.png&r=0&g=0&b=0'
                                        onClick={() => modifyCategory(el)} />
                                </Li>
                            )
                        }
                    })
                }
            </Ul>
        </DvCategory>
    )
}

export default Category;