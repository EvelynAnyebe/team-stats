import React from "react";
import { Grid, Header, Image, List } from "semantic-ui-react";

const ArticleItem = (props) => {
   const { article } = props;
   return (
      <List.Item style={{ padding: 30 }}>
         <Grid>
            <Grid.Column
               width={0.8}
               style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  backgroundColour: "red",
               }}
            >
               <Header as="h3">{article.name}</Header>

               <List.Description style={{ margin: "20px 0" }}>
                  {article.description}
               </List.Description>
               <List bulleted horizontal>
                  <List.Item>
                     <Image src={article.image.thumbnail.contentUrl} />
                  </List.Item>
                  {/* <List.Item>{article.publishedAt.split("T")[0]}</List.Item> */}
               </List>
            </Grid.Column>
         </Grid>
      </List.Item>
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
