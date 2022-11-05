
import { useState } from 'react';


export default function Home() {

  const [value, setValue] = useState(" "); // Get value from the textbox.

  const [shortUrl, setShortUrl] = useState<string>();
  
  return(

    <div style={{ margin: "100px", padding: "100px"}}>
      <h2 > Welcome to url shortener page! </h2>
      {shortUrl ? (
        <div>
          <a href={shortUrl} >{shortUrl}</a>
        </div>
      ):
      (
        <form onSubmit={async (e) => {
          e.preventDefault();
          
            const response = await fetch("/api/shorten", {
                                        method: "POST",
                                        headers: { "Content-Type": "application/json" },
                                        body: JSON.stringify({url: value}),
                                        })
            const data = await response.json();
            if (response.status == 400)
              {
                alert(data.message);
              }
              else
              {
                
                //Get the shortUrl here
                const temp = `${document.location.protocol}//${document.location.host}/${data.short}`
                console.log(temp);
              
                setShortUrl(temp)
              }
            
        }}>
          <input value = {value} onChange = {e => setValue(e.target.value)} style={{width: "500px", height: "50px"}} />
          <button type = "submit" style={{width: "150px", height: "30px", margin: "3px"}} > <b> Click Here </b></button>
        </form> 
      )}
      
     </div>
  );
}
