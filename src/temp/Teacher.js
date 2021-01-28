import React from 'react';
import styled from 'styled-components';

const DvTeachersRow = styled.div`
    display: grid;
    line-height: 40px;
    grid-template-columns: 32% 35% 20% 0%;
    width: 50%;
    margin-left: 25%;
`;

const DvTeacherEvent = styled.div`
    color: #ababab;
`;

function Teacher({teacher, onModify, onRemove}){
    return (
        <DvTeachersRow>
            <div>{teacher.id}</div>
            <div>{teacher.name}</div>
            <DvTeacherEvent onClick={onModify}>Modify</DvTeacherEvent>
            <DvTeacherEvent onClick={onRemove}>Delete</DvTeacherEvent>
        </DvTeachersRow>
    )
}

export default Teacher;