import React from 'react';
import styled from 'styled-components'
import Teacher from './Teacher';

const DvTeachersBorder = styled.div`
    height: 250px;
    overflow: auto;
`;

const H4Teachers = styled.h4`
    color: #ababab;
`;

const DvTeachersHeader = styled.div`
    border: solid 1px black;
    width: 50%;
    margin-left: 25%;
    text-align: left;
`;

const DvTeachersHeaderColumn = styled.div`
    display: grid;
    grid-template-columns: 32% 35% 30%;
    text-align: center;
`;

function Teachers({lists, onModify, onRemove}) {
    return (
        <>
            <DvTeachersBorder>                
                <H4Teachers>Teachers List</H4Teachers>
                <DvTeachersHeader>
                    <DvTeachersHeaderColumn>
                        <div>Number</div>
                        <div>Name</div>
                        <div>Other</div>
                    </DvTeachersHeaderColumn>
                </DvTeachersHeader>
                {
                    lists.length != null && lists.map(
                        (list) => {
                            return <Teacher teacher={list} key={list.id} onModify={() => onModify(list)} onRemove={() => onRemove(list)} />
                        }
                    )
                }
            </DvTeachersBorder>
        </>
    )
}


export default Teachers;