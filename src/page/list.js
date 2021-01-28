import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import qs from 'qs';
import { Search } from './index';

const DvList = styled.div`
    padding: 30px;
    margin-left: 20px;
    margin-right: 20px;
    min-height: 500px;
`;

const DvGridHeader = styled.div`
    border-bottom: solid 1px #ababab;
    color: #ababab;

    display: grid;
    grid-template-columns: 70% 15% 15%;
    text-align: center;

    div {
        font-size: 14px;
    }
`;

const DvGridRow = styled.div`
    display: grid;
    grid-template-columns: 70% 15% 15%;
    line-height: 40px;
`;

const DvGridData = styled.div`
    color: #343a40;
    font-size: 12px;
    a {
        margin-left :10px;
        text-decoration: none;
        font-size: 12px;        
    }    
    text-align: ${props => props.isTitle ? 'left' : 'center'};
`;

const DvPaging = styled.div`
    margin-top: 10px;
    border-top: solid 1px #ababab;
    display: grid;
    grid-template-columns: 25% 50% 25%;
    text-align: center;
`;

const DvPagingDv = styled.div`
    padding: 15px;
    text-align: center;
`;

const LiPageNum = styled.li`
    margin-right: 20px;
    list-style: none;
    display: inline-block;
    cursor: pointer;
`;

const DvNoData = styled.div`
    margin-top: 10px;
    margin-bottom: 10px;
    color: #ababab;
    text-align: center;
`;

function List({category, location}) {
    const [list, setList] = useState({
        data: [],        
        all_page: [],
        limit: 10,
    });

    const [page, setCurrentPage] = useState(1);
    const [search, setSearch] = useState(null);
    
    /*
     * 데이터 조회 함수 paaram => page 현재페이지
     */
    const listData = async (page) => {
    
        const {limit} = list;     
        
        let search = qs.parse(location.search, {
            ignoreQueryPrefix: true
        });
        
        setSearch(search.search);

        if (sessionStorage.getItem('category')){
            // eslint-disable-next-line react-hooks/exhaustive-deps
            category = sessionStorage.getItem('category');
        }
            

        const response = await axios.post('/get/board', {
            data: { limit: limit, page: page, search: search.search, category: category }
        });
        const total_cnt = await axios.post('/get/board_cnt', {
           data: { search: search.search, category: category } 
        });

        setList({ ...list, data: response.data, all_page: pagingCnt(total_cnt.data.cnt, list.limit) });
    };

    /*
     * 페이지 그룹 함수 
     * param => pageCnt: 전체 데이터 수, limit: 한 페이지 보여줄 데이터수
     */
    const pagingCnt = (pageCnt, limit) => {
        let pageArr = [];
        
        for(let i = 1; i <= Math.ceil(pageCnt / limit); i++)
            pageArr.push(i);

        return pageArr;
    }

    /*
     * 페이지 접속 시 세션페이지에 여부에 대해 현재 페이지 표시함수     
     */
    const setPage = () => {
        if(sessionStorage.page) {
            setCurrentPage(Number(sessionStorage.page));
            return Number(sessionStorage.page);
        }

        return 1;
    }

    /*
     * 페이지 변경 호출 함수 param => pagenum: 페이지번호
     */
    const changePage = (pagenum) => {
        
        setCurrentPage(Number(pagenum));
         
        sessionStorage.setItem('page', pagenum);     
        
        listData(pagenum); 
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {        
        listData(setPage());   
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const {data, all_page} = list;
    return (
        <DvList>
            <DvGridHeader>
                    <div>제목</div>
                    <div>조회수</div>
                    <div>날짜</div>
            </DvGridHeader>
            {
                data.length > 0 ? data.map(el => {
                    const view_url = '/view/' + el.board_id;
                    return (
                    <DvGridRow key={el.board_id}>
                        <DvGridData isTitle>
                            <Link to={view_url}>
                                { el.title }
                            </Link>
                        </DvGridData>
                        <DvGridData>{ el.view_cnt }</DvGridData>
                        <DvGridData>{ el.date.slice(0, 10) }</DvGridData>
                    </DvGridRow>
                    )
                })
                :
                <DvNoData>
                    {
                        search ? <div>검색된 결과가 없습니다.</div> : <div>조회 결과가 없습니다.</div>
                    }
                </DvNoData>
            }
            <DvPaging>
                <div></div>
                <DvPagingDv>
                    <ul>
                        {
                            all_page.map((pagenum) => {
                                return (
                                    pagenum === page ?
                                        <LiPageNum key={pagenum}>
                                            <b>{pagenum}</b>
                                        </LiPageNum>
                                        :
                                        <LiPageNum key={pagenum} onClick={() => changePage(pagenum)}> 
                                            {pagenum}                                           
                                        </LiPageNum>
                                )
                            })
                        }
                    </ul>
                    <Search searchValue={search} />
                </DvPagingDv>
                <div></div>
            </DvPaging>
        </DvList>
    )
}

export default List;

