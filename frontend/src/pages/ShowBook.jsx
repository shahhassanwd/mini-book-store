// eslint-disable-next-line no-unused-vars
import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { useState, useEffect } from "react";

const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((res) => {
        setBook(res.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-start">
      <div className="flex justify-start w-full mb-4">
        <BackButton />
      </div>
      <h1 className="text-4xl font-bold my-6">Show Book</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
          <div className="my-4">
            <span className="text-xl font-semibold text-gray-700">Id:</span>
            <span className="text-gray-600"> {book._id}</span>
          </div>
          <div className="my-4">
            <span className="text-xl font-semibold text-gray-700">Title:</span>
            <span className="text-gray-600"> {book.title}</span>
          </div>
          <div className="my-4">
            <span className="text-xl font-semibold text-gray-700">Author:</span>
            <span className="text-gray-600"> {book.author}</span>
          </div>
          <div className="my-4">
            <span className="text-xl font-semibold text-gray-700">Publish Year:</span>
            <span className="text-gray-600"> {book.publishYear}</span>
          </div>
          <div className="my-4">
            <span className="text-xl font-semibold text-gray-700">Create Time:</span>
            <span className="text-gray-600"> {new Date(book.createdAt).toLocaleString()}</span>
          </div>
          <div className="my-4">
            <span className="text-xl font-semibold text-gray-700">Last Update Time:</span>
            <span className="text-gray-600"> {new Date(book.updatedAt).toLocaleString()}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowBook;
