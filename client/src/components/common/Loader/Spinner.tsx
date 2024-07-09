import { Oval } from "react-loader-spinner";

function Spinner() {
  return (
    <div className="flex flex-col max-w-screen h-screen items-center justify-center">
      <Oval
        visible={true}
        height="100"
        width="100"
        color="#324c6e"
        ariaLabel="oval-loading"
        wrapperStyle={{}}
        wrapperClass=""
        secondaryColor="#1d2939"
      />
    </div>
  );
}

export default Spinner;

export const Loader = ({ size }: { size?: number }) => {
  return  <Oval
  visible={true}
  height={size ?? "20"}
  width={size ?? "20"}
  color="#324c6e"
  ariaLabel="oval-loading"
  wrapperStyle={{}}
  wrapperClass=""
  secondaryColor="#1d2939"
/>
}