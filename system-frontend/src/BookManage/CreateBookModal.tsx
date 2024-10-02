import { Button, Form, Input, Modal, message } from "antd";
import { useForm } from "antd/es/form/Form";
import TextArea from "antd/es/input/TextArea";
import api from "../api";
import { CoverUpload } from "./CoverUpload";

interface CreateBookModalProps {
    isOpen: boolean;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    handleClose: Function
}
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 }
}

export interface CreateBook {
    name: string;
    author: string;
    description: string;
    cover: string;
}

export function CreateBookModal(props: CreateBookModalProps) {

  const [form] = useForm<CreateBook>();

  const handleOk = async function() {
    await form.validateFields()
    const value = form.getFieldsValue()
    try {
      const res = await api.post('/book/create', {
        name: value.name,
        author: value.author,
        description: value.description,
        cover: value.cover,
      })
      if ([200, 201].includes(res.status)) {
        message.success('创建书籍成功')
        form.resetFields()
        props.handleClose()
      }
    } catch (e: any) {
      message.error(e.response.data.message)
    }
  }

  return <Modal title="新增图书" open={props.isOpen} onOk={handleOk} onCancel={() => props.handleClose()} cancelText='取消' okText={'创建'}>
    <Form
      form={form}
      colon={false}
      {...layout}
    >
      <Form.Item
        label="图书名称"
        name="name"
        rules={[
          { required: true, message: '请输入图书名称!' },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="作者"
        name="author"
        rules={[
          { required: true, message: '请输入图书作者!' },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="描述"
        name="description"
        rules={[
          { required: true, message: '请输入图书描述!' },
        ]}
      >
        <TextArea/>
      </Form.Item>
      <Form.Item
        label="封面"
        name="cover"
        rules={[
          { required: true, message: '请上传图书封面!' },
        ]}
      >
        <CoverUpload></CoverUpload>
      </Form.Item>
    </Form>
  </Modal>
}
