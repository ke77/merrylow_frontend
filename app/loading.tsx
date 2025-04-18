import ClipLoader from "react-spinners/ClipLoader";


const Loading = () => {
     return (
          <div className='w-full h-[75vh] flex items-center justify-center'>
               <ClipLoader size={80} loading={true} color='#CB6CE6' aria-label="Loading Spinner" />
               {/* <div className="loading loading-spinner loading-lg" /> */}
          </div>
     )
}

export default Loading