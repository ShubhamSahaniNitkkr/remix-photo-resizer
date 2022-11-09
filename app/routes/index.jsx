import { useState, useCallback, useRef } from "react";
import {
  Card,
  Button,
  Grid,
  Group,
  Text,
  Image,
  Flex,
  createStyles,
  Slider,
  FileButton,
} from "@mantine/core";
import Cropper from "react-easy-crop";
import {
  IconRotateDot,
  IconCloudUpload,
  IconDownload,
  IconCamera,
  IconPhoto,
} from "@tabler/icons";
import getCroppedImg, { dataURLtoFile, generateDownload } from "../helpers";
import { generateUploadURL } from "../s3.js";

import { profilePicGuide, sliderMarks } from "../data";

const useStyles = createStyles((theme, _params) => {
  return {
    cardBody: {
      padding: `${theme.spacing.xs}px 0px`,
      marginBottom: "5px",
    },
    btn: {
      marginTop: "5px",
      fontWeight: 500,
    },
    guideTitle: {
      fontWeight: 900,
      marginBottom: theme.spacing.md * 1,
    },
    guideBody: {
      fontWeight: 100,
      "& p": {
        margin: 0,
        fontSize: "13px",
        borderBottom: "1px solid gainsboro",
        paddingBottom: "10px",
        width: "100%",
      },
    },
    lastChild: {
      borderBottom: "1px solid transparent !important",
    },
    noImageBox: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "#7e75f2",
      height: "40vh",
    },
    cropperBox: {
      height: "60vh",
    },
    cropperBox: {
      height: "60vh",
    },
    selfieBox: {
      height: "71vh",
    },
    sliderBox: {
      padding: "10px",
    },
  };
});

