import Head from 'next/head'
import React, { useState, useEffect } from 'react';
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import styled, { keyframes, css } from "styled-components";

const StyledButton = styled.button`
  width: 100%;
  height: 50px;
  border-radius: 2rem;
  background: white;
  margin: 10px auto;
  outline: black;
  align-items: center;
  justify-content: center;
`

const DisplayWeather = styled.div`
  width: 100%;
  margin: 0 auto;
  padding-top: 20px;
  padding-bottom: 20px;
  font-weight: bold;
  text-align: center;
  font-size: xxx-large;
`

const StyledImage = styled.img`
  width: 100%;
`

const HintAnimation = keyframes`
  0% {
    opacity: 0
  }
  49% {
    opacity: 0
  }
  50% {
    opacity: 1
  }
`;

const animation =
  css`
    ${HintAnimation} 1s infinite linear;
  `

const Hint = styled.p`
  width: 100%;
  font-style: italic;
  text-decoration-line: ${p => p.underline ? "underline" : null};
  text-align: center;
  cursor: ${p => p.pointer ? "pointer" : null};
  animation: ${p => p.animation && animation};
`

const Home = () => {
  const [weatherToDisplay, setWeatherToDisplay] = useState('');
  const [gfycatToDisplay, setGfycatToDisplay] = useState('');

  const getWeatherAndGfycat = () => {
    fetch("/api/weather")
      .then(response => response.json())
      .then(data => {
        setWeatherToDisplay(data.weather)
      })
      .catch(() => {
        console.log('Error getting weather')
      })
      .then(fetch(`/api/gfycat?weather=${weatherToDisplay}`)
        .then(response => response.json(), )
        .then(data => {
          setGfycatToDisplay(data.gif)
          console.log(data)
        })
        .catch(() => {
          console.log('Error getting gif')
        })
    )
  }

  const getGfycat = ()  => {
    fetch(`/api/gfycat?weather=${weatherToDisplay}`)
      .then(response => response.json())
      .then(data => {
        setGfycatToDisplay(data.gif)
      })
      .catch(() => {
        console.log('Error')
      });
  }

  useEffect(() => {
    if (!weatherToDisplay || null) return;

    return getGfycat();
  }, [weatherToDisplay]);

  const feelGoodWeather = ["sunny", "smiley", "sunshine", "warm", "calm", "blue skies", "cheerful", "bright"];
  const randomGoodWeather = feelGoodWeather[Math.floor(Math.random() * 8)]

  const isDisplayWeatherDiffFromOriginal = feelGoodWeather.includes(weatherToDisplay);

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.content}>
        <p>Hi, this is <a href="https://www.linkedin.com/in/felicia-chong-58878b4b/" target="_blank">me!</a></p>
        <p>So...
          "The average British person spends the equivalent of four and a half months of their life talking about the weather, a study suggests." says <a href="https://www.independent.co.uk/extras/lifestyle/british-people-time-spent-talking-weather-conversation-topic-heatwave-a8496166.html" target="_blank">The Independent</a></p>
        <p>And... so here we are, let's talk (more) weather!</p>
      </section>
      <section>
        <StyledButton onClick={getWeatherAndGfycat}>What is today's weather?</StyledButton>
        <DisplayWeather>
          {weatherToDisplay.toUpperCase()}
        </DisplayWeather>
        <StyledImage src={gfycatToDisplay || ""} />
        {weatherToDisplay && (
          <Hint underline pointer animation onClick={() => setWeatherToDisplay(randomGoodWeather)}>Hint: you can do better, trust me!</Hint>
        )}
        {weatherToDisplay && isDisplayWeatherDiffFromOriginal && (
          <Hint>
            p.s. I hope this makes your day (better weather === better day yes!)
          </Hint>
        ) }
      </section>
    </Layout>
  )
}

export default Home;


