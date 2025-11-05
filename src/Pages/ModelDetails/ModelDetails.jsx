import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router";
import { HiOutlineDownload } from "react-icons/hi";
import { IoPencil } from "react-icons/io5";
import { FaTrash } from "react-icons/fa6";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { useState } from "react";
import { use } from "react";
import { AuthContext } from "../../context/AuthContext";

const ModelDetails = () => {
  const navigate = useNavigate();
  const { user } = use(AuthContext);
  const [model, setModel] = useState(null);
  const [refetch, setRefetch] = useState(false);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    fetch(`https://m10-cs.vercel.app/models/${id}`, {
      headers: {
        authorization: user.accessToken,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setModel(data.result);
        setLoading(false);
      });
  }, [ user, id, refetch]);

  const handleDelete = () => {
    console.log(user.email, model.created_by)

    if(user.email != model.created_by) {
      toast.error("You are not the owner of this model!")
      return;
    }
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://m10-cs.vercel.app/models/${model?._id}`, {
          headers: {
            authorization: user.accessToken,
          },
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
            navigate("/all-models");
          })
          .catch((err) => {
            toast.success(err.message);
          });
      }
    });
  };

  const handleDownload = async () => {
    try {
      const res = await fetch(`https://m10-cs.vercel.app/download/${model._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: user.accessToken,
        },
        body: JSON.stringify({...model, downloadedBy: user.email})
      });

      await res.json();
      setRefetch(!refetch)
      toast.success("Model downloaded successfully!");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  if (loading) {
    return <div>Model is loading... Please wait...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6 lg:p-8">
      <div className="card bg-base-100 shadow-xl border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden">
        <div className="flex flex-col lg:flex-row gap-8 p-6 md:p-8">
          <div className="shrink-0 w-full lg:w-1/2">
            <img
              src={model?.thumbnail}
              alt={name}
              className="w-full object-cover rounded-xl shadow-md"
            />
          </div>

          <div className="flex flex-col justify-center space-y-4 w-full lg:w-1/2">
            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold ">
              {model.name}
            </h1>

            {/* Category Badge */}
            <div className="flex gap-3">
              <div className="badge badge-lg badge-secondary   border-pink-600 font-medium">
                {model.category}
              </div>

              <div className="badge badge-lg badge-outline text-pink-600 border-pink-600 font-medium">
                Downloads: {model?.downloads}
              </div>
            </div>

            <div className="text-xs text-pink-500">
              Added By: <b>{model?.created_by}</b>
            </div>

            {/* Description */}
            <p className="leading-relaxed md:text-lg">
              {model?.description || "No description available."}
            </p>

            {/* Optional: Action Buttons */}
            <div className="flex gap-3 mt-6">
              {user?.email === model?.created_by && <Link
                to={`/update-model/${model?._id}`}
                className="btn btn-primary rounded-full bg-linear-to-r from-pink-500 to-red-600 text-white border-0 hover:from-pink-600 hover:to-red-700"
              >
                <IoPencil /> Update Model
              </Link>}
    
              <button
                onClick={handleDownload}
                className="btn border border-pink-500 text-pink-500  rounded-full  hover:border-pink-500 hover:text-pink-100 hover:bg-pink-500"
              >
                <HiOutlineDownload /> Download
              </button>

              <button
                onClick={handleDelete}
                className="btn btn-outline rounded-full border-gray-300 hover:border-pink-500 hover:text-pink-600"
              >
                <FaTrash /> Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelDetails;
