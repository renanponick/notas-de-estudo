// bese doc -> https://stepzen.com/blog/load-testing-graphql-performance-k6
import http from 'k6/http';

const query = `
  query GetLocation($ip: String!) {
    ipApi_location(ip: $ip) {
      ip
      city
      country
    }
  }
`;


const headers = {
  'Content-Type': 'application/json',
};


export default function () {
  http.batch([
    [
      'POST',
      'https://graphqldd.stepzen.net/api/dd1cf47f51ac830fe21dc00ec80cee65/__graphql',
      JSON.stringify({ query, variables: { ip: '8.8.8.8' } }),
      { headers },
    ],
    [
      'POST',
      'https://graphqldd.stepzen.net/api/dd1cf47f51ac830fe21dc00ec80cee65/__graphql',
      JSON.stringify({ query, variables: { ip: '12.0.1.3' } }),
      { headers },
    ],
    [
      'POST',
      'https://graphqldd.stepzen.net/api/dd1cf47f51ac830fe21dc00ec80cee65/__graphql',
      JSON.stringify({ query, variables: { ip: '95.120.0.0' } }),
      { headers },
    ],
  ]);
}