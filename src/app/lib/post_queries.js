// GraphQL query to fetch all posts
export const GET_ALL_POSTS = `
 query {
  posts {
    nodes {
      date
      slug
      title
      excerpt
      featuredImage {
        node {
          mediaDetails {
            file
            sizes {
              sourceUrl
              width
              height
            }
          }
        }
      }
      categories {
        nodes {
          name
          slug
        }
      }
    }
    pageInfo {
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
    }
  }
}
`;

