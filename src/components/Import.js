import React, { useState } from 'react';
import CSVReader from 'react-csv-reader';
import { collection, addDoc } from "firebase/firestore"; 
import { db } from '../firebase/config'; 

export default function Import() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false); 

    const papaparseOptions = {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        transformHeader: header => header.toLowerCase().replace(/\W/g, "_")
    };

    function iterate_data(sdata, fileInfo, originalFile){
        setData(sdata);
        console.log(sdata);
    }

    async function import_into_firebase(){
        setLoading(true);
        const docRef = collection(db, 'materialList');  
        const promises = data.map(item => addDoc(docRef, item));

        try { 
            await Promise.all(promises);
            setLoading(false);
            alert('Import do Firebase bol úspešný!');
            return docRef;
        } catch (error) {
            console.error(error);
            alert('Pri importe došlo k chybe: ' + error.message);
            setLoading(false);
        }
    }

    return (
        <>
            <h1 className="ml-12 mt-12 text-3xl">
                CSV Importer for Firebase
            </h1> 
            <div className='bg-blue-300 ml-12 mt-12 p-12'>
                <CSVReader 
                    onFileLoaded={iterate_data}
                    parserOptions={papaparseOptions}
                />
            </div>
            <button 
              onClick={() => import_into_firebase()}
              className='bg-green-600 rounded-md ml-12 mt-4 p-4 text-white'>
                {loading ? "Načítava sa..." : "Import do Firebase" }
            </button>
            <div className='bg-yellow-300 ml-12 mt-12 p-12'>
                <table className='ml-12 mt-4 p-4 text-black'>
                {data ? data.map((item, index) => (
                        <tr key={index}>
                            <td>{item.item}</td>
                            {/* <td className='ml-2'>{item.state}</td>
                            <td className='ml-2'>{item.country}</td>  */}
                        </tr>
                )) : "" }
                </table> 
            </div>
        </>
    );
}
