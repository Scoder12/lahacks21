import React from "react";
import { AiFillTrophy } from "react-icons/ai";
import { ImEnter } from "react-icons/im";
import { MdLooksOne, MdLooksTwo, MdLooks3 } from "react-icons/md";

const ChallengeInfo = () => {
  return (
    <div className="challenge-info">
      <div className="challenge-info-card">
        <div className="title-cont">
          <h1 className="title">Clean up microplastics in the ocean</h1>
          <h1 className="month">March Challenge</h1>
        </div>
        <h2 className="people">1,578 people joined this challenge</h2>
        <div className="prizes">
          <div className="prize">
            <AiFillTrophy />
            <p>Oculus Rift</p>
          </div>
          <div className="prize">
            <MdLooksOne />
            <p>1000 points</p>
          </div>
          <div className="prize">
            <MdLooksTwo />
            <p>500 points</p>
          </div>
          <div className="prize">
            <MdLooks3 />
            <p>300 points</p>
          </div>
          <div className="prize">
            <ImEnter />
            <p>10 points</p>
          </div>
        </div>
      </div>
      <button className="join">Join challenge</button>
      <div className="description-cont">
        <h2 className="description-header">Description</h2>
        <p className="description-content">
          Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
          sint. Velit officia consequat duis enim velit mollit. Exercitation
          veniam consequat sunt nostrud amet. Amet minim mollit non deserunt
          ullamco est sit aliqua dolor do amet sint. Velit officia consequat
          duis enim velit mollit. Exercitation veniam consequat sunt nostrud
          amet. Amet minim mollit non deserunt ullamco est sit aliqua dolor do
          amet sint. Velit officia consequat duis enim velit mollit.
          Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non
          deserunt ullamco est sit aliqua dolor do amet sint. Velit officia
          consequat duis enim velit mollit. Exercitation veniam consequat sunt
          nostrud amet. Amet minim mollit non deserunt ullamco est sit aliqua
          dolor do amet sint. Velit officia consequat duis enim velit mollit.
          Exercitation veniam consequat sunt nostrud amet.
        </p>
      </div>
    </div>
  );
};

export default ChallengeInfo;
