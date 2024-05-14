import { useState } from "react"


const Searchbar = () => {

    const [value, setValue] = useState("")

    function search() {

        if (value == "") {

            return alert("Fyll i fältet")

        }
        setValue(value);

        if(value === ""){

        }

        setValue("");

    }



    return (

        <>
            <input value={value} onChange={(e) => setValue(e.target.value)} type="text" placeholder='Sök produkt' />
            <button onClick={search}>Sök</button>
        </>

    )

}

export default Searchbar