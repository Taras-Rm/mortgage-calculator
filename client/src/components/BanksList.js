import React from 'react'

const BanksList = ({ banksList, deleteHandler, setModalUpd, setFormUpd }) => {

    const onUpdateBtnClick = (bankInfo) => {
        setModalUpd(true);
        setFormUpd(bankInfo)
    }

    return (
        <div>
            <h1>List of Banks</h1>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Interest rate %</th>
                        <th>Maximum loan $</th>
                        <th>Minimum down payment $</th>
                        <th>Loan term (month)</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        banksList.map(bank => {
                            return (
                                <tr key={bank.name}>
                                    <td>{bank.name}</td>
                                    <td>{bank.interestRate}</td>
                                    <td>{bank.maxLoan}</td>
                                    <td>{bank.minDownPay}</td>
                                    <td>{bank.loanTerm}</td>
                                    <td>
                                        <a onClick={() => onUpdateBtnClick(bank)} className="waves-effect orange btn-small" ><i className="material-icons center">edit</i></a>
                                    </td>
                                    <td>
                                        <a onClick={() => deleteHandler(bank._id)} className="waves-effect red btn-small" ><i className="material-icons center">delete</i></a>
                                    </td>
                                </tr>
                            )
                        })
                    }

                </tbody>
            </table>
        </div>

    )
}

export default BanksList
