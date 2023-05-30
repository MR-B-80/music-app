import { useLayoutEffect, useRef, useState } from "react";
import { getTime } from "../../utils";
import "./styles.css";
import { Form } from "react-bootstrap";
type SliderProps = {
  audio?: any;
  size?: number;
  value?: number;
  onChange?: Function;
  onTouch?: Function;
  onTouchEnd?: Function;
  children?: React.ReactNode;
};

// let prevDeg: number = 0;

const Slider = ({
  value = 0,
  size = 240,
  children,
  audio,
  onChange,
  onTouch,
  onTouchEnd,
}: SliderProps) => {
  const isTouchDevice =
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    navigator.maxTouchPoints > 0;

  // const dialRef = useRef(null);
  const rangeRef = useRef(null);
  // const blockerRef = useRef(null);

  const [canSlide, setCanSlide] = useState(false);
  const [rangeValue, setRangeValue] = useState(0);

  const getPosition = (e: any) => {
    const pos = { x: 0, y: 0 };

    if (
      e.type === "touchstart" ||
      e.type === "touchmove" ||
      e.type === "touchend" ||
      e.type === "touchcancel"
    ) {
      const touch = (e as any).changedTouches[0];
      pos.x = touch.pageX;
      pos.y = touch.pageY;
    } else if (
      e.type === "mousedown" ||
      e.type === "mouseup" ||
      e.type === "mousemove" ||
      e.type === "mouseover" ||
      e.type === "mouseout" ||
      e.type === "mouseenter" ||
      e.type === "mouseleave"
    ) {
      pos.x = e.pageX;
      pos.y = e.pageY;
    }

    return pos;
  };

  const onSliderInit = (e: any) => {
    e.preventDefault();

    onTouch && onTouch();

    setCanSlide(true);
  };

  const onSliderStop = (e: any) => {
    console.log(e, "onSliderStop");
    e.preventDefault();

    onTouchEnd && onTouchEnd();

    setCanSlide(false);
  };

  const onSliderMove = (e: any) => {
    if (!canSlide) return;

    let position = getPosition(e);
    console.log(position);
    // let range: HTMLDivElement = rangeRef.current!;
    // console.log(position);
    // const rangeDimensions = range.getBoundingClientRect();
    // const bodyDimensions = document.body.getBoundingClientRect();

    // const coords = {
    //   x: position.x - (rangeDimensions.x - bodyDimensions.x),
    //   y: position.y - (rangeDimensions.y - bodyDimensions.y),
    // };

    // const radius = rangeDimensions.width / 2;
    // const atan = Math.atan2(coords.x - radius, coords.y - radius);
    // let deg = Math.ceil(-atan / (Math.PI / 180) + 180);

    // let normalizedDeg = deg;

    // if (prevDeg <= 90) normalizedDeg = 90;
    // if (prevDeg >= 270) normalizedDeg = 270;

    // const points = getPointsFromDeg(normalizedDeg);

    onChange && onChange(position.x);
  };

  const updateSlider = (deg: number) => {
    // const radius = size / 2;
    // const dial: HTMLInputElement = dialRef.current!;
    // const blocker: HTMLDivElement = blockerRef.current!;

    // const diff = (size / 10) * 0.5;
    // const x =
    //   Math.floor((radius - diff / 2) * Math.sin((deg * Math.PI) / 180)) +
    //   radius;
    // const y =
    //   Math.floor((radius - diff / 2) * -Math.cos((deg * Math.PI) / 180)) +
    //   radius;

    // blocker.style.width = `(${deg - 270})`;

    setRangeValue(deg);
  };

  // const getPointsFromDeg = (deg: number) =>
  //   Math.abs(150 - Math.ceil((deg * 100) / 180));

  // const getDegFromPoints = (points: number) =>
  //   Math.abs(Math.ceil((points / 100) * 180) - 270);

  useLayoutEffect(() => {
    updateSlider((value / audio.duration) * 100);
  });

  return (
    <div
      ref={rangeRef}
      className="slider"
      onMouseUp={(e) => false && !isTouchDevice && onSliderStop(e)}
      onTouchEnd={(e) => false && isTouchDevice && onSliderStop(e)}
      onMouseMove={(e) => false && !isTouchDevice && onSliderMove(e)}
      onTouchMove={(e) => false && isTouchDevice && onSliderMove(e)}
      onMouseDown={(e) => false && !isTouchDevice && onSliderInit(e)}
      onTouchStart={(e) => false && isTouchDevice && onSliderInit(e)}
      style={{ "--size": `${size}px`, "--dial-size": `${size / 10}px` } as any}
    >
      {/* <input type="range" min="0" max="100"></input> */}
      <div className="slider__track">
        <Form.Range
          value={rangeValue}
          onChange={(e) => {
            onChange?.(e.target.value);
          }}
          className="slider__blocker"
        />
      </div>
      <div className="slider__info">{children}</div>
      {/* <div
        className="slider__dial"
        onDrag={(e) => {
          // console.log(e);
        }}
        tabIndex={0}
      ></div> */}
      {/* <div className="slider__start"></div> */}
      {/* <div className="slider__end"></div> */}
      {/* <div className="slider__currtime">
        {audio && audio.currentTime ? getTime(audio.currentTime) : ""}
      </div> */}
      <div className="slider__totaltime">
        {audio && audio.duration ? getTime(audio.duration) : ""}
      </div>
      <div className="slider__totaltime_now">{value ? getTime(value) : ""}</div>
    </div>
  );
};

export default Slider;
