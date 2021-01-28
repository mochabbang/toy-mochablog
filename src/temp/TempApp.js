import React, {useState, useEffect} from 'react';
import './App.css';
import TeacherCreate from './Temp/TeacherCreate';
import Teachers from './Temp/Teachers';
import axios from 'axios';

function App() {

  const [inputs, setInputs] = useState({
      teachername: '',
  });
  const [name, setName] = useState('');
  const [teachers, setLists] = useState({
      name: '',
      lists: [],
      update: false,
  });

  const getData = async() => {
    const response = await axios.get('/get/data');
  
    if(response.data[0] === undefined) {
        let cover = [];
        cover.push(response.data);

        setLists({ ...teachers, lists: cover });
    }
    
    setLists({ ...teachers, lists: response.data });
    
  };     

  const onToggle = (e) => {
      const { name, value } = e.target;
      setInputs({
          ...inputs,
          [name]: value
      });
      setName(value);
  };

  const onSubmit = async(e) => {
      e.preventDefault();

      const response = await axios('/add/data', {
        method: 'post',
        data: { 'data': name },
        headers: new Headers()
      });

      if(response.data) {
          alert('데이터를 추가했습니다.');
          
          setInputs({
            teachername: '',
          });
          
          getData();
      }
  }

  const onModify = async(e) => {
      const modify = prompt(e.name + '을 어떤 이름으로 변경할까요?');

      if(modify) {
        const body = {
          name: modify,
          id: e.id
        }

        const response = await axios('/modify/data', {
          method: 'post',
          data: { 'modify': body },
          headers: new Headers()
        });

        if(response.data) {
          alert('데이터를 수정했습니다.');

          getData();
        }
      }
  }

  const onRemove = async(e) => {
    const remove = window.confirm(e.name + '을 삭제합니까?');

    if (remove) {
      const body = { id: e.id };
      const response = await axios('/delete/data', {
        method: 'POST',
        data: {'delete': body},
        headers: new Headers()
      });

      if (response.data)  {
        alert('데이터를 삭제했습니다.');

        getData();
      }
    }
  }

  useEffect(() => { getData() }, []);
  
  const { lists } = teachers;
  

  return (    
    <div className='App'>
       <h3> Welcome to <u>Who</u> Whats!</h3>
       <br />
       
       <TeacherCreate onToggle={onToggle} onSubmit={onSubmit} teachername={inputs.teachername} />

       <br /><br />

       <Teachers lists={lists} onModify={onModify} onRemove={onRemove} />
       
    </div>
  );
}

export default TempApp;
