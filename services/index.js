import {request, gql} from 'graphql-request';

const grapghqlAPI = process.env.NEXT_PUBLIC_GRAPQL_API;

export const getPosts = async () => {
    const query = gql`
        query MyQuery {
            postsConnection {
              edges {
                node {
                  author {
                    bio
                    id
                    name
                    photo {
                      url
                    }
                  }
                  createdAt
                  slug
                  title
                  excerpt
                  featuredImage {
                    url
                  }
                  categories {
                    name
                    slug
                  }
                }
              }
            }
        }`

    const result = await request(grapghqlAPI, query);

    return result.postsConnection.edges;
}