import React from "react";
import ReactPlayer from "react-player";
import {
  Container,
  Card,
  Box,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle, faPause } from "@fortawesome/free-solid-svg-icons";
import { shuffle } from "lodash";
import { data } from "./playlist";

const playList = shuffle(data);
const Player = () => {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const handlePlay = () => {
    setIsPlaying((prevState) => !prevState);
  };

  const handlePlayNext = () => {
    if (currentIndex === playList.length - 1) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex((prevState) => prevState + 1);
    }
  };

  return (
    <Container
      sx={{
        height: "100vh",
        background: "no-repeat 0% 20% url('FM.svg')",
        backgroundSize: "100%",
        display: "flex",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <Card
        sx={{
          boxShadow: "none",
          background: "none",
          marginTop: "180px",
        }}
      >
        <CardMedia component="img" image="radio.png" />
        <Box sx={{ marginTop: "24px" }}>
          <Typography variant="h6">{playList[currentIndex].name}</Typography>
          <Typography variant="subtitle2" sx={{ opacity: 0.5 }}>
            {playList[currentIndex].artist}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "24px",
            columnGap: "24px",
            height: "40px",
          }}
        >
          <IconButton
            onClick={handlePlay}
            sx={{ fontSize: isPlaying ? "24px" : "40px", width: "32px" }}
          >
            {isPlaying ? (
              <FontAwesomeIcon icon={faPause} />
            ) : (
              <FontAwesomeIcon icon={faPlayCircle} />
            )}
          </IconButton>
        </Box>
      </Card>
      <Box sx={{ position: "absolute", bottom: "0", zIndex: "-1" }}>
        <ReactPlayer
          url={playList[currentIndex].url}
          playing={isPlaying}
          onEnded={handlePlayNext}
        />
      </Box>
    </Container>
  );
};

export default Player;
