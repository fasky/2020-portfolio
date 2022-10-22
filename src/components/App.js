import React from 'react';
import '../style/App.css';
import Header from './Header';
import Footer from './Footer';
import Project from './Project';
import About from './About';

// var result = {
//   styleType: "",
//   title:"",
//   modalNum:"",
//   imageLink:"",
//   secondImage:"",
//   description:""
// };
var results = [];
var allProjects;

class App extends React.Component {

  componentDidMount(){
    //this.fetchProjects();
  }

  render(){
    return (
      <div className="App">
        <Header/>
        <div id="projects">
          <Project styleType="ProjectFullW" title="Mordecai Marches To Manchuria" modalNum="0" imageLink="https://raw.githubusercontent.com/fasky/Images/master/MordechiTitle.PNG" secondImage="https://raw.githubusercontent.com/fasky/Images/master/MordechiMap.PNG" description="<a target='_blank' href='https://mordechi-fasky.herokuapp.com/'>Link (may take a moment to spin up on Heroku, lost access to diary images)</a> - Re-engineering and modernizing a history site using React, JS, GraphQL, Node.js, and Airtable. Full-stack, remote. Database work, research, server development, front-end development."/>
          
          <Project styleType="ProjectFullW" title="Tiger Center" modalNum="1" imageLink="https://raw.githubusercontent.com/fasky/Images/master/TC.png" secondImage="https://raw.githubusercontent.com/fasky/Images/master/TCC.PNG" description="<a target='_blank' href='https://tigercenter.rit.edu/tigerCenterApp/landing'>Website</a> - Worked in Angular, TypeScript, HTML, CSS, and Java to improve a webapp for use by the student body. Experience with Scrum, documentation, interfacing with customers/stakeholders."/>
          
          <Project styleType="ProjectFullW" title="National Parks Map" modalNum="2" imageLink="https://www.nps.gov/common/commonspot/templates/images/logos/nps_social_image_02.jpg" secondImage="https://raw.githubusercontent.com/fasky/Images/master/NatParks.PNG" description="<a target='_blank' href='./project2/project2.html'>Link (not currently functional)</a> - A web app built on HTML, CSS, ES6 (JS), Vue.js, and using multiple web services to deliver real time U.S. National Park and weather information through use of API's."/>
          
          <Project styleType="ProjectFullW" title="Skreeta Skraw" modalNum="3" imageLink="https://raw.githubusercontent.com/fasky/Images/master/PortfolioStuff/logo.png" secondImage="https://raw.githubusercontent.com/fasky/Images/master/PortfolioStuff/skreetaMainMenu.PNG" description="<a target='_blank' href='https://fasky.itch.io/skreeta-skraw'>Link to Itch</a> - Skreeta Skraw is a 'Trouble'-like board game, adapted here digitally for those without a means to make a board themselves. Features AI games and local multiplayer games."/>
          
          <Project styleType="ProjectFullW" title="Dark Plane" modalNum="4" imageLink="https://raw.githubusercontent.com/fasky/Images/master/DarkPlaneLogo.png" secondImage="https://raw.githubusercontent.com/fasky/Images/master/PortfolioStuff/DarkPlane.PNG" description="<a target='_blank' href='https://fasky.itch.io/dark-plane-proto'>Prototype on Itch</a> - <a target='_blank' href='https://docs.google.com/document/d/1wGGJxiY-w8xDuHNZKWuMtN3NjfxHAiiTwVrtuAY-Xns/edit?usp=sharing'>Design Doc</a> -  Prototype of Earthbound-like game about a boy accidently revealing a hidden plane of reality and having to turn everything back to normal."/>
          
          <Project styleType="ProjectHalf" title="Asteroids" modalNum="5" imageLink="https://raw.githubusercontent.com/fasky/Images/master/PortfolioStuff/asLogo.png" secondImage="https://raw.githubusercontent.com/fasky/Images/master/PortfolioStuff/Asteroids.PNG" description="<a target='_blank' href='https://github.com/fasky/unity-master/tree/master/Asteroids-Code'>Git</a> - <a target='_blank' href='https://fasky.itch.io/asteroids'>Download on Itch</a> - An Asteroids recreation in the theme of Star Wars - specifically Attack of the Clones. Made in Unity, for practice with vehicles and coding collisions."/>
          
          <Project styleType="ProjectFullWShowPhone" title="Asteroids" modalNum="6" imageLink="https://raw.githubusercontent.com/fasky/Images/master/PortfolioStuff/asLogo.png" secondImage="https://raw.githubusercontent.com/fasky/Images/master/PortfolioStuff/Asteroids.PNG" description="<a target='_blank' href='https://github.com/fasky/unity-master/tree/master/Asteroids-Code'>Git</a> - <a target='_blank' href='https://fasky.itch.io/asteroids'>Download on Itch</a> - An Asteroids recreation in the theme of Star Wars - specifically Attack of the Clones. Made in Unity, for practice with vehicles and coding collisions."/>  
          
          <Project styleType="ProjectHalf" title="Spear of Cassius" modalNum="7" imageLink="https://raw.githubusercontent.com/fasky/Images/master/spearOfCassius.png" secondImage="https://raw.githubusercontent.com/fasky/Images/master/Spear.PNG" description="<a target='_blank' href='https://fasky.itch.io/spear-of-cassius'>Play on Itch</a> - A short fighting game with a side scrolling segment. Made in PixiJS, lone developer. <a target='_blank' href = 'https://github.com/fasky/spear-of-cassius'>Git DL.</a>"/>
          
          <Project styleType="ProjectFullWShowPhone" title="Spear of Cassius" modalNum="8" imageLink="https://raw.githubusercontent.com/fasky/Images/master/spearOfCassius.png" secondImage="https://raw.githubusercontent.com/fasky/Images/master/Spear.PNG" description="<a target='_blank' href='https://fasky.itch.io/spear-of-cassius'>Play on Itch</a> - A short fighting game with a side scrolling segment. Made in PixiJS, lone developer. <a target='_blank' href = 'https://github.com/fasky/spear-of-cassius'>Git DL.</a>"/>
          
          <Project styleType="ProjectThird" title="Audio Visualizer" modalNum="9" imageLink="https://raw.githubusercontent.com/fasky/Images/master/AudioVis.png" secondImage="https://raw.githubusercontent.com/fasky/Images/master/AudioVisMore.png" description="<a target='_blank' href='./project1'>Link</a> - An audio visualizer made with ES6/JS, HTML, CSS, and Pure CSS."/>
          
          <Project styleType="ProjectFullWShowTablet" title="Audio Visualizer" modalNum="10" imageLink="https://raw.githubusercontent.com/fasky/Images/master/AudioVis.png" secondImage="https://raw.githubusercontent.com/fasky/Images/master/AudioVisMore.png" description="<a target='_blank' href='./project1'>Link</a> - An audio visualizer made with ES6/JS, HTML, CSS, and Pure CSS."/>
          
          <Project styleType="ProjectThird" title="The Void" modalNum="11" imageLink="https://raw.githubusercontent.com/fasky/Images/master/PortfolioStuff/voidLogo.png" secondImage="https://raw.githubusercontent.com/fasky/Images/master/PortfolioStuff/voidLogo.png" description="<a target='_blank' href='https://www.youtube.com/watch?v=3P57vzQRzuA'>The Void</a> - <a target='_blank' href='https://fasky.itch.io/the-void'>Download on Itch</a> - A dungeon crawling adventure through four distinct areas, each based on an element(Earth, Wind, etc.). With special abilities and pickups, the player fights their way to the final dungeon so they can return home. Made in GameMaker."/>         
          
          <Project styleType="ProjectFullWShowTablet" title="The Void" modalNum="12" imageLink="https://raw.githubusercontent.com/fasky/Images/master/PortfolioStuff/voidLogo.png" secondImage="https://raw.githubusercontent.com/fasky/Images/master/PortfolioStuff/voidLogo.png" description="<a target='_blank' href='https://www.youtube.com/watch?v=3P57vzQRzuA'>The Void</a> - <a target='_blank' href='https://fasky.itch.io/the-void'>Download on Itch</a> - A dungeon crawling adventure through four distinct areas, each based on an element(Earth, Wind, etc.). With special abilities and pickups, the player fights their way to the final dungeon so they can return home. Made in GameMaker."/>
          
          <Project styleType="ProjectThird" title="War Clicker" modalNum="13" imageLink="https://raw.githubusercontent.com/fasky/Images/master/PortfolioStuff/ClickerLogo.png" secondImage="https://raw.githubusercontent.com/fasky/Images/master/PortfolioStuff/clicker.PNG" description="<a target='_blank' href='https://fasky.itch.io/war-clicker'>Play War Clicker</a> - <a target='_blank' href = 'https://github.com/fasky/war-clicker'>Git<a/> - A Simple Strategy Game. Made in HTML, CSS, and JS. Collect gold and build units to try and take over the enemy tiles. Features multiple scenarios, difficulties, building types, and a music player."/>
          
          <Project styleType="ProjectFullWShowTablet" title="War Clicker" modalNum="14" imageLink="https://raw.githubusercontent.com/fasky/Images/master/PortfolioStuff/ClickerLogo.png" secondImage="https://raw.githubusercontent.com/fasky/Images/master/PortfolioStuff/clicker.PNG" description="<a target='_blank' href='https://fasky.itch.io/war-clicker'>Play War Clicker</a> - <a target='_blank' href = 'https://github.com/fasky/war-clicker'>Git<a/> - A Simple Strategy Game. Made in HTML, CSS, and JS. Collect gold and build units to try and take over the enemy tiles. Features multiple scenarios, difficulties, building types, and a music player."/>
          
          <Project styleType="ProjectFullW" title="Bethesda Mods" modalNum="28" imageLink="https://raw.githubusercontent.com/fasky/Images/master/PortfolioStuff/beth.jpg" secondImage="https://mods.bethesda.net/content/a20627c3-e618-445f-b30a-06b30ecff8e4_preview_754398_10395904557244347534_large.png" description="<a target='_blank' href='https://github.com/fasky/Images/tree/master/mediaOldTopLevel/mods'>Collection</a> - <a target='_blank' href='https://bethesda.net/en/mods/fallout4?author_username=Fasky&number_results=20&order=desc&page=1&product=fallout4'>Fallout 4</a> - A small collection of mods made for Bethesda Games.<br><a target='_blank' href='https://www.nexusmods.com/skyrim/mods/97633/'>Stalker Under The Blood Moon</a><br>Short Skyrim Quest - Dank Places - Practice in level design - <a target='_blank' href='https://drive.google.com/file/d/1Cawdz6ghJPPaZHuDPuKf5qiYsstkVD1E/view?usp=sharing'>Doc with video link</a><br><a target='_blank' href='https://www.nexusmods.com/tesarena/mods/18?tab=files'>TES Arena Sound Mod</a>"/>

          <Project styleType="ProjectHalf" title="UX Project - Amazon Blink" modalNum="15" imageLink="https://wallpapers.com/images/high/amazon-logo-on-black-background-o121czsdkvmzh6e9-o121czsdkvmzh6e9.jpg" secondImage="https://wallpapers.com/images/high/amazon-logo-on-black-background-o121czsdkvmzh6e9-o121czsdkvmzh6e9.jpg" description="<a target='_blank' href='https://github.com/fasky/Images/blob/master/Deliverable%2011.pdf'>Final Document</a> - Designed and Prototyped a multi-platform web/app UI for a made-up Amazon service, done in Photoshop, Wireframe.cc, and Marvel for prototyping."/>
          
          <Project styleType="ProjectFullWShowPhone" title="UX Project - Amazon Blink" modalNum="25" imageLink="https://wallpapers.com/images/high/amazon-logo-on-black-background-o121czsdkvmzh6e9-o121czsdkvmzh6e9.jpg" secondImage="https://wallpapers.com/images/high/amazon-logo-on-black-background-o121czsdkvmzh6e9-o121czsdkvmzh6e9.jpg" description="<a target='_blank' href='https://github.com/fasky/Images/blob/master/Deliverable%2011.pdf'>Final Document</a> - Designed and Prototyped a multi-platform web/app UI for a made-up Amazon service, done in Photoshop, Wireframe.cc, and Marvel for prototyping."/>

          <Project styleType="ProjectHalf" title="Plasma Peasant" modalNum="23" imageLink="https://raw.githubusercontent.com/fasky/Images/master/PortfolioStuff/plasma.png" secondImage="https://raw.githubusercontent.com/fasky/Images/master/PortfolioStuff/plasmaPlay.PNG" description="<a href='https://github.com/Therobodavo/Plasma-Peasant'>Git Repo</a> - A top down wave-based survival game. Survive against robotic enemies as a peasant from the past, stuck in the future. Shoot enemies, pick up powerups, and make it as far as you can. Includes a level editor for customizing level layouts."/>

          <Project styleType="ProjectFullWShowPhone" title="Plasma Peasant" modalNum="24" imageLink="https://raw.githubusercontent.com/fasky/Images/master/PortfolioStuff/plasma.png" secondImage="https://raw.githubusercontent.com/fasky/Images/master/PortfolioStuff/plasmaPlay.PNG" description="<a href='https://github.com/Therobodavo/Plasma-Peasant'>Git Repo</a> - A top down wave-based survival game. Survive against robotic enemies as a peasant from the past, stuck in the future. Shoot enemies, pick up powerups, and make it as far as you can. Includes a level editor for customizing level layouts."/>

          <Project styleType="ProjectThird" title="Pac-Man Recreation" modalNum="16" imageLink="https://raw.githubusercontent.com/fasky/Images/master/PortfolioStuff/pacMan.png" secondImage="https://raw.githubusercontent.com/fasky/Images/master/PortfolioStuff/play.png" description="<a target='_blank' href='https://fasky.itch.io/pacguy'>Itch DL</a> - <a target='_blank' href = 'https://www.youtube.com/watch?v=8mIvspCB77Q'>Pac-Man Recreation</a> - an accurate recreation of the original Pac-Man in GameMaker."/>

          <Project styleType="ProjectFullWShowTablet" title="Pac-Man Recreation" modalNum="17" imageLink="https://raw.githubusercontent.com/fasky/Images/master/PortfolioStuff/pacMan.png" secondImage="https://raw.githubusercontent.com/fasky/Images/master/PortfolioStuff/play.png" description="<a target='_blank' href='https://fasky.itch.io/pacguy'>Itch DL</a> - <a target='_blank' href = 'https://www.youtube.com/watch?v=8mIvspCB77Q'>Pac-Man Recreation</a> - an accurate recreation of the original Pac-Man in GameMaker."/>

          <Project styleType="ProjectThird" title="Gravity Joe" modalNum="18" imageLink="https://raw.githubusercontent.com/fasky/Images/master/PortfolioStuff/GravJoeLogo.PNG" secondImage="https://raw.githubusercontent.com/fasky/Images/master/PortfolioStuff/GravJoe.png" description="<a target='_blank' href='https://fasky.itch.io/gravity-joe'>Itch DL</a> - Gravity Joe - 2D platformer puzzle-ish game. Rotate the level to reach the exit. Avoid spikes. Handled bugfixes, QA, basic art - <a href='https://drive.google.com/file/d/1IOSO6miV6KS63znpcVErRXCu8qxA4TAZ/view?usp=sharing'>Short Doc</a> - <a href='https://drive.google.com/file/d/1P9ISi1wclZcAYHkN-lFE2PuY6yz_hTbt/view?usp=sharing'>Download</a> - <a href='https://github.com/louisgv/GravityJoe'>GitHub</a>"/>

          <Project styleType="ProjectFullWShowTablet" title="Gravity Joe" modalNum="19" imageLink="https://raw.githubusercontent.com/fasky/Images/master/PortfolioStuff/GravJoeLogo.PNG" secondImage="https://raw.githubusercontent.com/fasky/Images/master/PortfolioStuff/GravJoe.png" description="<a target='_blank' href='https://fasky.itch.io/gravity-joe'>Itch DL</a> - Gravity Joe - 2D platformer puzzle-ish game. Rotate the level to reach the exit. Avoid spikes. Handled bugfixes, QA, basic art - <a href='https://drive.google.com/file/d/1IOSO6miV6KS63znpcVErRXCu8qxA4TAZ/view?usp=sharing'>Short Doc</a> - <a href='https://drive.google.com/file/d/1P9ISi1wclZcAYHkN-lFE2PuY6yz_hTbt/view?usp=sharing'>Download</a> - <a href='https://github.com/louisgv/GravityJoe'>GitHub</a>"/>

          <Project styleType="ProjectThird" title="Misteaks Were Made" modalNum="20" imageLink="https://raw.githubusercontent.com/fasky/Images/master/PortfolioStuff/MisteaksLogo.png" secondImage="https://raw.githubusercontent.com/fasky/Images/master/PortfolioStuff/Misteaks.png" description="Misteaks Were Made - Small game for class. Worked in a group. Handled most of the art. - <a href='https://drive.google.com/file/d/1-564RkcZk7a4wUp6hf2eFtEUYg8q-Rg8/view?usp=sharing'>Short Doc</a> - <a href='https://drive.google.com/file/d/1OfS0A25MFAQ3L1dl5RdaZ7BmS29RAwBY/view?usp=sharing'>Download</a>"/>

          <Project styleType="ProjectFullWShowTablet" title="Misteaks Were Made" modalNum="20" imageLink="https://raw.githubusercontent.com/fasky/Images/master/PortfolioStuff/MisteaksLogo.png" secondImage="https://raw.githubusercontent.com/fasky/Images/master/PortfolioStuff/Misteaks.png" description="Misteaks Were Made - Small game for class. Worked in a group. Handled most of the art. - <a href='https://drive.google.com/file/d/1-564RkcZk7a4wUp6hf2eFtEUYg8q-Rg8/view?usp=sharing'>Short Doc</a> - <a href='https://drive.google.com/file/d/1OfS0A25MFAQ3L1dl5RdaZ7BmS29RAwBY/view?usp=sharing'>Download</a>"/>

          <Project styleType="ProjectHalf" title="The Senate" modalNum="21" imageLink="https://raw.githubusercontent.com/fasky/Images/master/PortfolioStuff/senate.jpg" secondImage="https://raw.githubusercontent.com/fasky/Images/master/PortfolioStuff/senatePlay.jpg" description="<a target='_blank' href='https://fasky.itch.io/the-senate'>Itch DL</a> - The Senate - A Shoot 'em up made in Unity. Mainly a design project. Based on Star Wars."/>

          <Project styleType="ProjectFullWShowPhone" title="The Senate" modalNum="22" imageLink="https://raw.githubusercontent.com/fasky/Images/master/PortfolioStuff/senate.jpg" secondImage="https://raw.githubusercontent.com/fasky/Images/master/PortfolioStuff/senatePlay.jpg" description="<a target='_blank' href='https://fasky.itch.io/the-senate'>Itch DL</a> - The Senate - A Shoot 'em up made in Unity. Mainly a design project. Based on Star Wars."/>

          <Project styleType="ProjectHalf" title="Ghostly Gauntlet" modalNum="26" imageLink="https://raw.githubusercontent.com/fasky/Images/master/PortfolioStuff/GGlogo.png" secondImage="https://raw.githubusercontent.com/fasky/Images/master/PortfolioStuff/GGBoard.png" description="Ghostly Gauntlet - Board game based on Harry Potter for class. Handled rule creation and card/board design - <a href='https://drive.google.com/file/d/1PpvNFZhksNnMFRnffgiiLHeflC2YZN9z/view?usp=sharing'>Short Doc</a>"/>

          <Project styleType="ProjectFullWShowPhone" title="Ghostly Gauntlet" modalNum="27" imageLink="https://raw.githubusercontent.com/fasky/Images/master/PortfolioStuff/GGlogo.png" secondImage="https://raw.githubusercontent.com/fasky/Images/master/PortfolioStuff/GGBoard.png" description="Ghostly Gauntlet - Board game based on Harry Potter for class. Handled rule creation and card/board design - <a href='https://drive.google.com/file/d/1PpvNFZhksNnMFRnffgiiLHeflC2YZN9z/view?usp=sharing'>Short Doc</a>"/>

        </div>
        <div id="aboutSection">
          <About/>
        </div>
        <Footer/>
      </div>
    );
  }

//   Old php method
//   fetchProjects(){
//     fetch('get-projects.php')
//     .then(response=>response.json())
//     .then(json=>{
//       results = json;
//       console.log(results);
//       allProjects = results.map((project)=>
//         <Project styleType={project.styleType} title={project.title} modalNum={project.modalNum} imageLink={project.imageLink} secondImage={project.secondImage} description={project.description}/>
//       );
//       console.log(allProjects);
//       this.setState({projects:allProjects});
//     });
//   }

}

export default App;
