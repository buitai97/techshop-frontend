import { PlusOutlined } from "@ant-design/icons";
import { Form, Image, Input, Modal, Upload, type GetProp, type UploadFile, type UploadProps } from "antd"
import { useState } from "react";

interface AddProductModalProps {
    open: boolean;
    handleOk: () => void;
    handleCancel: () => void;
}

const images = [
    "https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg",
    "https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg",
    "https://media.istockphoto.com/id/814423752/photo/eye-of-model-with-colorful-art-make-up-close-up.jpg?s=612x612&w=0&k=20&c=l15OdMWjgCKycMMShP8UK94ELVlEGvt7GmB_esHWPYE="
];

const AddProductModal = ({ open, handleOk, handleCancel }: AddProductModalProps) => {
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [files, setFiles] = useState<File[]>([]);
    return (
        <div>
            <Modal
                title="Add Product"
                open={open}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form>
                    <Form.Item label="Product Name">
                        <Input placeholder="Enter product name" />
                    </Form.Item>
                    <Form.Item label="Price">
                        <Input placeholder="Enter price" />
                    </Form.Item>
                    <Form.Item label="Quantity">
                        <Input placeholder="Enter quantity" />
                    </Form.Item>
                    <Form.Item label="Brand">
                        <Input placeholder="Enter brand" />
                    </Form.Item>
                    <Form.Item label="Category">
                        <Input placeholder="Enter category" />
                    </Form.Item>
                    <Form.Item label="Short Description">
                        <Input.TextArea placeholder="Enter short description" />
                    </Form.Item>
                    <Form.Item label="Full Description">
                        <Input.TextArea placeholder="Enter full description" />
                    </Form.Item>

                    <Upload
                        multiple
                        listType="picture-card"
                        fileList={fileList}
                        beforeUpload={() => false}
                        onChange={({ fileList: newFileList }) => {
                            setFileList(newFileList);

                            const realFiles = newFileList
                                .map(f => f.originFileObj)
                                .filter(Boolean) as File[];

                            setFiles(realFiles);
                        }}
                    >
                        {fileList.length < 8 && "+ Upload"}
                    </Upload>


                </Form>
            </Modal>
        </div>
    )
}

export default AddProductModal;