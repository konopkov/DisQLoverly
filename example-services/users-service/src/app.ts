import { ApolloServer, gql } from "apollo-server";
import { buildSubgraphSchema } from "@apollo/subgraph";

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  extend schema
  @link(url: "https://specs.apollo.dev/federation/v2.0",
        import: ["@key", "@shareable"])

  # This "Book" type defines the queryable fields for every book in our data source.
  type User {
    username: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    users: [User]
  }
`;
const users = [
  {
    username: "Kate Chopin",
  },
  {
    username: "Paul Auster",
  },
];

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    users: () => users,
  },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  schema: buildSubgraphSchema({ typeDefs, resolvers }),
  // csrfPrevention: true,
  cache: "bounded",
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Users service ready at ${url}`);
});
