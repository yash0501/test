import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
// import "./css/Dashboard.css";
import { auth, db, logout } from "../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";

import Navbar from "./Navbar";
import {
  startVotingOperation,
  voteCandidateOperation,
  endVotingOperation,
  resetVotingOperation,
  mintNftOperation,
} from "../utils/operation";
import { fetchStorage } from "../utils/tzkt";

function Dashboard() {
  const [user, error] = useAuthState(auth);
  //   const [name, setName] = useState("");
  const navigate = useNavigate();

  // Players holding lottery tickets
  const [status, setStatus] = useState("");
  const [voteCountA, setVoteCountA] = useState(0);
  const [voteCountB, setVoteCountB] = useState(0);
  const [loading, setLoading] = useState(false);

  // Set players and tickets remaining
  useEffect(() => {
    if (!user) return navigate("/");
    // TODO 9 - Fetch players and tickets remaining from storage
    (async () => {
      const storage = await fetchStorage();
      // console.log(storage);
      setStatus(Object.values(storage.status));
      setVoteCountA(Object.values(storage.candidate_A_votes));
      setVoteCountB(Object.values(storage.candidate_B_votes));
    })();
  }, []);

  // TODO 7.a - Complete onBuyTicket function
  const startVoting = async () => {
    try {
      setLoading(true);
      await startVotingOperation();
      alert("transaction successful");
    } catch (err) {
      alert(err.message);
    }
    setLoading(false);
  };

  const voteFor = async (candidate) => {
    try {
      setLoading(true);
      await voteCandidateOperation(candidate);
      alert("transaction successful");
    } catch (err) {
      alert(err.message);
    }
    setLoading(false);
  };

  const endVoting = async () => {
    try {
      setLoading(true);
      await endVotingOperation();
      alert("transaction successful");
    } catch (err) {
      alert(err.message);
    }
    setLoading(false);
  };

  const resetVoting = async () => {
    try {
      setLoading(true);
      await resetVotingOperation();
      alert("transaction successful");
    } catch (err) {
      alert(err.message);
    }
  };

  const mintNft = async () => {
    try {
      setLoading(true);
      let _mint = {
        address: "tz1eKCEjV4aFSo5BXUCktkN9NJtDyvRF2wxS",
        value: 12,
        sig: "edsigu4rMdMm2gYEpJCjJkRcmiCZ91RswzE4TB3HmkbsHLaQpkB7PJLCEhwsUe7cyohQaFVizfxkx2x2N1CMa9svoKnZF6zQ9Vs",
        data_bytes:
          "050100000027747a31654b43456a56346146536f35425855436b746b4e394e4a744479765246327778537c3132",
        address1: "tz1eKCEjV4aFSo5BXUCktkN9NJtDyvRF2wxS",
        amount: "12",
      };
      await mintNftOperation(_mint);
      alert("transaction successful");
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  };

  return (
    <div className="h-100">
      <Navbar />
      <div className="container">
        <div>
          <h1>Mint</h1>
          <button onClick={mintNft}>Mint NFT</button>
        </div>

        <p className="m-5 p-5">Status = {status}</p>
        <p>Vote Count A = {voteCountA}</p>
        <p>Vote Count B = {voteCountB}</p>
        <br />
        <button onClick={startVoting}>
          {loading ? "Loading..." : "Start Voting"}
        </button>
        <br />
        <button onClick={() => voteFor("A")}>
          {loading ? "Loading..." : "Vote For A"}
        </button>
        <button onClick={() => voteFor("B")}>
          {loading ? "Loading..." : "Vote For B"}
        </button>
        <br />
        <button onClick={endVoting}>
          {loading ? "Loading..." : "End Voting"}
        </button>
        <br />
        <button onClick={resetVoting}>
          {loading ? "Loading..." : "Reset Voting"}
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
