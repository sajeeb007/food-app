import { useEffect, useState } from "react";
import yelp from "../api/yelp";


export default () => {
    const [results, setResults] = useState([]);
    const [error, setError] = useState("");


    const HandleSearchRequest = async(finalSubmittedText)=>{ //we can use await function in async function
        try{
            //clear error state from possible previous call
            setError("");


            const response = await yelp.get("/search", {
                params: {
                    term: finalSubmittedText,
                    limit: 50,
                    location: 'san jose'
                }
            });
            setResults(response.data.businesses); //sets the state of the results to the data returned from the API
        } catch(err) {
            setError(err)
        }
        
    }

    /*use effect only runs the function only one time 
        had we hardcoded just the function, the function would have run
        that would cause the text element showing the result 
        which in turn would cause the page to render again
        wihch causes the function to run again
        and we get into a loop of calling the function over and over again
        to avoid this, we use, useEffect which prevents this from happening 
    */
    useEffect(()=>{
        HandleSearchRequest('pasta')
    }, []); //notice the empty array here, which ensures we only call it only once


    return [HandleSearchRequest, results, error]
}