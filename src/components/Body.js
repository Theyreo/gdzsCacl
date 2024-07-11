import "./Body.css";

import { useState } from "react";

function Body() {
    const [typeSizod, setTypeSizod] = useState("ДАСВ"); // Выбор аппарата
    const [minPressure, setMinPressure] = useState(""); // Минимальное давлние при включении в СИЗОД
    const [maxFall, setMaxFall] = useState(""); // Максимальное падение давления
    const [exitPressure, setExitPressure] = useState("");// Давление при котором необходимо покинуть НДС
    const [cylinderVolume, setCylinderVolume] = useState("7"); // Объем баллона
    const [deltaT, setDeltaT] = useState(""); //Расчет промежутка времени включения в СИЗИД до подачи команды постовым поста безопасности ГДЗС на возвращение звена ГДЗС из НДС
    const [generalT, setGeneralT] = useState(""); // Общее время работы 
    const [turnOnTime, setTurnOnTime] = useState(""); // Время включения
    const [exitT, setExitT] = useState(""); // Время подачи команды постовым поста безопасности ГДЗС на возращение звена ГДЗС из НДС 
    const [returnTime, setReturnTime] = useState(""); // T возвращения

    // Находим минимальное давление при включении в СИЗОД
    function minimumSwitchingPressure(e) {
            if(minPressure === "") {
                if(e.target.value > 100) {
                    setMinPressure(e.target.value);
                }
            }
            if(e.target.value < minPressure) {
                if(e.target.value > 100){
                    setMinPressure(e.target.value);
                }
            }
            
    }

    // Задаем тип СИЗОД
    function saveTypeSizod(e) {
        setTypeSizod(e.target.value);
    }

    function saveCylinderVolume(e) {
        setCylinderVolume(e.target.value);
    }

    function starTime(e) {
        setTurnOnTime(e.target.value);
    }

    function calculation() {
        let pMin = Number(minPressure);
        let pMaxFall = pMin / 3;
        let pExitPressure = pMin - pMaxFall;
        let consumption = typeSizod === "ДАСВ" ? 45 : 2;
        let deltaT = pMaxFall * Number(cylinderVolume) / consumption;
        let generalT = pMin * Number(cylinderVolume) / consumption;
        let exitT = new Date(turnOnTime);
        exitT = exitT.getTime();
        exitT = Math.floor(exitT + deltaT * 60000);
        exitT = new Date(exitT);

        let returnTime = new Date(turnOnTime);
        returnTime = returnTime.getTime();
        returnTime = Math.floor(returnTime + generalT * 60000);
        returnTime = new Date(returnTime);
        setMaxFall(Math.floor(pMaxFall));
        setExitPressure(Math.floor(pExitPressure));
        setDeltaT(Math.floor(deltaT) + " мин.");
        setGeneralT(Math.floor(generalT) + " мин.");
        setExitT(exitT.toLocaleTimeString());
        setReturnTime(returnTime.toLocaleTimeString());
    }

    return (
        <div className="Body">
            <header className="Body-Header">
                <div className="Body-type-Sizod">
                            <span className="Body-title-table">Выберете тип СИЗОД</span>
                            <span>
                            <select name="typeSizod" defaultValue="ДАСВ" onChange={saveTypeSizod}>
                                        <option value="ДАСВ">ДАСВ</option>
                                        <option value="ДАСК">ДАСК</option>
                                    </select>
                            </span>
                        </div>
            </header>
            <section>
                <div className="Body-Calc">
                    <div className="Body-Calc-Conteiner">
                        
                        <div className="Body-Structure">
                                <span className="Body-title-table">Состав звена</span>
                                <span>№1</span> 
                                <span>№2</span>
                                <span>№3</span>
                                <span>№4</span> 
                                <span>№5</span>
                        </div>
                        <div className="Body-start-pressure" onChange={minimumSwitchingPressure}>
                            <span className="Body-title-table">Давление при включении</span>
                            <span><input type="number" min={100} max={300} name="first_person"></input></span>
                            <span><input type="number" min={100} max={300} name="second_person"></input></span>
                            <span><input type="number" min={100} max={300} name="third_person"></input></span>
                            <span><input type="number" min={100} max={300} name="fourth_person"></input></span>
                            <span><input type="number" min={100} max={300} name="fifth_person"></input></span>
                        </div>
                        <div className="Body-Sizod-settings">
                            <span className="Body-title-table">Настройки СИЗОД</span>
                            <span>Объем баллонов (V<sub>б.</sub>)</span>
                            <span>Средний расход вохдуха (Q<sub>возд.</sub>)</span>
                            <span>Наименьшее давление в составе звена (P<sub>min.вкл.</sub>)</span>
                            <span>Коэффициент, учитывающий необходимий  запас дыхательной смеси</span>
                            <span>Время включения (T<sub>вкл.</sub>)</span>
                        </div>
                        <div className="Body-inputs"> 
                        <span className="Body-title-table"></span>
                            <span>
                            <select name="cylinder_volume" defaultValue="7" onChange={saveCylinderVolume}>
                                        <option name="Cylinder_value">7</option>
                                        <option name="Cylinder_value">6.8</option>
                                        <option name="Cylinder_value">2.5</option>
                            </select>
                            </span>
                            <span><input type="number" name="average_air_consumption" readOnly value={typeSizod === "ДАСВ" ? "45" : "2"}></input></span>
                            <span><input type="number" name="Minimum Activation" value={minPressure} readOnly></input></span>
                            <span><input type="number" name="respiratory_mixture_coefficient" readOnly value="3"></input></span>
                            <span><input type="datetime-local" name="turn-on_time" onChange={starTime}></input></span>
                        </div>
                         
                        </div>
                </div>
            </section>
            <div className="Body-result-button">
                <button onClick={calculation} className={(turnOnTime  &&  minPressure) === ""  ? "Body-calc-button-hidden" : "Body-calc-button-visible"}>Рассчитать</button>
            </div>
            <section>
                <div className="Body-result">
                    <h3>Результаты расчетов параметров работы в СИЗОД</h3>
                    <div className="resultRow">
                        <span>Максимально допустимого падения в СИЗИД (P<sub>max.пад.</sub>)</span>
                        <input type="string" name="maxDrop" value={maxFall} readOnly></input>
                    </div>
                    <div className="resultRow">
                        <span>Давление при котором необходимо покинуть НДС (P<sub>к.вых.</sub>)</span>
                        <input type="string" name="backPressure" value={exitPressure} readOnly></input>
                    </div>
                    <div className="resultRow">
                        <span>Расчет промежутка времени включения в СИЗИД до подачи <br />
                         команды постовым поста безопасности ГДЗС на возвращение <br />
                          звена ГДЗС из НДС(<sub>△</sub>T)</span>
                        <input type="string" name="exitCommand" value={deltaT} readOnly></input>
                    </div>
                    <div className="resultRow">
                        <span>Время подачи команды постовым поста безопасности ГДЗС на <br /> возращение звена ГДЗС из НДС (T.<sub>вых.</sub>)</span>
                        <input type="string" name="exitTime" value={exitT} readOnly></input>
                    </div>
                    <div className="resultRow">
                        <span>Общее время работы (T<sub>общ.</sub>)</span>
                        <input type="string" name="totalTime" value={generalT} readOnly></input>
                    </div>
                    <div className="resultRow">
                        <span>Ожидаемое время возвращения(T<sub>возвр.</sub>)</span>
                        <input type="string" name="returnTime" value={returnTime} readOnly></input>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Body;