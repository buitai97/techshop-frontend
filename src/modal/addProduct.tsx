import { createProductAPI } from "services/api";
import { PlusOutlined } from "@ant-design/icons";
import { Form, Input, message, Modal, Upload, type UploadFile, type UploadProps } from "antd"
import { useForm } from "antd/es/form/Form";
import type { UploadChangeParam } from "antd/es/upload";
import { useState } from "react";

interface AddProductModalProps {
    open: boolean;
    closeModal: () => void;
    refetchProducts: () => void;
}

const AddProductModal = ({ open, closeModal, refetchProducts }: AddProductModalProps) => {

    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [files, setFiles] = useState<File[]>([]);
    const [form] = useForm();
    const handleOnFinish = async (values: any) => {
        const formData = new FormData();

        // append form fields
        Object.entries(values).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                formData.append(key, String(value));
            }
        });

        // append image
        files.forEach(file => {
            formData.append("image", file);
        });

        await createProductAPI(formData);
        message.success("Product created");

        setFileList([]);
        setFiles([]);
        refetchProducts();
        form.resetFields();
        closeModal();
    }

    const handleFileChange: UploadProps['onChange'] = (info: UploadChangeParam) => {
        setFileList(info.fileList)
        const realFiles = info.fileList
            .map(f => f.originFileObj)
            .filter(Boolean) as File[];

        setFiles(realFiles);
    }
    return (
        <div>
            <Modal
                title="Add Product"
                open={open}
                onOk={form.submit}
                onCancel={closeModal}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleOnFinish}
                >
                    <Form.Item label="Product Name" name="name" rules={[{ required: true, message: 'Please enter the product name' }]}>
                        <Input placeholder="Enter product name" />
                    </Form.Item>
                    <Form.Item label="Price" name="price" rules={[{ required: true, message: 'Please enter the price' }]}   >
                        <Input placeholder="Enter price" />
                    </Form.Item>
                    <Form.Item label="Quantity" name="quantity" rules={[{ required: true, message: 'Please enter the quantity' }]}>
                        <Input placeholder="Enter quantity" />
                    </Form.Item>
                    <Form.Item label="Brand" name="brand" rules={[{ required: true, message: 'Please enter the brand' }]}   >
                        <Input placeholder="Enter brand" />
                    </Form.Item>
                    <Form.Item label="Category" name="category" rules={[{ required: true, message: 'Please enter the category' }]}>
                        <Input placeholder="Enter category" />
                    </Form.Item>
                    <Form.Item label="Short Description" name="shortDesc">
                        <Input.TextArea placeholder="Enter short description" />
                    </Form.Item>
                    <Form.Item label="Full Description" name="detailDesc">
                        <Input.TextArea placeholder="Enter full description" />
                    </Form.Item>

                    <Upload
                        maxCount={1}
                        listType="picture-card"
                        beforeUpload={() => false}
                        fileList={fileList}
                        onChange={handleFileChange}
                    >
                        {fileList.length < 1 && (
                            <button type="button">
                                <PlusOutlined />
                                <div style={{ marginTop: 8 }}>Upload</div>
                            </button>
                        )}
                    </Upload>


                </Form>
            </Modal>
        </div>
    )
}
export default AddProductModal;