import React, { Component } from 'react';

class Project extends Component{

    modalNum = 0;
    
    render() {

        this.modalNum = this.props.modalNum;
        var modalId = "projModal" + this.modalNum;
        var projectImg = "projectImg" + this.modalNum;
        var projModalImg = "projModalImg" + this.modalNum;
        var caption = "caption" + this.modalNum;
        var close = "close" + this.modalNum;

        return (
            <div className={this.props.styleType}>
                <img src={this.props.imageLink} alt={this.props.secondImage} title={this.props.description} id={projectImg}/>
                <div id={modalId} className="modal">
                    <span className="close" id={close}>&times;</span>
                    <p id="modalTitle">{this.props.title}</p>
                    <img className="modal-content" id={projModalImg} alt="project screenshot"/>
                    <div className="caption" id={caption}></div>
                </div>
            </div>
            
        );
    }

    componentDidMount(){
        // Get the modal
        var modal = document.getElementById('projModal' + this.modalNum);

        // Get the image and insert it inside the modal - use its "title" text as a caption, alt as second screenshot
        var img = document.getElementById('projectImg' + this.modalNum);
        var modalImg = document.getElementById("projModalImg" + this.modalNum);
        var captionText = document.getElementById("caption" + this.modalNum);
        img.onclick = function(){
            modal.style.display = "block";
            modalImg.src = this.alt;
            captionText.innerHTML = this.title;
        }

        // Get the <span> element that closes the modal
        var span = document.getElementById("close" + this.modalNum);

        // When the user clicks on <span> (x), close the modal
        span.onclick = function() { 
            modal.style.display = "none";
        }
    }

}

export default Project;
