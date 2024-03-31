import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Error() {
  const location = useLocation();
  const navigation = useNavigate();

  useEffect(() => {
    if (!location.state) {
      navigation("/");
    }
  }, [location.state, navigation]);

  return <></>;
}

export default Error;
