import { use, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ModelCard } from "../../components/ModelCard";

const MyDownloads = () => {
    const [downloads, setDownloads] = useState([])
    const [loading, setLoading] = useState(true)
    const {user} = use(AuthContext)

    useEffect(() =>{
        fetch(`https://localhost:3000/my-downloads?email=${user.email}`, {
            headers: {
                authorization: user.accessToken
            }
        })
        .then(res => res.json())
        .then(data => {
            setDownloads(data.result)
            setLoading(false)
        })
    }, [user])


    if(loading) {
        return <div>Loading... </div>
    }

    return (
         <div>
              <div className="text-2xl text-center font-bold"> My Downloads({downloads.length})</div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-10">
                {downloads.map((download) => (
                  <ModelCard key={download._id} model={download} />
                ))}
              </div>
            </div>
    );
};

export default MyDownloads;