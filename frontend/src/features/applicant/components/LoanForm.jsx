import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import "./loanForm.css";

let renderCount = 0;

const LoanForm = () => {
  const form = useForm();
  const { register, control, handleSubmit } = form;

  const onSubmit = async (data) => {
    const formData = new FormData();
    // FormData is used because the form contains file inputs (panCard, aadhaarCard)
    // JSON cannot carry files, so FormData handles both text fields and files together

    for (let key in data) {
      formData.append(key, data[key]);
    }

    console.log(data);
    const response = await fetch("http://localhost:5000/api/loan/apply", {
      method: "POST",
      body: formData,
    });
    const result = await response.json();
    const email = result.data.email;
    console.log(email);
  };

  renderCount++;

  return (
    <div>
      <h1>{renderCount / 2}</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="firstName"> first name</label>
        <input type="text" id="firstName" {...register("firstName")} />
        <br></br>

        <label htmlFor="middleName"> middle name</label>
        <input type="text" id="middleName" {...register("middleName")} />
        <br></br>

        <label htmlFor="lastName"> last name</label>
        <input type="text" id="lastName" {...register("lastName")} />
        <br></br>

        <label htmlFor="panCard"> PAN card</label>
        <input type="file" id="panCard" {...register("panCard")} />
        <br></br>

        <label htmlFor="panNumber"> PAN number</label>
        <input
          type="text"
          id="panNumber"
          {...register("panNumber")}
          maxLength={10}
        />
        <br></br>

        <label htmlFor="aadhaarCard"> Aadhaar card</label>
        <input type="file" id="aadhaarCard" {...register("aadhaarCard")} />
        <br></br>

        <label htmlFor="aadhaarNumber"> Aadhaar number</label>
        <input
          type="text"
          id="aadhaarNumber"
          {...register("aadhaarNumber")}
          maxLength={12}
        />
        <br></br>

        <label htmlFor="address"> address</label>
        <input type="text" id="address" {...register("address")} />
        <br></br>

        <label htmlFor="email"> email</label>
        <input type="email" id="email" {...register("email")} />
        <br></br>

        <label htmlFor="loanAmount">Loan amount</label>
        <input
          type="number"
          id="loanAmount"
          {...register("loanAmount")}
          min={0}
        />
        <br></br>

        <button>Submit</button>
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default LoanForm;
