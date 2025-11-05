import { useLoaderData } from "react-router";
import Banner from "../../components/Banner";
import RecentModels from "./RecentModels";
const Home = () => {
  const { result: models } = useLoaderData();

  return (
    <div>
      <Banner />
      <RecentModels models={models} />
    </div>
  );
};

export default Home;
