import React, { useEffect, useState } from "react";
import Photo from "./components/Photo";
import "./App.css";
const App = () => {
  const [page, setPage] = useState(1);
  const [photos, setPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const apiKey = `zp0BGJGUJtBhrTEzacC0UXzyjQ5M2efitpF7Vzo5xBE`;
  const apiUrl = `https://api.unsplash.com/photos/?client_id=${apiKey}&page=${page}`;
  const fetchImage = async () => {
    setIsLoading(true);
    try {
      // การร้องขอข้อมูลไปที่ผู้ให้บริการ API : fetch(url)
      const response = await fetch(apiUrl);
      const data = await response.json();
      setPhotos((oldData) => {
        return [...oldData, ...data];
      });
    } catch (error) {
      console.log("error fetching");
    }
    setIsLoading(false);
  };
  useEffect(() => {
    // eslint-disable-next-line
    fetchImage();
  }, [page]);
  useEffect(() => {
    const event = window.addEventListener("scroll", () => {
      if (
        // eslint-disable-next-line
        window.innerHeight + window.scrollY >
          document.body.offsetHeight - 500 &&
        !isLoading
      ) {
        console.log("load content");
        setPage((exPage) => {
          return exPage + 1;
        });
      }
    });
    return () => window.removeEventListener("scroll", event);
  }, []);

  return (
    <main>
      <h1>infinite scroll photo</h1>
      <section className="photos">
        <div className="display-photo">
          {photos.map((data, index) => {
            return <Photo key={index} {...data} />;
          })}
        </div>
      </section>
    </main>
  );
};

export default App;
