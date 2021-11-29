import React from "react";
import ReactDOM from "react-dom/server";
import { extractCritical } from "emotion-server";
import { renderToStringWithData } from "@apollo/client/react/ssr";

//import App from "./App";
//import Aside from "./features/Aside/Aside";
// import TopHeader from "./features/Header/Header";
// import { Link } from "react-router-dom";
import Main from "./Main.page";
// import Normalize from "./Normalize";
const fs = require("fs");

// const Main = () => {
//   return (
//     <React.Fragment>
//       <div>QWE</div>
//       <div>HOHO</div>
//     </React.Fragment>
//   );
// };

const r = renderToStringWithData(<Main />).then((content) => {
  const { ids, css, html } = extractCritical(content);

  return ReactDOM.renderToString(
    <React.Fragment>
      <html>
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          <meta property="og:type" content="website" />
          <meta
            property="og:title"
            content="Сравнить цены на лекарства и ветеринарные услуги онлайн - WebRx"
          />
          <meta
            property="og:description"
            content="Справочная цен на лекарства в аптеках по всем городам, актуальная стоимость на 2021 год, онлайн проверка наличия. Сравнение цен на услуги ветеринара."
          />
          <meta property="og:url" content="https://webrx.ru/" />
          <meta
            property="og:image"
            content="https://webrx.ru/f7578d37eab95108db8cf957b7c1545b.jpg"
          />
          <meta property="og:site_name" content="WebRx" />
          <meta
            name="keywords"
            content="цены на лекарства,сравнение цен на лекарства, сравнение услуг ветеринара, стоимость лекарств онлайн цена на лекарства онлайн,сайт сравнения цен лекарств,стоимость лекарств в аптеках"
          />
          <script type="application/ld+json">{structuredSeoData}</script>
          <link href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.11.2/antd.css" />
          <style
            data-emotion-css={ids.join(" ")}
            dangerouslySetInnerHTML={{ __html: css }}
          />
          <title>Dashboard 1.0</title>
        </head>
        <body>
          <div id="root" dangerouslySetInnerHTML={{ __html: html }} />
          <script src="/client.js" />
        </body>
      </html>
    </React.Fragment>
  );
});

r.then((res) => {
  fs.writeFile("./build/index.html", `<!DOCTYPE html>${res}`, function (err) {
    if (err) {
      return console.error(err);
    }
    console.log("The file was saved!");
  });
}).catch((err) => console.error(err));

const structuredSeoData = () => {
  let seoData = {
    "@context": "http://schema.org",
    "@type": "WebSite",
    name: "Сравнить цены на лекарства и ветеринарные услуги онлайн - WebRx",
    description:
      "Справочная цен на лекарства в аптеках по всем городам, актуальная стоимость на 2021 год, онлайн проверка наличия. Сравнение цен на услуги ветеринара.",
    url: "https://webrx.ru",
    image: "https://webrx.ru/f7578d37eab95108db8cf957b7c1545b.jpg",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "251",
    },
    alternateName: "WebRx",
    keywords:
      "цены на лекарства,сравнение цен на лекарства, сравнение услуг ветеринара, стоимость лекарств онлайн, цена на лекарства онлайн,сайт сравнения цен лекарств,стоимость лекарств в аптеках",
  };

  return JSON.stringify(seoData);
};
