import { useState } from "react";
import axios from "axios";

export default function usePost(url) {
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [data, setData] = useState(null);

  const postData = async (payload, config = {}) => {
    setIsLoading(true);
    setServerError("");

    try {
      const response = await axios.post(url, payload, config);
      setData(response.data);

      return { success: true, data: response.data, response };
    } catch (error) {
      let message = "Unexpected error occurred";
      if (error.response) {
        message = error.response.data.message || "Server error";
      } else if (error.request) {
        message = "No response from server";
      }
      setServerError(message);
      return { success: false, error: message,response: error.response || null};
    } finally {
      setIsLoading(false);
    }
  };
  return { postData,isLoading,serverError,data,};
}
