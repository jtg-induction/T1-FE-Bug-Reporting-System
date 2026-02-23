import { useNavigate } from "react-router-dom";

import { BasicPage } from "@components";

import { ERROR_PAGE_DATA } from "./ErrorPage.config";
export const ErrorPage = () => {
  const navigate = useNavigate();
  const handleButton = () => void navigate("/");

  return (
    <>
      <BasicPage
        src={ERROR_PAGE_DATA.src}
        alt="Business Woman"
        text={ERROR_PAGE_DATA.text}
        subtext={ERROR_PAGE_DATA.subtext}
        handleButton={handleButton}
        buttonText={ERROR_PAGE_DATA.buttonText}
      />
    </>
  );
};
