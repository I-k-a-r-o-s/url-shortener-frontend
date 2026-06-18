import { useState } from "react";
import toast from "react-hot-toast";
import { api } from "../api/axios";
import { useAppContext } from "../context/AppContext";

const Home = () => {
  const { fetchUrlData } = useAppContext();
  const [fullUrl, setFullUrl] = useState("");

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = await api.post("shorturl", { fullUrl: fullUrl });
      if (data.success) {
        toast.success(data.message);
        setFullUrl("");
        fetchUrlData();
      }
    } catch (error: any) {
      console.log("Error in handleSubmit:", error);
      toast.error(error.response?.data?.message || "Internal Server Error!");
    }
  };
  return (
    <div className="bg-base-100">
      <div className="my-8 rounded-xl">
        <div className="w-full h-full p-20">
          <h1 className="text-5xl font-bold text-center pb-4">URL Shortner</h1>
          <p className="text-center pb-2 text-xl">
            Paste your link to shorten it..
          </p>
          <form className="pt-5" onSubmit={handleSubmit}>
            <div className="join w-full ">
              <div className="w-full">
                <label className="input join-item w-full">
                  urlshortner.link/
                  <input
                    type="text"
                    placeholder="Add your link"
                    required
                    value={fullUrl}
                    onChange={(e) => setFullUrl(e.target.value)}
                  />
                </label>
              </div>
              <button className="btn btn-neutral join-item">Shorten</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
