import * as React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";


const Container = styled.div`
 background: #f1f3f4;
  width: 50px;
  height: 50px;
  display: flex;
  place-content: center;
  overflow: hidden;
  border-radius: 5px;
  -webkit-box-shadow: 6px 8px 9px -4px rgba(0,0,0,0.21); 
box-shadow: 6px 8px 9px -4px rgba(0,0,0,0.21);
`

const icon = {
    hidden: {
        opacity: 1,
        pathLength: 1,
        fill: "rgba(255, 255, 255, 255)"
    },
    visible: {
        opacity: 1,
        pathLength: 1,
        fill: "rgba(26, 115, 232, 1)"
    }
};

export const Logo = () => {

    return (
        <Container >


            <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="item"
            >
                <motion.path
                    d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" variants={icon}
                    initial="hidden"
                    animate="visible"
                    transition={{
                        default: { duration: 1, ease: "easeInOut" },
                        fill: { duration: 2, ease: [2, 1, 0.8, 2] }
                    }}
                />
            </motion.svg>


        </Container>
    )
}
