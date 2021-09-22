import React from 'react'


const CreateForm = ({ changeHandler, handler, formData, loading, edit }) => {

    return (
        <div className="row">
            <form className="col s12">
                <div className="row">
                    <div className="input-field col s12">
                        <input id="name"
                            onChange={(e) => changeHandler(e)}
                            value={formData.name}
                            name="name"
                            type="text"
                            className="validate" />
                        <label htmlFor="name">Bank name</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s6">
                        <input id="interestRate"
                            onChange={(e) => changeHandler(e)}
                            value={formData.interestRate}
                            name="interestRate"
                            type="text"
                            className="validate" />
                        <label htmlFor="interestRate">Interest rate</label>
                    </div>
                    <div className="input-field col s6">
                        <input id="maxLoan"
                            onChange={(e) => changeHandler(e)}
                            value={formData.maxLoan}
                            name="maxLoan"
                            type="text"
                            className="validate" />
                        <label htmlFor="maxLoan">Maximum loan</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s6">
                        <input id="minDownPay"
                            onChange={(e) => changeHandler(e)}
                            value={formData.minDownPay}
                            name="minDownPay"
                            type="text"
                            className="validate" />
                        <label htmlFor="minDownPay">Minimum down payment</label>
                    </div>
                    <div className="input-field col s6">
                        <input id="loanTerm"
                            onChange={(e) => changeHandler(e)}
                            value={formData.loanTerm}
                            name="loanTerm"
                            type="text"
                            className="validate" />
                        <label htmlFor="loanTerm">Loan term</label>
                    </div>
                </div>
                {
                    !edit ? 
                    <a onClick={() => handler()} className={`waves-effect waves-light btn-large ${loading ? "disabled" : ""}`} >Create Bank</a>
                    :
                    <a onClick={() => handler()} className={`waves-effect waves-light btn-large ${loading ? "disabled" : ""}`} >Update Bank</a>
                }
                 </form>
        </div>
    )
}

export default CreateForm;