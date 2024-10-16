import { useState } from "react";
import Select from "react-select";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/Cal.css"

const AreaConverter = () => {
  const [fromUnit, setFromUnit] = useState(null);
  const [toUnit, setToUnit] = useState(null);
  const [value, setValue] = useState("");
  const [convertedValue, setConvertedValue] = useState("");

  const unitOptions = [
    { value: "SqYard", label: "Square Yard" },
    { value: "Acre", label: "Acre" },
    { value: "SqMeter", label: "Square Meter" },
    { value: "Hectare", label: "Hectare" },
    { value: "SqFoot", label: "Square Foot" },
    { value: "SqKm", label: "Square Kilometer" },
    { value: "SqMile", label: "Square Mile" },
    { value: "Lessa", label: "Lessa" },
    { value: "Gaj", label: "Gaj" },
    { value: "Marla", label: "Marla" },
    { value: "SqKaram", label: "Square Karam" },
    { value: "SqCm", label: "Square Centimeter" },
    { value: "Ankanam", label: "Ankanam" },
    { value: "Killa", label: "Killa" },
    { value: "Kanal", label: "Kanal" },
    { value: "Ground", label: "Ground" },
    { value: "Chatak", label: "Chatak" },
    { value: "Pura", label: "Pura" },
    { value: "Dismil", label: "Dismil" },
    { value: "Gajam", label: "Gajam" },
    { value: "Bigha", label: "Bigha" },
    { value: "BiswaKacha", label: "Biswa Kacha" },
    { value: "Dhur", label: "Dhur" },
    { value: "Perch", label: "Perch" },
    { value: "Murabba", label: "Murabba" },
    { value: "Biswa", label: "Biswa" },
    { value: "SqInch", label: "Square Inch" },
    { value: "Nali", label: "Nali" },
    { value: "Cent", label: "Cent" },
    { value: "Decimal", label: "Decimal" },
    { value: "Guntha", label: "Guntha" },
    { value: "Katha", label: "Katha" },
  ];

  const conversionToSqMeter = {
    SqYard: 0.836127,
    Acre: 4046.85642,
    SqMeter: 1,
    Hectare: 10000,
    SqFoot: 0.092903,
    SqKm: 1e6,
    SqMile: 2.58999e6,
    Lessa: 1 / 20,
    Gaj: 0.836127,
    Marla: 25.2929,
    SqKaram: 3.3445,
    SqCm: 0.0001,
    Ankanam: 67.26,
    Killa: 4046.85642,
    Kanal: 505.857,
    Ground: 203,
    Chatak: 45.0,
    Pura: 71.26,
    Dismil: 40.4686,
    Gajam: 0.836127,
    Bigha: 1337.803776,
    BiswaKacha: 55.7413,
    Dhur: 3.3445,
    Perch: 25.2929,
    Murabba: 101171.4106,
    Biswa: 125.421,
    SqInch: 0.00064516,
    Nali: 202.34,
    Cent: 40.4686,
    Decimal: 40.4686,
    Guntha: 101.171,
    Katha: 126.441,
  };

  const handleConvert = () => {
    if (!fromUnit || !toUnit || !value) {
      setConvertedValue("Please fill in all fields");
      return;
    }
    const fromFactor = conversionToSqMeter[fromUnit.value];
    const toFactor = conversionToSqMeter[toUnit.value];
    if (fromFactor === undefined || toFactor === undefined) {
      setConvertedValue("Invalid conversion for selected units");
      return;
    }
    const valueInSqMeters = parseFloat(value) * fromFactor;
    const result = valueInSqMeters / toFactor;
    setConvertedValue(
      `${value} ${fromUnit.label} = ${result.toFixed(4)} ${toUnit.label}`
    );
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4" style={{ color: 'black' }}>Area Converter</h2>
      <div className="card p-4">
        <div className="mb-3">
          <label className="form-label">From</label>
          <Select
            options={unitOptions}
            value={fromUnit}
            onChange={setFromUnit}
            placeholder="Select unit"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">To</label>
          <Select
            options={unitOptions}
            value={toUnit}
            onChange={setToUnit}
            placeholder="Select unit"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Value</label>
          <input
            type="number"
            className="form-control"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter value"
          />
        </div>
        <button className="btn btn-primary" onClick={handleConvert}>
          Convert
        </button>
        {convertedValue && (
          <div className="mt-3">
            <h4 className="text-success">{convertedValue}</h4>
          </div>
        )}
      </div>
    </div>
  );
};

export default AreaConverter;
