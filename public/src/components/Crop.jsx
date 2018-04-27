import React, {Component} from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

const Crop = React.createClass({
    getInitialState() {
        return {
            cropResult: ''
        }
    },
    cropImage() {
      if (typeof this.cropper.getCroppedCanvas() === 'undefined') {
        return;
      }
      this.setState({
        cropResult: this.cropper.getCroppedCanvas().toDataURL()
      });
    },

    render() {
      const { src } = this.props;
      return (
        <div>
          <div style={{ width: '100%' }}>
            <Cropper
              style={{ height: 400, width: '100%' }}
              aspectRatio={16 / 9}
              preview=".img-preview"
              guides={false}
              src={src}
              ref={cropper => { this.cropper = cropper; }}
            />
          </div>
          <div>
            <div className="box" style={{ width: '50%', float: 'right' }}>
              <h1>Preview</h1>
              <div className="img-preview" style={{ width: '100%', float: 'left', height: 300 }} />
            </div>
            <div className="box" style={{ width: '50%', float: 'right' }}>
              <h1>
                <span>Crop</span>
                <button onClick={this.cropImage} style={{ float: 'right' }}>
                  Crop Image
                </button>
              </h1>
              <img style={{ width: '100%' }} src={this.state.cropResult} alt="cropped image" />
            </div>
          </div>
          <br style={{ clear: 'both' }} />
        </div>
      );
    }
  })

  export default Crop;