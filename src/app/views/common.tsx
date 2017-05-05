import * as React from 'react'
import {Link} from 'react-router-dom'

import {ROUTES} from '../routes'

const LogoForMenu = () => (
  <div className='Left'>
    <Link to={ROUTES.MAIN}><strong>Search</strong>light</Link>
  </div>
)

export default LogoForMenu
