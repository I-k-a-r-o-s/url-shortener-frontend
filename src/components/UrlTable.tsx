import { api } from "../api/axios";
import { MdOutlineContentCopy, MdOutlineDeleteOutline } from "react-icons/md";
import toast from "react-hot-toast";
import { useAppContext } from "../context/AppContext";

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
    <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-200">
      <table className="table">
        <thead>
          <tr>
            <th>Full URL</th>
            <th>Short URL</th>
            <th>Clicks</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {data.length > 0 ? (
            data.map((item) => (
              <tr key={item._id}>
                <td>
                  <a
                    href={item.fullUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    {item.fullUrl}
                  </a>
                </td>
                <td>
                  <a
                    href={`${import.meta.env.VITE_BASE_URL}shorturl/${item.shortUrl}`}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    {item.shortUrl}
                  </a>
                </td>
                <td>{item.clicks}</td>
                <td className="flex gap-4">
                  <div className="tooltip" data-tip="Copy">
                    <button
                      className="btn btn-xs btn-circle btn-ghost btn-success"
                      onClick={() => copyToClipboard(item.shortUrl)}
                      disabled={loading}
                    >
                      <MdOutlineContentCopy size={20} />
                    </button>
                  </div>
                  <div className="tooltip" data-tip="Delete">
                    <button
                      className="btn btn-xs btn-circle btn-ghost btn-error"
                      onClick={() => deleteUrl(item._id)}
                      disabled={loading}
                    >
                      <MdOutlineDeleteOutline size={20} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <>
              <tr>
                <td>
                  <span className="skeleton skeleton-text">
                    No URLs Yet!...
                  </span>
                </td>
                <td>
                  <span className="skeleton skeleton-text">
                    No URLs Yet!...
                  </span>
                </td>
                <td>
                  <span className="skeleton skeleton-text">
                    No URLs Yet!...
                  </span>
                </td>
                <td>
                  <span className="skeleton skeleton-text">
                    No URLs Yet!...
                  </span>
                </td>
              </tr>
            </>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UrlTable;
