import "./Data.css";
import { useState } from "react";

function Data() {
  const [subtotal, setSubtotal] = useState("");
  const [cgst, setCgst] = useState("");
  const [sgst, setSgst] = useState("");
  const [totalInWords, setTotalInWords] = useState("");
  const [roundOff, setRoundOff] = useState("");
  const [total, setTotal] = useState("");
  const [rows, setRows] = useState([
    {
      siNo: 1,
      item: "",
      qty: "",
      price: "",
      hsnCode: "",
      amount: "",
      purity: "",
      weight: "",
    },
  ]);



  const numberToWords = (num) => {
    const ones = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
    const teens = ["Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
    const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
    const thousands = ["", "Thousand", "Million", "Billion"];
  
    if (num === 0) return "Zero";
  
    let words = "";
  
    const getChunkWords = (chunk) => {
      let chunkWords = "";
      if (chunk > 99) {
        chunkWords += ones[Math.floor(chunk / 100)] + " Hundred ";
        chunk %= 100;
      }
      if (chunk > 19) {
        chunkWords += tens[Math.floor(chunk / 10)] + " ";
        chunk %= 10;
      }
      if (chunk > 0) {
        chunkWords += (chunk < 10 ? ones[chunk] : teens[chunk - 10]) + " ";
      }
      return chunkWords;
    };
  
    let chunkCount = 0;
    while (num > 0) {
      const chunk = num % 1000;
      if (chunk > 0) {
        words = getChunkWords(chunk) + thousands[chunkCount] + " " + words;
      }
      num = Math.floor(num / 1000);
      chunkCount++;
    }
  
    return words.trim();
  };
  









  const addNewRow = () => {
    setRows((prevRows) => [
      ...prevRows,
      {
        siNo: prevRows.length + 1,
        item: "",
        qty: "",
        hsnCode: "",
        price: "",
        amount: "",
        purity: "",
        weight: "",
      },
    ]);
  };

  const handleInputChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;

    // Parse the input values or default to 0
    const weight = parseFloat(updatedRows[index].weight) || 0;
    const price = parseFloat(updatedRows[index].price) || 0;
    const qty = parseFloat(updatedRows[index].qty) || 0;

    // Calculate the amount
    const amount = (weight * price * qty).toFixed(2);

    // Update the amount field for the specific row
    updatedRows[index].amount = amount;

    // Update the state with the modified rows
    setRows(updatedRows);

    // Calculate the total amount
    const totalAmount = updatedRows.reduce((acc, row) => {
      return acc + parseFloat(row.amount);
    }, 0);

    // Set the total amount
    setSubtotal(totalAmount.toFixed(2));
  };

  const calculateTotal = () => {
    const subtotalValue = parseFloat(subtotal);
    const cgstRate = 1.5; // CGST rate (1.5%)
    const sgstRate = 1.5; // SGST rate (1.5%)

    const cgstAmount = (subtotalValue * cgstRate) / 100;
    const sgstAmount = (subtotalValue * sgstRate) / 100;

    const totalValue = subtotalValue + cgstAmount + sgstAmount;

    const roundOff = Math.round(totalValue)
    setRoundOff(roundOff.toFixed(2))

    setCgst(cgstAmount.toFixed(2));
    setSgst(sgstAmount.toFixed(2));
    setTotal(roundOff);
    const words = roundOff

     // Convert total amount to words and set it
     setTotalInWords(numberToWords(words));
  };
  return (
    <div className="main">
      <div className="title">
    <h1>M/S NILANCHALA JEWELLRS</h1>
    <h5>Main Road, Badagada GSTIN No : 21AJUPJ9966F1ZO</h5>
      </div>
      <div className="header">
        <div className="left">
          <label> Customer Name : </label>
          <input type="text" name="name" placeholder="Enter Name" /> <br />
          <label>Customer : </label>
          <input type="text" placeholder="Customer" />
        </div>
        <div className="right">
          <label>Date : </label>
          <input type="date" id="date" />
        </div>
      </div>

      

      <div className="category-container">
<table className="category">
  <thead>
    <tr>
      <th>Si NO</th>
      <th>Item</th>
      <th>HSN Code</th>
      <th>Purity</th>
      <th>Weight</th>
      <th>Qty</th>
      <th>Price</th>
      <th>Amount</th>
    </tr>
  </thead>
  <tbody>
    {rows.map((row, index) => (
      <tr key={index}>
        <td className="si">{row.siNo}</td>
        <td>
          <input
            type="text"
            className="item"
            value={row.item}
            onChange={(e) =>
              handleInputChange(index, "item", e.target.value)
            }
          />
        </td>
        <td>
          <input
            className="code"
            type="text"
            value={row.hsnCode}
            onChange={(e) =>
              handleInputChange(index, "hsnCode", e.target.value)
            }
          />
        </td>
        <td>
          <input
            className="purity"
            type="text"
            value={row.purity}
            onChange={(e) =>
              handleInputChange(index, "purity", e.target.value)
            }
          />
        </td>
        <td>
          <input
            className="weight"
            type="text"
            value={row.weight}
            onChange={(e) =>
              handleInputChange(index, "weight", e.target.value)
            }
          />
        </td>
        <td>
          <select
            className="qty"
            value={row.qty}
            onChange={(e) =>
              handleInputChange(index, "qty", e.target.value)
            }
          >
            <option value="">QTY</option>
            {Array.from({ length: 10 }, (_, i) => (
              <option key={i + 1} value={String(i + 1).padStart(2, "0")}>
                {String(i + 1).padStart(2, "0")}
              </option>
            ))}
          </select>
        </td>
        <td>
          <input
            className="price"
            type="text"
            value={row.price}
            onChange={(e) =>
              handleInputChange(index, "price", e.target.value)
            }
          />
        </td>
        <td>
          <input
            className="amount"
            type="text"
            value={row.amount}
            onChange={(e) =>
              handleInputChange(index, "amount", e.target.value)
            }
          />
        </td>
      </tr>
    ))}
  </tbody>
</table>

</div>

      <div className="lowerpart">
        <div className="Lleft">
          <h4>In Words = {totalInWords}</h4>

        </div>



<div style={{display:'flex',flexDirection:'column',height:'10vh', justifyContent:'space-around'}}>
      <button className="addition" onClick={addNewRow}>
        +
      </button>
      <button className="caluclate" onClick={calculateTotal}>
        SUBMIT
      </button>
      </div>

      <div className="checkout">
        <div className="data">
        Subtotal =
        <input
          type="text"
          placeholder="0000"
          value={subtotal}
          onChange={(e) => setSubtotal(e.target.value)}
        />
        </div>



        <div className="data">
        CGST 1.5% = <input type="text" value={cgst} readOnly />
        </div>
        <div className="data">
        SGST 1.5% = <input type="text" value={sgst} readOnly />
        </div>
        <div className="data">
        Round off{" "} =
        <input
          type="text"
          value={roundOff}
          onChange={(e) => setRoundOff(e.target.value)}
        />
        </div>
        <div className="data">
        Total = <input type="text" value={total} readOnly />
        </div>
        </div>
      
      </div>
    </div>
  );
}
export default Data;
