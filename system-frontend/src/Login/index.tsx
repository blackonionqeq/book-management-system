import { Button, Form, Input, message } from 'antd/es';
import { api } from '../api';
// import './index.css';

interface LoginUser {
	username: string;
	password: string;
}


const layout1 = {
	labelCol: { span: 4 },
	wrapperCol: { span: 20 }
}

const layout2 = {
	labelCol: { span: 0 },
	wrapperCol: { span: 24 }
}


async function onFinish(value: LoginUser) {
  try {
    const res = await api.post('/user/login', {
      username: value.username,
      password: value.password,
    })
    if (res.status === 200 || res.status === 201) {
      message.success('登录成功')
      window.location.assign('/')
    }
  } catch (e: any) {
    message.error(e.response.data.message)
  }
}

export function Login() {
	return <div className="w-[500px] mx-auto my-[100px] text-center">
		<h1>图书管理系统</h1>
		<Form
				{...layout1}
				onFinish={onFinish}
				colon={false}
				autoComplete="off"
		>
			<Form.Item
				label="用户名"
				name="username"
				rules={[{ required: true, message: '请输入用户名!' }]}
			>
				<Input />
			</Form.Item>

			<Form.Item
				label="密码"
				name="password"
				rules={[{ required: true, message: '请输入密码!' }]}
			>
				<Input.Password />
			</Form.Item>

			<Form.Item
				{...layout2}
			>
				<div className='flex justify-center'>
					<a href='/register'>没有账号？去注册</a>
				</div>
			</Form.Item>

			<Form.Item
				{...layout2}
			>
				<Button className='w-[100%]' type="primary" htmlType="submit">
					登录
				</Button>
			</Form.Item>
		</Form>
	</div>
}
