import { message } from "antd";
import Button from "antd/es/button";
import Form from "antd/es/form";
import Input from "antd/es/input";
import api from "../api";

const formItemLayout = {
  labelCol: { span: 0 },
  wrapperCol: { span: 24 },
} as const

type RegisterForm = {
  username: string
  password: string
  password2: string
}

async function onFinish(value: RegisterForm) {
  if (value.password2 !== value.password) {
    message.error('两次输入的密码不一致')
    return
  }
  try {
    const res = await api.post('/user/register', {
      username: value.username,
      password: value.password,
    })
    if (res.status === 200 || res.status === 201) {
      message.success('注册成功')
      window.location.replace('/login')
    }
  } catch (e: any) {
    message.error(e.response.data.message)
  }
}

export function Register() {
  return <div className='w-[500px] mx-auto my-[100px] text-center'>
    <h1 className="text-black">图书管理系统</h1>
    <Form onFinish={onFinish} labelCol={{span:4}} wrapperCol={{span:20}} colon={false} autoComplete="off">
      <Form.Item label='用户名' name='username' rules={[{ required: true, message: '请输入用户名' }]}>
        <Input></Input>
      </Form.Item>
      <Form.Item label='密码' name='password' rules={[{ required: true, message: '请输入密码' }]}>
        <Input.Password></Input.Password>
      </Form.Item>
      <Form.Item label='确认密码' name='password2' rules={[{ required: true, message: '请输入密码' }]}>
        <Input.Password></Input.Password>
      </Form.Item>
      <Form.Item {...formItemLayout}>
        <div className="flex justify-center">
          <a href="/login">已有账号？去登录</a>
        </div>
      </Form.Item>
      <Form.Item {...formItemLayout}>
        <Button className="w-[100%]" type='primary' htmlType="submit">注册</Button>
      </Form.Item>
    </Form>
  </div>
}