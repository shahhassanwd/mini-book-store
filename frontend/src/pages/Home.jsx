import { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
import BooksTable from "../components/home/BooksTable";
import BooksCard from "../components/home/BooksCard";

const API_URL = import.meta.env.VITE_API_URL;
const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState("table");

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API_URL}/books`)
      .then((res) => {
        setBooks(res.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);
  return (
    <div className="h-screen w-full p-6 bg-gray-300 rounded-lg shadow-md">
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-6">
        <button
          className="bg-sky-500 hover:bg-sky-700 text-white font-semibold px-6 py-2 rounded-lg transition duration-300"
          onClick={() => setShowType("table")}
        >
          Table
        </button>
        <button
          className="bg-sky-500 hover:bg-sky-700 text-white font-semibold px-6 py-2 rounded-lg transition duration-300"
          onClick={() => setShowType("card")}
        >
          Card
        </button>
      </div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-4xl font-bold text-gray-800">Books List</h1>
        <Link to="/books/create">
          <MdOutlineAddBox className="text-5xl text-sky-800 hover:text-sky-600 transition duration-300" />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : showType === "table" ? (
        <BooksTable books={books} />
      ) : (
        <BooksCard books={books} />
      )}
    </div>
  );
};

export default Home;
