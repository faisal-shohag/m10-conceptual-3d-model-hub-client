import { use, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ModelCard } from "../../components/ModelCard";

const MyModels = () => {
  const { user } = use(AuthContext);
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`https://m10-cs.vercel.app/my-models/${user.email}`, {
      headers: {
        authorization: user.accessToken,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setModels(data.result);
        setLoading(false)
      })
  }, [user]);


  if(loading) {
    return <div>Models are loading... Please wait...</div> 
  }


  return (
    <div>
      <div className="text-2xl text-center font-bold"> My Models</div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {models.map((model) => (
          <ModelCard key={model._id} model={model} />
        ))}
      </div>
    </div>
  );
};

export default MyModels;
