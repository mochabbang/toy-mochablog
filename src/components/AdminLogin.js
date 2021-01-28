import React from 'react';
import styled, { css } from 'styled-components';

const DvHeader = styled.div`
    background: #339af0;
    color: white;
    font-size: 20px;
    font-weight: bold;
    justify-content: center;
    align-items : center;
    border-radius: 5px;
    padding: 15px 0;
    margin: 10px;
`;

const DvBody = styled.div`
    margin: 0px 5px;
`;

const DvBox = styled.div`
    margin : 15px 5px;
    position: relative;
`;

const InputCss = css`
 display: block;
 box-shadow: 0 4px 6px rbga(50, 50, 93, 0.11), 0 1px 3px rbga(0, 0, 0, 0.08);
 border: 1px solid #ced4da;
 height: 30px;
 width: 98%;
 `;

const Input = styled.input.attrs({
    required: true
})`
    ${InputCss}
`;

const ButtonCss = css`
    width: 48%;
    font-size: 15px;
    border-radius: 5px;
    padding: 15px 0px;
    margin: 0px 3px;
    color: white;
    font-weight: bold;
    background: ${props => props.color || '#8ce99a'};
    border: none;
`;

const Button = styled.input.attrs({
    required: true
})`
    ${ButtonCss}
`;

function AdminLogin({ modalEvent, changeValue, loginEvent, inputs }) {
    return (
        <>
            <DvHeader>관리자 로그인</DvHeader>
            <div>
                <DvBody>
                    <DvBox>
                        <Input name='id' onChange={ changeValue } placeholder="아이디" value={inputs.id} />
                    </DvBox>
                    <DvBox>
                        <Input type="password" name='password' onChange={ changeValue } placeholder="비밀번호" value={inputs.password} />
                    </DvBox>
                    <div>
                        <Button type="button" value="로그인" color="#22b8cf" onClick={() => loginEvent()} />
                        <Button type="button" value="취소" onClick={() => {modalEvent()}} />
                    </div>
                </DvBody>
            </div>
        </>
        
    )
}

export default AdminLogin;