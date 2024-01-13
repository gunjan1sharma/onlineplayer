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
    return () => {};
  }, [colorContex.point]);

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

  function handleOpenVideo() {
    if (!isTermsAggred) {
      alert("Please Agree with our Terms & Condition before procedding..");
      return;
    }
    if (videoUrl === "" || !videoUrl.startsWith("https://")) {
      alert("A Valid Website URL [https://www] is Required!!");
      return;
    }

    window.open(videoUrl, "_blank");
  }

  function handleVideoPlay(): any {
    if (!isTermsAggred) {
      alert("Please Agree with our Terms & Condition before procedding..");
      return;
    }
    if (videoUrl === "" || !videoUrl.startsWith("https://")) {
      alert("A Valid Website URL [https://www] is Required!!");
      return;
    }
    setInVideoUrl(videoUrl);
    setPlayVideo(true);
    setVideoUrl("");
  }

  function scrollToDiv() {
    if (colorContex.point !== 0) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
      colorContex.setPoint(0);
    }
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
        heading="Uncage the Video Universe: Play Anything, Anywhere⚡️"
        desc="Tired of jumping between platforms to watch videos?  Break free from the shackles of YouTube blocks, frustrating social media embeds, and limited formats! Online Player is your all-in-one video playground, unleashing the full potential of the web! Just drop a URL or upload your file, and watch in glorious playback – YouTube, Facebook, Instagram, even niche social media gems, we've got you covered!"
        subheading="But wait, there's more!  Go beyond social media with native support for all your favorite video formats: MP4, MP3, M3U8, WebM – you name it, we play it! Claim your freedom to watch ANYTHING, ANYTIME ➡️"
      />
      <div className="flex flex-col items-center border border-gray-400 shadow-lg p-4">
        <TextField
          fullWidth
          value={videoUrl}
          onChange={handleChange}
          id="url-input"
          label="Enter Video URL"
          variant="outlined"
        />

        <Button
          onClick={handleVideoPlay}
          sx={{ marginTop: "20px", marginBottom: "10px", width: "200px" }}
          variant="contained"
        >
          Play Video
        </Button>
        <Button
          onClick={handleOpenVideo}
          sx={{ width: "200px", marginTop: "10px", marginBottom: "15px" }}
          variant="outlined"
        >
          Open Video
        </Button>
        <h3 className="text-xs text-center w-80 m-2">
          We provide the data "as is" with no guarantees of accuracy or
          completeness. Use it at your own risk and comply with relevant laws
          and regulations.
        </h3>
        <div className="flex items-center justify-center">
          <Checkbox onChange={(e) => handleCheckboxChange(e.target.checked)} />
          <h3 className="text-xs text-center">
            You agree to use this tool for legitimate purposes only, respecting
            user privacy and avoiding misuse of location data.
          </h3>
        </div>
        <Divider color="black" />
      </div>

      <br />
      <br />
      {playVideo && (
        <div className="border-2 text-center border-blue-500 shadow-sm p-4 mb-8">
          <div className="flex flex-col items-center md:flex-row font-mono mb-5 justify-center">
            <h3 className="font-bold text-xl">Video Started Playng</h3>
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
            url={inVideoUrl}
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
