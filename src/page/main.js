import React, { useState } from 'react';
import styled from 'styled-components';
import { Route, Switch } from 'react-router-dom';
import { Write, List, View, Category } from './index.js';


const DvMains = styled.div`
    display: grid;
    grid-template-columns: 19% 62% 19%;
`;

const DvLeft = styled.div`
    border-right: 1px solid #ababab;
`;

function Main({ login }) {
    const [category, setChangeCategory] = useState(0);

    const changeCategory = (target) => {
        setChangeCategory(target);
        sessionStorage.setItem('category', target);

        if(sessionStorage.getItem('page'))
            sessionStorage.removeItem('page');
    }

    const withProps = (Component, props) => {
        return function(matchProps) {
            return <Component {...props} {...matchProps } />
        }
    }
    
    return (        
        <DvMains>
            <DvLeft>
                <Route path='/' 
                    render={() => <Category changeCategory={changeCategory} login={login} /> } 
                    exact />
            </DvLeft>
            <div>
                <Switch>
                    <Route path='/' 
                        component={withProps(List, { category: category })}
                        exact />
                </Switch>
                <Route path='/write' component={Write} />
                <Route path='/view/:data' component={View} />
            </div>
            <div></div>
        </DvMains>
    )
}

export default Main;