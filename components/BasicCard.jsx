const BasicCard =(props)=>{
    const {title, content, videoId} = props;
    return(
        <div className="bg-white py-4 px-4 shadow-xl rounded-lg my-4 mx-4">
        <div className="flex justify-between px-4 items-center">
            <div className="text-lg font-semibold"> 
              <p>{title}</p>
              <p className="text-gray-400 text-base">{content}</p>
            </div>
            <div className="text-lg font-semibold"> 
             <a 
             className="focus:outline-none bg-pink-700 hover:bg-pink-800 text-white font-bold py-2 px-2 rounded-full inline-flex items-center "
             href={`https://youtube.com/watch?v=${videoId}`}
             target="_blank"
             >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              </a>
            </div>
        </div>
      </div>
    )
}

export default BasicCard;