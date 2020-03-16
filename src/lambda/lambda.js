import fetch from 'node-fetch';

const giphyApiRootUrl = 'https://api.themoviedb.org/3'
const giphyApiKey = process.env.REACT_APP_API_KEY; // Here we hide value in environment

exports.handler = async (event) => {
  // We can retrive type of http method in event parameter
  const { httpMethod } = event;
  
  if (httpMethod === 'GET') {
    const response = await fetch(`${movieDbApiRootUrl}/movie/latest?api_key=${movieDbApiKey}`, { 'content-type': 'application/json' })  
    const movieData = await response.text();

    return { statusCode: 200, body: movieData };
  }
  
  return { statusCode: 404 };

// export function handler(event, context, callback) {
//   console.log('queryStringParameters', event.queryStringParameters)
//   callback(null, {
//     statusCode: 200,
//     body: JSON.stringify({ msg: 'Hello, World!' }),
//   })
// }
