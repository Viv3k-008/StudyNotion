import React from 'react'
import Button from "../HomePage/Button"
import HighlightText from './HighlightText'
import { FaArrowRightLong } from "react-icons/fa6";
import { TypeAnimation } from 'react-type-animation';

const CodeBlocks = ({position, heading, subheading, btn1, btn2, codeblock, backgroundGradient, codeColor}) => {
  return (
    <div className = {`flex ${position} my-20 jusify-between gap-10`}>

        {/* {Section 1} */}
        <div className='w-[50%] flex flex-col gap-3'>
            {heading}

            <div className='text-richblack-300 font-bold'>
                {subheading}
            </div>

            <div className='flex gap-7 mt-5'>
                <Button active={btn1.active} linkto={btn1.linkto}>
                    <div className='flex gap-2 items-center'>
                        {btn1.btnText}
                        <FaArrowRightLong />
                    </div>
                </Button>
                <Button active={btn2.active} linkto={btn2.linkto}>
                    {btn2.btnText}  
                </Button>
            </div>
        </div>

        {/* {Section-2} */}
        <div className='h-fit flex flex-row text-sm w-[50%]'>

            <div className='text-center flex flex-col w-[10%] text-richblack-400 font-inter font-bold' >
                <p>1</p>
                <p>2</p>
                <p>3</p>
                <p>4</p>
                <p>5</p>
                <p>6</p>
                <p>7</p>
                <p>8</p>
                <p>9</p>
                <p>10</p>
                <p>11</p>
            </div>

            <div className={`w-[90%] flex flex-col hap-2 font-bold font-mono ${codeColor} pr-2`}>
                <TypeAnimation 
                sequence={[codeblock, 2000, ""]}
                repeat={Infinity}
                cursor={true}

                style={
                    {
                        whiteSpace:"pre-line",
                        display:"block",
                    }
                }
                omitDeletionAnimation={true}
                />
            </div>
        </div>
      
    </div>
  )
}

export default CodeBlocks
