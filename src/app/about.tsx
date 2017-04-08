import * as React from 'react';
import LogoForMenu from './components';

const AboutComponent = () => (
  <div>
    <div className='Menu'>
      <LogoForMenu/>

      <div className='Right'>
        <a href='http://grzesik.me'>BLOG</a>
        <a href='http://grzesik.me'>LINKEDIN</a>
        <a href='http://grzesik.me'>GITHUB</a>
      </div>
    </div>

    <div className='About'>
      <p>Demo project made using following technolgies</p>
      <ul>
        <li>React</li>
        <li>Typescript</li>
        <li>Node 7</li>
        <li>Gulp</li>
        <li>Webpack</li>
        <li>Elasticsearch</li>
        <li>Babel</li>
        <li>Bacon.js</li>
        <li>React Router</li>
      </ul>
    </div>
  </div>
);


export default AboutComponent;
