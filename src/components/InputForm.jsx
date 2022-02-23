import React, { useRef, useContext } from "react";
import { saveAs } from "file-saver";
import { ProductsContext } from "../context/ProductsContext";
import "./InputForm.css";

const InputForm = () => {
  const { sendTransaction, isLoading, productIDforQR } =
    useContext(ProductsContext);
  const categoryRef = useRef();
  const slaughterhouseNameRef = useRef();
  const slaughterhouseLocationRef = useRef();
  const batchNoRef = useRef();
  const useWithinDaysRef = useRef();
  const halalRef = useRef();
  const haramRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    //Check for halal
    const halal = halalRef.current.checked ? true : false;
    let productData = {
      category: categoryRef.current.value,
      halal: halal,
      slaughterhouseName: slaughterhouseNameRef.current.value,
      slaughterhouseLocation: slaughterhouseLocationRef.current.value,
      batchNo: batchNoRef.current.value,
      useWithinDays: useWithinDaysRef.current.value,
    };
    console.log(productData);
    sendTransaction(productData);
  };

  const downloadQR = () => {
    saveAs(
      `https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=${productIDforQR}`,
      `QR code (${productIDforQR}) .png`
    );
  };

  return (
    <div>
      <div className="box-root padding-bottom--24 flex-flex flex-justifyContent--center">
        <h1>
          <a href="/" rel="dofollow">
            Slaughter House
          </a>
        </h1>
      </div>
      <div className="formbg-outer">
        <div className="formbg">
          <div className="formbg-inner padding-horizontal--48">
            <form
              style={{ width: "500px" }}
              onSubmit={(e) => handleSubmit(e)}
              id="stripe-login"
            >
              <div className="field padding-bottom--24">
                <label htmlFor="name">Name</label>
                <input
                  type="name"
                  name="slaughterhouseName"
                  id="slaughterhouseName"
                  ref={slaughterhouseNameRef}
                  placeholder="Enter your Name"
                  required
                />
              </div>
              <div className="field padding-bottom--24">
                <label htmlFor="location">Location</label>
                <input
                  type="location"
                  name="slaughterhouseLocation"
                  id="slaughterhouseLocation"
                  ref={slaughterhouseLocationRef}
                  placeholder="Enter your Location"
                  required
                />
              </div>
              <div className="field padding-bottom--24">
                <label htmlFor="days">Days</label>
                <input
                  type="number"
                  name="useWithinDays"
                  id="useWithinDays"
                  ref={useWithinDaysRef}
                  placeholder="Enter Used Within Days"
                  required
                />
              </div>
              <div className="field padding-bottom--24">
                <label htmlFor="batch">Batch No:</label>
                <input
                  type="number"
                  name="batchNo"
                  placeholder="Enter batch No"
                  id="batchNo"
                  ref={batchNoRef}
                  required
                />
              </div>

              <div className="d-flex padding-bottom--24">
                <label>
                  <input
                    type="radio"
                    name="Halal"
                    id="Halal"
                    ref={halalRef}
                    defaultChecked
                    required
                  />
                  Halal
                </label>
                <label>
                  <input
                    type="radio"
                    name="Halal"
                    id="Halal"
                    ref={haramRef}
                    required
                  />
                  Haram
                </label>
              </div>
              <div className="field padding-bottom--24">
                <label htmlFor="halal">Food Category</label>
                <div className="select">
                  <select ref={categoryRef} id="standard-select">
                    <option value="Beef">Beef</option>
                    <option value="Lamb">Lamb</option>
                    <option value="Goat">Goat</option>
                    <option value="Chicken">Chicken</option>
                    <option value="Turkey">Turkey</option>
                    <option value="Pork">Pork</option>
                  </select>
                  <span className="focus"></span>
                </div>
              </div>
              <div className="field">
                {!isLoading && !productIDforQR ? (
                  <input
                    type="submit"
                    name="submit"
                    defaultValue="Continue"
                    value="Submit"
                  />
                ) : productIDforQR ? (
                  <button className="connect" onClick={downloadQR}>
                    Download QR code
                  </button>
                ) : (
                  <p>Loading... </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputForm;
{
  /* <div>
  {productIDforQR ? (
    <button onClick={downloadQR}>Download QR code</button>
  ) : null}
</div>; */
}
