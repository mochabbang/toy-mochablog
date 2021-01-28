import React from 'react';
import styled, { css } from 'styled-components';

const TextInputCss = css`
    padding: 2px;
    margin-right: 5px;
    margin-top: 15px;
    width: 50%;
`;
const SubmitInputCss = css`
    position: absolute;
    margin-top: 14px;
    cursor: pointer;
`;

const TextInput = styled.input.attrs({
    required: true,
})`${TextInputCss}`;

const SubmitInput = styled.input.attrs({
    required: true,
})`${SubmitInputCss}`;

function search({ searchValue }) {
    
    if(searchValue)
        document.getElementsByName('search')[0].value= searchValue;

    return (
        <div>
            <form noValidate>
                <TextInput type='text' maxLength='20' name='search' placeholder='검색어를 입력해주세요.' />
                <SubmitInput type='submit' value='검색'/>
            </form>
        </div>
    )
}

export default search;