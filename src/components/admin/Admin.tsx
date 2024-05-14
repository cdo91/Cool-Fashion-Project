import React, { useState } from "react";
import { storage } from "../../firestore-config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  collection,
  addDoc,
  getFirestore,
  Timestamp,
} from "firebase/firestore";
import { v4 } from "uuid";

interface NewsData {
  id: string;
  url: string;
  title: string;
  price: string;
  category: string;
  createdAt: Timestamp;
}

const Admin = () => {
  const [imageUpload, setImageUpload] = useState<File | null>(null);
  const [titleInput, setTitleInput] = useState("");
  const [priceInput, setPriceInput] = useState("");
  const [categoryInput, setCategoryInput] = useState("");
  const db = getFirestore();

  const uploadItem = (event: React.FormEvent<HTMLFormElement>) => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `imagesNews/${imageUpload.name}-${v4()}`);
    uploadBytes(imageRef, imageUpload)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          const newImage: NewsData = {
            id: "",
            url: url,
            title: titleInput,
            price: priceInput,
            category: categoryInput,
            createdAt: Timestamp.now(),
          };
          const categoryDocRef = collection(
            db,
            "Categories",
            "News",
            categoryInput
          );
          const popularDocRef = collection(
            db,
            "Categories",
            "Popular",
            categoryInput
          );
          const allProductsDocRef = collection(db, "All Products");
          addDoc(categoryDocRef, newImage)
            .then(() => {
              alert("Item Uploaded");
            })
            .catch((error) => {
              console.log(error);
            });
          addDoc(popularDocRef, newImage)
            .then(() => {
              console.log("Item added to Popular collection");
            })
            .catch((error) => {
              console.log(error);
            });
          addDoc(allProductsDocRef, newImage)
            .then(() => {
              console.log("Item added to All Products collection");
            })
            .catch((error) => {
              console.log(error);
            });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <section>
        <div
          style={{
            backgroundColor: "white",
            border: "none",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ marginBottom: "10px" }} className="hero">
            <h1
              style={{
                color: "black",
                margin: 0,
                marginLeft: 30,
                fontFamily: "Style Script",
                fontSize: 60,
                textAlign: "center",
              }}
            >
              Admin
            </h1>
          </div>
        </div>
        <form
          style={{ padding: "20px 20px", width: "100%", margin: "auto" }}
          onSubmit={(event) => uploadItem(event)}
        >
          <div
            style={{
              backgroundColor: "rgb(207, 205, 203)",
              boxShadow: "3px 3px 3px rgba(0, 0, 0, 0.3)",
              padding: "20px 50px",
              width: "20%",
              margin: "auto",
              display: "flex",
              flexDirection: "column",
              borderRadius: "0.5em",
            }}
          >
            <input
              type="file"
              onChange={(event) =>
                setImageUpload(event.target.files?.[0] || null)
              }
              style={{
                border: "none",
                boxShadow: "1px 1px 1px rgba(0, 0, 0, 0.3)",
                padding: "2%",
                backgroundColor: "white",
                marginTop: "5px",
              }}
            />
            <input
              type="text"
              placeholder="Title"
              value={titleInput}
              onChange={(event) => setTitleInput(event.target.value)}
              style={{
                border: "none",
                boxShadow: "1px 1px 1px rgba(0, 0, 0, 0.3)",
                padding: "2%",
                marginTop: "5px",
              }}
            />
            <input
              type="text"
              placeholder="Price"
              value={priceInput}
              onChange={(event) => setPriceInput(event.target.value)}
              style={{
                border: "none",
                boxShadow: "1px 1px 1px rgba(0, 0, 0, 0.3)",
                padding: "2%",
                marginTop: "5px",
              }}
            />
            <select
              value={categoryInput}
              onChange={(event) => setCategoryInput(event.target.value)}
              style={{
                border: "none",
                boxShadow: "1px 1px 1px rgba(0, 0, 0, 0.3)",
                padding: "2%",
                marginTop: "5px",
              }}
            >
              <option value="">Select Category</option>
              <option value="Shoes">Shoes</option>
              <option value="Pants">Pants</option>
              <option value="T-shirts">T-shirts</option>
              <option value="Shirts">Shirts</option>
              <option value="Hoodies">Hoodies</option>
              <option value="Jackets">Jackets</option>
              <option value="Blazers">Blazers</option>
              <option value="Jeans">Jeans</option>
              <option value="Shorts">Shorts</option>
              <option value="Skirts">Skirts</option>
              <option value="Dresses">Dresses</option>
              <option value="Underwear">Underwear</option>
              <option value="Socks">Socks</option>
              <option value="Sneakers">Sneakers</option>
              <option value="Sandals">Sandals</option>
              <option value="Boots">Boots</option>
              <option value="Hats">Hats</option>
              <option value="Gloves">Gloves</option>
              <option value="Scarves">Scarves</option>
              <option value="Accessories">Accessories</option>
            </select>
            <input
              type="submit"
              value="Upload Item"
              style={{
                border: "none",
                boxShadow: "1px 1px 1px rgba(0, 0, 0, 0.3)",
                marginTop: "5px",
                padding: "2%",
                borderRadius: "5px",
                backgroundColor: "black",
                color: "white",
                fontSize: "14px",
              }}
              className="buyButton"
            />
          </div>
        </form>
      </section>
    </>
  );
};

export default Admin;
