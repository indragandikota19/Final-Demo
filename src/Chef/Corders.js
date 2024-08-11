import axios from "axios";
import React, { useState, useEffect } from "react";

const Corders = () => {
    const [selectedOption, setSelectedOption] = useState('');
    const [cart, setCart] = useState([]);
    
    const handleSelectChange = (e) => {
        const value = e.target.value;
        setSelectedOption(value);
        localStorage.setItem('selectedValue', value); // Store the selected value in localStorage
    };

    const handleButtonClick = () => {
        // Display status updated message
        alert("Status updated");
    };

    useEffect(() => {
        loadList();
    }, []);

    const loadList = async () => {
        const result = await axios.get("http://localhost:8080/history");
        setCart(result.data);
    };

    return (
        <div>
            <h1>Status</h1>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <select onChange={handleSelectChange} value={selectedOption}>
                    <option value="">Status of order</option>
                    <option value="Accepted">Accepted</option>
                    <option value="Preparing the food 🍸">Preparing the food 🍸</option>
                    <option value="Food reaches within 15mins ⏰">Food reaches within 15mins ⏰</option>
                    <option value="🛵 The agent is at your doorstep collect the food">The agent is at your doorstep collect the food 🛵</option>
                </select>
                <button style={{marginLeft:"10px", backgroundColor:"transparent",color:"black",width:"40px",fontSize:"13.5px"}}onClick={handleButtonClick} className="btn btn-primary ml-2">OK</button>
            </div>
            <table className="table table-striped table-light mt-5">
                <thead>
                    <tr>
                        <th></th>
                        <th>S.No</th>
                        <th>Items</th>
                        <th>Price(Rs.)</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Static rows */}
                    <tr>
                        <td></td>
                        <td>1</td>
                        <td>laddu</td>
                        <td>250</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>2</td>
                        <td>idly</td>
                        <td>50</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>3</td>
                        <td>Poori</td>
                        <td>100</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>4</td>
                        <td>Dosa</td>
                        <td>50</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>5</td>
                        <td>kova</td>
                        <td>250</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>6</td>
                        <td>Gulaab jamun</td>
                        <td>100</td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="5"></td>
                    </tr>
                    <tr>
                        <td colSpan="5"></td>
                    </tr>
                </tfoot>
            </table>
            <a href="/chef/login" className="btn btn-success">Back</a>
        </div>
    );
};

export default Corders;
