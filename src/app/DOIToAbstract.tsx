"use client";
import {Button, TextInput} from "@mantine/core";
import {useState} from "react";
import axios from "axios";

type InvertedIndex = Record<string, number[]>

interface Work {
  abstract_inverted_index: InvertedIndex;
}

const invert_inverted_index = (inverted_index: InvertedIndex) => {
  const maxIndex = Object.values(inverted_index).reduce((acc, cur) => Math.max(acc, Math.max(...cur)), 0);
  let recreatedAbstract = new Array(maxIndex);
  for (const [word, indices] of Object.entries(inverted_index)) {
    for (const index of indices) {
      recreatedAbstract[index] = word;
    }
  }
  return recreatedAbstract.join(" ");
}

const DOIToAbstract = () => {
  const [doi, setDoi] = useState("");
  const [abstract, setAbstract] = useState("");
  const [error, setError] = useState("");

  const handleGetAbstract = async () => {
    try {
      const response = await axios.get(`https://api.openalex.org/works/${doi}`);
      const work: Work = response.data;
      setAbstract(invert_inverted_index(work.abstract_inverted_index));
    } catch (e) {
      console.error(e);
      setError("Could retrieve abstract from OpenAlex");
    }
  }

  return (
    <>
      <TextInput
        id="input-demo"
        label="DOI"
        value={doi}
        onChange={(event) => setDoi(event.currentTarget.value)}
        description="Please enter a DOI to get the abstract of an article from OpenAlex"
        error={error}
      >
      </TextInput>
      <Button onClick={handleGetAbstract}>
        Get Abstract
      </Button>
      <p>
        {abstract}
      </p>
    </>
  )
}

export default DOIToAbstract;