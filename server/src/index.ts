import { ApolloServer } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";

import connectDB from "./config/db";
import wikiPageResolver from "./resolvers/WikiPageResolver";
import wikiPageTypeDefs from "./typeDefs/WikiPageTypeDefs";

connectDB();

const server = new ApolloServer({
  typeDefs: [ wikiPageTypeDefs ],
  resolvers: {
    Query: Object.assign(
      {},
      wikiPageResolver()
    ),
  },
  csrfPrevention: true,
  cache: "bounded",
  plugins: [
    ApolloServerPluginLandingPageGraphQLPlayground,
  ],
  // playground: true
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});