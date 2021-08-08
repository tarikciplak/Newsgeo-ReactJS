import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createNews } from "../actions/newsActions";
import styled from "styled-components";
import ReactDOM from "react-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { AddImage, CloudUploadImage, XIcon } from "../utilities/icons/icons";
import FileBase64 from "react-file-base64";

const portalRoot = document.getElementById("portal-root");

let welds = [
  "Tarik",
  "Haber Global",
  "Sabah",
  "Sözcü",
  "HaberTürk",
  "BBC News",
  "Hürriyet",
  "CNN Türk",
  "Cumhuriyet",
  "Ege Haber",
];

let newsCreateSchema = yup.object().shape({
  title: yup.string().min(10).required(),
  content: yup.string().min(25).required(),
  weld: yup.string().required(),
  tags: yup.string(),
  position: yup.array().required(),
  createdOn: yup.date().default(function () {
    return new Date();
  }),
});
const Background = styled.div`
  z-index: 2022;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 1;
  transition: all 0.2s ease-in-out;
`;
const Content = styled.div`
  height: 80vh;
  width: 60vh;
  display: flex;
  position: absolute;
  flex-direction: column;
  background-color: white;
  border-radius: 2rem;
  box-shadow: 0px 3px 5px 3px rgba(0, 0, 0, 0.2);
`;

const Input = styled.input`
  border: 1px solid rgb(207, 217, 222);
  border-radius: 4px;
  width: 95%;
  height: 50px;
  &:focus {
    outline: none;
    border: 2px solid #174ea6;
  }
`;
const BackImage = styled.img`
  object-fit: cover;
  position: absolute;
  height: 30vh;
  width: 60vh;
  border-radius: 9px 9px 0px 0px;
`;
const FormContent = styled.form`
  display: flex;
  flex-direction: column;
  background-color: white;
  position: relative;
  width: 50vh;
  height: 55vh;
  margin-top: 20vh;
  margin-left: 4vh;
  padding: 1vh;
  border-radius: 8px;
  box-shadow: 0 5px 5px 5px rgba(0, 0, 0, 0.2);
`;

const TextArea = styled.textarea`
  ::placeholder {
    font-size: 20px;
  }
  width: 91%;
  height: 50%;
  margin-top: 10px;
  padding: 12px;
  border-radius: 4px;
  resize: vertical;
  border: 1px solid rgb(207, 217, 222);
  &:focus {
    outline: none;
    border: 2px solid #174ea6;
  }
`;

const Button = styled.button`
  display: flex;
  cursor: pointer;
  background: transparent;
  color: #1a73e8;
  align-items: center;
  height: 40px;
  width: 120px;
  padding: 0 15px;
  border: 2px solid #1a73e8;
  border-radius: 4px;
  overflow: visible;
  &:hover {
    color: #174ea6;
    background: rgba(26, 115, 232, 0.04);
    text-decoration: none;
  }
`;
const AddImageButton = styled.div`
  display: flex;
  position: relative;
  height: 35px;
  width: 35px;
  background-color: transparent;
  color: #1a73e8;
  border: 0px solid;
`;

const CancelButton = styled.button`
  background-color: transparent;
  position: absolute;
  z-index: 5;
  right: 8px;
  top: 8px;
  color: white;
  width: 40px;
  border: 0;
  cursor: pointer;
`;
const ButtonsDiv = styled.div`
  margin-top: 15px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const AddNews = ({ show, onClose }) => {
  const [image, setImage] = useState(null);
  const [position, setPosition] = useState([]);
  const dispatch = useDispatch();
  const closeOnEscapeKeyDown = (e) => {
    if ((e.charCode || e.keyCode) === 27) {
      onClose();
      formik.resetForm();
    }
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
      weld: "",
      createdOn: Date.now(),
    },
    onSubmit: (data) => {
      dispatch(createNews({ ...data, position, image }));
      formik.resetForm();
    },
    newsCreateSchema,
  });
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setPosition([
        position.coords.latitude.toFixed(6),
        position.coords.longitude.toFixed(6),
      ]);
    });
    document.body.addEventListener("keydown", closeOnEscapeKeyDown);
    return function cleanup() {
      document.body.removeEventListener("keydown", closeOnEscapeKeyDown);
    };
  }, []);

  if (!show) return null;

  return ReactDOM.createPortal(
    <Background>
      <Content>
        <div>
          <CancelButton
            type="reset"
            onClick={() => {
              onClose();
              formik.resetForm();
            }}
          >
            <XIcon />
          </CancelButton>
          <BackImage src="/modal-background.jpg" />
        </div>

        <FormContent onSubmit={formik.handleSubmit}>
          <label htmlFor="title">Başlık</label>
          <Input
            id="title"
            name="title"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.title}
          />
          <label htmlFor="weld">Kaynak</label>
          <Input
            id="weld"
            name="weld"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.weld}
          />
          <label htmlFor="content"></label>
          <TextArea
            wrap="hard"
            placeholder="Neler Oluyor?"
            id="content"
            name="content"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.content}
          />
          <ButtonsDiv>
            <AddImageButton>
              <AddImage />
              <div
                style={{
                  opacity: "0",
                  position: "absolute",
                  top: "0",
                  right: "0px",
                }}
              >
                <FileBase64
                  multiple={false}
                  onDone={({ base64 }) => setImage(base64)}
                ></FileBase64>
              </div>
            </AddImageButton>
            <div>
              <Button type="submit">
                <CloudUploadImage />
                Yayınla
              </Button>
            </div>
          </ButtonsDiv>
        </FormContent>
      </Content>
    </Background>,
    portalRoot
  );
};

export default AddNews;
