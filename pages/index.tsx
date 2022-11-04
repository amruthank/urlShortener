
import { useState } from 'react';


export default function Home() {

  const [value, setValue] = useState("https://www.google.com"); // Get value from the textbox.

  const [shortUrl, setShortUrl] = useState<string>(null);
  
  return(

    <div><center>
      <h2 style={{ margin: "100px" }}> Welcome to url shortener page! </h2>
      {shortUrl ? (
        <div>
          <a href={shortUrl}>{shortUrl}</a>
        </div>
      ):
      (
        <form onSubmit={async (e) => {
          e.preventDefault();
          
          const response = await fetch("/api/shorten", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({url: value}),
            });
            const data = await response.json();

            //Get the shortUrl here
            const temp = `${document.location.protocol}//${document.location.host}/${data.short}`
            console.log(temp);
            
            setShortUrl(temp)
            
        }}>
          <input value = {value} onChange = {e => setValue(e.target.value)} style={{width: "500px", height: "50px"}} />
          <button type = "submit" style={{width: "150px", height: "30px", margin: "3px"}} > <b> Click Here </b></button>
        </form> 
      )}
      
      </center> </div>
  );
}
