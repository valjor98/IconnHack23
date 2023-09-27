import React, { useEffect, useState } from "react";
import { Button, Grid, Typography } from "@mui/material";
import { PageContainer } from "../Shared/Styles";

import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import SentimentNeutralIcon from "@mui/icons-material/SentimentNeutral";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";

import * as faceapi from "face-api.js";

const FaceRecognition = () => {
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [captureVideo, setCaptureVideo] = useState(false);

  const [faceDetected, setFaceDetected] = useState(false);
  const [emotion, setEmotion] = useState("");

  const videoRef = React.useRef();
  const videoHeight = 480;
  const videoWidth = 640;
  const canvasRef = React.useRef();

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = "/models";

      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
      ]).then(() => {
        setModelsLoaded(true);
      });
    };
    loadModels();
  }, []);

  const startVideo = () => {
    setCaptureVideo(true);
    navigator.mediaDevices
      .getUserMedia({ video: { width: 300 } })
      .then((stream) => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch((err) => {
        console.error("error:", err);
      });
  };

  const handleVideoOnPlay = () => {
    setInterval(async () => {
      if (canvasRef && canvasRef.current) {
        canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(
          videoRef.current
        );
        const displaySize = {
          width: videoWidth,
          height: videoHeight,
        };

        faceapi.matchDimensions(canvasRef.current, displaySize);

        const detections = await faceapi
          .detectAllFaces(
            videoRef.current,
            new faceapi.TinyFaceDetectorOptions()
          )
          .withFaceLandmarks()
          .withFaceExpressions();

        const resizedDetections = faceapi.resizeResults(
          detections,
          displaySize
        );

        if (detections.length > 0) {
          setFaceDetected(true);

          let maxValue = detections[0].expressions.neutral;
          let maxEmotion = "neutral";
          for (const [key, value] of Object.entries(
            detections[0].expressions
          )) {
            console.log(key);
            if (value >= maxValue) {
              maxValue = value;
              maxEmotion = key;
            }
            setEmotion(maxEmotion);
          }
        } else {
          setFaceDetected(false);
        }

        canvasRef &&
          canvasRef.current &&
          canvasRef.current
            .getContext("2d")
            .clearRect(0, 0, videoWidth, videoHeight);
        canvasRef &&
          canvasRef.current &&
          faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
        canvasRef &&
          canvasRef.current &&
          faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedDetections);
        canvasRef &&
          canvasRef.current &&
          faceapi.draw.drawFaceExpressions(
            canvasRef.current,
            resizedDetections
          );
      }
    }, 100);
  };

  const closeWebcam = () => {
    videoRef.current.pause();
    videoRef.current.srcObject.getTracks()[0].stop();
    setCaptureVideo(false);
  };

  return (
    <PageContainer>
      <Grid container direction="column" alignItems="center">
        <Grid item>
          <Grid marginBottom="1rem">
            {captureVideo && modelsLoaded ? (
              <Button
                onClick={closeWebcam}
                style={{
                  cursor: "pointer",
                  backgroundColor: "#028262",
                  color: "white",
                  padding: "15px",
                  fontSize: "25px",
                  border: "none",
                  borderRadius: "10px",
                }}
              >
                <Typography
                  textTransform="none"
                  color="#ffffff"
                  fontSize="1.8rem"
                >
                  Terminar
                </Typography>
              </Button>
            ) : (
              <Button
                onClick={startVideo}
                style={{
                  cursor: "pointer",
                  backgroundColor: "#028262",

                  padding: "15px",
                  border: "none",
                  borderRadius: "10px",
                }}
              >
                <Typography
                  textTransform="none"
                  color="#ffffff"
                  fontSize="1.8rem"
                >
                  Activar
                </Typography>
              </Button>
            )}
          </Grid>
        </Grid>
        {captureVideo ? (
          modelsLoaded ? (
            <Grid item width="100%">
              <Grid
                style={{
                  display: "flex",
                  justifyContent: "center",
                  padding: "10px",
                  width: "100%",
                }}
              >
                <video
                  width="100%"
                  ref={videoRef}
                  height={videoHeight}
                  onPlay={handleVideoOnPlay}
                  style={{ borderRadius: "10px" }}
                  playsinline
                />
                <canvas ref={canvasRef} style={{ position: "absolute" }} />
              </Grid>
            </Grid>
          ) : (
            <Grid>Cargando...</Grid>
          )
        ) : (
          <></>
        )}

        <Grid
          item
          sx={{
            backgroundColor: "#ffffff",
            borderRadius: "1rem",
            boxShadow: "0.1rem 0.1rem 0.5rem 0.1rem rgba(0,0,0,0.2)",
          }}
        >
          {emotion ? (
            emotion === "happy" ? (
              <Grid container padding="1rem 1rem">
                <Grid item>
                  <SentimentSatisfiedAltIcon
                    sx={{
                      color: "rgba(16,186,1,1)",
                      width: "3rem",
                      height: "3rem",
                    }}
                  />
                </Grid>
                <Grid item>
                  <Typography
                    fontSize="2rem"
                    paddingLeft="0.5rem"
                    fontWeight="600"
                    color="rgba(16,186,1,1)"
                  >
                    Feliz
                  </Typography>
                </Grid>
              </Grid>
            ) : emotion === "neutral" ? (
              <Grid container padding="1rem 1rem">
                <Grid item>
                  <SentimentNeutralIcon
                    sx={{
                      color: "rgba(225,203,12,1)",
                      width: "3rem",
                      height: "3rem",
                    }}
                  />
                </Grid>
                <Grid item>
                  <Typography
                    fontSize="2rem"
                    paddingLeft="0.5rem"
                    fontWeight="600"
                    color="rgba(225,203,12,1)"
                  >
                    Neutral
                  </Typography>
                </Grid>
              </Grid>
            ) : emotion === "sad" ? (
              <Grid container padding="1rem 1rem">
                <Grid item>
                  <SentimentVeryDissatisfiedIcon
                    sx={{
                      color: "rgba(1,86,186,1)",
                      width: "3rem",
                      height: "3rem",
                    }}
                  />
                </Grid>
                <Grid item>
                  <Typography
                    fontSize="2rem"
                    paddingLeft="0.5rem"
                    fontWeight="600"
                    color="rgba(1,86,186,1)"
                  >
                    Triste
                  </Typography>
                </Grid>
              </Grid>
            ) : emotion === "angry" ? (
              <Grid container padding="1rem 1rem">
                <Grid item>
                  <SentimentVeryDissatisfiedIcon
                    sx={{
                      color: "rgba(186,1,1,1)",
                      width: "3rem",
                      height: "3rem",
                    }}
                  />
                </Grid>
                <Grid item>
                  <Typography
                    fontSize="2rem"
                    paddingLeft="0.5rem"
                    fontWeight="600"
                    color="rgba(186,1,1,1)"
                  >
                    Enojado
                  </Typography>
                </Grid>
              </Grid>
            ) : emotion === "fearful" ? (
              <Grid container padding="1rem 1rem">
                <Grid item>
                  <SentimentVeryDissatisfiedIcon
                    sx={{
                      color: "rgba(166,166,166,1)",
                      width: "3rem",
                      height: "3rem",
                    }}
                  />
                </Grid>
                <Grid item>
                  <Typography
                    fontSize="2rem"
                    paddingLeft="0.5rem"
                    fontWeight="600"
                    color="rgba(166,166,166,1)"
                  >
                    Temerosa
                  </Typography>
                </Grid>
              </Grid>
            ) : emotion === "disgusted" ? (
              <Grid container padding="1rem 1rem">
                <Grid item>
                  <SentimentVeryDissatisfiedIcon
                    sx={{
                      color: "rgba(166,166,166,1)",
                      width: "3rem",
                      height: "3rem",
                    }}
                  />
                </Grid>
                <Grid item>
                  <Typography
                    fontSize="2rem"
                    paddingLeft="0.5rem"
                    fontWeight="600"
                    color="rgba(166,166,166,1)"
                  >
                    Disgustado
                  </Typography>
                </Grid>
              </Grid>
            ) : emotion === "surprised" ? (
              <Grid container padding="1rem 1rem">
                <Grid item>
                  <SentimentVeryDissatisfiedIcon
                    sx={{
                      color: "rgba(255,229,0,1)",
                      width: "3rem",
                      height: "3rem",
                    }}
                  />
                </Grid>
                <Grid item>
                  <Typography
                    fontSize="2rem"
                    paddingLeft="0.5rem"
                    fontWeight="600"
                    color="rgba(255,229,0,1)"
                  >
                    Sorprendido
                  </Typography>
                </Grid>
              </Grid>
            ) : (
              ""
            )
          ) : (
            ""
          )}
        </Grid>

        <Grid>{faceDetected ? "Cambio detectado" : ""}</Grid>
      </Grid>
    </PageContainer>
  );
};

export default FaceRecognition;
