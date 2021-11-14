import { Form, Popconfirm, Typography, Card, Button, List, Select, Space, Badge, Input } from 'antd';
import {  useState } from 'react';
import { Comment } from '../firebase/CommentInterface';
import useFirebaseDatabase from '../firebase/useFirebaseDatabase';
import Login from "../components/Login";
import { DeleteOutlined } from '@ant-design/icons';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
const { Option } = Select;
const { TextArea } = Input;
const { Title } = Typography;

const CommentForm = () => {
    const { user } = useContext(UserContext);

    const [form] = Form.useForm();

    const { save, deleteComment, update, documents, loading } = useFirebaseDatabase("Comment");
    const [selectedId, setSelectedId] = useState<string>("");

    const onFinish = (values: Comment) => {
        if (selectedId === "") {
            save(values).then(() => {
                form.resetFields();
            });
        } else {
            update(selectedId, values).then(() => {
                form.resetFields();
                setSelectedId("");
            });
        }
    };

    const ratings = ["Excelent", "Regular", "Bad"];

    const getRatingColor = (rating: string) => {
        switch (rating) {
            case "Excelent": return "green";
            case "Regular": return "yellow";
            case "Bad": return "red";
        }
    }

    return (
        <>
                {user?.uid !== undefined  &&
                    <>                       
                        <Form
                            form={form}
                            name="basic"
                            labelCol={{ xs: { span: 24 }, sm: { span: 12 }, md: { span: 8 }, lg: { span: 8 }}}
                            wrapperCol={{ xs: { span: 24 }, sm: { span: 12 }, md: { span: 12 }, lg: { span: 12 } }}
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                        >
                            <Form.Item wrapperCol={{ offset: 12}}>
                                <Title level={3}>Comments</Title>
                            </Form.Item>
                            
                            <Form.Item
                                label="Rating"
                                name="rating"
                                rules={[{ required: true, message: 'This field is required' }]}
                            >
                                <Select>
                                    {ratings.map((rating: string, index: number) =>
                                        <Option value={rating} key={index}>{rating}</Option>
                                    )}
                                </Select>
                            </Form.Item>

                            <Form.Item
                                label="Comment"
                                name="comment"
                                rules={[
                                    { required: true, message: 'This field is required' },
                                ]}
                            >
                                <TextArea rows={4} />
                            </Form.Item>

                            <Form.Item wrapperCol={{ offset: 12}}>
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </Form.Item>
                            </Form>
                            <List
                                grid={{ gutter: 16, column: 4 }}
                                dataSource={documents}
                                loading={loading}
                                renderItem={(item: Comment) => (
                                    <List.Item>
                                        <Badge.Ribbon text={item.rating} color={getRatingColor(item.rating)}>
                                            <Card title={<Typography.Text >{item.comment}</Typography.Text>}>
                                                <Space
                                                    direction="vertical">
                                                    <Space direction="horizontal">
                                                        <Popconfirm title="Eliminar?" onConfirm={() => deleteComment(item.id!)}>
                                                            <Button
                                                                icon={<DeleteOutlined />}
                                                                shape="circle"
                                                                type="primary"
                                                                danger />
                                                        </Popconfirm>
                                                    </Space>
                                                </Space>
                                            </Card>
                                        </Badge.Ribbon>
                                    </List.Item>
                                )}
                            />
                        </>
                        
                    }
        </>
    );
};
export default CommentForm
