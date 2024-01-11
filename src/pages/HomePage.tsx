import {
  Backdrop,
  Button,
  Checkbox,
  CircularProgress,
  Divider,
  Pagination,
  Slider,
  TextField,
} from "@mui/material";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import DownloadImage from "../assets/images/download.png";
import React, {
  ChangeEventHandler,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import ReactPlayer from "react-player";
import axios from "axios";
import { Image, Root } from "../extras/types";
import SingleComponent from "../components/SingleComponent";
import ImageComponent from "../components/ImageComponent";
import { v4 as uuidv4 } from "uuid";

import FeatureIntro from "../components/FeatureIntro";
import { ColorContext } from "../extras/ColorContext";

const API_BASE_URL = `http://192.168.1.88:9999/extras/v1/api/parsing/site-screenshot?siteUrl=`;

function HomePage(props: any) {
  const colorContex = useContext(ColorContext);
  const [videoUrl, setVideoUrl] = useState("");
  const [inVideoUrl, setInVideoUrl] = useState("");
  const [audioResponse, setAudioResponse] = useState<any>();
  const [playVideo, setPlayVideo] = useState(false);
  const [isTermsAggred, setIsTermsAggred] = useState(false);
  const [isDownloadSuccess, setIsDownloadSuccess] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [imageSrc, setImageSrc] = useState<any>(null);
  const scrollRef = useRef<any>(null);

  const playerRef = useRef<any>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [seek, setSeek] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [volume, setVolume] = useState(0);
  const [enableControls, setEnableControls] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [loop, setLoop] = useState(false);
  const [lightMode, setLightMode] = useState(false);
  const [played, setPlayed] = useState(0);
  const [loaded, setLoaded] = useState(0);

  useEffect(() => {
    scrollToDiv();
    //setIsDownloadSuccess(true);
    // setDisplayedItems(audioResponse.links.slice(0, itemsPerPage));
    return () => {};
  }, [colorContex.color]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  function closeBackdrop() {
    setTimeout(() => {
      handleClose();
    }, 3000);
  }

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): any {
    setVideoUrl(event.target.value);
    if (videoUrl !== "" || videoUrl.includes("youtu")) {
      //setPlayVideo(true);
    } else {
      setPlayVideo(false);
    }
  }

  function handleCheckboxChange(checked: boolean) {
    setIsTermsAggred(checked);
    //setPlayVideo(checked);
  }

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setSeek(newValue as number);
  };

  const handleVolumeChange = (event: Event, newValue: number | number[]) => {
    setSeek(newValue as number);
  };

  function handleVideoPlay(): any {
    // if (videoUrl === "" || !videoUrl.startsWith("http://")) {
    //   alert("A Valid Website URL is Required!!");
    //   return;
    // }
    setPlayVideo(true);
    // window.open(videoUrl, "_blank");
  }

  function scrollToDiv() {
    scrollRef.current.scrollIntoView();
  }

  const backdrop = (
    <React.Fragment>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <div className="flex flex-col items-center">
          <CircularProgress color="inherit" />
          <h1 className="font-extrabold m-2 text-white text-xl">
            Communicating with server...
          </h1>
        </div>
      </Backdrop>
    </React.Fragment>
  );

  

  return (
    <div
      ref={scrollRef}
      className="md:m-10 sm:m-5 flex flex-col items-center justify-center"
    >
      {backdrop}
      <FeatureIntro
        heading="Only screenshot capturer tool you need"
        desc="Ditch generic keywords and discover powerful, untapped gems with our advanced scraper. Say goodbye to endless brainstorming and hello to targeted content that dominates search engines. No more tedious manual research. Automate your keyword discovery, freeing up your time for crafting content that truly shines."
      />
      <div className="flex flex-col items-center border border-gray-400 shadow-lg p-4">
        <TextField
          fullWidth
          value={videoUrl}
          onChange={handleChange}
          id="url-input"
          label="Enter Website Link To Capture"
          variant="outlined"
        />

        <div className="flex items-center justify-center mt-4">
          <Checkbox onChange={(e) => setIsFullScreen(e.target.checked)} />
          <h3 className="text-sm text-center font-bold">
            {isFullScreen
              ? "Capture full-screen screenshot"
              : "Capture viewport(vh) visible only screenshot"}
          </h3>
        </div>

        <Button
          onClick={handleVideoPlay}
          sx={{ marginTop: "20px", marginBottom: "10px", width: "200px" }}
          variant="contained"
        >
          Take Screenshot
        </Button>
        <Button
          onClick={handleVideoPlay}
          sx={{ width: "200px", marginTop: "10px", marginBottom: "15px" }}
          variant="outlined"
        >
          Visit Website
        </Button>
        <h3 className="text-xs text-center w-80 m-2">
          A direct list of result will get triggered if file has only one format
          else a list of downloadable file will get presented.
        </h3>
        <div className="flex items-center justify-center">
          <Checkbox onChange={(e) => handleCheckboxChange(e.target.checked)} />
          <h3 className="text-xs text-center m-2">
            By capturing screenshot of 3rd party websites you agree to our terms
            & conditions for fair usages policy
          </h3>
        </div>
        <Divider color="black" />
      </div>

      <br />
      <br />
      {isDownloadSuccess && (
        <div className="border-2 text-center border-blue-500 shadow-sm p-4 mb-8">
          <div className="flex flex-col items-center md:flex-row font-mono mb-5 justify-center">
            <h3 className="font-bold text-xl">
              Screenshot Capturing Successful
            </h3>
            <img
              className="m-2"
              width="30px"
              height="30px"
              alt="download"
              src={DownloadImage}
            />
            <img
              className="animate-ping"
              width="30px"
              height="30px"
              alt="download"
              src={DownloadImage}
            />
          </div>
        </div>
      )}

      <img alt="screenshot-file" className="mt-5 mb-8" src={imageSrc} />

      {playVideo && (
        <div className="w-full sm:w-50px lg:w-1/2 mt-10 mb-10">
          <ReactPlayer
            ref={playerRef}
            playing={isPlaying}
            width="100%"
            loop={true}
            controls={true}
            pip={true}
            volume={1}
            url={videoUrl}
          />
        </div>
      )}

    
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}

export default HomePage;
