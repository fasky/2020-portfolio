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

class App extends React.Component {

  render(){
    var allProjects;

    fetch('get-projects.php')
    .then(response=>response.json())
    .then(json=>{
      results = json;
      console.log(results);
      allProjects = results.map((project)=>
        <Project styleType={project.styleType} title={project.title} modalNum={project.modalNum} imageLink={project.imageLink} secondImage={project.secondImage} description={project.description}/>
      );
      console.log(allProjects);
      this.setState({projects:allProjects});
    });

    return (
      <div className="App">
        <Header/>
        <div id="projects">
          {allProjects}
        </div>
        <div id="aboutSection">
          <About/>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default App;
