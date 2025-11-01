import { useLoaderData } from "react-router";
import Banner from "../../components/Banner";
import RecentModels from "./RecentModels";

const Home = () => {
    const {result: recentModels} = useLoaderData()

    return (
        <div>
            <Banner/>
            <RecentModels models={recentModels}/>
        </div>
    );
};

export default Home;