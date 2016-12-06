import React from 'react'
import Title from './Title'

const Layout = ({ children, color, id, title }) => (
  <div id={id} style={{color}} className='full-screen visible'>
    <div className={'top-progress-bar'} ></div>
    <Title text={title} />
    {children}
  </div>
)

export default Layout
