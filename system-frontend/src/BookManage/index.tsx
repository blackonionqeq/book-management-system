import { Button, Card, Form, Input, message, Popconfirm } from 'antd';
import { useEffect, useState } from 'react';
import api from '../api';
import { CreateBookModal } from './CreateBookModal';
import { UpdateBookModal } from './UpdateBookModal';

interface Book {
  id: number;
  name: string;
  author: string;
  description: string;
  cover: string;
}

export function BookManage(){
  const [bookList, setBookList] = useState<Book[]>([])
  const [name, setName] = useState('')
  const [createModalShow, setCreateModalShow] = useState(false)
  const [updateModalShow, setUpdateModalShow] = useState(false)
  const [updateId, setUpdateId] = useState(0);

  async function fetchData() {
    console.log('try fetch')
    try {
      const data = await api.get<Book[]>('/book/list', {
        params: { name }
      })
      if ([200,201].includes(data.status)) setBookList(data.data)
    } catch (e: any) {
      message.error(e.response.data.message)
    }
  }
  function search({name}:{name: string}) {
    setName(name)
  }
  async function handleDelete(id: number) {
    try {
      await api.delete(`/book/delete/${id}`);        
      message.success('删除成功');
      fetchData()
    } catch(e: any) {
      message.error(e.response.data.message);
    }
  }

  useEffect(() => {
    fetchData()
  }, [name])
  return <div className="flex flex-col">
    <CreateBookModal isOpen={createModalShow} handleClose={() => {
      setCreateModalShow(false)
      fetchData()
    }}></CreateBookModal>
    <UpdateBookModal id={updateId} isOpen={updateModalShow} handleClose={() => {
      setUpdateModalShow(false);
      fetchData()
    }}></UpdateBookModal>

    <h1 className='h-[80px] leading-20 pl-5'>图书管理系统</h1>
    <div className="p-5">
      <div className='book-search'>
        <Form
          name="search"
          layout='inline'
          colon={false}
          onFinish={search}
        >
          <Form.Item label="图书名称" name="name">
            <Input  />
          </Form.Item>
          <Form.Item label=" ">
            <Button type="primary" htmlType="submit">
              搜索图书
            </Button>
            <Button type="primary" htmlType="submit" style={{background: 'green'}} onClick={() => setCreateModalShow(true)}>
              添加图书
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div className="p-5 flex flex-wrap">
        {
          bookList.map(book => {
            return <Card
              className='ml-[30px] mb-[30px]'
              hoverable
              style={{ width: 300 }}
              key={book.id}
              cover={<img alt="example" src={`http://localhost:3000/${book.cover}`} />}
            >
              <h2>{book.name}</h2>
              <div>{book.author}</div>
              <div className='flex flex-row justify-around'>
                <a href="#">详情</a>
                <a href="#" onClick={() => {
                  setUpdateId(book.id);
                  setUpdateModalShow(true);
                }}>编辑</a>

                <Popconfirm
                  title="图书删除"
                  description="确认删除吗？"
                  onConfirm={() => handleDelete(book.id)}
                  okText="Yes"
                  cancelText="No"
                >  
                  <a href="#">删除</a>
                </Popconfirm>

              </div>
            </Card>
          })
        }    
      </div>
    </div>
  </div>
}
