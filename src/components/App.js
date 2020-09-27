import React from 'react';
import '../style/App.css';
import Header from './Header';
import Footer from './Footer';
import Project from './Project';
import About from './About';

function App() {
  fetch('get-projects.php')
  .then(response=>response.json())
  .then(json=>{
    console.log(json);
  });
  
  return (
    <div className="App">
      <Header/>
      <div id="projects">
        <Project styleType='ProjectHalfShowTablet' title='NewGroundsProfle' modalNum='37' imageLink="https://raw.githubusercontent.com/fasky/Images/master/PortfolioStuff/dl-tank.gif" secondImage="https://raw.githubusercontent.com/fasky/Images/master/PortfolioStuff/dl-tank.gif" description="<a target='_blank' href='https://fasky.newgrounds.com/'>Click Here.</a>"/>

      </div>
      <div id="aboutSection">
        <About/>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
