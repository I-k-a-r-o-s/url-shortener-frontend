import { api } from "../api/axios";
import { MdOutlineContentCopy, MdOutlineDeleteOutline } from "react-icons/md";
import toast from "react-hot-toast";
import { useAppContext } from "../hooks/useAppContext";

const UrlTable = () => {
  const { data, fetchUrlData, loading, setLoading } = useAppContext();

  const copyToClipboard = async (url: string) => {
    try {
      await navigator.clipboard.writeText(
        `${import.meta.env.VITE_BASE_URL}shorturl/${url}`,
      );
      toast.success("URL copied to clipboard!");
    } catch (error) {
      toast.error("Internal Server Error!");
      console.log("Error in copyToClipboard!:", error);
    }
  };

  const deleteUrl = async (id: string) => {
    try {
      setLoading(true);
      const { data } = await api.delete(`shorturl/${id}`);
      if (data.success) {
        toast.success(data.message);
        fetchUrlData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Internal Server Error!");
      console.log("Error in deleteUrl!:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="px-4 pb-10 sm:px-6 sm:pb-14 lg:px-8 lg:pb-16">
      <div className="mx-auto w-full max-w-6xl rounded-box border border-base-300 bg-base-100 shadow-sm">
        <div className="border-b border-base-300 px-5 py-4 sm:px-6">
          <div>
            <h2 className="text-lg font-semibold">Shortened URLs</h2>
            <p className="text-sm text-base-content/60">
              Your saved short links.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr className="text-xs uppercase tracking-normal text-base-content/60">
                <th className="min-w-72">Full URL</th>
                <th className="min-w-44">Short URL</th>
                <th className="w-24 text-center">Clicks</th>
                <th className="w-32 text-right">Action</th>
              </tr>
            </thead>

            <tbody>
              {data.length > 0 ? (
                data.map((item) => (
                  <tr key={item._id}>
                    <td className="max-w-md">
                      <a
                        className="link link-hover block truncate font-medium"
                        href={item.fullUrl}
                        target="_blank"
                        rel="noreferrer noopener"
                        title={item.fullUrl}
                      >
                        {item.fullUrl}
                      </a>
                    </td>
                    <td>
                      <a
                        className="link link-hover font-medium text-base-content"
                        href={`${import.meta.env.VITE_BASE_URL}shorturl/${item.shortUrl}`}
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        {item.shortUrl}
                      </a>
                    </td>
                    <td className="text-center">
                      <span className="badge badge-neutral badge-soft">
                        {item.clicks}
                      </span>
                    </td>
                    <td>
                      <div className="flex justify-end gap-2">
                        <div className="tooltip tooltip-left" data-tip="Copy">
                          <button
                            className="btn btn-xs btn-circle btn-ghost btn-success"
                            onClick={() => copyToClipboard(item.shortUrl)}
                            disabled={loading}
                          >
                            <MdOutlineContentCopy size={18} />
                          </button>
                        </div>
                        <div className="tooltip tooltip-left" data-tip="Delete">
                          <button
                            className="btn btn-xs btn-circle btn-ghost btn-error"
                            onClick={() => deleteUrl(item._id)}
                            disabled={loading}
                          >
                            <MdOutlineDeleteOutline size={18} />
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4}>
                    <div className="flex flex-col gap-3 py-8 text-center">
                      <div className="skeleton mx-auto h-4 w-48"></div>
                      <p className="text-sm text-base-content/60">
                        No URLs yet.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default UrlTable;
