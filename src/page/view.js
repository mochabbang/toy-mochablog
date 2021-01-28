import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import axios from 'axios';

const DvView = styled.div`
    padding: 10px;    
`;

const DvViewDiv = styled.div`
    margin-top: 30px;    
`;

const DvTopTitle = css`
    borer-bottom: solid 1px #ababab;
`
const DvTopTitle_txt = css`
    border: none;
    padding-bottom: 0px;
`;

const DvDate = styled.div`
    text-align: right;
    font-size: 14px;
    color: #ababab;
    margin-bottom: 10px;
    padding-right: 10px;
`;

const inputCss = css`
    width: 100%;
    //padding-bottom: 30px;
    margin: 5px;
    font-size: 20px;
    border: solid 1px #ababab;
    font-weight: bold;   
    ${DvTopTitle, DvTopTitle_txt}    
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

const DvButton = styled.div`
    text-align: center;
    margin-top: 3px;
`;

const Button = styled.button`
    width: 120px;
    padding: 5px;
    border-radius: 5px;
    border: solid 1px #ababab;
    cursor: pointer;
    background-color: white;
    margin-left: 3px;
`;


function View({match, history}) {
    
    // eslint-disable-next-line no-unused-vars
    const [viewState, setViewState] = useState({
        data: [],
        date: '',
    });

    const viewData = async (board_id) => {
        //const board_id = match.params.data;        

        const response = await axios.post('/get/board_data', {
            data: { id: board_id }
        });

        const date = response.data[0].date.slice(0, 10) + ' ' + response.data[0].date.slice(11, 16);
        setViewState({ data: response.data, date: date});
    }

    const addViewCnt = async (board_id) => {
        const response = await axios.post('/update/view_cnt',{
            data: { id: board_id } 
        });
    }

    const cancelEvent = () => {
        return history.push('/');
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        const board_id = match.params.data;
        viewData(board_id);
        addViewCnt(board_id)
    }, [match.params.data]);

    const { data, date } = viewState;

    return (        
        <div>
            {
                data[0] ? 
                <DvView>
                    <DvViewDiv>
                        <InputTxt name='title' type='text' defaultValue={data[0].title} readOnly />
                        <DvDate>{date}</DvDate>
                        <ContentTxt name='content' defaultValue={data[0].contents} readOnly />
                    </DvViewDiv>            
                    <DvButton>
                        <Button onClick={cancelEvent}>목록</Button>
                    </DvButton>
                </DvView>
                : null
            }
        </div>
    )
}

export default View;
