export const formatErrors = (error) => {

    try{
      if (error.response.data && !error.response.data.success) {
        return error.response.data.message;
      }

      if(error.response.status===401) return "Unathorized";

      return "Unable to send request!!. Try again later." 
    }catch(err){
      console.log(err);
      return "Unable to send request!!.";
    }
    
  };
  