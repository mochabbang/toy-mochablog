import React from 'react';

function TeacherCreate({onSubmit, onToggle, teachername}) {
    return (
        <>
            <form method='post' onSubmit={onSubmit}>
                <input type='text' name="teachername" maxLength='10' onChange={onToggle} value={teachername} />
                <input type='submit' value='add' />
            </form>
        </>
    )
}

export default TeacherCreate;