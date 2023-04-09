import '../../App.css';
import { Github,Instagram,Linkedin } from 'react-bootstrap-icons';
function Footer() {
  //Footer componentimiz
  return(
    <div className='footer'> 
    <footer className="d-flex flex-wrap justify-content-between align-items-center py-1 my-2 mx-4 border-top">
      <div className="col-md-4 d-flex align-items-center">
        <span className="mb-3 mb-md-0 text-muted" style={{fontSize:20}}>© 2022 Oğuzhan Çınar</span>
      </div>
      
      <ul className="nav col-md-4 justify-content-end list-unstyled d-flex ">
        <li className="ms-3"><a className="text-muted" href="https://www.instagram.com/ogzhn.cnrr/"><Instagram/></a></li>
        <li className="ms-3"><a className="text-muted" href="https://www.linkedin.com/in/ogzhncinar/"><Linkedin/></a></li>          
        <li className="ms-3"><a className="text-muted" href="https://github.com/OguzhanCnr"><Github/></a></li>
      </ul>
    </footer>
    </div>

  );
}
export default Footer;
