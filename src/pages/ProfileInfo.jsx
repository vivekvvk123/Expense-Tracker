import React from 'react'
import { getInitials } from '/utils/helper'

function ProfileInfo() {
  return (
    <div className='flex items-center gap-3'>
        <div className='w-12 h-12 bg-slate-100 rounded-full text-slate-950 text-lg font-medium flex items-center justify-center'>{getInitials("Vivek Bunkar")}</div>
        <div>
            <p className='font-medium text-lg '>Vivek</p>
            <button className='text-slate-700 underline'>Logout</button>
        </div>
    </div>
  )
}

export default ProfileInfo