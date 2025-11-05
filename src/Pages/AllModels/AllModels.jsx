import { useLoaderData } from "react-router";
import { ModelCard } from "../../components/ModelCard";
import { IoIosSearch } from "react-icons/io";
import { useState } from "react";
import { IoFilter } from "react-icons/io5";

const AllModels = () => {
  const { result } = useLoaderData();
  const [models, setModels] = useState(result);

  const handleSearch = async (e) => {
    e.preventDefault();
    const search_text = e.target.search_text.value;
    console.log(search_text);

    fetch(`https://m10-cs.vercel.app/search?text=${search_text}`)
      .then((res) => res.json())
      .then((data) => {
        setModels(data.result);
      });
  };

  const handleFilterByCategory = (category) => {
    fetch(`https://m10-cs.vercel.app/filter-by-category?category=${category}`)
    .then(res=> res.json())
    .then(data=> {
      setModels(data.result)
    })

  }

  return (
    <div>
      <div className="text-2xl text-center font-bold"> All Models</div>
      <p className=" text-center  ">Explore 3d models.</p>

      <form onSubmit={handleSearch} className="text-center my-10">
        <label className="input rounded-full focus:border-0 focus:outline-gray-200">
          <IoIosSearch size={17} />
          <input
            name="search_text"
            className="focus:border-0 focus:outline-gray-200"
            type="search"
            placeholder="Search"
          />
        </label>
        <button className="btn btn-secondary rounded-full ml-3">Search</button>
      </form>

      <div className="flex justify-between items-center">
          <select
              defaultValue={""}
              name="category"
              onChange={(e)=> handleFilterByCategory(e.target.value)}
              required
              className="select  rounded-full focus:border-0 focus:outline-gray-200"
            >
              <option value="" disabled>
              Filter by Category
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


      <select defaultValue="Pick a color" className="select rounded-full">
        <option disabled={true}>Sort</option>
        <option>Download(asc)</option>
        <option>Download(dsc)</option>
      </select>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-10 ">
        {models.map((model) => (
          <ModelCard key={model._id} model={model} />
        ))}
      </div>
    </div>
  );
};

export default AllModels;
