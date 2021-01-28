import React from 'react';
import styled, { css } from 'styled-components';
import axios from 'axios';

const DvWrite = styled.div`
    padding: 10px;    
`;

const inputCss = css`
    width: 100%;
    //padding-bottom: 30px;
    margin: 5px;
    font-size: 20px;
    border: solid 1px #ababab;
    font-weight: bold;    
`;

const InputTxt = styled.input.attrs({
    required: true
})`${inputCss}`;


const contentTxt = css`
    width: 100%;
    resize: none;
    border: solid 1px #ababab;
    height: 350px;
    margin: 5px;
`;

const ContentTxt = styled.textarea.attrs({
    required: true
})`${contentTxt}`;

const DvPostSubmit = styled.div`
    text-align: center;
    margin-top: 3px;
`;

const ButtonSubmit = styled.button`
    width: 120px;
    padding: 5px;
    border-radius: 5px;
    border: solid 1px #ababab;
    cursor: pointer;
    background-color: white;
    margin-left: 3px;
`;

const DvWriteDiv = styled.div`
    margin-top: 30px;    
`;

function write() {
    const _submitEvent = async () => {
        const title = document.getElementsByName('title')[0].value.trim();
        const content = document.getElementsByName('content')[0].value.trim();

        if (title === "")
            return alert('제목을 입력해주세요.');
        if (content === "")
            return alert('내용을 입력해주세요.');

        const data = { title: title, content: content };
        const response = await axios.post('/add/board', { data });

        if(response.data) {
            alert('등록되었습니다.');
            return window.location.replace('/');
        }

    }

    const _cancelEvent = () => {
        return window.history.back();
    }

    return (
        <div>
            <DvWrite>
                <DvWriteDiv>
                    <InputTxt name='title' type='text' placeholder='제목' />
                    <ContentTxt name='content' placeholder='내용을 입력하세요.' />
                </DvWriteDiv>            
            </DvWrite>
            <DvPostSubmit>
                <ButtonSubmit onClick={() => _submitEvent()}>등록하기</ButtonSubmit>
                <ButtonSubmit onClick={_cancelEvent}>취소</ButtonSubmit>
            </DvPostSubmit>
        </div>
    );
}

export default write;