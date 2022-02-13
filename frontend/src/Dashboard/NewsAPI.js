import React, { useEffect, useState, useRef } from "react";
import "../styles.css";
import { Container, Header } from "semantic-ui-react";
import ArticleList from "./ArticleList";

const NewsAPI = () => {
   const [articles, setArticles] = useState([]);

   const isMounted = useRef(true);

   useEffect(() => {
      const fetchNews = async () => {
         await fetch(
            "https://bing-news-search1.p.rapidapi.com/news?safeSearch=Off&textFormat=Raw",
            {
               method: "GET",
               headers: {
                  "x-bingapis-sdk": "true",
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
         <Header as="h2" style={{ textAlign: "center", margin: 20 }}>
            News
         </Header>
         {articles.length > 0 && <ArticleList articles={articles} />}
      </Container>
   );
};

export default NewsAPI;
