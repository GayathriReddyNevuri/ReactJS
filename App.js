import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

function Form() {
  const navigate = useNavigate();
  const [v, setV] = useState({
    fn: "", ln: "", un: "", em: "", pw: "", ph: "",
    cc: "+91", co: "", ci: "", pan: "", ad: ""
  });
  const [sh, setSh] = useState(false);

  const e = {
    fn: !v.fn, ln: !v.ln, un: !v.un,
    em: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.em),
    pw: v.pw.length < 6, ph: v.ph.length < 10,
    co: !v.co, ci: !v.ci,
    pan: !/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(v.pan),
    ad: v.ad.length !== 12
  };

  const ok = Object.values(e).every(x => !x);
  const c = x => setV({ ...v, [x.target.name]: x.target.value });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form 
        onSubmit={x => { x.preventDefault(); ok && navigate("/view", { state: v }) }} 
        className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg space-y-4"
      >
        {["fn","ln","un","em","pw","cc","ph","co","ci","pan","ad"].map((f,i) => (
          <div key={f} className="flex flex-col">
            <label className="mb-1 font-semibold">
              {f==="fn"?"First Name":f==="ln"?"Last Name":f==="un"?"Username":f==="em"?"Email":f==="pw"?"Password":f==="cc"?"Country Code":f==="ph"?"Phone":f==="co"?"Country":f==="ci"?"City":f==="pan"?"PAN":"Aadhaar"}
            </label>
            {f==="pw" ? (
              <div className="flex gap-2">
                <input 
                  type={sh ? "text" : "password"} 
                  name="pw" 
                  placeholder="Enter password" 
                  onChange={c} 
                  className={`flex-1 p-2 border rounded ${e.pw && "border-red-400"}`} 
                />
                <button type="button" onClick={() => setSh(!sh)} className="px-4 py-2 border rounded">{sh ? "Hide" : "Show"}</button>
              </div>
            ) : (
              <input 
                name={f} 
                value={v[f]} 
                placeholder={`Enter ${f}`} 
                onChange={c} 
                className={`w-full p-2 border rounded ${e[f] && "border-red-400"}`} 
              />
            )}
          </div>
        ))}
        <button disabled={!ok} className="w-full bg-black text-white p-2 rounded disabled:opacity-40">Submit</button>
      </form>
    </div>
  );
}

function View() {
  const { state } = useLocation();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-md space-y-2">
        {Object.entries(state).map(([k, v]) => <p key={k}><b>{k}</b>: {v}</p>)}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/view" element={<View />} />
      </Routes>
    </BrowserRouter>
  );
}
