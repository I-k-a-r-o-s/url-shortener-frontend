import { useState } from "react";
import toast from "react-hot-toast";
import { api } from "../api/axios";
import { useAppContext } from "../hooks/useAppContext";

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
    <section className="bg-base-200 px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
      <div className="hero mx-auto max-w-6xl">
        <div className="hero-content w-full p-0">
          <div className="card w-full border border-base-300 bg-base-100 shadow-sm">
            <div className="card-body gap-6 p-5 sm:p-8 lg:p-10">
              <div className="mx-auto max-w-3xl text-center">
                <div className="mb-3 inline-flex rounded-md bg-base-200 px-3 py-1 text-sm font-medium text-base-content/70">
                  Simple link management
                </div>
                <h1 className="text-3xl font-bold tracking-normal sm:text-4xl lg:text-5xl">
                  URL Shortener
                </h1>
                <p className="mx-auto mt-4 max-w-2xl text-base text-base-content/70 sm:text-lg">
                  Paste a long link and create a cleaner short URL in seconds.
                </p>
              </div>

              <form
                className="mx-auto w-full max-w-4xl"
                onSubmit={handleSubmit}
              >
                <div className="join join-vertical w-full gap-0 sm:join-horizontal">
                  <label className="input input-lg join-item flex h-auto min-h-14 w-full items-center gap-2 px-4 text-sm sm:text-base">
                    <span className="hidden shrink-0 text-base-content/50 sm:inline">
                      urlshortner.link/
                    </span>
                    <input
                      className="min-w-0 grow"
                      type="text"
                      placeholder="Add your link"
                      required
                      value={fullUrl}
                      onChange={(e) => setFullUrl(e.target.value)}
                    />
                  </label>
                  <button className="btn btn-primary btn-lg join-item min-h-14 px-8">
                    Shorten
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
