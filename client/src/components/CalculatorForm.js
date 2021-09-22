import React from "react";
import SmallLoader from "./UI/SmallLoader";

const CalculatorForm = ({ calcState, changeHandler, calculate, loading }) => {
  return (
    <div class="row">
      <form class="col s12">
        <div class="row">
          <div class="input-field col s5">
            <input
              id="initLoan"
              type="text"
              class="validate"
              name="initLoan"
              value={calcState.initLoan}
              onChange={(e) => changeHandler(e)}
            />
            <label for="initLoan">Initial loan $</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s5">
            <input
              id="downPay"
              type="text"
              class="validate"
              name="downPay"
              value={calcState.downPay}
              onChange={(e) => changeHandler(e)}
            />
            <label for="downPay">Down payment $</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s5">
            <input
              id="nomp"
              type="text"
              class="validate"
              name="nomp"
              value={calcState.nomp}
              onChange={(e) => changeHandler(e)}
            />
            <label for="nomp">Number of monthly payments</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s5">
            <input
              id="name"
              type="text"
              class="validate"
              name="name"
              value={calcState.name}
              onChange={(e) => changeHandler(e)}
            />
            <label for="name">Bank name</label>
          </div>
        </div>
        <div style={{display: "flex", alignItems: "center"}}>
          <a style={{display: "block", marginRight: "230px"}}
            onClick={() => calculate()}
            className="waves-effect waves-light btn-large"
            
          >
            Calculate
          </a>
          {loading && <SmallLoader />}
        </div>
      </form>
    </div>
  );
};

export default CalculatorForm;
