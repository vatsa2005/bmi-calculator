import React, { useEffect } from "react";
import { useState } from "react";
import "./Styles/body.css";
function Body() {
    const [unit, setUnit] = useState("metric");
    const [paraFlag, setParaFlag] = useState(true);
    const [placeHolder, setPlaceHolder] = useState({height: "cm", weight: "kg"});
    const[dim, setDim] = useState({height: 0, weight: 0});
    const [bmi, setBmi] = useState(0);
    const [res, setRes] = useState("");
    useEffect(() => {
        if(unit === "metric") {
            setBmi(() => { return Number((dim.weight / (dim.height * dim.height)) * 10000).toFixed(2) });
        } else {
            setBmi(() => { return Number((dim.weight / (dim.height * dim.height)) * 703).toFixed(2) });
        }
        if(bmi === 0) {
            setRes(() => {return " "});
        } else if(bmi < 18.5) {
            setRes(() => {return "You are underweight"});
        } else if(18.5 <= bmi && bmi <= 24.9) {
            setRes(() => {return "You are normal"});
        } else if(25.0 <= bmi && bmi <= 29.9) {
            setRes(() => {return "You are overweight"});
        } else if(bmi >= 30.0) {
            setRes(() => {return "You are obese"});
        }
    });
    function handleUnitChange(e) {
        setUnit(e.target.value);
        if(e.target.value === "metric") {
            setPlaceHolder({height: "cm", weight: "kg"});
        } else {
            setPlaceHolder({height: "in", weight: "lbs"});
        }
    }
    function handleDimChange(e) {
        setParaFlag(false);
        if(e.target.name === "height") {
            setDim((prev) => {return {height: e.target.value, weight: prev.weight}});
        }else {
            setDim((prev) => {return {height: prev.height, weight: e.target.value}});
        }
        if(e.target.value === "") {
            setBmi(0); 
            setParaFlag(true);
        }
    }


    return (
        <div className="body">
            <div className="info">
                <div className="content">
                    <h1>Body Mass Index Calculator</h1>
                    <p>
                    Better understand your weight and height using our Body Mass Index (BMI) calculator. While BMI is not the sole determination of a healthy weight, it offers a valuable starting
                    point to evaluate your overall health and well being.
                    </p>
                </div>
            </div>
            <div className="calc">
                <div className="header">
                    <p>Enter your details below</p>
                </div>
                <div className="units">
                    <div className="metric">
                        <input type="radio" id="metric" name="unit" value="metric" onChange={handleUnitChange} checked={unit === "metric"} />
                        <label for="metric">Metric</label>
                    </div>
                    <div className="imperical">
                        <input type="radio" id="imperical" name="unit" value="imperical" onChange={handleUnitChange} checked={unit === "imperical"}/>
                        <label for="imperical">Imperial</label>  
                    </div>
                </div>
                <div className="inputs">
                    <div className="height">
                        <p>Height</p>
                        <input type="number" onChange={handleDimChange} name="height"/>
                        {unit === "metric" ? <p className="unit">cm</p> : <p className="unit">in</p>}
                    </div>
                    <div className="weight">
                        <p>Weight</p>
                        <input type="number" onChange={handleDimChange} name="weight"/>
                        {unit === "metric" ? <p className="unit">kg</p> : <p className="unit">lbs</p>}
                    </div>
                </div>
                {paraFlag ? <div className="footer">
                    <h1>Welcome!</h1>
                    <p>Enter your height and weight to calculate your BMI</p>
                </div> : <div className="footer">
                        <h1>Your BMI is {bmi}</h1>
                        <p>{res}</p>
                    </div>}
            </div>
        </div>
    )
}

export default Body;

