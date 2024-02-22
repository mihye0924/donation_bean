import ClipLoader from "react-spinners/ClipLoader";
import { CSSProperties } from "styled-components";
const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "black",
};

interface Props {
  size: number;
}

const LoadingSpinner = ({ size }: Props) => {
  return (
    <>
      <ClipLoader
        color={"#f56400"}
        loading={true}
        cssOverride={override}
        size={size}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </>
  );
};

export default LoadingSpinner;

/*           <LoadingSpinner size={10}  /> */
