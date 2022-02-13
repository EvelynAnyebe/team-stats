import React from "react";
import { Image, List } from "semantic-ui-react";

const ArticleItem = (props) => {
   const { article } = props;
   return (
      <div style={{ display: "flex", flexDirection: "row" }}>
         <div style={{ flexDirection: "column", width: "90%" }}>
            <div style={{ fontSize: "2em" }}>{article.name}</div>
            <div>{article.description}</div>
         </div>
         <div>
            <Image src={article.image.thumbnail.contentUrl} />
         </div>
      </div>
   );
};

const ArticleList = ({ articles }) => {
   return (
      <List divided style={{ maxWidth: 900, margin: "0 auto" }}>
         {articles.map((article, index) => (
            <ArticleItem article={article} key={article.name + index} />
         ))}
      </List>
   );
};

export default ArticleList;
