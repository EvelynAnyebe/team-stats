import React, { useEffect, useState, useRef } from "react";
import "../styles.css";
import { Container, Header } from "semantic-ui-react";
import ArticleList from "./ArticleList";

const NewsAPI = ({ coordinates }) => {
   const [articles, setArticles] = useState([]);

   const isMounted = useRef(true);

   const news_coords = coordinates[0].toString() + ";" + coordinates[1].toString();

   console.log(news_coords);

   useEffect(() => {
      const fetchNews = async () => {
         await fetch(
            "https://bing-news-search1.p.rapidapi.com/news?safeSearch=Off&textFormat=Raw",
            {
               method: "GET",
               headers: {
                  "x-bingapis-sdk": "true",
                  "x-search-location": news_coords,
                  "x-rapidapi-host": "bing-news-search1.p.rapidapi.com",
                  "x-rapidapi-key": process.env.REACT_APP_NEWS_API_KEY,
               },
            }
         )
            .then((res) => res.json())
            .then((response) => {
               if (isMounted) {
                  const articlesList = response.value.slice(0, 2);
                  setArticles(articlesList);
               }
            })
            .catch((err) => {
               console.error(err);
            });
      };

      fetchNews();
      return () => {
         isMounted.current = false;
      };
      //    eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   return (
      <Container>
         <div style={{ backgroundColor: "#01579b", borderRadius: "20px" }}>
            <Header as="h2" style={{ textAlign: "center", margin: 0 }}>
               News
            </Header>
            <div
               style={{
                  marginBottom: "1%",
               }}
            >
               {articles.length > 0 && <ArticleList articles={articles} />}
            </div>
         </div>
      </Container>
   );
};

export default NewsAPI;
