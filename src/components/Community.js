import React, { useState } from 'react';
import '../index.css';


import { autoState } from './Auto.js';

class Community extends React.Component {
  #defenseMessage = "";
  #generalMessage = "";
  #drivingMessage = "";
  constructor(props) {
    super(props);
    this.state = {
      chargeStationAuto: new ChargeStation(),
      chargeStation: new ChargeStation(),
    }
  }
  get defenseMessage(){return this.#defenseMessage;}
  set defenseMessage(m){this.#defenseMessage = m;}
  get generalMessage(){return this.#generalMessage;}
  set generalMessage(m){this.#generalMessage = m;}
  get drivingMessage(){return this.#drivingMessage;}
  set drivingMessage(m){this.#drivingMessage = m;}

  score(auto) {
    let chargeStation = this.state.chargeStation;
    if(auto){
      chargeStation = this.state.chargeStationAuto;
    }
    else{
      chargeStation = this.state.chargeStation;
    }
    let csDockFail = <img id="img" src="img/failedDock.svg" width="200"/>
    let csDockSuccess= <img id="img" src="img/sucessDock.svg" width="200"/>
    let csEngageFail = <img id="img" src="img/failedEngage.svg" width="200"/>
    let csEngageSucess = <img id="img" src="img/sucessEngage.svg" width="200"/>
    let defaultCharge = <img id="img" src="img/defaultCharge.svg" width="200"/>

    

    if (chargeStation.out == null) {
      chargeStation.out = "-";
      chargeStation.sym = csDockFail;     
      if(auto){
        chargeStation.pointsChargeAuto = 0;

      } 
      else{
      chargeStation.pointsCharge = 0;
      }
    }
    else if (chargeStation.out === "-") {
      chargeStation.out = "+";
      chargeStation.sym = csDockSuccess;
      if(auto){
        chargeStation.pointsChargeAuto = 6;

      } 
      else{
      chargeStation.pointsCharge = 6;
      }    }
    else if(chargeStation.out === "+"){
      chargeStation.out = "*";
      chargeStation.sym = csEngageFail;
      if(auto){
        chargeStation.pointsChargeAuto = 0;

      } 
      else{
      chargeStation.pointsCharge = 0;
      }    }
    else if(chargeStation.out === "*"){
      chargeStation.sym = csEngageSucess;
      chargeStation.out = "asfaf";
      if(auto){
        chargeStation.pointsChargeAuto = 10;

      } 
      else{
      chargeStation.pointsCharge = 10;
      }    }
    else {
      chargeStation.out = null;
      chargeStation.sym = defaultCharge;
      if(auto){
        chargeStation.pointsChargeAuto = 0;

      } 
      else{
      chargeStation.pointsCharge = 0;
      }    }
      if(auto && chargeStation.pointsChargeAuto != 0){
        chargeStation.pointsChargeAuto+=2;
      }


    if(auto){
      this.setState({
        chargeStationAuto: chargeStation,
      });
    }
    else{
    this.setState({
      chargeStation: chargeStation,
    });
  }
  }

  renderCharge(auto) {
    let chargeStation = this.state.chargeStation;
    if(auto){
      chargeStation = this.state.chargeStationAuto;
    }
    else{
      chargeStation = this.state.chargeStation;
    }
    return(
      <ChargeOut
        ChargeStation={chargeStation}
        auto={auto}
        onClick={() => this.score(auto)}
      />
    );
  }
  renderComments(){
    let dmsg;
    let gmsg;
    let drmsg;
    const submit = (e) =>{
      e.preventDefault();
    }
    const setMessage = (m) =>{
      dmsg = m;
      this.defenseMessage = dmsg;
    }
    const setGMessage = (m) =>{
      gmsg = m;
      this.generalMessage = gmsg;
    }
    const setDMessage = (m) =>{
      drmsg = m;
      this.drivingMessage = drmsg;
    }
    //Save doesn't actually do anything but log saved message to console!
    return(
      <div className='commentSection'>
      <form onSubmit={submit}>
      <legend><b>Defense Comments</b></legend> 
      <textarea type="text" 
      required 
      value={dmsg}
      onChange={(e) => setMessage(e.target.value)}
      rows="15"
      cols="25"
      />
      <br></br>
      <button onClick={(e) => {console.log(this.defenseMessage)}}>Save</button>
      </form>
      <br></br>

      <form onSubmit={submit}>
      <legend><b>General/Offense Comments</b></legend> 
      <textarea type="text" 
      required 
      value={gmsg}
      onChange={(e) => setGMessage(e.target.value)}
      rows="15"
      cols="25"
      />
      <br></br>
      <button onClick={(e) => {console.log(this.generalMessage)}}>Save</button>
      </form>
      <br></br>

      <form onSubmit={submit}>
      <legend><b>Driving Comments</b></legend> 
      <textarea type="text" 
      required 
      value={gmsg}
      onChange={(e) => setDMessage(e.target.value)}
      rows="15"
      cols="25"
      />
      <br></br>
      <button onClick={(e) => {console.log(this.drivingMessage)}}>Save</button>
      </form>
      <br></br>

  
      </div>
    )
  }
    



  render() {
    return(
      <div className="Community">
        {
        this.renderCharge(true)
        }
        {
          this.renderCharge(false)
        }
        {
        this.renderComments()
        }

      </div>
    );
  }
}
class ChargeStation {
  static pointsCharge = 0;
  static pointsChargeAuto = 0;
  #out = null;
  #sym = <img id="img" src="img/defaultCharge.svg" width="200"/>;
  constructor(out, points) {
    this.#out = out;
  }
  static getScore(){
    return ChargeStation.pointsCharge + ChargeStation.pointsChargeAuto;
  }

  get out() { return (this.#out); }
  get sym() {return (this.#sym);}
  get pointsCharge() { return (ChargeStation.pointsCharge); }
  get pointsChargeAuto() { return (ChargeStation.pointsChargeAuto); }


  set out(out) { this.#out = out; }
  set pointsCharge(points) { ChargeStation.pointsCharge = points;}
  set pointsChargeAuto(points) { ChargeStation.pointsChargeAuto = points; }

  set sym(s){this.#sym = s;}
}

function ChargeOut(props) {
  return (
    <div className="chargeStation-box">
      <legend>
        {props.auto ? "Auto" : "Tele-Op"}
      </legend>
    <button className="chargeStation" onClick={props.onClick}>
      {props.ChargeStation.sym}
     </button>
     </div>
     
  )
}

export {Community, ChargeStation};