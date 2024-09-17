import React from 'react'
import { Image } from "../../../assets";

const OnboardingLayout = ({children}:any) => {
  return (
    <div className="grid md:grid-cols-2 h-screen ">
      <div className="hidden md:block">
        <img
          src={Image.onboarding}
          alt="onboarding"
          className="object-cover w-fit  h-full"
        />
      </div>
      <div className="px-12">
        {children}
      </div>
    </div>
  )
}

export default OnboardingLayout