import { useState } from "react";
import axios from "axios";

export default function usePost(url) {
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [data, setData] = useState(null);

  const postData = async (payload) => {
    setIsLoading(true);
    setServerError("");
    try {
      const response = await axios.post(url, payload);
      setData(response.data);
      return response;
    } catch (error) {
      if (error.response) {
        setServerError(error.response.data.message || "Server error");
      } else if (error.request) {
        setServerError("No response from server");
      } else {
        setServerError("Unexpected error occurred");
      }
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { postData, isLoading, serverError, data };
}
