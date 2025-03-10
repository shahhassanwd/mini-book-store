import { useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {useSnackbar} from "notistack";

const API_URL = import.meta.env.VITE_API_URL;
const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const {enqueueSnackbar} = useSnackbar();

  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`${API_URL}/books/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Book Deleted Successfully", {variant:"success"});
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        enqueueSnackbar(error.response.data.message, {variant:"error"});
        setLoading(false);
      });
  }
  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <div className="flex justify-start w-full mb-4">
        <BackButton />
      </div>
      <h1 className="text-4xl font-bold my-6">Delete Book</h1>
      {loading ? <Spinner /> : null}
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md text-center">
        <h3 className="text-2xl font-semibold mb-4">Are You Sure You Want To Delete This Book?</h3>
        <div className="flex justify-center">
          <button
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handleDeleteBook}
          >
            Yes, Delete it
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteBook