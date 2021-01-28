import React, { useState } from 'react';
import { Route, Link } from 'react-router-dom';
import styled from 'styled-components';
import '../App.css';
import Modal from 'react-awesome-modal';
import AdminLogin from '../components/AdminLogin';
import axios from 'axios';

const AdminH5 = styled.h5`
    cursor: pointer;
`;

function Header({login, checkLogin, checkLogout}) {

    const initialState = {
        visible : false,
        id: '',
        password: '',
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [state, setState] = useState(initialState);
    
    const _ModalEvent = () => {
        setState({
            ...state,
            id: '',
            password: '',
            visible: !state.visible
        });
    }

    const _ChangeValue = e => {
        const {name ,value} = e.target;

        setState({
            ...state,
            [name]: value,
        });
    }

    const _LoginEvent = async() => {

        const { id, password } = state;

        if(id === '')
            return alert('아이디를 입력해주세요.');
        
        if(password === '')
            return alert('비밀번호를 입력해주세요.');

        const response = await axios.post('/send/pw', {state});

        if (response.data.rlt) {
            checkLogin();
            
            setState({
                id: initialState.id,
                password: initialState.password,                
                visible: !state.visible,
            });
        }
        else {
            return alert('아이디 및 비밀번호가 일치하지 않습니다.');
        }
            
    }

    const _LogOutEvent = () => {
        if(window.confirm('로그아웃 하시겠습니까?')) {
            checkLogout();
        }
    }
    
    return (
        <div className="header_grid">
            <div className='acenter'>
                {login ? <h5><Link to='/write'>포스트 작성</Link></h5> : null}
            </div>
            <div className='acenter'>
                <Route path='/' />
                <Link className='link_tit' to='/'>
                    <h3>mOcha's Blog</h3>
                </Link>
            </div>
            <div className='acenter'>
                {
                    login ?  <AdminH5 onClick={() => _LogOutEvent() }>관리자 로그아웃</AdminH5>
                        : <AdminH5 onClick={() =>_ModalEvent()}>관리자 로그인</AdminH5>
                }
                
                <Modal
                    width="400"
                    height="240"
                    visible={state.visible}
                >
                    <AdminLogin 
                        modalEvent={_ModalEvent}
                        changeValue={_ChangeValue}
                        loginEvent={_LoginEvent} 
                        inputs={state}
                    />
                </Modal>
            </div>

        </div>
    )
}

export default Header;