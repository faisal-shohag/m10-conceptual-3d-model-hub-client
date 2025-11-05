import { ModelCard } from "../../components/ModelCard";

const RecentModels = ({models}) => {
 
    return (
        <div className="mt-[550px]">
            <div className="text-center text-xl font-bold mb-10">Recent Models</div>

   
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {models.map(model => <ModelCard key={model._id} model={model}/>)}
            </div>
            
        </div>
    );
};

export default RecentModels;