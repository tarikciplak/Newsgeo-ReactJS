import axios from 'axios'

export const fetchLocalNews = async () => {
    return await axios.get("http://localhost:5000/news")

}

export const createNews = async (data) => {
  return await axios.post("http://localhost:5000/news/", data)
} 

export const fetchGlobularlNews = async () => {
    return await axios.get("http://localhost:5000/news")

}