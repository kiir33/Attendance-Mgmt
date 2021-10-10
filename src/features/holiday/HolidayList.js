import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import HolidayItem from './HolidayItem'
import { getHolidays } from './holidaySlice'
import { postHoliday, patchHoliday, deleteHoliday } from './holidaySlice'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'


const HolidayList = () => {

  const dispatch = useDispatch()
  const state = useSelector(state => state.holiday)

  useEffect(() => {
    dispatch(getHolidays())
  }, [])

    return (
      <>
        <Link
        to={{
          pathname: "/newHoliday",
          state: {
            method: "post",
            data: {},
          }
        }}
        style={{
          textDecoration: "none"
        }}
        >
          <Button variant="contained">
            Add new Holiday
          </Button>
        </Link>
        {state.allHolidayData.map(item =>
          <HolidayItem holiday={item} />
        )}
      </>
    )
  
}

export default HolidayList
