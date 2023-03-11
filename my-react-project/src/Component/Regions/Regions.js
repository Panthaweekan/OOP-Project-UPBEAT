import Hexice from "./Hexagon/Hexice";
import React, { useState, useEffect } from "react";
import { useRef } from "react";
import "./map.css";
import { AnimatePresence, motion } from "framer-motion";
import HexPosition from "../HexPosition/HexPosition";

function Regions() {
  const [data, setData] = useState(null);
  const [check, setCheck] = useState(false);
  const [show, setShow] = useState(false);
  const [scale , setScale] =  useState(1);
  const constraintsRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/hexgrid`);
        const result = await response.json();
        setData(result);
        setCheck(true);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  if (check) {
    console.log(data);
  }

  const showUI = () => {
    setShow(true);
  };

  const hideUI = () => {
    setShow(false);
  };

  const zoomIn = () => {
    if (scale < 1.5) {
      setScale(scale + 0.1);
    }
  };

  const zoomOut = () => {
    if (scale > 0.3) {
      setScale(scale - 0.1);
    }
  };

  return (
    <>
      <div onClick={zoomIn}>Zoom In</div>
      <div onClick={zoomOut}>Zoom Out</div>
      <motion.div className="container" ref={constraintsRef}>
        <motion.div drag className="Map" dragConstraints={constraintsRef}>
          <div style={{ display: "flex", transform: `scale(${scale})` }}>
            {data &&
              data[0].map((item, indexColumn) => {
                return (
                  <div
                    key={"row" + indexColumn}
                    style={{
                      width: 200 - 200 / 4 + 3.5,
                    }}
                    className={
                      indexColumn % 2 === 0 ? "oddHex" : "evenHex"
                    }
                  >
                    {data.map((rowitem, indexRow) => {
                      return (
                        <Hexice
                          namespace={`${indexColumn}` + `${indexRow}`}
                          key={`${indexColumn}` + `${indexRow}`}
                          onClick={showUI}
                        />
                      );
                    })}
                  </div>
                );
              })}
          </div>
        </motion.div>
      </motion.div>
      <AnimatePresence>
        {show && (
          <motion.div
            className="HexPosition"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <HexPosition />
            <div className="x" onClick={hideUI}></div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Regions;
