import { useState, useEffect } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {useSnackbar} from "notistack";

const API_URL = import.meta.env.VITE_API_URL;
const EditBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const {enqueueSnackbar} = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API_URL}/books/${id}`)
      .then((res) => {
        console.log("Fetched book data:", res.data); // Verify the structure
        if (res.data) {
          setTitle(res.data.data.title);
          setAuthor(res.data.data.author);
          setPublishYear(res.data.data.publishYear);
        }
        enqueueSnackbar("Book Edited Successfully", {variant:"success"});
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching book:", error);
        enqueueSnackbar(error.response.data.message, {variant:"error"});
        setLoading(false);
      });
  }, [id, enqueueSnackbar]);

  const handleEditBook = () => {
    const data = { title, author, publishYear };
    setLoading(true);
    axios
      .put(`${API_URL}/books/${id}`, data)
      .then(() => {
        setLoading(false);
        navigate("/"); // Redirect after saving
      })
      .catch((error) => {
        console.log(error);
        alert(error.response.data.message);
        setLoading(false);
      });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <div className="flex justify-start w-full mb-4">
        <BackButton />
      </div>
      <h1 className="text-4xl font-bold my-6">Edit Book</h1>
      {loading ? <Spinner /> : null}
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <div className="my-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="my-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="author">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="my-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="publishYear">Publish Year</label>
          <input
            type="number"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="button"
            className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handleEditBook}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditBook;
