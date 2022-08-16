import React, { useEffect, useState, useMemo } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { fetchNews } from "../actions/newsActions";
import { NewsPaperIcon, XIcon } from "../utilities/icons/icons";
import BarLoader from "react-spinners/BarLoader";
import moment from "moment";
import "moment/locale/tr";
import { AnimateSharedLayout, AnimatePresence, motion } from "framer-motion";

const portalRoot = document.getElementById("portal-root");

const SideNews = styled.div`
  overflow: scroll;
  z-index: 0;
  grid-area: sidebar;
  padding: 0.25rem;
  ::-webkit-scrollbar {
    background: transparent;
    height: 16px;
  }
  ::-webkit-scrollbar-thumb {
    background: rgba(128, 134, 139, 0.2);
    background-clip: padding-box;
    border: 4px solid transparent;
    border-radius: 10px;
    box-sizing: border-box;
  }
  ::-webkit-scrollbar-button {
    background: transparent;
  }
`;
const override = {
  display: "block",
  margin: "0 auto",
};
const SingularNews = styled.article`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  overflow: hidden;
  text-align: left;
  border: 1px solid #dadce0;
  padding: 20px;
  border-radius: 8px;
  height: 200px;
  margin-bottom: 10px;
`;

const SingularLeft = styled.div`
  display: flex;
  flex-direction: column;
  width: 75vh;
`;
const Span = styled.span`
  font-size: 0.7rem;
  opacity: 0.7;
  line-height: 2rem;
`;
const Paragraph = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

const SingularRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 25vh;
`;
const Link = styled.a`
  position: relative;
  display: flex;
  bottom: -10px;
  padding: 5px;
  font-size: 0.9rem;
  align-items: center;
  text-decoration: wavy;
  color: #1a73e8;
`;

const Image = styled.img`
  object-fit: cover;
  z-index: 1;
  width: 130px;
  height: 130px;
  overflow: hidden;
  border-radius: 8px;
`;
const Modal = styled(SideNews)`
  position: absolute;
  left: 100vh;
  right: 0;
  bottom: 0;
  z-index: 2022;
  border: 1px solid #dadce0;
  padding: 50px;
  border-radius: 8px;
  height: 75vh;
  width: 80vh;
  margin-bottom: 10px;
  background-color: #f1f3f4;
  opacity: 1;
  transition: all 0.3s ease-in-out;
  grid-area: none;
`;
const closeButton = {
  position: "absolute",
  cursor: "pointer",
  color: "#1a73e8",
  border: "0",
  top: "5px",
  right: "0px",
  width: "30px",
  height: "30px",
};
const ModalImage = styled.img`
  width: 100%;
  border-radius: 0 10px 10px 10px;
`;

const NewsList = () => {
  const convertRelativeTime = (date) => {
    return moment(date).locale("tr").fromNow();
  };
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const news = useSelector((state) => state.news.news);
  const location = useSelector((state) => state.map.locationState);
  const [selectedItem, setSelectedItem] = useState({});

  const restoreNews = (circle, location) => {
    let [plusLat, plusLng] = [location[0] + circle, location[1] + circle];
    let [minusLat, minusLng] = [location[0] - circle, location[1] - circle];
    return news.filter(
      (item) =>
        plusLat >= item.position[0] &&
        item.position[0] >= minusLat &&
        plusLng >= item.position[1] &&
        item.position[1] >= minusLng
    );
  };
  const modal = useMemo(() => {
    return ReactDOM.createPortal(
      <Modal>
        <AnimatePresence>
          (
          <motion.div layoutId={selectedItem}>
            <motion.button style={closeButton} onClick={() => setShow(false)}>
              <XIcon />
            </motion.button>
            <ModalImage src={selectedItem.image}></ModalImage>
            <motion.h3>{selectedItem.title}</motion.h3>
            <motion.p>{selectedItem.content}</motion.p>
          </motion.div>
          )
        </AnimatePresence>
      </Modal>,
      portalRoot
    );
  });

  useEffect(() => {
    dispatch(fetchNews());
  }, []);

  return (
    <SideNews>
      {loading ? (
        <BarLoader color={"#1a73e8"} css={override} height={8} width={200} />
      ) : (
        restoreNews(0.5, location).map((item, idx) => (
          <SingularNews
            key={idx}
            onClick={() => {
              setSelectedItem(item);
              setShow(true);
            }}
          >
            <AnimateSharedLayout type="crossfade">
              <SingularLeft>
                <h1>{item.title}</h1>
                <Span>
                  {item.weld} - {convertRelativeTime(item.createdOn)}
                </Span>
                <Paragraph>{item.content}</Paragraph>
                <Link>
                  <NewsPaperIcon />
                  İlgili Haberi Göster
                </Link>
              </SingularLeft>

              <SingularRight>
                <Image src={item.image}></Image>
              </SingularRight>
            </AnimateSharedLayout>
          </SingularNews>
        ))
      )}
      {show ? modal : null}
    </SideNews>
  );
};

export default NewsList;
