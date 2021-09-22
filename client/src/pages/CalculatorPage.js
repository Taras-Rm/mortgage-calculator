import React, { useCallback, useEffect, useState } from "react";
import CalculatorForm from "../components/CalculatorForm";
import { useHttp } from "../hooks/http.hook";
import { useMessasge } from "../hooks/message.hook";

const CalculatorPage = () => {
  // стан форми калькулятора
  const [calcState, setCalcState] = useState({
    initLoan: "",
    downPay: "",
    nomp: "",
    name: "",
  });

  // щомісячний платіж
  const [monthlyPayment, setMonthlyPayment] = useState(null);

  // зміни в інпутах форми калькулятора
  const changeHandler = (e) => {
    setCalcState({ ...calcState, [e.target.name]: e.target.value });
    console.log(calcState);
  };

  // для запитів на сервер
  const { loading, request, error, clearError } = useHttp();
  // для відображення повідомлень
  const msg = useMessasge();

  // відслідковування помилок
  useEffect(() => {
    msg(error);
    clearError();
  }, [error, msg, clearError]);

  // надсилання даних для обчислень
  const calculate = useCallback(async () => {
    // перевірка чи введено числа в потрібні поля
    for (let item in calcState) {
      if (!parseInt(Number(calcState[item]))) {
        if (item !== "name") {
          msg("You should write digits !");
          return null;
        } else {
          continue;
        }
      }
    }
    try {
      // запит на сервер
      const data = await request("/api/calculator/calc", "POST", {
        ...calcState,
      });

      setMonthlyPayment(Math.round(Number(data.data)));

      msg(data.message);
    } catch (e) {}
  }, [calcState, msg, request]);

  return (
    <div>
      <h2>Mortgage calculator</h2>
      <div>
        <CalculatorForm
          calcState={calcState}
          changeHandler={changeHandler}
          calculate={calculate}
          loading={loading}
        />
        {
            monthlyPayment ? <h4 style={{paddingBottom: "7px", borderBottom: "1px solid black", width: "fit-content"}}>Monthly payment:  {monthlyPayment} $</h4>
            : ""
        }
      </div>
    </div>
  );
};

export default CalculatorPage;
