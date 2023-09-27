import React, { useEffect } from "react";
import { BackgroundImage, PageContainer } from "../Shared/Styles";

const Principal = () => {
  useEffect(() => {
    window.watsonAssistantChatOptions = {
      integrationID: "841aa35d-942c-407d-a15b-3501d85ba53d", // The ID of this integration.
      region: "au-syd", // The region your integration is hosted in.
      serviceInstanceID: "2e7342fd-c964-4af5-9fa7-8e0b47d69506", // The ID of your service instance.
      onLoad: function (instance) {
        instance.render();
      },
    };
    setTimeout(function () {
      const t = document.createElement("script");
      t.src =
        "https://web-chat.global.assistant.watson.appdomain.cloud/versions/" +
        (window.watsonAssistantChatOptions.clientVersion || "latest") +
        "/WatsonAssistantChatEntry.js";
      document.head.appendChild(t);
    });
  }, []); // The empty dependency array means this effect will only run once, similar to `componentDidMount`

  return (
    <PageContainer container direction="column" color="#000000">
      <BackgroundImage />
    </PageContainer>
  );
};
export default Principal;
