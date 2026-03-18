import { createProductAPI } from "services/api";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import { Form, Input, message, Modal, Upload, type UploadFile, type UploadProps } from "antd"
import { useForm } from "antd/es/form/Form";
import type { UploadChangeParam } from "antd/es/upload";
import { useState } from "react";

const MAX_IMAGE_SIZE_MB = 10;

interface AddProductModalProps {
    open: boolean;
    closeModal: () => void;
    refetchProducts: () => void;
}

const AddProductModal = ({ open, closeModal, refetchProducts }: AddProductModalProps) => {

    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [files, setFiles] = useState<File[]>([]);
    const [submitting, setSubmitting] = useState(false);
    const [form] = useForm();
    const handleOnFinish = async (values: any) => {
        setSubmitting(true);
        const formData = new FormData();

        try {
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
        } catch (error) {
            const errorMessage = axios.isAxiosError(error)
                ? error.response?.data?.message || error.message
                : "Failed to create product";
            message.error(errorMessage);
        } finally {
            setSubmitting(false);
        }
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
                onCancel={() => {
                    if (!submitting) {
                        closeModal();
                    }
                }}
                okText={submitting ? "Adding..." : "Add Product"}
                okButtonProps={{ loading: submitting }}
                cancelButtonProps={{ disabled: submitting }}
                closable={!submitting}
                maskClosable={!submitting}
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
                    <Form.Item label="Short Description" name="shortDesc" rules={[{ required: true, message: 'Please enter the short description' }]}>
                        <Input.TextArea placeholder="Enter short description" />
                    </Form.Item>
                    <Form.Item label="Full Description" name="detailDesc" rules={[{ required: true, message: 'Please enter the full description' }]}>
                        <Input.TextArea placeholder="Enter full description" />
                    </Form.Item>

                    <Upload
                        multiple
                        maxCount={8}
                        listType="picture-card"
                        beforeUpload={(file) => {
                            const isValidSize = file.size / 1024 / 1024 <= MAX_IMAGE_SIZE_MB;
                            if (!isValidSize) {
                                message.error(`${file.name} must be ${MAX_IMAGE_SIZE_MB} MB or smaller.`);
                                return Upload.LIST_IGNORE;
                            }

                            return false;
                        }}
                        fileList={fileList}
                        onChange={handleFileChange}
                        disabled={submitting}
                        onPreview={(file) => {
                            const previewUrl = file.url ?? (file.thumbUrl || "");
                            if (previewUrl) {
                                window.open(previewUrl, "_blank");
                            }
                        }}
                    >
                        {fileList.length < 8 && (
                            <button type="button">
                                <PlusOutlined />
                                <div style={{ marginTop: 8 }}>Upload</div>
                            </button>
                        )}
                    </Upload>
                    <div style={{ color: "#64748b", fontSize: 13, marginTop: 8 }}>
                        Upload up to 8 product pictures. The first image becomes the cover image. Each image can be up to 10 MB.
                    </div>


                </Form>
            </Modal>
        </div>
    )
}
export default AddProductModal;
