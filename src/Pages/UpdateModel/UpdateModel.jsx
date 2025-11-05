import { use } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import { useState } from "react";
import { useEffect } from "react";

const UpdateModel = () => {
  const {user} = use(AuthContext)
   const [model, setModel] = useState(null);
  const [loading, setLoading] = useState(true)
  const {id} = useParams();

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
  }, [user, id]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      name: e.target.name.value,
      category: e.target.category.value,
      description: e.target.description.value,
      thumbnail: e.target.thumbnail.value,
      created_at: new Date(),
      downloads: 0,
    };

    try {
      const res = await fetch(`https://m10-cs.vercel.app/models/${model._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: user.accessToken,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log(data);
      toast.success("Model updated successfully!");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  
  if(loading) {
    return <div>Models are loading... Please wait...</div> 
  }

  return (
    <div className="card bg-base-100 w-full max-w-md mx-auto shadow-2xl rounded-2xl">
      <div className="card-body p-6 relative">
        <h2 className="text-2xl font-bold text-center mb-6">Update Model</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div>
            <label className="label font-medium">Name</label>
            <input
              type="text"
              defaultValue={model.name}
              name="name"
              required
              className="input w-full rounded-full focus:border-0 focus:outline-gray-200"
              placeholder="Enter name"
            />
          </div>

          {/* Category Dropdown */}
          <div>
            <label className="label font-medium">Category</label>
            <select
              defaultValue={model.category}
              name="category"
              required
              className="select w-full rounded-full focus:border-0 focus:outline-gray-200"
            >
              <option value="" disabled>
                Select category
              </option>
              <option value="Vehicles">Vehicles</option>
              <option value="Plants">Plants</option>
              <option value="Foods">Foods</option>
              <option value="Home & Living">Home & Living</option>
              <option value="Characters">Characters</option>
              <option value="Space">Space</option>
              <option value="Animals">Animals</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Description Textarea */}
          <div>
            <label className="label font-medium">Description</label>
            <textarea
              defaultValue={model.description}
              name="description"
              required
              rows="3"
              className="textarea w-full rounded-2xl focus:border-0 focus:outline-gray-200 h-[250px]"
              placeholder="Enter description"
            ></textarea>
          </div>

          {/* Thumbnail URL */}
          <div>
            <label className="label font-medium">Thumbnail URL</label>
            <input
              type="url"
              name="thumbnail"
              defaultValue={model.thumbnail}
              required
              className="input w-full rounded-full focus:border-0 focus:outline-gray-200"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn w-full text-white mt-6 rounded-full bg-linear-to-r from-pink-500 to-red-600 hover:from-pink-600 hover:to-red-700"
          >
            Update Model
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateModel;
