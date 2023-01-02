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

export const getRecentPosts = async () => {
    const query = gql`
        query getPostDetails() {
            posts(
                orderBy: createdAt_ASC
                last: 3
            ) {
                title
                featuredImage {
                    url
                }
                createdAt
                slug
            } 
        } `

    const result = await request(grapghqlAPI, query);

    return result.posts;
}

export const getSimilarPosts = async (categories, slug) => {
    const query = gql`
    query GetPostDetails($slug: String!, $categories: [String!]) {
      posts(
        where: {slug_not: $slug, AND: {categories_some: {slug_in: $categories}}}
        last: 3
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `;
    const result = await request(grapghqlAPI, query, { slug, categories });

    return result.posts;
};

export const getCategories = async () => {
    const query = gql`
    query GetGategories {
        categories {
          name
          slug
        }
    }
  `;

    const result = await request(grapghqlAPI, query);

    return result.categories;
};