const Home = () => {
  const { classes, cx } = useStyles();
  const videoRef = useRef(null);
  const photoRef = useRef(null);
  const [image, setImage] = useState(null);
  const [croppedArea, setCroppedArea] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [selfie, setSelfie] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedArea(croppedAreaPixels);
  }, []);
  const onChooseImage = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.addEventListener("load", () => {
        setImage(reader.result);
      });
      closeCamera();
    }
  };

  const resetFn = () => {
    setImage(null);
    setCroppedArea(null);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
  };

  const onUpload = async () => {
    if (image) {
      const canva = await getCroppedImg(image, croppedArea);
      const canvaDataToURL = canva.toDataURL("image/jpeg");
      const convertedURLToFile = dataURLtoFile(
        canvaDataToURL,
        "new-image.jpeg"
      );

      // const url = await generateUploadURL();
      // console.log(url, "url");

      // // post the image direclty to the s3 bucket
      // await fetch(url, {
      //   method: "PUT",
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //   },
      //   body: convertedURLToFile,
      // });

      // const imageUrl = url.split("?")[0];
      // console.log(imageUrl);
      // console.log("done");
    }
  };

  if (typeof window === "undefined") return null;

  const getVideo = (isenabled = false) => {
    navigator.mediaDevices
      .getUserMedia({
        video: {
          width: window.innerWidth * 0.465,
          height: window.innerHeight * 0.75,
        },
      })
      .then((stream) => {
        let video = videoRef.current;
        let photo = photoRef.current;
        if (isenabled) {
          video.width = window.innerWidth * 0.465;
          video.height = window.innerHeight * 0.75;
        }
        photo.width = 0;
        photo.height = 0;
        video.srcObject = stream;
        video.play();
      })
      .catch((e) => console.log(e));
  };

  const takePhoto = () => {
    const width = window.innerWidth * 0.465;
    const height = window.innerHeight * 0.75;

    let video = videoRef.current;
    let photo = photoRef.current;

    photo.width = width;
    photo.height = height;

    video.width = 0;
    video.height = 0;

    let ctx = photo.getContext("2d");
    ctx.drawImage(video, 0, 0, width, height);
    setImage(ctx);
    setSelfie(true);
  };

  const closeCamera = () => {
    let photo = photoRef.current;
    let ctx = photo.getContext("2d");
    ctx.clearRect(0, 0, photo.width, photo.height);
    videoRef.current.srcObject.getTracks().forEach((track) => {
      track.stop();
    });
    setSelfie(false);
    setShowVideo(false);
  };

  const renderSelfieComponent = () => {
    return (
      <>
        <Card shadow="sm" p="lg" radius="xs" className={classes.selfieBox}>
          <Card.Section className={classes.cardBody}>
            <canvas ref={photoRef} id="canvas" />
            <video ref={videoRef} />
          </Card.Section>
        </Card>
        <br />
      </>
    );
  };

  const renderGuideCard = () => {
    return (
      <Grid.Col span={4}>
        <Card withBorder shadow="sm" radius="md">
          <Card.Section withBorder inheritPadding py="xs">
            <Group className={classes.guideTitle} position="apart">
              <Text>Profile picture Guide</Text>
            </Group>
            <Group position="apart" className={classes.guideBody}>
              {profilePicGuide.map(({ title, content }, idx) => (
                <p
                  className={
                    idx === profilePicGuide.length - 1 ? classes.lastChild : ""
                  }
                >
                  <Text span c="gray" inherit>
                    {title}
                  </Text>
                  {content}
                </p>
              ))}
            </Group>
          </Card.Section>
        </Card>
      </Grid.Col>
    );
  };

  const renderActionBtns = () => {
    return (
      <Flex justify="space-between" align="center" direction="row">
        <Flex justify="space-between" align="center" direction="row" gap={10}>
          <Button
            variant="filled"
            color={showVideo ? (selfie ? "primary" : "green") : "violet"}
            className={classes.btn}
            size="sm"
            radius="xl"
            leftIcon={<IconCamera size={20} />}
            onClick={() => {
              if (showVideo) {
                if (selfie) {
                  getVideo(true);
                } else {
                  takePhoto();
                  videoRef.current.srcObject.getTracks().forEach((track) => {
                    track.stop();
                  });
                }
              } else {
                setShowVideo(true);
                setImage(false);
                getVideo();
              }
            }}
          >
            {showVideo ? (selfie ? "Retake" : "Click") : "Capture picture"}
          </Button>
          <FileButton
            onChange={setImage}
            accept="image/*"
            onChange={onChooseImage}
          >
            {(props) => (
              <Button
                variant="filled"
                color={image ? "green" : "violet"}
                className={classes.btn}
                size="sm"
                radius="xl"
                leftIcon={<IconPhoto size={20} />}
                {...props}
              >
                {image ? "Picture selected" : "Choose Picture"}
              </Button>
            )}
          </FileButton>
        </Flex>
        <Flex justify="space-between" align="center" direction="row" gap={10}>
          <Button
            variant="filled"
            color="violet"
            className={classes.btn}
            size="sm"
            radius="xl"
            leftIcon={<IconDownload size={20} />}
            disabled={!image}
            title={
              image
                ? "Click to download image"
                : "Please click or upload image first"
            }
            onClick={() => generateDownload(image, croppedArea)}
          >
            Download
          </Button>
          <Button
            variant="filled"
            color="violet"
            className={classes.btn}
            size="sm"
            radius="xl"
            leftIcon={<IconCloudUpload size={20} />}
            disabled={!image}
            onClick={onUpload}
          >
            Upload
          </Button>
        </Flex>
      </Flex>
    );
  };

  const renderCropper = () => {
    return (
      <div className="container-cropper">
        {image ? (
          <>
            <div className={cx(classes.cropperBox, "cropper")}>
              <Cropper
                image={image}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
                style={{
                  height: "30vh",
                }}
              />
              <br />
            </div>
          </>
        ) : (
          <Image height="60vh" src="./assets/no-image.jpg" alt="no-image" />
        )}
      </div>
    );
  };

  const renderCropperContainer = () => {
    return (
      <>
        <Card shadow="sm" p="lg" radius="xs">
          <Card.Section className={classes.cardBody}>
            {renderCropper()}
            <br />
            {renderSlider()}
          </Card.Section>
        </Card>
        <br />
      </>
    );
  };

  const renderSlider = () => {
    return (
      <div className={classes.sliderBox}>
        <Slider
          disabled={!image}
          thumbSize={20}
          defaultValue={1}
          color="violet"
          step={1}
          marks={sliderMarks}
          styles={(theme) => ({
            markLabel: { color: "#7e75f2", fontWeight: "bold" },
          })}
          onChange={(zoom) => {
            setZoom(zoom / 10);
          }}
        />
      </div>
    );
  };

  const renderCardHeadings = () => {
    return (
      <Card.Section withBorder inheritPadding py="xs">
        <Flex justify="space-between" align="center" direction="row">
          <div>
            <Group position="apart">
              <Text weight={800} size="xl">
                Profile picture
              </Text>
            </Group>
            <Group position="apart">
              <Text weight={200} color="gray">
                Capture or choose a picture from your device.
              </Text>
            </Group>
          </div>
          <Button
            variant="filled"
            color="violet"
            className={classes.btn}
            size="sm"
            radius="xl"
            leftIcon={<IconRotateDot size={20} />}
            disabled={!image}
            onClick={() => resetFn()}
          >
            Reset
          </Button>
        </Flex>
      </Card.Section>
    );
  };

  return (
    <Grid>
      <Grid.Col span={8}>
        <Card shadow="sm" p="lg" radius="md" withBorder>
          {renderCardHeadings()}
          {showVideo ? renderSelfieComponent() : renderCropperContainer()}
          {renderActionBtns()}
        </Card>
      </Grid.Col>
      {renderGuideCard()}
    </Grid>
  );
};

export default Home;
