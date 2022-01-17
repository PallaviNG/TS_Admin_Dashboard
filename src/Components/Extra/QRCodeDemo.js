import React, { useState,useRef } from "react";
import { Field, Form, Formik } from "formik";
import QRCode from "qrcode";
import QRReader from "react-qr-reader";

function QRCodeDemo() {
  let initialiValues = {
    qrName: "",
  };

//   const [text, setText] = useState("");
  const [imageURL, setImageURL] = useState("");
  const qrRef = useRef(null);
  const [scanResultFile,setScanResultFile] = useState('');
  const [scanResultWebcam,setScanResultWebcam] = useState('');

  let generateQRCode = async (values) => {
    console.log(values.qrName);
    // setText(values.qrName);
    try {
      const response = await QRCode.toDataURL(values.qrName);
      // console.log(response);
      setImageURL(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleErrorFile = (error) => {
      console.log(error);
  };

  const handleScanFile = (result) => {
      if(result) {
          setScanResultFile(result);
      }
  }

  const onScanFile = () => {
      qrRef.current.openImageDialog();
  }

  const handleErrorWebcam =(error) => {
      console.log(error);
  }

  const handleScanWebcam = (result) => {
      if(result) {
          setScanResultWebcam(result);
      }
  }

  return (
    <div className="content">
      <div className="formComponent">
        <h4 className="text-align-center">
          <span className="qrTitle">Generate, Download And Scan QR Code</span>
        </h4>
        <Formik initialValues={initialiValues} onSubmit={generateQRCode}>
          <Form>
            <div className="qrFormGroup">
              <label htmlFor="qrName">Enter Text Here</label>
              <Field
                name="qrName"
                autoComplete="off"
                // onChange={(e) => setText(e.target.value)}
              />
              <button
                className="btn btn-primary text-transform-uppercase"
                type="submit"
              >
                Generate
              </button>
            </div>
            <div className="flex justify-content-space-around mt-4">
              <div className="qrCard">
                {imageURL ? (
                  <a href={imageURL} download>
                    <img src={imageURL} alt="qr" />
                  </a>
                ) : null}
              </div>
              <div className="qrCard">
                  <button type="button" className="qrBtn" onClick={() => {onScanFile()}}>Scan QR Code</button>
                  <QRReader 
                    ref={qrRef}
                    delay={300}
                    style={{width:'80%'}}
                    onError={handleErrorFile}
                    onScan={handleScanFile}
                    legacyMode
                  />
                  <h5>Scanned Code:{scanResultFile}</h5>
              </div>
              <div className="qrCard">
                  <h5>QR Code Scan by Webcam</h5>
                  <QRReader 
                    delay={100}
                    style={{width:'100%'}}
                    onError={handleErrorWebcam}
                    onScan={handleScanWebcam}
                  />
                  <h5>Scanned by Webcam:{scanResultWebcam}</h5>
              </div>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default QRCodeDemo;
