import useGet from "../hooks/useGet";
import { Link } from "react-router-dom";

const TopicList = () => {
  const { data, isLoading, error } = useGet("http://localhost:7000/forums");
};

export default TopicList;
