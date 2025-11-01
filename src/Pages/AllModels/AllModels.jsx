import { useLoaderData } from "react-router";
import { ModelCard } from "../../components/ModelCard";

const AllModels = () => {
  const { result: models } = useLoaderData();
  console.log(models);
  return (
    <div>
      <div className="text-2xl text-center font-bold"> All Models</div>
      <p className=" text-center mb-10 ">Explore 3d models.</p>

      <div className="grid grid-cols-3 lg:grid-cols-4 gap-3">
        {models.map((model) => (
          <ModelCard key={model._id} model={model} />
        ))}
      </div>
    </div>
  );
};

export default AllModels;
