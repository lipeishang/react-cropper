import React, {Component} from 'react';
import Crop from './Crop.jsx';
import Upload from 'antd/lib/upload'; 
import Icon from 'antd/lib/icon';
import message from 'antd/lib/message';
import 'antd/dist/antd.css';

const Main = React.createClass({
    getInitialState() {
        return {
            src: ''
        }
    },
    onChange(e) {
        const event = e || window.e;  // 获取事件对象
        let files;
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }

        if (event.dataTransfer) {
            files = event.dataTransfer.files;
        } else if (event.target) {
            files = event.target.files;   //  读取从系统来的文件
        } else {
            files = event.srcElement.files; 
        }
        const reader = new FileReader();  // IE11+ FireFox Chrome Safari
        reader.readAsDataURL(files[0]);     // readAsDataURL(file)：读取文件并将文件以数据URI的形式保存在result属性中。
        reader.onload = () => {             // onload：处理load事件。该事件在读取操作完成时触发。
            this.setState({ src: reader.result });
        };
    },
    render () {
        const Dragger = Upload.Dragger;

        const props = {
            name: 'file',
            multiple: true,
            action: '//jsonplaceholder.typicode.com/posts/',
            onChange(info) {
            const status = info.file.status;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
            },
        };

        return (
            <div>
                <Dragger>
                    <p className="ant-upload-drag-icon">
                        <Icon type="inbox" />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files</p>
                </Dragger>
                <input type="file" onChange={this.onChange} />
                <Crop src={this.state.src}/>
            </div>
        )
    }
})

export default Main;