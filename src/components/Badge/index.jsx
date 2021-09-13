import React from 'react'
import classNames from 'classnames';

import '../Badge/badge.scss'

const Badge = ({ color, onClick, className }) => <i onClick={onClick} className={classNames(`badge badge--${color} ${className}`)}></i>

export default Badge;