import React from 'react';

import './Footer.css';

const Footer = () => {
  return (
    <div className='footer'>
      <div className='footer-content'>
        <div className='creatorsFooter'>
          <p className='createByTitle color'>Site Created By</p>
            Brendon James
            <div className='personalLinks'>
              <a href="https://github.com/brendonwjames" target='_blank' rel="noreferrer"><i className="fa-brands fa-github fa-2x color"></i></a>
              <a href="https://www.linkedin.com/in/brendon-james-43987a231/" target='_blank' rel="noreferrer"><i className="fa-brands fa-linkedin fa-2x color"></i></a>
            </div>
          </div>
        <div className='individualProgrammer color'>
          <div>Project GitHub</div>
          <a href='https://github.com/brendonwjames/GeekCritique' target='_blank' rel='noopener noreferrer'>
          <i className="fa-brands fa-github fa-2x color"></i>
          </a>
        </div>
      </div>
        <div className='footer-technologies color'>Project Built Using: Python • CSS • React • Redux • FlaskAlchemy • Sequelize • PostgreSQL</div>
    </div>
  );
};

export default Footer;
