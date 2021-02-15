import React, {useState, useRef, useCallback, useEffect} from 'react'
import Webcam from "react-webcam";
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css';

const generateDownload = (canvas, crop) => {
  if (!crop || !canvas) {
    return;
  }

  canvas.toBlob(
    (blob) => {
      const previewUrl = window.URL.createObjectURL(blob);
      const anchor = document.createElement('a');

      anchor.download = 'cropPreview.png';
      anchor.href = URL.createObjectURL(blob);
      anchor.click();

      window.URL.revokeObjectURL(previewUrl);
    },
    'image/png',
    1
  );
}



    const AvatarMaker = () => {
        const webcamRef = useRef(null);
        const [imgSrc, setImgSrc] = useState(null);
      
        const capture = useCallback(() => {
          const imageSrc = webcamRef.current.getScreenshot();
          setImgSrc(imageSrc);
        }, [webcamRef, setImgSrc]);

        const [isShown, setIsShown] = useState(false);

        const handleCamera = () => setIsShown(!isShown);

        const imgRef = useRef(null);
        const previewCanvasRef = useRef(null);
        const [crop, setCrop] = useState({ 
          unit: '%',
          width: 50,
          x: 25,
          y: 15,
          aspect: 1 
        });
        const [completedCrop, setCompletedCrop] = useState(null);


        const onLoad = useCallback((img) => {
          imgRef.current = img;
        }, []);

        useEffect(() => {
          if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
            return;
          }

          const image = imgRef.current;
          const canvas = previewCanvasRef.current;
          const crop = completedCrop;

          const scaleX = image.naturalWidth / image.width;
          const scaleY = image.naturalHeight / image.height;
          const ctx = canvas.getContext('2d');
          const pixelRatio = window.devicePixelRatio;

          canvas.width = crop.width * pixelRatio;
          canvas.height = crop.height * pixelRatio;
        
          ctx.beginPath();
          ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
          ctx.imageSmoothingQuality = 'high';
          ctx.arc(crop.width/2, crop.width/2, crop.height/2, 0, Math.PI*2, true);
          ctx.closePath();
          ctx.fill();
          ctx.globalCompositeOperation = 'source-in';
          ctx.drawImage(
              image,
              crop.x * scaleX,
              crop.y * scaleY,
              crop.width * scaleX,
              crop.height * scaleY,
              0,
              0,
              crop.width,
              crop.height
            );

          }, [completedCrop]);

        return (
          <>
            <h1>Avatar maker</h1>
            <button onClick={handleCamera}>Create avatar</button>
            {isShown && <div className="webcam-block">
                <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                />
                <button onClick={capture}>Capture photo</button>
                </div>
            }

         <ReactCrop
              src={imgSrc}
              onImageLoaded={onLoad}
              crop={crop}
              circularCrop='1'
              onChange={(c) => setCrop(c)}
              onComplete={(c) => setCompletedCrop(c)}
            />
            <div>
              <canvas
                ref={previewCanvasRef}
                style={{
                  width: Math.round(completedCrop?.width ?? 0),
                  height: Math.round(completedCrop?.height ?? 0)
                }}
              />
            </div>
            {<button
              type="button"
              disabled={!completedCrop?.width || !completedCrop?.height}
              onClick={() =>
                generateDownload(previewCanvasRef.current, completedCrop)
              }
            >
              Download cropped image
            </button> }
          </>
        );
      };

export default AvatarMaker